

export default function(parentName: string) {
  return {
    provide() {
      return {
        [parentName]: this,
      };
    },
  };
}
