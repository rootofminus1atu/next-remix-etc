import { useState, useEffect } from 'react'
import api from './api'

function App() {
  const [transactions, setTransations] = useState([])
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    is_income: false,
    date: ''
  })

  const fetchTransactions = async () => {
    const response = await api.get('/transactions')
    setTransations(response.data)
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  const handelInputChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

    setFormData({
      ...formData,
      [e.target.name]: value
    })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    await api.post('/transactions/', formData)
    fetchTransactions()
    setFormData({
      amount: '',
      category: '',
      description: '',
      is_income: false,
      date: ''
    })
  }

  return (
    <div>
      <nav className='navbar navbar-dark bg-primary'>
        <div className='container-fluid'>
          <a className='navbar-brand' href="#">
            Finance App
          </a>

        </div>
      </nav>

      <div className='container'>
        <form onSubmit={handleFormSubmit}>
          <div className='my-3'>
            <label htmlFor="amount" className='form-label'>
              Amount
            </label>
            <input type="text" className='form-control' id='amount' name='amount' onChange={handelInputChange} value={formData.amount} />

          </div>

          <div className='my-3'>
            <label htmlFor="category" className='form-label'>
              Category
            </label>
            <input type="text" className='form-control' id='category' name='category' onChange={handelInputChange} value={formData.category} />

          </div>

          <div className='my-3'>
            <label htmlFor="description" className='form-label'>
              Description
            </label>
            <input type="text" className='form-control' id='description' name='description' onChange={handelInputChange} value={formData.description} />
          </div>

          <div className='my-3'>
            <label htmlFor="is_income" className='form-label'>
              Income?
            </label>
            <input type="checkbox" id='is_income' name='is_income' onChange={handelInputChange} value={formData.is_income} />
          </div>

          <div className='my-3'>
            <label htmlFor="date" className='form-label'>
              Date
            </label>
            <input type="text" className='form-control' id='date' name='date' onChange={handelInputChange} value={formData.date} />
          </div>

          <button type='submit' className='btn btn-primary'>Submit</button>

        </form>

        <table className='table table-striped table-bordered table-hover'>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Category</th>
              <th>Description</th>
              <th>Income?</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.amount}</td>
                <td>{transaction.category}</td>
                <td>{transaction.description}</td>
                <td>{transaction.is_income ? "Yes" : "No"}</td>
                <td>{transaction.date}</td>
              </tr>
            ))}
          </tbody>

        </table>


      </div>
    </div>
  )
}

export default App
