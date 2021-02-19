
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
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
  } from '@material-ui/core/';
import Carousel from 'react-material-ui-carousel'
import {Link} from "react-router-dom";



const useStyles = makeStyles({
      RocketBtn:{
        borderleft: "0.5rem",
        backgroundcolor:  "rgba(255,255,255,0.90)",
        padding: 30,
        borderRadius: 5,
        textAlign: "center",
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
      },
      rocketImage:{
        width:"80vw",
        height:"80vh",
        margin:25, 
        borderRadius:0,
        backgroundSize:"cover",
        backgroundPosition:"center",
      },
      paperText:{
          position:"absolute",
          top:"55vh",
          left:"10vw",
          backgroundcolor:"black",
          width:"40vw"

      }
  });
const RenderImage = (props) =>{
    const classes = useStyles();
    return (
        <Paper className={classes.rocketImage} style={{backgroundImage: "url("+props.image+")"}}>
            <div className={classes.paperText}>
                <h2>{props.rocket.rocket_name}</h2>
                <Link to={"/rocket/"+props.rocket.rocket_id} style={{ textDecoration: 'none' }}>
                    <Button className="detail">
                        View Detail
                    </Button>
                </Link>
            </div>
        </Paper>
    )
}
const RocketImage = [{
    id:1,
    url:"https://www.nasaspaceflight.com/wp-content/uploads/2017/12/BCK_4062-1.jpg"
},
{
    id:2,
    url:"https://www.drkrok.com/wp-content/uploads/2019/05/SpaceX-Falcon-9-rocket.jpg"
},
{
    id:3,
    url:"https://thestandard.co/wp-content/uploads/2018/02/NEWS-spaceX_cover_.jpg"
},
{
    id:4,
    url:"https://techcrunch.com/wp-content/uploads/2019/09/Starship-Mk1-Day.jpg?w=600"
}
]
export default function RocketMainpage() {
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
    
    return ( 
    <div className='rocket'>
    <div className="container col-12 col-sm-12 row" style={{justifyContent: 'center', paddingBottom: '50px',}}>
        
    <Carousel swipe={true} animation="slide">
        {rockets.map((rocket, index) => {
            return <RenderImage rocket={rocket} key={rocket.id} image={RocketImage.find(i => i.id == rocket.id).url}/>
                    
        })}
    </Carousel>
    </div>
    </div>
    );
  }