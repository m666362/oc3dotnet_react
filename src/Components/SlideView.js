import {
  Autocomplete,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { useForm, Controller, useWatch } from "react-hook-form";
import SlideTable from "../Utilities/SlideTable";
import UserProfileHistory from "../Utilities/UserProfileHistory";
import SendIcon from "@mui/icons-material/Send";
import LogView from "../Utilities/LogView";
import { widState } from "../Store/TableStore";
import { useSnapshot } from "valtio";
import AutoCompleteController from "../Form/AutoCompleteController";
import {
  dateTrackerBasedOnStatus,
  projectManagers,
  statusList,
} from "../utils/Data";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteRecord from "../Dialog/DeleteRecord";
import { DateTime } from "luxon";

const style = {
  // position: "absolute",
  // top: "50%",
  // left: "50%",
  // transform: "translate(-50%, -50%)",
  minWidth: 800,
  // bgcolor: "background.paper",
  // boxShadow: 24,
  // p: 4,
};

function SlideView({
  clientName = "Rodgers & Co.",
  serviceType = "Development",
}) {
  const snap = useSnapshot(widState);
  const { handleSubmit, control } = useForm();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState(DateTime.now().toString());
  const [change, setChanges] = useState({});
  const [updatedRow, setUpdatedRow] = useState({});

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  let results = useWatch({ control, name: "status" }) ?? snap?.row?.status;

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log({ data });
        let changesText = {};
        for (const property in data) {
          if (
            data[property] != widState.row?.[property] &&
            !(property === "who" || property === "when")
          ) {
            changesText[
              property
            ] = `${property} has been changed from ${widState.row?.[property]} to ${data?.[property]}`;
            console.log(
              `${property} has been changed from ${widState.row?.[property]} to ${data?.[property]}`
            );
          }
        }
        setChanges(changesText);
        setUpdatedRow({
          ...widState.row,
          ...data,
          updates: JSON.stringify(changesText),
          lastUpdate:DateTime.now()
                  .setZone("America/New_York")
                  .toFormat("ccc, ff") + ` by ${snap.currentUser}`
        });
        handleClickOpen();
        // console.log({ ...widState.row, ...data });
        // widState.updateRow({ ...widState.row, ...data });
        // widState.setDetailsView(false);
        // data = {
        //   ...widState.row,
        //   notes: data[widState.row.notes],
        //   status: data[widState.row.status],
        //   lastUpdate: DateTime.now().setZone("America/New_York").toFormat("ccc, ff") + ` by ${snap.currentUser}`,
        // }
        // console.log({data});
        // widState.updateRow(data);
        //

        // widState.setRow({});
        // widState.setUpdateStatus(false)
        // updateRow(data);
        // handleClose();
      })}
    >
      <Grid
        item
        xs={12}
        container
        direction="column"
        spacing={2}
        sx={{ padding: 10, paddingTop: 5, paddingBottom: 5 }}
        rowSpacing={4}
      >
        <Grid
          item
          xs={12}
          direction="row"
          md={12}
          container
          spacing={16}
          justifyContent="flex-end"
          alignItems="center"
        >
          <Grid item xs={12} md={8} container direction="column">
            <Grid item>
              <Typography
                variant="h4"
                gutterBottom
                component="div"
                sx={{ margin: 0 }}
              >
                {snap.row.client}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" gutterBottom component="div">
                {snap.row.service}
              </Typography>
            </Grid>
            <Grid item>
              <SlideTable control={control} />
            </Grid>
          </Grid>
          <Grid item xs={12} md={4} container direction="column">
            <UserProfileHistory />
          </Grid>
        </Grid>
        <Grid item xs={12} container spacing={2}>
          <Grid item xs={12} sm={2.5}>
            <Typography variant="h6" gutterBottom component="div">
              Project Manager :
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3.5}>
            {[
              {
                name: "projectManager",
                label: "Project Manager",
                options: projectManagers,
              },
            ].map(({ name, label, options }) => (
              <Grid item>
                <AutoCompleteController
                  control={control}
                  name={name}
                  // label={label}
                  options={options}
                  defaultValue={snap.row?.[name]}
                />
              </Grid>
            ))}
          </Grid>
          <Grid item xs={12} sm={2.5}>
            <Typography variant="h6" gutterBottom component="div">
              Inception Date :
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3.5}>
            <Controller
              name={"inceptionDate"}
              control={control}
              rules={{ required: true }}
              defaultValue={snap?.row?.inceptionDate}
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
        <Grid item xs={12}>
          <Controller
            control={control}
            name={"notes"}
            defaultValue={widState.row.notes}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                required
                rows={4}
                size="small"
                label="Notes"
              />
            )}
          />
        </Grid>
        <Grid
          item
          xs={12}
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12} sm={4}>
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
                  label="Who - Shedule Follow Up"
                  defaultValue={snap.row?.[name]}
                />
              </Grid>
            ))}
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              name={"when"}
              control={control}
              rules={{ required: true }}
              defaultValue={value}
              render={({ field }) => (
                <DesktopDatePicker
                  {...field}
                  label="When - Shedule Follow Up"
                  inputFormat="MM/dd/yyyy"
                  renderInput={(params) => (
                    <TextField {...params} fullWidth size="small" />
                  )}
                />
              )}
            />
          </Grid>
          {dateTrackerBasedOnStatus[results] === "closingDate" && (
            <Grid item xs={12} sm={4}>
              <Controller
                name={"closingDate"}
                control={control}
                rules={{ required: true }}
                defaultValue={snap?.row?.[dateTrackerBasedOnStatus[results]]}
                render={({ field }) => (
                  <DesktopDatePicker
                    {...field}
                    label={"Closing Date"}
                    inputFormat="MM/dd/yyyy"
                    renderInput={(params) => (
                      <TextField {...params} fullWidth size="small" />
                    )}
                  />
                )}
              />
            </Grid>
          )}
          {dateTrackerBasedOnStatus[results] === "endingDate" && (
            <Grid item xs={12} sm={4}>
              <Controller
                name={"endingDate"}
                control={control}
                rules={{ required: true }}
                defaultValue={snap?.row?.[dateTrackerBasedOnStatus[results]]}
                render={({ field }) => (
                  <DesktopDatePicker
                    {...field}
                    label={"Ending Date"}
                    inputFormat="MM/dd/yyyy"
                    renderInput={(params) => (
                      <TextField {...params} fullWidth size="small" />
                    )}
                  />
                )}
              />
            </Grid>
          )}
          <Grid item xs={11} sm={3.2}>
            {[{ name: "status", label: "Status", options: statusList }].map(
              ({ name, label, options }) => (
                <Grid item>
                  <Controller
                    name={name}
                    control={control}
                    defaultValue={snap?.row?.[name]}
                    render={({ field }) => {
                      return (
                        <Autocomplete
                          {...field}
                          options={options}
                          getOptionLabel={(option) =>
                            option?.name ? option.name : option
                          }
                          onChange={(_, data) => field.onChange(data)}
                          size="small"
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label={label}
                              size="small"
                              required
                            />
                          )}
                        />
                      );
                    }}
                  />
                </Grid>
              )
            )}
          </Grid>
          <Grid item xs={1} sm={0.8}>
            <Button type="submit">
              <SendIcon />
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} container spacing={2}>
          {snap?.row?.history?.map((row) => (
            <LogView row={row} />
          ))}
        </Grid>
        <Grid>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Do you really want to change these..
            </DialogTitle>
            <DialogContent>
              {Object.keys(change).map((key) => (
                <DialogContentText id="alert-dialog-description" sx={{ p: 1 }}>
                  <strong>{change[key]}</strong>
                </DialogContentText>
              ))}
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClose}
                variant="outlined"
                color="error"
                sx={{ mr: 1 }}
              >
                Discard
              </Button>
              <Button
                autoFocus
                onClick={() => {
                  widState.updateRow(updatedRow);
                  widState.setDetailsView(false);
                  handleClose();
                }}
                variant="contained"
              >
                Save Changes
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>

        <Grid item xs={12}>
          {/* <Button fullWidth variant="outlined" color="error">
            Delete Record
          </Button> */}
          <DeleteRecord />
        </Grid>
      </Grid>
    </form>
  );
}

export default SlideView;
