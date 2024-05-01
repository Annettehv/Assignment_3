import { useState } from 'react'

import './App.css'

import ExpenseTracker from './assets/ExpenseTracker'
import ExpenseForm from './assets/ExpenseForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     

      <ExpenseTracker />
    </>
  )
}

export default App
