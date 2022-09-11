import { NatsJetStreamServer } from "@nestjs-plugins/nestjs-nats-jetstream-transport";
import { NestFactory } from "@nestjs/core";
import {
  CustomStrategy,
  MicroserviceOptions,
  Transport,
} from "@nestjs/microservices";
import { StorageType } from "nats";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const option: CustomStrategy = {
    strategy: new NatsJetStreamServer({
      connectionOptions: {
        servers: "host.docker.internal:4222",
        name: "nats-test",
      },
      consumerOptions: {
        deliverGroup: "test-group",
        durable: "my-producer",
        deliverTo: "order.to",
        manualAck: true,
        ackWait: 5000,
        replayPolicy: "Instant",
      },
      // streamConfig: {
      //   name: "mystream",
      //   subjects: ["order.*"],
      //   storage: StorageType.File,
      // },
    }),
  };
  const microservice = app.connectMicroservice(option);
  await microservice.listen();
  await app.listen(3000);
}
bootstrap();
