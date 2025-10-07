import { createSlice } from "@reduxjs/toolkit";

interface IHotelState {
  hotelInfoType: "base" | "legal" | "none";
}

const initialState: IHotelState = {
  hotelInfoType: "base",
}

const hotelSlice = createSlice({
  name: "hotelSlice",
  initialState,
  reducers: {
    changeHotelInfoType: (state, action) => {
      state.hotelInfoType = action.payload;
    }
  },
})

export const { changeHotelInfoType } = hotelSlice.actions
export default hotelSlice.reducer

