export function formatString(str, ...replacements: string[]) {
  const args = arguments;
  return str.replace(/{(\d+)}/g, function (match, number) {
    return typeof args[+number + 1] !== 'undefined' ? args[+number + 1] : match;
  });
}

export function replaceString(
  str,
  data,
  prefixStr = '',
  stratContainerStr = '',
  endContainerStr = ''
) {
  if (str && data) {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        str = str.replace(
          new RegExp(
            prepareForRegx(
              stratContainerStr + prefixStr + key + endContainerStr
            ),
            'g'
          ),
          data[key]
        );
      }
    }
  }
  return str;
}

function prepareForRegx(str: string) {
  if (str) {
    const escapeItems = ['?'];
    for (const st of escapeItems) {
      str = str.replace(new RegExp('\\' + st, 'g'), '\\' + st);
    }
  }
  return str;
}
export function isString(obj: any): obj is string {
  return typeof obj === 'string';
}
