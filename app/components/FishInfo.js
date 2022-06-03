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
        <Box className="component-view">
          {/* Fishing Pole Fish */}
          <h2>Fishing Pole Fish</h2>
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
                      height: 300,
                      display: 'flex',
                      flexDirection: 'column',
                      alignContent: 'flex-start',
                      justifyContent: 'space-between',
                    }}
                    style={{ backgroundColor: '#fcfccc', borderRadius: '25px' }}
                  >
                    <Box className="card-title">
                      <Typography variant="h5" component="div">
                        {fish.name}
                      </Typography>
                      <Typography variant="body2">
                        {fish.season.length === 4
                          ? 'All Year'
                          : fish.season
                              .map(
                                (season) =>
                                  season[0].toUpperCase() +
                                  season.slice(1, season.length)
                              )
                              .join(', ')}
                        <br />
                      </Typography>
                      <Typography variant="body2">
                        {fish.location.join(', ')}
                        <br />
                      </Typography>
                      {fish.time.map((time) => {
                        return (
                          <Typography variant="body2" color="text.secondary">
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
                            Weather
                            <br />
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {fish.weather.length === 3
                              ? 'Any'
                              : fish.weather.join(', ')}
                            <br />
                          </Typography>
                          <Typography variant="body3">
                            Sell Price
                            <br />
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Normal: {fish.sellPrice}g <br />
                            Silver: {Math.floor(fish.sellPrice * 1.25)}g <br />
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

                    {fish.note ? (
                      <Typography variant="subtitle2">{fish.notes}</Typography>
                    ) : (
                      <></>
                    )}
                  </Card>
                </Grid>
              )
            })}
          </Grid>
          {/* Night Market Fish */}
          <h2>Night Market Fish</h2>
          <p>These fish are caught in the submarine ride at the Night Market during Winter 15-17. Alternatively, they can be caught using magic bait in the South-western corner of the beach</p>
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
                      height: 300,
                      display: 'flex',
                      flexDirection: 'column',
                      alignContent: 'flex-start',
                      justifyContent: 'flex-start',
                    }}
                    style={{ backgroundColor: '#fcfccc', borderRadius: '25px' }}
                  >
                    <Box className="card-title">
                      <Typography variant="h5" component="div">
                        {fish.name}
                      </Typography>
                      <Typography variant="body2">
                        {fish.season.length === 4
                          ? 'All Year'
                          : fish.season
                              .map(
                                (season) =>
                                  season[0].toUpperCase() +
                                  season.slice(1, season.length)
                              )
                              .join(', ')}
                        <br />
                      </Typography>
                      <Typography variant="body2">
                        {fish.location.join(', ')}
                        <br />
                      </Typography>
                      {fish.time.map((time) => {
                        return (
                          <Typography variant="body2" color="text.secondary">
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
                            Weather
                            <br />
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {fish.weather.length === 3
                              ? 'Any'
                              : fish.weather.join(', ')}
                            <br />
                          </Typography>
                          <Typography variant="body3">
                            Sell Price
                            <br />
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Normal: {fish.sellPrice}g <br />
                            Silver: {Math.floor(fish.sellPrice * 1.25)}g <br />
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
                      <Typography variant="subtitle2">{fish.notes}</Typography>
                    ) : (
                      <></>
                    )}
                  </Card>
                </Grid>
              )
            })}
          </Grid>
          {/* Legendary Fish */}
          <h2>Legendary Fish</h2>
          <p>These fish can only be caught once per save file.</p>
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
                      height: 300,
                      display: 'flex',
                      flexDirection: 'column',
                      alignContent: 'flex-start',
                      justifyContent: 'flex-start',
                    }}
                    style={{ backgroundColor: '#fcfccc', borderRadius: '25px' }}
                  >
                    <Box className="card-title">
                      <Typography variant="h5" component="div">
                        {fish.name}
                      </Typography>
                      <Typography variant="body2">
                        {fish.season.length === 4
                          ? 'All Year'
                          : fish.season
                              .map(
                                (season) =>
                                  season[0].toUpperCase() +
                                  season.slice(1, season.length)
                              )
                              .join(', ')}
                        <br />
                      </Typography>
                      <Typography variant="body2">
                        {fish.location.join(', ')}
                        <br />
                      </Typography>
                      {fish.time.map((time) => {
                        return (
                          <Typography variant="body2" color="text.secondary">
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
                            Weather
                            <br />
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {fish.weather.length === 3
                              ? 'Any'
                              : fish.weather.join(', ')}
                            <br />
                          </Typography>
                          <Typography variant="body3">
                            Sell Price
                            <br />
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Normal: {fish.sellPrice}g <br />
                            Silver: {Math.floor(fish.sellPrice * 1.25)}g <br />
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
                      <Typography variant="subtitle2">{fish.notes}</Typography>
                    ) : (
                      <></>
                    )}
                  </Card>
                </Grid>
              )
            })}
          </Grid>
          {/* Legendary Fish 2 */}
          <h2>Legendary Fish 2</h2>
          <p>These fish can only be caught during the Extended Family Qi's Challenge.</p>
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
                      height: 300,
                      display: 'flex',
                      flexDirection: 'column',
                      alignContent: 'flex-start',
                      justifyContent: 'flex-start',
                    }}
                    style={{ backgroundColor: '#fcfccc', borderRadius: '25px' }}
                  >
                    <Box className="card-title">
                      <Typography variant="h5" component="div">
                        {fish.name}
                      </Typography>
                      <Typography variant="body2">
                        {fish.season.length === 4
                          ? 'All Year'
                          : fish.season
                              .map(
                                (season) =>
                                  season[0].toUpperCase() +
                                  season.slice(1, season.length)
                              )
                              .join(', ')}
                        <br />
                      </Typography>
                      <Typography variant="body2">
                        {fish.location.join(', ')}
                        <br />
                      </Typography>
                      {fish.time.map((time) => {
                        return (
                          <Typography variant="body2" color="text.secondary">
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
                            Weather
                            <br />
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {fish.weather.length === 3
                              ? 'Any'
                              : fish.weather.join(', ')}
                            <br />
                          </Typography>
                          <Typography variant="body3">
                            Sell Price
                            <br />
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Normal: {fish.sellPrice}g <br />
                            Silver: {Math.floor(fish.sellPrice * 1.25)}g <br />
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
                      <Typography variant="subtitle2">{fish.notes}</Typography>
                    ) : (
                      <></>
                    )}
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </Box>
      ) : (
        <h1>Loading</h1>
      )}
    </>
  )
}

export default FishInfo
