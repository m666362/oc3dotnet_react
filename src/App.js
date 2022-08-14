// import React from "react";

// import Input from "./Input/InputForm";
// import List from "./Input/List";
// import CONSTANTS from "./utils/constants";

// import "./App.css";
// import DemoGrid from "./DataGrid/DemoGrid";

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       urlValue: "",
//       urls: []
//     };
//   }
//   componentDidMount = async () => {
//     const response = await fetch(CONSTANTS.url.getAllUrls, {
//       method: "GET",
//       cache: "no-cache"
//     }).catch(() => null);
//     let urls = await response.json().catch(() => []);
//     urls = urls.map(url => ({
//       originalUrl: url.originalUrl,
//       urlCode: url.urlCode
//     }));
//     if (urls && urls.length > 0) {
//       this.setState({
//         urls
//       });
//     }
//   };
//   handleChange = event => {
//     this.setState({
//       urlValue: event.target.value
//     });
//   };

//   handleShrink = async event => {
//     event.preventDefault();
//     let shrinkUrl = this.state.urlValue;
//     if (shrinkUrl !== "") {
//       if (!/^https?:\/\//i.test(shrinkUrl)) {
//         shrinkUrl = "http://" + shrinkUrl;
//       }
//       const response = await fetch(CONSTANTS.url.posturl, {
//         method: "POST",
//         headers: new Headers({
//           Accept: "application/json",
//           "Content-Type": "application/json"
//         }),
//         cache: "no-cache",
//         body: JSON.stringify({
//           originalUrl: shrinkUrl
//         })
//       });
//       const resJson = await response.json();
//       if (response.ok) {
//         this.setState({
//           urlValue: "",
//           urls: [
//             {
//               originalUrl: resJson.originalUrl,
//               urlCode: resJson.urlCode
//             },
//             ...this.state.urls
//           ]
//         });
//       } else {
//         console.log(response);
//       }
//     }
//   };

//   render() {
//     return (
//       <div>
//         <div className="container">
//           {!navigator.onLine && (
//             <h3 className="header">Please connect to network</h3>
//           )}
//           <Header countUrls={this.state.urls.length} />
//           <DemoGrid />
//           {/* <Input
//             handleShrink={this.handleShrink}
//             handleChange={this.handleChange}
//             urlValue={this.state.urlValue}
//           /> */}
//         </div>
//         {/* <List urlValue={this.state.urlValue} urls={this.state.urls} /> */}
//       </div>
//     );
//   }
// }
// export default App;

// package import
import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";

// Component Import
import Header from "./Input/Header";
import DemoGrid from "./DataGrid/DemoGrid";

// Other Import
import "./App.css";
import {
  defaultColumns,
  defaultRows,
  statusList,
  clientList,
  serviceList,
  projectManagers,
  notes,
  lastModifications,
} from "./utils/Data";
import AddRowModel from "./Components/AddRowModel";
import ChangeStatusModel from "./Components/ChangeStatusModel";
import { widState } from "./Store/TableStore";
import { useSnapshot } from "valtio";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

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
import SlideView from "./Components/SlideView";
import DetailsSections from "./Section/DetailsSections";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

function App(props) {
  const snap = useSnapshot(widState);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([...defaultColumns]);
  const [row, setRow] = useState({});

  // For add row modal
  const [openAddRowModal, setOpenAddRowModal] = React.useState(false);
  const handleOpen = () => setOpenAddRowModal(true);
  const handleClose = () => setOpenAddRowModal(false);

  // Update Row Modal
  const [openUpdateRowModal, setOpenUpdateRowModal] = React.useState(false);
  const handleOpenUpdateRowModal = () => setOpenUpdateRowModal(true);
  const handleCloseUpdateRowModal = () => setOpenUpdateRowModal(false);

  const [value, setValue] = React.useState(projectManagers[0]);
  const [inputValue, setInputValue] = React.useState("");

  // For slide dialog
  const [slideOpen, setSlideOpen] = useState(false);

  const handleClickSlideOpen = () => {
    setSlideOpen(true);
  };

  const handleCloseSlide = () => {
    setSlideOpen(false);
  };

  const addRow = (data) => {
    const { status, client, service, projectManager, notes, lastUpdate, history } = data;
    widState.addRows({
      status,
      client,
      service,
      projectManager,
      notes,
      lastUpdate,
      history,
      id: Object.keys(snap.rows).length + 1,
    });
    console.log({ status, client, service, projectManager, notes, lastUpdate, history });
  };

  const updateRow = (data) => {
    const {
      id,
      status,
      client,
      service,
      projectManager,
      notes,
      lastUpdate,
    } = data;
    setRows((prevRows) =>
      prevRows.concat([
        {
          id,
          status,
          client,
          service,
          projectManager,
          notes,
          lastUpdate,
        },
      ])
    );
  };

  return (
    <Grid container spacing={2} direction={"column"}>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item container xs={12} spacing={1}>
        <Grid item xs={2}>
          <Button variant="outlined" fullWidth onClick={handleOpen}>
            Add Row
          </Button>
        </Grid>

        <Grid item xs={2} allignItem={"center"} sx={{ mr: 8 }}>
          <Autocomplete
            value={snap.currentUser}
            onChange={(event, newValue) => {
              widState.setCurrentUser(newValue);
            }}
            id="controllable-states-demo"
            options={projectManagers}
            size="small"
            renderInput={(params) => (
              <TextField {...params} label="Current User" />
            )}
          />
        </Grid>

        <Grid item xs={1} allignItem={"center"}>
          <SettingsSuggestIcon />
        </Grid>
      </Grid>
      <Grid item xs={12} container>
        <AddRowModel
          openAddRowModal={openAddRowModal}
          handleClose={handleClose}
          addRow={addRow}
        />
      </Grid>
      <Grid item xs={12} container>
        <ChangeStatusModel />
      </Grid>
      <Grid item xs={12}>
        <DemoGrid setRow={setRow} />
      </Grid>
      <Grid item>
        <DetailsSections />
      </Grid>
      <Grid item xs={12}>
        logged in as: {snap.currentUser}{" "}
      </Grid>
    </Grid>
  );
}

export default App;
