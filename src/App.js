import React, { useState, useEffect } from "react";

function App() {
  const [attendee, setAttendee] = useState({});

  const [attendees, setAttendees] = useState([]);

  function handleChange(e) {
    setAttendee({...attendee,[e.target.name]: e.target.value});
  }

  // handle create & update
  const handleFormSubmission = async (event, func) => {
    event.preventDefault();

    const URL = func === 'create'
      ? `http://localhost:3001/users`
      : `http://localhost:3001/${attendee?.id}`;

    const method = func === 'create' ? "POST" : "PUT";

    try {
      const resp = await fetch(URL, {method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(attendee)});

      if (resp.status === 200) setAttendee({});

    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch("http://localhost:3001/users");

      const json = await resp.json();

      if (resp.status === 200) setAttendees(json)
      } catch (error) {
        setAttendees([])
      }

    })();
  }, []);

  function deleteList(id) {
    fetch(`http://localhost:3001/users/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then((data) => {
        
      });
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-5 col-lg-6">
          Form
          <form method="POST">
            <label class="form-label">Full Name</label>
            <input
              name="name"
              type="text"
              value={attendee.name}
              class="form-control"
              placeholder="Full Name"
              onChange={handleChange}
            />
            <label class="form-label">Email address</label>
            <input
              name="email"
              type="email"
              value={attendee.email}
              class="form-control"
              placeholder="Email Address"
              onChange={handleChange}
            />
            <label class="form-label">Age</label>
            <input
              name="age"
              type="number"
              value={attendee.age}
              class="form-control"
              placeholder="Age"
              onChange={handleChange}
            />
            <label class="form-label">Mobile</label>
            <input
              name="mobile"
              type="tel"
              value={attendee.mobile}
              class="form-control"
              placeholder="Mobile Number"
              onChange={handleChange}
            />
            <p className="mt-2">Gender</p>
            <div class="form-check">
              <input
                name="gender"
                class="form-check-input"
                type="radio"
                value={attendee.gender}
                id="flexRadioDefault1"
                onChange={handleChange}
              />
              <label class="form-check-label" for="flexRadioDefault1">
                Male
              </label>
            </div>
            <div class="form-check">
              <input
                name="gender"
                class="form-check-input mt-2"
                type="radio"
                id="flexRadioDefault2"
                onChange={handleChange}
              />
              <label class="form-check-label" for="flexRadioDefault2">
                Female{" "}
              </label>
            </div>
            <button
              type="submit"
              class="btn btn-primary mt-2"
              onClick={(event) => handleFormSubmission(event, attendee?.id ? 'update': 'create')}
            >
              Submit
            </button>
          </form>
        </div>

        <div className="col-12 col-md-7 col-lg-6">
          List
          <div>
            {
              (Array.isArray(attendees) ? attendees : []).map((person) => {
      
              return (
                <div>
                  <ul>
                    <li>
                      Full Name: {person.name}
                      <br />
                      Email Address: {person.email}
                      <br />
                      Mobile Number: {person.mobile}
                      <br />
                      Gender: {person.gender}
                    </li>
                    <button onClick={() => setAttendee(person)} className="btn btn-primary">Edit</button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteList(person.id)}
                    >
                      {" "}
                      Delete
                    </button>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
