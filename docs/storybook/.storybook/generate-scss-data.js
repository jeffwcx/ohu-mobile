
function transformSassVar(jsVar) {
  return '$' + jsVar.replace(/([A-Z])/g, (_, g) => '-' + g.toLowerCase());
}

module.exports = {
  generateScssVars(jsVars) {
    return Object.keys(jsVars).map((key) => {
      const sassKey = transformSassVar(key);
      let value = jsVars[key];
      return `${sassKey}: ${value} !default;`;
    }).join('\n');
  }
};


