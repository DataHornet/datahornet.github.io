$.fn.animateTransfer = function (target, startcallback, endcallback) {
    $(this).css("visibility", "");
    var original = this;
    
    var transfer = $(this)
        .clone()
        .removeAttr("id")
        .appendTo("body")
        .css("left", $(this).offset().left + "px")
        .css("top", $(this).offset().top + "px")
        .addClass("transfer");

    setTimeout(function () {
        if (startcallback != undefined)
            startcallback();

        $(transfer).addClass("transfer-animate")


        $(original).css("visibility", "hidden");
        $(target).css("visibility", "hidden");
        //Transfer prepared.
        
        $(transfer)
            .css("left", $(target).offset().left + "px")
            .css("top", $(target).offset().top + "px")
            .css("width", $(target).width())
            .css("height", $(target).height())
    
        $(transfer).on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
            function (e) {
                $(transfer).remove();
                $(target).css("visibility", "");
    
                if (endcallback != undefined)
                    endcallback();
            });
    }, 10)


}