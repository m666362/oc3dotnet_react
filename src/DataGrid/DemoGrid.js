import React, { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { widState } from "./../Store/TableStore";
import { Box, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
// import { DataGridPro } from '@mui/x-data-grid-pro';

import { defaultColumns, defaultRows } from "../utils/Data";

// const columns = [
//   { field: "id", headerName: "ID", width: 70 },
//   { field: "firstName", headerName: "First name", width: 130 },
//   { field: "lastName", headerName: "Last name", width: 130 },
//   {
//     field: "age",
//     headerName: "Age",
//     type: "number",
//     width: 90,
//   },
// ];

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];

function DemoGrid({ setRow }) {
  const snap = useSnapshot(widState);

  // useEffect(()=>{
  //   snap.setRows({defaultRows});
  //   snap.setRows({defaultColumns});
  // }, [])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={{ color: "#aaa", cursor: "pointer" }}>
        <DataGrid
          autoHeight
          autoPageSize
          editMode={false}
          // disableExtendRowFullWidth={true}
          rows={[
            ...Object.keys(snap.rows).map((id) => {
              return {
                id: snap.rows[id].id,
                status: snap.rows[id]?.status,
                client: snap.rows[id]?.client,
                service: snap.rows[id]?.service,
                projectManager: snap.rows[id]?.projectManager,
                notes: snap.rows[id]?.notes,
                lastUpdate: snap.rows[id]?.lastUpdate,
                inceptionDate: snap.rows[id]?.inceptionDate,
                closingDate: snap.rows[id]?.closingDate,
                endingDate: snap.rows[id]?.endingDate,
                unbilled: snap.rows[id]?.unbilled,
                invoiced: snap.rows[id]?.invoiced,
                outstranding: snap.rows[id]?.outstranding,
                estMonthly: snap.rows[id]?.estMonthly,
              };
            }),
          ]}
          columns={snap.columns}
          pageSize={100}
          rowsPerPageOptions={[100]}
          onRowDoubleClick={(params) => {
            // setRow(params?.row)
            console.log({ onRowDoubleClick: params });
            widState.setRow(params?.row);
            widState.setDetailsView(true);
          }}
          onCellClick={(params) => {
            if (params?.field === "status") {
              widState.setRow(params?.row);
              widState.setUpdateStatus(true);
            }

            console.log({ onCellClick: params });
          }}
          // checkboxSelection
        />
      </Grid>
    </Grid>
  );
}

export default DemoGrid;
