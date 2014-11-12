function restoreBoxes() {
    $(".box").removeClass("box-shifted");
    $(".box").css("left", "");
}

function transitBoxes() {
    $(".box").each(function () {
        var ind = $(this).closest('.box').index('.box');

        $(this).css("left", (ind * 10) + "%");
        $(this).addClass("box-shifted")

    })
}



$(document).ready(function () {
    $(".resizeParent").responsiveImageMap();
    $(document).trigger("resize")

    $.menuEffects([
    {
        element: $(".bubbleButton"),
        defaultState: "blur greyscale opacity50",
        hoverState: "enlarge",
        otherHoverState: "greyscale opacity75"
    },
    {
        element: $(".bubbleText"),
        defaultState: "greyscale",
        hoverState: "",
        otherHoverState: "greyscale",
        nohover:true
    },
    {
        element: $(".bubbleLogo"),
        defaultState: "",
        hoverState: "",
        otherHoverState: "blur opacity50",
        nohover:true
    }])

    $("ul[data-liffect] li").each(function (i) {
        $(this).attr("style", "-webkit-animation-delay:" + i * 300 + "ms;"
                + "-moz-animation-delay:" + i * 300 + "ms;"
                + "-o-animation-delay:" + i * 300 + "ms;"
                + "animation-delay:" + i * 300 + "ms;");
        if (i == $("ul[data-liffect] li").size() - 1) {
            $("ul[data-liffect]").addClass("play")
        }
    });
});

var switchSeconds = 6;
var fadeSpeed = "slow";
var swing = "linear";

function switchFeature() {
    var currentFeature = $(".feature:visible");

    var nextFeature = currentFeature.next(".feature")

    if (nextFeature.length == 0)
        nextFeature = $(".feature:first-child");

    currentFeature.fadeOut(fadeSpeed, swing, function () {
        nextFeature.fadeIn();

        window.setTimeout(switchFeature, switchSeconds * 1000);
    });
}

$(document).ready(function () {
    $(document).scrollTop(0);
    window.setTimeout(switchFeature, switchSeconds * 1000)
    /*
    $(".animated").css("visibility", "hidden")

    $(document).scroll(function () {
        var scroll = $(this).scrollTop() + $(window).height();

        $(".animated").each(function () {
            if (scroll > $(this).offset().top + ($(this).outerHeight()/2)) {
                 var animation = $(this).attr("data-animation")
                
                 $(this).css("visibility", "visible").addClass(animation)
            }
        })
    });*/
});