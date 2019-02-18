function runQueue(queue, fn, end) {
    const step = function (index) {
        if (index >= queue.length) {
            end()
        } else if (queue[index]) {
            fn(queue[index], () => step(index + 1))
        } else {
            step(index + 1)
        }
    };
    if (queue) {
        step(0)
    } else {
        end()
    }
}


var uids = [430040, 626545]

var iframe = document.getElementById('iframe')
var message = document.getElementById('message')
runQueue(uids, function (uid, next) {
    message.innerText = '开始分享：' + iframe.getAttribute('src') + '\n' + uid
    iframe.onload = function () {
        message.innerText = iframe.getAttribute('src') + '\n执行结束，准备分享：' + uid
        setTimeout(next, 3000)
    };
    iframe.setAttribute('src', '')
    iframe.setAttribute(
        'src',
        ['http://www.shandianji.com.cn/index/share/share_download?uid=', uid, '&type=3'].join('')
    )
}, function () {
    message.innerText = '执行完毕'
})
