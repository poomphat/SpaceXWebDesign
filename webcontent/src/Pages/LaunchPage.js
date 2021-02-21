
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
    Container,
    Select,
    MenuItem,
    Checkbox,
    InputLabel,
    FormControlLabel,
  } from '@material-ui/core/';
import InfiniteScroll from 'react-infinite-scroll-component';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      marginTop: 100    ,
      backgroundColor: "#ffffff",
    },
    media: {
      height: 140,
    },
    selectBox:{
      marginTop:10,
      marginRight:20,
      width:120
    }
    
  });

export default function Launchpage() {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(6);
  const [offSet, setOffSet] = useState(0);
  // update offset for fetch
  const incOffSet = () =>{
    setOffSet(offSet + 6);
  } 
  // fetch data
  const fechData = async () =>{
    const response1 = await fetch("https://api.spacexdata.com/v3/rockets");
    const rockets = await response1.json();
    const response = await fetch("https://api.spacexdata.com/v3/Launches?limit="+limit+"&offset="+offSet);
    const launches = await response.json();
    console.log(launches)
    setData([rockets,launches]);
  };
  fechData();
  //fech data at start 
  useEffect(() => {
    fechData();

  }, []);
  const [lunchSucc, setLaunchSucc] = useState(true);
  const handleLaunchSecc = (event) => {
    setLaunchSucc(event.target.checked);
  }
  const classes = useStyles();
  const yearT = [];
  data[1]?.map((launch) => {yearT.push(launch?.launch_year)})
  const year = [... new Set(yearT)];
  return ( 
    <div style={{width: '100vw', height: '100vh'}} className='rocket'>
      <div className="container" style={{justifyContent: 'center', alignItems:'center'}}>
        <div>
          <InputLabel htmlFor='launch-year'>launch year</InputLabel>
          <Select id='launch-year' className={classes.selectBox}>
            <MenuItem value={0} selected>None</MenuItem>
            {year?.map((year, index) => {
              return <MenuItem value={year}>{year}</MenuItem>
            })}
          </Select>
          <Select className={classes.selectBox}>
            <MenuItem value={0} selected>None</MenuItem>
            {data[0]?.map((rocket, index) => {
              return <MenuItem value={rocket?.rocket_name}>{rocket?.rocket_name}</MenuItem>
            })}
          </Select>
          <FormControlLabel
          control={
            <Checkbox
              checked={lunchSucc}
              onChange={handleLaunchSecc}
              />
          }
          label="Success" 
        />

      </div>
      <div className="container" style={{justifyContent: 'center', alignItems:'center', marginTop:10}}>
        <div className="row">
        {data[1]?.map((launch, index) => {
              return <div className="col-sm-5 mt-3 mb-2 mr-5 p-4" style={{backgroundColor:"rgba(0,0,0,0.7)", color:'white'}}>
                      <h2>{launch?.mission_name} - {launch?.launch_year}</h2>
                      <h5>Rocket : {launch?.rocket?.rocket_name}</h5>
                      {(launch?.launch_success)?(<h5>Result : <span className='text-success'>Success</span></h5>):(<h5> Result : <span className='text-danger'>Failed</span></h5>)}
                      <h5>Date : {new Date(launch?.launch_date_utc).toLocaleDateString()}</h5>
                     </div>
            })}
        </div>
      </div>
    </div>
    </div>
  );
}