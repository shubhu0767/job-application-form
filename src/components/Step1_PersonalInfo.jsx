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
import { updatePersonalInfo } from "../redux/slices/formSlice";
import { validationRules } from "../utils/validationRules";
import { useNavigate } from "react-router-dom";


const PersonalInfoForm = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.formData.personalInfo);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: formData,
    mode: "onChange",
  });

  useEffect(() => {
    reset(formData);
  }, [formData, reset]);

  const onSubmit = (data) => {
    dispatch(updatePersonalInfo(data));
    navigate("/education");
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
          Personal Information
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Controller
            name="name"
            control={control}
            rules={validationRules.personalInfo.name}
            render={({ field }) => (
              <TextField
                {...field}
                label="Full Name"
                placeholder="Enter your full name"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
                variant="outlined"
                required
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            rules={validationRules.personalInfo.email}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email Address"
                placeholder="your@email.com"
                fullWidth
                type="email"
                error={!!errors.email}
                helperText={errors.email?.message}
                variant="outlined"
                required
              />
            )}
          />

          <Controller
            name="phone"
            control={control}
            rules={validationRules.personalInfo.phone}
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone Number"
                placeholder="1234567890"
                fullWidth
                type="tel"
                error={!!errors.phone}
                helperText={errors.phone?.message}
                variant="outlined"
                required
              />
            )}
          />

          <Controller
            name="address"
            control={control}
            rules={validationRules.personalInfo.address}
            render={({ field }) => (
              <TextField
                {...field}
                label="Address"
                placeholder="Enter your full address"
                fullWidth
                multiline
                rows={3}
                error={!!errors.address}
                helperText={errors.address?.message}
                variant="outlined"
                required
              />
            )}
          />

          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                py: 1.5,
                fontSize: "1rem",
                fontWeight: "bold",
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

export default PersonalInfoForm;
