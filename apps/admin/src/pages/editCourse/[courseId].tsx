import { useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import axios from 'axios';
import {Typography, TextField, Button, CircularProgress, useMediaQuery, InputAdornment, Switch, FormControlLabel } from '@mui/material';
import { useRecoilState } from 'recoil';
import { isAdminLoggedInState } from '@/store/atoms/user';


type CourseDetailsInfo = {
    _id: string;
    title: string;
    description: string;
    author: string;
    imageLink: string;
    price: string;
    discountedPrice: string;
    published: boolean;
    featured: boolean;
}


export default function Course(){

    const router = useRouter();
    const courseId = router.query.courseId;
    
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isAdminLoggedInState);

    const [course, setCourse] = useState<undefined|null|CourseDetailsInfo>(undefined);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [discountedPrice, setDiscountedPrice] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [published, setPublished] = useState<boolean>(false);
    const [featured, setFeatured] = useState<boolean>(false);

    useEffect(function(){

        const fetchData = async ()=>{

            await checkLoginStatus();
            
            if(isLoggedIn){
                try{
                    var res = await axios.get('/api/course/'+courseId, {
                        headers:{
                            'Authorization':'Bearer '+localStorage.getItem('token')
                        }
                    });
                    if(res.status==200){
                        setCourse(res.data.course);
                    }
                    else{
                        setCourse(null);
                    }
                }catch(e){
                    setCourse(null);
                }
            }

        }

        fetchData();

    },[isLoggedIn]);

    useEffect(function(){
        if(course){
            setPublished(course.published);
            setFeatured(course.featured);
        }
    },[course]);

    async function checkLoginStatus(){
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
        
    }

    async function handleSave(){
        try{
            var response = await axios.put('/api/editCourse/'+courseId, {
                title: title===''?course?.title:title,
                description: description===''?course?.description:description,
                price: price===''?course?.price:price,
                discountedPrice: discountedPrice===''?course?.discountedPrice:discountedPrice,
                imageLink: imageLink===''?course?.imageLink:imageLink,
                published: published,
                featured: featured
            }, {
                headers:{
                    'Authorization':'Bearer '+localStorage.getItem('token')
                }
            });
            if(response.status==200){
                router.push('/');
            }
            else{
                console.log('Error : Cannot update course');
            }
        }catch(e){
            console.log('Error : Cannot update course');
        }
    }

    function publishedSwitchChange(e: React.ChangeEvent<HTMLInputElement>){
        setPublished(e.target.checked);
    }

    function featuredSwitchChange(e: React.ChangeEvent<HTMLInputElement>){
        setFeatured(e.target.checked);
    }

    const isSmallScreen = useMediaQuery('(max-width: 600px)');
    const isScreenWidthGT1000 = useMediaQuery('(min-width: 1000px)');
    const isScreenWidthGT800 = useMediaQuery('(min-width: 800px)');
    const isScreenWidthGT500 = useMediaQuery('(min-width: 500px)');

    if(course===undefined){
        return (
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:'20%'}}>
                <CircularProgress/>
            </div>
        );
    }
    else if(course===null){
        return(
          <div>
            Cannot load data.
          </div>
        );
    }
    else{

        return (
        <div>

            <div style={{display:'flex', justifyContent: isSmallScreen ? 'center' : 'flex-start',  marginTop:55, marginLeft: isSmallScreen?0:20, marginRight: isSmallScreen?0:20, border:'0px solid black'}}>
                <TextField label='Title' variant='outlined' defaultValue={course.title} sx={{width:'100%'}} onChange={function(e){setTitle(e.target.value)}} />
            </div>

            <div style={{display:'flex', flexDirection:isScreenWidthGT800?'row':'column', justifyContent:'space-between', marginTop:35, marginLeft:isSmallScreen?0:20, marginRight:isSmallScreen?0:20, border:'0px solid black'}}>
                <div style={{width:isScreenWidthGT800?'45%':'90%', alignSelf:isScreenWidthGT800?'auto':'center', border:'0px solid black'}}>
                    <img src={course.imageLink} style={{borderRadius:5, width:'100%'}} alt='' />
                    <br /><br />
                    <TextField label='Image Link' variant='outlined' defaultValue={course.imageLink} fullWidth={true} onChange={function(e){setImageLink(e.target.value)}}/>
                </div>
                <div style={{display:'flex', flexDirection:'column', alignSelf:isScreenWidthGT800?'auto':'center', justifyContent:'space-between', paddingTop:'10px', paddingBottom:'2px', width:isScreenWidthGT800?'55%':'90%', border:'0px solid black'}}>
                    <TextField variant='outlined' label='Description' defaultValue={course.description} sx={{marginLeft:isScreenWidthGT800?'25px':0, marginRight:isScreenWidthGT800?'25px':0}} multiline={true} minRows={4} maxRows={isScreenWidthGT1000?7:4} onChange={function(e){setDescription(e.target.value)}}></TextField>
                    <br />
                    <div style={{display:'flex', justifyContent:'space-between', marginLeft:isScreenWidthGT1000?'35px':(isScreenWidthGT500?'25px':'0px'), marginRight:isScreenWidthGT1000?'45px':(isScreenWidthGT500?'15px':'0px'), marginBottom:'8%', border:'0px solid black'}}>

                        <div style={{display:'flex', flexDirection:'column', width:isScreenWidthGT500?'auto':'40%', border:'0px solid black'}}>
                            <TextField label='Discounted Price' defaultValue={course.discountedPrice} size='small' InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}} sx={{marginBottom:'5%'}} onChange={function(e){setDiscountedPrice(e.target.value)}}/>

                            <TextField label='Price' defaultValue={course.price} size='small' InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}} onChange={function(e){setPrice(e.target.value)}}/>
                        </div>

                        <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between', border:'0px solid black'}}>
                            <FormControlLabel control={<Switch checked={published} onChange={publishedSwitchChange}/>} label='Published'/>
                            <FormControlLabel control={<Switch checked={featured} onChange={featuredSwitchChange}/>} label='Featured'/>
                        </div>

                    </div>
                    <Button variant='contained' size='small' sx={{fontSize:'15px', textTransform:'none', backgroundColor:'#645cff', width:'10%', alignSelf:isScreenWidthGT800?'flex-end':'center', marginRight:isScreenWidthGT800?'65px':'0px'}} onClick={handleSave}>Save</Button>
                </div>
            </div>
         
        </div>);
    }

}
