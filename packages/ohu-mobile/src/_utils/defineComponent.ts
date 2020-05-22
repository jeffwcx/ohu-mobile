import Vue from 'vue';
import {  ComponentFactory, componentFactory } from 'vue-tsx-support';
import { createBemHelper, BlockContext, CreateBemHelper } from './classHelper';
import { $prefix } from '../_config/variables';
import ancestorMixin from './ancestorMixin';

export { default as props } from 'vue-strict-prop';


interface InnerProps {
  root: () => BlockContext;
  bem: CreateBemHelper;
};

export function defineComponent<
  TProps = {},
  TEvents = {},
  TScopedSlots = {},
  TInnerProperties = {},
  Super extends Vue = Vue>(
  name: string,
) {
  const helper = createBemHelper({ prefix: $prefix });
  return componentFactory.mixin({
    name: `${$prefix}${name}`,
    computed: {
      bem() {
        return helper;
      },
    },
    methods: {
      root: () => {
        return helper.block(name);
      },
    },
  } as any) as ComponentFactory<
  TProps,
  TEvents,
  TScopedSlots,
  TInnerProperties & InnerProps,
  Super>;
}

export function defineAncestorComponent<
  TProps = {},
  TEvents = {},
  TScopedSlots = {},
  TInnerProperties = {},
  Super extends Vue = Vue>(name: string) {
  return defineComponent<TProps, TEvents, TScopedSlots, TInnerProperties, Super>(name)
    .mixin(ancestorMixin(name));
}

export function defineDescendantComponent<
  Ancestor = typeof Vue,
  TProps = {},
  TEvents = {},
  TScopedSlots = {},
  TInnerProperties = {},
  Super extends Vue = Vue>(ancestorName: string, name: string) {
  return defineComponent<TProps, TEvents, TScopedSlots, TInnerProperties & { ancestor: Ancestor }, Super>(name)
    .mixin({
      inject: {
        ancestor: {
          from: ancestorName,
          default: null,
        },
      },
    });
}

export const defineDsc = defineDescendantComponent;

export const defineAnc = defineAncestorComponent;

