# NatsJetstream-NestJS-NodeJS

run NATS server using docker
```
docker run -p 4222:4222 -p 8222:8222 -p 6222:6222 -v /Volumes/HadesGodBlue/docker-shared-volumes/nats:/tmp/nats/jetstream --name nats-server -ti nats:latest -js -m 8222
```
