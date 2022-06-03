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
                    <p>Home</p>
                  </Typography>
                </MenuItem>
              </Link>
              <Link className="nav-item" to="/crops">
                <MenuItem>
                  <Typography textAlign="center">
                    <p>Crops</p>
                  </Typography>
                </MenuItem>
              </Link>
              <Link className="nav-item" to="/villagers">
                <MenuItem>
                  <Typography textAlign="center">
                    <p>Villagers</p>
                  </Typography>
                </MenuItem>
              </Link>
              <Link className="nav-item" to="/fish">
                <MenuItem key="Home">
                  <Typography textAlign="center">
                    <p>Fish</p>
                  </Typography>
                </MenuItem>
              </Link>
              {/* <Link className="nav-item" to="/bundles">
                <MenuItem key="Home">
                  <Typography textAlign="center">
                    <p>Bundles</p>
                  </Typography>
                </MenuItem>
              </Link> */}
            </Toolbar>
          </Container>
        </AppBar>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/crops" element={<CropsInfo />} />
            <Route path="/villagers" element={<VillagersInfo />} />
            <Route path="/fish" element={<FishInfo />} />
            {/* <Route path="/bundles" element={<BundlesInfo />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
