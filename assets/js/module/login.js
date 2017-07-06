define(function(require, exports, module) {
      var $ = require("zepto");
      var common = require('common');
              require('tap');
      var phone = $("#phone"),pwd = $("#pwd"),submitBtn = $(".submit").find('a'),
        $toast = $('#toast');

    submitBtn.on('tap', function(event) {
        event.preventDefault();
        //数据获取与校验
        var params = {};
        params.phone = phone.val();//手机号码吧
        params.pwd = pwd.val();

        if (params.phone==""||!common.phone(params.phone)) {
            //alert("请输入正确的电话！");
            toast("号码格式错误")
            return
        };

        if (params.pwd.length<6||params.pwd.length>20) {
            //alert("请输入6-20位密码");
            toast("密码错误")
            return
        };

        $.get('/api/login', params, function(data) {
            if (data.code==0) {
                //页面跳转
                location.href = location.origin +　'/index.html'
            }else{
                //alert(data.msg)
                toast(data.msg)
            };
        });
    });

    function toast(msg){
        if ($toast.css('display') != 'none') return;
        $toast.find('.weui_toast_content').html(msg);
        $toast.show(100);
        setTimeout(function () {
            $toast.hide(100);
        }, 800);
    }
})
   
