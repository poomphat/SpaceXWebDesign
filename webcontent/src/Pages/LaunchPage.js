
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
    FormControl,
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
    },
    formInline:{
      flexDirection:'row'
    }
    
  });

export default function Launchpage() {
  const [checked,setchecked] = useState(false)
  const [hidden, setHidden] = useState(0);
  const [data, setData] = useState([[], []]);
  const [limit, setLimit] = useState(6);
  const [offSet, setOffSet] = useState(0);
  const [year, setYear] = useState([2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020]);
  const [hasMore, setHasMore] = useState(true);
  // update offset for fetch
  const incOffSet = () =>{
    setOffSet(offSet + 6);
  }
  //reset offSet 
  const resetOffset = () =>{
    setOffSet(0);
  }
  //merge launch data
  const mergeLaunch = (launchs, prev) =>{
    const merged = [...prev, ...launchs];
    return merged
  }
  //swap hasMore
  const swapHasMore = () =>{
    setHasMore(!hasMore);
  }
  //for filter
  
  const [launchYearFilter, setlaunchYearFilter] = useState('');
  const [rocketFilter, setRocketFilter] = useState('');
  const [isSuccessFilter, setIsSuccessFilter] = useState(3); 
  const changeYear = (year) =>{
    setlaunchYearFilter(year)
  }
  const changeRocket = (rocket)=>{
    setRocketFilter(rocket)
  }
  const changeSuccess = (success)=>{
    setIsSuccessFilter(success)
  }

  // fetch data
  const fechData = async (flag) =>{
    const rocketName = rocketFilter.replace(" ", "+")
    const launchUrl = "https://api.spacexdata.com/v3/launches?limit="+limit+"&offset="+offSet+((rocketName!='')?'&rocket_name='+rocketName:'')+((launchYearFilter!='')?'&launch_year='+launchYearFilter:'')+((isSuccessFilter!=3)?'&launch_success='+isSuccessFilter:'');
    console.log(launchUrl)
    const response1 = await fetch("https://api.spacexdata.com/v3/rockets");
    const rockets = await response1.json();
    const response = await fetch(launchUrl);
    const launches = await response.json();
    const response2 = await fetch("https://api.spacexdata.com/v3/launches/latest");
    const latest = await response2.json();
    if (launches.length == 0){
      swapHasMore();
    }
    let mLaunches = []
    if(flag == ''){
      mLaunches = await mergeLaunch(launches, data[1]);
    }
    else{
      mLaunches = await mergeLaunch(launches, []);
    }
    setData([rockets, mLaunches, latest]);
    setHidden(hidden+1);
    setchecked(true)
  };
  //fetch data at start 

  useEffect(() => {
    fechData('');
    setHidden(hidden+1);
  }, []);

  //fetch data when change filter
  
  useEffect(() => {
    setHasMore(true);
    setOffSet(0);
    fechData('filter');
    //setHidden(hidden+1);

  }, [launchYearFilter, rocketFilter, isSuccessFilter]);
  /*
  useEffect(() => {
    resetOffset();
    fechData();
  }, [offSet]);
  */
  
  
  //fetchMoreData for loading
  const fetchMoreData = () =>{
    incOffSet();
    fechData('');
  }
  //+"&rocket_name="+rocketName+"&launch_success="false&launch_year=2006"
    //filter
  /*
  useEffect(() => {
    const filter = () => {
      //filterSet = [year, rocket, success]
      let launches = data[1].filter(launch => launch?.launch_year.includes(launchYearFilter)
        && launch?.rocket?.rocket_name.includes(rocketFilter))
      
      if (isSuccessFilter != 0){
        launches.filter(launch => launch?.launch_year == isSuccessFilter)
      }
      setData([data[0], launches]);
    }
    filter();
  }, [launchYearFilter,rocketFilter,isSuccessFilter]);
  
  */


  const classes = useStyles();

  
  return ( 
    <div style={{width: '100vw'}} className='images'>
      <div className="container" style={{justifyContent: 'center'}}>
        <div className="row">
        <div className="row col-12">
        <div className="TitleRocket col-lg-5 col-xs-10 ml-4" style={{marginTop: '2vh',alignSelf: 'flex-end',}}> Launches</div>
        <div className="col-lg-5 col-xs-10" style={{alignSelf: 'flex-end',}}>
        <div className="formEz ml-2">
          <FormControl className=''>
          <InputLabel id='launch-year-label'>launch year</InputLabel>
          <Select id='launch-year' labelId="launch-year-label" className={classes.selectBox} onChange={(event) => {setlaunchYearFilter(event.target.value)}}>
            <MenuItem value={''}>None</MenuItem>
            {year?.map((year, index) => {
              return <MenuItem value={year}>{year}</MenuItem>
            })}
          </Select>
          </FormControl>
          <FormControl className=''>
          <InputLabel labelId="rocket-label">Rocket</InputLabel>
          <Select className={classes.selectBox} labelId="rocket-label" onChange={(event) => {setRocketFilter(event.target.value)}}>
            <MenuItem value={''}>None</MenuItem>
            {data[0]?.map((rocket, index) => {
              return <MenuItem value={rocket?.rocket_name}>{rocket?.rocket_name}</MenuItem>
            })}
          </Select>
        </FormControl>
        <FormControl className=''>
          <InputLabel labelId="success-label">isSuccess</InputLabel>
          <Select className={classes.selectBox} labelId="success-label" onChange={(event) => {setIsSuccessFilter(event.target.value)}}>
            <MenuItem value={3}>None</MenuItem>
            <MenuItem value={true} >Success</MenuItem>
            <MenuItem value={false} >Failed</MenuItem>
          </Select>
        </FormControl>
      </div></div>
  </div>
      {/* launch list */}
      <div className="col-12" style={{justifyContent: 'center', alignItems:'center'}}>
      
        <InfiniteScroll
          className=''
          style={{overflow:'hidden'}}
          dataLength={data[1].length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<p style={{ textAlign: 'center' , color:'white', }}>...Loading...</p>}
          endMessage={
            <p style={{ textAlign: 'center', color:'white',}}>
              <b>U catched 'em all</b>
            </p>
          }
        > 
        <div className='row'>
          {data[1]?.map((launch, index) => {
              return <div className="col-sm-5 col-lg-5 mt-3 mb-2 p-4 mr-3 ml-4" style={{backgroundColor:"#e0e0e0", color:'black',borderRadius: '5px'}} data-aos="zoom-in">
                      <h2>{launch?.mission_name} - {launch?.launch_year}</h2>
                      <div style={{display: 'none'}}>{hidden}</div>
                      <hr/>
                      <h5>Rocket : {launch?.rocket?.rocket_name}</h5>
                      {(launch?.launch_success)?(<h5>Result : <span className='text-success'>Success</span></h5>):(<h5> Result : <span className='text-danger'>Failed</span></h5>)}
                      <h5>Date : {new Date(launch?.launch_date_utc).toLocaleDateString()}</h5>
                     </div>
            })}
            </div>
      </InfiniteScroll>
      </div>

      </div>
      </div>
    </div>
  );
}