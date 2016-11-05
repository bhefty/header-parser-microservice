'use strict'

const express = require('express')
const app = express()

app.get('/api/whoami', function(req, res) {
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  let language = (req.headers['accept-language']).slice(0, 5)
  let software = (req.headers['user-agent'])
                  .match(/\(([^)]+)\)/)[1]

  let whoami = {
    ipaddress: ip,
    language: language,
    software: software
  }

  console.log(JSON.stringify(whoami, null, 2))

  res.send(whoami)
})

app.get('/', function(req, res) {
  res.redirect('/api/whoami')
})

app.listen(process.env.PORT || 8080, function(req, res) {
  console.log("Server is listening.")
})
