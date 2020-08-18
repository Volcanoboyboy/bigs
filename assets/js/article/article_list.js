$(function () {

    let layer = layui.layer;
    let form = layui.form;
    let laypage = layui.laypage;
    //  查询对象
    let queryData = {
        pagenum: 1,
        pagesize: 2,
        cate_id: "",
        state: ""
    }

    //  模版字符串时间过滤器
    template.defaults.imports.formDate = function (value) {
        let pub_date = new Date(value);
        let year = pub_date.getFullYear();
        let month = pub_date.getMonth() + 1;
        let date = pub_date.getDate();
        let hour = pub_date.getHours() < 10 ? "0" + pub_date.getHours() : pub_date.getHours();
        let min = pub_date.getMinutes() < 10 ? "0" + pub_date.getMinutes() : pub_date.getMinutes();
        let sec = pub_date.getSeconds() < 10 ? "0" + pub_date.getSeconds() : pub_date.getSeconds();

        return `${year}-${month}-${date} ${hour}:${min}:${sec}`;
    }


    //  获取数据
    initTable();
    function initTable() {
        $.ajax({
            method: "GET",
            url: "/my/article/list",
            data: queryData,
            success(res) {
                if (res.status !== 0) {
                    return layer.msg("获取文章列表失败");
                }
                // console.log(res);
                let htmlStr = template("temp_list", res);
                $("tbody").html(htmlStr);
                renderPage(res.total);
            }
        })
    }

    /**************筛选功能**************** */
    initCate();
    function initCate() {
        $.ajax({
            method: "GET",
            url: "/my/article/cates",
            success(resp) {
                if (resp.status !== 0) {
                    return layer.msg("获取文章分类失败")
                }
                // console.log(resp);
                let htmlStr = template("temp_cate", resp);
                $("[name=cate_id]").html(htmlStr);
                form.render();
            }
        })
    }

    /***************确认筛选结果************* */
    $("#form-search").on("submit", function (e) {
        e.preventDefault();
        let cate_id = $("[name=cate_id]").val();
        let state = $("[name=state]").val();
        queryData.cate_id = cate_id;
        queryData.state = state;
        initTable();
    })

    /***************layui.laypage对象渲染分页****************** */
    function renderPage(sum) {
        laypage.render({
            elem: 'fenye'
            , count: sum
            , limit: queryData.pagesize
            , curr: queryData.pagenum //获取起始页
            , jump(obj, first) {
                queryData.pagenum = obj.curr;
                queryData.pagesize = obj.limit;
                if (!first) {
                    initTable();
                }
            }
            , layout: ["count", "limit", "prev", "page", "next", "skip"]
            , limits: [2, 3, 5, 8, 10]
        });
    }

    $("tbody").on("click", ".btn-delete" , function(){
        let length = $(".btn-delete").length;
        let id = $(this).attr("data-id");
        layer.confirm("你确定要删除吗?", {icon: 3}, function(index) {
            $.ajax({
                method: "GET",
                url: "/my/article/delete/" + id,
                success(resp) {
                    if(resp.status !== 0) {
                        return layer.msg("删除失败");
                    }
                    if(length === 1){
                        queryData.pagenum = queryData.pagenum == 1 ? 1 : queryData.pagenum - 1;
                    }
                    initTable();
                    layer.msg("删除成功");
                }
            })
            layer.close(index);
        })
    })

    /****************编辑***************** */

    $("tbody").on("click", ".btn-edite", function(){
        let id = $(this).attr("data-id");
        location.href = `/article/atr_edit.html?id=${id}`;
    })

})