$(function () {
    let layer = layui.layer
    let form = layui.form

    getArtCate()
    function getArtCate() {
        // 获取文章类别数据
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);

                let htmlStr = template('trTpl', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    // 点击添加类别按钮
    let indexAdd
    $('#addCateBtn').click(function () {
        // 弹出层
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            area: '500px',
            content: $('#addFormTpl').html()
        });

    })

    // 添加文章分类
    $('body').on('submit', '#sureAdd', function (e) {
        e.preventDefault();

        let data = $(this).serialize()
        $.ajax({
            url: '/my/article/addcates',
            type: 'POST',
            data,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                // 关闭弹出层
                layer.close(indexAdd);
                // 重新获取文章类别数据
                getArtCate()
            }

        })
    })

    // 编辑
    let indexEdit
    $('tbody').on('click', '.editBtn', function () {
        // 通过data-id属性获取id
        let id = $(this).attr('data-id')
        // console.log(id);

        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            area: '500px',
            content: $('#editFormTpl').html()
        })


        $.ajax({
            url: '/my/article/cates/' + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 把数据填充到form表单当中
                form.val("formTest", res.data);
            }
        })
    })

    // 确认修改 提交表单更新文章分类数据

    $('body').on('submit', '#sureEdit', function (e) {
        e.preventDefault()

        let data = $(this).serialize()
        // console.log(data);

        $.ajax({
            url: '/my/article/updatecate',
            type: 'POST',
            data,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                layer.close(indexEdit)
                getArtCate()
            }
        })

    })

    // 删除
    $('tbody').on('click', '.delBtn', function () {

        let id = $(this).attr('data-id')

        $.ajax({
            url: '/my/article/deletecate/' + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)


                // 弹提示框
                layer.confirm('确认删除么?', { icon: 3, title: '提示' }, function (index) {

                    layer.close(index);
                    getArtCate()
                });
            }

        })

    })



})