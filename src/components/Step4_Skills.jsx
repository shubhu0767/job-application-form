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
} from "@mui/material";
import { updateSkills } from "../redux/slices/formSlice";
import { validationRules } from "../utils/validationRules";
import { useNavigate } from "react-router-dom";

const SkillsForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const skills = useSelector((state) => state.form.formData.skills);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: skills,
    mode: "onChange",
  });

  useEffect(() => {
    reset(skills);
  }, [skills, reset]);

  const onSubmit = (data) => {
    dispatch(updateSkills(data));
      navigate("/additional-info");
  };

  const handlePrevious = () => {
    dispatch(updateSkills(skills));
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
          Skills & Qualifications
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Controller
            name="technicalSkills"
            control={control}
            rules={validationRules.skills.technicalSkills}
            render={({ field }) => (
              <TextField
                {...field}
                label="Technical Skills"
                placeholder="e.g., JavaScript, React, Node.js, Python, SQL"
                fullWidth
                multiline
                rows={4}
                error={!!errors.technicalSkills}
                helperText={
                  errors.technicalSkills?.message ||
                  "Separate skills with commas"
                }
                variant="outlined"
                required
              />
            )}
          />

          <Controller
            name="certifications"
            control={control}
            rules={validationRules.skills.certifications}
            render={({ field }) => (
              <TextField
                {...field}
                label="Certifications"
                placeholder="e.g., AWS Certified Solutions Architect, Google Cloud Professional"
                fullWidth
                multiline
                rows={4}
                error={!!errors.certifications}
                helperText={
                  errors.certifications?.message ||
                  "Separate certifications with commas (Optional)"
                }
                variant="outlined"
              />
            )}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
              mt: 3,
            }}
          >
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
              Next Step
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default SkillsForm;
