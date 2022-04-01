// eslint-disable-next-line no-unused-vars
import React , { useState } from 'react';
import '../Style/expenseForm.css'
import ErrorModal from '../Error/ErrorModal';

const ExpenseForm = (props) => {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredAmount, setEnteredAmount] = useState('');
    const [enteredDate, setEnteredDate] = useState('');
    

    const [error , setError] = useState();    
  
    const titleChangeHandler = (event) => {
      setEnteredTitle(event.target.value);
      
    };
  
    const amountChangeHandler = (event) => {
      setEnteredAmount(event.target.value);
      
    };    
  
    const dateChangeHandler = (event) => {
      setEnteredDate(event.target.value);
      
    };

    
  
    const submitHandler = (event) => {
      event.preventDefault();
      if (enteredTitle.trim().length === 0  || enteredAmount.trim().length === 0  || enteredDate.trim().length === 0) {
        setError({
          title:'Invalid Input',
          message:'Please Enter Valid Input , Amount and Date',
        });
        return;
      }
      if (+enteredAmount < 0) {
        setError({
          title:'Invalid Amount',
          message:'Please Enter Valid Amount()>0',
        });
        return;
      }
      const expenseData = {
        title: enteredTitle,
        amount: enteredAmount,
        date: new Date(enteredDate),
        
      };
  
      props.onSaveExpenseData(expenseData);
      setEnteredTitle('');
      setEnteredAmount('');
      setEnteredDate('');
      
    };
    const errorHandler = () =>{
      setError(null);
    }
  
    return (
      <div>
        {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}
        <form onSubmit={submitHandler}>
          <div className='new-expense__controls'>
            <div className='new-expense__control'>
              <label htmlFor='title'>Title</label>
              <input
                type='text'
                id='title'
                value={enteredTitle}
                onChange={titleChangeHandler}
              />
            </div>
            <div className='new-expense__control'>
              <label htmlFor='amount'>Amount</label>
              <input
                id='amount'
                type='number'
                min='0.01'
                step='0.01'
                pattern="^-?[0-9]\d*\.?\d*$"
                value={enteredAmount}
                onChange={amountChangeHandler}
              />
            </div>
            <div className='new-expense__control'>
              <label htmlFor='date'>Date</label>
              <input
                id='date'
                type='date'
                min='2019-01-01'
                max='2022-12-31'
                value={enteredDate}
                onChange={dateChangeHandler}
              />
            </div>          
          </div>
          <div className='new-expense__actions'>
            <button type="button" onClick={props.onCancel}>Cancel</button>
            <button type='submit'>Add Expense</button>
          </div>
        </form>
      </div>
    );
  };

export default ExpenseForm;