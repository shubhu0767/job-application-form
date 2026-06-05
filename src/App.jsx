import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const FormLayout = lazy(() => import("./components/FormContainer"));
const PersonalInfoForm = lazy(() =>
  import("./components/Step1_PersonalInfo")
);
const EducationForm = lazy(() =>
  import("./components/Step2_Education")
);
const WorkExperienceForm = lazy(() =>
  import("./components/Step3_WorkExperience")
);
const SkillsForm = lazy(() =>
  import("./components/Step4_Skills")
);
const AdditionalInfoForm = lazy(() =>
  import("./components/Step5_AdditionalInfo")
);
const ReviewForm = lazy(() =>
  import("./components/Step6_Review")
);

const Loader = () => (
  <Box
    sx={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <CircularProgress />
  </Box>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/personal-info" replace />}
          />

          <Route element={<FormLayout />}>
            <Route
              path="/personal-info"
              element={<PersonalInfoForm />}
            />
            <Route
              path="/education"
              element={<EducationForm />}
            />
            <Route
              path="/work-experience"
              element={<WorkExperienceForm />}
            />
            <Route path="/skills" element={<SkillsForm />} />
            <Route
              path="/additional-info"
              element={<AdditionalInfoForm />}
            />
            <Route path="/review" element={<ReviewForm />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;