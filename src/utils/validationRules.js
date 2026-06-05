export const validationRules = {
  personalInfo: {
    name: {
      required: 'Name is required',
      minLength: {
        value: 2,
        message: 'Name must be at least 2 characters',
      },
      maxLength: {
        value: 50,
        message: 'Name cannot exceed 50 characters',
      },
      pattern: {
        value: /^[a-zA-Z\s]*$/,
        message: 'Name can only contain letters and spaces',
      },
    },
    email: {
      required: 'Email is required',
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address',
      },
    },
    phone: {
      required: 'Phone number is required',
      pattern: {
        value: /^[0-9]{10}$/,
        message: 'Phone number must be 10 digits',
      },
    },
    address: {
      required: 'Address is required',
      minLength: {
        value: 5,
        message: 'Address must be at least 5 characters',
      },
    },
  },
  education: {
    schoolName: {
      required: 'School/Institute name is required',
      minLength: {
        value: 2,
        message: 'School name must be at least 2 characters',
      },
    },
    board: {
      required: 'Board/University is required',
      minLength: {
        value: 2,
        message: 'Board/University must be at least 2 characters',
      },
    },
    cgpa: {
      required: 'CGPA is required',
      pattern: {
        value: /^[0-9]{1,2}(\.[0-9]{1,2})?$/,
        message: 'CGPA must be a valid number (e.g., 7.5, 8.25)',
      },
      validate: (value) => {
        const cgpa = parseFloat(value);
        return (cgpa >= 0 && cgpa <= 10) || 'CGPA must be between 0 and 10';
      },
    },
    passingYear: {
      required: 'Passing year is required',
      pattern: {
        value: /^[0-9]{4}$/,
        message: 'Year must be 4 digits (e.g., 2023)',
      },
      validate: (value) => {
        const year = parseInt(value);
        const currentYear = new Date().getFullYear();
        return (year >= 1950 && year <= currentYear) || `Year must be between 1950 and ${currentYear}`;
      },
    },
  },
  workExperience: {
    companyName: {
      required: 'Company name is required',
      minLength: {
        value: 2,
        message: 'Company name must be at least 2 characters',
      },
    },
    jobTitle: {
      required: 'Job title is required',
      minLength: {
        value: 2,
        message: 'Job title must be at least 2 characters',
      },
    },
    duration: {
      required: 'Duration is required',
      pattern: {
        value: /^[0-9]+ (months?|years?)$/i,
        message: 'Duration format: e.g., "2 years" or "6 months"',
      },
    },
  },
  skills: {
    technicalSkills: {
      required: 'Please enter at least one technical skill',
      minLength: {
        value: 3,
        message: 'Technical skills must be at least 3 characters',
      },
    },
    certifications: {
      minLength: {
        value: 0,
        message: '',
      },
    },
  },
  additionalInfo: {
    coverLetter: {
      minLength: {
        value: 10,
        message: 'Cover letter must be at least 10 characters',
      },
    },
  },
};
