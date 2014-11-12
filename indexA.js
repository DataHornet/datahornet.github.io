angular.module("datahornet", [])
    .config(function () {

    })
    .directive("dhCore", function(){
        return {
            restrict: "A",
            controller: function($scope){
                $scope.tab = undefined;
                $scope.navbar = false;

                $scope.openTab = function (tab, callback) {
                    $(".tab:visible").css("pointer-events","none")

                    function showTab(t) {
                        function s() {
                            $scope.tab = t;
                            $scope.$apply();
                            $(".tab").hide();
                            $(".tab").trigger("dh.show").aShow(undefined, "bounceInDown", 0);
                        }

                        $(".tab").css("pointer-events", "")
                        var $visibleTabs = $(".tab:visible");
                        console.log($visibleTabs)
                        if ($visibleTabs.length > 0) {
                            $(".tab").trigger("dh.hide").aHide(function () {
                                s();
                            }, "bounceOutUp", 1)
                        }
                        else {
                            s();
                        }
                    }

                    if ($scope.tab == undefined) {
                        $scope.toggleNavbar(true)

                        var bubbleCount = 0;

                        $(".bubbleText").each(function () {
                            var text = this;

                            $(text).animateTransfer($($(text).attr("data-target")),
                            function () {
                                console.log("eh");
                                $(".bubbleButton").aHide(undefined, "fadeOut", 2);
                            },
                            function () {
                                bubbleCount++;

                                if (bubbleCount == $(".bubbleText").length)
                                {
                                    showTab(tab);
                                }
                            })
                         })

                    } else{
                        showTab(tab)
                    }
                }

                $scope.toggleNavbar = function (value, callback) {
                    if (value) {
                        $scope.navbar = true;
                        $scope.$apply();
                        $(".navbar").aShow(callback, "fadeIn", 0);
                    } else {
                        $(".navbar").aHide(function () {
                            $scope.navbar = false;
                            callback();
                        }, "fadeOut", 0)
                    }
                }
            },
            link: function (scope, element, attrs) {

            }
        }
    })
    .directive("dhHome", function () {
        return {
            restrict: "A",
            templateUrl: 'home.html',
            controller: function($scope){
            },
            link: function (scope, element, attrs) {
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
                    nohover: true
                },
                {
                    element: $(".bubbleLogo"),
                    defaultState: "",
                    hoverState: "",
                    otherHoverState: "blur opacity50",
                    nohover: true
                }])

                $(element).on("dh.show", function () {

                })
            }
        }
    })
.directive("dhBlog", function () {
    return {
        templateUrl: "blog.html"
    }
})
.directive("dhContact", function () {
    return {
        templateUrl: "contact.html"
    }
})