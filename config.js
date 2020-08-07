require('dotenv').config()

module.exports = {
  port: process.env.PORT || 3000,
  db: process.env.DATABASE_URL,
  redis: process.env.REDIS_URL,
  sessionSecret: process.env.SESSION_SECRET,
  airtable: {
    key: process.env.AIRTABLE_KEY,
    base: process.env.AIRTABLE_BASE
  },
  recaptcha: {
    site: process.env.RECAPTCHA_SITEKEY,
    secret: process.env.RECAPTCHA_SECRETKEY
  }
}
