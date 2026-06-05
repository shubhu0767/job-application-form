import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      address: '',
    },
    education: [
      { level: 'SSC', schoolName: '', board: '', cgpa: '', passingYear: '' },
      { level: 'HSC', schoolName: '', board: '', cgpa: '', passingYear: '' },
      { level: 'Graduation', schoolName: '', board: '', cgpa: '', passingYear: '' },
      { level: 'Post Graduation', schoolName: '', board: '', cgpa: '', passingYear: '' },
    ],
    workExperience: [
      { companyName: '', jobTitle: '', duration: '' },
    ],
    skills: {
      technicalSkills: '',
      certifications: '',
    },
    additionalInfo: {
      coverLetter: '',
      resume: null,
    },
  },
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updatePersonalInfo: (state, action) => {
      state.formData.personalInfo = { ...state.formData.personalInfo, ...action.payload };
    },
    updateEducation: (state, action) => {
      state.formData.education = action.payload;
    },
    updateWorkExperience: (state, action) => {
      state.formData.workExperience = action.payload;
    },
    updateSkills: (state, action) => {
      state.formData.skills = { ...state.formData.skills, ...action.payload };
    },
    updateAdditionalInfo: (state, action) => {
      state.formData.additionalInfo = { ...state.formData.additionalInfo, ...action.payload };
    },
    resetForm: (state) => {
      return initialState;
    },
  },
});

export const {
  updatePersonalInfo,
  updateEducation,
  updateWorkExperience,
  updateSkills,
  updateAdditionalInfo,
  resetForm,
} = formSlice.actions;

export default formSlice.reducer;
