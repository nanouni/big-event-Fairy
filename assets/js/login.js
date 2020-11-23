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



