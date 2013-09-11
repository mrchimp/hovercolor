
Hovercolor.js
=============

A jQuery plugin to colorize an image on hover.

[Available on Github](github.com/mrchimp/hovercolor)

Example
-------

    <script src="jquery.min.js"></script>
    <script src="jquery.hovercolor.min.js"></script>
    <script>
      $('img').hovercolor({
        color:'#f90',
        prerender: true
      });
    </script>

Options
-------

* __color__

  String. Default = '#f00'
  
  The color to apply to the image(s). Can be in #fff or #ffffff format.

* __prerender__

  Boolean. Default = false
  
  If true the colourised version will be pre-rendered when the page loads. Otherwise they will be rendered when the mouse first hovers over them. Either way, rendering only happens once and the results are cached.

Todo
----

* Make it work --Complete!
* Make it better --Pending...