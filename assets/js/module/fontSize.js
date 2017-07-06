/**
 * Created by qianfeng on 2017/1/5.
 */
(function(){
    (function (doc, win) {
        var docEl = doc.documentElement,
            // orientationchange 事件 用来监听手机屏幕的反转
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
        function reCalc(){
            var clientWidth = docEl.clientWidth;//(window.innerWidth);UC 或者QQ 安卓4.0 以下原生浏览器下面是没有
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
        }
        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, reCalc, false);
        //DOMContentLoaded dom 加载完成，onload 有什么区别 dom css js OK 才执行的
        doc.addEventListener('DOMContentLoaded', reCalc, false);
    })(document, window);
})(document,window);