Bundler-Vite

transcendence/
├── frontend/                             # Vite-based SPA
│   ├── src/
|   |   |── index.html                      # App entry
│   │   ├── main.ts                       # App entry
│   │   ├── pong/
│   │   │   ├── PongGame.ts              # Game logic (canvas, loop)
│   │   │   ├── Ball.ts
│   │   │   ├── Paddle.ts
│   │   │   └── utils.ts
│   │   ├── ui/
│   │   │   ├── router.ts                # SPA routing
│   │   │   ├── menu.ts                  # UI screens
│   │   │   ├── scoreboard.ts
│   │   │   └── style.css                # Tailwind entry
│   │   ├── net/
│   │   │   ├── socket.ts                # WebSocket client
│   │   │   └── api.ts                   # REST API calls
│   │   ├── auth/
│   │   │   └── google.ts                # Google login logic
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── package.json
│
├── backend/                              # Node.js backend (microservices)
│   ├── shared/                           # Shared utils/middleware
│   │   ├── middlewares/
│   │   └── jwt.ts                        # Token verification logic
│
│   ├── auth-service/
│   │   ├── src/
│   │   │   ├── routes/
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   └── main.ts
│   │   └── package.json
│
│   ├── game-service/
│   │   ├── src/
│   │   │   ├── ws/                       # WebSocket logic (game loop, sync)
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   └── main.ts                   # WebSocket server entry
│   │   └── package.json
│
│   ├── user-service/
│   │   ├── src/
│   │   │   ├── routes/
│   │   │   ├── controllers/
│   │   │   ├── db/
│   │   │   └── main.ts
│   │   └── package.json
│
│   └── gateway/                          # Optional API Gateway
│       ├── src/
│       │   ├── proxy.ts
│       │   ├── auth.ts
│       │   └── main.ts
│       └── package.json
│
├── docker-compose.yml                    # Optional: Run everything together
└── README.md
