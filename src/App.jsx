import { useState } from "react";
import { useMutation, useQuery } from "../convex/_generated/react";

export default function App() {
  const reservations = useQuery("showReservation") || [];
  const [newMessageText, setNewMessageText] = useState("");
  const sendMessage = useMutation("sendMessage");
  const makeReservation = useMutation("makeReservation");

  const [name] = useState(() => "User " + Math.floor(Math.random() * 10000));
  async function handleSendMessage(event) {
    event.preventDefault();
    setNewMessageText("");
    await sendMessage({ body: newMessageText, author: name });
  }

  async function handleMakeReservation(id, name, restaurant_name, date, time) {
    console.log(id);
    await makeReservation({ id: id, name: name, restaurant_name: restaurant_name, date: date, time: time});
  }

  return (
    <main>
      <h1>Restaurant reservation</h1>
      <p className="badge">
        <span>{name}</span>
      </p>

      <span>restaurant_name</span>
      <span>date</span>
      <span>time</span>
      <span>max_people</span>

      <ul>
        {reservations.map(reservation => (
          <li key={reservation._id.toString()}>
            <span>{reservation.restaurant_name}:</span>
            <span>{reservation.date}:</span>
            <span>{reservation.time}:</span>
            <span>{reservation.max_people}:</span>
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
