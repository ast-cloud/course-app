import {Typography} from '@mui/material';

export function Footer(){


    return <div style={{backgroundColor:'#ebe8e8', padding:20, marginTop:40, marginBottom:-8, marginLeft:-5, marginRight:-8, textAlign:'center'}}>
    <Typography>
        &copy; {new Date().getFullYear()} Course Hub All rights reserved | Terms and conditions apply
    </Typography>
</div>
}