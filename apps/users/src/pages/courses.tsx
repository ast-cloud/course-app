import  { useEffect, useState } from 'react';
import { Typography, Card, CardMedia, CardContent, Tab, Tabs, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import {selectedCourseTab} from 'store';
import { useSession } from 'next-auth/react';
import {useRouter} from 'next/router';
import { CourseCard, Footer } from 'ui';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';


type CourseCardInfo = {
  _id: string;
  title: string;
  author: string;
  imageLink: string;
  price: string;
  discountedPrice: string;
}

export default function Courses({session}: any) {

    // const session = useSession();

    const [courses, setCourses] = useState<undefined|null|CourseCardInfo[]>(undefined);
    const [purchasedCourses, setPurchasedCourses] = useState<undefined|null|CourseCardInfo[]>(undefined);
  
    const [selectedTab, setSelectedTab] = useRecoilState(selectedCourseTab);
  
  
    useEffect(function(){
      const fetchData = async function (){
  
        var allCourses = await axios.get('/api/courses');
  
        if(allCourses.status==200){
          setCourses(allCourses.data.courses);
        }
        else{
          setCourses(null);
        }
        
        try{

          var pCoursesDetails = await axios.get('/api/purchasedCoursesDetails');
          
          if(pCoursesDetails.status==200){
            setPurchasedCourses(pCoursesDetails.data.purchasedCoursesDetails);
          }
          else{
            setPurchasedCourses(null);
          }

        }catch(error){
          setPurchasedCourses(null);
        }

      }

      fetchData();
      
    },[]);
  
    useEffect(function(){
      console.log('purchasedCourses variable changed - '+JSON.stringify(purchasedCourses));
    },[purchasedCourses]);
  
  
    const handleTabChange = (event: React.SyntheticEvent, newValue: any) => {
      setSelectedTab(newValue);
    };
  
  
  
    if(courses===undefined){
      return(
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:'20%'}}>
          <CircularProgress/>
        </div>
      )
    }
    else if(courses===null){
      return(
        <div>
          Cannot load data.
        </div>
      )
    }
    else{
      return (
        <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between'}}>

          <div style={{marginTop:'4vh'}}>
            <Tabs value={selectedTab} onChange={handleTabChange} centered sx={{display:'flex', justifyContent: 'space-between'}}>
              <Tab label="Courses" />
              {session && <Tab label="Purchased Courses" />}
            </Tabs>
          </div>
            
            {selectedTab === 0 && <div style={{display:'flex', justifyContent:'space-around', flexWrap:'wrap', marginLeft:80, marginRight:80 }}> {courses.map(c => <div key={c._id}> <CourseCard id={c._id} title={c.title} image={c.imageLink} author={c.author} price={c.price} discountedPrice={c.discountedPrice} /> </div>)} </div>}
  
            {selectedTab === 1 && purchasedCourses && <div style={{display:'flex', justifyContent:'space-around', flexWrap:'wrap', marginLeft:80, marginRight:80 }}> {purchasedCourses.map(c => <div key={c._id}> <CourseCard id={c._id} title={c.title} image={c.imageLink} author={c.author} price={c.price} discountedPrice={c.discountedPrice} /> </div>)} </div>}
  
            {selectedTab === 1 && purchasedCourses===undefined && <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:'20%'}}> <CircularProgress/> </div> }

            {selectedTab === 1 && purchasedCourses===null && <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:'20%'}}> Could not load data! </div> }

            {selectedTab === 1 && purchasedCourses?.length==0 && <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'64vh', border:'0px solid black'}}> No purchased courses yet! </div> }
            
        </div>
      )
    }
  
    
  }
  
  export async function getServerSideProps(context: any){
  
    const session = await getServerSession(context.req, context.res, authOptions);  
    console.log('Inside getServerSideProps, session - ', session);
    return { props: {session} };
  }
  