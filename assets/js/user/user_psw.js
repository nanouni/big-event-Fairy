$(function () {
    let form = layui.form
    let layer = layui.layer
    form.verify({

        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        newPass: function (value, item) { //value：表单的值、item：表单的DOM对象

            let oldPsw = $('[name = oldPwd]').val()
            if (value == oldPsw) {
                return '新密码不能和原密码相同';
            }
        },
        samePass: function (value, item) { //value：表单的值、item：表单的DOM对象

            let newPsw = $('[name = newPwd]').val()
            if (value !== newPsw) {
                return '两次密码不一致';
            }
        }
    });

    // 提交表单，重置密码
    let $form = $('#passForm')
    $form.on('submit', function (e) {
        e.preventDefault();

        let data = $(this).serialize()
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('密码修改失败', res.message)
                }
                layer.msg(res.message)
            }

        })
        // 重置表单中密码框内容
        $form.get(0).reset()
    })
})