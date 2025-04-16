import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ContactList from "./ContactList";
import AddContact from "./AddContact";
import ContactDetails from "./ContactDetails";
import EditContact from "./EditContact";
import "./App.css";

function App() {
  return (
    <Router>
      <header>
        <h1>📘 My Contact Book</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/add">Add Contact</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<ContactList />} />
          <Route path="/add" element={<AddContact />} />
          <Route path="/contact/:id" element={<ContactDetails />} />
          <Route path="/edit/:id" element={<EditContact />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
