import React from "react";
import {
  Autocomplete,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
function ScheduleFollowUp({control}) {
  return (
    <Dialog open={open} onClose={handleClose} sx={{}}>
      <DialogTitle sx={{ width: 400 }}>Schedule Follow Up</DialogTitle>
      <DialogContent>
        <Grid
          xs={12}
          container
          direction="column"
          justifyContent="center"
          alignItems="flex-start"
          spacing={2}
        >
          <Grid
            item
            xs={12}
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={3}>
              <Typography>Who</Typography>
            </Grid>
            <Grid item xs={9}>
              {[
                {
                  name: "who",
                  label: "Project Manager",
                  options: projectManagers,
                },
              ].map(({ name, label, options }) => (
                <Grid item>
                  <AutoCompleteController
                    control={control}
                    name={name}
                    options={options}
                    defaultValue={snap.row?.[name]}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item sx={12} container spacing={2}>
            <Grid item xs={3}>
              <Typography>When</Typography>
            </Grid>
            <Grid item xs={9}>
              <Controller
                name={"when"}
                control={control}
                rules={{ required: true }}
                defaultValue={value}
                render={({ field }) => (
                  <DesktopDatePicker
                    {...field}
                    inputFormat="MM/dd/yyyy"
                    renderInput={(params) => (
                      <TextField {...params} fullWidth size="small" />
                    )}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Proceed</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ScheduleFollowUp;
