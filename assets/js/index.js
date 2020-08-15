$(function(){

    //  获取 layui 的layer对象
    let layer = layui.layer;
    getUserInfo();
    function getUserInfo(){
        $.ajax({
            method: "GET",
            url: "/my/userinfo",
            // headers: {
            //     Authorization: localStorage.getItem("token") || ""
            // },
            success(res){
                if(res.status !== 0) {
                    return layer.msg("获取用户信息失败!", {icon: 2});
                }
                renderUser(res.data);
            }
        })
    }

    //  渲染函数
    function renderUser(user){
        var name = user.nickname || user.username;
        $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
        if(user.user_pic){
            $(".layui-nav-img").attr("src", user.user_pic).show();
            $(".text-avatar").hide();
        } else {
            $(".layui-nav-img").hide();
            let firstLetter = name[0].toUpperCase();
            $(".text-avatar").html(firstLetter).show();
        }
    }

    //  退出登录
    $("#logout").click(function(){
       layer.confirm("确定要退出吗?",{icon: 3,title: "tips"},function(index){
           //   清除token
           localStorage.removeItem("token");
           location.href = "/login.html";
           layer.close(index);  //  关闭对应的窗口
       }) 
    })
})