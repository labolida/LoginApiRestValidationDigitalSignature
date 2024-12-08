# Digital Signature Logon and Validation in NODE JS

# setup

npm init

npm install express

npm install crypto

npm run login

npm run validate



# Project

1. Server 1: Hash Generator
This program accepts a username and password, signs them using a private key, and returns the signed hash.

2. Server 2: Hash Validator
This program accepts the hash, username, and password, then validates it using the corresponding public key.



## SOURCE-CODE - login Hash Generator

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

	const PORT = 3000;
	app.listen(PORT, () => {
		console.log(`Hash Generator running on http://localhost:${PORT}`);
	});


## SOURCE-CODE  logon Hash Validator

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

	const PORT = 3001;
	app.listen(PORT, () => {
		console.log(`Hash Validator running on http://localhost:${PORT}`);
	});


# Steps to Generate Keys

Create the private and public keys using OpenSSL or Node.js.

    openssl genpkey -algorithm RSA -out privateKey.pem -pkeyopt rsa_keygen_bits:2048

    openssl rsa -pubout -in privateKey.pem -out publicKey.pem

Save these files (privateKey.pem and publicKey.pem) in the same directory as the server code.



# Starting services

	npm run login

	npm run validate



# Testing the APIs


### Testinh with cURL

**attention** I had to change certain ports that I was using with another programs.

Login

	curl -X POST http://localhost:1025/generate-hash \
	-H "Content-Type: application/json" \
	-d '{"username": "testUser", "password": "testPassword"}'

output

	{"signature":"54e33a1d3a2e524a0bbc79f654967983b7cd143bfb61b1930f66ada60a5526f6d98a709bf8066897cc50c0fca20a561118266b8c7f4ddf722b462dc822a8828d0ace0ec17eb5d8e5e97a494aeb1b0e766d3fe7b958df0b5393c3b42ce3fd08deb9aa02b670663bf553ccf7e8de20a0a9e06bc4b7968260e23affadc539d8bcd3f6fc5391f06881456e72a1dc982a17720daf14ff2e2c3b432c2ddf6f8b7489549b2722f4cbc3d10572f3e22511c4bcbae47306e443513f54f77611552c458d4ef9ffd395147a852b89cae0fe3d445341577dafc6478567630b64f124570c0a60319f83f1b4a02b36305d0be0307327fd7cde7d9076a66532c14a2ddca6ad5328"}

login-validation

	curl -X POST http://localhost:1029/validate-hash \
	-H "Content-Type: application/json" \
	-d '{"username": "testUser", "password": "testPassword", "signature": "54e33a1d3a2e524a0bbc79f654967983b7cd143bfb61b1930f66ada60a5526f6d98a709bf8066897cc50c0fca20a561118266b8c7f4ddf722b462dc822a8828d0ace0ec17eb5d8e5e97a494aeb1b0e766d3fe7b958df0b5393c3b42ce3fd08deb9aa02b670663bf553ccf7e8de20a0a9e06bc4b7968260e23affadc539d8bcd3f6fc5391f06881456e72a1dc982a17720daf14ff2e2c3b432c2ddf6f8b7489549b2722f4cbc3d10572f3e22511c4bcbae47306e443513f54f77611552c458d4ef9ffd395147a852b89cae0fe3d445341577dafc6478567630b64f124570c0a60319f83f1b4a02b36305d0be0307327fd7cde7d9076a66532c14a2ddca6ad5328"}'

output

	{
	"valid": true
	}





### Testinh with Postman
    
Hash Generator:
	
POST http://localhost:3000/generate-hash

	{
	"username": "testUser",
	"password": "testPassword"
	}

Hash Validator:

POST http://localhost:3001/validate-hash

	{
	"username": "testUser",
	"password": "testPassword",
	"signature": "<response_signature>"
	}


If the data and signature match, the validator API will return { "valid": true }.

labolida.com