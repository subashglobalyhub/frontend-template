import { configureStore } from "@reduxjs/toolkit"
import { crmReducer } from "@/app/crm/store/crm-slice"
import { hrmsReducer } from "@/app/hrms/store/hrms-slice"

export const makeStore = () => {
    return configureStore({
        reducer: {
            crm: crmReducer,
            hrms: hrmsReducer,
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
