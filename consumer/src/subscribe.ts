import { JetStreamClient, JSONCodec, consumerOpts } from "nats";

export async function subscribeOrderCreate(js: JetStreamClient) {
  const jsonDecode = JSONCodec();
  const option = consumerOpts();
  option.durable("my-consumer");
  option.queue(queueGroupName); // use queue along with durable to be allow scale subscription
  option.deliverTo("here");
  option.manualAck();
  option.ackWait(1000);
  option.ackExplicit();
  option.replayInstantly();
  //   option.deliverGroup("test-group");
  //   option.queue("q");
  //   option.deliverNew()
  //   option.callback(async(err, msg) => {
  //     if (msg) {
  //         msg.ack();
  //         const ack = await msg.ackAck();
  //         console.log("1 m", msg.subject, msg.seq, jsonDecode.decode(msg.data));
  //         console.log("ack", ack);
  //     }
  //   });
  const sub = await js.subscribe("order.create", option);

  for await (const msg of sub) {
    msg.ack();
    console.log("1 m", msg.subject, msg.seq, jsonDecode.decode(msg.data));
  }

  sub.destroy();
  console.log("destroyed");
}
