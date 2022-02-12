export type Common = Record<string, any>

export type AtLeastOne<T> = {
  [K in keyof T]: Pick<T, K> & Partial<Omit<T, K>>
}[keyof T]

export type PickAttr<T, D extends keyof T> = { [P in D]: T[D] }[D]
