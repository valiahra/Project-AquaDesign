import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    errors: {},
  };
  
  const errorsSlice = createSlice({
    name: 'errors',
    initialState,
    reducers: {
      setError(state, action) {
        state.errors = {...state.errors,...action.payload };
      },
      clearError(state, action) {
        delete state.errors[action.payload];
      },
    },
  });
  
  export const { setError, clearError } = errorsSlice.actions;
  export default errorsSlice.reducer;