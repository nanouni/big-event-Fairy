// 登录注册切换功能
$(function () {
    $('#goReigister').click(function () {
        $('.login').hide()
        $(".register").show()
    })
    $('#goLogin').click(function () {
        $('.login').show()
        $('.register').hide()
    })
})

// 表单验证
let form = layui.form
let layer = layui.layer
form.verify({

    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pass: [
        /^[\S]{6,12}$/
        , '密码必须6到12位，且不能出现空格'
    ],
    // 再次校验
    repsw: function (value, item) {
        let psw = $('.register input[name=password]').val()
        if (value != psw) {
            return '两次密码输入不一致，请重新输入'
        }
    }

});

// 发送注册请求
$('#reg').on('submit', function (e) {
    e.preventDefault();

    let data = $(this).serialize()

    $.ajax({
        type: "POST",
        url: "/api/reguser",
        data,
        success: function (res) {
            if (res.status !== 0) {

                return layer.msg('注册失败' + res.message)
            }
            layer.msg('注册成功')
            $('#goLogin').click()
        }

    })
})

// 登录功能
$('#login').on('submit', function (e) {
    e.preventDefault()

    let data = $(this).serialize()

    $.ajax({
        type: 'POST',
        url: '/api/login',
        data,
        success: function (res) {
            if (res.status != 0) {
                return layer.mag('登录失败' + res.message)
            }
            layer.msg('登陆成功')
            localStorage.setItem('token', res.token)
            location.href = index.html
            $('#goReigister').click()

        }
    })
})






















