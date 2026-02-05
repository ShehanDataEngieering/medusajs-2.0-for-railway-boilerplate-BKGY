import { MedusaRequest, MedusaResponse } from "@medusajs/framework";

export const GET = async (_req: MedusaRequest, res: MedusaResponse) => {
  // Simple readiness probe for Railway health checks
  res.status(200).json({ status: "ok" });
};
