import React, { Component } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { NavLink } from 'react-router-dom'
import LinearProgress from '@mui/material/LinearProgress'

export default class card_item extends Component {
  render() {
    return (
      <Card sx={{maxWidth:345}}>
        {/* <CardMedia
          component='img'
          alt='green iguana'
          height='140'
          image=''
        /> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {this.props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Testing description.
          </Typography>
          <LinearProgress 
          sx={{
            mt: 5,
            borderRadius: 5
          }}
          variant="determinate"
           value={0}
           color="success"
           >
          </LinearProgress>
        </CardContent>
        <CardActions>
          {/* <Button size="small">Contribute</Button> */}
          <NavLink to="/contribute">
            <Button size="small" color='success'>Learn More</Button>
          </NavLink>
          
        </CardActions>
      </Card>
    )
  }
}
