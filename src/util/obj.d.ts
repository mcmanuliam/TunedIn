/**
 * In TypeScript, almost everything is an object, including arrays, functions, and even primitives
 * like numbers and strings (when wrapped in their respective object types). However, in most cases,
 * when we refer to "objects," we're specifically talking about plain JavaScript objects, which are
 * collections of key-value pairs.
 *
 * This type is often used when dealing with objects where the shape is not known ahead of time, or
 * when you need to pass around an object that can contain any number of dynamic properties.
 */

type GenericObject<T> = {[key: string]: T};