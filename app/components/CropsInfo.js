/* eslint-disable no-unused-vars */
import React from 'react'
import { useState, useEffect } from 'react'
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
      const { data } = await axios.get('/api/crops')
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

  return (
    <Box display="flex" justifyContent='center' alignItems='center' className='component-view'>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        align='center'
        flexWrap='wrap'
        gap='10px'
      >
        {crops.map((crop) => {
          return (
            <Grid key={crop.id} item xs={6} sm={4} md={3}>
              <Card
                className="card"
                sx={{
                  minWidth: 275,
                  height: 375,
                  display: 'flex',
                  flexDirection: 'column',
                  alignContent: 'flex-start',
                  justifyContent: 'flex-start'
                }}
              >
                <Box className="card-title">
                <Typography variant="h5" component="div">
                        {crop.name}
                      </Typography>
                      <Typography color="text.secondary">
                        {crop.type ? crop.type[0].toUpperCase() + crop.type.slice(1,crop.type.length): null}
                      </Typography>
                      <Typography variant="body2">
                        {crop.season.map(season => season[0].toUpperCase() + season.slice(1,season.length)).join(', ')}
                        <br />
                      </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box className="card-information">
                    <CardContent>

                      <Typography variant="body3">
                        Cost
                        <br />
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {crop.price ? `${crop.price} (${crop.shop})` : "N/A"}
                        <br />
                      </Typography>
                      <Typography variant="body3">
                        Grow Time
                        <br />
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {crop.growTime} days
                        <br />
                      </Typography>
                      <Typography variant="body3">
                        Sell Price
                        <br />
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Normal: {crop.sellPrice}g <br />
                        Silver: {Math.floor(crop.sellPrice * 1.25)}g <br />
                        Gold: {Math.floor(crop.sellPrice * 1.5)}g <br />
                        Iridium: {Math.floor(crop.sellPrice * 2)}g
                        <br />
                      </Typography>
                    </CardContent>
                  </Box>
                  <Box sx={{ display: 'flex', alignContent: 'center' }} className="card-image">
                    <CardMedia
                      component="img"
                      sx={{ width: 75, height: 75 }}
                      image={`/images/crops/${crop.imageUrl}.png`}
                      alt={crop.imageUrl}
                    />
                  </Box>
                </Box>
                {crop.note ? (
                  <Typography variant="subtitle2">{crop.note}</Typography>
                ) : (
                  <></>
                )}
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

export default CropsInfo
