(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    var val = aliases[name];
    return (val && name !== val) ? expandAlias(val) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("App.js", function(exports, require, module) {
/* eslint-disable no-unused-vars */
import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Home from './components/Home'
import CropsInfo from './components/CropsInfo'
import VillagersInfo from './components/VillagersInfo'
import FishInfo from './components/FishInfo'
import BundlesInfo from './components/BundlesInfo'

const App = () => {
  return (
    <Router>
      <div>
        <AppBar position="static" sx={{ marginBottom: '2rem' }}>
          <Container maxWidth="xl">
            <Toolbar
              sx={{ display: 'flex', justifyContent: 'center', gap: '50px' }}
              disableGutters
            >
              <Link className="nav-item" to="/">
                <MenuItem>
                  <Typography textAlign="center">
                    Home
                  </Typography>
                </MenuItem>
              </Link>
              <Link className="nav-item" to="/crops">
                <MenuItem>
                  <Typography textAlign="center">
                    Crops
                  </Typography>
                </MenuItem>
              </Link>
              <Link className="nav-item" to="/villagers">
                <MenuItem>
                  <Typography textAlign="center">
                    Villagers
                  </Typography>
                </MenuItem>
              </Link>
              <Link className="nav-item" to="/fish">
                <MenuItem key="Home">
                  <Typography textAlign="center">
                    Fish
                  </Typography>
                </MenuItem>
              </Link>
            </Toolbar>
          </Container>
        </AppBar>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/crops" element={<CropsInfo />} />
            <Route path="/villagers" element={<VillagersInfo />} />
            <Route path="/fish" element={<FishInfo />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

});

;require.register("components/BundlesInfo.js", function(exports, require, module) {
/* eslint-disable no-unused-vars */
import React from 'react';
import Typography from '@mui/material/Typography'

const BundlesInfo = () => {
  return (
    <Typography sx={{paddingBottom: "2rem"}} variant="h2">Coming Soon!</Typography>
  )
}

export default BundlesInfo

});

;require.register("components/Changelog.js", function(exports, require, module) {
/* eslint-disable no-unused-vars */
import React from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'

const Changelog = () => {
  return (
    <Box
      className="component-view changelog"
      sx={{
        width: '100%',
        maxWidth: 400,
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
      }}
    >
      <Divider variant="middle" />
      <Typography variant="h4">Changelog</Typography>
      <Box>
        <Typography variant="h6">v2.0.0 Jun 8, 2022</Typography>
        <Typography variant="body1">
          Site overhaul. Added crops and removed bundle guide. Legacy site can
          be found&nbsp;
          <Link
            color="primary"
            href="https://kwangric.github.io/stardewtips/index.html"
            target="_blank"
          >
            here
          </Link>
          .
        </Typography>
      </Box>
    </Box>
  )
}

export default Changelog

});

;require.register("components/CropsInfo.js", function(exports, require, module) {
/* eslint-disable no-unused-vars */
import React from 'react'
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
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

const CropsInfo = () => {
  const [crops, setCrops] = useState([])
  const [seasons, setSeasons] = useState(['spring', 'summer', 'fall'])
  const [displayedCrops, setDisplayedCrops] = useState([])
  const [priceMultiplier, setPriceMultiplier] = useState(1)

  const getCropsBySeason = (season, crops) => {
    if (Array.isArray(season)) {
      return crops.filter((crop) => {
        const combinedSeasons = new Set(crop.season.concat(season))
        return combinedSeasons.size != crop.season.length + season.length
      })
    }
    return crops.filter((crop) => crop.season.includes(season))
  }

  const getCrops = async () => {
    try {
      const { data } = await axios.get('/api/crops')
      return data
    } catch (error) {
      console.log(error)
    }
  }

  const changeCrops = (season) => {
    let newSeasons = [...seasons]
    if (seasons.includes(season)) {
      newSeasons.splice(seasons.indexOf(season), 1)
      setSeasons(newSeasons)
      setDisplayedCrops(getCropsBySeason(newSeasons, crops))
    } else {
      newSeasons.push(season)
      setSeasons(newSeasons)
      setDisplayedCrops(getCropsBySeason(newSeasons, crops))
    }
  }

  useEffect(() => {
    const gotCrops = async () => {
      const newCrops = await getCrops()
      setCrops(newCrops)
      setDisplayedCrops(newCrops)
    }
    gotCrops()
  }, [])

  return (
    <>
      {crops.length > 0 ? (
        <>
          <Typography sx={{ paddingBottom: '2rem' }} variant="h2">
            Crops
          </Typography>
          <Box className="component-view">
            <Container className="filters"
              display="flex"
              align="center"
              direction="row">
              <Box sx={{ display: 'flex',
                  justifyContent: 'center', gap: '20px 100px',
                  flexWrap: 'wrap'}}>
                <Box display="flex" flexDirection="column" gap="1rem" height='190px'>
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
                              changeCrops(event.target.value)
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
                              changeCrops(event.target.value)
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
                              changeCrops(event.target.value)
                            }}
                          />
                        }
                        label="Fall"
                      />
                    </FormGroup>
                  </Box>
                </Box>
                {/* Profession */}
                <Box display="flex" flexDirection="column" gap="1rem" height='150px'>
                  <FormLabel>
                    Profession
                  </FormLabel>
                  <RadioGroup
                    value={priceMultiplier}
                    onChange={(event) => {
                      setPriceMultiplier(event.target.value)
                    }}
                  >
                    <FormControlLabel
                      value={1}
                      control={<Radio size="small" />}
                      label="None"
                    />
                    <FormControlLabel
                      value={1.10}
                      control={<Radio size="small" />}
                      label="Tiller"
                    />
                  </RadioGroup>
                </Box>
              </Box>
            </Container>
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
              {displayedCrops.map((crop) => {
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
                                  >
                                    {crop.price}g ({crop.shop})
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    {crop.jojaPrice}g (JojaMart)
                                  </Typography>
                                </>
                              ) : crop.price ? (
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {crop.price}g ({crop.shop})
                                </Typography>
                              ) : (
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  N/A
                                </Typography>
                              )}

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
                                Normal: {Math.floor(crop.sellPrice * priceMultiplier)}g <br />
                                Silver: {Math.floor(
                                  Math.floor(crop.sellPrice * 1.25) * priceMultiplier
                                )}g <br />
                                Gold: {Math.floor(Math.floor(crop.sellPrice * 1.5) * priceMultiplier)}g <br />
                                Iridium: {Math.floor(Math.floor(crop.sellPrice * 2)* priceMultiplier)}g
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
          {displayedCrops.length > 0 ? (
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

export default CropsInfo

});

;require.register("components/FishInfo.js", function(exports, require, module) {
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
import Paper from '@mui/material/Paper'
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
        <div height="100vh">
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
                  flexWrap: 'wrap',
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
                  <FormLabel>Profession</FormLabel>
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
            {displayedFish.fishingPoleFish.length ? (
              <>
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
                                    fish.weather[0].slice(
                                      1,
                                      fish.weather[0].length
                                    )
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
                                      Math.floor(fish.sellPrice * 1.25) *
                                        multiplier
                                    )}
                                    g <br />
                                    Gold:{' '}
                                    {Math.floor(
                                      Math.floor(fish.sellPrice * 1.5) *
                                        multiplier
                                    )}
                                    g <br />
                                    Iridium:{' '}
                                    {Math.floor(
                                      Math.floor(fish.sellPrice * 2) *
                                        multiplier
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
              </>
            ) : (
              <></>
            )}
            {/* Night Market Fish */}
            {displayedFish.nightMarketFish.length ? (
              <>
                <Box className="section-title">
                  <Typography variant="h4">Night Market Fish</Typography>
                  <br />
                  <Typography variant="body1">
                    These fish are caught in the submarine ride at the Night
                    Market during Winter 15-17. Alternatively, they can be
                    caught using magic bait in the south-western corner of the
                    beach
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
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Normal:{' '}
                                  {Math.floor(fish.sellPrice * multiplier)}g{' '}
                                  <br />
                                  Silver:{' '}
                                  {Math.floor(
                                    Math.floor(fish.sellPrice * 1.25) *
                                      multiplier
                                  )}
                                  g <br />
                                  Gold:{' '}
                                  {Math.floor(
                                    Math.floor(fish.sellPrice * 1.5) *
                                      multiplier
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
                        </Card>
                      </Grid>
                    )
                  })}
                </Grid>
              </>
            ) : (
              <></>
            )}
            {/* Legendary Fish */}
            {displayedFish.legendaryFish.length ? (
              <>
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
                                    fish.weather[0].slice(
                                      1,
                                      fish.weather[0].length
                                    )
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
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Normal:{' '}
                                  {Math.floor(fish.sellPrice * multiplier)}g{' '}
                                  <br />
                                  Silver:{' '}
                                  {Math.floor(
                                    Math.floor(fish.sellPrice * 1.25) *
                                      multiplier
                                  )}
                                  g <br />
                                  Gold:{' '}
                                  {Math.floor(
                                    Math.floor(fish.sellPrice * 1.5) *
                                      multiplier
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
              </>
            ) : (
              <></>
            )}
            {/* Legendary Fish 2 */}
            {displayedFish.legendaryFish2.length ? (
              <>
                <Box className="section-title">
                  <Typography variant="h4">Legendary Fish 2</Typography>
                  <br />
                  <Typography variant="body1">
                    These fish can only be caught during the Extended Family
                    Qi's Challenge. They are avaliable all year.
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
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Normal:{' '}
                                  {Math.floor(fish.sellPrice * multiplier)}g{' '}
                                  <br />
                                  Silver:{' '}
                                  {Math.floor(
                                    Math.floor(fish.sellPrice * 1.25) *
                                      multiplier
                                  )}
                                  g <br />
                                  Gold:{' '}
                                  {Math.floor(
                                    Math.floor(fish.sellPrice * 1.5) *
                                      multiplier
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
              </>
            ) : (
              <></>
            )}
            {/* Crab Pot Fish */}
            {displayedFish.crabPotFish.length ? (
              <>
                <Box className="section-title">
                  <Typography variant="h4">Crab Pot Fish</Typography>
                  <br />
                  <Typography variant="body1">
                    These fish are caught using a baited crab pot or foraged on
                    the beach, they can all be donated to the Crab Pot Bundle.
                    They are avaliable all year.
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
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Normal:{' '}
                                  {Math.floor(fish.sellPrice * multiplier)}g{' '}
                                  <br />
                                  Silver:{' '}
                                  {Math.floor(
                                    Math.floor(fish.sellPrice * 1.25) *
                                      multiplier
                                  )}
                                  g <br />
                                  Gold:{' '}
                                  {Math.floor(
                                    Math.floor(fish.sellPrice * 1.5) *
                                      multiplier
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
                        </Card>
                      </Grid>
                    )
                  })}
                </Grid>
              </>
            ) : (
              <></>
            )}
          </Box>
          {Object.keys(displayedFish).filter(
            (key) => displayedFish[key].length > 0
          ).length > 0 ? (
            (bundles.length < 1 || bundles.length > 3) ? (
              <Box sx={{ marginTop: '2rem' }}>
                <Paper
                  className="bottom-nav"
                  sx={{ bottom: 0, left: 0, right: 0 }}
                  elevation={3}
                >
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
                </Paper>
              </Box>
            ) : (
              <Box height="50px" />
            )
          ) : (
            <h2>:(</h2>
          )}
        </div>
      ) : (
        <CircularProgress variant="indeterminate" size={150} thickness={3} />
      )}
    </>
  )
}

export default FishInfo

});

;require.register("components/Home.js", function(exports, require, module) {
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

});

;require.register("components/VillagersInfo.js", function(exports, require, module) {
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
        <>
        <Typography sx={{paddingBottom: "2rem"}} variant="h2">Villagers</Typography>
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
                        height: 350,
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
                          ) : villager.roommate ? (
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
                          ) : (
                            <></>
                          )}

                          <CardMedia
                            component="img"
                            sx={{ width: 75, height: 75, margin: "5px", padding: "10px 0 0 0", border: "3px solid black", borderRadius: "25px 25px 5px 5px", background: "#d9ac72"}}
                            image={`/images/villagers/${villager.imageUrl}.png`}
                            alt={villager.imageUrl}
                          />
                          <Typography variant="h5" component="div">
                            {villager.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
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
                              {villager.lovedGifts.map((gift, index) => {
                                return (
                                  <Tooltip key={index} title={gift.name}>
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

export default VillagersInfo

});

;require.register("index.js", function(exports, require, module) {
/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import App from './App'
import { createRoot } from 'react-dom/client';

const container = document.getElementById('app')
const root = createRoot(container)

root.render(
      <App />
)

});

;require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');

