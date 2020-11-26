$(function () {
    let layer = layui.layer

    // 1.1 获取裁剪区域的 DOM 元素
    let $image = $('#image')

    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 点击上传按钮,模拟点击文件域
    $('#uploadBtn').click(function () {
        $('#file').click()
    })

    // 监听文件域选择文件的变化
    $('#file').on('change', function () {
        //  当选择的文件变了，该文件就触发
        // 更换裁剪图片
        // file属性是文件域DOM对象的属性，记录所有的用户选择的文件
        // 拿到用户选择的文件
        // e.target === this 当前的文件域
        let file = this.files[0]
        // console.dir(this);
        console.log(file);
        // 根据选择的文件，创建一个对应的URL地址
        let newImageURL = URL.createObjectURL(file)
        // 先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域
        $image
            .cropper('destroy')  // 销毁旧的裁剪区域
            .attr('src', newImageURL)  // 重新设置图片路径
            .cropper(options)  // 重新初始化裁剪区域
    })

    // 上传头像 实现剪切后的图片
    $('#sureBtn').click(function () {
        // let dataURL = $image.cropper('getCropperCanvas', { // 创建一个canvas画布
        //     width: 100,
        //     height: 100
        // }).toDataURL('image/png') // 将Canvas画布上的内容，转化为base64格式的字符串
        let dataURL = $image
            .cropper("getCroppedCanvas", {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100,
            })
            .toDataURL("image/png"); // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        // console.log(dataURL);
        // return

        $.ajax({
            type: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更换头像失败！')
                }
                layer.msg('更换头像成功')
                window.parent.getAvatarAndName('index.html')
            }
        })
    })

})