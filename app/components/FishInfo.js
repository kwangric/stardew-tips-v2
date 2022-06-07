/* eslint-disable no-unused-vars */
import React from 'react'
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import FormLabel from '@mui/material/FormLabel'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Grid from '@mui/material/Grid'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import axios from 'axios'

const FishInfo = () => {
  const [fish, setFish] = useState({})
  const [seasons, setSeasons] = useState(['spring', 'summer', 'fall', 'winter'])
  const [seasonFish, setSeasonFish] = useState({})
  const [bundles, setBundles] = useState([])
  const [bundleFish, setBundleFish] = useState({})
  const [displayedFish, setDisplayedFish] = useState({})
  const [multiplier, setMultiplier] = useState(1)

  const getFishBySeason = (season, fish) => {
    let newFish = {}
    for (let key in fish) {
      newFish[key] = fish[key].filter((fish) => {
        const combinedSeasons = new Set(fish.season.concat(season))
        return combinedSeasons.size != fish.season.length + season.length
      })
    }
    return newFish
  }

  const getFishByBundle = (bundles, fish) => {
    let newFish = {}
    for (let key in fish) {
      newFish[key] = fish[key].filter((singleFish) => {
        if (Array.isArray(singleFish.bundle)) {
          return (
            singleFish.bundle.filter((bundle) =>
              bundles.includes(bundle.imageUrl)
            ).length > 0
          )
        }
        return false
      })
    }
    return newFish
  }

  const getFish = async () => {
    try {
      const { data } = await axios.get('/api/fish')
      return data
    } catch (error) {
      console.log(error)
    }
  }

  const changeFishSeason = (season) => {
    let newSeasons = [...seasons]
    if (seasons.includes(season)) {
      newSeasons.splice(seasons.indexOf(season), 1)
      setSeasons(newSeasons)
      const newFish = getFishBySeason(newSeasons, fish)
      setSeasonFish(newFish)
      setDisplayedFish(getFishBySeason(newSeasons, bundleFish))
    } else {
      newSeasons.push(season)
      setSeasons(newSeasons)
      const newFish = getFishBySeason(newSeasons, fish)
      setSeasonFish(newFish)
      setDisplayedFish(getFishBySeason(newSeasons, bundleFish))
    }
  }

  const changeFishBundle = (bundle) => {
    let newBundles = [...bundles]
    if (bundles.includes(bundle)) {
      newBundles.splice(bundles.indexOf(bundle), 1)
      setBundles(newBundles)
      if (newBundles.length === 0) {
        setBundleFish(fish)
        setDisplayedFish(getFishBySeason(seasons, fish))
      } else {
        const newFish = getFishByBundle(newBundles, fish)
        setBundleFish(newFish)
        setDisplayedFish(getFishByBundle(newBundles, seasonFish))
      }
    } else {
      newBundles.push(bundle)
      setBundles(newBundles)
      const newFish = getFishByBundle(newBundles, fish)
      setBundleFish(newFish)
      setDisplayedFish(getFishByBundle(newBundles, seasonFish))
    }
  }

  useEffect(() => {
    const gotFish = async () => {
      const newFish = await getFish()
      setFish(newFish)
      setSeasonFish(newFish)
      setBundleFish(newFish)
      setDisplayedFish(newFish)
    }
    gotFish()
  }, [])

  return (
    <>
      {Object.keys(fish).length > 0 ? (
        <>
          <Typography sx={{ paddingBottom: '2rem' }} variant="h2">
            Fish
          </Typography>
          <Box className="component-view">
            <Container
              className="filters"
              display="flex"
              align="center"
              direction="row"
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '20px 100px',
                  flexWrap: 'wrap'
                }}
              >
                {/* Seasons */}
                <Box display="flex" flexDirection="column" gap="1rem">
                  <FormLabel>Seasons</FormLabel>
                  <Box>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            className="seasonFilter"
                            defaultChecked
                            size="small"
                            value="spring"
                            onChange={(event) => {
                              changeFishSeason(event.target.value)
                            }}
                          />
                        }
                        label="Spring"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            className="seasonFilter"
                            defaultChecked
                            size="small"
                            value="summer"
                            onChange={(event) => {
                              changeFishSeason(event.target.value)
                            }}
                          />
                        }
                        label="Summer"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            className="seasonFilter"
                            defaultChecked
                            size="small"
                            value="fall"
                            onChange={(event) => {
                              changeFishSeason(event.target.value)
                            }}
                          />
                        }
                        label="Fall"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            className="seasonFilter"
                            defaultChecked
                            size="small"
                            value="winter"
                            onChange={(event) => {
                              changeFishSeason(event.target.value)
                            }}
                          />
                        }
                        label="Winter"
                      />
                    </FormGroup>
                  </Box>
                </Box>
                {/* Bundles */}
                <Box display="flex" flexDirection="column" gap="1rem">
                  <FormLabel>Bundles</FormLabel>
                  <Box
                    display="flex"
                    flexDirection="column"
                    flexWrap="wrap"
                    width="275px"
                    height="175px"
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          className="bundleFilter"
                          size="small"
                          value="river-fish-bundle"
                          onChange={(event) => {
                            changeFishBundle(event.target.value)
                          }}
                        />
                      }
                      label="River Fish"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          className="bundleFilter"
                          size="small"
                          value="lake-fish-bundle"
                          onChange={(event) => {
                            changeFishBundle(event.target.value)
                          }}
                        />
                      }
                      label="Lake Fish"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          className="bundleFilter"
                          size="small"
                          value="ocean-fish-bundle"
                          onChange={(event) => {
                            changeFishBundle(event.target.value)
                          }}
                        />
                      }
                      label="Ocean Fish"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          className="bundleFilter"
                          size="small"
                          value="night-fishing-bundle"
                          onChange={(event) => {
                            changeFishBundle(event.target.value)
                          }}
                        />
                      }
                      label="Night Fishing"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          className="bundleFilter"
                          size="small"
                          value="crab-pot-bundle"
                          onChange={(event) => {
                            changeFishBundle(event.target.value)
                          }}
                        />
                      }
                      label="Crab Pot"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          className="bundleFilter"
                          size="small"
                          value="specialty-fish-bundle"
                          onChange={(event) => {
                            changeFishBundle(event.target.value)
                          }}
                        />
                      }
                      label="Specialty Fish"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          className="bundleFilter"
                          size="small"
                          value="quality-fish-bundle"
                          onChange={(event) => {
                            changeFishBundle(event.target.value)
                          }}
                        />
                      }
                      label="Quality Fish"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          className="bundleFilter"
                          size="small"
                          value="master-fishers-bundle"
                          onChange={(event) => {
                            changeFishBundle(event.target.value)
                          }}
                        />
                      }
                      label="Master Fisher's"
                    />
                  </Box>
                </Box>
                {/* Profession */}
                <Box display="flex" flexDirection="column" gap="1rem">
                  <FormLabel>
                    Profession
                  </FormLabel>
                  <RadioGroup
                    value={multiplier}
                    onChange={(event) => {
                      setMultiplier(event.target.value)
                    }}
                  >
                    <FormControlLabel
                      value={1}
                      control={<Radio size="small" />}
                      label="None"
                    />
                    <FormControlLabel
                      value={1.25}
                      control={<Radio size="small" />}
                      label="Fisher"
                    />
                    <FormControlLabel
                      value={1.5}
                      control={<Radio size="small" />}
                      label="Angler"
                    />
                  </RadioGroup>
                </Box>
              </Box>
            </Container>

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
              {displayedFish.fishingPoleFish.map((fish) => {
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
                              image={`/images/icons/${
                                fish.weather[0][0].toLowerCase() +
                                fish.weather[0].slice(1, fish.weather[0].length)
                              }.png`}
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
                            <Typography
                              key={index}
                              variant="body2"
                              color="text.secondary"
                            >
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
                                Normal:{' '}
                                {Math.floor(fish.sellPrice * multiplier)}g{' '}
                                <br />
                                Silver:{' '}
                                {Math.floor(
                                  Math.floor(fish.sellPrice * 1.25) * multiplier
                                )}
                                g <br />
                                Gold:{' '}
                                {Math.floor(
                                  Math.floor(fish.sellPrice * 1.5) * multiplier
                                )}
                                g <br />
                                Iridium:{' '}
                                {Math.floor(
                                  Math.floor(fish.sellPrice * 2) * multiplier
                                )}
                                g
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
              {displayedFish.nightMarketFish.map((fish) => {
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
              {displayedFish.legendaryFish.map((fish) => {
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
                              image={`/images/icons/${
                                fish.weather[0][0].toLowerCase() +
                                fish.weather[0].slice(1, fish.weather[0].length)
                              }.png`}
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
                            <Typography
                              key={index}
                              variant="body2"
                              color="text.secondary"
                            >
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
              {displayedFish.legendaryFish2.map((fish) => {
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
                            <Typography
                              key={index}
                              variant="body2"
                              color="text.secondary"
                            >
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
                beach, they can all be donated to the Crab Pot Bundle. They are
                avaliable all year.
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
              {displayedFish.crabPotFish.map((fish) => {
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
                            <Typography
                              key={index}
                              variant="body2"
                              color="text.secondary"
                            >
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
          {Object.keys(displayedFish).length > 0 ? (
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
          ) : (
            <h2>:(</h2>
          )}
        </>
      ) : (
        <CircularProgress variant="indeterminate" size={150} thickness={3} />
      )}
    </>
  )
}

export default FishInfo
