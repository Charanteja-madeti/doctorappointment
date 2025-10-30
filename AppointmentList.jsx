import React from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Stack,
  Box
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PersonIcon from "@mui/icons-material/Person";

function formatDate(dateStr) {
  // expecting YYYY-MM-DD
  try {
    const parts = dateStr.split("-");
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  } catch {
    return dateStr;
  }
}

const AppointmentCard = ({ appt, onRemove }) => (
  <Card variant="outlined" sx={{ borderRadius: 2 }}>
    <CardContent>
      <Stack spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <PersonIcon /> <Typography variant="h6">{appt.name}</Typography>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center" sx={{ pt: 1 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <LocalHospitalIcon fontSize="small" />
            <Typography variant="body2">{appt.doctor}</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <CalendarTodayIcon fontSize="small" />
            <Typography variant="body2">{formatDate(appt.date)}</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <AccessTimeIcon fontSize="small" />
            <Typography variant="body2">{appt.time}</Typography>
          </Stack>
        </Stack>

        <Typography variant="body2" sx={{ color: "text.secondary", pt: 1 }}>
          Contact: {appt.phone}
        </Typography>
      </Stack>
    </CardContent>

    <CardActions>
      <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={() => onRemove(appt.id)}>
        Cancel
      </Button>
    </CardActions>
  </Card>
);

export default function AppointmentList({ appointments, onRemove }) {
  if (!appointments || appointments.length === 0) {
    return (
      <Box>
        <Typography variant="h6">Appointments</Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          No appointments yet. Use the form to book a new appointment.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Appointments ({appointments.length})
      </Typography>

      <Grid container spacing={2}>
        {appointments.map((appt) => (
          <Grid item xs={12} sm={6} key={appt.id}>
            <AppointmentCard appt={appt} onRemove={onRemove} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
