#/bin/bash

curl -X POST http://localhost:1029/validate-hash \
	-H "Content-Type: application/json" \
	-d '{"hashToken": "a23221e6e4d50b0da72660ac7e9e6c9602bd2d377d9043b3f5ad9458493ad044", "signature": "47374cb5a7c68f9021a1f7301e9ac697c882bdacc5ca8184c45631d060c3345880707586a0905a755156c013edbde5db3cd78d968752544a547f6d1d2ded034575083855362425610d3cea8cd3ac0f2956d08c64ff1ab840459c1c2f4f1359320b73a354971d4a2f1bff2c585dd10b7cb1bb689efac0932685615b6a04e01548a05e1df79e96a82cb982432cf26abd4af6879ff953a15bdf1b4e136619f0fc4825d7fdc74ad5a5c775261297ce8d9c725404d052b0fc4b5dbeaf0c2af95d358e18aafcdbc92c65c70e6ee49f532a286b0f74f9a1251ec4e28c1e096bc87ebb087c63bf8f3be294a0b86e058823803a8d83e113ca13b8116df248c7a699ea9572"}'


