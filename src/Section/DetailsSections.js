import React from "react";
import { useSnapshot } from "valtio";
import SlideView from "../Components/SlideView";
import { widState } from "../Store/TableStore";

import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Grid } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

function DetailsSections(props) {
  const snap = useSnapshot(widState);

  return (
    <Grid>
      <Dialog
        fullScreen
        open={snap.detailsView}
        onClose={() => {
          widState.setDetailsView(false);
        }}
        TransitionComponent={Transition}
        sx={{ ml: 40 }}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                widState.setDetailsView(false);
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Details Activity
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          <SlideView />
        </List>
      </Dialog>
    </Grid>
  );
}

export default DetailsSections;
