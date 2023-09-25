import { Inter } from 'next/font/google';
import {signIn, useSession, signOut} from 'next-auth/react';
import { Grid, Button, Typography, CircularProgress } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { CourseCard } from 'ui';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import  { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';



const inter = Inter({ subsets: ['latin'] });

type CourseCardInfo = {
  _id: string;
  title: string;
  author: string;
  imageLink: string;
  price: string;
  discountedPrice: string;
}

export default function Home({session}: any) {

  //const session = useSession(); //session.data can be used to check login/logout state of the user

  const [featuredCourses, setFeaturedCourses] = useState<undefined|null|CourseCardInfo[]>(undefined);

  useEffect(function(){
    const fetchData = async function(){
      var ftCourses = await axios.get('/api/featuredCourses');
      if(ftCourses.status==200){
        console.log('ftCourses.data - ', JSON.stringify(ftCourses.data))
        setFeaturedCourses(ftCourses.data.courses);
      }
      else{
        setFeaturedCourses(null);
      }
    }
    console.log('featuredCourses before fetchData() call - ', featuredCourses);
    try{
      fetchData();
    }catch(e){
      setFeaturedCourses(null);
    }
    console.log('featuredCourses - ', featuredCourses);
  },[]);


  console.log('Inside Home component, session - '+JSON.stringify(session));

  return ( <>{session ? <div style={{}}><Slides></Slides></div>
    : <div>
        <Grid container style={{marginTop:70, marginBottom:0, marginLeft:0, marginRight:0}}>

          <Grid item container xs={12} md={4} sx={{order:{xs: 2, md: 1}, height:{xs:'40vh', md:'50vh'}, backgroundColor:'', display:'flex', flexDirection:'column'}} justifyContent='space-evenly' alignItems='center'>
                <div style={{marginTop:0}}>  
                  <Typography variant='h5' style={{fontWeight: 'normal', alignSelf:'center'}}>A place to learn and grow</Typography>
                </div>
                <div style={{marginTop:0, width:'90%', alignSelf:'end'}}>  
                  <Typography variant='subtitle2' style={{fontWeight: 'normal'}}>Discover the possibilities that await you with our comprehensive courses. Whether you&apos;re a curious beginner or a seasoned professional, we&apos;re here to fuel your journey towards success.</Typography>
                </div>
                <div style={{display:'flex', width:'80%', justifyContent:'space-evenly', alignItems:'flex-start', marginBottom:0}}>
                  <Button variant='contained' size='small' sx={{ height: '100%', backgroundColor: '#645cff', textTransform:'none', fontSize:15}} onClick={function(){signIn();}}>Login</Button>
                  <Button variant='contained' size='small' sx={{ height: '100%', backgroundColor: '#645cff', textTransform:'none', fontSize:15}} onClick={function(){signOut();}}>Signup</Button>
                </div>
          </Grid>

          <Grid item container xs={12} md={8} sx={{order:{xs: 1, md: 2},  backgroundColor:''}} justifyContent='center'>
            <LoggedOutSlides></LoggedOutSlides>
          </Grid>

        </Grid>
    </div>}

    {featuredCourses?<div style={{display:'flex', flexDirection:'column', justifyContent:'flex-start'}}>
      <div style={{marginLeft:'5vw', marginTop:'4vh'}}><Typography variant='h5'>Featured Courses</Typography></div>
      <div style={{display:'flex', justifyContent:'space-around', flexWrap:'wrap', marginLeft:80, marginRight:80 }}> {featuredCourses.map(c => <div key={c._id}> <CourseCard id={c._id} title={c.title} image={c.imageLink} author={c.author} price={c.price} discountedPrice={c.discountedPrice} /> </div>)} </div>
    </div> : <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:'10%'}}><CircularProgress/></div>}
    
    </>
  )
}

function Slides(){

  const imageStyle = {
    height: '20vw',
    width: '90vw',
    borderRadius:'8px'
  } as React.CSSProperties;

  const carouselStyle = {
    marginTop:'4vh',
    borderRadius:'10px',
    overflow:'hidden'
  } as React.CSSProperties;

  return <div style={carouselStyle}>
    <Carousel className='carousel-container' showThumbs={false} swipeable={true} showArrows={true} autoPlay={true} emulateTouch={true} showStatus={false} >
      <div className='carousel-item'>
          <img src="/1.jpg" style={imageStyle} alt=''/>
      </div>
      <div className='carousel-item'>
          <img src="/2.jpg" style={imageStyle} alt=''/>
      </div>
      <div className='carousel-item'>
          <img src="/3.jpg" style={imageStyle} alt=''/>
      </div>
      <div className='carousel-item'>
          <img src="/4.jpg" style={imageStyle} alt=''/>
      </div>
    </Carousel>
  </div>
}

function LoggedOutSlides(){

  const carouselStyle = {
    width: '90%',
    marginTop: '0%',
    overflow:'hidden',
    borderRadius:'8px',
    border:'0px solid black'
  } as React.CSSProperties;

  const imageStyle = {
    height: '100%',
    width: '100%',
  } as React.CSSProperties;

  const imageContainerStyle = {
    height: '100%',
    width: '100%',
  } as React.CSSProperties;

  return <div style={carouselStyle}>
    <Carousel className='carousel-container' showThumbs={false} swipeable={true} showArrows={true} autoPlay={true} emulateTouch={true} showStatus={false} swipeScrollTolerance={50} useKeyboardArrows={true} infiniteLoop={true}>
      <div className='carousel-item'>
          <Image src="/1.jpg" fill={true} alt='' className={'image'}/>
      </div>
      <div className='carousel-item'>
          <Image src="/2.jpg" fill={true} alt='' className={'image'}/>
      </div>
      <div className='carousel-item'>
          <Image src="/3.jpg" fill={true} alt='' className={'image'}/>
      </div>
      <div className='carousel-item'>
          <Image src="/4.jpg" fill={true} alt='' className={'image'}/>
      </div>
    </Carousel>
  </div>
}


export async function getServerSideProps(context: any){
  
  const session = await getServerSession(context.req, context.res, authOptions);  
  console.log('Inside getServerSideProps, session variable - ', session);
  
  return { props: {session} };
}