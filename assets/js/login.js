
/**
 * 接口文档: https://www.showdoc.com.cn/escook?page_id=3707158761215217
 * 接口头: http://ajax.frontend.itheima.net
 */
$(function () {
    //  注册
    $("#link_reg").on('click', function () {
        $('.reg-box').show();
        $('.login-box').hide();
    })
    //  登录
    $("#link_login").on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    })
    //  注册表单提交事件
    //  给表单绑定submit事件
    $("#form_reg").on("submit", function (e) {
        //  阻止默认事件
        e.preventDefault();
        //  表单验证 有自定义验证
        //  收集数据
        let data = {
            username: $("#form_reg [name=username]").val(),
            password: $("#form_reg [name=password]").val()
        }
        //  ajax
        $.ajax({
            type: "POST",
            url: '/api/reguser',
            data: data,
            success(res) {
                if (res.status !== 1) return layer.msg(res.message,{icon: 5})
                layer.msg("注册成功", {icon: 6})
                $("#link_login").click();
            }
        })
    })

    //  获取layui中的form对象
    let form = layui.form;
    let layer = layui.layer;

    //  自定义表单验证规则
    form.verify({
        password: [/^[\S]{6,12}$/, "密码必须是6-12位,且不能出现空格"],
        repetPassword: function (value) {
            let rePassword = $("#form_reg [name=password]").val();
            if (rePassword !== value) {
                return "两次输入的密码不一致";
            }
        }
    })

    //  登录
    $("#form_login").on('submit', function(e){
        e.preventDefault();
        let data = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "/api/login",
            data: data,
            success(res){
                if(res.status !== 0) {
                    return layer.msg(res.message, {icon: 5});
                }
                //  保存token
                localStorage.setItem("token", res.token);
                layer.msg("登录成功",{icon: 6});
                location.href = "/index.html";
            }
        })
    })
})