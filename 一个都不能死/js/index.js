$(function () {

    gameStar();

});
var secondInt;

function gameStar() {
    $(".select_pattern>button").click(function () {
        var len = parseInt($(this).attr("id"));
        console.log(len);
        for (var i = 0; i < len; i++) {
            $(".box").append("  <div class=\"item\">\n" +
                "        <div class=\"playr\"></div>\n" +
                "\n" +
                "    </div>")
        }
        $(".game_star").fadeOut(0);
        $(".box").fadeIn(0);
        var hei = $(".box").height() / 2 + 30;
        $(".box").css("margin-top", -hei + "px");

        var second = 0;
        secondInt = setInterval(function () {
            $(".box_grade").text(second.toFixed(2) + '"');
            second += 0.01
        }, 10);


        skipPlayer();

        showWall();

        gameOver();
    });


}


function skipPlayer() {
    //跳跃
    var len = $(".item").length;
    for (var i = 0; i < len; i++) {
        $(".item").eq(i).click(function () {
            var that = this;
            if ($(that).find(".playr").css("bottom") === "-5px") {
                $(that).find(".playr").stop().animate({bottom: "0.7rem"}, 400, function () {
                    $(that).find(".playr").stop().animate({bottom: "-5px"}, 400)
                });
            }
        });
    }

}

var showWallInt;

function showWall() {
    //滑块
    var len = $(".item").length,
        loop = function () {
            for (var i = 0; i < len; i++) {
                var wid = Math.round(Math.random() * 10 + 2) / 100,
                    hei = Math.round(Math.random() * 15 + 5) / 100,
                    rig = -Math.random() * 2;
                $(".item").eq(i).append("<div style='width:" + wid + "rem;height:" + hei + "rem;right:" + rig + "rem;' class=\"wall\"></div>");
                $(".wall").animate({right: $(".box").width() / 100 + 2 + rig + "rem"}, 6000, "linear", function () {
                    $(this).remove()
                });
            }
        };
    loop();
    showWallInt = setInterval(loop, 3000);
}

function gameOver() {

    var dsq = setInterval(function () {
        var len = $(".item").length;
        for (var i = 0; i < len; i++) {

            var left = $(".item").eq(i).find(".wall").offset().left,
                pleft = $(".item").eq(i).find(".playr").offset().left,
                right = $(".item").eq(i).find(".playr").offset().left + $(".playr").width() - 5,
                bottom = $(".item").eq(i).find(".playr").css("bottom").split("px").join("") + 10,
                hei = $(".item").eq(i).find(".wall").height();
            if (left >= pleft && left <= right && bottom <= hei) {
                clearInterval(dsq);
                clearInterval(secondInt);
                clearInterval(showWallInt);
                $(".last_grade").text($(".box_grade").text().split('"').join("") + "秒");
                var last_pattern = "";
                switch ($(".item").length) {
                    case 2:
                        last_pattern = "普通模式";
                        break;
                    case 3:
                        last_pattern = "困难模式";
                        break;
                    case 4:
                        last_pattern = "噩梦模式";
                        break;
                    case 5:
                        last_pattern = "地狱模式";
                        break;
                }
                $(".last_pattern").text(last_pattern);
                $(".box").fadeOut(0);
                $(".game_over").css("visibility", "visible");
                $(".back_index").click(function () {
                    window.location.reload();
                });
            }
        }
    }, 10)

}