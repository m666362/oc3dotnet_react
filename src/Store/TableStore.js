import { proxy } from "valtio";
import { DateTime } from "luxon";
import { devtools } from "valtio/utils";
import {
  clientList,
  defaultColumns,
  defaultRows,
  lastModifications,
  notes,
  projectManagers,
  serviceList,
  statusList,
} from "../utils/Data";
const widState = proxy({
  loading: true,
  setLoading: (bool) => {
    widState.loading = bool;
  },
  rows: {
    1: {
      id: 1,
      status: statusList[0],
      client: clientList[1],
      service: serviceList[2],
      projectManager: projectManagers[1],
      notes: notes[1],
      lastUpdate: lastModifications[2],
      inceptionDate: DateTime.now()
        .plus({ weeks: 1 })
        .toString(),
      closingDate: DateTime.now()
        .plus({ weeks: 2 })
        .toString(),
      endingDate: DateTime.now()
        .plus({ weeks: 3 })
        .toString(),
      estMonthly: "20",
      unbilled: "200",
      invoiced: "400",
      outstranding: "180",
      updates: JSON.stringify({Created: "Tyler Jones created this record"}),
      history: [
        {
          status: statusList[0],
          client: clientList[1],
          service: serviceList[2],
          projectManager: projectManagers[1],
          notes: notes[1],
          lastUpdate: lastModifications[2],
          inceptionDate: DateTime.now()
            .plus({ weeks: 1 })
            .toString(),
          closingDate: DateTime.now()
            .plus({ weeks: 2 })
            .toString(),
          endingDate: DateTime.now()
            .plus({ weeks: 3 })
            .toString(),
          estMonthly: "20",
          unbilled: "200",
          invoiced: "400",
          outstranding: "180",
          updates: JSON.stringify({Created: "Tyler Jones created this record"}),
        },
      ],
    },
    2: {
      id: 2,
      status: statusList[2],
      client: clientList[2],
      service: serviceList[1],
      projectManager: projectManagers[1],
      notes: notes[2],
      lastUpdate: lastModifications[2],
      inceptionDate: DateTime.now()
        .plus({ weeks: 4 })
        .toString(),
      closingDate: DateTime.now()
        .plus({ weeks: 5 })
        .toString(),
      endingDate: DateTime.now()
        .plus({ weeks: 6 })
        .toString(),
      estMonthly: "12",
      unbilled: "20",
      invoiced: "145",
      outstranding: "123",
      updates: JSON.stringify({Created: "Tyler Jones created this record"}),
      history: [
        {
          status: statusList[2],
          client: clientList[2],
          service: serviceList[1],
          projectManager: projectManagers[1],
          notes: notes[2],
          lastUpdate: lastModifications[2],
          inceptionDate: DateTime.now()
            .plus({ weeks: 4 })
            .toString(),
          closingDate: DateTime.now()
            .plus({ weeks: 5 })
            .toString(),
          endingDate: DateTime.now()
            .plus({ weeks: 6 })
            .toString(),
          estMonthly: "12",
          unbilled: "20",
          invoiced: "145",
          outstranding: "123",
          updates: JSON.stringify({Created: "Tyler Jones created this record"})
        },
      ],
    },
  },
  addRows: (row) => {
    let tempRow = { ...widState.rows, [row.id]: row };
    console.log({ tempRow: JSON.stringify(tempRow) });
    widState.rows = JSON.parse(JSON.stringify(tempRow));
  },
  currentUser: projectManagers[0],
  setCurrentUser: (currentUser) => {
    widState.currentUser = currentUser;
  },
  updateRow: (row) => {
    console.log({ updatedRow: row });
    widState.rows[row?.id] = {
      ...row,
      history: [
        ...widState.rows[row?.id]?.history,
        {
          status: row?.status,
          client: row?.client,
          service: row?.service,
          projectManager: row?.projectManager,
          notes: row?.notes,
          lastUpdate: row?.lastUpdate,
          who: row?.who,
          when: row?.when,
          updates: row?.updates
        },
      ],
    };
    console.log({ rows: widState.rows, row });
  },
  deleteRow: (row) => {
    delete widState.rows[row?.id];
  },
  columns: defaultColumns,
  setColumns: (columns) => {
    widState.columns = columns;
  },
  row: {},
  setRow: (row) => {
    widState.row = widState.rows[row?.id];
  },
  // addRow: (row)=>{
  //   widState.rows = row
  // },
  updateStatus: false,
  setUpdateStatus: (bool) => {
    widState.updateStatus = bool;
  },
  detailsView: false,
  setDetailsView: (bool) => {
    widState.detailsView = bool;
  },
  sheduleFollowUp: false,
  setScheduleFollowUp: (bool) => {
    widState.setScheduleFollowUp = bool;
  },
  //   bread: [{ name: "My Folder", id: "0fx6ef888f9bfcdb040bd9084653db3c65a8c" }],
  //   listView: true,
  //   apiData: {},
  //   id: "",
  //   token: "",
  //   userToken: "",
  //   pasteOpen: false,
  //   settingData: {},
  //   orgId: "",
  //   apiKey: "",
  //   apiDomain: "",
  //   setSettingData: (settingId, key, value) => {
  //     let tempData = widState.settingData?.[settingId] || {};
  //     tempData[key] = value;
  //     widState.settingData[settingId] = tempData;
  //   },
  //   setRootBread: (id) => {
  //     widState.bread = [{ name: "Base Directory", id: id }];
  //   },
  //   setBreadCrumbs: (folder) => {
  //     widState.bread = [].concat(widState.bread, [
  //       { name: folder?.name, id: folder?.id },
  //     ]);
  //   },
  //   setBreadCrumbsUrl: (folder) => {
  //     let my_array = [];
  //     for (let index = 0; index < widState.bread.length; index++) {
  //       const element = widState.bread[index];
  //       if (element.id !== folder.id) my_array.push(element);
  //       else {
  //         my_array.push(element);
  //         break;
  //       }
  //     }
  //     widState.bread = my_array;
  //   },
  //   setListView: (bool) => {
  //     widState.listView = bool;
  //   },
  //   setApiData: (folderId, data) => {
  //     widState.apiData[folderId] = data;
  //   },
  //   setId: (id) => {
  //     widState.id = id;
  //   },

  //   setToken: (data) => {
  //     widState.token = data;
  //   },
  //   setUserToken: (data) => {
  //     widState.userToken = `Bearer ${data}`;
  //   },
  //   setPasteOpen: (bool) => {
  //     widState.pasteOpen = bool;
  //   },
  //   setInitializeData: (settings) => {
  //     let tempData = {};
  //     settings.forEach((setting) => {
  //       tempData[setting?.settingId] = {
  //         ...widState?.settingData?.[setting?.settingId],
  //         ...{
  //           rootFolderId: setting?.rootFolderId,
  //           name: setting?.Name,
  //           userAccessToken: setting?.userAccessToken,
  //           breadCrumbs: [],
  //           previousData: {},
  //           listView: true,
  //           thumbnailUrls: {},
  //           downloadUrls: {},
  //         },
  //       };
  //     });
  //     widState.settingData = tempData;
  //   },
  //   // setApiSettingData: (settingId, folder, apiData) => {
  //   //   let folderId = folder?.id ? folder?.id : folder;
  //   //   let tempData = {
  //   //     ...widState.settingData,
  //   //     [settingId]: {
  //   //       ...widState.settingData?.[settingId],
  //   //       previousData: {
  //   //         ...widState.settingData?.[settingId]?.previousData,
  //   //         [folderId]: [...apiData],
  //   //       },
  //   //       breadCrumbs: [].concat(widState.settingData?.[settingId]?.breadCrumbs, [
  //   //         {
  //   //           name: folder?.name ? folder.name : "My Folder",
  //   //           id: folderId,
  //   //         },
  //   //       ]),
  //   //     },
  //   //   };
  //   //   widState.settingData = tempData;
  //   // },
  //   setApiSettingData: (settingId, folder, apiData) => {
  //     const folderId = folder?.id ? folder?.id : folder;
  //     widState.settingData[settingId].previousData[folderId] = [
  //       ...(widState.settingData[settingId].previousData[folderId] || []),
  //       ...apiData,
  //     ];
  //     widState.settingData[settingId].breadCrumbs = [
  //       ...(widState.settingData[settingId].breadCrumbs || []),
  //       {
  //         name: folder?.name || "My Folder",
  //         id: folderId,
  //       },
  //     ];
  //   },
  //   setLoadedFolderBreadCrumbs: (settingId, folder, apiData) => {
  //     const folderId = folder?.id ? folder?.id : folder;
  //     widState.settingData[settingId].previousData[folderId] = [...apiData];
  //     widState.settingData[settingId].breadCrumbs = [
  //       ...(widState.settingData[settingId].breadCrumbs || []),
  //       {
  //         name: folder?.name || "My Folder",
  //         id: folderId,
  //       },
  //     ];
  //   },
  //   setBreadCrumbsSettingData: (settingId, folder) => {
  //     let my_array = [];
  //     for (
  //       let i = 0;
  //       i < widState.settingData?.[settingId].breadCrumbs.length - 1;
  //       i++
  //     ) {
  //       const element = widState.settingData?.[settingId].breadCrumbs?.[i];
  //       if (element.id !== folder.id) my_array.push(element);
  //       else {
  //         my_array.push(element);
  //         break;
  //       }
  //     }
  //     widState.settingData = {
  //       ...widState.settingData,
  //       [settingId]: {
  //         ...widState.settingData?.[settingId],
  //         breadCrumbs: my_array,
  //       },
  //     };
  //   },
  //   setViewSettingData: (settingId, bool) => {
  //     widState.settingData = {
  //       ...widState.settingData,
  //       [settingId]: {
  //         ...widState.settingData?.[settingId],
  //         listView: bool,
  //       },
  //     };
  //   },
  //   setAddItemSettingData: (settingId, folder, apiData) => {
  //     let folderId = folder?.id ?? folder;
  //     widState.settingData[settingId].previousData[folderId] = apiData;
  //   },
  //   setThumbNail: (settingId, file, thumbnail_url) => {
  //     widState.settingData[settingId].thumbnailUrls[file?.id] = thumbnail_url;
  //   },
  //   setDownloadedImage: (settingId, file, download_url) => {
  //     widState.settingData[settingId].downloadUrls[file?.id] = download_url;
  //   },
});
const unsub = devtools(widState, "Table State");
export { widState };
