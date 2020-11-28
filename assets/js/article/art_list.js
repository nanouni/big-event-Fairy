$(function () {
    let layer = layui.layer

    // 通过变量存储，方便后面更改数据
    let query = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }

    // 获取文章列表
    getList()
    function getList() {
        $.ajax({
            url: '/my/article/list',
            data: query,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // layer.msg(res.message)
                let htmlStr = template('trTpl', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    // 美化时间 -->　过滤器
    const paddZero = n => (n < 10 ? '0' + n : n)
    template.defaults.imports.formatTime = function (time) {

        let d = new Date(time)
        let y = d.getFullYear()
        let m = paddZero(d.getMonth())
        let day = paddZero(d.getDate())
        let h = paddZero(d.getHours())
        let min = paddZero(d.getMinutes())
        let s = paddZero(d.getSeconds())

        return `${y}-${m}-${day} ${h}:${min}:${s}`
    }


})