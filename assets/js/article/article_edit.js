$(function () {
    let layer = layui.layer;
    let form = layui.form;
    let url = location.search;
    let id_index = url.indexOf("=") + 1;
    let id = url.slice(id_index);


    //   文章状态
    let article_state = null;

    /***************初始化裁剪区 */
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 400,
        preview: '.img-preview'
    }
    // 3. 初始化裁剪区域
    $image.cropper(options)
    /*************初始化裁剪区结束 */

    //  获取所有文章分类 并渲染
    $.ajax({
        method: "GET",
        url: "/my/article/cates",
        success(resp) {
            // console.log(resp, "文章分类");
            if (resp.status !== 0) {
                return layer.msg("获取文章分类失败")
            }
            let htmlStr = template("tpl-cate", resp)
            $("[name=cate_id]").html(htmlStr);
            form.render();
            initArticle();
        }
    })

    function initArticle() {
        //  获取指定数据
        $.ajax({
            method: "GET",
            url: "/my/article/" + id,
            success(resp) {
                // console.log(resp);
                if (resp.status !== 0) {
                    return layer.msg("文章信息获取失败");
                }
                form.val("form-edit", resp.data);
                tinyMCE.activeEditor.setContent(resp.data.content)
                article_state = resp.data.state;
                let url = "http://ajax.frontend.itheima.net" + resp.data.cover_img;
                //  重新配置裁剪区
                $image
                    .cropper('destroy') // 销毁旧的裁剪区域
                    .attr('src', url) // 重新设置图片路径
                    .cropper(options) // 重新初始化裁剪区域
            }
        })
    }

    //  图片
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

    $("#btnSave2").on("click", function () {
        article_state = "草稿";
    })

    $("#btnSave1").on("click", function () {
        article_state = "已发布";
    })

    $("#form-edit").on("submit", function (e) {
        e.preventDefault();
        //  只能手动在这里判断,因为textarea被初始化为div了,不能使用layui的验证规则了
        if ($("[name=content]").val().trim() == "") {
            return layer.msg("发布内容不能为空");
        }
        let fd = new FormData($(this)[0]);
        fd.append("state", article_state);
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
                updateArticle(fd)
            })
    })

    function updateArticle(data) {
        $.ajax({
            method: "POST",
            url: "/my/article/edit",
            data: data,
            contentType: false,
            processData: false,
            success(res) {
                if (res.status !== 0) return layer.msg("发布文章失败");
                layer.msg("发布文章成功");

                //  模拟一次点击实现跳转
                window.parent.document.querySelector("#article_list").click();
            }
        })
    }
})