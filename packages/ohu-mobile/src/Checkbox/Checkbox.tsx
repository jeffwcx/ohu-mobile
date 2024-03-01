import { CheckboxProps, CheckboxEvents, CheckboxScopedSlots } from './types';
import { defineDescendantComponent } from '../_utils/defineComponent';
import SwitchBase, {
  SwitchBaseOutsideProps,
  switchBaseProps,
} from '../_internal/SwitchBase';
import CheckboxGroup from '../CheckboxGroup';
import { fieldMixin } from '../Form/fieldMixin';
import { SyntheticEvent, InputHTMLAttributes } from 'vue-tsx-support/types/dom';
import { VNodeData } from 'vue';

export interface CheckboxMethods {
  toggle: () => void;
  getChecked: () => boolean;
}

export default defineDescendantComponent<
  InstanceType<typeof CheckboxGroup>,
  CheckboxProps,
  CheckboxEvents,
  CheckboxScopedSlots,
  CheckboxMethods
>('checkbox-group', 'checkbox')
  .mixin(fieldMixin('checkedValue', 'checked', true))
  .create({
    model: {
      prop: 'checked',
      event: 'change',
    },
    props: switchBaseProps,
    watch: {
      checked(cur) {
        if (!this.ancestor) {
          this.checkedValue = cur;
        }
      },
    },
    data() {
      return {
        checkedValue: this.ancestor
          ? this.ancestor.isChildChecked(this.value)
          : this.initFieldValue(this.checked),
      };
    },
    computed: {
      internalDisabled() {
        if (this.disabled === true) return true;
        if (this.ancestor && this.ancestor.disabled !== undefined) {
          return this.ancestor.disabled;
        }
        return this.disabled;
      },
    },
    methods: {
      toggle() {
        this.handleChange(!this.getChecked());
      },
      getChecked() {
        return this.ancestor
          ? this.ancestor.isChildChecked(this.value)
          : this.checkedValue;
      },
      handleChange(
        checked: boolean,
        e?: SyntheticEvent<InputHTMLAttributes, Event>,
      ) {
        if (this.internalDisabled) return;
        if (this.ancestor) {
          const success = this.ancestor.childrenChange(
            this.value,
            checked,
            this.attach,
            e,
          );
          if (success) {
            this.checkedValue = checked;
          }
        } else {
          this.checkedValue = checked;
        }
        this.$emit('change', checked, this.attach);
      },
    },
    render(h) {
      const { internalDisabled, ancestor, $scopedSlots } = this;
      const {
        checked,
        disabled,
        name,
        color,
        unCheckedColor,
        checkedIcon,
        unCheckedIcon,
        ...checkboxProps
      } = this.$props;
      const props: SwitchBaseOutsideProps = {
        baseName: 'checkbox',
        role: 'checkbox',
        checked: this.getChecked(),
        disabled: internalDisabled,
        name: ancestor?.name || name,
        color: ancestor?.color || color,
        unCheckedColor: ancestor?.unCheckedColor || unCheckedColor,
        checkedIcon:
          ancestor?.checkedIcon !== undefined
            ? ancestor?.checkedIcon
            : checkedIcon,
        unCheckedIcon:
          ancestor?.unCheckedIcon !== undefined
            ? ancestor?.unCheckedIcon
            : unCheckedIcon,
        ...checkboxProps,
      };
      const switchBaseProps: VNodeData = {
        props,
        class: ancestor && 'is-group-item',
        on: {
          ...this.$listeners,
          change: this.handleChange,
          blur: (e: Event) => {
            this.$emit('blur', e);
          },
        },
      };
      return (
        <SwitchBase {...switchBaseProps} scopedSlots={$scopedSlots}>
          {this.$slots.default}
        </SwitchBase>
      );
    },
  });
