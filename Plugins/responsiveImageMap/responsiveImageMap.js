$.fn.responsiveImageMap = function () {
    var scale = 0.9;
    var image = this;
    var timeout;

    //Resize image
    //$(window).resize(function () {
        window.onresize = doResize;

        function doResize() {
            var scaleMode = 0; //0:Vertical, 1:Horizontal

            var originalWidth = $(image).attr("width");
            var originalHeight = $(image).attr("height");

            var imgAspectratio = originalHeight / originalWidth;
            var windowAspectRatio = $(window).height() / $(window).width();

            if (windowAspectRatio > imgAspectratio) {
                scaleMode = 1;
            }

            var percentage, mLeft, mTop;

            if (scaleMode == 0) {
                percentage = $(image).parent().height() / parseInt($(image).attr("height"));

                $(image).width(parseFloat(originalWidth) * percentage * scale);

                mLeft = (($(image).parent().width() / 2) - ($(image).width() / 2)) + "px";

                $(image).height($(image).parent().height() * scale)
                    .css("margin-left", mLeft)
            }
            else {
                percentage = $(image).parent().width() / parseInt($(image).attr("width"));

                $(image).height(parseFloat(originalHeight) * percentage * scale);

                mLeft = (($(image).parent().width() / 2) - ($(image).width() / 2)) + "px";

                $(image).width($(image).parent().width() * scale)
                    .css("margin-left", mLeft)

            }

            mTop = (($(image).parent().height() / 2) - ($(image).height() / 2)) + "px";

            $(image).siblings(".copyImg")
                .height($(image).height())
                .width($(image).width())
                .css("margin-left", mLeft)
                .css("margin-top", mTop);

            $(image).parent()
            //.css("margin-top", "-" + mTop);

            $(image).trigger("resized")
        }
    //});

    //Generate imagemap
    $(image).rwdImageMaps();

    //Resize divs to fit imagemap areas
    $(image).on("imageMapUpdated", function () {
        $(".prevMap").each(function () {
            var cords = $(this).prev("area").attr('coords').split(',');
            $(this).attr('style', 'left:' + cords[0] + 'px; top:' + cords[1] + 'px; width:' + (cords[2] - cords[0]) + 'px; height:' + (cords[3] - cords[1]) + 'px')

            $(this)
                .css("margin-left", $(".prevMap").parent().parent().prev("img").css("margin-left"))

        })
    })

    doResize();
    //$(window).trigger("resize");
}