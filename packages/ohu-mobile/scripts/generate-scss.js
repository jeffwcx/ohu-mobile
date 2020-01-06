
function transformSassVar(jsVar) {
  return '$' + jsVar.replace(/([A-Z])/g, (_, g) => '-' + g.toLowerCase());
}

export default function generateScssVars(jsVars) {
  return Object.keys(jsVars).map((key) => {
    const sassKey = transformSassVar(key);
    let value = jsVars[key];
    return `${sassKey}: ${value} !default;`;
  }).join('\n');
}

