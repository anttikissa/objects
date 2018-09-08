import Koa from 'koa'
import koaStatic from 'koa-static'
import mount from 'koa-mount'
import { log } from '../common/log'
import { autorestart } from './autorestart'

log.showDate = true

const PORT = 4000

let koa = new Koa()

// Serve index.html
koa.use(koaStatic('./public'))
// Serve main.mjs (and other code)
koa.use(koaStatic('./client'))

koa.use(mount('/common', koaStatic('./common')))

koa.listen(PORT)

log(`Listening at http://localhost:${PORT}`)

autorestart()
