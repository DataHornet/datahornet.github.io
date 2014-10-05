$(document).ready(function () {
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
    window.setTimeout(switchFeature, switchSeconds * 1000)
});