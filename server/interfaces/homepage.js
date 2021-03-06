import Router from 'koa-router'
import Article from '../dbs/models/article'
import Photo from '../dbs/models/photo'

let router = new Router({ prefix: '/index' })

//已经废弃gethomepageArticle函数
router.get('/gethomepageArticle', async ctx => {
  try {
    let result = await Article.find().sort({_id: -1}).limit(4)
    ctx.body = {
      code: 0,
      result: result
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      result: {}
    }
  }
})

router.get('/getPhoto', async ctx => {
  try {
    let result = await Photo.find().sort({ _id: -1 })
    ctx.body = {
      code: 0,
      result: result
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      result: {}
    }
  }
})

export default router
