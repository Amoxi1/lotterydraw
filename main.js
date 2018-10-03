
var spanHtml = document.querySelectorAll('span')
var startBtn = document.querySelector('.start')
// 顺时针滚动
var index = [0, 1, 2, 4, 7, 6, 5, 3]
var timer = null// 初始化计时器
var flag = true// 初始化抽奖开关可点击
var num = 0// 最后滚动到的数字
// 随机函数随机最后停留数字赋值给num
function random (n, m) {
  return parseInt((m - n) * Math.random() + n)
}
function run (num) {
  var i = 0// 控制转动
  var speed = 50// 初始化转动速度
  var round = 4// 一共转动圈数
  var roundNum = round * 8 // 转4圈走了多少格
  timer = setTimeout(setSpeed, speed)
  function setSpeed () {
    var len = spanHtml.length
    for (var j = 0; j < len; j++) {
      spanHtml[j].className = ''
    }
    var curNumIdx = index[i % len] // 标记当前转动在哪个位置
    spanHtml[curNumIdx].className = 'cur'
    i++
    // console.log(curNumIdx,i,len)
    if (i <= roundNum) { // 转速不变
      setTimeout(setSpeed, speed)
    }
    if (i > roundNum && i < roundNum + num) { // 最后一圈转速变慢
      speed = speed + (i - roundNum + 8) * 5
      setTimeout(setSpeed, speed)
    }
    if (i >= roundNum + num) { // i>总格数+最后一圈格数时停止
      var timer2 = null
      timer2 = setTimeout(function () {
        console.log('恭喜抽中' + num)
        clearTimeout(timer2)
      }, 1000)
      flag = true// 抽奖结束后按钮可点
      startBtn.className = 'start'
      clearTimeout(timer)
    }
  }
}
startBtn.addEventListener('click', function () {
  if (!flag) { // 当flag为false时不可点击
    return false
  }
  flag = false// 改变状态为不可点击
  startBtn.className = 'on'
  num = random(1, 9)
  run(num)
})
