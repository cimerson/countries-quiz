import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    played: 0,
    corect: 0,
    incorect: 0
}

export const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    updateResults: (state, action) => {
        return {
          ...state,
          ...action.payload,
        }
    },
    reset: () => initialState,
  },
})

export const { updateResults, reset } = resultsSlice.actions

export default resultsSlice.reducer
