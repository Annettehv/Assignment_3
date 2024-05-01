import { useState } from 'react'

import './App.css'

import ExpenseTracker from './assets/ExpenseTracker'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     

      <ExpenseTracker />
    </>
  )
}

export default App
