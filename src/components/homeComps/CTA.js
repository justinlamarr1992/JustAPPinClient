import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const CTA = () => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const docReference = addDoc(collection(db, "justappin_users"), {
        name: name,
        company: company,
        email: email,
        phone: phone,
        // FIGURE THIS OUT
        // createdAt: new Timestamp.toDate(),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setName("");
    setCompany("");
    setEmail("");
    setPhone("");
  };

  return (
    <div id="cta">
      <h5 class="call-title">Contact</h5>
      <h4 class="call-text">Get in Touch</h4>
      <form onSubmit={handleSubmit} class="forms">
        <input
          class="form-input1"
          type="text"
          value={name}
          name="name"
          placeholder="Your Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          class="form-input2"
          type="text"
          value={company}
          name="company"
          placeholder="Your Company"
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          class="form-input3"
          type="email"
          value={email}
          name="email"
          placeholder="Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          class="form-input4"
          type="tel"
          value={phone}
          name="phone"
          placeholder="Your Phone"
          onChange={(e) => setPhone(e.target.value)}
        />
        <button class="form-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
export default CTA;
