SERVER_LOG = server.log
PORT = 8000
DIST = dist
SRC = src

help:
	@echo "\033[1;31mmake rebuild-restart		- Use this!\033[0m"
	@echo "make start-server		- Starts server in background"
	@echo "make start-server-verbose	- Starts server in verbose mode"
	@echo "make stop-server		- Stops server"
	@echo "make build			- Compile files"
	@echo "make clean			- Remove generated files"
	@echo "make help			- Show this help message"


start-server:
	@npx http-server . -p $(PORT) -c-1 > $(SERVER_LOG) 2>&1 &
	@echo "Server started on http://localhost:$(PORT)"
	@echo "Logs: $(SERVER_LOG)"

start-server-verbose:
	@python3 -m http.server $(PORT)

stop-server:
	-@pkill -f "http.server" 2>/dev/null
	@echo "server stopped"

build:
	@npm install
	-@mkdir -p ./$(DIST)
	@npx tsc
	@npx tailwindcss -i ./$(SRC)/input.css -o ./$(DIST)/output.css


clean: 
	@rm -rf $(DIST)
	@rm -f $(SERVER_LOG)


re: clean build

rebuild-restart: stop-server re start-server
