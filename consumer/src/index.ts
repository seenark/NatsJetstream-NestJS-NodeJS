import { connect, NatsConnection } from "nats";
import { subscribeOrderCreate } from "./subscribe";

const server = "nats://host.docker.internal:4222";

async function main() {
  console.log("starting...");
  const natsConnection = await connect({
    servers: [server],
    name: "nats-test",
  });

  await jetstreamConfig(natsConnection);

  const js = natsConnection.jetstream();

  await subscribeOrderCreate(js);
  //   await natsConnection.drain();
  natsConnection.close();
}

async function jetstreamConfig(nc: NatsConnection) {
  const streams = "mystream";
  const subjects = "order.*";
  const jsm = await nc.jetstreamManager();
  //   await jsm.consumers.delete("mystream", "my-producer-order_to")
  // await jsm.streams.delete(steams)
  await jsm.streams.add({
    name: streams,
    subjects: [subjects],
  });
}

main();
