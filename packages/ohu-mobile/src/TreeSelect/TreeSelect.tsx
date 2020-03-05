import { defineComponent, props } from '../_utils/defineComponent';
import { TreeSelectProps, TreeSelectEvents, TreeNode, TreeSelectLoadDataFunc, InternalTreeNode } from './types';
import List from '../List';
import { Collapse } from '..';
import Radio from '../Radio';
import RadioGroup from '../RadioGroup';
import CheckboxGroup from '../CheckboxGroup';
import Checkbox from '../Checkbox';
import Loading from '../Loading';
import { IconProperty } from '../types';

interface InternalTreeData {
  [key: string]: InternalTreeNode;
}

function getInternalTreeData(currentKey: string, currentNode: TreeNode, data: InternalTreeData, value?: any, expandKeys?: string[]) {
  if (!currentNode.children) return [];
  const keys: string[] = [];
  currentNode.children.reduce((acc, cur, index) => {
    const ck = `${currentKey}-${index}`;
    keys.push(ck);
    const childrenKeys = getInternalTreeData(ck, cur, data, value, expandKeys);
    acc[ck] = {
      key: cur.key || ck,
      title: cur.title,
      value: cur.value,
      disabled: cur.disabled,
      isLeaf: cur.isLeaf,
      hasChildren: cur.hasChildren,
    };
    if (childrenKeys.length > 0) {
      acc[ck].children = childrenKeys;
    }
    if (expandKeys && value) {
      if (value instanceof Array && value.indexOf(cur.value) >= 0) {
        expandKeys.push(currentKey);
      } else if(value === cur.value) {
        expandKeys.push(currentKey);
      }
    }
    return acc;
  }, data);
  return keys;
}

interface InitData {
  internalTreeData: InternalTreeData;
  leftData: string[];
  leftKey: string;
  cachedExpandKey: Record<string, boolean>;
};

interface TreeSelectMethods extends InitData {
  formatData: (treeData: TreeNode[], currentKey?: string) => InitData;
}

export default defineComponent<TreeSelectProps, TreeSelectEvents, {}, TreeSelectMethods>('tree-select')
  .create({
    props: {
      treeData: props<TreeNode[]>(Array).default(() => []),
      value: props.ofAny().optional,
      multiple: props(Boolean).default(false),
      loadData: props<TreeSelectLoadDataFunc>(Function).optional,
      leftWidth: props(String).default('38.4%'),
      checkedIcon: props.ofType<IconProperty | null>().optional,
      unCheckedIcon: props.ofType<IconProperty | null>().optional,
    },
    data() {
      return {
        ...this.formatData(this.treeData) as InitData,
        internalValue: this.value,
      };
    },
    methods: {
      formatData(treeData: TreeNode[], currentKey?: string) {
        let internalTreeData: InternalTreeData = {};
        let leftData: string[] = [];
        let leftKey: string = '';
        let cachedExpandKey: Record<string, boolean> = {};
        treeData.forEach((node, index) => {
          let expandKeys: string[] = [];
          let key = index.toString();
          if (currentKey) {
            key = `${currentKey}-${key}`;
          }
          const keys = getInternalTreeData(key, node, internalTreeData, this.value, expandKeys);
          internalTreeData[key] = {
            key: node.key || key,
            title: node.title,
            value: node.value,
            disabled: node.disabled,
            isLeaf: node.isLeaf,
            children: keys,
            hasChildren: node.hasChildren,
          };
          if (expandKeys.length > 0) {
            if (!leftKey) {
              leftKey = key;
            }
            expandKeys.reduce((acc, currentKey) => {
              cachedExpandKey[currentKey] = true;
              return acc;
            }, cachedExpandKey);
          }
          leftData.push(key);

        });
        if (!leftKey && leftData[0]) {
          leftKey = leftData[0];
        }
        return {
          internalTreeData,
          leftData,
          leftKey,
          cachedExpandKey,
        };
      },
      handleChange(value: any) {
        this.internalValue = value;
        this.$emit('change', value);
      },
      handleLeftPanelClick(key: string) {
        this.leftKey = key;
        const leftOption = this.internalTreeData[key];
        if (leftOption.hasChildren && !leftOption.loaded) {
          this.loadDataWhenExpand(key, leftOption);
        }
      },
      loadDataWhenExpand(key: string, option: InternalTreeNode) {
        if (this.loadData) {
          if (option.loading || option.loaded) return;
          this.$set(option, 'loading', true);
          this.loadData(option)
            .then((nodes) => {
              const { cachedExpandKey, internalTreeData, leftData  } = this.formatData(nodes, key);
              this.internalTreeData = Object.assign(this.internalTreeData, internalTreeData);
              this.cachedExpandKey[key] = true;
              this.cachedExpandKey = Object.assign(this.cachedExpandKey, cachedExpandKey);
              this.$set(option, 'children', leftData);
              this.$set(option, 'loaded', true);
              this.$set(option, 'loading', false);
            })
            .catch((error) => {
              this.$set(option, 'loading', false);
              this.$emit('loadError', error);
            });
        }
      },
      handleCollapseExpand(key: string | number) {
        this.cachedExpandKey[key] = true;
      },
      handleCollapseShrink(key: string | number) {
        if (this.cachedExpandKey[key]) {
          delete this.cachedExpandKey[key];
        }
      },
      renderRightPanel(keys: string[], depth = 0) {
        return (
          <List>
            {
              keys.map((key) => {
                let option = this.internalTreeData[key];
                if (!option.isLeaf && option.children) {
                  return (
                    <Collapse.Item
                      onExpand={this.handleCollapseExpand}
                      onShrink={this.handleCollapseShrink}
                      title={option.title}
                      key={key}>
                      {this.renderRightPanel(option.children, depth + 1)}
                    </Collapse.Item>
                  );
                }
                if (!option.isLeaf && option.hasChildren && !option.loaded) {
                  return (
                    <Collapse.Item
                      loading={option.loading}
                      key={key}
                      title={option.title}
                      onExpand={() => this.loadDataWhenExpand(key, option)}
                      onShrink={this.handleCollapseShrink}>
                    </Collapse.Item>
                  );
                }
                return (
                  <List.Item key={key} button>
                    {option.title}
                    {
                      option.isLeaf
                      &&
                      (
                        this.multiple
                          ? <Checkbox
                            slot="action"
                            value={option.value}
                            checkedIcon={this.checkedIcon}
                            unCheckedIcon={this.unCheckedIcon}  />
                          : <Radio
                            slot="action"
                            value={option.value}
                            checkedIcon={this.checkedIcon}
                            unCheckedIcon={this.unCheckedIcon} />
                      )
                    }
                  </List.Item>
                );
              })
            }
          </List>
        )
      }
    },
    render() {
      const root = this.root();
      const leftClass = root.element('left');
      const rightClass = root.element('right');
      const leftKey = this.leftKey;
      const leftOption = this.internalTreeData[leftKey];
      const rightChildren = this.internalTreeData[leftKey]?.children;
      let rightPanel;
      if (rightChildren) {
        let panelContent = this.renderRightPanel(rightChildren);
        if (this.multiple) {
          rightPanel = (
            <CheckboxGroup value={this.internalValue} onChange={this.handleChange}>
              <Collapse accordion={false} value={Object.keys(this.cachedExpandKey)}>
                {panelContent}
              </Collapse>
            </CheckboxGroup>
          );
        } else {
          rightPanel = (
            <RadioGroup value={this.internalValue} onChange={this.handleChange}>
              <Collapse accordion={false} value={Object.keys(this.cachedExpandKey)}>
                {panelContent}
              </Collapse>
            </RadioGroup>
          );
        }
      }
      return (
        <div class={root}>
          <div class={leftClass} style={{ width: this.leftWidth }}>
            {
              this.leftData.map((key) => {
                return (
                  <div class={leftClass.element('item').is([leftKey === key && 'active'])}
                    onClick={() => this.handleLeftPanelClick(key)}>
                    {this.internalTreeData[key].title}
                  </div>
                );
              })
            }
          </div>
          <div class={rightClass}>
            {
              leftOption && leftOption.loading
                ?
                (
                  <div class={rightClass.element('loading')}>
                    <Loading vertical />
                  </div>
                )
                : rightPanel
            }
          </div>
        </div>
      );
    },
  });
