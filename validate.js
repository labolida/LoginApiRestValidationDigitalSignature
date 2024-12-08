
const express = require('express');
const crypto = require('crypto');
const fs = require('fs');

const app = express();
app.use(express.json());

// Load public key
const publicKey = fs.readFileSync('./publicKey.pem', 'utf-8');

app.post('/validate-hash', (req, res) => {
	const { hashToken, signature } = req.body;

	if ( !hashToken || !signature) {
		return res.status(400).json({ error: 'hashToken and signature are required.' });
	}

	
	const verify = crypto.createVerify('SHA256');
	verify.update(hashToken);
	verify.end();

	const isValid = verify.verify(publicKey, signature, 'hex');

	res.json({ valid: isValid });
});

const PORT = 1029;
app.listen(PORT, () => {
	console.log(`Hash Validator running on http://localhost:${PORT}`);
});