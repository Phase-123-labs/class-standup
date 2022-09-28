import React from 'react'
import {useState, useEffect} from 'react'

function Form() {

  
  const [form, setForm]= useState({
    name: '',
    email: '',
    age: '',
    mobile: '',
    gender: '',
  })
const [display, setDisplay]= useState([])
  function handleChange(e) {
    setForm({
      ...form, [e.target.name]: e.target.value
    })
  }
const handleSubmit = (e) => {
  e.preventDefault();
  fetch('http://localhost:4000/users', 
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(
      form
    )
  }
  )
  .then(response => response.json())
  .then(data => {
    alert('Success')
     setDisplay(data)})
  setForm(
    {
    name: '',
    email: '',
    age: '',
    mobile: '',
    gender: '',
}
  )
}

  const fetchData = () => {
    fetch("http://localhost:4000/users")
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setDisplay(data)})
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="container">
    <div className="row">
      <div className="col-12 col-md-5 col-lg-6">Form
      <form >
        <label class="form-label">Full Name</label>
        <input name='name' type="text" class="form-control" 
        placeholder="Full Name"
          onChange={handleChange}
        />
        <label class="form-label">Email address</label>
        <input name='email' type="email" class="form-control" 
        placeholder="Email Address"
        onChange={handleChange}
        />
        <label class="form-label">Age</label>
        <input name='age' type="number" class="form-control" 
        placeholder="Age"
        onChange={handleChange}
        />
        <label class="form-label">Mobile</label>
        <input name='mobile' type="tel" class="form-control" 
        placeholder="Mobile Number"
        onChange={handleChange}
        />
        <p className="mt-2">Gender</p>
        <div class="form-check">
          <input name='gender' class="form-check-input" type="radio" id="flexRadioDefault1"
            onChange={handleChange}
          />
          <label class="form-check-label" for="flexRadioDefault1">Male</label>
        </div>
        <div class="form-check">
          <input name='gender' class="form-check-input mt-2" type="radio" id="flexRadioDefault2"
            onChange={handleChange}
          />
          <label class="form-check-label" for="flexRadioDefault2">Female  </label>
        </div>
        <button type="submit" class="btn btn-primary mt-2" onSubmit={handleSubmit} >Submit</button>
      </form>
      </div>
      <div className="col-12 col-md-7 col-lg-6">List
        <div>
          {display?.map (disp => {
          console.log ({disp});
            return (
              <div>
              <ul>
                <li>
                Full Name: {disp.name}
                <br />
                Email Address: {disp.email}
                <br />
                Mobile Number: {disp.mobile}
                <br />
                Gender: {disp.gender}
                </li>
              </ul>
              </div>
            )
          }
          
)
            
 }
        </div>
      </div>
    </div>
    </div>

  )
}

export default Form