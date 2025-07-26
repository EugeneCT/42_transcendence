SERVER_LOG = server.log
PORT = 8000
DIST = dist

help:
	@echo "\033[1;31mmake rebuild-restart		- Use this!\033[0m"
	@echo "make start-server		- Starts server in background"
	@echo "make start-server-verbose	- Starts server in verbose mode"
	@echo "make stop-server		- Stops server"
	@echo "make build			- Compile the Typescript files"
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
	@npx tsc


clean-js:
	@find $(DIST) -type f -name "*.js" -delete

clean-logs:
	@rm -f $(SERVER_LOG)

clean: clean-js clean-logs


re: clean build

rebuild-restart: stop-server re start-server
