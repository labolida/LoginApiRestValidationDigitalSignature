const express = require('express');
const crypto = require('crypto');
const fs = require('fs');

const app = express();
app.use(express.json());

const privateKey = fs.readFileSync('./privateKey.pem', 'utf-8');

app.post('/generate-hash', (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(400).json({ error: 'Username and password are required.' });
	}

	/*
	 Call a service that selects the user and the hashed-password from a database blablabla...
	*/
	
	const input = `${username}:${password}`;

	const hashToken = crypto.createHash('sha256').update(input).digest('hex');

	const sign = crypto.createSign('SHA256');
	sign.update(hashToken);
	sign.end();
	const signature = sign.sign(privateKey, 'hex');
	//console.log("signature="+signature);
	
	res.json(
		{ 
			"hashToken" : hashToken ,
			"signature" : signature ,
		}
	);

});

const PORT = 1025;
app.listen(PORT, () => {
	console.log(`Hash Generator running on http://localhost:${PORT}`);
});