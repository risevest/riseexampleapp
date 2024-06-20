export type SnakeToCamelCase<S extends string> =
  S extends `${infer T}_${infer U}`
    ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
    : S

export type ConvertSnakeToCamelCase<T> = T extends object
  ? {
      [K in keyof T as SnakeToCamelCase<K & string>]: T[K] extends Array<
        infer U
      >
        ? ConvertSnakeToCamelCase<U>[]
        : T[K] extends object
          ? ConvertSnakeToCamelCase<T[K]>
          : T[K]
    }
  : T

export type CamelToSnakeCase<S extends string> =
  S extends `${infer T}${infer U}`
    ? `${T extends Capitalize<T> ? '_' : ''}${Lowercase<T>}${CamelToSnakeCase<U>}`
    : S

export type ConvertCamelToSnakeCase<T> = T extends object
  ? {
      [K in keyof T as CamelToSnakeCase<K & string>]: T[K] extends Array<
        infer U
      >
        ? ConvertCamelToSnakeCase<U>[]
        : T[K] extends object
          ? ConvertCamelToSnakeCase<T[K]>
          : T[K]
    }
  : T

export type Identity<T> = T

export type Flatten<T> = Identity<{
  [K in keyof T]: T[K]
}>
