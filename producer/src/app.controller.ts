import { NatsJetStreamContext } from "@nestjs-plugins/nestjs-nats-jetstream-transport";
import { Controller, Get } from "@nestjs/common";
import { Ctx, EventPattern, Payload } from "@nestjs/microservices";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/create")
  create() {
    return this.appService.create();
  }

  @EventPattern("order.create")
  public async orderCreateHandler(
    @Payload() data: any,
    @Ctx() context: NatsJetStreamContext
  ) {
    console.log("subject", context.message.subject, context.message.seq, data);
    context.message.ack();
  }
}
