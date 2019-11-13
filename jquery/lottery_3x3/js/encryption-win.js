function Win(obj, cb) {
    this.timer = null;
    this.startIndex = obj.startIndex - 1;
    this.count = 0;
    this.winningIndex = obj.winningIndex - 1;
    this.totalCount = obj.totalCount || 6;
    this.speed = obj.speed || 100;
    this.domData = this.elementFormat(document.querySelector(obj.el).childNodes);
    this.init();
    this.cb = cb;
}
var theSingle = false;
Win.prototype = {
    init: function() {
        if (theSingle) {
            return
        }
        theSingle = true;
        this.rollFn()
    },
    elementFormat: function(data) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].nodeName === '#text' && !/\S/.test(data[i].nodeValue)) {
                data[i].parentNode.removeChild(data[i])
            }
        }
        return data
    },
    rollFn: function() {
        var that = this;
        for (var i = 0; i < this.domData.length - 1; i++) {
            this.domData[i].className = ''
        }
        this.startIndex++;
        if (this.startIndex >= this.domData.length - 1) {
            this.startIndex = 0;
            this.count++
        }
        this.domData[this.startIndex].classList.add('active');
        if (this.count >= this.totalCount && this.startIndex === this.winningIndex) {
            if (typeof this.cb === 'function') {
                setTimeout(function() {
                    that.cb();
                    theSingle = false
                }, 100)
            }
            clearInterval(this.timer)
        } else {
            if (this.count >= this.totalCount - 1) {
                this.speed += 30
            }
            this.timer = setTimeout(function() {
                that.rollFn()
            }, this.speed)
        }
    }
};