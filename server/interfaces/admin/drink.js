import Router from 'koa-router'
import Drink from '../../dbs/models/drink'

let router = new Router({ prefix: '/manager/tea_manage' })

router.get('/getDrink', async ctx => {
  let pageSize = ctx.request.query.pageSize ? parseInt(ctx.request.query.pageSize) : 15
  let page = ctx.request.query.page ? parseInt(ctx.request.query.page) : 1
  let keyword = ctx.request.query.word || ''
  var reg = new RegExp(keyword, 'i');
  // 跳多少条数据
  let skip = (page - 1) * pageSize
  try {
    const total = await Drink.find({ $or: [{ drinkname: { $regex: reg } }] }).sort({ _id: -1 }).count()
    let result = await Drink.find({ $or: [{ drinkname: { $regex: reg } }] }).sort({ _id: -1 }).skip(skip).limit(pageSize)
    let isMore = total - (((page - 1) * pageSize) + result.length) > 0 ? true : false
    ctx.body = {
      dmcode: 0,
      dmresult: result,
      isMore: isMore
    }
  } catch (e) {
    ctx.body = {
      dmcode: -1,
      dmesult: {}
    }
  }
})

router.get(`/drinknamevalid`, async ctx => {
  let result = await Drink.findOne({
    $and: [
      { drinkname: ctx.request.query.name }, 
      { $nor: [{ _id: ctx.request.query.id }] }
    ]
  })
  if (result) {
    ctx.body = {
      vdnc: 0
    }
  } else {
    ctx.body = {
      vdnc: -1
    }
  }
})

router.post('/addDrink', async ctx => {
  let addnew = new Drink(ctx.request.body)
  let result = await addnew.save()
  if (result) {
    ctx.body = {
      code: 0,
      msg: '',
      result: [result]
    }
  } else {
    ctx.body = {
      code: -1,
      msg: 'fail',
      result: [{}]
    }
  }
})

router.post('/removeDrink', async ctx => {
  let result = await Drink.findByIdAndDelete(ctx.request.body.submitID)
  if (result) {
    ctx.body = {
      code: 0,
      msg: 'success',
      removeID: ctx.request.body.submitID
    }
  } else {
    ctx.body = {
      code: -1,
      msg: 'fail',
      removeID: ctx.request.body.submitID
    }
  }
})

router.post('/changeDrink', async ctx => {
  let result = await Drink.findByIdAndUpdate(ctx.request.body.drinkid, {
    drinkname: ctx.request.body.drinkname,
    drinkprice: ctx.request.body.drinkprice,
    drinktype: ctx.request.body.drinktype,
    drinkposition: ctx.request.body.drinkposition,
    drinkdescription: ctx.request.body.drinkdescription,
    drinkphoto: ctx.request.body.drinkphoto
  }, { 'new': true })
  if (result) {
    ctx.body = {
      code: 0,
      msg: 'success',
      drink: {
        id: result._id,
        name: result.drinkname,
        price: result.drinkprice,
        description: result.drinkdescription,
        type: result.drinktype,
        position: result.drinkposition,
        photo: result.drinkphoto
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: 'fail',
      drink: ''
    }
  }
})

// router.post('/searchDrink', async ctx => {
//   var reg = new RegExp(ctx.request.body.drinkname, 'i');
//   let result = await Drink.find({ $or: [{ drinkname: { $regex: reg } }] })
//   if (result) {
//     ctx.body = {
//       code: 0,
//       msg: 'success',
//       result: result
//     }
//   } else {
//     ctx.body = {
//       code: -1,
//       msg: 'fail',
//       result: []
//     }
//   }
// })
export default router
