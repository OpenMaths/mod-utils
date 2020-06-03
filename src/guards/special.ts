// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures.

export const isNull = <T>(term: T | null): term is null => {
  return term === null;
};

export const isFunction = <T extends Function, U>(term: T | U): term is T => {
  return typeof term === "function";
};

export const isObject = <T extends object, U>(term: T | U): term is NonNullable<T> => {
  return !isNull(term) && typeof term === "object" && !Array.isArray(term);
};

export const isArray = <T, U>(term: Array<T> | U): term is Array<T> => {
  return Array.isArray(term);
};

export const isMap = <K, V, U>(term: Map<K, V> | U): term is Map<K, V> => {
  return term instanceof Map;
};

export const isSet = <T, U>(term: Set<T> | U): term is Set<T> => {
  return term instanceof Set;
};

export const isWeakMap = <K extends object, V, U>(
  term: WeakMap<K, V> | U,
): term is WeakMap<K, V> => {
  return term instanceof WeakMap;
};

export const isWeakSet = <T extends object, U>(
  term: WeakSet<T> | U,
): term is WeakSet<T> => {
  return term instanceof WeakSet;
};

export const isDate = <U>(term: Date | U): term is Date => {
  return term instanceof Date;
};
