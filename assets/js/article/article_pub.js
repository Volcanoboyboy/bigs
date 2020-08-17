
$(function () {

    let form = layui.form;
    let layer = layui.layer;

    initCate();
    //  初始化选择类别
    function initCate() {
        $.ajax({
            method: "GET",
            url: "/my/article/cates",
            success(res) {
                if (res.status !== 0) return layer.msg("获取分类失败");
                let htmlStr = template("tpl-cate", res);
                $("[name=cate_id]").html(htmlStr);
                form.render();
            }
        })
    }

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 400,
        preview: '.img-preview'
    }
    // 3. 初始化裁剪区域
    $image.cropper(options)

    $("#btnChooseImage").on("click", function () {
        $("#coverFile").click();
    })

    $("#coverFile").on("change", function () {
        let file = $(this)[0].files;
        if (file.length === 0) return;

        let newImageURL = URL.createObjectURL(file[0]);
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImageURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    //  手动定义文章状态
    let article_state = "已发布";
    $("#btnSave2").on("click", function () {
        article_state = "草稿";
    })

    $("#form-pub").on("submit", function (e) {
        e.preventDefault();
        if($("[name=content]").val().trim() == "") {
            return layer.msg("发布内容不能为空");
        }
        let fd = new FormData($(this)[0]);
        fd.append("state",article_state);
        //  这里是利用copper插件将裁剪区域图片转化为blob文件对象然后添加到formData对象里面,作为参数传输
        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 400
            })
            .toBlob(function (blob) {
                // 将 Canvas 画布上的内容，转化为blob文件对象
                // 得到文件对象后，进行后续的操作
                // 5. 将文件对象，存储到 fd 中
                fd.append('cover_img', blob)
                // 6. 发起 ajax 数据请求
                publishArticle(fd)
            })
    })

    function publishArticle(data){
        $.ajax({
            method: "POST",
            url: "/my/article/add",
            data: data,
            contentType: false,
            processData: false,
            success(res) {
                if(res.status !== 0) return layer.msg("发布文章失败");
                layer.msg("发布文章成功");
                location.href = "/article/art_list.html";
            }
        })
    }
})