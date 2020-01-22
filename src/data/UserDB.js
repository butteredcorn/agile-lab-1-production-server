//fake database for users
const crypto = require("crypto"); //node cryptographic module
// const fs        = require('fs');

function User() {
	//fake users list database =>
	//for testing purpose: user1pw: test, user2pw: password
	this.users = [
		{
			id: 1,
			firstname: "john",
			lastname: "joe",
			password: "n4bQgYhMfWWaL+qgxVrQFaO/TxsrC4Is0V1sFbDwCgg=",
			email: "jim@example.com"
		},
		{
			id: 2,
			firstname: "ruihao",
			lastname: "li",
			password: "XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=",
			email: "Homer.lee.0508@gmail.com"
		}
	];

	//fake user's history database
	this.historyRecords = {
		1: [
			{ date: "1/21/2020, 8:10:20 AM", inputTemp: "40c", outputTemp: "104f" },
			{ date: "1/21/2020, 8:11:20 AM", inputTemp: "122f", outputTemp: "50c" }
		],
		2: [
			{ date: "1/21/2020, 8:12:20 AM", inputTemp: "35c", outputTemp: "95f" },
			{ date: "1/21/2020, 9:10:20 AM", inputTemp: "100f", outputTemp: "38c" }
		]
	};

	//encrypt password
	this.passwordEncrypt = (password) => {
		const hash = crypto.createHash("sha256");
		return (encryptedPW = hash.update(password).digest("base64"));
	};

	// search user list database to match the user by given email and password
	this.findUserByEmail = (email, password, fn) => {
		console.log(email, password);
		this.users.forEach((user) => {
			// console.log(email, password);
			if (
				user.email === email &&
				user.password === this.passwordEncrypt(password)
			)
				return fn(null, user);
		});
		return fn(null, null);
	};

	//search users list database to match user by given user.id
	this.findUserById = (id, fn) => {
		this.users.forEach((user) => {
			if (user.id === id) return fn(null, user);
		});
		return fn(null, null);
	};

	//insert a new user into user list database
	this.createUser = (firstname, lastname, password, email) => {
		user = {
			id: this.users.length + 1,
			firstname: firstname,
			lastname: lastname,
			password: this.passwordEncrypt(password),
			email: email
		};
		this.users.push(user);
		return user;
	};

	//insert a history into user history database
	this.insertIntoHistory = (user_id, inputTemp, outputTemp) => {
		console.log(user_id);
		let history = {};
		history["date"] = new Date().toLocaleString("en-US");
		history["inputTemp"] = inputTemp;
		history["outputTemp"] = outputTemp;
		this.historyRecords[user_id.toString()].push(history);
		console.log(this.historyRecords);
	};

	//get user's history records by given user_id
	this.getUserHistory = (user_id) => {
		console.log(user_id);
		return this.historyRecords[user_id.toString()];
	};
}

module.exports = User;
