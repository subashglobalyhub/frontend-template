import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { hrmsApi } from "../apis";
import type { Employee } from "../apis/types";

export const fetchEmployees = createAsyncThunk("hrms/fetchEmployees", () =>
  hrmsApi.getEmployees()
);

type HrmsState = {
  employees: Employee[];
  status: "idle" | "loading" | "failed";
};

const initialState: HrmsState = { employees: [], status: "idle" };

const hrmsSlice = createSlice({
  name: "hrms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = "idle";
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const hrmsReducer = hrmsSlice.reducer;
