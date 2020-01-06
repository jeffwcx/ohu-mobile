

export default function(ancestorName: string) {
  return {
    provide() {
      return {
        [ancestorName]: this,
      };
    },
  };
}
