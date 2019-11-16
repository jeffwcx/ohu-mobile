import { componentFactoryOf } from 'vue-tsx-support';
import props from 'vue-strict-prop';
import { prefix } from '../_utils/shared';
import Popup from '../Popup';
import vars from '../_styles/variables';
import { popupOutSideProps } from '../Popup/PopupWrapper';
import deepMerge from 'deepmerge';
import { SVGIconDef } from '@/global';
import { DialogActionOptions, DialogEvents } from './types';
import { createActionOptions, isIconProps } from './utils';
import Button from '../Button';
import { VNodeData, VNode } from 'vue';
import Divider from '../Divider';
import Icon, { IconProps } from '../Icon';
import './styles/index.scss';
import { addTargetClass } from '../_utils/targetClass';

const defaultOKOptions: DialogActionOptions = {
  type: 'ok',
  text: 'OK',
  disabled: false,
};
const defaultCancelOptions: DialogActionOptions = {
  type: 'cancel',
  text: 'Cancel',
  disabled: false,
  color: vars.colorTextMinor,
};

export type DialogIconOption = string | SVGIconDef | IconProps;

export const dialogProps = deepMerge({
  icon: props<string, SVGIconDef, IconProps>(String, Object).optional,
  title: String,
  content: String,
  cancelBtn: props<string, DialogActionOptions, null>(String, Object).optional,
  okBtn: props<string, DialogActionOptions, null>(String, Object).optional,
  actions: props.ofType<DialogActionOptions[] | null>().default(() => []),
  layout: props.ofStringLiterals('row', 'column').default('row'),
  closeAfterAsyncTaskCompleted: props(Boolean).default(false),
}, popupOutSideProps);

dialogProps.animate.default = 'zoom';
dialogProps.maskClosable.default = false;

const baseDialogName = `${prefix}dialog`;
const dialogFooterCls = `${baseDialogName}__footer`;
const dialogActionsCls = `${baseDialogName}__actions`;
const dialogBodyCls = `${baseDialogName}__body`;
const dialogBodyTitleCls = `${dialogBodyCls}__title`;
const dialogBodyContentCls = `${dialogBodyCls}__content`;
const dialogBodyIconCls = `${dialogBodyCls}__icon`;
// todo i18
export default componentFactoryOf<DialogEvents>().create({
  name: baseDialogName,
  model: {
    prop: 'visible',
    event: 'visibleChange',
  },
  props: dialogProps,
  data() {
    return {
      actionBtns: [],
      asyncActions: [],
    } as {
      actionBtns: DialogActionOptions[],
      asyncActions: DialogActionOptions[],
    };
  },
  watch: {
    actions() {
      this.actionBtns = this.getActionBtns();
    },
  },
  mounted() {
    this.actionBtns = this.getActionBtns();
  },
  methods: {
    close() {
      if (this.asyncActions.length > 0 && this.closeAfterAsyncTaskCompleted) return;
      this.asyncActions.map((action) => {
        if (action.loading === true) {
          this.$emit('abort', action);
        }
        this.$set(action, 'loading', false);
      });
      this.asyncActions = [];
      (this.$refs.popup as any).close();
    },
    getOKAction() {
      if (this.okBtn === null) return;
      return createActionOptions(
        defaultOKOptions,
        this.okBtn,
      );
    },
    getCancelAction() {
      if (this.cancelBtn === null) return;
      return createActionOptions(
        defaultCancelOptions,
        this.cancelBtn,
      );
    },
    getActionBtns() {
      if (this.actions === null) return [];
      let actionBtns = this.actions;
      if (actionBtns.length === 0) {
        const btns = [];
        const cancelAction = this.getCancelAction();
        if (cancelAction) btns.push(cancelAction);
        const okAction = this.getOKAction();
        if (okAction) btns.push(okAction);
        actionBtns = btns;
      }
      return actionBtns;
    },
    createActionHandler(action: DialogActionOptions) {
      const defaultHandler = () => {
        action.type && this.$emit(action.type);
        this.close();
      };
      if (action.type && !action.handle) return defaultHandler;
      return () => {
        action.type && this.$emit(action.type);
        if (action.handle instanceof Function) {
          this.asyncActions.push(action);
          const returnValue = action.handle();
          if (returnValue instanceof Promise) {
            this.$set(action, 'loading', true);
            returnValue.then((value) => {
              const index = this.asyncActions.indexOf(action);
              if (index >= 0) {
                this.$set(action, 'loading', false);
                this.asyncActions.splice(index, 1);
                if (value !== false) {
                  this.close();
                }
              }
            });
          } else {
            if (returnValue !== false) {
              this.close();
            }
          }
        }
      };
    },
    renderActions() {
      const eles: VNode[] = [];
      this.actionBtns.forEach((action, index) => {
        const style: Partial<CSSStyleDeclaration> = {
          color: action.color,
        };
        const handler = this.createActionHandler(action);
        eles.push(
          <Button
            inline={this.layout === 'row'}
            type="link"
            loading={action.loading}
            disabled={action.loading ? true : action.disabled}
            style={style}
            onClick={handler}>
            {action.text}
          </Button>
        );
        if (index < this.actionBtns.length - 1) {
          eles.push(<Divider vertical={this.layout === 'row'}></Divider>);
        }
      });
      const actionCls = {
        [dialogActionsCls]: true,
        [`is-${this.layout}`]: true,
      };
      return (
        <div class={dialogFooterCls}>
          <Divider></Divider>
          <div class={actionCls}>{eles}</div>
        </div>
      );
    },
    renderBody() {
      let icon;
      if (this.icon) {
        if (isIconProps(this.icon))  {
          const iconData: VNodeData = {
            props: this.icon
          };
          icon = this.$createElement(Icon, iconData);
        } else {
          icon = <Icon type={this.icon}></Icon>
        }
      }
      const { $slots, title, content } = this;
      let titleNode = $slots.title ? $slots.title : title;
      let contentNode = $slots.default ? $slots.default : content;
      return (
        <div class={dialogBodyCls}>
          {
            icon &&
            <div class={dialogBodyIconCls}>{icon}</div>
          }
          {
            titleNode &&
            <h1 class={dialogBodyTitleCls}>{titleNode}</h1>
          }
          {
            contentNode &&
            <p class={dialogBodyContentCls}>{contentNode}</p>
          }
        </div>
      );
    },
  },
  render() {
    const {
      icon,
      title,
      content,
      cancelBtn,
      okBtn,
      ...popupProps
    } = this.$props;
    const popupNodeData: VNodeData = {
      props: {
        ...popupProps,
        targetClass: addTargetClass({
          [baseDialogName]: true,
        }, popupProps.targetClass),
      },
      on: this.$listeners,
      ref: 'popup'
    };
    return (
      <Popup {...popupNodeData}>
        {this.renderBody()}
        {this.renderActions()}
      </Popup>
    );
  },
});
