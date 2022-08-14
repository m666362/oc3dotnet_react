import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import * as React from "react";

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import ProgressBar from "./ProgressBar";
import { widState } from "../Store/TableStore";
import { useSnapshot } from "valtio";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 12,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

function UserProfileHistory(props) {
  const snap = useSnapshot(widState);
  const [currentUser, setCurrentUser] = React.useState("");
  const [hover, setHover] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const onHover = (user) => {
    setCurrentUser(user);
  };
  const onLeave = () => {
    setCurrentUser("");
  };

  React.useEffect(()=>{
    let temp = {}
    let histories = JSON.parse(JSON.stringify(widState?.row?.history));
    let tempUsers = histories.map((history)=>{
      temp[history?.lastUpdate?.split("by")?.[1].trim()] = history?.lastUpdate?.split("by")?.[1].trim()
      // return history?.lastUpdate?.split("by")?.[1].trim()
      return "";
    })

    //history[0]?.lastUpdate?.split("by")?.[1].trim()
    console.log({temp});
    setUsers(Object.keys(temp))
  }, [])

  return (
    <Grid
      xs={12}
      sm={12}
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <ProgressBar bgcolor="#99ccff" progress="100" height={20} />
      </Grid>

      <Grid item>
        <Stack direction="row" spacing={2}>
          {users?.map((user) => {
            return (
              <Avatar
                sx={{
                  "&:hover": {
                    background: "#f00",
                  },
                }}
                onMouseEnter={() => {
                  onHover(user);
                }}
                onMouseLeave={onLeave}
              >
                {user?.split("")?.[0]}
              </Avatar>
            );
          })}
        </Stack>
      </Grid>
      <Grid item sx={{ m: 0, p: 0 }}>
        <Typography variant="caption" display="block" gutterBottom>
          {currentUser ? currentUser : ""}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h6" gutterBottom component="div">
          {snap.row.status}
        </Typography>
      </Grid>
    </Grid>
  );
}
export default UserProfileHistory;
