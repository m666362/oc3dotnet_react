import { DateTime } from "luxon";
const defaultColumns = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "status",
    headerName: "Status",
    sortable: true,
    filterable: false,
    width: 150,
    editable: true,
  },
  {
    field: "client",
    headerName: "Client",
    width: 150,
    editable: true,
  },
  {
    field: "service",
    headerName: "Service",
    showColumns: false,
    width: 150,
    editable: true,
  },
  {
    field: "projectManager",
    headerName: "Project Manager",
    width: 150,
    editable: true,
  },
  {
    field: "notes",
    headerName: "Notes",
    width: 300,
    editable: true,
  },
  {
    field: "lastUpdate",
    headerName: "Last Update",
    width: 300,
    editable: true,
  },
  {
    field: "inceptionDate",
    headerName: "Inception Date",
    width: 150,
    editable: true,
  },
  {
    field: "closingDate",
    headerName: "Closing Date",
    width: 150,
    editable: true,
  },

  {
    field: "endingDate",
    headerName: "Ending Date",
    width: 150,
    editable: true,
  },

  {
    field: "estMonthly",
    headerName: "EST Monthly",
    type: "number",
    width: 60,
    editable: true,
  },
  {
    field: "unbilled",
    headerName: "Unbilled",
    type: "number",
    width: 60,
    editable: true,
  },
  {
    field: "invoiced",
    headerName: "Invoiced",
    type: "number",
    width: 60,
    editable: true,
  },
  {
    field: "outstranding",
    headerName: "Outstranding",
    type: "number",
    width: 60,
    editable: true,
  },
  // estMonthly: "",
  // unbilled: "",
  // invoiced: "",
  // outstranding: "",

  // {
  //   field: "age",
  //   headerName: "Age",
  //   sortable: true,
  //   type: "number",
  //   width: 110,
  //   editable: true,
  // },
  // {
  //   field: "fullName",
  //   headerName: "Full name",
  //   description: "This column has a value getter and is not sortable.",
  //   sortable: true,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  // }
];
// status client service projectManager notes lastUpdate
const statusList = [
  "Lead",
  "Expansion",
  "Pre-Onboarding",
  "Pending Deal",
  "Onboarding",
  "Cruising",
  "Turbulence",
  "Offboarding",
  "Project Ended",
  "Lost Deal",
];
const dateTrackerBasedOnStatus = {
  Lead: "closingDate",
  Expansion: "closingDate",
  Offboarding: "endingDate",
  "Project Ended": "endingDate",
  "Lost Deal": "endingDate",
};
const clientList = ["ABC Corporation", "XYZ Org", "Rodgers & Co."];
const serviceList = ["Machine Operation", "Overhaul", "Development"];
const projectManagers = ["Tyler Jones", "lisa Smith", "Jenifer lawrence"];
const notes = ["note 1", "note 2", "note 3"];
const lastModifications = [
  "Wed, Aug 3, 2022, 4:14 PM by Tyler Jones",
  "Thu, Aug 4, 2022, 2:20 PM by Tyler Jones",
  "Fri, Aug 5, 2022, 5:55 PM by Tyler Jones",
];
const defaultRows = [
  {
    id: 1,
    status: statusList[0],
    client: clientList[1],
    service: serviceList[2],
    projectManager: projectManagers[1],
    notes: notes[1],
    lastUpdate: lastModifications[1],
  },
  {
    id: 2,
    status: statusList[2],
    client: clientList[2],
    service: serviceList[1],
    projectManager: projectManagers[1],
    notes: notes[2],
    lastUpdate: lastModifications[2],
  },
  //   {
  //     id: 3,
  //     status: statusList[5],
  //     client: clientList[0],
  //     service: serviceList[0],
  //     projectManager: projectManagers[1],
  //     notes: notes[0],
  //     lastUpdate: lastModifications[1],
  //   },
  //   {
  //     id: 4,
  //     status: statusList[3],
  //     client: clientList[2],
  //     service: serviceList[2],
  //     projectManager: projectManagers[2],
  //     notes: notes[1],
  //     lastUpdate: lastModifications[2],
  //   },
  //   {
  //     id: 5,
  //     status: statusList[5],
  //     client: clientList[0],
  //     service: serviceList[0],
  //     projectManager: projectManagers[1],
  //     notes: notes[2],
  //     lastUpdate: lastModifications[0],
  //   },
  //   {
  //     id: 6,
  //     status: statusList[6],
  //     client: clientList[1],
  //     service: serviceList[1],
  //     projectManager: projectManagers[0],
  //     notes: notes[0],
  //     lastUpdate: lastModifications[1],
  //   },
  //   {
  //     id: 7,
  //     status: statusList[1],
  //     client: clientList[2],
  //     service: serviceList[0],
  //     projectManager: projectManagers[1],
  //     notes: notes[1],
  //     lastUpdate: lastModifications[0],
  //   },
  //   {
  //     id: 8,
  //     status: statusList[0],
  //     client: clientList[2],
  //     service: serviceList[2],
  //     projectManager: projectManagers[2],
  //     notes: notes[0],
  //     lastUpdate: lastModifications[2],
  //   },
  //   {
  //     id: 9,
  //     status: statusList[0],
  //     client: clientList[0],
  //     service: serviceList[2],
  //     projectManager: projectManagers[0],
  //     notes: notes[0],
  //     lastUpdate: lastModifications[0],
  //   },
  //   {
  //     id: 10,
  //     status: statusList[4],
  //     client: clientList[1],
  //     service: serviceList[1],
  //     projectManager: projectManagers[0],
  //     notes: notes[2],
  //     lastUpdate: lastModifications[0],
  //   },
  //   {
  //     id: 11,
  //     status: statusList[0],
  //     client: clientList[2],
  //     service: serviceList[0],
  //     projectManager: projectManagers[1],
  //     notes: notes[1],
  //     lastUpdate: lastModifications[1],
  //   },
  //   {
  //     id: 12,
  //     status: statusList[2],
  //     client: clientList[2],
  //     service: serviceList[0],
  //     projectManager: projectManagers[0],
  //     notes: notes[2],
  //     lastUpdate: lastModifications[2],
  //   },
];

export {
  defaultRows,
  defaultColumns,
  statusList,
  clientList,
  serviceList,
  projectManagers,
  notes,
  lastModifications,
  dateTrackerBasedOnStatus
};
