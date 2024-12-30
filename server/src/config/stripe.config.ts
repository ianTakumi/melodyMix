// stripeConfig.js
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51QYN5lP8nFRpndFgHM7XBKtWLaJVZw0cIMqdU1iNLhhf15FLePBxh5zJU7qtCBB4mlnwaEfyELIgVU3mSSvf44dC00b6KyBUUY",
  {
    apiVersion: "2024-12-18.acacia",
  }
);

export default stripe;
