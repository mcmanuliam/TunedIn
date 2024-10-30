import {Memoise as Logic} from './memoise';

type MemoiseDecorator = (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;

const cacheInstance = new Logic();

/**
 * Memoise the method's return value based on call arguments
 * @param serialiser A function to generate a cache key based on method arguments. Defaults to JSON.stringify.
 */
function Memoise(serialiser: (args: any[]) => string = JSON.stringify): MemoiseDecorator {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]): any {
      const cacheKey = `${propertyKey}-${serialiser(args)}`;
      const cachedValue = cacheInstance.getCache(cacheKey);

      if (cachedValue !== undefined) {
        return cachedValue;
      }

      const result = originalMethod.apply(this, args);
      cacheInstance.setCache(cacheKey, result);
      return result;
    };

    return descriptor;
  };
}

/** Memoise the method's return value regardless of arguments */
function MemoiseAll(): MemoiseDecorator {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;

    descriptor.value = function (): any {
      const cacheKey = propertyKey;
      const cachedValue = cacheInstance.getCache(cacheKey);

      if (cachedValue !== undefined) {
        return cachedValue;
      }

      const result = originalMethod.apply(this);
      cacheInstance.setCache(cacheKey, result);
      return result;
    };

    return descriptor;
  };
}

/** Memoise based on only the first argument */
function MemoiseIdentity(): MemoiseDecorator {
  return Memoise(args => JSON.stringify(args[0]));
}

export {Memoise, MemoiseAll, MemoiseIdentity};
