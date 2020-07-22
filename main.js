const counter = require('./modules')
const events=require('events')
const util=require('util')
const fs=require('fs')
const http=require('http')

// Basic Routing Example
    var server=http.createServer(function(req,res){
        console.log("Request has made : "+req.url)
        if(req.url==='/home' || req.url==='/'){
            res.writeHead(200,{'content-type':'text/html'})
            fs.createReadStream(__dirname+'/htmlFile/index.html','utf-8').pipe(res)
        }
        else if(req.url==='/contact'){
            res.writeHead(200,{'content-type':'text/html'})
            fs.createReadStream(__dirname+'/htmlFile/contact.html','utf-8').pipe(res)
        }
        else if(req.url==='/json'){
            var myObj=[{name:'gurte',age:'24'},{name:'sahil',age:'25'}]
            res.writeHead(200,{'content-type':'application/json'})
            res.end(JSON.stringify(myObj))
        }else{
            res.writeHead(404,{'content-type':'text/html'})
            fs.createReadStream(__dirname+'/htmlFile/404.html','utf-8').pipe(res)
        }
    })
    server.listen(3000)
    console.log('Now Server is listening') 

// Serving Simple Json File
    var server=http.createServer(function(req,res){
        console.log("Request has made : "+req.url)
        res.writeHead(200,{'content-type':'application/json'})
        var myObj={
            name:'Gurtej lal',
            age:'27'
        } 
        res.end(JSON.stringify(myObj))
    })

// Serving HTML Pages
    var server=http.createServer(function(req,res){
        console.log("Request has made : "+req.url)
        res.writeHead(200,{'content-type':'text/html'})
        const readStream=fs.createReadStream(__dirname+'/htmlFile/index.html','utf-8')
        readStream.pipe(res)
    })

// Sending Stream to Server
    var server=http.createServer(function(req,res){
        console.log("Request has made : "+req.url)
        res.writeHead(200,{'content-type':'text/plain'})
        const readStream=fs.createReadStream(__dirname+'/Textfiles/readmefile.txt','utf-8')
        readStream.pipe(res)
    })


    server.listen(3000)
    console.log('Now Server is listening')

// Using Pipe to create Stream
    const readmeStream=fs.createReadStream(__dirname+'/Textfiles/readmefile.txt','utf-8')
    const wirteStream=fs.createWriteStream(__dirname+'/Textfiles/writeme.txt')

    readmeStream.pipe(wirteStream)


// Writable Stream
    var readStream=fs.createReadStream(__dirname+'/Textfiles/readmefile.txt','utf-8')
    var writeStream=fs.createWriteStream(__dirname+'/Textfiles/writeme.txt')

    readStream.on('data',function(chunk){
        console.log('new chuck is recived')
        writeStream.write(chunk)
    })

// Creating And Removing Directories
    // Synchronized way
     fs.mkdirSync('stuff')
     fs.rmdirSync('stuff')

     // Unnsynchronized way
     fs.mkdir('stuff',function(){
         fs.readFile('./Textfiles/readMe.txt','utf-8',function(err,data){
             fs.writeFile('./stuff/writeTextFile.txt',data,function(){
                 console.log('Directory Sucessfully Created')
             })
         })
     })

     fs.unlink('./stuff/writeTextFile.txt',function(){
         fs.rmdir('stuff',function(){
             console.log('Directory Successfully Deleted')
         })
     })

// Reading and Writing Files
    // Synchronized way
    var readMe=fs.readFileSync('./Textfiles/readMe.txt','utf-8')
    fs.writeFileSync('./Textfiles/writeText.txt',readMe)
    
    // Unsynchronized way
    fs.readFile('./Textfiles/readMe.txt','utf-8',function(err,data){
        fs.writeFile('./Textfiles/WriteTextFile.txt',data,function(){
            console.log('Data Successfully Saved')
        })
    })


//Event Emitter in Node js
var Person=function(name){
    this.name=name;
}

util.inherits(Person,events.EventEmitter)

var gurtej=new Person('Gurtej')
var purshotam=new Person('Purshotam')
var people=[gurtej,purshotam]

people.forEach(function(Person){
    Person.on('talk',function(msg){
        console.log(Person.name+" Said : "+msg)
    })
})

gurtej.emit('talk','I am Awsome')

var myEmitter=new events.EventEmitter()
myEmitter.on('speak',function(msg){
    console.log(msg)
})

myEmitter.emit('speak','the Message was Emitted')


//Using Require and Module to access another Js file
var modules=require('./modules')
console.log(modules.counter(['a','b','c','d']))
console.log(modules.adder(5,11))
console.log(modules.adder(modules.pi,3))


// Simple function declaration and defenition
function sayHi(){
    console.log('hi')
}


// Function expression
var sayBye=function(){
    console.log('Bye')
}

sayBye();


// calling function from another function 
function callingFunction(fun){
    fun();
}
callingFunction(sayHi);