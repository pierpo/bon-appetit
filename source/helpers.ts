export function hasOwnProperty<
  X extends Record<PropertyKey, unknown>,
  Y extends PropertyKey
>(
  obj: X,
  prop: Y
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore I don't know how to assert that Y is in X, help appreciated
): prop is keyof X {
  // eslint-disable-next-line no-prototype-builtins
  return obj.hasOwnProperty(prop);
}
