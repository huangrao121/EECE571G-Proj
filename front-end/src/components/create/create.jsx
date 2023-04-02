import React, { Component } from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
export default class create extends Component {
  render() {
    const theme = {
      spacing: 8,
    }
    return (
      <div>
        <Box  
            sx={{
            width: 1200,
            height: 700,
            mx:'auto',
            mt:10,
            p:5,
            border:1,
            borderRadius:2
          }}
        >
          <Typography variant="h4" gutterBottom>
            Start a fund rise for project
          </Typography>
          <form>
            <TextField
              fullWidth 
              label="Title"
              id="outlined-size-normal"
              margin="normal"
            />
            <TextField
              fullWidth 
              label="Description"
              id="outlined-size-normal"
              margin="normal"
            />
            <TextField
              fullWidth 
              label="Targeted amount of project"
              id="outlined-size-normal"
              margin="normal"
            />
            <TextField
              fullWidth 
              label="Minimum Contribution"
              id="outlined-size-normal"
              margin="normal"
            />
            <Button fullwidth variant="outlined" sx={{mt:5,}}>Submit</Button>
          </form>
        </Box>
      </div>
    )
  }
}
