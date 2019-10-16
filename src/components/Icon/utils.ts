

export function transformToCamelCase(name: string) {
  return name.split('-').map(str => {
    return str[0].toUpperCase() + str.substring(1);
  }).join('');
}
