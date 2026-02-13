import { useEffect, useState } from "react";

export const useBtcPrice = () => {
  const [price, setPrice] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT");
        const btcData  = await response.json();

        const latestPrice = parseFloat(btcData.price);
        setPrice(latestPrice);
        setError(null);
      } catch (error) {
        setError("Failed to fetch BTC price");
        console.error("Error fetching BTC price:", error);
      }
    }

    // initial fetch
    fetchPrice();

    // poll btc price data in every 5 seconds
    const interval = setInterval(fetchPrice, 5000);

    return () => clearInterval(interval);
  }, []);

  return { price, error };
}