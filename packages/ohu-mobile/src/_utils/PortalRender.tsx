import { extendFrom } from 'vue-tsx-support';
import props from 'vue-strict-prop';
import Vue, { VNode, VueConstructor } from 'vue';

export type PortalRenderChildren = () => VNode;

const portalRenderProps = {
  container: props.ofType<HTMLElement>().required,
  children: props.ofType<PortalRenderChildren>().required,
  visible: props(Boolean).default(false),
}

const PortalVue = Vue as VueConstructor<Vue & {
  _component: Vue | null,
  _wrapper: HTMLElement | null,
}>

export default extendFrom(PortalVue).create({
  name: 'portal-render',
  props: portalRenderProps,
  watch: {
    visible() {
      this.renderChildren();
    },
  },
  mounted() {
    this.renderChildren();
  },
  updated() {
    if (this.visible) {
      this.renderChildren();
    }
  },
  beforeDestroy() {
    this.remove();
  },
  methods: {
    remove() {
      if (this._component) {
        this._component.$destroy();
        this._component = null;
        if (this._wrapper && this._wrapper.parentNode) {
          this._wrapper.parentNode.removeChild(this._wrapper);
          this._wrapper = null;
        }
      }
    },
    renderChildren() {
      if (!this.visible) return;
      const self = this;
      const container = this.container;
      if (!this._wrapper) {
        const wrapper = document.createElement('div');
        process.env.NODE_ENV === 'test' && (wrapper.title = 'TEST');
        this._wrapper = wrapper;
        container.appendChild(wrapper);
      }
      if (!this._component && self._wrapper) {
        this._component = new Vue({
          el: self._wrapper,
          parent: self.$parent,
          mounted() {
            self._wrapper = this.$el;
          },
          render() {
            return self.children();
          },
        });
      }
    },
  },
  render(h) {
    return h();
  },
});
