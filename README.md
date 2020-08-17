# bigs
> new items to strong!

## 练习一下ajax和DOM渲染的一些操作!

#### 注册\登录

```bash
头像、昵称的处理,token本地保存

利用token获取授权信息
```



#### ajax预处理

```js
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
})
```



#### ajax complete()回调

无论ajax失败或者成功都会执行这个回调函数,

可以利用这个函数让没有token的用户强制跳回登录



#### 退出登录

1. 退出二次确认,确认退出,取消就不退出,防止误点
2. 退出要remove掉本地的token
3. 返回到登录页面

#### 用户信息的修改

1. 展示用户信息

2. *form.val('filter', object);* layui 提供的快速填充表单信息,利用name属性和object属性一致性

3. <input type="hiddeng">let web developers include data that cannot be seen or modified by users when a form is submitted,利用这个隐藏域储存一些我们不想显示,但是又需要的数据

4. 在ifram里面调用父级页面的全局方法,在ifram里面window指向自己的窗口

   jQuery入口函数里面的函数式属于jQuery对象的,在入口函数外的才是全局的,可以用window调用到

   1. ```
      window.parent.getUserInfo();
      ```

      

#### 使用Cooper.css插件裁剪更换用户头像



#### `base64`格式的图片

`base64`格式你会发现是一段字符串，其实`base64`格式的图片，就是利用一段字符串来描述这张图片

**好处：**能够避免一些额外的图片请求

**缺点：**体积会比原来图片要大 30% 左右

**使用场景：**不适用大图片，一些小图片比较适合使用（图片上传时的本地预览功能）

```
URL.createObjectURL()	//	使用这个方法可以将文件转化为base64
```



#### 发布

1. 初始化富文本区域,利用tinymce插件

2. 初始化图片裁剪器,

   ```
       // 1. 初始化图片裁剪器
       var $image = $('#image')
   
       // 2. 裁剪选项
       var options = {
           aspectRatio: 400 / 400,
           preview: '.img-preview'
       }
       // 3. 初始化裁剪区域
       $image.cropper(options)
   ```

   如果有新添加的的图片要重新销毁原区域,然后重新初始化图片剪裁器(cropper)

   ```
   $image
       .cropper('destroy') // 销毁旧的裁剪区域
       .attr('src', newImageURL) // 重新设置图片路径
       .cropper(options) // 重新初始化裁剪区域
   ```

3. 文件上传的时候注意接口文档的参数要球,例如图片需要blob格式等

4. 注意利用FormData做ajax的时候需要配置如下两个参数

   ```
   contentType: false,	//	不需要再设置请求头格式
   processData: false,	//	参数不需要二次编码了
   ```

   









#### 筛选

#### 添加

#### 删除

#### 文件上传等