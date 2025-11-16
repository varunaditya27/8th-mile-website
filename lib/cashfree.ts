import { CFPaymentGateway, CFConfig, CFEnvironment } from "cashfree-pg-sdk-nodejs";

// Initialize Cashfree SDK with credentials and environment
const cashfreeEnv = process.env.NEXT_PUBLIC_CASHFREE_MODE === "production" 
  ? CFEnvironment.PRODUCTION 
  : CFEnvironment.SANDBOX;

export const cfConfig = new CFConfig(
  cashfreeEnv,
  "2023-08-01", // API version
  process.env.NEXT_PUBLIC_CASHFREE_CLIENT_ID as string,
  process.env.CASHFREE_CLIENT_SECRET as string
);

export const cashfree = new CFPaymentGateway();
