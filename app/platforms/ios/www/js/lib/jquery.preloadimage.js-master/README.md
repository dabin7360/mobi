# jQuery plugin preload images

jQuery plugin of preload images.

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/nak0yui/jquery.preloadimage.js/master/dist/jquery.preloadimage.min.js
[max]: https://raw.github.com/nak0yui/jquery.preloadimage.js/master/dist/jquery.preloadimage.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/jquery.preloadimage.min.js"></script>
<script>
jQuery(function($) {
  $.preLoadImage(['path/to/image1', 'path/to/image2'], function() {
    console.log('loaded all images.', this.images);
  }, function(image) {
    console.log('processed loading images.', image);
  });
// --
// or
// --
  $.preLoadImage({
    images: ['path/to/image3', 'path/to/image4'],
    onLoaded: function() {
      console.log('loaded all images.', this.images);
    },
    onProcessed: function(image) {
      console.log('processed loading images.', image);
    }
  });
// --
// or
// --
  $.preLoadImage(['path/to/image5', 'path/to/image6']).always(function(data) {
    console.log('loaded all images.', data.images);
  });
});
</script>
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Release History
* 0.1.0: Init.

## License
Copyright (c) 2015 nak0yui
Licensed under the MIT, GPL licenses.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/cowboy/grunt).

### Important notes
Please don't edit files in the `dist` subdirectory as they are generated via grunt. You'll find source code in the `src` subdirectory!

While grunt can run the included unit tests via PhantomJS, this shouldn't be considered a substitute for the real thing. Please be sure to test the `test/*.html` unit test file(s) in _actual_ browsers.

### Installing grunt
_This assumes you have [node.js](http://nodejs.org/) and [npm](http://npmjs.org/) installed already._

1. Test that grunt is installed globally by running `grunt --version` at the command-line.
1. If grunt isn't installed globally, run `npm install -g grunt-cli` to install the latest version. _You may need to run `sudo npm install -g grunt-cli`._
1. From the root directory of this project, run `npm install` to install the project's dependencies.
