/* eslint-disable no-unused-vars */
import React from 'react'
import Typography from '@mui/material/Typography'

const Home = () => {
  return (
    <div>
      <Typography sx={{ paddingBottom: '2rem' }} variant="h1">
        Welcome to Stardew Tips
      </Typography>
      <Typography sx={{ padding: '1rem' }} variant="body3">
        Created by Richard Kwang
      </Typography>
      <Typography sx={{ padding: '1rem' }} variant="body2" color="text.secondary">
        For any bugs or suggestions, please email richardkwang25@gmail.com
      </Typography>
    </div>
  )
}

export default Home
