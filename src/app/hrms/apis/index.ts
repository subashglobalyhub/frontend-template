import { createApi } from "@/lib/api/create-api";
import { hrmsMockApi } from "./mock-data";
import { hrmsRealApi } from "./real-api";

export const hrmsApi = createApi({ mock: hrmsMockApi, real: hrmsRealApi });
export type { Employee } from "./types";
