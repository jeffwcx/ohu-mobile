const camelizeRE = /-(\w)/g;
const camelize = (str: string) => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''));
};
const parseStyleText = (cssText = '', camel?: boolean) => {
  const res: any = {};
  const listDelimiter = /;(?![^(]*\))/g;
  const propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiter);
      if (tmp.length > 1) {
        const k = camel ? camelize(tmp[0].trim()) : tmp[0].trim();
        res[k] = tmp[1].trim();
      }
    }
  });
  return res;
};

export function isEmptyElement(c: any) {
  return !(c.tag || (c.text && c.text.trim() !== ''));
}

export function filterEmpty(children: any[] = []) {
  return children.filter((c) => !isEmptyElement(c));
}

export { parseStyleText };
