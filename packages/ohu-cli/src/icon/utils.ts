export function upperCaseFirstLetter(str: string) {
  if (str) {
    return str[0].toUpperCase() + str.substring(1);
  }
  return '';
}

/**
 * format to camel case string
 * @param name init string
 * @param firstLetter Capitalize the first letter
 * @returns Camel Case format string
 */
export function transformToCamelCase(name: string, firstLetter = true) {
  if (!name) return '';
  return name.split(/[_\-]/).map((str, index) => {
    if (index === 0 && !firstLetter) return str;
    return upperCaseFirstLetter(str);
  }).join('');
}



export function removeLastSep(name: string) {
  return name.replace(/[_\-]$/, '');
}
