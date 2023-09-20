import { useState } from 'react';
import { Typography, Card, TextField, Button, InputAdornment, FormControlLabel, Switch, useMediaQuery } from '@mui/material';
import axios from 'axios';
import {useRouter} from 'next/router';



export default function Contact(){

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [discountedPrice, setDiscountedPrice] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [published, setPublished] = useState(false);
    const [featured, setFeatured] = useState(false);

    const router = useRouter();

    const isSmallScreen = useMediaQuery('(max-width: 600px)');

    async function createHandle(){
        var a = await axios.post('/api/addCourse', {
                title: title,
                description: description,
                author: author,
                imageLink: imageLink,
                price: price,
                discountedPrice: discountedPrice,
                published: published,
                featured: featured,
            }, {
                headers: {
                    'Authorization':'Bearer '+localStorage.getItem('token')
                }
            }
        );

        if(a.status==200){
            console.log(JSON.stringify(a));
            router.push('/');
        }
        else{
            
        }
    }

    return (
        <div>
            <div style={{display:'flex', justifyContent:'center', marginTop:'8vh'}}>
                <Typography variant='h5'>Add new course</Typography>
            </div>
            <div style={{display:'flex', justifyContent:'center', marginTop:15}}>
                <Card variant='elevation' style={{width:500, padding:40, borderRadius:10, justifyContent:'center'}}>
                    <TextField variant='outlined' fullWidth={true} label='Title' onChange={function(e){setTitle(e.target.value)}}></TextField>
                    <br /><br />
                    <TextField variant='outlined' fullWidth={true} label='Description' multiline={true} minRows={4} maxRows={4} onChange={function(e){setDescription(e.target.value)}}></TextField>
                    <br /><br />
                    <TextField variant='outlined' fullWidth={true} label='Author' onChange={function(e){setAuthor(e.target.value)}}></TextField>
                    <br /><br />
                    <TextField variant='outlined' fullWidth={true} label='Image link' onChange={function(e){setImageLink(e.target.value)}}></TextField>
                    <br /><br />
                    <div style={{display:'flex', flexDirection:isSmallScreen?'column':'row', justifyContent:'space-between', border:'0px solid black'}}>
                        <TextField variant='outlined' size='small'  label='Price' sx={{width:{xs:'32%', sm:'40%'}}} InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}} onChange={function(e){setPrice(e.target.value)}}></TextField>
                        <TextField variant='outlined' size='small'  label='Discounted Price' sx={{width:{xs:'40%', sm:'40%'}, marginTop:{xs:'15px', sm:0}}} InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}} onChange={function(e){setDiscountedPrice(e.target.value)}}></TextField>
                    </div>
                    <br /><br />
                    <div style={{display:'flex', justifyContent:'space-between', border:'0px solid black'}}>
                        <FormControlLabel control={<Switch checked={published} onChange={(e)=>{setPublished(e.target.checked)}}/>} label='Published'/>
                        <FormControlLabel control={<Switch checked={featured} onChange={(e)=>{setFeatured(e.target.checked)}}/>} label='Featured'/>
                    </div>
                    <br /><br />
                    <Button variant='contained' sx={{backgroundColor:'#645cff', textTransform:'none'}} onClick={createHandle}>Create</Button>
                </Card>
            </div>
        </div>
    )
}