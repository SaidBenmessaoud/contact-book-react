import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import db from "./db";

function ContactDetails() {
  const { id } = useParams();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const docRef = doc(db, "contacts", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setContact({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Error loading contact:", error);
      }
    };

    fetchContact();
  }, [id]);

  if (!contact) return <p>Loading contact details...</p>;

  return (
    <div>
      <h2>👁️ Contact Details</h2>
      <p><strong>First Name:</strong> {contact.firstName}</p>
      <p><strong>Last Name:</strong> {contact.lastName}</p>
      <p><strong>Email:</strong> {contact.email}</p>
    </div>
  );
}

export default ContactDetails;
