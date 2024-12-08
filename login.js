const express = require('express');
const crypto = require('crypto');
const fs = require('fs');

const app = express();
app.use(express.json());

// Generate or load private key (save this securely in production)
const privateKey = fs.readFileSync('./privateKey.pem', 'utf-8');

app.post('/generate-hash', (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(400).json({ error: 'Username and password are required.' });
	}

	const data = `${username}:${password}`;
	const sign = crypto.createSign('SHA256');
	sign.update(data);
	sign.end();

	const signature = sign.sign(privateKey, 'hex');

	res.json({ signature });
});

const PORT = 1025;
app.listen(PORT, () => {
	console.log(`Hash Generator running on http://localhost:${PORT}`);
});