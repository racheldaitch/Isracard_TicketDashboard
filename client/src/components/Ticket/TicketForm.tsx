import React, { memo } from "react";
import * as Yup from "yup";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  MenuItem,
  Autocomplete,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { Ticket, TicketPriority, TicketStatus } from "../../models/Ticket";
import { useAgents } from "@/hooks/useAgents";
import { Agent } from "../../models/Agent";
import { useDispatch, useSelector } from "react-redux";
import { fetchTicketFormOpen } from "../../redux/ticketSlice";
import { useTickets } from "../../hooks/useTickets";

const statusOption = Object.values(TicketStatus)
  .filter((v) => typeof v === "number") // רק המספרים
  .map((value) => ({
    value: value as TicketStatus,
    label: TicketStatus[value as TicketStatus], // המרה למחרוזת
  }));
const priorityOptions = Object.values(TicketPriority)
  .filter((v) => typeof v === "number") // רק המספרים
  .map((value) => ({
    value: value as TicketPriority,
    label: TicketPriority[value as TicketPriority], // המרה למחרוזת
  }));

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  priority: Yup.number().required("Priority is required"), // Number כי את ממירה את הערך ל-Number
});

const TicketForm: React.FC = () => {
  const dispatch = useDispatch();
  const { handleSaveTicket } = useTickets();
  const currentTicket = useSelector((state: any) => {
    console.log(state); // תראי איך המבנה באמת נראה
    return state.tickets?.currentTicket;
  });
  const openDialod = useSelector((state: any) => {
    console.log(state); // תראי איך המבנה באמת נראה
    return state.tickets?.ticketFormOpen;
  });
  const agents = useSelector((state: any) => {
    console.log(state); // תראי איך המבנה באמת נראה
    return state.agents?.agents;
  });
  const isEditMode = currentTicket ? true : false;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: currentTicket?.id,
      status: currentTicket?.status ?? TicketStatus.New,
      title: currentTicket?.title ?? "",
      description: currentTicket?.description ?? "",
      priority: currentTicket?.priority ?? "", // תבחרי ערך ברירת מחדל נכון
      assignedAgent: currentTicket?.assignedAgent ?? undefined,
    },
    validationSchema,
    onSubmit: async (values: any, { resetForm }) => {
      await handleSaveTicket(values);
      resetForm();
      dispatch(fetchTicketFormOpen(false));
    },
  });

  return (
    <Dialog
      open={openDialod}
      onClose={() => dispatch(fetchTicketFormOpen(false))}
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Add New Ticket</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={
                formik.touched.title && typeof formik.errors.title === "string"
                  ? formik.errors.title
                  : ""
              }
            />

            <TextField
              fullWidth
              name="description"
              label="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description &&
                typeof formik.errors.description === "string"
                  ? formik.errors.description
                  : ""
              }
              multiline
              minRows={3}
              maxRows={6}
            />
            <TextField
              select
              fullWidth
              name="status"
              label="Status"
              value={formik.values.status}
              onChange={(e) =>
                formik.setFieldValue("status", Number(e.target.value))
              }
              onBlur={formik.handleBlur}
              error={formik.touched.status && Boolean(formik.errors.status)}
              helperText={
                formik.touched.status &&
                typeof formik.errors.status === "string"
                  ? formik.errors.status
                  : ""
              }
            >
              {statusOption.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              fullWidth
              name="priority"
              label="Priority"
              value={formik.values.priority}
              onChange={(e) =>
                formik.setFieldValue("priority", Number(e.target.value))
              }
              onBlur={formik.handleBlur}
              error={formik.touched.priority && Boolean(formik.errors.priority)}
              helperText={
                formik.touched.priority &&
                typeof formik.errors.priority === "string"
                  ? formik.errors.priority
                  : ""
              }
            >
              {priorityOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <Autocomplete
              options={agents}
              getOptionLabel={(option) => option.name}
              value={formik.values.assignedAgent || null}
              onChange={(event, value) => {
                formik.setFieldValue("assignedAgent", value);
              }}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Agent"
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => dispatch(fetchTicketFormOpen(false))}>
            Cancel
          </Button>
          {isEditMode ? (
            <Button type="submit" variant="contained" color="primary">
              Save Ticket
            </Button>
          ) : (
            <Button type="submit" variant="contained" color="primary">
              Add Ticket
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TicketForm;
