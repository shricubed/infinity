/**
 * Handles all account-related services
 * including registration/login/reset/etc
 */

const express = require('express')
const app = express.Router()
const db = require('../services/db')
const passport = require('../lib/passport')

// Temporary route strictly for internal use, remove later
app.post('/create', (req, res) => {
  const name = req.body.name
  const password = req.body.password

  if (name.indexOf('team_') === 0 && password !== '') {
    db.createUser(name, password)
      .then(() => {
        res.render('message', {
          message:
            'Your account has been registered successfully. You may now proceed to log in.',
          title: 'Registration Completed'
        })
      })
      .catch((e) => {
        res.render('message', { message: e, title: 'Error' })
      })
  } else {
    res.render('message', {
      message:
        'Invalid account details. Team ID must start with "team_", and password must not be empty.',
      title: 'Error'
    })
  }
})

app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/team',
    failureRedirect: '/login'
  }),
  (req, res) => {
    if (req.body.remember) {
      req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000
    } else {
      req.session.cookie.expires = false
    }

    res.redirect('/')
  }
)

app.post(
  '/update',
  passport.authenticate('local', {
    successRedirect: '/team',
    failureRedirect: '/login'
  }),
  (req, res) => {
    const data = {
      displayName: req.body.displayName,
      affiliation: req.body.affiliation
    }
  }
)

app.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})

module.exports = app