export abstract class BaseDBConnect {
  abstract add(d: any): any
  abstract get(d?: any): any
  abstract remove(d?: any): any
  abstract update(d?: any, t?: any): any
}
