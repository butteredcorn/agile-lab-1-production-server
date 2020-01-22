const express = require("express"),
	router = express.Router(),
	path = require("path"),
	readline = require("../src/readline_stream"),
	convert = require("../src/convert");
(UserDB = require("../src/data/UserDB")), (User = new UserDB());
fs = require("fs");

//render to user homepage
router
	.route("/protected")
	.get((req, res, next) => {
		console.log("in protected");
		if (req.user) {
			console.log("success");
			console.log(path.resolve(path.join(__dirname, "../protected.html")));
			res.writeHead(200, { "Content-Type": "text/html" });
			res.end(fs.readFileSync(path.join(__dirname, "../protected.html")));
			// res.sendFile(path.join(__dirname, '../login.html'));
		} else {
			console.log("redirect login");
			res.sendFile(path.join(__dirname, "../login.html"));
		}
	})
	.post((req, res) => {
		const body = req.body;
		if (req.user) {
			if (
				body.hasOwnProperty("temp") &&
				body.hasOwnProperty("isCToF") &&
				typeof body["isCToF"] === "boolean" &&
				Number(body["temp"]) !== NaN
			) {
				let convertedValue = 0,
					inputTemp = 0,
					outputTemp = 0;

				if (body["isCToF"]) {
					convertedValue = convert(body["temp"] + "c");
					inputTemp = body["temp"] + "c";
					outputTemp = convertedValue + "f";
				} else {
					convertedValue = convert(body["temp"] + "f");
					inputTemp = body["temp"] + "f";
					outputTemp = convertedValue + "c";
				}
				User.insertIntoHistory(req.user.id, inputTemp, outputTemp);
				res.send({ temp: convertedValue });
			} else {
				res.status(400).send("Sorry, invalid data type");
			}
		}
	});

//User logout request
router.get("/logout", function(req, res) {
	req.logout();
	res.redirect("/");
});

// GET users conversion history.
router.get("/download/history", function(req, res, next) {
	if (req.user) {
		console.log("downloading");
		const fileData = User.getUserHistory(req.user.id);
		//create a buffer from user history
		const fileContents = Buffer.from(JSON.stringify(fileData), "utf-8");
		res.writeHead(200, {
			"Content-disposition": 'attachment; filename="history.txt"',
			"Content-Type": "text/plain"
		});
		res.end(fileContents);
	} else {
		res.sendFile(path.join(__dirname, "../login.html"));
	}
});

module.exports = router;
