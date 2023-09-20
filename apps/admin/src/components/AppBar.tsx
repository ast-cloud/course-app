import {Button, Typography, Card} from '@mui/material';
import {useRouter} from 'next/router';
import { useRecoilState } from 'recoil';
import { isAdminLoggedInState } from '@/store/atoms/user';

export function AppBar(){

    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isAdminLoggedInState);

    const router = useRouter();

    return <div style={{display:'flex', justifyContent:'space-between', marginTop:15}}>
        <Card onClick={function(){router.push('/')}} style={{border:'none', boxShadow:'none', cursor:'pointer'}}><Typography variant="h4" color='#645cff'>CourseHub</Typography></Card>
        { isLoggedIn ? <div style={{display:'flex'}}>
            <div>
                <Button variant="outlined" style={{fontWeight:'bold'}} size="small" onClick={function(){localStorage.removeItem('token'); setIsLoggedIn(false);}}>Logout</Button>
            </div>
        </div> 
        : <div style={{display:'flex'}}>
            
        </div>}
    </div>
}