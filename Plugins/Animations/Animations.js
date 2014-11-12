$.fn.aShow = function (callback, type, duration) {
    $(this).each(function () {
        var showAnimation, hideAnimation, timeout;
        var removeAnimated = false;

        if (!$(this).hasClass("animated") && !$(this).hasClass("animated-quick")) {
            removeAnimated = true;
            console.log(duration);

            switch (duration) {
                case 0:
                    $(this).addClass("animated");
                    break;
                case 1:
                    $(this).addClass("animated-quick");
                    break;
                case 2:
                    $(this).addClass("animated-xquick");
                    break;
            }
        }

        if (type == undefined) {
            showAnimation = $(this).attr("data-animation-show")
            hideAnimation = $(this).attr("data-animation-hide")
        } else {
            showAnimation = type;
            hideAnimation = "";
        }
        var timeout = (parseFloat($(this).css("animation-duration")) * 1000)

        var ele = this;
        setTimeout(function () {
            if (removeAnimated)
                $(ele).removeClass("animated").removeClass("animated-quick").removeClass("animated-xquick");

            $(ele).removeClass(showAnimation)

            if (callback != undefined)
                callback();
        }, timeout)


        $(this).show().removeClass(hideAnimation).addClass(showAnimation)
    });
}

$.fn.aHide = function (callback, type, duration) {
    $(this).each(function () {
        var showAnimation, hideAnimation, timeout;
        var removeAnimated = false;

        if (!$(this).hasClass("animated") && !$(this).hasClass("animated-quick")) {
            removeAnimated = true;
            console.log(duration);

            switch (duration) {
                case 0:
                    $(this).addClass("animated");
                    break;
                case 1:
                    $(this).addClass("animated-quick");
                    break;
                case 2:
                    $(this).addClass("animated-xquick");
                    break;
            }
        }

        if (type == undefined) {
            showAnimation = $(this).attr("data-animation-show")
            hideAnimation = $(this).attr("data-animation-hide")
        } else {
            hideAnimation = type;
            showAnimation = "";
        }
        var timeout = (parseFloat($(this).css("animation-duration")) * 1000)

        var ele = this;
        setTimeout(function () {
            console.log("hello")
            $(ele).css("display", "none")

            if (removeAnimated)
                $(this).removeClass("animated").removeClass("animated-quick").removeClass("animated-xquick");

            $(ele).removeClass(hideAnimation);
            

            if (callback != undefined)
                callback();
        }, timeout)


        $(this).show().removeClass(showAnimation).addClass(hideAnimation)
    });
}

//Data-transfer ->
//data marker

$.fn.positionToBody = function () {
    var offset = $(this).offset();

    $(this).appendTo("body")
        .css("position", "fixed")
        .offset(offset);

    return $(this);
}

$.fn.aDisable = function (bool) {
    if (bool) {
        $(this).css("transition-property", "none")
    }
    else
    {
        $(this).css("transition-property", "")
    }

    return $(this);
}

var move_state = 0;
$.fn.aMove = function () {
    if (move_state > 0)
        return $(this);

    move_state = 1;

    $(".main-logo").aHide()
    $("#coreNavBar").aShow();

    $(this).each(function(){
        var target = $(this).attr("data-transfer");
        var $target = $("*[data-marker='" + target + "']");
        
        if ($target == undefined)
            return;

        $(this).aDisable(true);
    
        var placeHolder = document.createElement("span");

        $(this).prop("placeholder", placeHolder)

        var percentLeft = $(this).position().left / $(this).parent().width();
        var percentTop = $(this).position().top / $(this).parent().height();
        $(this)
            .attr("data-original-left", percentLeft)
            .attr("data-original-top", percentTop)

        $(this).positionToBody()
            .css("filter", "none")
            .css("-webkit-filter", "none")

        $target.width($(this).width());
    })

    $(this).each(function () {
        var target = $(this).attr("data-transfer");
        var $target = $("*[data-marker='" + target + "']");

        if ($target == 'undefined')
            return;

        var $element = $(this);
        $(this).aDisable(false);

        var targetOffset = $target.offset();

        $(this)
            .css("transition-property", "")
            .offset(targetOffset)
            .height($target.height())
            .css("line-height", $target.height() + "px")
            .css("z-index", "9999999")

        $element.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
            $element
                .css("position", "")
                .css("z-index", "")
                .css("top", "0px")
                .css("left", "0px")
                .css("opacity", "")
                .css("height", "100%")
                .appendTo($target.children("a"))

            move_state = 2;

            $element.off("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd");
        });
    })

}

$.fn.aRestore = function () {
    if (move_state < 2)
        return $(this);

    move_state = 1;

    $(".main-logo").aShow()
    $("#coreNavBar").aHide();

    $(this).each(function () {
        var target = $(this).attr("data-home");
        var $target = $("#" + target);
        var originator = $(this).attr("data-transfer");
        var $originator = $("*[data-marker='" + target + "']");

        $(this)
            .css("height", $(this).height() + "px")
            .aDisable(true)
            .css("z-index", "9999");

        $(this).positionToBody()
            .css("filter", "none")
            .css("-webkit-filter", "none")
    })

    $(this).each(function () {
        var $target = $(this).prop("placeholder");
        var originator = $(this).attr("data-transfer");
        var $originator = $("*[data-marker='" + target + "']");

        var oLeft = $(this).attr("data-original-left")
        var oTop = $(this).attr("data-original-top")
        console.log($target)
        var targetOffset = $target.parent().offset();
        console.log(targetOffset)
        targetOffset.left = targetOffset.left + ($target.parent().width() * parseFloat(oLeft));
        targetOffset.top = targetOffset.top + ($target.parent().height() * parseFloat(oTop));

        $(this)
            .aDisable(false)
            .css("height", "")
            .css("line-height", "")
            .css("-webkit-filter", "")
            .css("filter", "")
            .offset(targetOffset)

        var $element = $(this);

        $element.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
            $element
                .css("position", "")
                .css("z-index", "")
                .css("top", "")
                .css("left", "")
                .css("opacity", "")
                .css("height", "")
                .appendTo($target.parent())

            move_state = 0;
        })
    })

}