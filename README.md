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

可以利用这个函数让没有token的用户强制跳会登录



#### 退出登录

1. 退出二次确认,确认退出,取消就不退出,防止误点
2. 退出要remove掉本地的token
3. 返回到登录页面

#### 发布

#### 筛选

#### 添加

#### 删除

#### 文件上传等