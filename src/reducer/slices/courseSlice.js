import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  editcourse: false,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setEditCourse: (state, action) => {
      state.editcourse = action.payload;
    },
  },
});
export const { setStep, setEditCourse } = courseSlice.actions;
export default courseSlice.reducer;
