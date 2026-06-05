import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Box,
  Container,
  Paper,
  Typography,
  Card,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Alert,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import { resetForm } from "../redux/slices/formSlice";
import { useNavigate } from "react-router-dom";

const ReviewForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state) => state.form.formData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEditStep = (step) => {
    navigate(`/${step}`);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      setTimeout(() => {
        dispatch(resetForm());
        navigate("/personal-info");
      }, 3000);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <Container maxWidth="sm" sx={{ py: 10, textAlign: "center" }}>
        <Paper
          elevation={3}
          sx={{
            p: 6,
            borderRadius: 2,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          }}
        >
          <CheckCircleIcon sx={{ fontSize: 80, color: "#fff", mb: 2 }} />
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#fff",
              mb: 2,
            }}
          >
            Application Submitted Successfully!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#fff",
              mb: 2,
            }}
          >
            Thank you for applying. We have received your application and will
            review it soon.
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "#fff",
            }}
          >
            Redirecting to start a new application...
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            mb: 3,
            fontWeight: "bold",
            color: "#1976d2",
            textAlign: "center",
          }}
        >
          Review & Submit Application
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
          Please review all your information before submitting. You can edit any
          section if needed.
        </Alert>

        {/* Personal Information Section */}
        <Card sx={{ mb: 3, borderLeft: "4px solid #1976d2" }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#1976d2" }}
              >
                Personal Information
              </Typography>
              <Button
                size="small"
                startIcon={<EditIcon />}
                onClick={() => handleEditStep("personal-info")}
                sx={{ color: "#1976d2" }}
              >
                Edit
              </Button>
            </Box>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", width: "40%" }}>
                    Name:
                  </TableCell>
                  <TableCell>{formData.personalInfo.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Email:</TableCell>
                  <TableCell>{formData.personalInfo.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Phone:</TableCell>
                  <TableCell>{formData.personalInfo.phone}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Address:</TableCell>
                  <TableCell>{formData.personalInfo.address}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Education Section */}
        <Card sx={{ mb: 3, borderLeft: "4px solid #4caf50" }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#4caf50" }}
              >
                Education
              </Typography>
              <Button
                size="small"
                startIcon={<EditIcon />}
                onClick={() => handleEditStep("education")}
                sx={{ color: "#4caf50" }}
              >
                Edit
              </Button>
            </Box>
            {formData.education.map((edu, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                {index > 0 && <Divider sx={{ my: 1 }} />}
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold", width: "30%" }}>
                        Level:
                      </TableCell>
                      <TableCell>{edu.level}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        School/Institute:
                      </TableCell>
                      <TableCell>{edu.schoolName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Board/University:
                      </TableCell>
                      <TableCell>{edu.board}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>CGPA:</TableCell>
                      <TableCell>{edu.cgpa}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Passing Year:
                      </TableCell>
                      <TableCell>{edu.passingYear}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            ))}
          </CardContent>
        </Card>

        {/* Work Experience Section */}
        <Card sx={{ mb: 3, borderLeft: "4px solid #ff9800" }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#ff9800" }}
              >
                Work Experience
              </Typography>
              <Button
                size="small"
                startIcon={<EditIcon />}
                onClick={() => handleEditStep("work-experience")}
                sx={{ color: "#ff9800" }}
              >
                Edit
              </Button>
            </Box>
            {formData.workExperience.map((exp, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                {index > 0 && <Divider sx={{ my: 1 }} />}
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold", width: "30%" }}>
                        Company:
                      </TableCell>
                      <TableCell>{exp.companyName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Job Title:
                      </TableCell>
                      <TableCell>{exp.jobTitle}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Duration:
                      </TableCell>
                      <TableCell>{exp.duration}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            ))}
          </CardContent>
        </Card>

        {/* Skills Section */}
        <Card sx={{ mb: 3, borderLeft: "4px solid #9c27b0" }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#9c27b0" }}
              >
                Skills & Qualifications
              </Typography>
              <Button
                size="small"
                startIcon={<EditIcon />}
                onClick={() => handleEditStep("skills")}
                sx={{ color: "#9c27b0" }}
              >
                Edit
              </Button>
            </Box>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", width: "30%" }}>
                    Technical Skills:
                  </TableCell>
                  <TableCell>{formData.skills.technicalSkills}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Certifications:
                  </TableCell>
                  <TableCell>
                    {formData.skills.certifications || "N/A"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Additional Information Section */}
        <Card sx={{ mb: 3, borderLeft: "4px solid #f44336" }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#f44336" }}
              >
                Additional Information
              </Typography>
              <Button
                size="small"
                startIcon={<EditIcon />}
                onClick={() => handleEditStep("additional-info")}
                sx={{ color: "#f44336" }}
              >
                Edit
              </Button>
            </Box>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", width: "30%" }}>
                    Cover Letter:
                  </TableCell>
                  <TableCell>
                    {formData.additionalInfo.coverLetter || "Not provided"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Resume:</TableCell>
                  <TableCell>
                    {formData.additionalInfo.resume
                      ? `${formData.additionalInfo.resume.name}`
                      : "Not uploaded"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
          <Button
            onClick={() => navigate(-1)}
            variant="outlined"
            sx={{
              py: 1.5,
              fontSize: "1rem",
              fontWeight: "bold",
            }}
          >
            Previous
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              py: 1.5,
              flex: 1,

              fontSize: "1rem",
              background: "linear-gradient(to right, #4caf50, #45a049)",
              "&:hover": {
                background: "linear-gradient(to right, #45a049, #3d8b40)",
              },
            }}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Application"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ReviewForm;
