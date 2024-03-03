export default function generateScssVars(jsVars: Record<string, any>) {
  return Object.keys(jsVars)
    .map((key) => {
      let value = jsVars[key];
      return `${key}: ${value} !default;`;
    })
    .join('\n');
}
