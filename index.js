var http = require('http')
var url = require('url')
var StringDecoder = require("string_decoder").StringDecoder

var server = http.createServer(function(req,res){

    res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	res.setHeader('Access-Control-Allow-Headers', '*');
    var parsedUrl = url.parse(req.url,true);

    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g,'')

    var queryStringObj = parsedUrl.query

    var method = req.method.toLowerCase();
    
    var reqHeaders = req.headers

    var decoder = new StringDecoder('utf-8');
    var buffer = '';
    req.on('data',function(data) {
        buffer += decoder.write(data)
    })
    req.on('end',function(data){
        buffer += decoder.end();
        res.end("Hello world\n")
    
        console.log("Req buffer: ", buffer)
    })

})

server.listen(3000,function(){
    console.log("The server is listening on port 3000 now")
})