import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit"

const absenceAdapter = createEntityAdapter()

const initialState = absenceAdapter.getInitialState({
  status: "idle",
  error: null,
})

const API_HOST = "https://culture.iportfolio.co.kr"

export const fetchAbsenceEvents = createAsyncThunk(
  "absence/fetchAll",
  async () => {
    const request = await fetch(`${API_HOST}/api/absence`)
    const response = await request.json()

    return response.items
  }
)

export const absenceSlice = createSlice({
  name: "absence",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAbsenceEvents.rejected]: (state, action) => {
      state.status = "error"
    },
    [fetchAbsenceEvents.fulfilled]: (state, action) => {
      state.status = "succeeded"

      absenceAdapter.upsertMany(state, action.payload)
    },
  },
})

export const { selectAll } = absenceAdapter.getSelectors()

export default absenceSlice.reducer
