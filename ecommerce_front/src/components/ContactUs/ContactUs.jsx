import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import style from "./ContactUs.module.css";

const serviceId = import.meta.env.VITE_SERVICE_ID;
const templateId = import.meta.env.VITE_TEMPLATE_ID;
const publicId = import.meta.env.VITE_YOUR_PUBLIC_KEY;

const ContactUs = () => {
  const form = useRef();
  const [formulario, setFormulario] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });
  const darkMode = useSelector((state) => state.darkMode);
  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(serviceId, templateId, form.current, publicId).then(
      (result) => {
        toast.success("We received your message!");
        setFormulario({
          user_name: "",
          user_email: "",
          message: "",
        });
        console.log(result.text);
      },
      (error) => {
        toast.error("Message not send, try again");
        console.log(error.text);
      }
    );
  };

  return (
    <div
      className={
        darkMode === true ? style.darkContactContainer : style.contactContainer
      }
    >
      <h2>Contact Us</h2>
      <form ref={form} onSubmit={sendEmail}>
        <div
          className={darkMode === true ? style.darkFormGroup : style.formGroup}
        >
          <label htmlFor="name">Name:</label>
          <input
            className={style.inputContactUs}
            type="text"
            id="name"
            name="user_name"
            placeholder="Enter your name"
            value={formulario.user_name}
            onChange={handleChange}
          />
        </div>
        <div
          className={darkMode === true ? style.darkFormGroup : style.formGroup}
        >
          <label htmlFor="email">Email:</label>
          <input
            className={style.inputContactUs}
            type="email"
            id="email"
            name="user_email"
            placeholder="Enter your email"
            value={formulario.user_email}
            onChange={handleChange}
          />
        </div>
        <div
          className={darkMode === true ? style.darkFormGroup : style.formGroup}
        >
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            placeholder="Enter your message"
            value={formulario.message}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className={darkMode === true ? style.darkSubmitBtn : style.submitBtn}
        >
          Submit
        </button>
      </form>
      <div
        className={
          darkMode === true ? style.darkContactInfo : style.contactInfo
        }
      >
        <h3>Contact Information</h3>
        <p>Email: boardgamespf@gmail.com</p>
      </div>
    </div>
  );
};

export default ContactUs;
