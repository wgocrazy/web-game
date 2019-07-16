//下落
var html = document.querySelector('html');
var rem = html.offsetWidth / 3.75;
html.style.fontSize = rem + "px";

var bkArr = [];
$(".game_start_btn").click(function () {
    $(".game_start").css("display", "none");
    starGmae();
    $(".all_jf").fadeIn(0);

});
$(".game_over_brn").click(function () {
    $(".all_jf").fadeIn(0);
    $(".jf").text("0");

    $(".game_over").css("display", "none");
    starGmae();
});

function starGmae() {
    var speed = -0.5,
        ifSetUp = false;

    //创建
    function setUp() {
        var sjBkBox,
            sjs = Math.random(),
            bkRowHtml = $("   <div class=\"down_bk_row\">\n" +
                "            <img class=\"down_bk_0\" src=\"images/bk.png \" alt=\"\">\n" +
                "\n" +
                "        </div>");

        if (sjs <= 0.25) {
            sjBkBox = $("<img class=\"down_bk_1\" src=\"images/bk.png \" alt=\"\">\n" +
                "            <img class=\"down_bk_3\" src=\"images/bk.png \" alt=\"\">\n" +
                "            <img class=\"down_bk_4\" src=\"images/bk.png \" alt=\"\">");
            bkArr.unshift([1, 0, 1, 1])
        } else if (sjs <= 0.5) {
            sjBkBox = $("<img class=\"down_bk_2\" src=\"images/bk.png \" alt=\"\">\n" +
                "            <img class=\"down_bk_3\" src=\"images/bk.png \" alt=\"\">\n" +
                "            <img class=\"down_bk_4\" src=\"images/bk.png \" alt=\"\">");
            bkArr.unshift([0, 1, 1, 1])

        } else if (sjs <= 0.75) {
            sjBkBox = $("<img class=\"down_bk_1\" src=\"images/bk.png \" alt=\"\">\n" +
                "            <img class=\"down_bk_2\" src=\"images/bk.png \" alt=\"\">\n" +
                "            <img class=\"down_bk_4\" src=\"images/bk.png \" alt=\"\">");
            bkArr.unshift([1, 1, 0, 1])
        } else {
            sjBkBox = $("<img class=\"down_bk_1\" src=\"images/bk.png \" alt=\"\">\n" +
                "            <img class=\"down_bk_2\" src=\"images/bk.png \" alt=\"\">\n" +
                "            <img class=\"down_bk_3\" src=\"images/bk.png \" alt=\"\">");
            bkArr.unshift([1, 1, 1, 0])
        }
        $(".down_bk_box").prepend(bkRowHtml);
        $(".down_bk_box").find(".down_bk_row").eq(0).append(sjBkBox);

    }

    setUp();
    var downSdeep = 20;
    var speedUpInt = setInterval(function () {
        if (downSdeep > 5) {
            clearInterval(fallInt);
            downSdeep--;
            fallInt = setInterval(setUpDownBk, downSdeep);
        }
    }, 3000);
    var fallInt = setInterval(setUpDownBk, downSdeep);

    function setUpDownBk() {
        if ($(".down_bk_box").find(".down_bk_row").length >= 1) {
            if ($(".down_bk_box").find(".down_bk_row").eq(0).offset().top >= 0) {
                ifSetUp = true
            }
        } else {
            ifSetUp = true
        }
        if (ifSetUp) {
            setUp();
            speed = -0.5;
            ifSetUp = false
        }
        speed += 0.01;
        $(".down_bk_box").css("top", speed + "rem");

        var tbLen = Math.round($(".down_bk_box").height() + $(".down_bk_box").offset().top);
        if (tbLen > $(window).height() - 50) {//游戏结束清空数据
            console.log(1);
            clearInterval(fallInt);
            clearInterval(speedUpInt);
            $(".o_jf").text($(".jf").text());
            $(".all_jf").fadeOut(0);
            $(".down_bk_box").empty();
            bkArr = [];
            $(".game_over").fadeIn(0)
        }
    }
}

!function () {
    $(".up_bk_1").click(function () {
        $(this).append(" <img src=\"images/bk.png\" alt=\"\">");
        upSlide(this, 1);
    });
    $(".up_bk_2").click(function () {
        $(this).append(" <img src=\"images/bk.png\" alt=\"\">");
        upSlide(this, 2);
    });
    $(".up_bk_3").click(function () {
        $(this).append(" <img src=\"images/bk.png\" alt=\"\">");
        upSlide(this, 3);
    });
    $(".up_bk_4").click(function () {
        $(this).append(" <img src=\"images/bk.png\" alt=\"\">");
        upSlide(this, 4);
    });

    function upSlide(t, s) {
        $(t).find(" img").animate({
            bottom: "1000px"
        }, 500);
        var upInt = setInterval(function () {
            var tbLen = Math.round($(".down_bk_box").height() + $(".down_bk_box").offset().top),
                jlTopLen = Math.round($(t).find(" img:last-child").offset().top);
            if (tbLen >= jlTopLen) {
                clearInterval(upInt);
                $(t).find(" img:last-child").remove();
                if (bkArr[bkArr.length - 1][s - 1] == 1) {
                    bkArr.push([0, 0, 0, 0]);
                    bkArr[bkArr.length - 1][s - 1] = 1;
                    var bkRowHtml = $("   <div class=\"down_bk_row\">\n" +
                        "            <img class=\"down_bk_0\" src=\"images/bk.png \" alt=\"\">\n" +
                        "\n" +
                        "        </div>");
                    $(".down_bk_box").append(bkRowHtml);
                    $(".down_bk_box").find(".down_bk_row:last-child").append("<img class=\"down_bk_" + s + "\" src=\"images/bk.png \" alt=\"\">");
                } else {
                    if (bkArr.length == 1) {
                        bkArr[0][s - 1] = 1;
                        $(".down_bk_box").find(".down_bk_row").eq(0).append("<img class=\"down_bk_" + s + "\" src=\"images/bk.png \" alt=\"\">")
                    } else {
                        for (var i = bkArr.length - 2; i >= 0; i--) {
                            if (bkArr[i][s - 1] == 1) {
                                bkArr[i + 1][s - 1] = 1;
                                $(".down_bk_box").find(".down_bk_row").eq(i + 1).append("<img class=\"down_bk_" + s + "\" src=\"images/bk.png \" alt=\"\">")
                                break;
                            } else if (i == 0) {
                                bkArr[i][s - 1] = 1;
                                $(".down_bk_box").find(".down_bk_row").eq(i).append("<img class=\"down_bk_" + s + "\" src=\"images/bk.png \" alt=\"\">")
                            }
                        }
                    }
                }
                if (String(bkArr[bkArr.length - 1]) == "1,1,1,1") {
                    for (var j = bkArr.length - 1; j >= 0; j--) {
                        if (String(bkArr[j]) == "1,1,1,1") {
                            bkArr.splice(j, 1);
                            $(".down_bk_box").find(".down_bk_row").eq(j).remove();
                            $(".jf").text(parseInt($(".jf").text()) + 10);

                        } else {
                            break
                        }
                    }
                }
            }
        }, 1);
    }
}();