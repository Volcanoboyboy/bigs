

// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: '.img-preview'
}
// 1.3 创建裁剪区域
$image.cropper(options)

//  通过上传按钮触发文件表单事件拉起文件
$("#btnChooseImage").on("click",function(){
    $("#file").click();

})

//  给文件表单注册change事件,然后将其隐藏
$("#file").on("change",function(e){
    let file_list = e.target.files;
    if(file_list.length == 0) {
        return layer.msg("请选择图片");
    }

    let file = file_list[0];
    //  将图片转化为base64格式
    let image_url = URL.createObjectURL(file);
    $image.cropper("destroy").attr("src", image_url).cropper(options);
})

$("#btnUpload").on("click",function() {
    let file_list = $("#file")[0].files;
    if(file_list.length == 0) {
        layer.msg("请选择图片")
    }

    //  将裁剪得到图片转为base64
    let dataURL = $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png');

    $.ajax({
        method: "POST",
        url: "/my/update/avatar",
        data: {
            avatar: dataURL
        },
        success(res) {
            if(res.status !== 0) {
                return layer.msg("更换头像失败!");
            }
            window.parent.getUserInfo();
            layer.msg("更新头像成功!")
        }
    })
})