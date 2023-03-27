/*
 * @Author: lushuo
 * @Date: 2023-03-27 20:42:25
 * @LastEditTime: 2023-03-27 21:46:10
 * @LastEditors: lushuo
 * @Description: javascript基础
 * @FilePath: \javascript-base\base.js
 */

/**
 * @description: 类型判断
 * @param {*} target
 * @return {*}
 */
const getType = (target) => {
  const type = typeof target
  if (type !== 'object') return type
  return Object.prototype.toString
    .call(target)
    .replace(/^\[object (\S+)\]$/, '$1')
}

const isComplexDataType = (target) =>
  (typeof target === 'object' || typeof target === 'function') &&
  target !== null

/**
 * @description: 深度拷贝
 * @param {*} target
 * @param {*} hash
 * @return {*}
 */
function deepClone(target, hash = new WeakMap()) {
  // 日期对象直接返回一个新的日期对象
  if (target.constructor === Date) return new Date(target)
  // 正则对象直接返回一个新的正则对象
  if (target.constructor === RegExp) return new RegExp(target)
  // 利用weakMap解决循环引用问题，由于weakMap是弱引用类型，可以有效防止内存泄漏
  if (hash.has(target)) return hash.get(target)
  // 利用Object.getOwnPropertyDescriptors方法可以获取对象的所有自身属性的描述符配合Object.create方法可以创建一个新的包含源对象特性的新对象并继承原来对象的原型链
  const cloneObj = Object.create(
    Object.getPrototypeOf(target),
    Object.getOwnPropertyDescriptors(target)
  )
  hash.set(target, cloneObj)
  // 遍历对象的不可枚举属性和Symbol类型，可以使用Reflect.ownkeys方法
  for (const key of Reflect.ownKeys(target)) {
    cloneObj[key] =
      typeof target[key] === 'object' && target[key] !== null
        ? deepClone(target[key], hash)
        : target[key]
  }
  return cloneObj
}
