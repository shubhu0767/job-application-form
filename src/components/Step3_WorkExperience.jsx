import React, { useEffect, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Box,
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { updateWorkExperience } from "../redux/slices/formSlice";
import { validationRules } from "../utils/validationRules";
import { useNavigate } from "react-router-dom";

const WorkExperienceForm = () => {
  const dispatch = useDispatch();
  const workExperience = useSelector(
    (state) => state.form.formData.workExperience,
  );
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      workExperience: workExperience || [
        { companyName: "", jobTitle: "", duration: "" },
      ],
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "workExperience",
  });

  const onSubmit = (data) => {
    dispatch(updateWorkExperience(data.workExperience));
    navigate("/skills");
  };

  const handlePrevious = () => {
    dispatch(updateWorkExperience(workExperience));
    navigate(-1);
  };

  const handleAddRow = () => {
    append({
      companyName: "",
      jobTitle: "",
      duration: "",
    });
  };

  const handleRemoveRow = (index) => {
    remove(index);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
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
          Work Experience
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <TableContainer sx={{ mb: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Company Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Job Title</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Duration</TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fields.map((exp, index) => (
                  <TableRow key={exp.id}>
                    <TableCell>
                      <Controller
                        name={`workExperience.${index}.companyName`}
                        control={control}
                        rules={validationRules.workExperience.companyName}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            placeholder="Company name"
                            size="small"
                            fullWidth
                            error={
                              !!errors.workExperience?.[index]?.companyName
                            }
                            helperText={
                              errors.workExperience?.[index]?.companyName
                                ?.message
                            }
                          />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Controller
                        name={`workExperience.${index}.jobTitle`}
                        control={control}
                        rules={validationRules.workExperience.jobTitle}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            placeholder="Job title"
                            size="small"
                            fullWidth
                            error={!!errors.workExperience?.[index]?.jobTitle}
                            helperText={
                              errors.workExperience?.[index]?.jobTitle?.message
                            }
                          />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Controller
                        name={`workExperience.${index}.duration`}
                        control={control}
                        rules={validationRules.workExperience.duration}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            placeholder="e.g., 2 years"
                            size="small"
                            fullWidth
                            error={!!errors.workExperience?.[index]?.duration}
                            helperText={
                              errors.workExperience?.[index]?.duration?.message
                            }
                          />
                        )}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => handleRemoveRow(index)}
                        color="error"
                        disabled={fields.length === 1}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Button
            onClick={handleAddRow}
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              mb: 3,
              background: "linear-gradient(to right, #4caf50, #45a049)",
              "&:hover": {
                background: "linear-gradient(to right, #45a049, #3d8b40)",
              },
            }}
          >
            Add Row
          </Button>

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

export default WorkExperienceForm;
