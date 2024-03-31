const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
// const DtUser = require("../models/post");
const { default: mongoose } = require('mongoose');

const User = mongoose.model("user",{
	name:String,
	email:String,
	password:String
})

router.post('/login', async (req, res) => {
	const {name,  password} = req.body
	const user = {name: name, password:password}
	const findUser = await User.findOne({name:name, password:password})
	if (!findUser) return res.send("username/password wrong")
	const token = jwt.sign(user, "my_scrt") 
	// const token = jwt.sign({user}, "my_scrt") //req.user = { user: { name: 'mohammed', password: '456' }, iat: 1711204366 }
	// res.json({TOKEN:token})
	res.json({token})
});

router.post('/register', async (req, res) => {
	const {name, email, password} = req.body
	const data = {name: name, email: email, password:password}
    const prd = await User.create(data)
    await prd.save()
    res.send("created")
})

// router.post('/login', (req, res) => {
// 	const {username,  password} = req.body
// 	const user = {name: username, password:password}
// 	const findUser = dataUser.filter(x => x.name == username && x.password == password)
// 	if (!findUser[0]) return res.send("username/password wrong")
// 	const token = jwt.sign(user, "my_scrt")
// 	res.json({TOKEN:token})
// });
module.exports = router;