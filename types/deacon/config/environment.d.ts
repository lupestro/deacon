export default config;

/**
 * Type declarations for
 *    import config from './config/environment'
 *
 * For now these need to be managed by the developer
 * since different ember addons can materialize new entries.
 */
declare namespace config {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const environment: any;
  const modulePrefix: string;
  const podModulePrefix: string;
  const locationType: string;
  const rootURL: string;
}
