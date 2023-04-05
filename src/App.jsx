import { useState } from "react";
import { useMutation, useQuery } from "../convex/_generated/react";

export default function App() {
 
  const [newMessageText, setNewMessageText] = useState("");
  const [num_people, set_num_people]= useState(0);
  const sendMessage = useMutation("sendMessage");
  const makeReservation = useMutation("makeReservation");

  const [name] = useState(() => "User " + Math.floor(Math.random() * 10000));
  async function handleSendMessage(event) {
    event.preventDefault();
    setNewMessageText("");
    await sendMessage({ body: newMessageText, author: name });
  }


  async function handleMakeReservation(id, name, restaurant_name, date, time) {
    await makeReservation({ id: id, name: name, restaurant_name: restaurant_name, date: date, time: time});
  }
  const reservations = useQuery("showReservation", {num_people: num_people}) || [];
  const [open, setOpen] = useState(false);
  return (
    <main>
      <h1>Restaurant reservation</h1>
      <p className="badge">
        <span>{name}</span>
      </p>

      <div className="dropdown">
      <button onClick={() => setOpen(!open)}>num of people</button>
      {open ? (
        <ul className="menu">
          <li className="menu-item">
            <button onClick={() => set_num_people(1)}>1</button>
          </li>
          <li className="menu-item">
            <button onClick={() => set_num_people(2)}>2</button>
          </li>
          <li className="menu-item">
            <button onClick={() => set_num_people(3)}>3</button>
          </li>
          <li className="menu-item">
            <button onClick={() => set_num_people(4)}>4</button>
          </li>
          <li className="menu-item">
            <button onClick={() => set_num_people(5)}>5</button>
          </li>
          <li className="menu-item">
            <button onClick={() => set_num_people(6)}>6</button>
          </li>
          <li className="menu-item">
            <button onClick={() => set_num_people(7)}>7</button>
          </li>
          <li className="menu-item">
            <button onClick={() => set_num_people(8)}>8</button>
          </li>
        </ul>
      ) : null}
    </div>
    <h2>remaining reservations</h2>

      <span>restaurant_name</span>
      <span className="white-text">restaurant_name</span>
      <span>date</span>
      <span className="white-text">restaurant_name</span>
      <span>time</span>
      <span className="white-text">restaurant_name</span>
      <span>max_people</span>
      <span className="white-text">restaurant_name</span>

      <ul>
        {reservations.map(reservation => (
          <li key={reservation._id.toString()}>
            <span>{reservation.restaurant_name}</span>
            <span className="white-text">restaurant_name</span>
            <span>{reservation.date}</span>
            <span className="white-text">restaurant_name</span>
            <span>{reservation.time}</span>
            <span className="white-text">restaurant_name</span>
            <span>{reservation.max_people}</span>
            <span className="white-text">restaurant_name</span>
            <button onClick={() => handleMakeReservation(reservation._id, name, reservation.restaurant_name, reservation.date, reservation.time)}>Reserve</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSendMessage}>
        <input
          value={newMessageText}
          onChange={event => setNewMessageText(event.target.value)}
          placeholder="Write a message…"
        />
        <input type="submit" value="Send" disabled={!newMessageText} />
      </form>
    </main>
  );
}
