import { Avatar, Grid, Typography } from "@mui/material";
import React from "react";
const longMessage =
  "A quick brown fox jumps over the lazy dog. A quick brown fox jumps over the lazy dog. A quick brown fox jumps over the lazy dog. A quick brown fox jumps over the lazy dog. A quick brown fox jumps over the lazy dog. A quick brown fox jumps over the lazy dog.";

function LogView({
  name = "Tyler Jones",
  date = "12/12/2022 08:08pm",
  shortMessage = "Some short message",
  notes = longMessage,
  row,
}) {
  return (
    <Grid
      item
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={2}
    >
      <Grid
        item
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        wrap="nowrap"
        spacing={2}
      >
        <Grid item>
          <Avatar>
            {
              row?.lastUpdate
                ?.split("by")?.[1]
                .trim()
                .split("")?.[0]
            }
          </Avatar>
        </Grid>
        <Grid
          item
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs>
            <Typography variant="body1" gutterBottom>
              <strong>{row?.lastUpdate?.split("by")?.[1].trim()}</strong>
            </Typography>
          </Grid>

          <Grid item xs>
            <Typography variant="caption" gutterBottom>
              {row.lastUpdate}
            </Typography>
          </Grid>
          {row?.who && (
            <Grid item xs>
              <Typography>
                {row?.who + " "} must follow up by {row?.when + " "}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
      {Object.keys(JSON.parse(row?.updates)).map((key) => (
        <Grid item>
          <Typography><strong>{key}</strong> : {JSON.parse(row?.updates)[key]}</Typography>
        </Grid>
      ))}
    </Grid>
  );
}

export default LogView;
