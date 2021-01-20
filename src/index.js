const express = require('express')
const path = require('path')
const amqp = require('amqplib/callback_api')
const app = express()
const exphbs = require('express-handlebars')
const cors = require('cors');
const port = 8080
const fs = require('fs')
const { totalmem } = require('os')

app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    extname: 'hbs'
}))
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'resource/views'))
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin": "*")
//   }) 
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))

console.log(__dirname)



app.get('/get_data', function(req, res) {
    amqp.connect('amqp://localhost', function(error, connection) {
        if(error) {
            throw error;
        }
        const queue = 'javatechie_queue'
        connection.createChannel(function(error1, channel) {
            if(error1) {
                throw error1
            }

            channel.assertQueue(queue, {
                durable: true   
            })
            channel.prefetch(1)
            channel.consume(queue, function(msg) {
                // var secs = msg.content.toString().split('.').length-1
    
                console.log("[x] Received %s", msg.content.toString())
                res.send(msg.content.toString())
                // setTimeout(() => {
                //     console.log(" [x] Done")
                // }, secs*1000)
            //noAck: true: don't redelivery message
            }, {noAck : false})
        })
    })
    // res.send("hehe")
})



app.get('/', function(req, res) {
    res.render("home")
})

app.get('/new', function(req, res) {
    res.send({ some: 'json' });
})

app.get('/get_image/suni', function(req, res) {
    res.sendFile(__dirname + '/public/img/suni.jpg')
})

app.get('/lyly', function(req, res) {
    const range = req.headers.range
    if(!range) {
        res.status(404).send("Requires Range header")
    }

    const videoPath = __dirname + '/public/videos/lyly.mp4'
    const videoSize = fs.statSync(__dirname + '/public/videos/lyly.mp4').size

    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };

    // HTTP Status 206 for Partial Content
    res.writeHead(206, headers);

    // create video read stream for this particular chunk
    const videoStream = fs.createReadStream(videoPath, { start, end });

    // Stream the video chunk to the client
    videoStream.pipe(res);
})

app.listen(port, console.log('Server is running on port 8080'))