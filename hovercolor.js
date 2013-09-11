(function ($) {
  $.hovercolor = function (el, options) {
    // To avoid scope issues, use 'base' instead of 'this'
    // to reference this class from internal events and functions.
    var base = this;

    // Access to jQuery and DOM versions of element
    base.$el = $(el);
    base.el = el;

    // Add a reverse reference to the DOM object
    base.$el.data("hovercolor", base);

    // Initialize the plugin
    base.init = function (){
      base.options = $.extend({},$.hovercolor.defaultOptions, options);
      base.originalPixels = null;
      base.currentPixels = null;
      base.canvas = document.createElement("canvas"),
      base.ctx = base.canvas.getContext("2d");
      base.$el.hover(base.onMouseOver, base.onMouseOut);
      base.color_rgb = base.hexToRgb(base.options.color);
      if (base.options.prerender) {
        base.createColorisedImage();
      }
    };

    // Colorize an image on mouseover
    base.onMouseOver = function (e) {
      e.stopPropagation();
      
      // Use cached version if available
      if (base.$el.data('hover')) {
        base.$el.attr('src', base.$el.data('hover'));
        return true;
      } else {
        base.createColorisedImage();
      }

      base.$el.attr('src', base.$el.data('hover'));
    }

    // Create a dataurl of the colorized image and store it on the element
    base.createColorisedImage = function () {

      var average = 0,
          colored_url = '';

      base.$el.data('original', base.$el.attr('src'));
      base.canvas.width = base.el.width;
      base.canvas.height = base.el.height;
      base.ctx.drawImage(
        base.el,
        0,
        0,
        base.el.naturalWidth,
        base.el.naturalHeight,
        0,
        0,
        base.el.width,
        base.el.height
      );

      base.originalPixels = base.ctx.getImageData(0, 0, base.el.width, base.el.height);
      base.currentPixels = base.ctx.getImageData(0, 0, base.el.width, base.el.height);

      if(!base.originalPixels) { return; } // fail if image hasn't loaded

      for(var I = 0, L = base.originalPixels.data.length; I < L; I += 4){
        if(base.currentPixels.data[I + 3] > 0){
          for (var x = 0; x < 3; x++) {
            base.currentPixels.data[I + x] = ((base.currentPixels.data[I] + base.currentPixels.data[I + 1] + base.currentPixels.data[I + 2]) / 3) / 255 * base.color_rgb[x];
          }
        }
      }

      base.ctx.putImageData(base.currentPixels, 0, 0);

      colored_url = base.canvas.toDataURL('image/png');

      base.$el.data('hover', colored_url);
    }

    base.onMouseOut = function () {
      base.$el.attr('src', base.$el.data('original'));
    }

    base.hexToRgb = function (hex) {
      var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

      hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
      });

      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

      return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
      ] : null;
    }

    base.init();
  }

  $.hovercolor.defaultOptions = {
    color: '#f00',
    prerender: false
  };

  $.fn.hovercolor = function (options){
    return this.each(function(){
      (new $.hovercolor(this, options));
    });
  };
}(jQuery));