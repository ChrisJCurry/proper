import nodemailer from 'nodemailer'
import { logger } from './Logger'

const config = {
  from: process.env.EMAIL,
  host: 'smtp.gmail.com', // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  }
}

const transporter = nodemailer.createTransport(config)

// STRECH GOAL send mail when creating a new rental!

// we will not need this after we can call it later from a service
// sendMail(mailOptions)

// const mailOptions = {

//   from: process.env.EMAIL,
//   to: 'contact@chrisjcurry.me',
//   subject: 'Nodemailer Project',
//   text: 'Hi from your nodemailer project',
//   html: '<h1>HELLO</h1>'
// }

export function sendMail(mailOptions) {
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      logger.log('Error ' + err)
    } else {
      logger.log('Email sent successfully')
    }
  })
}
