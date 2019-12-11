// 封裝類似 Jquery 的函數
function $(str){
    if (typeof (str) === 'string') { // 當傳入的是字符串 就返回 getElementById
        return document.getElementById(str)
    } else if (typeof (str) === 'function') { // 當傳入的是函數 就返回 window.onload=
        return window.onload=str
    }
}

// 封裝獲取樣式函數
var getS =function(obj,att){ // 這裏要注意 傳進來的 att 是字符串
    if (window.getComputedStyle) {
        return(getComputedStyle(obj)[att]) // 本來是obj.att 因為是字符串的關係 必須改用陣列方式傳參
    } else {
        return(obj.currentStyle[att])
    }
}

// 封裝運動函數
function startMove(obj, target) {
    clearInterval(timer)

    var speed = 10
    speed = obj.offsetLeft < target ? speed : -speed

    timer = setInterval(function () {
        if (obj.offsetLeft == target) {
            clearInterval(timer)
        } else {
            obj.style.left = obj.offsetLeft + speed + 'px'
        }
    }, 50)
}

function goMove(obj, att, target) {
    clearInterval(obj.timer)

    obj.timer = setInterval(function () {
        if (att == 'opacity') {
            var alpha = parseInt(getS(obj, att) * 100)
            var speed = (target - alpha) / 7

            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)

            if (alpha == target) {
                clearInterval(obj.timer)
            } else {
                alpha += speed
                obj.style.opacity = alpha / 100
                obj.style.filter = 'alpha(opacity=' + alpha + ');'
            }
        }else{
            var speed = (target - parseInt(getS(obj, att))) / 7

            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)

            if (parseInt(getS(obj, att)) == target) {
                clearInterval(obj.timer)
            } else {
                obj.style[att] = parseInt(getS(obj, att)) + speed + 'px'
            }
        }
    }, 70)
}
