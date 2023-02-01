import React from "react";
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
    const errors = this.getErrors(this.state.address);
    const isValid = Object.keys(errors).length === 0;
    return isValid;
  }
  //Derived state

  handleChange = (e) => {
    e.persist();
    this.setState((state) => {
      return {
        address: {
          ...state.address,
          [e.target.id]: e.target.value,
        },
      };
    });
  }

  //Update state for touched. 
  //Set it to a copy of the current value of touched, 
  //but set an extra property based on the id passed in
  handleBlur = (event) => {
    event.persist();
    this.setState((state) => {
      return {
        touched: {
          ...state.touched,
          [event.target.id]: true,
        },
      };
    });
  }

   handleSubmit = async(event) => {
    event.preventDefault();
    this.setState({status:STATUS.SUBMITTING});

    if (this.isValid()) {
      try {
        await saveShippingAddress(this.state.address);
        this.props.dispatch({ type: "empty" });
        this.setState({status:STATUS.COMPLETED});
      } catch (e) {
        this.setState({error: e});
      }
    } else {
      this.setState({state:STATUS.SUBMITTED});
    }
  }

  getErrors(address) {
    const result = {};

    if (!address.city) result.city = "City is required";
    if (!address.country) result.country = "Country is required";
console.log("ERRORS: ", result)
    return result;
  }
  render() {
    // Derived state
    const {status, error, address, touched} = this.state;
    const errors = this.getErrors(this.state.address);
    if (error) throw error;
    if (status === STATUS.COMPLETED) {
      return <h1>Thanks for shopping!</h1>;
    }

    return (
      <>
        <h1>Shipping Info</h1>
        {!this.isValid() && status === STATUS.SUBMITTED && (
          <div role="alert">
            <p>Please fix the following errors</p>
            <ul>
              {Object.keys(errors).map((key) => {
                return <li key={key}>{errors[key]}</li>;
              })}
            </ul>
          </div>
        )}
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="city">City</label>
            <br />
            <input
              id="city"
              type="text"
              value={address.city}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
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
              onBlur={this.handleBlur}
              onChange={this.handleChange}
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
              disabled={this.state.status === STATUS.SUBMITTING}
            />
          </div>
        </form>
      </>
    );
  }
}
