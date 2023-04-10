import React, { Component, useState } from "react";
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField'
import { NavLink } from 'react-router-dom'
import Button from '@mui/material/Button'

export default class contribute extends Component{
    constructor(props){
        super(props);
        this.state = {
            progress: 20,
            contributionAmount:0
        }
    }

    render(){  

        const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
            height: 10,
            borderRadius: 5,
            [`&.${linearProgressClasses.colorPrimary}`]: {
              backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
            },
            [`& .${linearProgressClasses.bar}`]: {
              borderRadius: 5,
              backgroundColor: theme.palette.mode === 'light' ? '#2e7d32' : '#4caf50',
            },
          }));

        const handleContribute = () => {

            this.props.history.push('/');
        };

        return(
            <div>
                <Box
                    sx={{
                        width: 1200,
                        height: 700,
                        mx:'auto',
                        mt:10,
                        mb:10,
                        p:5,
                        border:1,
                        borderRadius:2
                    }}
                    align = "left"
                >
                 <Typography variant="h4" gutterBottom align="center">
                    Project details
                </Typography>
                <div>
                    <Typography variant="h5" >
                        Title
                    </Typography>
                    <p>Test project</p>
                </div>
                <div>
                    <Typography variant="h5" >
                        Description
                    </Typography>
                    <p>Testing description.</p> 
                </div>
                <div>
                    <Typography variant="h5" >
                        Targeted amount of contribution
                    </Typography>
                    <p>asdfasdf ETH</p>
                </div>
                <div>
                    <Typography variant="h5" >
                        Contribution amount
                    </Typography>
                    <form>
                        <TextField
                        fullWidth
                        label="Contribution amount"
                        id="outlined-size-normal"
                        margin="normal"
                        type = "number"
                        onChange={(e) => this.setState({contributionAmount: e.target.value})
                        }
                        />
                    </form>
                </div> 
                <div>
                    <BorderLinearProgress variant="determinate" 
                    sx={{mt:5}}
                    value={10} />
                </div>

                <Box align="center">
                <Button variant="outlined" sx={{mt:5, mr: 5}} onClick=      {handleContribute} color="success">Contribute</Button>
                <NavLink to="/">
                    <Button variant="contained" sx={{mt:5, ml: 5}} color="success">Cancel</Button>
                </NavLink>
                
                </Box>
            
                </Box>
            </div>
        );
    }
}

// export default Contribute