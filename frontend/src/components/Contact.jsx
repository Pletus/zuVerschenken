import React from "react";
import "../components/CSS/Contact.css";
import Swal from "sweetalert2";
import user from "../assets/user-solid.svg";
import mail from "../assets/envelope.svg";
import phone from "../assets/phone.svg";
import paragraph from "../assets/paragraph.svg"
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
          Accept: "application/json",
        },
        body: json,
      });
      const result = await res.json();

      if (result.success) {
        Swal.fire({
          title: "Sucess!",
          text: "Message submitted successfully!",
          icon: "success",
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
    <section className="contact p-10">
      <form onSubmit={onSubmit} className="mx-6">
        <h2 className="pb-2 text-blue-500 font-bold drop-shadow-xl">
          Contact Form
        </h2>
        <div className="input-box">
          <label htmlFor="name">Full Name *</label>
          <div className="input-group">
            <input
              type="text"
              name="name"
              className="field"
              placeholder=""
              required
            />
            <img src={user} alt="" className="w-9 h-9 pt-4" />
          </div>
        </div>
        <div className="input-box flex flex-cols-2 gap-4">
          <div className="w-2/3 ">
            <label className="flex" htmlFor="email">
              Email Address *
            </label>
            <div className="input-group">
              <input
                type="email"
                name="email"
                className="field flex"
                placeholder=""
                required
              />
              <img src={mail} alt="" className="w-9 h-9 pt-4" />
            </div>
          </div>
          <div className="w-1/3">
            <label htmlFor="phone">Phone</label>
            <div className="input-group" >
              <input
                type="tel"
                name=""
                className="field "
                placeholder=""
                required
              />
              <img src={phone} alt="" className="w-9 h-9 pt-4" />
            </div>
          </div>
        </div>
        <div>
          <h1 className="mt-6 font-f">Contact preference</h1>
        </div>
        <div className="flex gap-10">
          <div>
            <input
              className="custom-checkbox"
              name="democheckbox"
              type="checkbox"
              value="email"
            />
            <span className="font-f check-text"> Reply by email </span>
          </div>
          <div>
            <input
              className="custom-checkbox"
              name="democheckbox"
              type="checkbox"
              value="Phone"
            />
            <span className=" font-f check-text"> Reply by phone </span>
          </div>
        </div>
        <div className="input-box">
          <label htmlFor="message">Your Message *</label>
          <div className="input-group">
            <textarea
              name="message"
              className="field message font-f"
              placeholder=""
              required
            ></textarea>
            <img src={paragraph} alt="" className="w-9 h-9 pt-4" />
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default Contact;
