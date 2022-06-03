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
