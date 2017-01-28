//Scripts for simple site functions

$(document).ready(function(){
  $(".content-markdown img").each(function(){
    $(this).addClass("img-responsive")
  })


/*
* Clamped-width.
* Usage:
*  <div data-clampedwidth=".myParent">This long content will force clamped width</div>
*
* Author: LV
*/
$('[data-clampedwidth]').each(function () {
    var elem = $(this);
    var parentPanel = elem.data('clampedwidth');
    var resizeFn = function () {
        var sideBarNavWidth = $(parentPanel).width() - parseInt(elem.css('paddingLeft')) - parseInt(elem.css('paddingRight')) - parseInt(elem.css('marginLeft')) - parseInt(elem.css('marginRight')) - parseInt(elem.css('borderLeftWidth')) - parseInt(elem.css('borderRightWidth'));
        elem.css('width', sideBarNavWidth);
    };

    resizeFn();
    $(window).resize(resizeFn);
});

})
