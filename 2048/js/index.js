var html = document.querySelector('html');
var rem = html.offsetWidth / 3.75;
html.style.fontSize = rem + "px";

var kx, ky, jx, jy,
    arr = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    recordX = "",
    recordY = "",
    ifFir = true,
    ifSetUp = true,
    bottomRight = true,
    topLeft = true;
$(".game_bg").on("touchstart", function (e) {
    kx = e.changedTouches[0].pageX;
    ky = e.changedTouches[0].pageY;
});


function gameOver() {
    console.log(topLeft);
    console.log(bottomRight);

}

$(".anew").click(function () {
    arr = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    gameStart();
    f5();
    $(".grade").text("0")
});

function eachArr(x, y) {

    if (y === 1 || x === 1) {
        for (var i = 3; i >= 0; i--) {
            for (var j = 3; j >= 0; j--) {
                if (arr[i][j] !== 0) {//遍历所有不为0的数
                    arr[-1] = [];
                    arr[4] = [];
                    if (arr[i + x][j + y] === 0) {//若旁边等于0则移动
                        topLeft = true;

                        arr[i + x][j + y] = arr[i][j];
                        arr[i][j] = 0;
                        eachArr(x, y);
                        console.log(arr);
                        if (ifSetUp) {
                            //true 可以创建
                            setUp();
                            ifSetUp = !ifSetUp
                        }
                        f5()
                    } else if (arr[i][j] === arr[i + x][j + y] && (i !== recordX || j !== recordY) && (i + x !== recordX || j + y !== recordY)) {//若相等则相加
                        topLeft = true;

                        arr[i + x][j + y] *= 2;
                        var nowJf = parseInt($(".grade").text());
                        nowJf += arr[i + x][j + y];
                        $(".grade").text(nowJf);
                        recordX = i + x;
                        recordY = j + y;
                        arr[i][j] = 0;
                        if (ifSetUp) {
                            //true 可以创建
                            setUp();
                            ifSetUp = !ifSetUp
                        }
                        f5();
                        eachArr(x, y);
                    } else {
                        //移动不了了
                        bottomRight = false;
                        gameOver()
                    }

                }

            }
        }
    } else {
        $.each(arr, function (index, item) {
            $.each(item, function (ind, ite) {
                if (ite !== 0) {//遍历所有不为0的数
                    arr[-1] = [];
                    arr[4] = [];
                    if (arr[index + x][ind + y] === 0) {//若旁边等于0向右移
                        bottomRight = true;

                        arr[index + x][ind + y] = ite;
                        arr[index][ind] = 0;
                        eachArr(x, y);
                        console.log(arr);
                        if (ifSetUp) {
                            //true 可以创建
                            setUp();
                            ifSetUp = !ifSetUp
                        }
                        f5()
                    } else if (ite === arr[index + x][ind + y] && (index !== recordX || ind !== recordY) && (index + x !== recordX || ind + y !== recordY)) {//若相等则相加
                        bottomRight = true;

                        arr[index + x][ind + y] *= 2;
                        var nowJf = parseInt($(".grade").text());
                        nowJf += arr[index + x][ind + y];
                        $(".grade").text(nowJf);
                        recordX = index + x;
                        recordY = ind + y;
                        arr[index][ind] = 0;
                        if (ifSetUp) {
                            //true 可以创建
                            setUp();
                            ifSetUp = !ifSetUp
                        }
                        f5();
                        eachArr(x, y);
                    } else {
                        topLeft = false;
                        gameOver()

                    }
                }
            })
        });
    }
}

$(".game_bg").on("touchend", function (e) {

    jx = e.changedTouches[0].pageX;
    jy = e.changedTouches[0].pageY;
    var x = kx - jx,
        y = ky - jy;


    if (Math.abs(y) < Math.abs(x)) {
        if (x > 0) {
            console.log("left");
            ifFir = true;
            recordX = "";
            recordY = "";
            ifSetUp = true;
            eachArr(0, -1);

        } else if (x < 0) {
            console.log("right");
            ifFir = true;
            recordX = "";
            recordY = "";
            ifSetUp = true;
            eachArr(0, 1);
        }
    } else {
        if (y > 0) {
            console.log("top");
            ifFir = true;
            recordX = "";
            recordY = "";
            ifSetUp = true;
            eachArr(-1, 0);

        } else if (y < 0) {
            console.log("down");
            ifFir = true;
            recordX = "";
            recordY = "";
            ifSetUp = true;
            eachArr(1, 0);

        }
    }

});
gameStart();
var coordinateX, coordinateY;

function setUp() {
    var or = Math.round(Math.random() * 3),
        tr = Math.round(Math.random() * 3);
    if (arr[or][tr] === 0) {
        arr[or][tr] = 2;
        coordinateX = or;
        coordinateY = tr;
    } else {
        setUp()
    }
}

function f5() {
    $.each(arr, function (index, item) {
        $.each(item, function (ind, ite) {
            if (ite !== 0) {
                $(".game_bg>div").eq(index).find(".game_bg_item").eq(ind).empty();

                console.log("横坐标：", coordinateX, index);

                console.log("纵坐标：", coordinateY, ind);


                // if(index===coordinateX&&ind === coordinateY){
                //
                //     $(".game_bg>div").eq(index).find(".game_bg_item").eq(ind).append("<div class='jcdh sz" + ite + "'>" + ite + "</div>");
                // }else {
                $(".game_bg>div").eq(index).find(".game_bg_item").eq(ind).append("<div class='sz" + ite + "'>" + ite + "</div>");

                // }
            } else {
                $(".game_bg>div").eq(index).find(".game_bg_item").eq(ind).empty();
            }
        })
    });
}

function gameStart() {
    var or = Math.round(Math.random() * 3),
        tr = Math.round(Math.random() * 3),
        er = Math.round(Math.random() * 3),
        lr = Math.round(Math.random() * 3);
    if (or !== er || tr !== lr) {
        arr[or][tr] = 2;
        arr[er][lr] = 2;
        console.log(arr);
        f5()
    } else {
        gameStart()
    }
}