module.exports = {
  icon: {
    outputDir: './icons',
    globs: './remixicon/**/*.svg',
    template: './templates/svg-template.art',
    type: './templates/svg-types.art',
    rename: ({ theme, name }) => {
      const themeMap = {
        line: 'outlined',
        multi: 'multi-color',
        fill: 'filled',
      };
      if (!theme) return { theme: 'outlined', name };
      if (themeMap[theme]) {
        return { theme: themeMap[theme], name };
      }
      return { theme, name };
    },
  },
};
