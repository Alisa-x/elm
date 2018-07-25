let http = require("http");
let url = require("url");
let fs = require("fs");
let mime = require("mime");
let path = require("path");
http.createServer((req,res)=>{
    //req 客户端向服务器发送请求时携带的信息
    //res 服务器端响应数据时携带信息
    //req.url 获取到请求的地址
    // url.parse()解析请求的地址
    let {pathname,query} = url.parse(req.url,true);
    console.log(pathname,req.method);
    if(pathname ==="/favicon.ico") return;
    if(pathname === "/shop"&&req.method==="GET"){
        let data = fs.readFileSync(path.join(__dirname,"shop.json"),"utf-8");
        if(query.id){
            data = JSON.parse(data);
            data = data.filter(item=>item.id===query.id);
            data = JSON.stringify(data)
        };
        res.writeHead(200,{
            "Content-Type":"application/json;charset=utf-8",
            "Access-Control-Allow-Origin":"*"
        });
        res.end(data);
        return;
    }
    if(pathname === "/order"&&req.method==="GET"){
        let data = fs.readFileSync(path.join(__dirname,"order.json"),"utf-8");
        if(query.id){
            data = JSON.parse(data);
            data = data.filter(item=>item.id===query.id);
            data = JSON.stringify(data);
        };
        res.writeHead(200,{
            "Content-Type":"application/json;charset=utf-8",
            "Access-Control-Allow-Origin":"*"
        });
        res.end(data);
        return;
    }
    if(pathname === "/login"&&req.method==="POST"){
        let str = "";
        let strBack = null;
        let data = "";
        req.on("data",data=>{str+=data});
        req.on("end",()=>{
            data = fs.readFileSync(path.join(__dirname,"login.json"),"utf-8");
            data = JSON.parse(data);
            str = JSON.parse(str);
            strBack = data.some(
                item=>item.account===str.account&&item.password===str.password
            );

            res.writeHead(200,{
                "Content-Type":"application/json;charset=utf-8",
                "Access-Control-Allow-Origin":"*",
                'Set-Cookie': '_utrace=e793e8c1e3b6658aa345e34ccff6dafc_2018-07-24; path=/; Expires=31 Dec 2020 23:59:59 GMT; domain=.ele.me',
            });
            res.end(strBack+"");
            return;
        });

    };
    if(pathname === "/add"&&req.method==="POST"){
        let str = "";
        let data= "";
        req.on("data",data=>{str+=data});
        req.on("end",()=>{
            data = fs.readFileSync(path.join(__dirname,"login.json"),"utf-8");
            data = JSON.parse(data);
            str = JSON.parse(str);
            data.push(str);
            fs.writeFile(path.join(__dirname,"login.json"),JSON.stringify(data),err=>{
                if(err){
                    res.end(err);
                }
                res.end("true");
                return;
            });
            res.writeHead(200,{
                "Content-Type":"application/json;charset=utf-8",
                "Access-Control-Allow-Origin":"*"
            });
        });

    };
    if(pathname === "/detail"&&req.method==="GET"){
        let data = fs.readFileSync(path.join(__dirname,"detail.json"),"utf-8");
        if(query.id){
            data = JSON.parse(data);
            data = data.filter(item=>item.id===query.id);
            data = JSON.stringify(data)
        };
        res.writeHead(200,{
            "Content-Type":"application/json;charset=utf-8",
            "Access-Control-Allow-Origin":"*"
        });
        res.end(data);
        return;
    }

}).listen(9090,()=>{
    console.log("9090的服务启动成功")
})