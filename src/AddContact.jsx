import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import db from "./db";

function AddContact() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "contacts"), form);
      navigate(`/contact/${docRef.id}`);
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  return (
    <div>
      <h2>➕ Add Contact</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={form.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={form.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <button type="submit">Add Contact</button>
      </form>
    </div>
  );
}

export default AddContact;
