
const express = require('express');
const crypto = require('crypto');
const fs = require('fs');

const app = express();
app.use(express.json());

// Load public key
const publicKey = fs.readFileSync('./publicKey.pem', 'utf-8');

app.post('/validate-hash', (req, res) => {
	const { username, password, signature } = req.body;

	if (!username || !password || !signature) {
		return res.status(400).json({ error: 'Username, password, and signature are required.' });
	}

	const data = `${username}:${password}`;
	const verify = crypto.createVerify('SHA256');
	verify.update(data);
	verify.end();

	const isValid = verify.verify(publicKey, signature, 'hex');

	res.json({ valid: isValid });
});

const PORT = 1029;
app.listen(PORT, () => {
	console.log(`Hash Validator running on http://localhost:${PORT}`);
});