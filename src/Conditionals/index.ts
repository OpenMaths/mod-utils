import { Conditional, Constructable } from '../types'

/**
 * Find out whether value is null
 * @param  {any} val to be validated
 * @returns {Boolean} true if value is null, else false
 */
const isNull: Conditional = (val: any): val is null => {
  return val === null
}

/**
 * Find out whether type of value is undefined
 * @param  {any} val to be validated
 * @returns {Boolean} true if value is null, else false
 */
const isUndefined: Conditional = (val: any): val is undefined => {
  return typeof val === 'undefined'
}

/**
 * Find out whether value is null or undefined, therefore "missing"
 * @param  {any} val to be validated
 * @returns {Boolean} true if value is null or undefined, else false
 */
const isMissing: Conditional = (val: any): val is null | undefined => {
  return isNull(val) || isUndefined(val)
}

/**
 * Find out whether value is not null and not undefined, therefore "present"
 * @param  {any} val to be validated
 * @returns {Boolean} true if value is not null and not undefined, else false
 */
const isPresent: Conditional = (val: any): boolean => {
  return !isMissing(val)
}

/**
 * Find out whether value is of type Boolean
 * @param  {any} val to be validated
 * @returns {Boolean} true if value is of type Boolean, else false
 */
const isBoolean: Conditional = (val: any): val is boolean => {
  return isPresent(val) && typeof val === 'boolean'
}

/**
 * Find out whether value is of type Array
 * @param  {any} val to be validated
 * @returns {Boolean} true if value is of type Array, else false
 */
const isArray: Conditional = (val: any): boolean => {
  return isPresent(val) && Array.isArray(val)
}

/**
 * Find out whether value is of type Object
 * @param  {any} val to be validated
 * @returns {Boolean} true if value is of type Object, else false
 */
const isObject: Conditional = (val: any): val is object => {
  return isPresent(val) && typeof val === 'object' && !isArray(val)
}

/**
 * Find out whether value is of type String
 * @param  {any} val to be validated
 * @returns {Boolean} true if value is of type String, else false
 */
const isString: Conditional = (val: any): val is string => {
  return isPresent(val) && typeof val === 'string'
}

/**
 * Find out whether value is of type Number
 * @param  {any} val to be validated
 * @returns {Boolean} true if value is of type Number, else false
 */
const isNumber: Conditional = (val: any): val is number => {
  return isPresent(val) && typeof val === 'number' && !Number.isNaN(val)
}

/**
 * Find out whether value is of type Function
 * @param  {any} val to be validated
 * @returns {Boolean} true if value is of type Function, else false
 */
const isFunction: Conditional = (val: any): val is Function => {
  return isPresent(val) && typeof val === 'function'
}

/**
 * Find out whether value is of type String, and has at least 1 character
 * @param  {any} val to be validated
 * @returns {Boolean} true if value is of type String and has at least 1 character, else false
 */
const isNonEmptyString: Conditional = (val: any): val is string => {
  return isString(val) && val.length > 0
}

/**
 * Find out whether value is of type Array and has at least one element
 * @param  {any} val to be validated
 * @returns {Boolean} true if value is of type Array and has at least one element, else false
 */
const isNonEmptyArray: Conditional = (val: any): boolean => {
  return isArray(val) && val.length > 0
}

/**
 * Find out whether value is of type Boolean and is true
 * @param  {any} val to be validated
 * @returns {Boolean} true if value is of type Boolean and is true, else false
 */
const isTrue: Conditional = (val: any): val is boolean => {
  return isBoolean(val) && val === true
}

/**
 * Find out whether value is an Integer and greater than 0
 * @param  {any} val to be validated
 * @returns {Boolean} true if value is an Integer and greater than 0, else false
 */
const isPositiveInteger: Conditional = (val: any): val is number => {
  return isNumber(val) && Number.isInteger(val) && val > 0
}

/**
 * Find out whether value is an Integer and greater or equal to 0
 * @param  {any} val to be validated
 * @returns {Boolean} true if value is an Integer and greater or equal to 0, else false
 */
const isNonNegativeInteger: Conditional = (val: any): val is number => {
  return isNumber(val) && Number.isInteger(val) && val >= 0
}

/**
 * Find out whether value is an Array and its length is 1
 * @param  {any} val to be validated
 * @returns {Boolean} true if value is an Array and its length is 1, else false
 */
const hasOneItem: Conditional = (val: any): boolean => {
  return isArray(val) && val.length === 1
}

/**
 * Find out whether value is an Array and its length is more than 1
 * @param  {any} val to be validated
 * @returns {Boolean} true if value is an Array and its length is greater than 1, else false
 */
const hasMultipleItems: Conditional = (val: any): boolean => {
  return isArray(val) && val.length > 1
}

/**
 * Find out whether value is Constructable
 * @param  {any} val to be validated
 * @returns {Boolean} true if value is Constructable, else false
 */
const isConstructable: Conditional = (val: any): val is Constructable => {
  let result: boolean = isFunction(val)

  if (result) {
    try {
      new val()
      result = true
    } catch (err) {
      result = !isNonNegativeInteger(
        err.message.indexOf('is not a constructor'),
      )
    }
  }

  return result
}

/**
 * Find out whether value has only the keys provided
 * @param {any} val to be validated
 * @param {any} keys to be matched
 * @returns {Boolean} true if value has only the keys provided, else false
 */
const hasOnlyKeys: Conditional = (val: any, keys: any[]): boolean => {
  if (isObject(val) && isArray(keys)) {
    const objKeys = Object.keys(val)
    const propertiesInKeys = keys.filter(key => key in val)
    return (
      isEqual(propertiesInKeys.length, objKeys.length) &&
      isEqual(objKeys.length, keys.length)
    )
  }
  return false
}

/**
 * Find out whether value 1 and value 2 are equal
 * @param  {any} val1 to be validated
 * @param  {any} val2 to be validated
 * @returns {Boolean} true if value 1 and value 2 are equal, else false
 */
const isEqual: Conditional = (val1: any, val2: any): boolean => {
  return val1 === val2
}

export {
  isNull,
  isUndefined,
  isMissing,
  isPresent,
  isBoolean,
  isArray,
  isObject,
  isString,
  isNumber,
  isFunction,
  isNonEmptyString,
  isNonEmptyArray,
  isTrue,
  isPositiveInteger,
  isNonNegativeInteger,
  hasOneItem,
  hasMultipleItems,
  isConstructable,
  hasOnlyKeys,
  isEqual,
}
