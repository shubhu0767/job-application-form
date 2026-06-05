import { Outlet, useLocation } from "react-router-dom";
import { Stepper, Step, StepLabel, Container, Box } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";

const steps = [
  { label: "Personal Info", path: "/personal-info" },
  { label: "Education", path: "/education" },
  { label: "Work Experience", path: "/work-experience" },
  { label: "Skills", path: "/skills" },
  { label: "Additional Info", path: "/additional-info" },
  { label: "Review", path: "/review" },
];

export default function FormLayout() {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const activeStep = steps.findIndex(
    (step) => step.path === location.pathname
  );

  return (
    <Box sx={{ minHeight: "100vh", background:
      "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", py: 4 }}>
      <Container maxWidth="md">
        <Stepper activeStep={activeStep}
        orientation={isMobile ? "vertical" : "horizontal"}
          alternativeLabel={!isMobile}
          sx={{
            backgroundColor: "#fff",
            p: 1,
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          {steps.map((step) => (
            <Step key={step.path}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Container>

      <Outlet />
    </Box>
  );
}