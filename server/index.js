const express = require('express')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})

const handler = app.getRequestHandler();

app.prepare().then(()=>{
    const server = express()
    // 自定义服务器路由
    server.get('/hello',(req,res)=>{
        res.send('hello next.js')
    })
    // 当前配置的路由都没有匹配上时 会交给handler 走到页面自己的路由系统
    server.get('*',(req,res)=>{
        handler(req,res)
    })
    server.listen(3000,() => console.log('服务器启动成功'))
})