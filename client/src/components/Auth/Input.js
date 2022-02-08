import { Grid, IconButton, InputAdornment, TextField } from "@material-ui/core";
import React from "react";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

export default function Input(props) {
 
  return (
    <Grid item xs={12} sm={props.half ? 6 : 12}>
      <TextField
        name={props.name}
        onChange={props.handleChange}
        variant="outlined"
        required
        fullWidth
        label={props.label}
        autoFocus={props.autoFocus}
        type={props.type}
        InputProps={
          props.name === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={props.handleShowPassword}>
                      {props.type === "password" ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
}
