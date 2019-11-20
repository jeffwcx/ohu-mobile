import { componentFactoryOf, extendFrom } from 'vue-tsx-support';
import Vue, { VueConstructor } from 'vue';
import props from 'vue-strict-prop';
import { prefix } from '../_utils/shared';
import Popup, { PopupProps } from '../Popup';
import deepmerge from 'deepmerge';
import { popupOutSideProps } from '../Popup/PopupWrapper';
import { SVGIconDef } from '@/global';
import Icon, { IconProps } from '../Icon';
import { VNodeData } from 'vue';
import { addTargetClass } from '../_utils/targetClass';
import Loading, { LoadingProps } from '../Loading';
import vars from '../_styles/variables';
import './styles/index.scss';
import isPlainObject from '../_utils/isPlainObject';
import { getIcon } from '../_utils/icon-utils';

export const toastProps = deepmerge({
  icon: props<string, SVGIconDef, IconProps>(String, Object).optional,
  duration: props(Number).default(3000),
  content: String,
  loading: props<LoadingProps, boolean>(Object, Boolean).default(false),
}, popupOutSideProps);

toastProps.mask.default = false;
toastProps.maskClosable.default = false;
toastProps.animate.default = 'fade';
toastProps.tapThrough.default = true;
toastProps.lockScroll.default = false;


const baseToastName = `${prefix}toast`;
const toastTextCls = `${baseToastName}__text`;
const ToastVue = Vue as VueConstructor<Vue & {
  _timer: number;
}>

export default extendFrom(ToastVue).create({
  name: baseToastName,
  props: toastProps,
  mounted() {
    if (!this.loading || (this.loading && this.duration > 0)) {
      this.fire();
    }
  },
  beforeDestroy() {
    if (this._timer) {
      clearTimeout(this._timer);
    }
  },
  methods: {
    fire() {
      if (this._timer) {
        clearTimeout(this._timer);
      }
      if (this.visible) {
        this._timer = setTimeout(() => {
          this.close();
        }, this.duration);
      }
    },
    close() {
      if (this.visible) {
        (this.$refs.popup as any).close();
      }
    },
  },
  render() {
    const {
      icon,
      duration,
      content,
      ...popupProps
    } = this.$props;
    const popupNodeData: VNodeData = {
      props: {
        ...popupProps,
        targetClass: addTargetClass({
          [baseToastName]: true,
        }, popupProps.targetClass),
      } as PopupProps,
      on: this.$listeners,
      ref: 'popup',
    };
    let loadingNode;
    if (this.loading) {
      const props: LoadingProps = {
        color: vars.colorTextBaseInverse,
        textColor: vars.colorTextBaseInverse,
      };
      if (isPlainObject(this.loading)) {
        Object.assign(props, this.loading);
      }
      loadingNode = <Loading {...{ props }}>{content}</Loading>
    }
    let iconNode;
    if (this.icon) {
      iconNode = getIcon(this.$createElement, this.icon);
    }
    return (
      <Popup {...popupNodeData}>
        {loadingNode || [iconNode, content && <div class={toastTextCls}>{content}</div>]}
      </Popup>
    );
  },
});
