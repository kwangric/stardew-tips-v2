/* eslint-disable no-unused-vars */
import React from 'react'
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography'
import Changelog from './Changelog'

const Home = () => {
  return (
    <div>
      <Typography sx={{ paddingBottom: '1rem' }} variant="h1">
        Stardew Tips
      </Typography>
      <Typography sx={{ padding: '1rem' }} variant="body3">
        Created by Richard Kwang
      </Typography>
      <Typography sx={{ padding: '1rem 1rem 2rem' }} variant="body2" color="text.secondary">
        For any bugs or suggestions, please email richardkwang25@gmail.com
        <br />
        <Link href="https://github.com/kwangric/stardew-tips-v2" target="_blank">Source Code</Link>
      </Typography>
      <Changelog />
    </div>
  )
}

export default Home
