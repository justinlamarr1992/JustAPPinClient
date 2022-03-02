import React, { useState } from "react";

const AddressForm = ({
  saveAddressToDb,
  handleChange,
  address,
  setAddress,
}) => {
  const { street, street2, city, state, zip } = address;
  return (
    <form onSubmit={saveAddressToDb}>
      <div className="form-control">
        <label>Address: </label>
        <input
          required
          type="text"
          name="street"
          value={street}
          // value="Street"
          onChange={handleChange}
          className="form-control"
        />
        <label>Apt. Number: </label>
        <input
          type="text"
          name="street2"
          value={street2}
          onChange={handleChange}
          className="form-control"
        />
        <label>City: </label>
        <input
          required
          type="text"
          name="city"
          value={city}
          onChange={handleChange}
          className="form-control"
        />
        <label>State: </label>
        <input
          required
          type="text"
          name="state"
          value={state}
          onChange={handleChange}
          className="form-control"
        />
        <label>Zip: </label>
        <input
          required
          type="Number"
          name="zip"
          value={zip}
          onChange={handleChange}
          className="form-control"
        />
        <br />
        <button className="btn btn-outline-info">Lets see</button>
      </div>
    </form>
  );
};
export default AddressForm;
