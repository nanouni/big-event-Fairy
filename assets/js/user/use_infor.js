$(function () {

    let data = $(this).serialize()
    let form = layui.form

    getInfo()

    function getInfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            data,
            success: function (res) {
                console.log(res);

                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                //给表单赋值
                form.val("userForm", res.data);
            }
        })
    }

    // 重置功能
    $('#reBtn').click(function (e) {
        e.preventDefault();
        getInfo()
    })

    // 提交表单数据-修改用户信息
    $('#userForm').submit(function (e) {
        e.preventDefault()

        let data = $(this).serialize()

        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改用户信息失败！')
                }
                layer.msg('修改用户信息成功')
                // 通过getAvatarAndName获取父页面的元素
                window.parent.getAvatarAndName()
            }
        })
    })

    // 添加表单校验功能
    form.verify({
        wordlength: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (value.length > 6) {
                return '字符长度必须为1-6之间';
            }
        }
    })
})