import { createApi } from "@/lib/api/create-api";
import { crmMockApi } from "./mock-data";
import { crmRealApi } from "./real-api";

export const crmApi = createApi({ mock: crmMockApi, real: crmRealApi });
export type { Lead } from "./types";
