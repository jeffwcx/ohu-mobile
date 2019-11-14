import Vue from 'vue';
import { componentFactoryOf } from 'vue-tsx-support';
import props from 'vue-strict-prop';
import { prefix } from '../_utils/shared';
import Popup from '../Popup';
import vars from '../_styles/variables';
import { popupOutSideProps } from '../Popup/PopupWrapper';
import deepMerge from 'deepmerge';
import { SVGIconDef } from '@/global';
import './styles/index.scss';
import { DialogActionOptions, DialogEvents } from './types';
import { createActionOptions, isIconProps } from './utils';
import Button from '../Button';
import { VNodeData, VNode } from 'vue';
import Divider from '../Divider';
import Icon, { IconProps } from '../Icon';

export type DialogIconOption = string | SVGIconDef | IconProps;

export const dialogProps = deepMerge({
  icon: props<string, SVGIconDef, IconProps>(String, Object).optional,
  title: String,
  content: String,
  cancelBtn: props<string, DialogActionOptions>(String, Object).optional,
  okBtn: props<string, DialogActionOptions>(String, Object).optional,
  actions: props.ofType<DialogActionOptions[] | null>().default(() => []),
}, popupOutSideProps);

dialogProps.animate.default = 'zoom';
dialogProps.maskClosable.default = false;

const baseDialogName = `${prefix}dialog`;
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
    } as {
      actionBtns: DialogActionOptions[],
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
    getOKAction() {
      return createActionOptions(
        { type: 'ok', text: 'OK', disabled: false },
        this.okBtn,
      );
    },
    getCancelAction() {
      return createActionOptions(
        {  type: 'cancel', text: 'Cancel', disabled: false, color:  vars.colorTextMinor },
        this.cancelBtn,
      );
    },
    getActionBtns() {
      if (this.actions === null) return [];
      let actionBtns = this.actions;
      if (actionBtns.length === 0) {
        actionBtns = [
          this.getCancelAction(),
          this.getOKAction(),
        ];
      }
      return actionBtns.map(action => {
        return Object.assign({}, action, {
          loading: action.loading !== undefined,
          handle: this.createActionHandler(action),
        });
      });
    },
    createActionHandler(action: DialogActionOptions) {
      const defaultHandler = () => {
        (this.$refs.popup as any).close();
        action.type && this.$emit(action.type);
      };
      if (action.type && !action.handle) return defaultHandler;
      return function() {
        if (action.handle instanceof Function) {
          Vue.set(action, 'loading', true);
          const returnValue = action.handle();
          if (returnValue instanceof Promise) {
            returnValue.then(() => {
              Vue.set(action, 'loading', false);
              defaultHandler();
            });
          } else {
            defaultHandler();
          }
        }
      };
    },
    renderActions() {
      const actionBtns = this.actionBtns;
      const eles: VNode[] = [];
      actionBtns.forEach((action, index) => {
        const style: Partial<CSSStyleDeclaration> = {
          color: action.color,
        };
        eles.push(
          <Button inline
            type="link"
            loading={action.loading}
            disabled={action.disabled}
            style={style}
            onClick={action.handle}>
            {action.text}
          </Button>
        );
        if (index < actionBtns.length - 1) {
          eles.push(<Divider vertical></Divider>);
        }
      });
      return [
        <Divider></Divider>,
        <div class={dialogActionsCls}>{eles}</div>
      ];
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
      return (
        <div class={dialogBodyCls}>
          {
            icon &&
            <div class={dialogBodyIconCls}>{icon}</div>
          }
          {this.title && <h1 class={dialogBodyTitleCls}>{this.title}</h1>}
          {this.content && <p class={dialogBodyContentCls}>{this.content}</p>}
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
        targetClass: baseDialogName,
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
