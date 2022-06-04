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

const FishInfo = () => {
  const [fish, setFish] = useState({})

  const getFish = async () => {
    try {
      const { data } = await axios.get('/api/fish')
      return data
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const gotFish = async () => {
      const newFish = await getFish()
      setFish(newFish)
    }
    gotFish()
  }, [])

  return (
    <>
      {Object.keys(fish).length > 0 ? (
        <>
          <Typography variant="h2">Fish</Typography>
          <Box className="component-view">
            {/* Fishing Pole Fish */}
            <Box className="section-title">
              <Typography variant="h4">Fishing Pole Fish</Typography>
            </Box>
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
              {fish.fishingPoleFish.map((fish) => {
                return (
                  <Grid key={fish.id} item>
                    <Card
                      className="card"
                      variant="outlined"
                      sx={{
                        width: 275,
                        height: 325,
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
                      <Box className="card-title" position="relative">
                        {fish.weather.length < 3 ? (
                          <Tooltip title={fish.weather.join(', ')}>
                            <CardMedia
                              component="img"
                              sx={{
                                width: 25,
                                height: 25,
                                position: 'absolute',
                                borderRadius: 5,
                                top: 10,
                                left: 0,
                              }}
                              image={`/images/icons/${fish.weather[0][0].toLowerCase() + fish.weather[0].slice(1,fish.weather[0].length)}.png`}
                              alt={fish.weather[0]}
                            />
                          </Tooltip>
                        ) : (
                          <></>
                        )}
                        <Typography variant="h5" component="div">
                          {fish.name}
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '30px',
                            margin: '4% 0',
                          }}
                        >
                          {fish.season.map((season, index) => {
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
                        <Typography variant="body2">
                          {fish.location.join(', ')}
                          <br />
                        </Typography>
                        {fish.time.map((time, index) => {
                          return (
                            <Typography key={index} variant="body2" color="text.secondary">
                              {time}
                              <br />
                            </Typography>
                          )
                        })}
                      </Box>
                      <Box>
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
                                Sell Price
                                <br />
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Normal: {fish.sellPrice}g <br />
                                Silver: {Math.floor(
                                  fish.sellPrice * 1.25
                                )}g <br />
                                Gold: {Math.floor(fish.sellPrice * 1.5)}g <br />
                                Iridium: {Math.floor(fish.sellPrice * 2)}g
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
                              image={`/images/fish/${fish.imageUrl}.png`}
                              alt={fish.imageUrl}
                            />
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            alignContent: 'center',
                            justifyContent: 'center',
                            gap: '20px',
                            height: '30px',
                          }}
                        >
                          {fish.bundle ? (
                            fish.bundle.map((bundle, index) => {
                              return (
                                <Tooltip key={index} title={bundle.name}>
                                  <CardMedia
                                    component="img"
                                    sx={{ width: 25, height: 25 }}
                                    image={`/images/icons/bundles/${bundle.imageUrl}.png`}
                                    alt={bundle.imageUrl}
                                  />
                                </Tooltip>
                              )
                            })
                          ) : (
                            <></>
                          )}
                        </Box>
                      </Box>
                    </Card>
                  </Grid>
                )
              })}
            </Grid>
            {/* Night Market Fish */}
            <Box className="section-title">
              <Typography variant="h4">Night Market Fish</Typography>
              <br />
              <Typography variant="body1">
                These fish are caught in the submarine ride at the Night Market
                during Winter 15-17. Alternatively, they can be caught using
                magic bait in the south-western corner of the beach
              </Typography>
            </Box>
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
              {fish.nightMarketFish.map((fish) => {
                return (
                  <Grid key={fish.id} item>
                    <Card
                      className="card"
                      variant="outlined"
                      sx={{
                        width: 275,
                        height: 165,
                        display: 'flex',
                        flexDirection: 'column',
                        alignContent: 'flex-start',
                        justifyContent: 'flex-start',
                      }}
                      style={{
                        backgroundColor: '#fcfccc',
                        borderRadius: '25px',
                      }}
                    >
                      <Box className="card-title">
                        <Typography variant="h5" component="div">
                          {fish.name}
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
                              Sell Price
                              <br />
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Normal: {fish.sellPrice}g <br />
                              Silver: {Math.floor(fish.sellPrice * 1.25)}g{' '}
                              <br />
                              Gold: {Math.floor(fish.sellPrice * 1.5)}g <br />
                              Iridium: {Math.floor(fish.sellPrice * 2)}g
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
                            image={`/images/fish/${fish.imageUrl}.png`}
                            alt={fish.imageUrl}
                          />
                        </Box>
                      </Box>
                    </Card>
                  </Grid>
                )
              })}
            </Grid>
            {/* Legendary Fish */}
            <Box className="section-title">
              <Typography variant="h4">Legendary Fish</Typography>
              <br />
              <Typography variant="body1">
                These fish can only be caught once per save file.
              </Typography>
            </Box>
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
              {fish.legendaryFish.map((fish) => {
                return (
                  <Grid key={fish.id} item>
                    <Card
                      className="card"
                      variant="outlined"
                      sx={{
                        width: 275,
                        height: 285,
                        display: 'flex',
                        flexDirection: 'column',
                        alignContent: 'flex-start',
                        justifyContent: 'flex-start',
                      }}
                      style={{
                        backgroundColor: '#fcfccc',
                        borderRadius: '25px',
                      }}
                    >
                      <Box className="card-title" position="relative">
                        {fish.weather.length < 3 ? (
                          <Tooltip title={fish.weather.join(', ')}>
                            <CardMedia
                              component="img"
                              sx={{
                                width: 25,
                                height: 25,
                                position: 'absolute',
                                borderRadius: 5,
                                top: 10,
                                left: 0,
                              }}
                              image={`/images/icons/${fish.weather[0][0].toLowerCase() + fish.weather[0].slice(1,fish.weather[0].length)}.png`}
                              alt={fish.weather[0]}
                            />
                          </Tooltip>
                        ) : (
                          <></>
                        )}
                        <Typography variant="h5" component="div">
                          {fish.name}
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '30px',
                            margin: '4% 0',
                          }}
                        >
                          {fish.season.map((season, index) => {
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
                        <Typography variant="body2">
                          {fish.location.join(', ')}
                          <br />
                        </Typography>
                        {fish.time.map((time, index) => {
                          return (
                            <Typography key={index} variant="body2" color="text.secondary">
                              {time}
                              <br />
                            </Typography>
                          )
                        })}
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
                              Sell Price
                              <br />
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Normal: {fish.sellPrice}g <br />
                              Silver: {Math.floor(fish.sellPrice * 1.25)}g{' '}
                              <br />
                              Gold: {Math.floor(fish.sellPrice * 1.5)}g <br />
                              Iridium: {Math.floor(fish.sellPrice * 2)}g
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
                            image={`/images/fish/${fish.imageUrl}.png`}
                            alt={fish.imageUrl}
                          />
                        </Box>
                      </Box>

                      {fish.notes ? (
                        <Typography
                          sx={{ fontSize: '0.75rem' }}
                          variant="subtitle2"
                        >
                          {fish.notes}
                        </Typography>
                      ) : (
                        <></>
                      )}
                    </Card>
                  </Grid>
                )
              })}
            </Grid>
            {/* Legendary Fish 2 */}
            <Box className="section-title">
              <Typography variant="h4">Legendary Fish 2</Typography>
              <br />
              <Typography variant="body1">
                These fish can only be caught during the Extended Family Qi's
                Challenge. They are avaliable all year.
              </Typography>
            </Box>
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
              {fish.legendaryFish2.map((fish) => {
                return (
                  <Grid key={fish.id} item>
                    <Card
                      className="card"
                      variant="outlined"
                      sx={{
                        width: 275,
                        height: 285,
                        display: 'flex',
                        flexDirection: 'column',
                        alignContent: 'flex-start',
                        justifyContent: 'flex-start',
                      }}
                      style={{
                        backgroundColor: '#fcfccc',
                        borderRadius: '25px',
                      }}
                    >
                      <Box className="card-title">
                        <Typography variant="h5" component="div">
                          {fish.name}
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '30px',
                            margin: '4% 0',
                          }}
                        >
                          {fish.season.map((season, index) => {
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
                        <Typography variant="body2">
                          {fish.location.join(', ')}
                          <br />
                        </Typography>
                        {fish.time.map((time, index) => {
                          return (
                            <Typography key={index} variant="body2" color="text.secondary">
                              {time}
                              <br />
                            </Typography>
                          )
                        })}
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
                              Sell Price
                              <br />
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Normal: {fish.sellPrice}g <br />
                              Silver: {Math.floor(fish.sellPrice * 1.25)}g{' '}
                              <br />
                              Gold: {Math.floor(fish.sellPrice * 1.5)}g <br />
                              Iridium: {Math.floor(fish.sellPrice * 2)}g
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
                            image={`/images/fish/${fish.imageUrl}.png`}
                            alt={fish.imageUrl}
                          />
                        </Box>
                      </Box>

                      {fish.notes ? (
                        <Typography
                          sx={{ fontSize: '0.75rem' }}
                          variant="subtitle2"
                        >
                          {fish.notes}
                        </Typography>
                      ) : (
                        <></>
                      )}
                    </Card>
                  </Grid>
                )
              })}
            </Grid>
            {/* Crab Pot Fish */}
            <Box className="section-title">
              <Typography variant="h4">Crab Pot Fish</Typography>
              <br />
              <Typography variant="body1">
                These fish are caught using a baited crab pot or foraged on the
                beach. They are avaliable all year.
              </Typography>
            </Box>
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
              {fish.crabPotFish.map((fish) => {
                return (
                  <Grid key={fish.id} item>
                    <Card
                      className="card"
                      variant="outlined"
                      sx={{
                        width: 275,
                        height: 200,
                        display: 'flex',
                        flexDirection: 'column',
                        alignContent: 'flex-start',
                        justifyContent: 'flex-start',
                      }}
                      style={{
                        backgroundColor: '#fcfccc',
                        borderRadius: '25px',
                      }}
                    >
                      <Box className="card-title">
                        <Typography variant="h5" component="div">
                          {fish.name}
                        </Typography>
                        <Typography variant="body2">
                          {fish.location.join(', ')}
                          <br />
                        </Typography>
                        {fish.time.map((time, index) => {
                          return (
                            <Typography key={index} variant="body2" color="text.secondary">
                              {time}
                              <br />
                            </Typography>
                          )
                        })}
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
                              Sell Price
                              <br />
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Normal: {fish.sellPrice}g <br />
                              Silver: {Math.floor(fish.sellPrice * 1.25)}g{' '}
                              <br />
                              Gold: {Math.floor(fish.sellPrice * 1.5)}g <br />
                              Iridium: {Math.floor(fish.sellPrice * 2)}g
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
                            image={`/images/fish/${fish.imageUrl}.png`}
                            alt={fish.imageUrl}
                          />
                        </Box>
                      </Box>
                    </Card>
                  </Grid>
                )
              })}
            </Grid>
          </Box>
          <Box sx={{ marginTop: '2rem' }}>
            <BottomNavigation
              showLabels
              onChange={() => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                })
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

export default FishInfo
