import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import db from "./db";

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' ou 'desc'

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const contactsCol = collection(db, "contacts");
        const contactSnapshot = await getDocs(contactsCol);
        const contactList = contactSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setContacts(contactList);
        setLoading(false);
      } catch (error) {
        console.error("Error loading contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this contact?");
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, "contacts", id));
      setContacts((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const filteredContacts = contacts
    .filter((contact) =>
      `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const result = a.lastName.localeCompare(b.lastName);
      return sortOrder === "asc" ? result : -result;
    });

  if (loading) return <p>Loading contacts...</p>;

  return (
    <div>
      <h2>📒 Contact List</h2>
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "1rem", padding: "0.5rem", width: "100%" }}
      />
      <button onClick={toggleSortOrder} style={{ marginBottom: "1rem" }}>
        🔃 Sort by Name ({sortOrder === "asc" ? "A → Z" : "Z → A"})
      </button>
      <ul>
        {filteredContacts.map((contact) => (
          <li key={contact.id}>
            <Link to={`/contact/${contact.id}`}>
              <strong>{contact.firstName} {contact.lastName}</strong>
            </Link>{" "}
            – {contact.email}
            <button onClick={() => handleDelete(contact.id)} style={{ marginLeft: "10px" }}>
              🗑️ Delete
            </button>
            <Link to={`/edit/${contact.id}`} style={{ marginLeft: "10px" }}>
              ✏️ Edit
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactList;
