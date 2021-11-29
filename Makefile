run:
	docker-compose up --build

clean_docker:
	docker-compose rm -f

start:
	docker-compose up

stop:
	docker-compose down

.PHONY run clean_docker start stop