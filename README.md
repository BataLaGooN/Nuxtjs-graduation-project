# Nuxtjs-graduation-project

#### 👴的毕业设计

👴用nuxtjs写的毕设后端nodejs的koa框架，写的一个餐厅管理系统
正常怎末操作大家知道吧
下下来之后```npm install```之后```npm run dev```
老子没上pm2，要不人没了
真的这毕设做的我脑袋大
我还是自杀算了
还有这几样东西

- [x] passport用来用户鉴权的，结果他妈最后路哟鉴权不想用了（是他妈不会），最后都一股脑放server里面
- [x] Redis用户存储，老子没拿来做什么高科技，就他妈存储个session也是搞笑
- [x] tinymce的一个富文本编辑器，里面有个代码是可以直接上传图片到static的，你们可以看一下，XSS白名单ojbk
- [x] 上了垃圾的高德导航，然后卧槽Chorme竟然5%错误率获取不到地址，好像geolocation被google团队重写了，我吐了
- [x] Vue-masonry的瀑布流上了一个，觉得还挺好看的,然后还加了一个LAZYLOAD加速加载
- [x] Vue-cropper追加，主页新品图片上传时候可以剪切

下面介绍一下毕业之后将会加一些东西，只要有时间的话

- [ ] 扩增mongodb的GRIDFS的模块进行对文件上传的配置修改
- [ ] 前后端将会分离进行重构，极有可能前端利用REACT进行重写
- [ ] 增加pm2的部署并且上传到服务器
- [ ] 极有可能增加socketio进行实时通信
- [ ] 剩下的sh👴忘了，行了到此为止，里面还加了私货
- [ ] 还有还有，必要追加Elasticsearch对文章的搜索

但愿导师答辩能让我过
