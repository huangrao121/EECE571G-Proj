import React, { Component } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CardItem from './card/card'
export default class display extends Component {
  state = {
    cards:[
      {id:"12",title:"www", endTime:1234,goalAmount:2222,totalRaised:1223},
      {id:"34",title:"abds", endTime:4444,goalAmount:3232,totalRaised:1377},
      {id:"56",title:"abds", endTime:4444,goalAmount:3232,totalRaised:1377},
      {id:"2",title:"abds", endTime:4444,goalAmount:3232,totalRaised:1377}
    ]
  }
  render() {
    const cards = this.state.cards
    return (
      <div className='container mt-5'>
        <Grid container spacing={5}>
          {
            cards.map(card=>{
              return (
                <Grid item md={3} key={card.id}>
                  <CardItem {...card}/>
                </Grid>
              )
            })
          }
        </Grid>
      </div>
    )
  }
}
