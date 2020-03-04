import { RadioListProps, RadioListEvents, RadioListScopedSlots, RadioListRenderOptions } from './types';
import { VNodeData } from 'vue';
import List from '../List';
import { listProps } from '../List/List';
import { ScopedSlotReturnValue } from 'vue/types/vnode';
import Radio from '../Radio';
import RadioGroup, { RadioOption } from '../RadioGroup';
import { radioGroupProps } from '../RadioGroup/RadioGroup';
import Collapse from '../Collapse';
import { defineComponent, props } from '../_utils/defineComponent';
import { RadioProps } from '../Radio/types';

type SlotRenderMapKey = keyof (Omit<RadioListScopedSlots, 'renderItem' | 'default'>);
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


export default defineComponent<RadioProps, RadioListEvents, RadioListScopedSlots>('radio-list').create({
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    ...radioGroupProps,
    ...listProps,
    position: props.ofStringLiterals('left', 'right').default('right'),
    button: props(Boolean).default(true),
    paddingDivider: props(Boolean).default(true),
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
    getCheckedOption(options: RadioOption[], value?: any) {
      return options.find((option) => {
        return option.value === value;
      });
    },
    renderList(options?: (RadioOption | string)[], parent?: RadioOption) {
      if (!options) return;
      const {
        loading,
        loadingProps,
        finished,
        finishedText,
        button,
        paddingDivider,
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
              let checkOption: RadioOption;
              if (typeof option === 'string') {
                checkOption = {
                  value: option,
                };
                props = checkOption;
                optionValue = option;
              } else {
                if (option.children) {
                  const checkedOption = this.getCheckedOption(option.children, this.value);
                  let collapseValue = [];
                  if (checkedOption) {
                    collapseValue.push(option.value);
                  }
                  return (
                    <Collapse value={collapseValue}>
                      <Collapse.Item
                        hasList
                        title={option.label}
                        key={option.value}>
                        {this.renderList(option.children)}
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
                checked: this.getCheckedStatus(optionValue),
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
                  paddingDivider,
                },
                on: {
                  click: () => {
                    if (this.disabled) return;
                    const group = this.$refs.group as InstanceType<typeof RadioGroup>;
                    if (group) {
                      group.childrenChange(optionValue, !this.getCheckedStatus(optionValue), checkOption);
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
  },
  render() {
    const {
      loading,
      loadingProps,
      finished,
      finishedText,
      options,
      button,
      paddingDivider,
      ...groupProps
    } = this.$props as RadioListProps;
    const { $listeners } = this;
    const groupNodeData: VNodeData = {
      props: groupProps,
      on: $listeners,
      ref: 'group'
    };
    const innerNode = this.renderList(options);
    return (
      <RadioGroup {...groupNodeData}>
        {innerNode}
      </RadioGroup>
    );
  },
});

