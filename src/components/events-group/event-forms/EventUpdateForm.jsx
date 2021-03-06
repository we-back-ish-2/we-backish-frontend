import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../App";
import axios from "axios";
// import DateTimePicker from 'react-datetime-picker'
import { useHistory } from "react-router-dom";

const EventUpdateForm = ({ match }) => {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const [eventForm, setEventForm] = useState([]);
  const [updateForm, setUpdateForm] = useState([]);
  console.log(eventForm);

  useEffect(() => {
    const id = match.params.id;
    const url = `http://localhost:4000/event/${id}`;
    console.log(url);
    axios
      .get(url)
      .then((res) => {
        console.log(res);
        const data = res.data;
        setEventForm(data);
        setUpdateForm(data);
        console.log("data has been received");
      })
      .catch(() => {
        console.log("error retreiving data");
      });
  }, []);

  console.log(updateForm);
  // const [date, setDate] = useState(new Date())

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateForm((oldData) => {
      return {
        ...oldData,
        [name]: value,
      };
    });
  };

  // const handleChange = (event) => {
  //     setUpdateForm({ ...updateForm, [event.target.id]: event.target.value })
  // }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(updateForm);
    const id = match.params.id;
    console.log(id);
    const url = `http://localhost:4000/event/edit/${id}`;
    axios
      .put(url, { ...updateForm })
      .then((res) => {
        console.log(res.data);
        // setUpdateForm(preLoadedValues)
        history.push(`/event/${res.data._id}`);
      })
      .catch((err) => console.log(err.data));
  };

  return (
    <section className="updateEventSection">
      <h1>Update Event</h1>
        <form className="form formUpdateEvent" onSubmit={handleSubmit}>
          <div className="form-group">
          <label htmlFor="name">Event Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Event Name"
            onChange={handleChange}
            value={updateForm.name}
          />

          </div>
          <div className="form-group">
          <label htmlFor="addedBy">Hosted by: {updateForm.addedBy}</label>

          </div>
          <div className="form-group">

          <label htmlFor="type">Event Type:</label>
          <select
            type="text"
            id="type"
            name="type"
            onChange={handleChange}
            value={updateForm.type}
          >
            <option placeholder=""></option>
            <option value="Sports and Fitness">Sports and Fitness</option>
            <option value="Games">Games</option>
            <option value="Food">Food</option>
            <option value="Movies">Movies</option>
            <option value="Music">Music</option>
          </select>
          <div className="form-group">

          </div>
          <label htmlFor="date">Date/Time:</label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            onChange={handleChange}
            value={updateForm.date}
          />
          </div>
          <div className="form-group">

          <label htmlFor="City">City:</label>
          <select
            type="text"
            id="city"
            name="city"
            onChange={handleChange}
            value={updateForm.city}
          >
            <option placeholder="Choose Your City"></option>
            <option value="chicago">Chicago, IL</option>
            <option value="dallas">Dallas, TX</option>
            <option value="kansascity">Kansas City, MO</option>
            <option value="orlando">Orlando, FL</option>
          </select>
          </div>
          <div className="form-group">
          <label htmlFor="interact">Level of Interaction:</label>
          <select
            type="text"
            id="interact"
            name="interact"
            onChange={handleChange}
            value={updateForm.interact}
          >
            <option placeholder="Choose Your City"></option>
            <option value="online">Online</option>
            <option value="hybrid">Online &amp; In Person</option>
            <option value="inPerson">In Person</option>
          </select>

          </div>
          <div className="form-group">
          <label htmlFor="socialScale">Sociability Scale:</label>
          <select
            type="text"
            id="socialScale"
            name="socialScale"
            onChange={handleChange}
            value={updateForm.socialScale}
          >
            <option placeholder="Choose Your Level"></option>
            <option value="one">Minimal Interaction</option>
            <option value="two">Little Bit 'o Minglin</option>
            <option value="three">Pants Off Dance Off</option>
          </select>

          </div>
          <div className="form-group">
          <label htmlFor="cost">Event Cost:</label>
          <input
            type="number"
            id="cost"
            name="cost"
            placeholder="Event Cost:"
            onChange={handleChange}
            value={updateForm.cost}
          />

          </div>
          <div className="form-group">
          <label htmlFor="details">Description:</label>
          <textarea
            type="text"
            id="details"
            name="details"
            cols="30"
            rows="10"
            placeholder="click here to type message"
            onChange={handleChange}
            value={updateForm.details}
          ></textarea>

          </div>
          <div className="form-group">
          <label htmlFor="attending">Attending:</label>
          <input
            type="checkbox"
            id="attending"
            name="attending"
            placeholder=""
            onChange={handleChange}
            value="true"
          />

          </div>
          <div className="form-group">
          <button type="submit" className="btn btnMistyRose u-margin-top-25">UPDATE EVENT</button>

          </div>
        </form>
    </section>
  );
};

export default EventUpdateForm;
