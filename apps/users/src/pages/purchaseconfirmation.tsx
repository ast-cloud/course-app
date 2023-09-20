import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession, signIn } from 'next-auth/react';
import {useRouter} from 'next/router';
import {Typography, TextField, Button, Card, Divider } from '@mui/material';

export default function PurchaseConfirmation(){

    const session = useSession();
    const router = useRouter();

    var totalPrice = Number(router.query.discountedPrice) + Number(router.query.discountedPrice) * 0.18;

    useEffect(function(){

        if(!session.data){
            router.push('/');
        }
        const fetchData = async function (){
            // var response = await axios.post('/api/paytmpg/initiatetransaction', {
            //     courseid: router.query.id,
            //     totalprice: totalPrice,
            //     useremail: session.data.user.email
            // });
        }

        fetchData();
    },[]);

    async function proceedToBuy(){
        try{
            axios.get('/api/purchaseCourse/'+router.query.id).then(function(res){
                if(res.status==200){
                    console.log('Course purchased successfully');
                    router.back();
                    //setIsPurchased(true);
                }
            });
        }catch(error){
            console.log('Error purchasing course - '+error);
            //setIsPurchased(false);
        }
    }

    return <div>
        
        <div style={{display:'flex', justifyContent:'center', marginTop:'5%'}}>
            <Typography variant='h6'>Purchase confirmation</Typography>
        </div>
        <div style={{display:'flex', justifyContent:'center', marginTop:20}}>
            <Card variant='elevation' style={{width:500, padding:40, borderRadius:10, justifyContent:'center'}}>
                <div style={{display:'flex', justifyContent:'center'}}>
                    <Typography variant='subtitle1' fontWeight='bold'>{router.query.title}</Typography>
                </div>
                <br /><br />
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    <Typography>Course Price :</Typography>
                    <Typography>$ {router.query.price}</Typography>
                </div>
                <br />
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    <Typography>Discount :</Typography>
                    <Typography>$ -{Number(router.query.price) - Number(router.query.discountedPrice)}</Typography>
                </div>
                <br />
                <Divider/>
                <br />
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    <Typography>Subtotal :</Typography>
                    <Typography>$ {router.query.discountedPrice}</Typography>
                </div>
                <br />
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    <Typography>GST (18%) :</Typography>
                    <Typography>$ {Number(router.query.discountedPrice) * 0.18}</Typography>
                </div>
                <br />
                <Divider/>
                <br />
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    <Typography>Total :</Typography>
                    <Typography>$ {totalPrice}</Typography>
                </div>
                <br /><br />
                <div style={{display:'flex', justifyContent:'flex-end', border:'0px solid black'}}>
                    <Button variant='contained' sx={{backgroundColor:'#645cff', border:'0px solid black'}} onClick={proceedToBuy}>Proceed to buy</Button>
                </div>
            </Card>
        </div>
    </div>

}