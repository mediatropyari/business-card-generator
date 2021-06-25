
/* GET home page. */
const Joi = require('joi');
module.exports.index = (req, res) => {
  run().catch(error => console.log(error.stack));
  async function run() {

    let inputName = req.body.name;
    let inputNameLine2 = req.body.name2;
    let inputEmail = req.body.email;
    let inputPhone = req.body.phone;
    let inputSkype = req.body.skype;
    let inputTitle = req.body.title;
    let inputTitleLine2 = req.body.title2;
    let inputAddress = req.body.address;
    let inputAddressLine2 = req.body.address2;
    let inputAddressLine3 = req.body.address3;
    let inputAddressLine4 = req.body.address4;
    let inputAddressLine5 = req.body.address5;
    let country = req.body.country;
    let inputWechat = req.body.wechat;
    // lets validate inputs first
    const schema = Joi.object({
      name: Joi.string().min(3).max(35).required(),
      name2: Joi.string().min(3).max(35),
      email: Joi.string().email().required(),
      phone: Joi.string().min(8).max(20).required(),
      title: Joi.string().min(4).max(25).required(),
      title2: Joi.string().min(4).max(25),
      skype: Joi.string().min(4).max(30).required(),
      address: Joi.string().min(4).max(45).required(),
      address2: Joi.string().min(4).max(45).required(),
      address3: Joi.string().min(4).max(45).when("country", {
        is: "China",
        then: Joi.required()
      }),
      address4: Joi.string().min(4).max(45).when("country", {
        is: "China",
        then: Joi.required()
      }),
      address5: Joi.string().min(4).max(45).when("country", {
        is: "China",
        then: Joi.required()
      }),
      country: Joi.string(),
      wechat: Joi.string().min(4).max(45).when("country", {
        is: "China",
        then: Joi.required()
      })


    });

    let payload = schema.validate({ name: inputName, email: inputEmail, phone: inputPhone, skype: inputSkype, title: inputTitle, name2: inputNameLine2, title2: inputTitleLine2, address: inputAddress, address2: inputAddressLine2, address3: inputAddressLine3, address4: inputAddressLine4, address5: inputAddressLine5, wechat: inputWechat, country:country});
    if(payload.error  !== undefined) {
      // res.send(tmp1);
      res.status(400).send({'error' : payload.error});
    }

    var fs = require('fs');


    if(country === "China"){
       var  nameCard = fs.readFileSync('public/images/china-namecard.svg','utf8');
    }else{
       var  nameCard = fs.readFileSync('public/images/sg-namecard.svg','utf8');
    }
    const cheerio = require('cheerio');
    const $ = cheerio.load(nameCard);
    const email = $('.user-email');
    const address1 = $('.address-1');
    const address2 = $('.address-2');
    const address3 = $('.address-3');
    const address4 = $('.address-4');
    const address5 = $('.address-5');
    const skype = $('.user-skype');
    const name = $('.user-name1');
    const name2 = $('.user-name2');
    const title = $('.user-title1');
    const title2 = $('.user-title2');
    const phone = $('.user-phone');
    const wechat = $('.user-wechat');
    email.text(inputEmail);
    skype.text(inputSkype);
    name.text(inputName);
    name2.text(inputNameLine2);
    title.text(inputTitle);
    title2.text(inputTitleLine2);
    phone.text(inputPhone);
    address1.text(inputAddress);
    address2.text(inputAddressLine2);
    if(country === "China"){
      console.log(inputAddressLine3);

      address4.text(inputAddressLine4);
      address5.text(inputAddressLine5);
      wechat.text(inputWechat);
      address3.text(inputAddressLine3);
    }
    res.header("Content-Type","image/svg+xml");
    res.status(200);
    res.send($.html());
  }

}
