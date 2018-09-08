import Koa from 'koa'
import koaStatic from 'koa-static'

let koa = new Koa

koa.use(koaStatic('./public'))

koa.listen(8080)
