const express = require('express')
const app = express()
const amqp = require('amqplib/callback_api')

app.get('/data')