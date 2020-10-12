// const Koa = require('koa')
// const views = require('koa-views');
// const path = require('path');

import Koa from 'koa'
import views from 'koa-views'
import path from 'path'

const app = new Koa()

app.use(views(path.join(__dirname, './src/_'), {
    extension: 'ejs'
}))

app.use(async(ctx)=>{
    let title = 'hello lval'
    await ctx.render('index',{title})
})

app.listen(30304, function () {
    console.log('[demo] ejs is starting at port 3030');
});