import React, { Component, useContext, useState } from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom'
import { CrowdfundingContext } from '../../contexts/crowdfunding_context';
import {ethers} from "ethers";

export default class create extends Component {

  static contextType = CrowdfundingContext

  constructor(props) {
    super(props);
    this.state = {
      title: 'test',
      description: 'test',
      duration: 30 * 24 * 60 * 60,
      targetedAmount: 10,
      minContribution: 2,
    };
  }

  render() {
    const theme = {
      spacing: 8,
    }

    const handleSubmit = async (event) => {
      // console.log(event)
      console.log(this.state)
      const cfmanagementContract = this.context.getCfmanagementContract();

      console.log("Get CfmanagementContract: ", cfmanagementContract);
      console.log(cfmanagementContract.Cfs.length);
      await cfmanagementContract.createCrowdFunding(
        this.state.title,
        this.state.duration,
        ethers.utils.parseEther(String(this.state.targetedAmount)),
        ethers.utils.parseEther(String(this.state.minContribution)),
        this.state.description
      );
      console.log(cfmanagementContract.Cfs.length)
      console.log("New project created!");
      this.props.history.push('/');
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
              onChange={(e) => this.setState({title: e.target.value})
              }
            />
            <TextField
              fullWidth 
              label="Description"
              id="outlined-size-normal"
              margin="normal"
              onChange={(e) => this.setState({description: e.target.value})}
            />
            <TextField
              fullWidth 
              label="Targeted amount of project"
              id="outlined-size-normal"
              margin="normal"
              onChange={(e) => this.setState({targetedAmount: e.target.value})}
            />
            <TextField
              fullWidth 
              label="Minimum Contribution"
              id="outlined-size-normal"
              margin="normal"
              onChange={(e) => this.setState({minContribution: e.target.value})}
            />
            <TextField
              fullWidth 
              label="Duration"
              id="outlined-size-normal"
              margin="normal"
              onChange={(e) => this.setState({duration: e.target.value})}
            />
            <Box>
              <Button variant="outlined" sx={{mt:5, mr: 5}} onClick={handleSubmit}>Submit</Button>
              <NavLink to="/">
                <Button variant="contained" sx={{mt:5, ml: 5}}>Cancel</Button>
              </NavLink>
              
            </Box>
            
          </form>
        </Box>
      </div>
    )
  }
}

// export const Create = () => {

//   const [title, setTitle] = useState();
//   const [description, setDescription] = useState();
//   const [targetedAmount, setTargetedAmount] = useState();
//   const [minContribution, setMinContribution] = useState();
//   const [duration, setDuration] = useState();
//   const [getCfmanagementContract] = useContext(CrowdfundingContext);
//   const navigate = useHistory();

//   const theme = {
//     spacing: 8,
//   }

//   const handleSubmit = (event) => {
//     console.log(event)
//     const cfmanagementContract = getCfmanagementContract();
//     console.log("Get CfmanagementContract: ", cfmanagementContract);
//     // cfmanagementContract.createCrowdFunding(
//     //   title,
//     //   duration,
//     //   targetedAmount,
//     //   minContribution,
//     //   description
//     // );
//     console.log("New project created!");
//     // navigate("/");
//   };

//   return (
//     <div>
//       <Box  
//           sx={{
//           width: 1200,
//           height: 700,
//           mx:'auto',
//           mt:10,
//           p:5,
//           border:1,
//           borderRadius:2
//         }}
//       >
//         <Typography variant="h4" gutterBottom>
//           Start a fund rise for project
//         </Typography>
//         <form>
//           <TextField
//             fullWidth 
//             label="Title"
//             id="outlined-size-normal"
//             margin="normal"
//             onChange={e => setTitle(e.target.value)}
//           />
//           <TextField
//             fullWidth 
//             label="Description"
//             id="outlined-size-normal"
//             margin="normal"
//             onChange={e => setDescription(e.target.value)}
//           />
//           <TextField
//             fullWidth 
//             label="Targeted amount of project"
//             id="outlined-size-normal"
//             margin="normal"
//             onChange={e => setTargetedAmount(e.target.value)}
//           />
//           <TextField
//             fullWidth 
//             label="Minimum Contribution"
//             id="outlined-size-normal"
//             margin="normal"
//             onChange={e => setMinContribution(e.target.value)}
//           />
//           <Box>
//             <Button variant="outlined" onClick={handleSubmit} sx={{mt:5, mr: 5}}>Submit</Button>
//             {/* <NavLink to="/"> */}
//               <Button variant="contained" sx={{mt:5, ml: 5}}>Cancel</Button>
//             {/* </NavLink> */}
            
//           </Box>
          
//         </form>
//       </Box>
//     </div>
//   )
// }
