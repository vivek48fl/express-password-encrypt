const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(3000, () => {
  console.log("listening on port 3000");
});
app.post("/password-encode", async (request, response) => {
  console.log("POST request received");
  console.log(request.body);
  if (request.body.password != undefined) {
    const hashed = await bcrypt.hash(request.body.password, 12);
    response.status(200).json({ hashed });
  }
});
app.post("/verify-password", async (req, res) => {
  const { password, hashed } = req.body;
  if (password != undefined && hashed != undefined) {
    const isVaild = await bcrypt.compare(password, hashed);
    res.status(200).json({ isVaild });
  }
});
app.post("/getpasswords", async (req, res) => {
  let data2 = [];
  const passwords = req.body.passwords;
  let i;
  for(i=0;i<=passwords.length-1;i++) {
    const hash = await bcrypt.hash(passwords[i], 12);
    const data = { hash: hash, password: passwords[i] };
    data2.push(data);
    console.log(data2);

  }

 /* passwords.forEach(async (item) => {
    const hash = await bcrypt.hash(item, 12);
    const data = { hash: hash, password: item };
    data2.push(data);
    console.log(data2);
    
  });*/
  res.json({ hashedPassword: data2 });
});
