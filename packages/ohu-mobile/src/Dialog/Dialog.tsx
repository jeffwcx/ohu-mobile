import props from 'vue-strict-prop';
import Popup from '../Popup';
import { popupOutSideProps } from '../Popup/PopupWrapper';
import deepMerge from 'deepmerge';
import { DialogActionOptions, DialogEvents, DialogProps } from './types';
import { createActionOptions } from './utils';
import Button from '../Button';
import { VNode, CSSProperties } from 'vue';
import Divider from '../Divider';
import { IconProps } from '../Icon';
import { getIcon } from '../_utils/icon-utils';
import localeMixin from '../_utils/localeMixin';
import { IconProperty, IconDef } from '../types';
import { $colorTextMinor } from '../_config/variables';
import Image, { ImageProps } from '../Image';
import { defineComponent } from '../_utils/defineComponent';

function defaultOKOptions(text?: string): DialogActionOptions {
  return {
    type: 'ok',
    text,
    disabled: false,
  };
}

function defaultCancelOptions(text?: string): DialogActionOptions {
  return {
    type: 'cancel',
    text,
    disabled: false,
    color: $colorTextMinor,
  };
}

export type DialogIconOption = IconProperty;

export const dialogProps = deepMerge(
  {
    image: props<string, ImageProps>(String, Object).optional,
    icon: props<string, IconDef, IconProps>(String, Object).optional,
    title: String,
    content: String,
    cancelBtn: props<string, DialogActionOptions, null>(String, Object)
      .optional,
    okBtn: props<string, DialogActionOptions, null>(String, Object).optional,
    actions: props.ofType<DialogActionOptions[] | null>().default(() => []),
    layout: props.ofStringLiterals('row', 'column').default('row'),
    closeAfterAsyncTaskCompleted: props(Boolean).default(false),
  },
  popupOutSideProps,
);

dialogProps.animate.default = 'zoom';
dialogProps.maskClosable.default = false;

export default defineComponent<DialogProps, DialogEvents>('dialog')
  .mixin(localeMixin('OhuDialog'))
  .create({
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
        actionBtns: DialogActionOptions[];
        asyncActions: DialogActionOptions[];
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
        if (this.asyncActions.length > 0 && this.closeAfterAsyncTaskCompleted)
          return;
        this.asyncActions.map((action) => {
          if (action.loading === true) {
            this.$emit('abort', action);
          }
          this.$set(action, 'loading', false);
        });
        this.asyncActions = [];
        (this.$refs.popup as any)?.close();
      },
      getOKAction() {
        if (this.okBtn === null) return;
        return createActionOptions(
          defaultOKOptions(this.$l.defaultOKText),
          this.okBtn,
        );
      },
      getCancelAction() {
        if (this.cancelBtn === null) return;
        return createActionOptions(
          defaultCancelOptions(this.$l.defaultCancelText),
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
        const cls = this.$rootCls();
        const eles: VNode[] = [];
        this.actionBtns.forEach((action, index) => {
          const style: CSSProperties = {
            color: action.color,
          };
          const handler = this.createActionHandler(action);
          eles.push(
            <Button
              inline={this.layout === 'row'}
              link
              type="primary"
              loading={action.loading}
              disabled={action.loading ? true : action.disabled}
              style={style}
              onClick={handler}
            >
              {action.text}
            </Button>,
          );
          if (index < this.actionBtns.length - 1) {
            eles.push(<Divider vertical={this.layout === 'row'}></Divider>);
          }
        });
        return (
          <div class={cls.element('footer')}>
            <Divider></Divider>
            <div class={cls.element('actions').is(this.layout)}>{eles}</div>
          </div>
        );
      },
      renderBody() {
        let icon;
        if (this.icon) {
          icon = getIcon(this.$createElement, this.icon);
        }
        const { $slots, $rootCls, title, content } = this;
        let titleNode = $slots.title ? $slots.title : title;
        let contentNode = $slots.default ? $slots.default : content;
        const bodyCls = $rootCls().element('body');
        return (
          <div class={bodyCls}>
            {icon && <div class={bodyCls.element('icon')}>{icon}</div>}
            {titleNode && <h1 class={bodyCls.element('title')}>{titleNode}</h1>}
            {contentNode && (
              <p class={bodyCls.element('content')}>{contentNode}</p>
            )}
          </div>
        );
      },
    },
    render() {
      const cls = this.$rootCls();
      const { icon, title, content, cancelBtn, okBtn, image, ...popupProps } =
        this.$props;
      const popupNodeData = {
        props: {
          ...popupProps,
          targetClass: cls.addClasses(popupProps.targetClass),
        },
        on: this.$listeners,
        ref: 'popup',
      };
      return (
        <Popup {...popupNodeData}>
          {image && (
            <div class={cls.element('banner')}>
              {typeof image === 'string' ? (
                <Image src={image} />
              ) : (
                <Image {...{ props: image }} />
              )}
            </div>
          )}
          {this.renderBody()}
          {this.renderActions()}
        </Popup>
      );
    },
  });
