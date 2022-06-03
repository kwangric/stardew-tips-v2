/* eslint-disable no-unused-vars */
import React from 'react'
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
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
    <>
      {crops.length > 0 ? (
        <>
          <Typography sx={{paddingBottom: "2rem"}} variant="h2">Crops</Typography>
          <Box className="component-view">
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
              align="center"
              flexWrap="wrap"
              columnGap="50px"
              rowGap="20px"
            >
              {crops.map((crop) => {
                return (
                  <Grid key={crop.id} item>
                    <Card
                      className="card"
                      variant="outlined"
                      sx={{
                        width: 275,
                        height: 380,
                        display: 'flex',
                        flexDirection: 'column',
                        alignContent: 'flex-start',
                        justifyContent: 'space-between',
                      }}
                      style={{
                        backgroundColor: '#fcfccc',
                        borderRadius: '25px',
                      }}
                    >
                      <Box>
                        <Box className="card-title">
                          <Typography variant="h5" component="div">
                            {crop.name}
                          </Typography>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              gap: '30px',
                              margin: '4% 0',
                            }}
                          >
                            {crop.season.map((season, index) => {
                              return (
                                <Tooltip
                                  key={index}
                                  title={
                                    season[0].toUpperCase() +
                                    season.slice(1, season.length)
                                  }
                                >
                                  <CardMedia
                                    component="img"
                                    sx={{
                                      width: 25,
                                      height: 25,
                                      borderRadius: 5,
                                    }}
                                    image={`/images/icons/${season}.png`}
                                    alt={season}
                                  />
                                </Tooltip>
                              )
                            })}
                          </Box>
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
                              {crop.jojaPrice ? (
                              <>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >{crop.price}g ({crop.shop})</Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >{crop.jojaPrice}g (JojaMart)</Typography>
                              </>) : crop.price ? (<Typography
                                variant="body2"
                                color="text.secondary"
                              >{crop.price}g ({crop.shop})</Typography>) : <Typography
                                variant="body2"
                                color="text.secondary"
                              >N/A</Typography>}

                              <Typography variant="body3">
                                Grow Time
                                <br />
                              </Typography>
                              {crop.regrowthTime ? (
                                <>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    {crop.growTime} days
                                    <br />
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    {crop.regrowthTime} days (Regrowth)
                                    <br />
                                  </Typography>
                                </>
                              ) : crop.irrigatedGrowTime ? (
                                <>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    {crop.growTime} days
                                    <br />
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    {crop.irrigatedGrowTime} days (Irrigated)
                                    <br />
                                  </Typography>
                                </>
                              ) : (
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {crop.growTime} days
                                  <br />
                                </Typography>
                              )}

                              <Typography variant="body3">
                                Sell Price
                                <br />
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Normal: {crop.sellPrice}g <br />
                                Silver: {Math.floor(
                                  crop.sellPrice * 1.25
                                )}g <br />
                                Gold: {Math.floor(crop.sellPrice * 1.5)}g <br />
                                Iridium: {Math.floor(crop.sellPrice * 2)}g
                                <br />
                              </Typography>
                            </CardContent>
                          </Box>
                          <Box
                            sx={{ display: 'flex', alignContent: 'center' }}
                            className="card-image"
                          >
                            <CardMedia
                              component="img"
                              sx={{ width: 75, height: 75 }}
                              image={`/images/crops/${crop.imageUrl}.png`}
                              alt={crop.imageUrl}
                            />
                          </Box>
                        </Box>
                      </Box>

                      {crop.note ? (
                        <Typography
                          sx={{ fontSize: '0.75rem' }}
                          variant="subtitle2"
                        >
                          {crop.note}
                        </Typography>
                      ) : (
                        <></>
                      )}
                    </Card>
                  </Grid>
                )
              })}
            </Grid>
          </Box>
          <Box sx={{ marginTop: '2rem' }}>
            <BottomNavigation
              showLabels
              onChange={() =>{
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              }}
            >
              <BottomNavigationAction label="Back to top" />
            </BottomNavigation>
          </Box>
        </>
      ) : (
        <CircularProgress variant="indeterminate" size={150} thickness={3} />
      )}
    </>
  )
}

export default CropsInfo
