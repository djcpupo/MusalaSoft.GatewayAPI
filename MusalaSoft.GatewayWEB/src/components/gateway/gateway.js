import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import TablePagination from "@material-ui/core/TablePagination";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Redirect } from "react-router";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

function Gateway() {
  const [state, setState] = useState({
    Page: 1,
    List: [],
    Loading: true,
    PageElementsCount: 0,
    Total: 0,
    Edit: undefined,
  });
  const classes = useStyles();
  const apiURL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    fetch(`${apiURL}Gateways?page=1&count=1000`)
      .then((results) => results.json())
      .then((data) => {
        setState(data);
      })
      .catch((err) => console.log(err));
  }, [apiURL]);
  const [Page, setPage] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const _handleDeleteGateway = (ID) => {
    fetch(`${apiURL}Gateways/${ID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((results) => results.json())
      .then((data) => {
        toast.success("Gateway deleted", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
        fetch(`${apiURL}Gateways?page=1&count=1000`)
          .then((results) => results.json())
          .then((data) => {
            setState(data);
          })
          .catch((err) => console.log(err.json()));
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
  };

  const _handleEditGateway = (ID) => {
    setState({ ...state, Edit: ID });
  };
  if (state.Edit)
    return <Redirect to={"/gateway-edit/" + state.Edit} />;
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Gateways
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>IPv4</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>SerialNumber</TableCell>
            <TableCell>Peripherals</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state?.List.slice(Page * 10, Page * 10 + 10).map((row) => (
            <TableRow key={row.ID}>
              <TableCell>{row.IPv4}</TableCell>
              <TableCell>{row.Name}</TableCell>
              <TableCell>{row.SerialNumber}</TableCell>
              <TableCell>{row.Peripherals.length}</TableCell>
              <TableCell>
                <IconButton
                  aria-label="edit"
                  color="primary"
                  onClick={() => _handleEditGateway(row.ID)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  color="secondary"
                  onClick={() => _handleDeleteGateway(row.ID)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={state?.Total}
        rowsPerPage={10}
        page={Page}
        onChangePage={handleChangePage}
        rowsPerPageOptions={[10]}
      />
      <Fab
        color="primary"
        aria-label="add"
        href="/gateway-add"
        style={{ alignSelf: "flex-end", position: "fixed" }}
      >
        <AddIcon />
      </Fab>
    </React.Fragment>
  );
}

export default Gateway;
