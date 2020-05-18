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
import { VNodeData } from 'vue/types/umd';
import generateUniqueID from '../_utils/generateUniqueID';

interface InternalTreeData {
  [key: string]: InternalTreeNode;
}

function isValueActive(value: any, currentValue: any) {
  if (value instanceof Array) {
    return value.indexOf(currentValue) >= 0;
  }
  return value!== undefined && currentValue !== undefined && value === currentValue;
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
      if (isValueActive(value, cur.value)) {
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

interface CheckboxAttach {
  path: string[];
  option: InternalTreeNode;
}

export default defineComponent<TreeSelectProps, TreeSelectEvents, {}, TreeSelectMethods>('tree-select')
  .create({
    props: {
      treeData: props<TreeNode[]>(Array).default(() => []),
      value: props.ofAny().optional,
      keyPath: props<(string | number)[]>(Array).optional,
      multiple: props(Boolean).default(false),
      loadData: props<TreeSelectLoadDataFunc>(Function).optional,
      leftWidth: props(String).default('38.4%'),
      checkedIcon: props.ofType<IconProperty | null>().optional,
      unCheckedIcon: props.ofType<IconProperty | null>().optional,
      max: props(Number).optional,
      scrollIntoView: props(Boolean).default(true),
    },
    data() {
      return {
        ...this.formatData(this.treeData) as InitData,
        internalValue: this.value,
        internalKey: generateUniqueID(),
      };
    },
    methods: {
      formatData(treeData: TreeNode[], currentKey?: string) {
        let internalTreeData: InternalTreeData = {};
        let internalActiveNodes: Record<string | number, string | number> = {};
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
          const inode: InternalTreeNode = {
            key: node.key || key,
            title: node.title,
            value: node.value,
            disabled: node.disabled,
            isLeaf: node.isLeaf,
            children: keys,
            hasChildren: node.hasChildren,
            loading: false,
            loaded: false,
            attach: node.attach,
          };
          internalTreeData[key] = inode;
          if (isValueActive(this.value, node.value) && inode.value && inode.key) {
            internalActiveNodes[inode.value] = inode.key;
          }
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
      handleChange(value: any, { path, option }: CheckboxAttach) {
        this.internalValue = value;
        const leafKey = path[path.length - 1];
        const params: any = {};
        if (leafKey) {
          params.node = option;
          params.path = path.map((key) => (this.internalTreeData[key]));
        }
        this.$emit('change', value, params);
      },
      handleLeftPanelClick(key: string) {
        this.leftKey = key;
        const leftOption = this.internalTreeData[key];
        if (leftOption.hasChildren && !leftOption.loaded) {
          this.loadDataWhenExpand(key, leftOption);
        }
      },
      isNodeActive(node: InternalTreeNode) {
        if (this.multiple && this.internalValue instanceof Array && node.value) {
          return this.internalValue.indexOf(node.value) >= 0;
        } else if (!this.multiple && node.value) {
          return this.internalValue === node.value;
        }
        return false;
      },
      scrollToActiveNode() {
        if (!this.internalValue) return;
        const activeNode = document.getElementById(this.internalKey);
        if (activeNode) {
          activeNode.scrollIntoView();
        }
      },
      cascadeNodeLoad(node: InternalTreeNode, key: string, depth: number, keyPath: (string | number)[]) {
        if (node.isLeaf) {
          this.scrollIntoView && this.scrollToActiveNode();
          return;
        }
        if (node.children && node.children.length > 0) {
          this.cachedExpandKey[key] = true;
          this.cascadeLoad(keyPath, depth + 1, node.children);
        } else if (node.hasChildren && !node.isLeaf) {
          this.loadDataWhenExpand(key, node, () => {
            this.cascadeLoad(keyPath, depth + 1, node.children);
          }, () => {
            this.scrollIntoView && this.scrollToActiveNode();
          });
        }
      },
      cascadeLoad(keyPath: (string | number)[], depth = 0, keys: string[] = []) {
        const keyOrValue = keyPath[depth];
        if (depth === 0) {
          keys = this.leftData;
        }
        const hasTarget = keys.some((item, index) => {
          const node = this.internalTreeData[item];
          if (node.key === keyOrValue || node.value === keyOrValue) {
            if (depth === 0) {
              this.leftKey = index.toString();
            }
            this.cascadeNodeLoad(node, item, depth, keyPath);
            return true;
          }
          return false;
        });
        // bad keyPath
        if (!hasTarget && depth === 0) {
          this.leftKey = '0';
          const node = this.internalTreeData[this.leftKey];
          this.cascadeNodeLoad(node, this.leftKey, depth, keyPath);
        }
      },
      formatNodes(key: string, nodes: TreeNode[], option: InternalTreeNode) {
        const { cachedExpandKey, internalTreeData, leftData } = this.formatData(nodes, key);
        this.internalTreeData = Object.assign({}, this.internalTreeData, internalTreeData);
        this.$set(this.cachedExpandKey, key, true);
        this.cachedExpandKey[key] = true;
        this.cachedExpandKey = Object.assign(this.cachedExpandKey, cachedExpandKey);
        if (leftData.length > 0) {
          this.$set(option, 'children', leftData);
        }
      },
      loadDataWhenExpand(
        key: string,
        option: InternalTreeNode,
        successCallback?: () => void,
        errorCallback?: () => void,
      ) {
        if (this.loadData) {
          if (option.loading || option.loaded) return;
          const loadDataInstance = this.loadData(option);
          if (loadDataInstance instanceof Promise) {
            this.$set(option, 'loading', true);
            loadDataInstance.then((nodes) => {
              this.formatNodes(key, nodes, option);
              this.$set(option, 'loaded', true);
              this.$set(option, 'loading', false);
              this.$nextTick(() => {
                successCallback && successCallback();
              });
            }).catch((error) => {
              errorCallback && errorCallback();
              this.$set(option, 'loading', false);
              this.$emit('loadError', error);
            });
          } else {
            this.formatNodes(key, loadDataInstance, option);
            this.$set(option, 'loaded', true);
            this.$nextTick(() => {
              successCallback && successCallback();
            });
          }
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
      renderRightPanel(keys: string[], keyPath: string[], depth = 0) {
        return (
          <List>
            {
              keys.map((key) => {
                let option = this.internalTreeData[key];
                let newKeyPath = keyPath.concat(key);
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
                if (!option.isLeaf && option.children && option.children.length > 0) {
                  return (
                    <Collapse.Item
                      onExpand={this.handleCollapseExpand}
                      onShrink={this.handleCollapseShrink}
                      title={option.title}
                      key={key}>
                      {this.renderRightPanel(option.children, newKeyPath, depth + 1)}
                    </Collapse.Item>
                  );
                }
                const itemProps: VNodeData = {
                  key,
                  props: {
                    button: true,
                  },
                };
                if (option.isLeaf && this.isNodeActive(option)) {
                  itemProps.attrs = { id: this.internalKey };
                }
                return (
                  <List.Item {...itemProps}>
                    {option.title}
                    {
                      option.isLeaf
                      &&
                      (
                        this.multiple
                          ? <Checkbox
                            slot="action"
                            attach={{ path: newKeyPath, option }}
                            value={option.value}
                            checkedIcon={this.checkedIcon}
                            unCheckedIcon={this.unCheckedIcon}  />
                          : <Radio
                            slot="action"
                            attach={{ path: newKeyPath, option }}
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
    mounted() {
      if (this.keyPath) {
        this.cascadeLoad(this.keyPath);
      } else if (this.leftKey) {
        this.loadDataWhenExpand(this.leftKey, this.internalTreeData[this.leftKey]);
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
        let panelContent = this.renderRightPanel(rightChildren, [leftKey]);
        if (this.multiple) {
          rightPanel = (
            <CheckboxGroup
              value={this.internalValue}
              max={this.max}
              onChange={this.handleChange}>
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
                  this.$slots.loading
                  ||
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
