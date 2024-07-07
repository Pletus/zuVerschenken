import React from "react";
import "../components/CSS/Contact.css";
import Swal from "sweetalert2";

const Contact = () => {
  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.target; 
    const formData = new FormData(form);

    formData.append("access_key", import.meta.env.VITE_FORM_KEY);

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    console.log("Submitting the following data:", object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });
      const result = await res.json();

      if (result.success) {
        Swal.fire({
          title: "Sucess!",
          text: "Message submitted successfully!",
          icon: "success"
        });
        form.reset(); 
      } else {
        console.error("Error", result);
      }
    } catch (error) {
      console.error("Network error", error);
    }
  };

  return (
    <section className="contact pt-6">
      <form onSubmit={onSubmit} className="mx-6">
        <h2 className="text-4xl pb-2 text-blue-500 font-bold drop-shadow-xl">Contact Form</h2>
        <div className="input-box">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            name="name"
            className="field"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="input-box">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            className="field"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="input-box">
          <label htmlFor="message">Your Message</label>
          <textarea
            name="message"
            className="field message font-f"
            placeholder="Enter your message"
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default Contact;
