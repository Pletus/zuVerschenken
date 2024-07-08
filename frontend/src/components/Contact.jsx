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
          <input
            type="text"
            name="name"
            className="field"
            placeholder=""
            required
          />
        </div>
        <div className="input-box flex flex-cols-2 gap-4">
          <div className="w-2/3 ">
            <label className="flex" htmlFor="email">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              className="field flex"
              placeholder=""
              required
            />
          </div>
          <div className="w-1/3">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              name=""
              className="field "
              placeholder=""
              required
            />
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
            <span className="font-f check-text"> Reply by email  </span>
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
          <textarea
            name="message"
            className="field message font-f"
            placeholder=""
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default Contact;
