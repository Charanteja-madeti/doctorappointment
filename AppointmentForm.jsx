import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Stack,
  Typography,
  Box
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const DOCTORS = [
  "General Physician",
  "Cardiologist",
  "Dermatologist",
  "Dentist",
  "Pediatrician",
  "Orthopedist"
];

export default function AppointmentForm({ onAdd }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState(dayjs());
  const [time, setTime] = useState(dayjs());
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Name is required";
    if (!phone.trim()) e.phone = "Phone is required";
    else if (!/^\+?\d{6,15}$/.test(phone.trim())) e.phone = "Enter a valid phone number";
    if (!doctor) e.doctor = "Select a doctor";
    // date/time simple validation
    if (!date || !date.isValid()) e.date = "Select a valid date";
    if (!time || !time.isValid()) e.time = "Select a valid time";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    // combine date and time into ISO (or keep them separately)
    // store formatted strings for display
    const appointment = {
      name: name.trim(),
      phone: phone.trim(),
      doctor,
      date: date.format("YYYY-MM-DD"),
      time: time.format("HH:mm")
    };

    onAdd(appointment);

    // reset
    setName("");
    setPhone("");
    setDoctor("");
    setDate(dayjs());
    setTime(dayjs());
    setErrors({});
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Stack spacing={2}>
        <Typography variant="h6">Book an Appointment</Typography>

        <TextField
          label="Patient Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
          fullWidth
        />

        <TextField
          label="Phone (e.g. +919876543210)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={!!errors.phone}
          helperText={errors.phone}
          fullWidth
        />

        <TextField
          select
          label="Select Doctor"
          value={doctor}
          onChange={(e) => setDoctor(e.target.value)}
          error={!!errors.doctor}
          helperText={errors.doctor}
          fullWidth
        >
          <MenuItem value="">-- Choose --</MenuItem>
          {DOCTORS.map((d) => (
            <MenuItem key={d} value={d}>
              {d}
            </MenuItem>
          ))}
        </TextField>

        <DatePicker
          label="Appointment Date"
          value={date}
          onChange={(newVal) => setDate(newVal || dayjs())}
          slotProps={{ textField: { fullWidth: true, error: !!errors.date, helperText: errors.date } }}
        />

        <TimePicker
          label="Appointment Time"
          value={time}
          onChange={(newVal) => setTime(newVal || dayjs())}
          slotProps={{ textField: { fullWidth: true, error: !!errors.time, helperText: errors.time } }}
        />

        <Button type="submit" variant="contained" size="large">
          Book Appointment
        </Button>
      </Stack>
    </Box>
  );
}
