// 登录注册的切换
$(function () {
    // 切换到注册
    $('#goReigister').click(function () {
        $('.register').show();
        $('.login').hide();
    })
    // 切换到登录
    $('#goLogin').click(function () {
        $('.register').hide();
        $('.login').show();
    })
})


// 表单验证功能
let form = layui.form
form.verify({

    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pass: [
        /^[\S]{6,12}$/
        , '密码必须6到12位，且不能出现空格'
    ],
    // 再次校验
    repsw: function (value, item) { //value：表单的值、item：表单的DOM对象
        let psw = $('#psw').val()
        if (psw !== value) {
            return '两次密码不一致，请重新输入'
        }
    }

});      
