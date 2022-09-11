import { NatsJetStreamClient } from "@nestjs-plugins/nestjs-nats-jetstream-transport";
import { Injectable } from "@nestjs/common";

const CREATE = "order.create";
let id = 0;

@Injectable()
export class AppService {
  constructor(private client: NatsJetStreamClient) {}
  getHello(): string {
    return "Hello World!";
  }

  create() {
    id += 1;
    this.client
      .emit(CREATE, {
        id: id,
        product: "test",
      })
      .subscribe((pubAck) => {
        console.log("pubAck", pubAck);
      });

    return "order created";
  }
}
