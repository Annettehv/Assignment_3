import React, { useState } from 'react';
import styles from "./ExpenseTracker.module.css";

function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');

  const addExpense = () => {
    if (title.trim() === '' || amount.trim() === '' || date.trim() === '') {
      alert('All fields need to be filled out.');
      return;
    }

    const newExpense = {
      id: Date.now(),
      title,
      amount: parseFloat(amount),
      date: new Date(date).toISOString(),
      category: category || '-',
    };

    setExpenses([...expenses, newExpense]);
    setTitle('');
    setAmount('');
    setDate('');
    setCategory('');
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
