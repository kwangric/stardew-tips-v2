/* eslint-disable no-unused-vars */
import React from 'react'
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import axios from 'axios'

const VillagersInfo = () => {
  const [villagers, setVillagers] = useState([])

  const getVillagers = async () => {
    try {
      const { data } = await axios.get('/api/villagers')
      return data
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const gotVillagers = async () => {
      const newVillagers = await getVillagers()
      setVillagers(newVillagers)
    }

    gotVillagers()
  }, [])

  return (
    <>
      {villagers.length > 0 ? (
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
            {villagers.map((villager) => {
              return (
                <Grid key={villager.id} item>
                  <Card
                    className="card"
                    variant="outlined"
                    sx={{
                      width: 275,
                      height: 335,
                      display: 'flex',
                      flexDirection: 'column',
                      alignContent: 'flex-start',
                      justifyContent: 'space-between',
                    }}
                    style={{ backgroundColor: '#fcfccc', borderRadius: '25px' }}
                  >
                    <Box>
                      <Box className="card-title" position="relative">
                        {villager.marriage ? (
                          <CardMedia
                          component="img"
                          sx={{
                            width: 20,
                            height: 20,
                            position: 'absolute',
                            top: 10,
                            left: 0,
                          }}
                          image={`/images/icons/mermaids-pendant.png`}
                          alt="mermaids-pendant"
                        />
                        ): villager.roommate ? (
                          <CardMedia
                          component="img"
                          sx={{
                            width: 20,
                            height: 20,
                            position: 'absolute',
                            top: 10,
                            left: 0,
                          }}
                          image={`/images/icons/void-ghost-pendant.png`}
                          alt="void-ghost-pendant"
                        />
                        ) : <></>}

                        <CardMedia
                          component="img"
                          sx={{ width: 75, height: 75 }}
                          image={`/images/villagers/${villager.imageUrl}.png`}
                          alt={villager.imageUrl}
                        />
                        <Typography variant="h5" component="div">
                          {villager.name}
                        </Typography>
                        <Typography variant="body2">
                          {villager.birthday}
                          <br />
                        </Typography>
                      </Box>
                      <Box className="card-information">
                        <CardContent>
                          <Box
                            className="gifts"
                            display="flex"
                            flexWrap="wrap"
                            justifyContent="center"
                            gap="10px"
                          >
                            {villager.lovedGifts.map((gift) => {
                              return (
                                <Tooltip title={gift.name}>
                                  <CardMedia
                                    component="img"
                                    sx={{ width: 50, height: 50 }}
                                    image={`/images/icons/gifts/${gift.imageUrl}.png`}
                                    alt={gift.imageUrl}
                                  />
                                </Tooltip>
                              )
                            })}
                          </Box>
                        </CardContent>
                      </Box>
                    </Box>

                    {villager.note ? (
                      <Typography
                        sx={{ fontSize: '0.75rem' }}
                        variant="subtitle2"
                      >
                        {villager.note}
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
      ) : (
        <h1>Loading</h1>
      )}
    </>
  )
}

export default VillagersInfo
