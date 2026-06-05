import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Box,
  Container,
  Paper,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  updateAdditionalInfo,
} from "../redux/slices/formSlice";
import { validationRules } from "../utils/validationRules";
import { useNavigate } from "react-router-dom";

const AdditionalInfoForm = () => {
  const dispatch = useDispatch();
  const additionalInfo = useSelector(
    (state) => state.form.formData.additionalInfo,
  );
  const navigate = useNavigate();
  const [resumeFile, setResumeFile] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      coverLetter: additionalInfo.coverLetter || "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    reset({ coverLetter: additionalInfo.coverLetter });
  }, [additionalInfo, reset]);

  const handleFileUpload = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      if (file.type !== "application/pdf") {
        alert("Please upload a PDF file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      setResumeFile(file);
    }
  };

  const onSubmit = (data) => {
    dispatch(
      updateAdditionalInfo({
        coverLetter: data.coverLetter,
        resume: resumeFile || additionalInfo.resume,
      }),
    );
      navigate("/review");
  };

  const handlePrevious = () => {
    dispatch(updateAdditionalInfo(additionalInfo));
    navigate(-1);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
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
          Additional Information
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Controller
            name="coverLetter"
            control={control}
            rules={validationRules.additionalInfo.coverLetter}
            render={({ field }) => (
              <TextField
                {...field}
                label="Cover Letter"
                placeholder="Write a compelling cover letter highlighting your interest and qualifications..."
                fullWidth
                multiline
                rows={6}
                error={!!errors.coverLetter}
                helperText={
                  errors.coverLetter?.message ||
                  "Minimum 10 characters (Optional)"
                }
                variant="outlined"
              />
            )}
          />

          {/* <Card
            sx={{
              border: '2px dashed #1976d2',
              p: 2,
              textAlign: 'center',
              cursor: 'pointer',
              backgroundColor: '#f5f5f5',
              transition: 'all 0.3s',
              '&:hover': {
                backgroundColor: '#e3f2fd',
                borderColor: '#1565c0',
              },
            }}
          >
            <CardContent>
              {resumeFile || additionalInfo.resume ? (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 1 }}>
                  <CheckCircleIcon sx={{ fontSize: 40, color: '#4caf50' }} />
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#4caf50' }}>
                    Resume Uploaded: {resumeFile ? resumeFile.name : 'Resume file attached'}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Click to upload another file
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 1 }}>
                  <CloudUploadIcon sx={{ fontSize: 40, color: '#1976d2' }} />
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    Upload Your Resume
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    PDF format, Max 5MB
                  </Typography>
                </Box>
              )}
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                  cursor: 'pointer',
                  left: 0,
                  top: 0,
                }}
              />
            </CardContent>
          </Card> */}

          <Card
            component="label"
            sx={{
              border: '2px dashed #1976d2',
              p: 2,
              textAlign: 'center',
              cursor: 'pointer',
              backgroundColor: '#f5f5f5',
              transition: 'all 0.3s',
              '&:hover': {
                backgroundColor: '#e3f2fd',
                borderColor: '#1565c0',
              },
            }}
          >
            <CardContent>
              {resumeFile || additionalInfo.resume ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <CheckCircleIcon sx={{ fontSize: 40, color: "#4caf50" }} />
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", color: "#4caf50" }}
                  >
                    Resume Uploaded:{" "}
                    {resumeFile ? resumeFile.name : "Resume file attached"}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Click to upload another file
                  </Typography>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <CloudUploadIcon sx={{ fontSize: 40, color: "#1976d2" }} />
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Upload Your Resume
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    PDF format, Max 5MB
                  </Typography>
                </Box>
              )}
            </CardContent>

            <input
              hidden
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
            />
          </Card>

          <input
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            style={{ display: "none" }}
            id="resume-upload"
          />
          <label htmlFor="resume-upload" style={{ cursor: "pointer" }}>
            <Button
              variant="outlined"
              component="span"
              fullWidth
              startIcon={<CloudUploadIcon />}
              sx={{
                py: 1.5,
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              Choose Resume File
            </Button>
          </label>

          <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, mt: 3 }}>
            <Button
              onClick={handlePrevious}
              variant="outlined"
              sx={{
                py: 1.5,
                fontSize: "1rem",
              }}
            >
              Previous
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                py: 1.5,
                fontSize: "1rem",
                background: "linear-gradient(to right, #1976d2, #1565c0)",
                "&:hover": {
                  background: "linear-gradient(to right, #1565c0, #0d47a1)",
                },
              }}
            >
              Review Application
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default AdditionalInfoForm;
