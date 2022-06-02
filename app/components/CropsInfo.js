/* eslint-disable no-unused-vars */
import React from 'react'
import { useState, useEffect} from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import axios from 'axios'

const CropsInfo = () => {
  const [crops, setCrops] = useState([])

  const getCrops = async () => {
    try {
      const {data} = await axios.get('/api/crops')
      return data
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const gotCrops = async () => {
      const newCrops = await getCrops()
      setCrops(newCrops)
    }

    gotCrops()
  }, [])

  console.log('####', crops)

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
    >
      <Grid item xs={3}>
        <Card
          sx={{
            minWidth: 275,
            maxWidth: 350,
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <CardContent>
                <Typography variant="h5" component="div">
                  Blue Jazz
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Flower
                </Typography>
                <Typography variant="body2">
                  Spring, Summer
                  <br />
                </Typography>
                <Typography variant="body3">
                  Grow Time
                  <br />
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  7 days
                  <br />
                </Typography>
                <Typography variant="body3">
                  Sell Price
                  <br />
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  30g (Pierre's)
                  <br />
                </Typography>
              </CardContent>
            </Box>
            <Box sx={{ display: 'flex', alignContent: 'center' }}>
              <CardMedia
                component="img"
                sx={{ width: 100, height: 100 }}
                image="https://stardewvalleywiki.com/mediawiki/images/2/2f/Blue_Jazz.png"
                alt="Live from space album cover"
              />
            </Box>
          </Box>
          <Typography variant="subtitle2">Can become a Giant Crop.</Typography>
        </Card>
      </Grid>
    </Grid>
  )
}

export default CropsInfo
