$(function () {

    let layer = layui.layer
    // 获取用户信息
    getAvatarAndName()

    // 退出功能
    $('#outBtn').click(function () {
        layer.confirm(
            '确认退出么?',
            { icon: 3, title: '提示' },
            function (index) {
                // 1.把存在本地的token清除掉
                // 2.页面跳转login.html页面
                localStorage.removeItem('token')
                location.href = 'login.html'
                layer.close(index);
            });
    })
})

// 全局的获取用户信息
function getAvatarAndName() {
    let data = $(this).serialize()
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        data,
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败')
            }
            // layer.msg('获取用户信息成功')
            // 处理头像和昵称

            // 先处理名字，优先展示昵称
            let name = res.data.nickname || res.data.username
            // console.log(name, name[0].toUpperCase());
            let firstWord = name[0].toUpperCase()

            $('#welcome').text('欢迎 ' + name)
            $('.text-avatar').text(firstWord)

            // 处理头像
            // 通过user_pic进行判断处理
            if (res.data.user_pic) {
                // user_pic有值，隐藏文字头像，展示用户头像
                $('.text-avatar').hide()
                $('.layui-nav-img').show().attr('src', res.data.user_pic)
            } else {
                $('.text-avatar').show()
                $('.layui-nav-img').hide()
            }
        }
        // complete: function (xhr) {
        //     console.log(xhr);
        //     if (xhr.responseJSON.status == 1 && xhr.responseJSON.message == '身份认证失败！') {
        //         localStorage.removeItem('token')
        //         location.href = 'login.html'
        //     }
        // }

    })
}