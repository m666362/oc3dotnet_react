import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

function TextFieldController({
  control,
  name,
  label = "",
  defaultValue,
  type = "text",
  fullWidth = false,
  variant = "outlined",
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      defaultValue={defaultValue}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth={fullWidth}
          required
          label={label}
          type={type}
          size="small"
          placeholder={defaultValue}
          variant={variant}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">$</InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}

export default TextFieldController;
