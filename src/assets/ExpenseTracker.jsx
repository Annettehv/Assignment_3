import React, { useState } from 'react';
import styles from "./ExpenseTracker.module.css";

function ExpenseTracker() {
  
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');

  // Function to add new expenses

  const addExpense = () => {

    // Form validation, check if all the fields except for category is filled out
    if (title.trim() === '' || amount.trim() === '' || date.trim() === '') {
      alert('All fields need to be filled out.');
      return;
    }

    // Create a new expense (object)

    const newExpense = {
      id: Date.now(), // creating unique id
      title,
      amount: parseFloat(amount), // covert amount to a float 
      date: new Date(date).toISOString(), // convert the date to iso8601
      category: category || '-', // default dash if not filled out
    };

    //add the new expenses to the list

    setExpenses([...expenses, newExpense]);

    // clear the form inputs after adding new expense

    setTitle('');
    setAmount('');
    setDate('');
    setCategory('');
  };

    // function to delete

   const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id)); // filter out expense with the given ID
  };

  // function to calculate the total

  const getTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0).toFixed(2); // reduce method to sum up all 
  }; 


  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <div className={styles.form}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <input type="date" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="housing">Housing</option>
          <option value="grocery">Grocery</option>
          <option value="transportation">Transportation</option>
          <option value="clothes">Clothes</option>
          <option value="other">Other</option>
        </select>
        <button onClick={addExpense}>Add Expense</button>
      </div>
      <div className="expenses">
        <h2>Expenses</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Category</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(expense => (
              <tr key={expense.id}>
                <td>{expense.title}</td>
                <td>{expense.amount}</td>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td>{expense.category}</td>
                <td><button onClick={() => deleteExpense(expense.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="total">Total Expenses: kr{getTotalExpenses()}</div>
    </div>
  );
}

export default ExpenseTracker;
