import { Avatar, Card, CardContent, Container, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import LayersIcon from "@material-ui/icons/Layers";

function Dashboard() {
  const [state, setState] = useState({
    Page: 1,
    List: [],
    Loading: true,
    PageElementsCount: 0,
    Total: 0,
  });
  const apiURL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    fetch(`${apiURL}Gateways?page=1&count=1000`)
      .then((results) => results.json())
      .then((data) => {
        setState(data);
      })
      .catch((err) => console.log(err));
  }, [apiURL]);
  return (
    <Container maxWidth={false}>
      <Grid container spacing={3}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Grid
                container
                spacing={2}
                sx={{ justifyContent: "space-between" }}
              >
                <Grid item>
                  <Typography color="textSecondary" gutterBottom variant="h6">
                    ACTIVE GATEWAYS
                  </Typography>
                  <Typography color="textPrimary" variant="h3">
                    {state?.Total}
                  </Typography>
                </Grid>
                <Grid item>
                  <Avatar
                    sx={{
                      backgroundColor: 'secondary',
                      height: 56,
                      width: 56,
                    }}
                  >
                    <LayersIcon />
                  </Avatar>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}></Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}></Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}></Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
