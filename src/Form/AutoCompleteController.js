import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import { useSnapshot } from "valtio";
import { widState } from "../Store/TableStore";


function AutoCompleteController({control, name, label="", options, defaultValue="" }) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue??options?.[0]}
      render={({ field }) => {
        return (
          <Autocomplete
            {...field}
            options={options}
            getOptionLabel={(option) => (option?.name ? option.name : option)}
            onChange={(_, data) => field.onChange(data)}
            size="small" 
            renderInput={(params) => (
              <TextField {...params} label={label} size="small" required />
            )}
          />
        );
      }}
    />
  );
}

export default AutoCompleteController;
