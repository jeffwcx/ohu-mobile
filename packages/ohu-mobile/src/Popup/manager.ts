export default {
  zIndex: 9999,
  isLock: 0,
  getPopupZIndex() {
    const maskZIndex = this.zIndex + 1;
    const documentZIndex = this.zIndex + 2;
    this.zIndex += 2;
    return {
      maskZIndex,
      documentZIndex,
    };
  },
};
