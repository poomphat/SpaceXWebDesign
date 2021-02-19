
import '../content.css'
import React from 'react';
import { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import elon from '../asset/image/Elon.png'
import space from '../asset/image/space.png'
import logo from '../asset/image/logo.png'
import {Link} from "react-router-dom";


export default function Mainpage() {
    const [data, setData] = useState([]);
    useEffect(() => {
      const fechData = async () =>{
        const response1 = await fetch("https://api.spacexdata.com/v3/rockets");
        const data1 = await response1.json();
        const response2 = await fetch("https://api.spacexdata.com/v3/missions");
        const data2 = await response2.json();
        const response3 = await fetch("https://api.spacexdata.com/v3/info");
        const data3 = await response3.json();
        setData([data1,data2,data3]);
      };
      fechData();
      
    }, []);
    return (
      <div className="centerS">
         {console.log(data)}
         <div className="row">
         <img src={space} className="firstpic col-12"></img>
         </div>
         <div className="mainContent row">
           <div className="col-xs-5 col-lg-4">
           <img src={logo} style={{width:'100%'}}></img>
           </div>
           <div style={{flexdirection: 'row',display: 'flex'}}>
            <div className="contentFirst">
              <h5>Total Mission : {data[1]?.length}</h5>
            </div>
            <Link to="/rocket" style={{ textDecoration: 'none' }}>
            <div className="contentFirst">
              <h5>Total Rocket : {data[0]?.length}</h5>
            </div>
            </Link>
           </div>
         </div> 
         <div style={{display: 'flex',alignSelf: 'center',marginTop: '100px',fontSize: 48, color: 'white'}}>
         <p>Co-Founder</p>
         </div>
         <div className="mainDesElon row">
    
           <div className="textElon col-xs-11 col-lg-6">
             <h1>{data[2]?.founder}</h1>
             <hr color="white"></hr>
           <h5>นักธุรกิจทรงอิทธิพลชาวอเมริกันแคนาคาแอฟริกาใต้คนหนึ่งซึ่งกำลังมีชื่อเสียงมากในขณะนี้ เหตุผลสำคัญที่สิ่งที่เขาคิดและทำนั้นเรียกได้ว่าเป็นนวัตกรรมแบบ “เปลี่ยนโลก” 
             ผลงานหลักที่ไม่พูดถึงไม่ได้ของเขาได้แก่ TESLA ผู้ผลิตรถยนต์ไฟฟ้าที่ปลุกกระแสรถยนต์พลังงานสะอาดจนโด่งดังในปัจจุบัน PAYPAL ผู้ให้บริการช่องทางการชำระเงินออนไลน์จนกลายเป็นธุรกิจสำคัญในโลกยุคดิจิตัล 
             และ SPACEX ผู้ให้บริการประสบการณ์การเดินทางในอวกาศ 
             ด้วยปรัชญาที่จะสร้างการเดินทางสู่ดาวดวงอื่นด้วยราคาประหยัด</h5></div>
         <img src={elon} className="elonpic"></img>
         </div>
         <div style={{display: 'flex',alignSelf: 'center', color: 'white',flexDirection: 'column',marginBottom: '50px'}}>
         <h1>About SpaceX</h1>
         <p>{data[2]?.summary} </p>
         <div style={{display: 'flex',}} className="row">
            <div  className="about col-xs-10 col-lg-2 mt-4">founded : {data[2]?.founded}</div>
            <div  className="about col-xs-10 col-lg-2 mt-4">employees : {data[2]?.employees}</div> 
            <div  className="about col-xs-10 col-lg-2 mt-4">valuation : {data[2]?.valuation/1000000000} Billion USD</div>
            {console.log(data[2]?.headquarters)}
            <div  className="about col-xs-10 col-lg-2 mt-4">Address : {data[2]?.headquarters?.address}</div> 
            <div  className="about col-xs-10 col-lg-2 mt-4">Address : {data[2]?.headquarters?.city}</div> 
            <div  className="about col-xs-10 col-lg-2 mt-4">Address : {data[2]?.headquarters?.state}</div> </div>
      
         </div>
      </div>
    );
  }