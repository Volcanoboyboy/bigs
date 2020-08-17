$(function(){

    let layer = layui.layer;
    //  查询对象
    let queryData = {
        pagenum: 1,
        pagesize: 2,
        cate_id: "",
        state: ""
    }

    //  模版字符串时间过滤器
    template.defaults.imports.formDate = function(value) {
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
    function initTable(){
        $.ajax({
            method: "GET",
            url: "/my/article/list",
            data: queryData,
            success(res) {
                if(res.status !== 0) {
                    return layer.msg("获取文章列表失败");
                }
                // console.log(res);
                let htmlStr = template("temp_list", res);
                $("tbody").html(htmlStr);
            }
        })
    }
})