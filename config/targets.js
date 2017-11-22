/* eslint-env node */
let browsers;
if (process.env.EMBER_ENV === 'development') {
  browsers = [
    'last 1 Chrome versions',
    'last 1 Firefox versions'
  ]
} else {
  browsers = [
    'ie 11',
    'last 2 Chrome versions',
    'last 2 Firefox versions',
    'last 2 Safari versions'
  ]
}
module.exports = {
  browsers
};
