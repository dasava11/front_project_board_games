import "./ContactUs.css";

const ContactUs = () => {
  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            className="input-contactus"
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            className="input-contactus"
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            placeholder="Enter your message"
          />
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
      <div className="contact-info">
        <h3>Contact Information</h3>
        <p>Email: boardgamespf@gmail.com</p>
      </div>
    </div>
  );
};

export default ContactUs;
