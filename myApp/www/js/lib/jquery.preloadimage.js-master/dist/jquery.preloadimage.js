/*! jQuery plugin preload images - v0.1.0 - 2015-05-25 https://github.com/nak0yui/jquery.preloadimage.js Copyright (c) 2015 nak0yui; Licensed MIT, GPL */
(function($) {
  'use strict';

  /**
   * jQuery.preLoadImage
   * @param {*} images array or string or object
   * @param {function} onLoaded
   * @param {function} onProcessed
   * @return {jQuery.Deferred} deferred object
   */
  var preLoadImage = function(images, onLoaded, onProcessed) {
    var deferred = $.Deferred();
    var preloader = {
      images: [],
      length: 0,
      onLoaded: onLoaded,
      onProcessed: onProcessed,
      count: 0,
      errorCount: 0
    };

    if ($.isArray(images) === false && typeof images === "object") {
      $.extend(preloader, images);
      images = preloader.images;
      preloader.images = [];
    }

    if (typeof images === "string") {
      images = [images];
    }

    preloader.length = images.length;

    var processed = function(image, isError) {
      preloader.count++;
      if ($.isFunction(preloader.onProcessed)) {
        preloader.onProcessed.call(preloader, image, isError);
      }
      if (preloader.count >= preloader.length) {
        if ($.isFunction(preloader.onLoaded)) {
          preloader.onLoaded.call(preloader);
        }
        deferred.resolve(preloader);
      }
    };

    var load = function() {
      processed(this, false);
    };
    var error = function() {
      preloader.errorCount++;
      processed(this, true);
    };

    var i;
    for (i = 0; i < preloader.length; i++) {
      var image = $('<img>');
      image.load(load);
      image.error(error);
      image.attr('src',images[i]);
      preloader.images.push(image);
    }
    return deferred.promise();
  };

  $.preLoadImage = function(images, onLoaded, onProcessed) {
    return preLoadImage(images, onLoaded, onProcessed);
  };

}(window.jQuery));
