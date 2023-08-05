/**
 * Catch-all for ember-data.
 */
declare module 'ember-data' {
  interface ModelRegistry {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }
}
