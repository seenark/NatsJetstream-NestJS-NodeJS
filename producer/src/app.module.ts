import {
  NatsJetStreamClient,
  NatsJetStreamTransport,
} from "@nestjs-plugins/nestjs-nats-jetstream-transport";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    NatsJetStreamTransport.register({
      connectionOptions: {
        servers: "host.docker.internal:4222",
        name: "nats-publisher",
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, NatsJetStreamClient],
})
export class AppModule {}
