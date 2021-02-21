
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
  import {
    useParams
  } from "react-router-dom";

  const RocketImage = [{
    id: 'falcon1',
    url:"https://www.nasaspaceflight.com/wp-content/uploads/2017/12/BCK_4062-1.jpg",
},
{
    id: 'falcon9',
    url:"https://www.drkrok.com/wp-content/uploads/2019/05/SpaceX-Falcon-9-rocket.jpg",

},
{
    id:'falconHeavy',
    url:"https://thestandard.co/wp-content/uploads/2018/02/NEWS-spaceX_cover_.jpg",

},
{
    id:'starship',
    url:"https://techcrunch.com/wp-content/uploads/2019/09/Starship-Mk1-Day.jpg?w=600",

}
]

const useStyles = makeStyles({
    cardroot: {
        marginTop:100,
        minWidth: 100,
      },
      cardbullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      cardtitle: {
        fontSize: 14,
      },
      cardpos: {
        marginBottom: 12,
      },
      cardAction:{
        position: 'absolute',
        bottom: 0,
      },
      rocket:{
        height:"100vh",
      }
      
  });

export default function Rocketpage() {
    const [rocket, setRocket] = useState([]);
    const { rocket_id } = useParams();
    useEffect(() => {
      const fechRocket = async () =>{
        const response = await fetch("https://api.spacexdata.com/v3/rockets/"+rocket_id);
        const data = await response.json();
        setRocket(data);
      };
      fechRocket();
    }, []);
    const image = RocketImage.find(i => i.id == rocket_id).url
    const classes = useStyles();
    
    const openInfoNewTab = (url) =>{
        const win = window.open(url, "_blank");
        console.log(win)
    }
    console.log(image);
    return ( 
    <div className='container centerS'>
      <div className="TitleRocket col-lg-3 col-xs-6" style={{marginTop: '10vh'}}> {rocket.rocket_name}</div>
      <div>
      <div className="descript"> Aout this {rocket.rocket_name}</div>
      <div className="info">

      </div>
      </div>
  </div>
    );
  }