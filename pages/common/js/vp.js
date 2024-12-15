var vp = {};
Date.prototype.VP_FORMAT = function (format) {
    console.log('==========>this.getDate() ' + this.getTime() / (24 * 60 * 60 * 1000));
    console.log('==========>new Date().getDate() ' + new Date().getTime() / (24 * 60 * 60 * 1000));
    var ds = parseInt(this.getTime() / (24 * 60 * 60 * 1000)) - parseInt(new Date().getTime() / (24 * 60 * 60 * 1000));
    var n = '';
    if (ds == 0) {
        n = '(今天)';
    }
    if (ds == 1) {
        n = '(明天)';
    }
    if (ds == 2) {
        n = '(后天)';
    }
    if (ds == -1) {
        n = '(昨天)';
    }
    if (ds == -2) {
        n = '(前天)';
    }
    var date = {
        'M+': this.getMonth() + 1,
        'd+': this.getDate(),
        'h+': this.getHours(),
        'm+': this.getMinutes(),
        's+': this.getSeconds(),
        'q+': Math.floor((this.getMonth() + 3) / 3),
        'S+': this.getMilliseconds(),
        'n+': n
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ('00' + date[k]).substr(('' + date[k]).length));
        }
    }
    return format;
};
vp.VP_FORMAT = function (t, fmt) {
    var newDate = new Date();
    newDate.setTime(t * 1000);
    return newDate.VP_FORMAT(fmt);
};
vp.VP_CIRCLEIMG = function (ctx, img, x, y, r) {
    ctx.strokeStyle = 'white';
    ctx.save();
    var d = 2 * r;
    var cx = x + r;
    var cy = y + r;
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.clip();
    ctx.drawImage(img, x, y, d, d);
    ctx.restore();
};
vp.VP_IN_ARRAY = function (search, array) {
    for (var i in array) {
        if (array[i] == search) {
            return true;
        }
    }
    return false;
};
vp.VP_TRIM = function (str) {
    return str.replace(/(^\s*)|(\s*$)/g, '');
};
vp.VP_RAND = function (minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
};
module.exports = vp;
