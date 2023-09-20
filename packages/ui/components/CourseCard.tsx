import { Typography, Card, CardMedia, CardContent, Tab, Tabs, CircularProgress } from "@mui/material";
import {useRouter} from 'next/router';


export function CourseCard(props:{id:string, title:string, image:string, author:string, price:string, discountedPrice:string}){

    const router = useRouter();
  
    return <Card onClick={function(){router.push('/course/'+props.id)}} style={{width:250, height:260, marginTop:55, marginRight:20, cursor:'pointer'}}>
          <CardMedia sx={{ height: 140, borderRadius:'4px'}} image={props.image} title={props.title} />
          <CardContent>
              <Typography variant="body2" sx={{overflow:'hidden', textOverflow:'ellipsis', display:'-webkit-box', WebkitLineClamp: '2', '-webkit-box-orient': 'vertical'}}>
                  {props.title}
              </Typography>
              <Typography variant="body2" sx={{color:'grey', fontSize:'12px', marginTop:'4px'}}>
                  {props.author}
              </Typography>
              <div style={{display:'flex', justifyContent:'flex-start', marginTop:'4px'}}>
                  <Typography variant="body2">
                      ${props.discountedPrice}
                  </Typography>
                  <Typography variant="body2" sx={{color:'grey', marginLeft:'7px', textDecoration:'line-through'}}>
                      ${props.price}
                  </Typography>
              </div>
          </CardContent>
      </Card>
}