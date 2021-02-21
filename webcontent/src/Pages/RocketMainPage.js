
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
const RocketImage = [{
    id:1,
    url:"https://www.nasaspaceflight.com/wp-content/uploads/2017/12/BCK_4062-1.jpg",
    name : 'Falcon 1'
},
{
    id:2,
    url:"https://www.drkrok.com/wp-content/uploads/2019/05/SpaceX-Falcon-9-rocket.jpg",
    name : 'Falcon 9'
},
{
    id:3,
    url:"https://thestandard.co/wp-content/uploads/2018/02/NEWS-spaceX_cover_.jpg",
    name : 'Falcon Heavy' 
},
{
    id:4,
    url:"https://techcrunch.com/wp-content/uploads/2019/09/Starship-Mk1-Day.jpg?w=600",
    name : 'Starship'
}
]


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
        width:"98vw",
        height:"87vh",
        margin: '1vw', 
        borderRadius:0,
        backgroundSize:"cover",
        backgroundPosition:"center",
      },
      paperText:{
        position:"absolute",
        top:"65vh",
        left:"1vw",
        backgroundcolor:"black",
        width:"40vw",
        textAlign:"right"
      }
  });
const RenderImage = (props) =>{
    const classes = useStyles();
    return (
        <Paper className={classes.rocketImage} style={{backgroundImage: "url("+props.image+")"}}>
            <div className={classes.paperText} style={{backgroundColor: 'rgba(0,0,0,0.75)',padding: '10px',color: 'white'}}>
                <h2>{RocketImage[props.index].name}</h2>
                <Link to={"/rocket/"+props.rocket.rocket_id} style={{ textDecoration: 'none'}}>
                    <Button className="detail" style={{color: 'white'}}>
                        View Detail
                    </Button>
                </Link>
            </div>
        </Paper>
    )
}

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

    <Carousel swipe={true} animation="slide">
        {rockets.map((rocket, index) => {
            return <RenderImage rocket={rocket} key={rocket.id} image={RocketImage.find(i => i.id == rocket.id).url} index={index}/>
                    
        })}
    </Carousel>

    );
  }