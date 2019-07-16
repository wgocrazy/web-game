$(function () {


//点击图片
    function imgClick() {
        var src = $(this).attr("src");
        $(this).off();
        $(".GameGrade>span:last-child").text(parseInt($(".GameGrade>span:last-child").text()) + 10);
        $(this).attr("src", "images/b2.png").stop(true).animate({
            bottom: -80
        }, 500, function () {
            //console.log($._data($(this), 'click'));
            $(this).on("click", imgClick);
            $(this).attr("src", src)

        })
    }

//开始游戏

    function star() {
        //var bottom = -80;
        $(".hole>div>img").on("click", imgClick);

        time = setInterval(function () {
            var rand = Math.round(Math.random() * 13);
            $(".hole>div>img").eq(rand).animate({
                bottom: 0
            }, 2000).delay(2000).animate({
                bottom: -80
            }, 1000, function () {
                //漏掉的减生命值
                if ($(".lifeNum").text() > 0) {
                    $(".lifeNum").text($(".lifeNum").text() - 1);
                }
                GameOver()
            });

        }, 100)
    }


    var time;
    //点击开始
    $(".starGameBtn").click(function () {
        $(".starGame").stop().fadeOut(100);
        star()
    });

    //游戏结束
    function GameOver() {

        if ($(".lifeNum").text() == 0) {
            clearInterval(time);

            console.log($(".hole>div>img"));
            $(".hole>div>img").stop().animate({
                bottom:-80
            },1);

            $(".GameOver").stop().fadeIn(100);
            $(".GameOver>p>span").text($(".GameGrade>span:last-child").text());

        }
    }

    //重新开始
    $(".anewGame").click(function () {
        window.location.reload();
    })

});