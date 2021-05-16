import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Fab } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Peripheral from "./perpheral";
import { Redirect } from "react-router";
import { set } from "date-fns";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function GatewayAdd(props) {
  const classes = useStyles();

  const handleClickOpen = () => {
    setState({ ...state, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const handleSavePeripheral = (perpheral) => {
    let peripherals = state.Peripherals;
    if (!peripherals.find((p) => p.UID === perpheral.UID)) {
      if (props.match.params.id) {
        perpheral.GatewayID = props.match.params.id;
        fetch(`${apiURL}Peripherals`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(perpheral),
        })
          .then((results) => results.json())
          .then((data) => {
            if (data.ModelState) {
              Object.keys(data.ModelState).forEach((field) => {
                toast.error(data.ModelState[field][0], {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: false,
                  progress: undefined,
                });
              });
            } else {
              toast.success("Peripheral created. Gateway updated", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
              });
              loadFullGateway();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        peripherals.push(perpheral);
        setState({ ...state, Peripherals: peripherals });
        return true;
      }
    } else {
      toast.error("A Peripheral with this UID already exist", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
      return false;
    }
  };
  const [state, setState] = useState({
    Name: "",
    SerialNumber: "",
    IPv4: "",
    Peripherals: [],
    errors: {
      Name: "",
      SerialNumber: "",
      IPv4: "",
      Peripherals: "",
    },
    invalidForm: true,
    open: false,
    saved: false,
  });
  const apiURL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    if (props.match.params.id) {
      loadFullGateway();
    }
  }, [apiURL]);
  const loadFullGateway = () => {
    fetch(`${apiURL}Gateways/${props.match.params.id}`)
      .then((results) => results.json())
      .then((data) => {
        data.Peripherals.forEach(function (p, index) {
          this[index].DateCreated = new Date(this[index].DateCreated);
        }, data.Peripherals);
        setState({
          ...state,
          Name: data.Name,
          SerialNumber: data.SerialNumber,
          IPv4: data.IPv4,
          Peripherals: data.Peripherals,
          invalidForm: false,
          open: false
        });
      })
      .catch((err) => {
        toast.error("Not Found", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
        setState({ ...state, saved: true });
      });
  };
  const _handleNameChange = (e) => {
    setState({ ...state, Name: e.target.value });
  };
  const _handleSerialNumberChange = (e) => {
    setState({ ...state, SerialNumber: e.target.value });
  };
  const _handleIPv4Change = (e) => {
    setState({ ...state, IPv4: e.target.value });
  };
  const _handleValidate = (field) => {
    let errors = state.errors;
    switch (field) {
      case "Name":
        if (!state.Name || state.Name === "") {
          errors.Name = "Required field";
        } else {
          errors.Name = "";
        }
        break;
      case "IPv4":
        let valid = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(
          state.IPv4
        );
        if (state.IPv4 && state.IPv4 !== "" && !valid) {
          errors.IPv4 = "IP address format is invalid";
        } else {
          errors.IPv4 = "";
        }
        break;
      default:
        break;
    }
    setState({
      ...state,
      errors,
      invalidForm:
        state.Name === "" || errors.Name !== "" || errors.IPv4 !== "",
    });
  };
  const _handleSave = () => {
    if (props.match.params.id) {
      edit();
    } else {
      save();
    }
  };
  const save = () => {
    fetch(`${apiURL}Gateways`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    })
      .then((results) => results.json())
      .then((data) => {
        if (data.ModelState) {
          Object.keys(data.ModelState).forEach((field) => {
            toast.error(data.ModelState[field][0], {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
            });
          });
        } else {
          toast.success("Gateway created", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
          });
          setState({ ...state, saved: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const edit = () => {
    let editData = state;
    editData.Peripherals.splice(0);
    editData.ID = props.match.params.id;
    fetch(`${apiURL}Gateways/${props.match.params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editData),
    })
      .then((results) => results.json())
      .then((data) => {
        if (data.ModelState) {
          loadFullGateway();
          Object.keys(data.ModelState).forEach((field) => {
            toast.error(data.ModelState[field][0], {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
            });
          });
        } else {
          toast.success("Gateway updated", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
          });
          setState({ ...state, saved: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const _handleDeletePeripheral = (UID) => {
    if (props.match.params.id) {
      fetch(`${apiURL}Peripherals/${UID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((results) => results.json())
        .then((data) => {
          toast.success("Peripheral deleted. Gateway updated", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
          });
          loadFullGateway();
        })
        .catch((err) => {
          toast.error("An error has occurred, please try again", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
          });
        });
    } else {
      let per = state.Peripherals;
      let el = per.find((p) => p.UID === UID);
      if (el) {
        let index = per.indexOf(el);
        per.splice(index, 1);
      }
      setState({ ...state, Peripherals: per });
    }
  };
  if (state.saved) return <Redirect to={"/gateways"} />;
  return (
    <React.Fragment>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="Name"
          label="Name"
          variant="outlined"
          error={state?.errors.Name !== ""}
          required
          onBlur={() => _handleValidate("Name")}
          onChange={(event) => _handleNameChange(event)}
          value={state?.Name}
          helperText={state?.errors.Name}
        />
        <TextField
          id="SerialNumber"
          label="Serial number"
          variant="outlined"
          onChange={(event) => _handleSerialNumberChange(event)}
          value={state?.SerialNumber}
        />
        <TextField
          id="IPv4"
          label="IPv4"
          variant="outlined"
          error={state?.errors.IPv4 !== ""}
          onBlur={() => _handleValidate("IPv4")}
          onChange={(event) => _handleIPv4Change(event)}
          value={state?.IPv4}
          helperText={state?.errors.IPv4}
        />
      </form>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Gateways
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>UID</TableCell>
            <TableCell>Vendor</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state?.Peripherals.map((row) => (
            <TableRow key={row.UID}>
              <TableCell>{row.UID}</TableCell>
              <TableCell>{row.Vendor}</TableCell>
              <TableCell>{row.Status?.Name}</TableCell>
              <TableCell>{row.DateCreated.toLocaleDateString()}</TableCell>
              <TableCell>
                <IconButton
                  aria-label="delete"
                  color="secondary"
                  onClick={() =>
                    _handleDeletePeripheral(
                      props.match.params.id ? row.ID : row.UID
                    )
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Fab
        color="primary"
        aria-label="add"
        style={{
          alignSelf: "flex-end",
          position: "fixed",
          bottom: "100px",
        }}
        onClick={handleClickOpen}
        disabled={state?.Peripherals.length >= 10}
      >
        <AddIcon />
      </Fab>
      <Fab
        color="primary"
        aria-label="edit"
        style={{ alignSelf: "flex-end", position: "fixed" }}
        onClick={() => _handleSave()}
        disabled={state.invalidForm}
      >
        <DoneIcon />
      </Fab>
      <Peripheral
        open={state.open}
        handleClose={handleClose}
        handleSave={(perpheral) => handleSavePeripheral(perpheral)}
      />
    </React.Fragment>
  );
}
