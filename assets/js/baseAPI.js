//  利用ajaxPrefilter()对ajax进行预设
$.ajaxPrefilter(function (options) {
    //  统一设置基准请求
    options.url = "http://ajax.frontend.itheima.net" + options.url;

    //  包含/my的接口统一设置请求头
    if (options.url.indexOf("/my") !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    }
    options.complete = function(res) {
        console.log(res);
        //responseJSON: {status: 1, message: "身份认证失败！"}
        if(res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！"){
            localStorage.removeItem("token");
            location.href = "/login.html";
        }
    }
})