const {createSlice, createAsyncThunk} = require('@reduxjs/toolkit');

const initialState = {
  grades: [],
  saved: [],
  downloaded: [],
  tags: [],
  subjects: [],
};

export const fetchGrades = createAsyncThunk('fetchGrades', async () => {
  const response = await fetch('https://subjects.s3.amazonaws.com/data.json');
  const data = await response.json();
  return data;
});

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    pushToSaved(state, action) {
      state.saved.push(action.payload)
    },
    popFromSaved(state, action) {
      state.saved = state.saved.filter(item => item.id !== action.payload)
    },
    setDownloadedItems(state, action) {
      state.downloaded = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchGrades.fulfilled, (state, {payload}) => {
      state.grades = payload;
    });
  },
});

export const {pushToSaved, popFromSaved, setDownloadedItems} = appSlice.actions;

export default appSlice.reducer;
