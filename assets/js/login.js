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

    // 表单验证功能
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
        repsw: function (value, item) { //value：表单的值、item：表单的DOM对象
            let psw = $('#psw').val()
            if (psw !== value) {
                return '两次密码不一致，请重新输入'
            }
        }

    });

    // 发送注册请求
    $('#reg').on('submit', function (e) {
        e.preventDefault();

        // 获取表单中的数据
        let data = $(this).serialize()

        // 发起注册请求
        $.ajax({
            url: '/api/reguser',
            type: 'POST',
            data,
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg('注册失败' + res.message);
                    return
                }
                layer.msg('注册成功');
                $('#goLogin').click()
            }
        })
    })

    // 发送登陆请求
    $('#login').on('submit', function (e) {
        e.preventDefault()

        // 获取表单中的数据
        let data = $(this).serialize()

        $.ajax({
            type: 'POST',
            url: '/api/login',
            data,
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg('登录失败' + res.message);
                    return
                }
                layer.msg('登录成功，即将进入后台主页', {
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                }, function () {

                    // 跳转到index.html
                    location.href = 'index.html'
                });
                // 登陆成功，保存token地址
                localStorage.setItem('token', res.token)

            }
        })
    })


})


