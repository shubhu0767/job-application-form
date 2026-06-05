import { configureStore } from '@reduxjs/toolkit';
import formSlice from './slices/formSlice';

export const store = configureStore({
  reducer: {
    form: formSlice,
  },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore the specific path where the File object is stored
        ignoredPaths: ['form.formData.additionalInfo.resume'],
        // Also ignore the action that carries the File object
        ignoredActionPaths: ['payload.resume'],
      },
    }),
});

export default store;
