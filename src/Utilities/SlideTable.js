import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { widState } from "../Store/TableStore";
import { useSnapshot } from "valtio";
import TextFieldController from "../Form/TextFieldController";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [createData("Frozen yoghurt", 159, 6.0, 24, 4.0)];

function SlideTable({ control }) {
  const snap = useSnapshot(widState);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Unbilled</TableCell>
            <TableCell>Invoice</TableCell>
            <TableCell>Outstanding</TableCell>
            <TableCell>EST Monthly</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            key={snap?.row?.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            {["unbilled", "invoiced", "outstranding", "estMonthly"].map(
              (amount) => (
                <TableCell component="th" scope="row" sx={{ maxWidth: 65 }}>
                  <TextFieldController
                    control={control}
                    name={amount}
                    defaultValue={snap?.row?.[amount]}
                    type={"number"}
                    variant={"standard"}
                  />
                </TableCell>
              )
            )}
            {/* <TableCell component="th" scope="row" sx={{ maxWidth: 65 }}>
              <TextFieldController
                control={control}
                name={"unbilled"}
                defaultValue={snap?.row?.unbilled}
                type={"number"}
              />
            </TableCell>
            <TableCell sx={{ maxWidth: 65 }}>
              <TextFieldController
                control={control}
                name={"invoiced"}
                defaultValue={snap?.row?.invoiced}
                type={"number"}
              />
            </TableCell>
            <TableCell sx={{ maxWidth: 65 }}>
              <TextFieldController
                control={control}
                name={"outstranding"}
                defaultValue={snap?.row?.outstranding}
                type={"number"}
              />
            </TableCell>
            <TableCell sx={{ maxWidth: 65 }}>
              <TextFieldController
                control={control}
                name={"estMonthly"}
                defaultValue={snap?.row?.estMonthly}
                type={"number"}
              />
            </TableCell> */}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
// control, name, label, defaultValue, type="text"
export default SlideTable;
