# Deacon

This application simulates the process of passing the plate and the communion elements with a variety of arrangements 
of saints in the pews, in order to explore various rules-of-thumb and see how they work out. Most of the responsible 
decisions in the code reside in the deacon and saint models, based on information provided by the pew models. As this 
develops, it should allow for a variety of deacon models trying different approaches and saint models providing the
deacons with interesting opportunities and challenges. Hopefully, this should also be a lot of fun.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/)
* [Yarn](https://yarnpkg.com/)
* [Ember CLI](https://cli.emberjs.com/release/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone https://github.com/lupestro/deacon.git` this repository
* change into the new directory
* `npm install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `yarn lint`
* `yarn lint:fix`

### Building

* `ember build` (development)
* `yarn build` (production)

### Building documentation

* `yarn doc`

### Deploying

Deliver the contents of the `dist` tree to the website.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://cli.emberjs.com/release/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

## Recent Changes:

0.1.0 - April 9, 2017 - Finished initial YUIdoc documentation support. Cleaned up existing unit tests.
      - November 22, 2017 - Updated to Typescript
      - February 19, 2018 - Prepared for deployment on site
      - May 28, 2018 - Version bump
0.2.0 - November 28, 2019 (Thankgiving Day) - Upgraded to 3.14, Octane stem to stern, and using typedoc.

## Needs Work:

* Come up with strategies for deacons to apply.
* Unit tests for models, since this is where the change is going to be focused.
