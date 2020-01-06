import { componentFactoryOf } from 'vue-tsx-support';
import CheckboxGroup, { CheckboxOption } from '../CheckboxGroup';
import props from 'vue-strict-prop';
import { CheckListProps, CheckListEvents, CheckListScopedSlots, CheckListRenderOptions } from './types';
import { VNodeData } from 'vue';
import List from '../List';
import Checkbox from '../Checkbox';
import { checkboxGroupProps } from '../CheckboxGroup/CheckboxGroup';
import { listProps } from '../List/List';
import { prefix } from '../_utils/shared';
import { ScopedSlotReturnValue } from 'vue/types/vnode';

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

const baseCheckListName = `${prefix}check-list`;
export default componentFactoryOf<CheckListEvents, CheckListScopedSlots>().create({
  name: baseCheckListName,
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
  },
  render() {
    const {
      loading,
      loadingProps,
      finished,
      finishedText,
      options,
      position,
      button,
      ...groupProps
    } = this.$props as CheckListProps;
    const { $scopedSlots, $listeners } = this;
    const groupNodeData: VNodeData = {
      props: groupProps,
      on: $listeners,
      ref: 'group'
    };
    const listNodeData: VNodeData = {
      props: {
        loading,
        loadingProps,
        finished,
        finishedText
      },
    };
    let innerNode;
    if (options) {
      innerNode = (
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
                props: {
                  button,
                  disabled: itemDisabled,
                },
                on: {
                  click: () => {
                    const group = this.$refs.group as InstanceType<typeof CheckboxGroup>;
                    if (group) {
                      group.childrenChange(optionValue, !(this.value.indexOf(optionValue) >= 0));
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
    }
    return (
      <CheckboxGroup {...groupNodeData}>
        {innerNode}
      </CheckboxGroup>
    );
  },
});
