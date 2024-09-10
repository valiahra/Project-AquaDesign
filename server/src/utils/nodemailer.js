const nodemailer = require("nodemailer");
const fs = require('fs');
const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru', //тут у тебя будет smtp.mail.ru
    port: 465, // тут порт для mail ru надо посмотреть
    secure: true, // Use true for port 465, false for all other ports
    auth: {
      user: 'manager_fountains@mail.ru', // тут имя твоего ящика
      pass: 'NAFetUxtz9pXz4vANJy2', // QpvzvFXbT11i8w0emcMK, NAFetUxtz9pXz4vANJy2, тут пароль не тот который ты создал , а пароль для стороннего приложения
    },
    dkim: {
        domainName: 'mail.ru',
        keySelector: 'default',
        privateKey: fs.readFileSync(__dirname + '/mail_ru_dkim_private_key.txt', 'utf8'),
      },
  });
  
  // async..await is not allowed in global scope, must use a wrapper
  async function main(email, username) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"manager_fountains@mail.ru" <manager_fountains@mail.ru>', // sender address
      to: email, // list of receivers
      subject: 'Приветствуем Вас!', // Subject line
    //   text:  `
    //   <h2 style="color: purple>Здравствуйте, ${username}!</h2>
    //   <p>Добро пожаловать на сайт АкваДизайн!</p>
    //   <p>Определившись с внешним видом фонтана - отправьте заявку и наш менеджер свяжется с Вами!</p>
    //   <p>Благодарим за регистрацию!</p>
    //   <p>С уважением,<br>Команда АкваДизайн</p>
    // `, // plain text body
      html: `
      <h2>Здравствуйте, ${username}!</h2>
      <p>Добро пожаловать на сайт АкваДизайн!</p>
      <p>Определившись с внешним видом фонтана - отправьте заявку и наш менеджер свяжется с Вами!</p>
      <p>Благодарим за регистрацию!</p>
      <p>С уважением,<br>Команда АкваДизайн ⛲</p>
    `,  
    headers: {
        'Content-Type': 'text/html; charset=UTF-8'
      }// html body
    });
  
    // console.log('Message sent: %s', info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }
  
  // main().catch(console.error);
  
  module.exports = main;