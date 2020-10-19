;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        /* AMD. Register as an anonymous module.
         * define([], factory);
         */
        define([], factory())
    } else if (typeof module === 'object' && module.exports) {
        /* Node. Does not work with strict CommonJS, but
        only CommonJS-like environments that support module.exports,
        like Node.
        */
        module.exports = factory()
    } else {
        /* Browser globals (root is window) */
        root['watermark'] = factory()
    }
})(this, function () {
    var watermark = {}

    var settings = {
        width: 150,
        height: 120,
        color: 'rgba(0, 0, 0, 0.1)',
        zIndex: 99999999
    }

    var setWatermark = function (str) {
        var id = 'watermark'

        if (document.getElementById(id) !== null) {
            document.body.removeChild(document.getElementById(id))
        }

        var can = document.createElement('canvas')
        can.width = settings.width || 150
        can.height = settings.height || 120

        var cans = can.getContext('2d')
        cans.rotate((-20 * Math.PI) / 180)
        cans.font = '15px Vedana'
        cans.fillStyle = settings.color || 'rgba(0, 0, 0, 0.1)'
        cans.textAlign = 'left'
        cans.textBaseline = 'Middle'
        cans.fillText(str, can.width / 20, can.height)

        var div = document.createElement('div')
        var imageBase64 = can.toDataURL('image/png')

        div.id = id
        div.style.pointerEvents = 'none'
        div.style.top = '0'
        div.style.left = '0'
        div.style.position = 'fixed'
        div.style.zIndex = settings.zIndex || '100000000'
        div.style.width = document.documentElement.clientWidth + 'px'
        div.style.height = document.documentElement.clientHeight + 'px'
        div.style.backgroundImage = 'url(' + imageBase64 + ')'
        div.style.backgroundRepeat = 'repeat'
        div.style.backgroundPositionX = 'left'
        div.style.backgroundPositionY = 'top'
        document.body.appendChild(div)
        return id
    }

    // 该方法只允许调用一次
    watermark.init = function (str) {
        var id = setWatermark(str)
        setInterval(function () {
            if (document.getElementById(id) === null) {
                id = setWatermark(str)
            }
        }, 2000)
        window.onresize = function () {
            setWatermark(str)
        }
    }

    return watermark
})
