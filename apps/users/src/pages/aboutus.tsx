import {Typography, Card, CardContent, useMediaQuery} from '@mui/material';


export default function AboutUs(){

    
    return (
    <div>
        <div style={{display:'flex', justifyContent:'center', marginTop:75}}>     
            <Typography variant="h5">About Us</Typography>
        </div>
        <div style={{display:'flex', justifyContent:useMediaQuery('(max-width: 600px)')?'center':'flex-start', marginTop:75}}>
            <Card variant='elevation' raised={true} sx={{width:{xs:'80%', sm:'40%'}, marginLeft:'4vw', paddingX:'1vw', paddingY:'1vh', borderRadius:'10px'}}>
                <CardContent>
                    <Typography variant='h6' color={'#525452'}>Welcome to Course Hub, your one-stop destination for unlocking your potential through education and skill development. We believe that learning is a lifelong journey, and we are here to make that journey as exciting, accessible, and enriching as possible.</Typography>
                </CardContent>
            </Card>
            <img src="/aboutuspic1.png" width={'8%'} height={'2%'} style={{alignSelf:'center', justifySelf:'center', marginLeft:'22vw', display:useMediaQuery('(max-width: 600px)')?'none':'block'}} className='aboutuspic1' />
        </div>
        <div style={{display:'flex', justifyContent: useMediaQuery('(max-width: 600px)')?'center':'flex-end', marginTop: useMediaQuery('(max-width: 600px)')?50:40}}>
            <img src="/aboutuspic2.png" width={'15%'} height={'5%'} style={{alignSelf:'center', justifySelf:'center', marginRight:'22vw', display:useMediaQuery('(max-width: 600px)')?'none':'block'}} className='aboutuspic2' />
            <Card variant='elevation' raised={true} sx={{width:{xs:'80%', sm:'40%'}, marginRight:'4vw', paddingX:'1vw', paddingY:'1vh', borderRadius:'10px'}}>
                <CardContent>
                    <Typography variant='h6' color={'#525452'}>At Course Hub, we are passionate about education and its power to transform lives. Our platform was born out of a deep commitment to empowering individuals to achieve their personal and professional goals. We understand that in today's fast-paced world, the key to success lies in continuous learning and adaptation. </Typography>
                </CardContent>
            </Card>
        </div>

    </div> )

}