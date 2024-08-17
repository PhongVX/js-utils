export const toCamelCase = (str: string): string => {
    return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
};

export const toSnakeCase = (str: string): string => {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
};

export const convertObjectKeysToCamelCase = (obj: any): any => {
    if (Array.isArray(obj)) {
      return obj.map((item) => convertObjectKeysToCamelCase(item));
    } else if (obj !== null && obj.constructor === Object) {
      return Object.keys(obj).reduce((acc, key) => {
        const camelCaseKey = toCamelCase(key);
        acc[camelCaseKey] = convertObjectKeysToCamelCase(obj[key]);
        return acc;
      }, {} as any);
    }
    return obj;
};


export const convertObjectKeysToSnakeCase = (obj: any): any => {
    if (Array.isArray(obj)) {
      return obj.map((item) => convertObjectKeysToSnakeCase(item));
    } else if (obj !== null && obj.constructor === Object) {
      return Object.keys(obj).reduce((acc, key) => {
        const snakeCaseKey = toSnakeCase(key);
        acc[snakeCaseKey] = convertObjectKeysToSnakeCase(obj[key]);
        return acc;
      }, {} as any);
    }
    return obj;
};