import { componentFactoryOf } from 'vue-tsx-support';
import props from 'vue-strict-prop';
import { RadioListProps, RadioListEvents, RadioListScopedSlots, RadioListRenderOptions } from './types';
import { VNodeData } from 'vue';
import List from '../List';
import { listProps } from '../List/List';
import { prefix } from '../_utils/shared';
import { ScopedSlotReturnValue } from 'vue/types/vnode';
import Radio from '../Radio';
import RadioGroup, { RadioOption } from '../RadioGroup';
import { radioGroupProps } from '../RadioGroup/RadioGroup';

type SlotRenderMapKey = keyof (Omit<RadioListScopedSlots, 'renderItem'>);
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

const baseRadioListName = `${prefix}radio-list`;
export default componentFactoryOf<RadioListEvents, RadioListScopedSlots>().create({
  name: baseRadioListName,
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    ...radioGroupProps,
    ...listProps,
    position: props.ofStringLiterals('left', 'right').default('right'),
    button: props(Boolean).default(true),
  },
  methods: {
    getRadio(props: any) {
      let slot = this.position === 'left' ? 'icon' : 'action';
      return <Radio {...{ props, slot }}></Radio>
    },
    getSlotNodes(renderOptions: RadioListRenderOptions) {
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
    getCheckedStatus(optionValue: any) {
      return this.value === optionValue;
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
    } = this.$props as RadioListProps;
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
              let checkOption: RadioOption;
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
                checked: this.getCheckedStatus(optionValue),
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
                    const group = this.$refs.group as InstanceType<typeof RadioGroup>;
                    if (group) {
                      group.childrenChange(optionValue, !this.getCheckedStatus(optionValue));
                    }
                  },
                },
              };
              const radio = this.getRadio(props);
              return (
                <List.Item {...itemProps}>
                  {radio}
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
      <RadioGroup {...groupNodeData}>
        {innerNode}
      </RadioGroup>
    );
  },
});
