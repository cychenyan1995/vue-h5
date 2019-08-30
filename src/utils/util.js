const weekDay = []
weekDay[0] = '周一'
weekDay[1] = '周二'
weekDay[2] = '周三'
weekDay[3] = '周四'
weekDay[4] = '周五'
weekDay[5] = '周六'
weekDay[6] = '周末'

export const formatTime = (date, type) => {
    // ios兼容new Date问题
    const oDate = new Date(date.replace(/-/g, "/"))
    const year = oDate.getFullYear()
    const month = oDate.getMonth() + 1
    const day = oDate.getDate()
    let hour = oDate.getHours()
    let minute = oDate.getMinutes()
    const week = oDate.getDay()
    if (type === 1) {
        return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
    }
    if (type === 2) {
        return [year, month, day].map(formatNumber).join('.') + ' ' + [hour, minute].map(formatNumber).join(':')
    }
    if (type === 3) {
        hour = hour + 1
        minute = 0
        return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
    }
    if (type === 4) {
        hour = hour + 2
        minute = 0
        return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
    }
    return year + '年' + [month, day].map(formatNumber).join('月') + '日' + ' ' + weekDay[week] + ' ' + [hour, minute].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}
export const scroll = (e, fn, val = 0) => {
    const $div = e.target || e.srcElement
        // scrollHeight: padding+ 全部内容的高度
        // scrollTop： 滚动条滚动的高度
        // clientHeight：padding+当前高度
    const distance = $div.scrollHeight - ($div.scrollTop + $div.clientHeight)
    let timer = null
    if (distance <= val) {
        timer = setTimeout(fn, 1000)
    }
}

export function qrScan(domId) {
    return new QRScan(domId)
}

function QRScan(domId) {
    this.domId = domId
    this.divCan = null
    this.videos = []
    this.medioConfig = {}
    this.canOpen = false
    this.init()
}
QRScan.prototype = {
    init() {
        window.URL = (window.URL || window.webkitURL || window.mozURL || window.msURL)
        let promisifiedOldGUM = function(constraints) {
            let getUserMedia = (navigator.getUserMedia ||
                navigator.webkitGetUserMedia || navigator.mozGetUserMedia)
            if (!getUserMedia) {
                return Promise.reject(new Error('getUserMedia is not implemented in this browser'))
            }
            return new Promise(function(resolve, reject) {
                getUserMedia.call(navigator, constraints, resolve, reject)
            })
        }
        if (navigator.mediaDevices === undefined) {
            navigator.mediaDevices = {}
        }
        if (navigator.mediaDevices.getUserMedia === undefined) {
            navigator.mediaDevices.getUserMedia = promisifiedOldGUM
        }

        // let self = this
        this.divCan = document.getElementById(self.domId);
        this.canOpen = true
        this.medioConfig = {
                audio: false,
                video: true
            }
            // navigator.mediaDevices.enumerateDevices().then(function(devices) {
            //   devices.forEach(function (dv) {
            //     let kind = dv.kind
            //     if (kind.match(/^video.*/)) {
            //       self.videos.push(dv.deviceId)
            //       console.log(dv)
            //     }
            //   })
            //   let len = self.videos.length
            //   self.canOpen = true
            //   self.medioConfig = {
            //     audio: false,
            //     video: { deviceId: self.videos[len - 1] }
            //   }
            // })
    },
    openScan() {
        let self = this
        if (self.canOpen) {
            let vd = document.createElement('video')
            vd.setAttribute('id', 'video_id')
            navigator.mediaDevices.getUserMedia(self.medioConfig).then(stream => {
                vd.src = window.URL.createObjectURL(stream)
                self.divCan.appendChild(vd)
            }).catch(err => {
                const str = `
          ERROR: ${err.name}
          <br>该浏览器不支持调用摄像头，请更换浏览器！
        `
                alert(str)
            })
            vd.play()
        }
    },
    closeScan() {
        this.divCan.innerHTML = ''
    },
    getImgDecode(func) {
        let self = this
        let video = document.getElementById('video_id')
        let canvas = document.createElement('canvas')
        canvas.width = 340
        canvas.height = 305
        let ctx = canvas.getContext('2d')
        ctx.drawImage(video, 0, 0, 340, 305)
        if (canvas.toBlob === undefined) {
            let base64 = canvas.toDataURL()
            let blob = self.base64ToBlob(base64)
            self.sendBlob(blob, func)
        } else {
            canvas.toBlob(blob => {
                self.sendBlob(blob, func)
            })
        }
    },
    base64ToBlob(base64) {
        let code = window.atob(base64.split(',')[1])
        let len = code.length
        let as = new Uint8Array(len)
        for (let i = 0; i < len; i++) {
            as[i] = code.charCodeAt(i)
        }
        return new Blob([as], { type: 'image/png' })
    },
    sendBlob(blob, func) {
        let fd = new FormData()
        fd.append('auth', 'lkl123456')
        fd.append('file', blob)
        let xhr = new XMLHttpRequest()
            // xhr.open('post', 'http://123.206.7.80:10082/api/parse', true)
            // xhr.onload = function () {
            //   func ? func(JSON.parse(xhr.responseText)) : null
            // }
            // xhr.send(fd)
    }
}

//日期格式化
export function formDate(date, format) {
    var args = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
        "S": date.getMilliseconds()
    };
    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var i in args) {
        var n = args[i];
        if (new RegExp("(" + i + ")").test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
    }
    return format;
}

// 遮罩层的下层不能滑动
export function bodyScroll(event) {
    event.preventDefault();
}

export function notCanScroll() {
    document.body.addEventListener('touchmove', bodyScroll, { passive: false });
    document.body.style.position = 'fixed'
    document.body.style.width = '100%'
        // $('body').css({'position':'fixed',"width":"100%"});
}

export function canScroll() {
    document.body.removeEventListener('touchmove', bodyScroll, { passive: false });
    document.body.style.position = 'initial'
        // document.body.style.height = 'auto'
        // $("body").css({"position":"initial","height":"auto"});   
}

//数字
export function isNumber(val) {
    return /^[0-9]*$/.test(val);
}
//判断邮箱
export function isEmail(val) {
    return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(val);
}

// 拍照上传
// 压缩图片 canvas
export function compress(img, Orientation) {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext('2d');
    //瓦片canvas
    let tCanvas = document.createElement("canvas");
    let tctx = tCanvas.getContext("2d");
    let initSize = img.src.length;
    let width = img.width;
    let height = img.height;
    //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
    let ratio;
    if ((ratio = width * height / 4000000) > 1) {
        // console.log("大于400万像素")
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
    } else {
        ratio = 1;
    }
    canvas.width = width;
    canvas.height = height;
    //铺底色
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //如果图片像素大于100万则使用瓦片绘制
    let count;
    if ((count = width * height / 1000000) > 1) {
        // console.log("超过100W像素");
        count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
        //计算每块瓦片的宽和高
        let nw = ~~(width / count);
        let nh = ~~(height / count);
        tCanvas.width = nw;
        tCanvas.height = nh;
        for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
                tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
            }
        }
    } else {
        ctx.drawImage(img, 0, 0, width, height);
    }
    //修复ios上传图片的时候 被旋转的问题
    if (Orientation != "" && Orientation != 1) {
        switch (Orientation) {
            case 6: //需要顺时针（向左）90度旋转
                rotateImg(img, 'left', canvas);
                break;
            case 8: //需要逆时针（向右）90度旋转
                rotateImg(img, 'right', canvas);
                break;
            case 3: //需要180度旋转
                rotateImg(img, 'right', canvas); //转两次
                rotateImg(img, 'right', canvas);
                break;
        }
    }
    //进行最小压缩
    let ndata = canvas.toDataURL('image/jpeg', 0.5);
    // console.log(ndata)
    // console.log('压缩前：' + initSize);
    // console.log('压缩后：' + ndata.length);
    // console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
    tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
    //将base64码转化为file（Blob）
    var urlFile = convertBase64UrlToBlob(ndata) //这个地方的处理是为了把压缩的base64转化为对象，获得压缩后图片的大小size，方便对压缩后的图片再次进行判断；
        // console.log(urlFile)
        // if(urlFile.size/1024 > 1025){
        //     _this.$msgbox("图片过大，请重新上传图片")
        // }else{
        //     _this.partitionBase = base64.split(",")[1]
        //     _this.imgType ="."+urlFile.type.split("/")[1]
        // }
    return urlFile;
}

// 将压缩的base64字符串转化为file(blob)对象
export function convertBase64UrlToBlob(urlData) {
    var arr = urlData.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}
// 图片旋转
export function rotateImg(img, direction, canvas) {
    //最小与最大旋转方向，图片旋转4次后回到原方向
    const min_step = 0;
    const max_step = 3;
    if (img == null) return;
    //img的高度和宽度不能在img元素隐藏后获取，否则会出错
    let height = img.height;
    let width = img.width;
    let step = 2;
    if (step == null) {
        step = min_step;
    }
    if (direction == 'right') {
        step++;
        //旋转到原位置，即超过最大值
        step > max_step && (step = min_step);
    } else {
        step--;
        step < min_step && (step = max_step);
    }
    //旋转角度以弧度值为参数
    let degree = step * 90 * Math.PI / 180;
    let ctx = canvas.getContext('2d');
    switch (step) {
        case 0:
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0);
            break;
        case 1:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, 0, -height);
            break;
        case 2:
            canvas.width = width;
            canvas.height = height;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, -height);
            break;
        case 3:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, 0);
            break;
    }
}