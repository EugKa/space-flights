import * as React from 'react';
import { IFlight } from '../../interface/flights';
import { useAppSelector } from '../../store/hooks';
import { selectFlightsSlice } from '../../store/features/FlightsSlice';
import { Card, Typography, CardMedia, CardActions, CardContent, Button } from '@mui/material';

import moment from 'moment';

interface CardFlightProps {
   data: IFlight;
   handleSelect: (id: number) => void;
}

export const CardFlight = ( {data, handleSelect }: CardFlightProps) => {
    const { id, title, publishedAt, summary, imageUrl } = data;
    const { searchWord } = useAppSelector(selectFlightsSlice);
    const convertDate = moment.utc(publishedAt).toDate().toUTCString()

    let newTitle = title.replace(
        new RegExp(searchWord, 'gi'),
        match => `<mark style="background: #d3bf0f">${match}</mark>`
    )
    let restDesc = 100 - title.length;
    let trimmedString = summary.substr(0, restDesc);
    trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
    let newSummary = trimmedString.replace(
        new RegExp(searchWord, 'gi'),
        match => `<mark style="background: #d3bf0f">${match}</mark>`
    )  

    return (
        <Card variant="outlined">
            <CardContent>
                <CardMedia
                    component="img"
                    image={imageUrl}
                    alt="image"
                />
                <Typography 
                    component="div"
                    variant="h6" 
                    dangerouslySetInnerHTML={{ __html: newTitle }}
                />
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Publushed: <span>{convertDate}</span>
                </Typography>
                <Typography 
                    component="div" 
                    variant="body2"
                    dangerouslySetInnerHTML={{ __html: `${newSummary}...`}}
                />
                
            </CardContent>
            <div className="btn-group">
                <CardActions>
                    <Button size="small" onClick={() => handleSelect(id)}>Read more</Button>
                </CardActions>
            </div>       
        </Card>
    );
}