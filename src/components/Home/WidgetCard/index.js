import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const WidgetCard = ({ widget }) => {
  const { description, name, price } = widget
  return (
    <Grid item xs={12} sm={6} md={3}> 
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Typography component="div" variant="h5" textAlign={'center'}>
              {name}
            </Typography>
            <Typography color="text.secondary" variant="body2" fontSize={"0.7rem"}>
              {description}
            </Typography>
            <Typography component="div" gutterBottom variant="p" color={'green'} fontSize={"0.8rem"} textAlign={'right'}>
              ${price}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
  </Grid>)
}

export default WidgetCard
