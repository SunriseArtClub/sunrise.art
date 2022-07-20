import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AlertModal {
  show: boolean;
  title?: string;
  message?: string;
}

interface ApplicationState {
  alertModal: AlertModal;
}

const initialState: ApplicationState = {
  alertModal: {
    show: false,
  },
};

export const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setAlertModal: (state, action: PayloadAction<AlertModal>) => {
      state.alertModal = action.payload;
    },
  },
});

export const { setAlertModal } = applicationSlice.actions;

export default applicationSlice.reducer;
