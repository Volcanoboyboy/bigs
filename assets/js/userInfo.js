
$(function () {
    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                layer.msg("昵称不能大于6位!", { icon: 2 })
            }
        }
    })

    initUserInfo();
    function initUserInfo() {
        $.ajax({
            method: "GET",
            url: "/my/userinfo",
            success(res) {
                if (res.status !== 0) {
                    return layer.msg("用户信息获取失败!", { icon: 5 });
                }
                // console.log(res);
                // form.val('filter', object); layui提供的快速提交
                form.val('formUserInfo', res.data);
            }
        })
    }
    //  用户信息重置
    $("#btnReset").on("click", function (e) {
        e.preventDefault();//   像重置这些操作,都有刷新页面或者跳转的默认事件,需要清除
        initUserInfo();
    })
    /******************************************** */
    $(".layui-form").on("submit", function(e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success(res) {
                if(res.status !== 0){
                    return layer.msg("用户信息更新失败",{icon: 2});
                }
                window.parent.getUserInfo();
                layer.msg("用户信息更新成功", {icon: 1});
                console.log(window.parent);
            }
        })
    })
})