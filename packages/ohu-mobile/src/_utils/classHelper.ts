/**
 * Simple Class Helper: making class management more convenient, more clean, more easy
 * Api Draft
 * import { createBemHelper } from './classHelper';
 * const helper = createBemHelper({
 *   prefix: 'ohu-',
 *   elementJoin: '__',
 *   modifierJoin: '--',
 * });
 * // BlockContext
 * let btnClass = helper.block('button'); // ['ohu-button']
 * btnClass.is('active'); // ['ohu-button', 'is-active']
 * btnClass.isNot('active'); // ['ohu-button']
 * btnClass.has('icon'); // ['ohu-button', 'has-icon']
 * btnClass.without('icon'); // ['ohu-button']
 * btnClass.modifer('mixed'); // ['ohu-button', 'ohu-button--mixed']
 * btnClass.noModifer('mixed'); // ['ohu-button']
 * // bulk add and remove
 * btnClass.is('active', 'disabled'); // ['ohu-button', 'is-active', 'is-disabled']
 * btnClass.isNot('active', 'disable'); // ['ohu-button']
 * btnClass.has(['icon', 'text']); // ['ohu-button', 'has-icon', 'has-text']
 * btnClass.without(['icon', 'text']); // ['ohu-button']
 * btnClass.is({'loading': true, 'active': false});
 * // element
 * let btnIconClass = btnClass.element('icon'); // ['ohu-button__icon']
 * // block
 * let btnBlockClass = btnClass.block('icon'); // ['ohu-button-icon']
 */

export interface BemHelperOptions {
  prefix?: string;
  elementJoin?: string | ClassTransformFunc;
  modifierJoin?: string | ClassTransformFunc;
  blockJoin?: string | ClassTransformFunc;
  isJoin?: string | ClassTransformFunc;
  hasJoin?: string | ClassTransformFunc;
  noJoin?: string | ClassTransformFunc;
}

export interface CreateBemHelper {
  block(name: string): BlockContext;
}

export type ClassOptions = any[] | Record<string, boolean> | string | false;

type ClassTransformFunc = (...classItem: string[]) => string;

function transformArgs(options: ClassOptions | string, items: string[]) {
  if (typeof options === 'string') {
    return [options, ...items];
  }
  return options;
}

function transformJoin(option: string | ClassTransformFunc) {
  if (typeof option === 'string') {
    return (...classNames: string[]) => {
      return classNames.join(option);
    };
  }
  return option;
}

export class BlockContext extends Array<string> {
  public baseName!: string;
  private isJoinTransform!: ClassTransformFunc;
  private noJoinTransform!: ClassTransformFunc;
  private hasJoinTransform!: ClassTransformFunc;
  private blockJoinTransform!: ClassTransformFunc;
  private modiferJoinTransform!: ClassTransformFunc;
  private elementJoinTransform!: ClassTransformFunc;
  constructor(
    private rootName: string,
    private options?: BemHelperOptions,
  ) {
    super();
    this.baseName =
      options && options.prefix ? `${options.prefix}${rootName}` : rootName;
    this.push(this.baseName);
    if (options) {
      const { isJoin, hasJoin, blockJoin, elementJoin, modifierJoin, noJoin } =
        options;
      if (isJoin) this.isJoinTransform = transformJoin(isJoin);
      if (hasJoin) this.hasJoinTransform = transformJoin(hasJoin);
      if (blockJoin) this.blockJoinTransform = transformJoin(blockJoin);
      if (elementJoin) this.elementJoinTransform = transformJoin(elementJoin);
      if (modifierJoin) this.modiferJoinTransform = transformJoin(modifierJoin);
      if (noJoin) this.noJoinTransform = transformJoin(noJoin);
    }
  }
  private addClassItem(cls: string, transformClass?: ClassTransformFunc) {
    const classItem = transformClass ? transformClass(this.baseName, cls) : cls;
    if (this.indexOf(classItem) >= 0) return;
    this.push(classItem);
    return this;
  }
  private removeClassItem(cls: string, transformClass?: ClassTransformFunc) {
    let index = -1;
    if (transformClass) {
      index = this.indexOf(transformClass(this.baseName, cls));
    } else {
      index = this.indexOf(cls);
    }
    if (index >= 0) {
      this.splice(index, 1);
    }
    return this;
  }
  addClasses(options?: ClassOptions, transformClass?: ClassTransformFunc) {
    if (!options) return this;
    if (typeof options === 'string') {
      this.addClassItem(options);
      return this;
    }
    if (options instanceof Array) {
      options.forEach((classItem: any) => {
        if (typeof classItem === 'string') {
          this.addClassItem(classItem, transformClass);
        }
      });
      return this;
    }
    Object.keys(options).forEach((classItem: string) => {
      if (options[classItem]) {
        this.addClassItem(classItem, transformClass);
      }
    });
    return this;
  }
  removeClasses(options?: ClassOptions, transformClass?: ClassTransformFunc) {
    if (!options) return this;
    if (typeof options === 'string') {
      this.removeClassItem(options);
      return this;
    }
    if (options instanceof Array) {
      options.forEach((classItem: any) => {
        if (typeof classItem === 'string') {
          if (classItem === this.baseName) {
            throw new Error('Can not remove base class');
          }
          this.removeClassItem(classItem, transformClass);
        }
      });
      return this;
    }
    Object.keys(options).forEach((classItem: string) => {
      if (options[classItem]) {
        this.removeClassItem(classItem, transformClass);
      }
    });
    return this;
  }
  is(options?: ClassOptions | string, ...items: string[]) {
    if (!options) return this;
    const opts = transformArgs(options, items);
    return this.addClasses(opts, this.isJoinTransform);
  }
  isNot(options?: ClassOptions | string, ...items: string[]) {
    if (!options) return this;
    const opts = transformArgs(options, items);
    return this.removeClasses(opts, this.isJoinTransform);
  }
  no(options?: ClassOptions | string, ...items: string[]) {
    if (!options) return this;
    const opts = transformArgs(options, items);
    return this.addClasses(opts, this.noJoinTransform);
  }
  has(options?: ClassOptions | string, ...items: string[]) {
    if (!options) return this;
    const opts = transformArgs(options, items);
    return this.addClasses(opts, this.hasJoinTransform);
  }
  without(options?: ClassOptions | string, ...items: string[]) {
    if (!options) return this;
    const opts = transformArgs(options, items);
    return this.removeClasses(opts, this.hasJoinTransform);
  }
  modifer(options?: ClassOptions | string, ...items: string[]) {
    if (!options) return this;
    const opts = transformArgs(options, items);
    return this.addClasses(opts, this.modiferJoinTransform);
  }
  noModifer(options?: ClassOptions | string, ...items: string[]) {
    if (!options) return this;
    const opts = transformArgs(options, items);
    return this.removeClasses(opts, this.modiferJoinTransform);
  }
  element(name: string) {
    const eleName = this.elementJoinTransform(this.rootName, name);
    return new BlockContext(eleName, this.options);
  }
  block(name: string) {
    const blockName = this.blockJoinTransform(this.rootName, name);
    return new BlockContext(blockName, this.options);
  }
}

const defaultOptions: BemHelperOptions = {
  blockJoin: '-',
  elementJoin: '__',
  modifierJoin: '--',
  isJoin: (_: string, classItem: string) => {
    return `is-${classItem}`;
  },
  hasJoin: (_: string, classItem: string) => {
    return `has-${classItem}`;
  },
  noJoin: (_: string, classItem: string) => {
    return `no-${classItem}`;
  },
};

export function createBemHelper(options?: BemHelperOptions): CreateBemHelper {
  return {
    block(name: string) {
      return new BlockContext(name, Object.assign({}, defaultOptions, options));
    },
  };
}
