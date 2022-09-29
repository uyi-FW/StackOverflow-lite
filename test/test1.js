const User = require("../controllers/userController")
let expect = require('chai').expect;
const bcrypt = require("bcrypt");


it('Can instantiate user', function () {
  let user = new User
})

it("Can hash password", function () {
  let user = new User();
  bcrypt.hash('ABcd1234!', 12)
});

// error is thrown if validation error
// can instantiate User ------- 
// can hash password
// save to db
// get token
