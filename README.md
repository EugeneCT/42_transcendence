# VERSION V2.0

# 🕹️ ft_transcendence

# 

# Frontend Setup

- To compile the .ts files, run `npx tsc`

- then run python3 -m localhost/8080

- Run `make stop-rebuild-start` to recompile .ts files and restart the server

---

## 🚀 How to Run the Frontend

### ✅ Prerequisites

### Issues and bugs

- General:
  
  - 'X' only hides the modal, game is still running in the background. need to delete the game instance
  - Add snake tournament mode to stepper.
  - show player colours and keys on menu?

- Pong:
  
  - game speed seems quite slow, not sure if its cos in VM -- Yes it works better outside VM

- Snake issues:
  
  - [idea]: score points based on number of fruits eaten



# Backend Setup

Backend setup adopts microservices architecture, each services will be an individual fastify app.

- Install the npm in prerquisites
  
  - For blockchain module:
    
    - chmod +x start_backend_api.sh
    
    - bash ./start_backend_api.sh in a new terminal

## 🚀 How to Run the Backend

### ✅ Prerequisites

```bash
// Blockchain module
cd backend/solidity
npm install

cd backend/userwins_api
npm install

```

### API Endpoints

### <u>Blockchain module:</u>

##### To increase score of Alice by 1:

```bash
curl -X POST http://localhost:7774/win \

-H "Content-Type: application/json" \

-d '{"username": "Alice"}'
```

or in TS:

```javascript
let name="Alice"
await fetch(`http://localhost:7774/win`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ username: name }),
	});
```

##### To retrieve score of Alice -

```bash
curl http://localhost:7774/wins/Alice
```

or in TS:

```typescript
const res = await fetch(`http://localhost:7774/wins/${encodeURIComponent(name)}`);
```

##### To get top x user with highest win counts

```bash
curl http://localhost:7774/topWinners/10
```

or in TS:

```typescript
const res = await fetch(`http://localhost:7774/topWinners/10`);
```
