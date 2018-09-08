import Koa from 'koa'
import koaStatic from 'koa-static'
import { log } from './src/log'
log.showDate = true

const PORT = 4000

let koa = new Koa()

// Serve index.html
koa.use(koaStatic('./public'))
// Serve main.mjs (and other code)
koa.use(koaStatic('./src'))

koa.listen(PORT)

log(`Listening at http://localhost:${PORT}`)
