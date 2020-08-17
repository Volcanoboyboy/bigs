
$(function () {
    let layer = layui.layer;
    let form = layui.form;
    let indexAdd = null,
        indexEdit = null;  //  添加分类的弹层
    init_article_categore();
    function init_article_categore() {
        $.ajax({
            method: "GET",
            url: "/my/article/cates",
            success(res) {
                if (res.status !== 0) {
                    return layer.msg("文章类别获取失败");
                }
                // console.log(res);
                let htmlStr = template("article_list", res);
                $("tbody").html(htmlStr);
            }
        })
    }

    /***********添加文章分类**************** */
    //  添加按钮事件
    $("#btnAddCate").on("click", function () {
        indexAdd = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: '添加文章分类',
            ////这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
            content: $("#dialog-add").html()
        });
    })

    //  添加弹层提交事件.这里主要要使用事件委托
    $("body").on("submit", "#form-add", function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) return "新增文章类失败";
                init_article_categore();
                layer.msg("新增文章分类成功")
                //  layui提供的关闭弹层事件,类似于清除定时器
                layer.close(indexAdd);
            }
        })
    })

    /****************编辑文章分类展示,************** */
    $("body").on("click", ".btn-edit", function () {
        indexEdit = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: '编辑文章分类',
            ////这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
            content: $("#dialog-edit").html()
        });
        //  这里的data-id是自己给的对应的data.Id值
        let id = $(this).attr("data-id")

        $.ajax({
            method: "GET",
            url: "/my/article/cates/" + id,
            success(res) {
                if (res.status !== 0) return "获取文章分类失败";
                //  通过layui的form对象的val()填充数据
                form.val("form-edit", res.data);
            }
        })
    })

    $("body").on("submit", "#form-edit", function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) return layer.msg("修改文章分类失败");
                init_article_categore();
                layer.close(indexEdit);
                layer.msg("修改文章分类成功");
            }
        })
    })


    /***************删除文章分类*************** */
    $("tbody").on("click", ".btn-delete", function() {
        let id = $(this).attr("data-id");
        //  删除的事件都要在confirm的回调里面执行,保险
        layer.confirm("确定要删除该分类吗?",{icon: 3, title:"提示"},function(index){
            console.log(index);
            $.ajax({
                method: "GET",
                url: "/my/article/deletecate/" + id,
                success(res) {
                    if(res.status !== 0) return layer.msg("删除文章分类失败");
                    layer.close(index); //  删除对应的comfirm弹层,弹窗会阻止事件的执行
                    layer.msg("删除分类成功");
                    init_article_categore();
                },
                error(err){
                    console.log(err);
                }
            })
        })
    })
})