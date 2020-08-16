const express = require('express')
const app = express.Router()
const rateLimit = require('express-rate-limit')

const fs = require('fs')
const sanitize = require('sanitize-filename')
const path = require('path')
const showdown = require('showdown')
const converter = new showdown.Converter()

const messages = require('../lib/messages')

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 1 minute
  max: 200 // limit each IP to 10 attempts per minute
})

app.use(limiter)

app.get('/:pagename', (req, res) => {
  const pagename = sanitize(req.params.pagename)

  fs.readFile(
    path.join(__dirname, `../pages/${pagename}.md`),
    'utf8',
    (err, data) => {
      if (err) {
        res.render('message', messages.notFound)
      } else {
        res.render('page', {
          layout: 'page',
          content: converter.makeHtml(data)
        })
      }
    }
  )
})

module.exports = app
