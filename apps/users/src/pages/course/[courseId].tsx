import { useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import axios from 'axios';
import { useSession, signIn } from 'next-auth/react';
import {Typography, TextField, Button, CircularProgress, useMediaQuery, InputAdornment, Switch, FormControlLabel } from '@mui/material';
import { useRecoilState } from 'recoil';


type CourseDetailsInfoForUsers = {
    _id: string;
    title: string;
    description: string;
    author: string;
    imageLink: string;
    price: string;
    discountedPrice: string;
}

export default function Course(){

    const session = useSession();
    const router = useRouter();

    const courseId = router.query.courseId;

    const [course, setCourse] = useState<undefined|null|CourseDetailsInfoForUsers>(undefined);
    const [isPurchased, setIsPurchased] = useState<undefined|boolean>(undefined);

    const [reRender, setReRender] = useState(false);
    console.log('rerender value - ', reRender);
    useEffect(function(){

        const fetchData = async ()=>{

            try{
                const courseDetails = await axios.get('/api/course/'+courseId);
                setCourse(courseDetails.data.course);
            }catch(error){
                setCourse(null);
            }

            if(session.data){
                const pCourses = await axios.get('/api/purchasedCourses');
                if(pCourses.data.purchasedCoursesIds.includes(courseId)){
                    setIsPurchased(true);
                }
                else{
                    setIsPurchased(false);
                }
            }
        }

        fetchData();

    },[reRender]);
   
    function handleBuy(){
        if(session.data){
            router.push({
                pathname: '/purchaseconfirmation',
                query: {
                    id: course?._id,
                    title: course?.title,
                    price: course?.price,
                    discountedPrice: course?.discountedPrice
                }
            });
            // try{
            //     axios.get('/api/purchaseCourse/'+course._id).then(function(res){
            //         if(res.status==200){
            //             setIsPurchased(true);
            //         }
            //     });
            // }catch(error){
            //     setIsPurchased(false);
            // }
        }
        else{
            signIn();
        }
    }

    

    
    const isSmallScreen = useMediaQuery('(max-width: 600px)');
    const isScreenWidthGT1000 = useMediaQuery('(min-width: 1000px)');
    const isScreenWidthGT800 = useMediaQuery('(min-width: 800px)');
    const isScreenWidthGT500 = useMediaQuery('(min-width: 500px)');

    if(course===undefined){
        return (
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'74vh'}}>
                <CircularProgress/>
            </div>
        );
    }
    else if(course===null){
        return(
          <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', height:'74vh'}}>
            <Typography variant='h6' sx={{fontWeight:'bold'}}>Cannot load data!</Typography>
            <br /><br />
            <Button variant='contained' size='small' sx={{ textTransform:'none', backgroundColor:'#645cff'}} onClick={function(){setCourse(undefined); setReRender(!reRender);}}>Refresh</Button>
          </div>
        );
    }
    else{

        return (
        <div style={{display:'flex', flexDirection:'column', height:'74vh'}}>

            <div style={{display:'flex', justifyContent: isScreenWidthGT800 ? 'flex-start':'center',  marginTop:55, marginLeft: isSmallScreen?0:20, marginRight: isSmallScreen?0:20, border:'0px solid black'}}>
                <Typography variant='h6'>{course.title}</Typography>
            </div>

            <div style={{display:'flex', flexDirection:isScreenWidthGT800?'row':'column', justifyContent:'space-between', marginTop:35, marginLeft:isSmallScreen?0:20, marginRight:isSmallScreen?0:20, border:'0px solid black'}}>

                <div style={{width:isScreenWidthGT800?'45%':'90%', alignSelf:isScreenWidthGT800?'auto':'center', border:'0px solid black'}}>
                    <img src={course.imageLink} style={{borderRadius:5, width:'100%'}} alt='' />
                </div>
                
                <div style={{display:'flex', flexDirection:'column', alignSelf:isScreenWidthGT800?'auto':'center', justifyContent:'space-between', paddingTop:isScreenWidthGT1000?'10px':'0px', marginTop:isScreenWidthGT800?'0px':'20px', paddingBottom:isScreenWidthGT1000?'20px':'20px', width:isScreenWidthGT800?'55%':'90%', border:'0px solid black'}}>
                   
                    <Typography sx={{marginLeft:isScreenWidthGT800?'25px':0, marginRight:isScreenWidthGT800?'25px':0}}>{course.description}</Typography>
                    <br />

                    <Typography sx={{alignSelf:'flex-end', marginRight:'40px'}}>By {course.author}</Typography>

                    <div style={{display:'flex', justifyContent:'flex-start', marginTop:'0px', marginLeft:isScreenWidthGT800?'35px':0}}>
                        <Typography variant="h5">
                            ${course.discountedPrice}
                        </Typography>
                        <Typography variant="h5" sx={{color:'grey', marginLeft:'15px', textDecoration:'line-through'}}>
                            ${course.price}
                        </Typography>
                    </div>

                </div>
            </div>

            {!session.data && <Button variant='contained' size='small' sx={{fontSize:'15px', textTransform:'none', backgroundColor:'#645cff', alignSelf:isScreenWidthGT800?'flex-end':'center', marginRight:isScreenWidthGT800?'40px':'0px'}} onClick={handleBuy}>Buy course</Button>}
            {session.data && isPurchased==undefined && <div style={{alignSelf:isScreenWidthGT800?'flex-end':'center', marginRight:isScreenWidthGT800?'90px':'0px'}}><CircularProgress size={25}/></div>}
            {session.data &&  isPurchased==false && <Button variant='contained' size='small' sx={{fontSize:'15px', textTransform:'none', backgroundColor:'#645cff', alignSelf:isScreenWidthGT800?'flex-end':'center', marginRight:isScreenWidthGT800?'40px':'0px'}} onClick={handleBuy}>Buy course</Button>}
            {session.data &&  isPurchased==true && <Button variant='contained' size='small' sx={{fontSize:'15px', textTransform:'none', backgroundColor:'#645cff', alignSelf:isScreenWidthGT800?'flex-end':'center', marginRight:isScreenWidthGT800?'40px':'0px'}} onClick={()=>{}}>Course contents</Button>}
         
        </div>);
    }

}


























// import { useEffect, useState } from 'react';
// import { useSession, signIn } from 'next-auth/react';
// import {useRouter} from 'next/router';
// import axios from 'axios';
// import {Typography, Card, CardMedia, CardContent, Button, CircularProgress, useMediaQuery} from '@mui/material';
// import {Head} from 'next/document';




// export default function Course(){

//     const session = useSession();

//     const router = useRouter();
//     const courseId = router.query.courseId;

//     const [course, setCourse] = useState(undefined);
//     const [isPurchased, setIsPurchased] = useState(null);

//     useEffect(function(){

//         const fetchData = async ()=>{

//             try{
//                 const courseDetails = await axios.get('/api/course/'+courseId);
//                 setCourse(courseDetails.data.course);
//             }catch(error){
//                 setCourse(null);
//             }

//             if(session.data){
//                 const pCourses = await axios.get('/api/purchasedCourses');
//                 if(pCourses.data.purchasedCoursesIds.includes(courseId)){
//                     setIsPurchased(true);
//                 }
//                 else{
//                     setIsPurchased(false);
//                 }
//             }
//         }

//         fetchData();

//     },[]);

//     function handleBuy(){
//         if(session.data){
//             try{
//                 axios.get('/api/purchaseCourse/'+course._id).then(function(res){
//                     if(res.status==200){
//                         setIsPurchased(true);
//                     }
//                 });
//             }catch(error){
//                 setIsPurchased(false);
//             }
//         }
//         else{
//             signIn();
//         }
//     }

//     const isSmallScreen = useMediaQuery('(max-width: 600px)');
//     const isScreenWidthGT800 = useMediaQuery('(min-width: 800px)');

//     if(course==undefined){
//         return (
//             <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:'20%'}}>
//                 <CircularProgress/>
//             </div>
//         );
//     }
//     else if(course===null){
//         return(
//           <div>
//             Cannot load data.
//           </div>
//         );
//     }
//     else{
//         return (
//         <div>

            

//             <div style={{display:'flex', justifyContent: isSmallScreen ? 'center' : 'flex-start', marginTop:55, marginLeft: isSmallScreen?0:20}}>
//                 <Typography variant='h6' sx={{}}>
//                     {course.title}
//                 </Typography>
//             </div>

//             <div style={{display:'flex', justifyContent:'space-between', marginTop:35, marginLeft:isSmallScreen?0:20, marginRight:isSmallScreen?0:20, border:'1px solid black'}}>
//                 <div style={{width:isScreenWidthGT800?'45%':'90%', alignSelf:isScreenWidthGT800?'auto':'center', border:'0px solid black'}}>
//                     <img src={course.imageLink} style={{borderRadius:5,}} alt='' />
//                 </div>
//                 <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between', paddingTop:'25px', paddingBottom:'25px', width:'55%', border:'0px solid black'}}>
//                     <Typography variant='h6' sx={{marginLeft:'25px', marginRight:'25px'}}>{course.description}</Typography>
//                     <Typography variant='body1' sx={{alignSelf:'flex-end', marginLeft:'25px', marginRight:'25px'}}> By {course.author}</Typography>
//                     <div style={{display:'flex', justifyContent:'space-between', marginLeft:'35px', marginRight:'35px'}}>
//                         <div style={{display:'flex'}}>
//                             <Typography variant='h6'>${course.discountedPrice}</Typography>
//                             <Typography variant='h6' sx={{color:'grey', textDecoration:'line-through', marginLeft:'10px'}}>${course.price}</Typography>
//                         </div>
//                         <div style={{display:'flex', justifyContent:'end'}}>
//                             {!session.data && <Button variant='outlined' size='small' onClick={handleBuy}>Buy Course</Button>}
//                             {session.data &&  isPurchased==true && <Typography>Purchased</Typography>}
//                             {session.data &&  isPurchased==false && <Button variant='outlined' size='small' sx={{fontWeight:'bold', borderWidth:'2px'}} onClick={handleBuy}>Buy Course</Button>}
//                         </div>
//                     </div>
//                 </div>
//             </div>
         
//         </div>);
//     }

// }