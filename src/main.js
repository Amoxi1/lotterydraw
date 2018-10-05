
var spanHtml = document.querySelectorAll('.suduku__item')
var startBtn = document.querySelector('.suduku__item--start')
// 顺时针滚动
var config = {
  drawOrder: [0, 1, 2, 4, 7, 6, 5, 3],
  timer: null,
  flag: true,
  endIdx: 0,
  cnt: 0,
  speed: 50,
  round: 4
}
function getRandomNum (n, m) {
  return parseInt((m - n) * Math.random() + n)
}

function run (num) {
  var roundNum = config.round * 8 // 转4圈走了多少格
  config.timer = setTimeout(setSpeed, config.speed)
  function setSpeed () {
    var len = spanHtml.length
    var curNumIdx = config.drawOrder[config.cnt % len] // 标记当前转动在哪个位置
    if (config.cnt !== 0) {
      var prevCurNumIdx = config.drawOrder[(config.cnt - 1) % len]
      if (prevCurNumIdx < 0) {
        prevCurNumIdx = 7
      }
      spanHtml[prevCurNumIdx].classList.remove('cur')
    }
    spanHtml[curNumIdx].className = 'cur'
    config.cnt++
    if (config.cnt <= roundNum) { // 转速不变
      setTimeout(setSpeed, config.speed)
    }
    if (config.cnt > roundNum && config.cnt < roundNum + num) { // 最后一圈转速变慢
      config.speed = config.speed + (config.cnt - roundNum + 8) * 5
      setTimeout(setSpeed, config.speed)
    }
    if (config.cnt >= roundNum + num) { // i>总格数+最后一圈格数时停止
      var timer2 = null
      timer2 = setTimeout(function () {
        console.log('恭喜抽中' + num)
        clearTimeout(timer2)
      }, 1000)
      config.flag = true// 抽奖结束后按钮可点
      startBtn.className = 'start'
      clearTimeout(config.timer)
    }
  }
}
startBtn.addEventListener('click', function () {
  if (!config.flag) { // 当config.flag为false时不可点击
    return false
  }
  config.flag = false// 改变状态为不可点击
  startBtn.className = 'on'
  config.endIdx = getRandomNum(1, 9)
  run(config.endIdx)
})
