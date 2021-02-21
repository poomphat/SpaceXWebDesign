
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
    <div className='images' style={{width: '100vw',paddingBottom: '20vh'}}>
      <div className='container'>
      <div className="row ml-1 mr-1">
      <div className="TitleRocket col-lg-10 col-xs-11 ml-4" style={{marginTop: '2vh'}}> {rocket.rocket_name}</div>
      <div className="descript col-lg-5 col-xs-11 ml-4"> <h4>About this {rocket.rocket_name}</h4> 
        <hr color="black"/>
        <div className="info">
            <div>Status : {(rocket.active)? 'Activate' : 'Not Activate'}</div>
            <div>First Flight : {rocket.first_flight} </div>
            <div>Cost per launch : {rocket.cost_per_launch/1000000} Millions USD</div>
            <div>Height : {rocket.height?.meters} meters</div>
            <div>diameter : {rocket.diameter?.meters} meters</div>
            <br/>
            <br/>
            <Button className="detail" variant="outlined" style={{color: 'black', position: 'absolute',bottom: '10px',borderColor: 'black'}} onClick={() => openInfoNewTab(rocket.wikipedia)}>
                        View Detail
                    </Button>
            </div>
          </div>
        <div className="descript col-lg-5 col-xs-11 ml-4">
          <img src={rocket.flickr_images} style={{width: '100%',borderRadius: '5px'}}/>
          </div>
      </div>
     <div className="row ml-1 mr-1">
      <div className="descript col-lg-5 col-xs-11 ml-4"> <h4>First stage</h4> 
        <hr color="white"/>
        <div className="info">
            <div>Reusable : {(rocket.first_stage?.reusable)? 'Yes' : 'No'}</div>
            <div>engines : {rocket.first_stage?.engines} </div>
            <div>Fuel amount tons : {rocket?.first_stage?.fuel_amount_tons} Tons</div>
            <div>burn time per sec : {rocket?.first_stage?.burn_time_sec} seconds</div>
            </div>
          </div>
        <div className="descript col-lg-5 col-xs-11 ml-4">
      <h4>Second stage</h4> 
          <hr color="white"/>
        <div className="info">
            <div>Reusable : {(rocket.second_stage?.reusable)? 'Yes' : 'No'}</div>
            <div>engines : {rocket.second_stage?.engines} </div>
            <div>Fuel amount tons : {rocket?.second_stage?.fuel_amount_tons} Tons</div>
            <div>burn time per sec : {rocket?.second_stage?.burn_time_sec} seconds</div>
            </div>
            </div>
    </div></div>
      
  </div>
    );
  }