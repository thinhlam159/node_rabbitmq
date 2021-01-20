const express = require('express')
const path = require('path')
const amqp = require('amqplib/callback_api')
const app = express()
const exphbs = require('express-handlebars')
const cors = require('cors');
const port = 8080
const fs = require('fs')
const { totalmem } = require('os')

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/get_image/suni', function(req, res) {
    res.sendFile(__dirname + '/public/img/suni.jpg')
})

app.get('/data', (req, res) => {
    res.setHeader('Content-Type', 'image/jpg');
    amqp.connect('amqp://localhost', function(error0, connection) {
        if(error0) {
            throw error0
        }
        connection.createChannel(function(error1, channel) {
            if(error1) {
                throw error1
            }

            let queue = 'task_queue'
            //fair dispatch
            // channel.prefetch(5)
            channel.assertQueue(queue, {
                //message durability
                //durable: when rabbitMQ die, message is not lost
                durable: false
            })

            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue)

            channel.consume(queue, function(msg) {
                // var secs = msg.content.toString().split('.').length-1

                // console.log("[x] Received %s", msg.content.toString())
                // res.setHeader('Content-Type', 'text/html');
                // res.setHeader('Content-Length', Buffer.byteLength(body));
                // res.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
                res.write(msg.content.toString())
                console.log(typeof msg)
                // setTimeout(() => {
                //     console.log(" [x] Done")
                // }, secs*1000)
            //noAck: true: don't redelivery message
                
            }, {noAck : false})
            
        })
    })
    // res.end()
})
app.get('/test', (req, res) => {
    res.send('thinhlam')
})

app.listen(8080, console.log('server is running on port 8080!'))

