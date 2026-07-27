import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { crmApi } from "../apis";
import type { Lead } from "../apis/types";

export const fetchLeads = createAsyncThunk("crm/fetchLeads", () => crmApi.getLeads());

type CrmState = {
  leads: Lead[];
  status: "idle" | "loading" | "failed";
};

const initialState: CrmState = { leads: [], status: "idle" };

const crmSlice = createSlice({
  name: "crm",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeads.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.status = "idle";
        state.leads = action.payload;
      })
      .addCase(fetchLeads.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const crmReducer = crmSlice.reducer;
