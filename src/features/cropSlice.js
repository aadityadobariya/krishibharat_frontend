import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  crops: [],
  currentZoneId: null,
};

const cropSlice = createSlice({
  name: "crops",
  initialState,
  reducers: {
    setCrops(state, action) {
      state.crops = action.payload;
    },
    setCurrentZoneId(state, action) {
      state.currentZoneId = action.payload;
    },
  },
});

export const { setCrops, setCurrentZoneId } = cropSlice.actions;
export default cropSlice.reducer;
