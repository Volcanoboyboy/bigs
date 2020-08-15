
$(function(){
    let layer = layui.layer;
    init_article_categore();
    function init_article_categore() {
        $.ajax({
            method: "GET",
            url: "/my/article/cates",
            success(res) {
                if(res.status !== 0){
                    return layer.msg("文章类别获取失败");
                }
                // console.log(res);
                let htmlStr = template("article_list",res);
                $("tbody").html(htmlStr);
            }
        })
    }
})