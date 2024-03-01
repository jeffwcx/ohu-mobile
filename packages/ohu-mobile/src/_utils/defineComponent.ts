import Vue from 'vue';
import type {
  RecordPropsDefinition,
  ThisTypedComponentOptionsWithRecordProps as ThisTypedComponentOptions,
} from 'vue/types/options';
import type { ComponentOptionsMixin } from 'vue/types/v3-component-options';
import {
  type _TsxComponentV3,
  componentFactory,
  type PropsForOutside,
  DeclareProps,
  RequiredPropNames,
  type InnerScopedSlots,
  type ScopedSlotHandlers,
} from 'vue-tsx-support';
import { createBemHelper, BlockContext, CreateBemHelper } from './classHelper';
import { createAncestorMixin, createDescendantMixin } from './relationsMixin';
import { $prefix } from '../_config/variables';

export { default as props } from 'vue-strict-prop';

export interface ComponentFactory<
  BaseProps,
  PrefixedEvents,
  Events,
  ScopedSlotArgs,
  Super extends Vue,
> {
  create<
    Data,
    Methods,
    Computed,
    Props,
    SetupBindings,
    PropsDef extends RecordPropsDefinition<Props>,
    Mixin extends ComponentOptionsMixin,
    Extends extends ComponentOptionsMixin,
    RequiredProps extends keyof Props = RequiredPropNames<PropsDef> &
      keyof Props,
  >(
    options: ThisTypedComponentOptions<
      Super &
        Vue & {
          _tsx?: DeclareProps<
            PropsForOutside<Props, RequiredProps> & BaseProps
          >;
          $scopedSlots?: ScopedSlotHandlers<InnerScopedSlots<ScopedSlotArgs>>;
        },
      Data,
      Methods,
      Computed,
      Props,
      SetupBindings,
      Mixin,
      Extends
    > & {
      props?: PropsDef;
    },
    requiredPropsNames?: RequiredProps[],
  ): _TsxComponentV3<
    Super & Data & Methods & Computed & Props,
    {},
    PropsForOutside<Props, RequiredProps> & BaseProps,
    PrefixedEvents,
    Events,
    ScopedSlotArgs
  >;

  mixin<
    Data,
    Methods,
    Computed,
    Props,
    SetupBindings,
    Mixin extends ComponentOptionsMixin,
    Extends extends ComponentOptionsMixin,
  >(
    mixinObject: ThisTypedComponentOptions<
      Vue,
      Data,
      Methods,
      Computed,
      Props,
      SetupBindings,
      Mixin,
      Extends
    >,
  ): ComponentFactory<
    BaseProps & Props,
    PrefixedEvents,
    Events,
    ScopedSlotArgs,
    Super & Data & Methods & Computed & Props
  >;

  mixin<VC extends typeof Vue>(
    mixinObject: VC,
  ): ComponentFactory<
    BaseProps,
    PrefixedEvents,
    Events,
    ScopedSlotArgs,
    Super &
      InstanceType<VC> & { $scopedSlots: InnerScopedSlots<ScopedSlotArgs> }
  >;
}

export interface OhuComponentInnerProps {
  $rootCls: () => BlockContext;
  $bem: CreateBemHelper;
}

export function createOhuMixin(name: string) {
  const helper = createBemHelper({ prefix: $prefix });
  return {
    name: `${$prefix}${name}`,
    computed: {
      $bem() {
        return helper;
      },
      $rootCls() {
        return () => helper.block(name);
      },
    },
  };
}

export function defineComponent<
  TProps = {},
  TEvents = {},
  TScopedSlots = {},
  TInnerProperties = {},
  On = {},
  Super extends Vue = Vue,
>(name: string) {
  return componentFactory.mixin(createOhuMixin(name)) as ComponentFactory<
    TProps,
    TEvents,
    On,
    TScopedSlots,
    Super & TInnerProperties & OhuComponentInnerProps
  >;
}

export function defineAncestorComponent<
  TProps = {},
  TEvents = {},
  TScopedSlots = {},
  TInnerProperties = {},
  Super extends Vue = Vue,
>(name: string) {
  return defineComponent<
    TProps,
    TEvents,
    TScopedSlots,
    TInnerProperties,
    Super
  >(name).mixin(createAncestorMixin(name));
}

export function defineDescendantComponent<
  Ancestor = typeof Vue,
  TProps = {},
  TEvents = {},
  TScopedSlots = {},
  TInnerProperties = {},
  Super extends Vue = Vue,
>(ancestorName: string, name: string) {
  return defineComponent<
    TProps,
    TEvents,
    TScopedSlots,
    TInnerProperties & { ancestor: Ancestor },
    Super
  >(name).mixin(createDescendantMixin(ancestorName));
}

export const defineDsc = defineDescendantComponent;

export const defineAnc = defineAncestorComponent;
