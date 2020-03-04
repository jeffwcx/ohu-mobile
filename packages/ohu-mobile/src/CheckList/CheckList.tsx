import CheckboxGroup, { CheckboxOption } from '../CheckboxGroup';
import { VNodeData } from 'vue';
import props from 'vue-strict-prop';
import { CheckListProps, CheckListEvents, CheckListScopedSlots, CheckListRenderOptions } from './types';
import List from '../List';
import Checkbox from '../Checkbox';
import checkboxGroupProps from '../CheckboxGroup/props';
import { listProps } from '../List/List';
import { ScopedSlotReturnValue } from 'vue/types/vnode';
import Collapse from '../Collapse';
import { defineComponent } from '../_utils/defineComponent';

type SlotRenderMapKey = keyof (Omit<CheckListScopedSlots, 'renderItem'>);
type SlotRenderMapValue = string | [string, (position: string) => boolean];

const slotRenderMap: Record<SlotRenderMapKey, SlotRenderMapValue> = {
  renderIcon: [
    'icon',
    function(position: string) {
      return position === 'right';
    }
  ],
  renderThumb: [
    'thumb',
    function(position: string) {
      return position === 'right';
    }
  ],
  renderAction: [
    'action', function(position: string) {
      return position === 'left';
    }
  ],
  renderText: 'text',
  renderMinorText: 'minorText',
};

export default defineComponent<CheckListProps ,CheckListEvents, CheckListScopedSlots>('check-list')
  .create({
    model: {
      prop: 'value',
      event: 'change',
    },
    props: {
      ...checkboxGroupProps,
      ...listProps,
      position: props.ofStringLiterals('left', 'right').default('right'),
      button: props(Boolean).default(true),
    },
    methods: {
      getCheckBox(props: any) {
        let slot = this.position === 'left' ? 'icon' : 'action';
        return <Checkbox {...{ props, slot }}></Checkbox>
      },
      getSlotNodes(renderOptions: CheckListRenderOptions) {
        const { $scopedSlots, position } = this;
        const slotNodes: ScopedSlotReturnValue[] = [];
        return Object.keys(slotRenderMap).reduce((result, render) => {
          const mapKey = slotRenderMap[render as SlotRenderMapKey];
          let slot;
          let func;
          if (typeof mapKey === 'string') {
            slot = mapKey;
          } else {
            slot = mapKey[0];
            func = mapKey[1];
          }
          if (func && !func(position)) {
            return result;
          }
          const scopedSlotsFunc = $scopedSlots[render];
          if (scopedSlotsFunc) {
            result.push(
              <template slot={slot}>
                {scopedSlotsFunc(renderOptions)}
              </template>
            );
          }
          return result;
        }, slotNodes);
      },
      renderList(options?: (CheckboxOption | string)[], parent?: CheckboxOption) {
        if (!options) return;
        const {
          loading,
          loadingProps,
          finished,
          finishedText,
          button,
          $scopedSlots,
        } = this;
        const listNodeData: VNodeData = {
          props: {
            loading,
            loadingProps,
            finished,
            finishedText
          },
        };
        return (
          <List {...listNodeData}>
            {
              options.map((option, index) => {
                let props: any;
                let defaultNode;
                let optionValue: any;
                let itemDisabled = false;
                let checkOption: CheckboxOption;
                if (typeof option === 'string') {
                  checkOption = {
                    value: option,
                  };
                  props = checkOption;
                  optionValue = option;
                } else {
                  if (option.children) {
                    return (
                      <Collapse>
                        <Collapse.Item
                          hasList
                          title={option.label}
                          key={option.value}>
                          {this.renderList(option.children, option)}
                        </Collapse.Item>
                      </Collapse>
                    );
                  }
                  checkOption = option;
                  const {
                    label,
                    attach,
                    ...checkProps
                  } = option;
                  props = checkProps;
                  optionValue = option.value;
                  if (option.disabled) {
                    itemDisabled = option.disabled;
                  }
                }
                const renderOptions = {
                  option: checkOption,
                  index,
                  checked: this.value.indexOf(optionValue) >= 0,
                };
                if ($scopedSlots.renderItem) {
                  defaultNode = $scopedSlots.renderItem(renderOptions);
                } else if (!$scopedSlots.renderText && !$scopedSlots.renderMinorText) {
                  defaultNode = typeof option === 'string' ? option : option.label;
                }
                const itemProps: VNodeData = {
                  class: { 'is-checked': renderOptions.checked },
                  props: {
                    button,
                    disabled: itemDisabled,
                  },
                  on: {
                    click: () => {
                      if (this.disabled) return;
                      const group = this.$refs.group as InstanceType<typeof CheckboxGroup>;
                      if (group) {
                        let isCheck = group.result.indexOf(optionValue) >= 0;
                        group.childrenChange(optionValue, !isCheck);
                      }
                    },
                  },
                };
                const checkBox = this.getCheckBox(props);
                return (
                  <List.Item {...itemProps}>
                    {checkBox}
                    {defaultNode}
                    {this.getSlotNodes(renderOptions)}
                  </List.Item>
                );
              })
            }
          </List>
        );
      },
    },
    render() {
      const {
        loading,
        loadingProps,
        finished,
        finishedText,
        position,
        button,
        ...groupProps
      } = this.$props as CheckListProps;
      const { $listeners } = this;
      const groupNodeData: VNodeData = {
        props: groupProps,
        on: $listeners,
        ref: 'group'
      };
      const innerNode = this.renderList(this.options);
      return (
        <CheckboxGroup {...groupNodeData}>
          {innerNode}
        </CheckboxGroup>
      );
    },
  });
