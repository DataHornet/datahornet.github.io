$.menuEffects = function (objects){
    //Object:
    //element:element
    //defaultState: default class
    //hoverState:hover class
    //otherHoverState: on other hover

    var $elements = $.map(objects, function (value, index) {
        return value.element;
    });

    function setState(object, state, element) {
        var h = object.hoverState;
        var oh = object.otherHoverState;
        var ds = object.defaultState;

        if (element == undefined)
            element = $(object.element);
        else
            element = $(element);

        switch (state) {
            case 'default':
                $(element)
                    .removeClass(h)
                    .removeClass(oh)
                    .addClass(ds);
                break;
            case 'hover':
                $(element)
                    .removeClass(oh)
                    .removeClass(ds)
                    .addClass(h);
                break;
            case 'otherhover':
                $(element)
                    .removeClass(ds)
                    .removeClass(h)
                    .addClass(oh);
                break;
        }
    }

    $.each(objects, function (index, value) {
        setState(value, 'default')

        if (value.nohover != undefined && value.nohover == true)
            return;

        $(value.element).on("mouseenter", function () {
            var e = this;
            setState(value, 'hover', e);

            $.each(objects, function (oindex, ovalue) {
                $(ovalue.element).each(function () {  
                    if (e != this)
                        setState(ovalue, 'otherhover', this);
                })
            })
        })

        $(value.element).on("mouseleave", this, function () {
            $.each(objects, function (index, value) {
                setState(value, 'default');
            })
        })
    })

}