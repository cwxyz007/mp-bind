import { JSONLike } from "./UpdateQueue";

export function JSONClone<T>(data: T): T {
  return isObject(data) ? JSON.parse(JSON.stringify(data)) : data;
}

export function def(
  obj: Object,
  prop: string,
  val: any,
  enumerable: boolean = false
) {
  if (!isObject(obj) && typeof obj !== "function") {
    console.warn("defineProperty should call on object", obj);
    return;
  }

  Object.defineProperty(obj, prop, {
    value: val,
    enumerable,
    writable: true,
    configurable: true,
  });
}

export function isObject(target: any) {
  return typeof target === "object" && target !== null;
}

export function isFunction(target: any) {
  return typeof target === "function";
}

export function isFrozen(target: any) {
  return Object.isFrozen(target);
}

export function nextTick(func: Function) {
  Promise.resolve().then(() => func());
}

export function shallowEqual(objA: JSONLike, objB: JSONLike) {
  if (isObject(objA) && isObject(objB)) {
    return JSON.stringify(objA) === JSON.stringify(objB);
  }

  return objA === objB;
}

export const noop = () => {};

export const empty = Object.freeze({});

export function cached<T extends (arg: any) => any>(func: T): T {
  const db = new Map<any, any>();

  return function (arg: any) {
    let val = db.get(arg);

    if (val !== undefined) {
      return val;
    }

    val = func(arg);
    db.set(arg, val);
    return val;
  } as T;
}
