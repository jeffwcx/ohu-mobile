const config = {
  icon: {
    outputDir: './icons',
    globs: '../ohu-mobile-icons/remixicon',
    // globs: './src/icon/__tests__/assets/complex',
    sortDir: false,
    dynamicId: true,
    rename: ({ theme, name }) => {
      const themeMap = {
        line: 'outlined',
        multi: 'multi-color',
        fill: 'filled',
      };
      if (themeMap[theme]) {
        return { theme: themeMap[theme], name };
      }
      return { theme, name };
    },
  },
};

export default config;
