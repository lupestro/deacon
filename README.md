# Deacon

This application simulates the process of passing the plate and the communion elements with a variety of arrangements 
of saints in the pews, in order to explore various rules-of-thumb and see how they work out. Most of the responsible 
decisions in the code reside in the deacon and saint models, based on information provided by the pew models. As this 
develops, it should allow for a variety of deacon models trying different approaches and saint models providing the
deacons with interesting opportunities and challenges. Hopefully, this should also be a lot of fun.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone https://github.com/lupestro/deacon.git` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Building documentation

* `ember ember-cli-yuidoc`

### Deploying

Deliver the contents of the `dist` tree to the website.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* [QUnit](https://qunitjs.com/) (Also see [Ember.Test](http://emberjs.com/api/classes/Ember.Test.html) class.)
* [YUIDoc](http://yui.github.io/yuidoc/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

## Recent Changes:

0.1.0 - Added YUIdoc documentation support - more is needed, especially in the model areas. Cleaned up existing unit tests.

## Needs Work:

* Come up with strategies for deacons to apply.
* Unit tests for models, since this is where the change is going to be focused.
