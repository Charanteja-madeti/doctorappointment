import React, { useEffect, useState } from "react";
import { Container, Typography, Grid, Paper } from "@mui/material";
import AppointmentForm from "./components/AppointmentForm";
import AppointmentList from "./components/AppointmentList";

const LOCAL_STORAGE_KEY = "doctorAppointments_v1";

export default function App() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // load from localStorage on mount
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setAppointments(parsed);
      } catch {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    // persist to localStorage whenever appointments change
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(appointments));
  }, [appointments]);

  const addAppointment = (appt) => {
    // assign a simple id
    const newAppt = { ...appt, id: Date.now().toString() };
    setAppointments((prev) => [newAppt, ...prev]);
  };

  const removeAppointment = (id) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Paper elevation={3} sx={{ p: { xs: 3, md: 5 } }}>
        <Typography variant="h4" align="center" gutterBottom>
          Doctor Appointment Portal
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <AppointmentForm onAdd={addAppointment} />
          </Grid>

          <Grid item xs={12} md={7}>
            <AppointmentList appointments={appointments} onRemove={removeAppointment} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
