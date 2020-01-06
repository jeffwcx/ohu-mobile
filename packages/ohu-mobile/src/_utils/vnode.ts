import { filterEmpty, parseStyleText } from './props-util';
import Vue, { VNode } from 'vue';
export function cloneVNode(vnode: any, deep: boolean) {
  const componentOptions = vnode.componentOptions;
  const data = vnode.data;

  let listeners = {};
  if (componentOptions && componentOptions.listeners) {
    listeners = { ...componentOptions.listeners };
  }

  let on = {};
  if (data && data.on) {
    on = { ...data.on };
  }

  const cloned = new vnode.constructor(
    vnode.tag,
    data ? { ...data, on } : data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    componentOptions ? { ...componentOptions, listeners } : componentOptions,
    vnode.asyncFactory,
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.isCloned = true;
  if (deep) {
    if (vnode.children) {
      cloned.children = cloneVNodes(vnode.children, true);
    }
    if (componentOptions && componentOptions.children) {
      componentOptions.children = cloneVNodes(componentOptions.children, true);
    }
  }
  return cloned;
}

export function cloneVNodes(vnodes: any, deep: boolean) {
  const len = vnodes.length;
  const res = new Array(len);
  for (let i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i], deep);
  }
  return res;
}

export function cloneElement(n: any, nodeProps: any = {}, deep: boolean = false) {
  let ele = n;
  if (Array.isArray(n)) {
    ele = filterEmpty(n)[0];
  }
  if (!ele) {
    return null;
  }
  const node = cloneVNode(ele, deep);
  const { props = {}, key, on = {}, children, directives = [] } = nodeProps;
  const data = node.data || {};
  let cls: any = {};
  let style: any = {};
  const {
    attrs = {},
    ref,
    domProps = {},
    style: tempStyle = {},
    class: tempCls = {},
    scopedSlots = {},
  } = nodeProps;

  if (typeof data.style === 'string') {
    style = parseStyleText(data.style);
  } else {
    style = { ...data.style, ...style };
  }
  if (typeof tempStyle === 'string') {
    style = { ...style, ...parseStyleText(style) };
  } else {
    style = { ...style, ...tempStyle };
  }

  if (typeof data.class === 'string' && data.class.trim() !== '') {
    data.class.split(' ').forEach((c: string) => {
      cls[c.trim()] = true;
    });
  } else {
    cls = { ...data.class, ...cls };
  }
  if (typeof tempCls === 'string' && tempCls.trim() !== '') {
    tempCls.split(' ').forEach((c) => {
      cls[c.trim()] = true;
    });
  } else {
    cls = { ...cls, ...tempCls };
  }
  node.data = Object.assign({}, data, {
    style,
    attrs: { ...data.attrs, ...attrs },
    class: cls,
    domProps: { ...data.domProps, ...domProps },
    scopedSlots: { ...data.scopedSlots, ...scopedSlots },
    directives: [...(data.directives || []), ...directives],
  });

  if (node.componentOptions) {
    node.componentOptions.propsData = node.componentOptions.propsData || {};
    node.componentOptions.listeners = node.componentOptions.listeners || {};
    node.componentOptions.propsData = { ...node.componentOptions.propsData, ...props };
    node.componentOptions.listeners = { ...node.componentOptions.listeners, ...on };
    if (children) {
      node.componentOptions.children = children;
    }
  } else {
    node.data.on = { ...(node.data.on || {}), ...on };
  }

  if (key !== undefined) {
    node.key = key;
    node.data.key = key;
  }
  if (typeof ref === 'string') {
    node.data.ref = ref;
  }
  return node;
}

export function getVNodesByName(children: VNode[], name: string | ((name: string) => boolean)) {
  return children.filter((child) => {
    let cname = null;
    if (child && child.componentOptions) {
      const options = child.componentOptions;
      if (options.Ctor) {
        const ctor = options.Ctor as any;
        if (ctor.options && ctor.options.name) {
          cname = ctor.options.name;
        }
      }
    }
    if (name instanceof Function) {
      return name(cname);
    }
    return name === cname;
  });
}

export function isTargetComponent(vnode: VNode, name: string) {
  const options = vnode.componentOptions;
  if (options&& options.Ctor) {
    const ctor = options.Ctor as any;
    if (ctor.options && ctor.options.name) {
      return name === ctor.options.name;
    }
  }
  return false;
}

export function transformSlotsContext(slots: { [key: string]: VNode[] | undefined }, context?: Vue) {
  const result: VNode[][] = [];
  Object.keys(slots).reduce((arr, slot) => {
    const currentSlot = slots[slot];
    if (currentSlot) {
      if (context) {
        currentSlot.map((vnode) => {
          vnode.context = context;
        });
      }
      arr.push(currentSlot);
    }
    return arr;
  }, result);
  return result;
}


export function getVModelOption(vnode: VNode) {
  const Ctor = vnode.componentOptions?.Ctor as any;
  const { model } = Ctor.extendOptions;
  if (model) return model;
  return {
    event: 'input',
    prop: 'value',
  };
}
