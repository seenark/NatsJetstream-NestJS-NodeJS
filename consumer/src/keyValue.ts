import { NatsConnection, nanos, StringCodec } from "nats";

export async function keyValue(nc: NatsConnection) {
    const js = nc.jetstream();
    const kv = await js.views.kv("test", {ttl: nanos(50000) })
    const sc = StringCodec()
    const n = await kv.create("hello.world", sc.encode("Hello world") )
    console.log("n", n)
  
    const data = await kv.get("hello.world")
    console.log("data", data && sc.decode(data.value))
  }