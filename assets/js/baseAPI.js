//  设置请求基准地址
$.ajaxPrefilter(function(options){
    options.url = "http://ajax.frontend.itheima.net" + options.url;
})