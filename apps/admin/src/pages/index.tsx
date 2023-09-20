import { useEffect, useState } from 'react';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { Typography, CircularProgress, useMediaQuery, Button } from '@mui/material';
import { useRecoilState } from 'recoil';
import { isAdminLoggedInState } from '@/store/atoms/user';
import {useRouter} from 'next/router';
import axios from 'axios';
import { CourseCard } from '@/components/CourseCard';


type CourseCardInfo = {
  _id: string;
  title: string;
  author: string;
  imageLink: string;
  price: string;
  discountedPrice: string;
}

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isAdminLoggedInState);
  const [allCourses, setAllCourses] = useState<undefined|null|CourseCardInfo[]>(undefined);
    
  
  const isSmallScreen = useMediaQuery('(max-width: 600px)');

  useEffect(function(){

    const fetchData = async function(){

      try{
        var me = await axios.get('/api/me', {
          headers:{
            'Authorization':'Bearer '+localStorage.getItem('token')
          }
        });
        if(me.status==200){
          setIsLoggedIn(true);
        }
        else{
          setIsLoggedIn(false);
          router.push('/login');
        }
      }catch(e){
        setIsLoggedIn(false);
        router.push('/login');
      }

      if(isLoggedIn){
        try{
          var all_courses = await axios.get('/api/allCourses', {
            headers:{
              'Authorization':'Bearer '+localStorage.getItem('token')
            }
          });
          if(all_courses.status==200){
            setAllCourses(all_courses.data.courses);
          }
          else{
            setAllCourses(null);
          }
        }catch(e){
          setAllCourses(null);
        }
      }


    }
    
    fetchData();

  },[isLoggedIn]);

  return (
    <>
      <div style={{display:'flex', justifyContent:isSmallScreen ? 'space-between' : 'space-between', marginTop:'7vh', marginLeft:isSmallScreen ? '0' : '5vw', marginRight:isSmallScreen ? '0' : '5vw', fontWeight:'lighter'}}>
        <Typography variant='h5' fontWeight='normal'>All courses</Typography>
        <Button variant='outlined' size='small' sx={{textTransform:'none', fontSize:'15px'}} onClick={()=>{router.push('/addcourse')}}>Add course</Button>
      </div>

      {allCourses===undefined && <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:'20%'}}> <CircularProgress/> </div>}

      {allCourses===null && <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:'20%'}}> Could not load data! </div>}
      
      {allCourses && <div style={{display:'flex', justifyContent:'space-around', flexWrap:'wrap', marginLeft:80, marginRight:80 }}> {allCourses.map(c => <div key={c._id}> <CourseCard id={c._id} title={c.title} image={c.imageLink} author={c.author} price={c.price} discountedPrice={c.discountedPrice} /> </div>)} </div>}
    </>
  )
}
