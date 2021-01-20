const amqp = require('amqplib/callback_api')

const port = 8080
const fs = require('fs')

const myImage = fs.readFileSync('./suni.jpg')
// const myImage = fs.readFileSync('./thinhlam.txt')
// const b64Image = Buffer.from(myImage)
// console.log(typeof b64Image)
// console.log(new Buffer('woop'))

// const myText = b64Image.toString('base64')
// console.log(myText)

amqp.connect('amqp://localhost', function (error0, connection) {
    if(error0) {
        console.log("object")
        throw error0
    }
    connection.createChannel(function(error1, channel){
        if(error1) {
            throw error1
        }
        let queue = 'task_queue'
        // let msg = process.argv.slice(2).join(' ') || 'Hello World'
        // console.log(process.argv)

        channel.assertQueue(queue, {
            //durable: when rabbitMQ die, message is not lost
            durable: false
            // exclusive: true
        })

        channel.sendToQueue(queue, Buffer.from(myImage),{
            persistent: true
        })
        // console.log(" [x] Sent %s", myImage)
        
    })
    setTimeout(() => {
        connection.close()
        process.exit(0)
    }, 500)
})