import { Redis } from "ioredis";
import WebSocket from "ws";
import { filterRawData } from "./utils/datafilter";

const endpoint = "wss://ws.backpack.exchange";

const socket = new WebSocket(endpoint);

const redis = new Redis("redis://localhost:6379");

type AssetPrice = {
  asset: string;
  price: number;
  decimal: number;
};

export let batch: AssetPrice[] = [];

const dataToSend = {
  method: "SUBSCRIBE",
  params: ["trade.SOL_USDC_PERP", "trade.ETH_USDC_PERP", "trade.BTC_USDC_PERP"],
};

socket.onopen = () => {
  socket.send(JSON.stringify(dataToSend));
};

socket.onmessage = (event) => {
  const data = event.data.toString();
  const parsed = JSON.parse(data);
  const datatofilter = parsed.data;
  filterRawData(datatofilter);
};

setInterval(() => {
  if (batch.length === 0) return;
  const toPublish = batch;
  batch = [];
  const dataToPublish = {
    price_updates: toPublish,
  };
  console.log("Publishing batch:", toPublish);
  redis.publish("marketdata", JSON.stringify(dataToPublish));
}, 100);
