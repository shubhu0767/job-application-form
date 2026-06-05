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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { updateEducation } from "../redux/slices/formSlice";
import { validationRules } from "../utils/validationRules";
import { useNavigate } from "react-router-dom";

const EducationForm = () => {
  const dispatch = useDispatch();
  const education = useSelector((state) => state.form.formData.education);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      education: education || [],
    },
    mode: "onChange",
  });

  useEffect(() => {
    reset({ education });
  }, [education, reset]);

  const onSubmit = (data) => {
    dispatch(updateEducation(data.education));
      navigate("/work-experience");
  };

  const handlePrevious = () => {
    dispatch(updateEducation(education));
    navigate(-1);
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
          Education
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <TableContainer sx={{ mb: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Education Level
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    School/Institute Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Board/University
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>CGPA</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Passing Year
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {education.map((edu, index) => (
                  <TableRow key={index}>
                    <TableCell>{edu.level}</TableCell>
                    <TableCell>
                      <Controller
                        name={`education.${index}.schoolName`}
                        control={control}
                        rules={validationRules.education.schoolName}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            placeholder="School/Institute name"
                            size="small"
                            fullWidth
                            error={!!errors.education?.[index]?.schoolName}
                            helperText={
                              errors.education?.[index]?.schoolName?.message
                            }
                          />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Controller
                        name={`education.${index}.board`}
                        control={control}
                        rules={validationRules.education.board}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            placeholder="Board/University"
                            size="small"
                            fullWidth
                            error={!!errors.education?.[index]?.board}
                            helperText={
                              errors.education?.[index]?.board?.message
                            }
                          />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Controller
                        name={`education.${index}.cgpa`}
                        control={control}
                        rules={validationRules.education.cgpa}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            placeholder="CGPA"
                            size="small"
                            fullWidth
                            type="number"
                            slotProps={{
                              htmlInput: { step: 0.01, min: 0, max: 10 },
                            }}
                            error={!!errors.education?.[index]?.cgpa}
                            helperText={
                              errors.education?.[index]?.cgpa?.message
                            }
                          />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Controller
                        name={`education.${index}.passingYear`}
                        control={control}
                        rules={validationRules.education.passingYear}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            placeholder="YYYY"
                            size="small"
                            fullWidth
                            type="number"
                            slotProps={{
                              htmlInput: {
                                min: 1950,
                                max: new Date().getFullYear(),
                              },
                            }}
                            error={!!errors.education?.[index]?.passingYear}
                            helperText={
                              errors.education?.[index]?.passingYear?.message
                            }
                          />
                        )}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
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

export default EducationForm;
