.PHONY: help install start dev test lint build clean docker-build docker-up docker-down

help:
	@echo "Site de Exemplo CI/CD - Comandos disponíveis:"
	@echo ""
	@echo "  install       - Instala dependências"
	@echo "  start         - Inicia o servidor"
	@echo "  dev           - Inicia em modo desenvolvimento"
	@echo "  test          - Executa testes"
	@echo "  lint          - Verifica estilo de código"
	@echo "  build         - Build da aplicação"
	@echo "  clean         - Limpa node_modules e cache"
	@echo "  docker-build  - Constrói imagem Docker"
	@echo "  docker-up     - Inicia containers com Docker Compose"
	@echo "  docker-down   - Para containers Docker Compose"
	@echo "  docker-logs   - Mostra logs dos containers"

install:
	npm install

start:
	npm start

dev:
	npm run dev

test:
	npm test

lint:
	npm run lint

build:
	npm run build

clean:
	rm -rf node_modules
	rm -rf coverage
	npm cache clean --force

docker-build:
	docker build -t site-exemplo-cicd:latest .

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

docker-logs:
	docker-compose logs -f

docker-clean:
	docker-compose down -v
	docker rmi site-exemplo-cicd:latest
