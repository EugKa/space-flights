import React from 'react'
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import { IFlight, IEvent, ILaunch } from '../../interface/flights';

interface CardFullInfoProps {
   data: IFlight;
}
export const CardFullInfo = ( {data}: CardFullInfoProps) => {
   const { title, summary, launches, events, imageUrl, url } = data;
   const renderActions = (action: IEvent[] | ILaunch[]) => (action.length > 0 
      ? ( 
         <span>{action.map((item: IEvent | ILaunch) => <span key={item.id}>{item.provider}</span>)}</span>
      ) : (
         <span>No actions</span>
      )
   )
   return (
      <Card>
         <CardContent>
            <CardMedia
               component="img"
               image={imageUrl}
               alt="green iguana"
            />
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
               {title}
            </Typography>
            <Typography variant="h5" component="div">
               {summary}
            </Typography>
            <Typography variant="body2" component="div">
               Launches: {renderActions(launches)}
            </Typography>
            <Typography variant="body2" component="div">
               Events: {renderActions(events)}
            </Typography>
            <a href={url}>{url}</a>
         </CardContent>
      </Card>
   )
}
