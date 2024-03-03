export function createAncestorMixin(ancestorName: string) {
  return {
    provide() {
      return {
        [ancestorName]: this,
      };
    },
  };
}

export function createDescendantMixin(ancestorName: string) {
  return {
    inject: {
      ancestor: {
        from: ancestorName,
        default: null,
      },
    },
  };
}
