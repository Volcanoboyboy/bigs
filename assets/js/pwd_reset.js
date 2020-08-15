/**
 * 重置密码
 */
$(function(){

    let form = layui.form;
    let layer = layui.layer;

    form.verify({
        password: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        password_unsame: function(value) {
            if($(".layui-form [name=oldPwd]").val() === value) {
                return "新密码不能与原密码相同";
            }
        },
        password_same: function(value) {
            if($(".layui-form [name=newPwd]").val() !== value){
                return "两次密码不一致";
            }
        }
    })

    $(".layui-form").on("submit",function(e){
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success(res) {
                // console.log(res);
                if(res.status !== 0) {
                    return layer.msg("重置密码失败!",{icon: 2});
                }
                layer.msg("重置密码成功!",{iocn: 1});
                $(".layui-form")[0].reset();
            }
        })
    })
})