import { batch } from "..";
import { formatePrice } from "./pricePrecise";

export const filterRawData = (rawData: any) => {
  if (rawData.s == "SOL_USDC_PERP") {
    batch.push({ asset: "SOL", price: formatePrice(rawData.p), decimal: 4 });
  } else if (rawData.s == "ETH_USDC_PERP") {
    batch.push({ asset: "ETH", price: formatePrice(rawData.p), decimal: 4 });
  } else if (rawData.s == "BTC_USDC_PERP") {
    batch.push({ asset: "BTC", price: formatePrice(rawData.p), decimal: 4 });
  } else {
    console.warn("Unknown symbol:", rawData.s);
  }
};
