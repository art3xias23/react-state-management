import React, { useState } from "react";
import { saveShippingAddress } from "./services/shippingService";

// Declaring outside component to avoid recreation on each render
const emptyAddress = {
  city: "",
  country: "",
};

const STATUS = {
  IDLE: "IDLE",
  SUBMITTED: "SUBMITTED",
  SUBMITTING: "SUBMITTING",
  COMPLETED: "COMPLETED",
};

export default class Checkout extends React.Component {
  state = {
    address: emptyAddress,
    status: STATUS.IDLE,
    error: null,
    touched: {},
  };
  isValid() {
    const errors = getErrors(this.state.address);
    const isVald = Object.keys(errors).length === 0;
    return isValid;
  }
  //Derived state

  handleChange(e) {
    e.persist();
    setAddress((currentAddress) => {
      return { ...currentAddress, [e.target.id]: e.target.value };
    });
  }

  handleBlur(event) {
    event.persist();
    setTouched((current) => {
      return {
        ...current,
        [event.target.id]: true,
      };
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    setStatus(STATUS.SUBMITTING);

    if (isValid) {
      try {
        await saveShippingAddress(address);
        this.props.dispatch({ type: "empty" });
        setStatus(STATUS.COMPLETED);
      } catch (error) {
        setError(error);
      }
    } else {
      setStatus(STATUS.SUBMITTED);
    }
  }

  getErrors(address) {
    const result = {};

    if (!address.city) result.city = "City is required";
    if (!address.country) result.country = "Country is required";

    return result;
  }
  render() {
    if (error) throw error;
    if (status === STATUS.COMPLETED) {
      return <h1>Thanks for shopping!</h1>;
    }

    return (
      <>
        <h1>Shipping Info</h1>
        {!isValid && status === STATUS.SUBMITTED && (
          <div role="alert">
            <p>Please fix the following errors</p>
            <ul>
              {Object.keys(errors).map((key) => {
                return <li key={key}>{errors[key]}</li>;
              })}
            </ul>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="city">City</label>
            <br />
            <input
              id="city"
              type="text"
              value={address.city}
              onBlur={handleBlur}
              onChange={handleChange}
            />

            <p role="alert">
              {(touched.city || status === STATUS.SUBMITTED) && errors.city}
            </p>
          </div>

          <div>
            <label htmlFor="country">Country</label>
            <br />
            <select
              id="country"
              value={address.country}
              onBlur={handleBlur}
              onChange={handleChange}
            >
              <option value="">Select Country</option>
              <option value="China">China</option>
              <option value="India">India</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="USA">USA</option>
            </select>
            <p role="alert">
              {(touched.country || status === STATUS.SUBMITTED) &&
                errors.country}
            </p>
          </div>

          <div>
            <input
              type="submit"
              className="btn btn-primary"
              value="Save Shipping Info"
              disabled={status === STATUS.SUBMITTING}
            />
          </div>
        </form>
      </>
    );
  }
}
