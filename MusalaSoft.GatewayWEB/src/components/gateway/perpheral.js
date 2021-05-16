import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import "react-toastify/dist/ReactToastify.css";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Peripheral(props) {
  const [state, setState] = useState({
    StatusList: [],
    UID: "",
    Vendor: "",
    StatusID: "",
    DateCreated: new Date(),
    Status: {},
    errors: {
      UID: "",
      Vendor: "",
      StatusID: "",
    },
    invalidForm: true,
  });
  const apiURL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    fetch(`${apiURL}PeripheralStatus`)
      .then((results) => results.json())
      .then((data) => {
        if (data.length > 0) {
          setState({
            ...state,
            StatusList: data,
            Status: data[0],
            StatusID: data[0].ID,
          });
        } else setState({ ...state, StatusList: data });
      })
      .catch((err) => console.log(err));
  }, [apiURL]);
  const classes = useStyles();
  const _handleValidate = (field) => {
    let errors = state.errors;
    switch (field) {
      case "UID":
        if (!state.UID || state.UID === "") {
          errors.UID = "Required field";
        } else {
          errors.UID = "";
        }
        break;

      default:
        break;
    }
    setState({
      ...state,
      errors,
      invalidForm: state.UID === "" || errors.UID !== "",
    });
  };
  const _handleUIDChange = (e) => {
    setState({ ...state, UID: e.target.value });
  };
  const _handleVendorChange = (e) => {
    setState({ ...state, Vendor: e.target.value });
  };
  const _handleStatusIDChange = (e) => {
    let status = state.StatusList.find(
      (s) => s.ID === Number.parseInt(e.target.value)
    );
    setState({ ...state, StatusID: e.target.value, Status: status });
  };
  const _handleDateCreatedChange = (e) => {
    setState({ ...state, DateCreated: e });
  };
  const _handleSaveLocal = () => {
    let saved = props.handleSave(state);
    if (saved) {
      setState({
        StatusList: state.StatusList,
        UID: "",
        Vendor: "",
        StatusID:
          state.StatusList && state.StatusList.length > 0
            ? state.StatusList[0].ID
            : "",
        DateCreated: new Date(),
        Status:
          state.StatusList && state.StatusList.length > 0
            ? state.StatusList[0]
            : {},
        errors: {
          UID: "",
          Vendor: "",
          StatusID: "",
        },
        invalidForm: true,
      });
      props.handleClose();
    }
  };
  const _handleCloseLocal = () => {
    setState({
      StatusList: state.StatusList,
      UID: "",
      Vendor: "",
      StatusID:
        state.StatusList && state.StatusList.length > 0
          ? state.StatusList[0].ID
          : "",
      DateCreated: new Date(),
      Status:
        state.StatusList && state.StatusList.length > 0
          ? state.StatusList[0]
          : {},
      errors: {
        UID: "",
        Vendor: "",
        StatusID: "",
      },
      invalidForm: true,
    });
    props.handleClose();
  };
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={() => _handleCloseLocal()}
        aria-labelledby="form-dialog-title"
        disableBackdropClick
      >
        <DialogTitle id="form-dialog-title">Peripheral</DialogTitle>
        <DialogContent>
          <div style={{ marginBottom: "10px" }}>
            <TextField
              id="UID"
              label="UID"
              variant="outlined"
              error={state?.errors.UID !== ""}
              required
              onBlur={() => _handleValidate("UID")}
              value={state?.UID}
              helperText={state?.errors.UID}
              fullWidth
              InputProps={{
                inputComponent: NumberFormatCustom,
              }}
              onChange={(event) => _handleUIDChange(event)}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <TextField
              id="Vendor"
              label="Vendor"
              variant="outlined"
              error={state?.errors.Vendor !== ""}
              onBlur={() => _handleValidate("Vendor")}
              onChange={(event) => _handleVendorChange(event)}
              value={state?.Vendor}
              helperText={state?.errors.Vendor}
              fullWidth
            />
          </div>
          <div>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              fullWidth
            >
              <InputLabel htmlFor="outlined-age-native-simple">
                Status
              </InputLabel>
              <Select
                native
                value={state?.StatusID}
                onChange={_handleStatusIDChange}
                label="Status"
                inputProps={{
                  name: "StatusID",
                  id: "StatusID",
                }}
              >
                {state?.StatusList.map((status) => (
                  <option value={status.ID}>{status.Name}</option>
                ))}
              </Select>
            </FormControl>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                fullWidth
                margin="normal"
                id="DateCreated"
                label="Date picker dialog"
                format="MM/dd/yyyy"
                onChange={(event) => _handleDateCreatedChange(event)}
                value={state?.DateCreated}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => _handleCloseLocal()} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => _handleSaveLocal()}
            color="primary"
            disabled={state.invalidForm}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      name="UID-Name"
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      isNumericString
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
