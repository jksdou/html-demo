var rand = (function() {
    this.seed = (new Date()).getTime()

    function r() {
        this.seed = (this.seed * 9301 + 49297) % 233280
        return this.seed / (233280.0)
    }
    return function(number) {
        return Math.ceil(r() * number)
    }
})()