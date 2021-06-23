
/* GET home page. */
const Joi = require('Joi');
module.exports.index = (req, res) => {
  run().catch(error => console.log(error.stack));
  async function run() {

    let inputName = req.body.name;
    let inputEmail = req.body.email;
    let inputPhone = req.body.phone;
    let inputSkype = req.body.skype;
    let inputTitle = req.body.title;

    // lets validate inputs first
    const schema = Joi.object({
      name: Joi.string().min(3).max(50).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().min(8).max(20).required(),
      title: Joi.string().min(4).max(25).required(),
      skype: Joi.string().min(4).max(20).required()});

    let payload = schema.validate({ name: inputName, email: inputEmail, phone: inputPhone, skype: inputSkype, title: inputTitle});
    if(payload.error  !== undefined) {
      // res.send(tmp1);
      res.status(400).send({'error' : payload.error});
    }

    var fs = require('fs');


    const tag = fs.readFileSync('public/images/sg-namecard.svg','utf8');

    const cheerio = require('cheerio');
    const $ = cheerio.load(tag);
    const email = $('text.user-email');
    const address1 = $('text.address-1');
    const address2 = $('text.address-2');
    const skype = $('text.user-skype');
    const name = $('text.user-name');
    const title = $('text.user-title');
    const phone = $('text.user-phone');
    email.text(inputEmail);
    skype.text(inputSkype);
    name.text(inputName);
    title.text(inputTitle);
    console.log(inputPhone);
    phone.text(inputPhone);

    res.header("Content-Type","image/svg+xml");
    res.status(200);
    res.send($.html());
  }

}
