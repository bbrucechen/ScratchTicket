/*
* options {
* canvasWidth
* canvasHeight
*  coverColor
* handleScratched
* layerColor
* layerFontSize
* layerFontFamily
* layerText
* mountTarget
* }
* */

function ScratchTicket(options) {
    this.options = options
    this._init()
}

ScratchTicket.prototype._init = function() {
    let options = this.options
    let target = options.mountTarget
    let targetEle

    if(!target) {
        throw new Error('mountTarget attribute is required in param of ScratchTicket.')
        return
    } else {
        targetEle = document.querySelector(target)
        if(!targetEle) {
            throw new Error('mount target must be a HTML Element.')
            return
        }
    }

    const canvasEle = document.createElement('canvas')
    const ctx = canvasEle.getContext('2d')
    targetEle.appendChild(canvasEle)

    // 确定canvas的样式
    canvasEle.width = options.canvasWidth || 300
    canvasEle.height = options.canvasHeight || 50
    let canvasW = canvasEle.width
    let canvasH = canvasEle.height
    canvasEle.style.border = '5px solid #000'
    canvasEle.style.borderRadius = '5%'

    // 画出遮盖层
    ctx.fillStyle = options.coverColor || '#ccc'; // 遮盖层颜色
    ctx.fillRect(0, 0, options.canvasWidth || 300, options.canvasHeight || 50);

    // 消除次数寄存器
    let times = 0

    // 消除目标面积
    let showSize = canvasEle.width * canvasEle.height * 1.5

    let mainEvent = function(e) {

        const event = function (e) {
            times++
            if (100 * times > showSize) {
                // 达到指定面积执行回调函数
                options.handleScratched && options.handleScratched({
                    result:options.layerText || '中奖了'
                }) // 回调函数
                times = 0
                // 移除事件
                canvasEle.removeEventListener('mousemove', event)
            }

            // 消除遮盖层动作
            let cleanSize = Math.sqrt((canvasEle.width * canvasEle.height) / 150)
            ctx.clearRect(e.offsetX, e.offsetY, cleanSize, cleanSize)

            // 确保遮盖层遮盖住底层的文字
            ctx.globalCompositeOperation = "destination-over";

            // 绘制文字
            ctx.fillStyle = options.layerColor || '#000' // 文字颜色
            options.layerFontSize = options.layerFontSize || 30 // 文字大小
            const textSpan = document.createElement('span')
            textSpan.innerHTML = options.layerText? options.layerText:'中奖了'
            textSpan.style.fontSize = options.layerFontSize + 'px'
            document.body.appendChild(textSpan)
            spanW = textSpan.offsetWidth
            textSpan.style.display = 'none'
            options.layerFontFamily = options.layerFontFamily || 'Arial'
            ctx.font = options.layerFontSize + 'px' + ' ' + options.layerFontFamily // 文字大小 字体
            let textX = (canvasW - spanW) / 2
            let textY = canvasH / 2 + 10
            ctx.fillText(options.layerText || '中奖了', textX, textY) // 底层文字
        }

        canvasEle.addEventListener('mousemove', event)

        canvasEle.addEventListener('mouseup', function (e) {
            canvasEle.removeEventListener('mousemove', event)
        })

        canvasEle.addEventListener('mouseleave',function () {
            canvasEle.removeEventListener('mousemove', event)
        })

    }

    canvasEle.addEventListener('mousedown',mainEvent)

}
