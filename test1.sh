#/bin/bash

curl -X POST http://localhost:1025/generate-hash \
	-H "Content-Type: application/json" \
	-d '{"username": "leonardo", "password": "abc123"}'

