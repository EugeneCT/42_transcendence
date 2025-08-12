To run everything and ignore the notes below:
1. chmod +x start_backend_api.sh
2. bash start_backend_api.sh

To increase score - 
curl -X POST http://localhost:PORT/win \
  -H "Content-Type: application/json" \
  -d '{"username": "Alice"}'

To retrieve score -
curl http://localhost:7779/wins/Alice



To start a local eth chain
To start the local chain chain:
1. cd solidity
2. npx ganache --db ./ganache-data --mnemonic "run brown pause spatial balcony caught devote kite bread snow magnet notice

To start the api to save to the local eth chain:
3. cd ../userwins_api
4. npm start dev - check the port hosted


To setup for the first time (Just for notes, done already):
1. npx ganache --db ./ganache-data --mnemonic "run brown pause spatial balcony caught devote kite bread snow magnet notice”
2. npx hardhat run scripts/deploy.ts --network ganache_cli
3. Copy the contract address to userwins_api/.env
4. Copy the first private key to userwins_api/.env