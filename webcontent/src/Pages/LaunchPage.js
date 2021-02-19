
import '../content.css'
import React from 'react';
import { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import rocket from '../asset/image/rocket.jpg'
import {
    Card,
    CardActions,
    CardContent,
    Typography,
    Button,
    Icon,
  } from '@material-ui/core/';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      marginTop: 100    ,
      backgroundColor: "#ffffff",
    },
    media: {
      height: 140,
    },
  });

export default function Launchpage() {
  const [rockets, setRockets] = useState([]);
  useEffect(() => {
    const fechRocket = async () =>{
      const response = await fetch("https://api.spacexdata.com/v3/rockets");
      const data = await response.json();
      setRockets(data);
    };
    fechRocket();
  }, []);

  const classes = useStyles();
  
  const openInfoNewTab = (url) =>{
      const win = window.open(url, "_blank");
      console.log(win)
  }

  return ( 
  <div className='rocket'>
  <div className="container col-12 col-sm-12 row" style={{justifyContent: 'center', paddingBottom: '50px',}}>
      {rockets.map((rocket) => {
          return <Card style={{marginTop:70,alignSelf: 'space-between',backgroundColor: 'rgba(255,255,255,0.75)'}} className="col-lg-6 col-sm-12 ml-5 ">
                      <CardContent>
                          <Typography  color="textSecondary" gutterBottom>
                          </Typography>
                          <Typography variant="h5" component="h2">
                          {rocket.rocket_name}
                          </Typography>
                          <Typography  color="textSecondary">
                          Type : {rocket.rocket_type}
                          </Typography>
                          <Typography component="p">
                          {rocket.description}
                          </Typography>
                          <Typography  color="textSecondary">
                          First Flight : {rocket.first_flight}
                          </Typography>
                          <Typography  color="textSecondary">
                          Launch Country : {rocket.country}
                          </Typography>
                          <Typography  color="textSecondary">
                          Active : {rocket.active ? <Icon color='primary' >done</Icon>:<Icon color='error'>close</Icon>}
                          </Typography>
                          <br/>
                      </CardContent>
                      <CardActions className={classes.cardAction}>
                      <Button size="small" color='primary' onClick={() => openInfoNewTab(rocket.wikipedia)}>Learn More</Button>
                      </CardActions>
                  </Card>
      })}
    </div></div>
  );
}