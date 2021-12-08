const CTA = () => {
  return (
    <div id="cta">
      <h5 class="call-title">Contact</h5>
      <h4 class="call-text">Get in Touch</h4>
      <form action="/insert_data" method="post">
        <input
          class="form-input1"
          type="text"
          id="name"
          name="name"
          placeholder="Your Name"
        />
        <input
          class="form-input2"
          type="text"
          id="company"
          name="company"
          placeholder="Your Company"
        />
        <input
          class="form-input3"
          type="email"
          id="email"
          name="email"
          placeholder="Your Email"
        />
        <input
          class="form-input4"
          type="tel"
          id="phone"
          name="phone"
          placeholder="Your Phone"
        />
        <button class="form-button" id="submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
export default CTA;
