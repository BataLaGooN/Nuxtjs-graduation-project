# Nuxtjs-graduation-project

# 👴的毕业设计

👴用nuxtjs写的毕设后端nodejs的koa框架，写的一个餐厅管理系统
正常怎末操作大家知道吧
下下来之后```npm install```之后```npm run dev```
老子没上pm2，要不人没了
真的这毕设做的我脑袋大
我还是自杀算了

下面我说一下这个毕设我架构的时候用的很操蛋的一个架构
主要是为了追求数据的跨域以及数据的伪热更新

```flow
st=>operation: 前端页面
op=>operation: vuex
cond=>operation: 瞎几把post和get的后端
e=>operation: 瞎几把搞的数据库

st->op->cond->e
```

还有这几样东西

- [x] passport用来用户鉴权的，结果他妈最后路哟鉴权不想用了（是他妈不会），最后都一股脑放server里面
- [x] Redis用户存储，老子没拿来做什么高科技，就他妈存储个session也是搞笑
- [x] tinymce的一个富文本编辑器，里面有个代码是可以直接上传图片到static的，你们可以看一下
- [ ] 剩下的👴忘了，行了到此为止，里面还加了私货

毕设没做完我可操了
