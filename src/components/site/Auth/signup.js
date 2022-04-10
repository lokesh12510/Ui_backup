import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Url from "../url";
import * as SweetAlert from "../../ui/SweetAlert";
import Cook from "./Cook";
import Customer from "./Customer";
import * as authService from "../services/authService";

const initialValues = {
  name: "",
  kitchen_name: "",
  mobile: "",
  email: "",
  city: "",
  address: "",
  description: "",
  profile: "",
  radius_in_km: "",
  latitude: "",
  longitude: "",
};

export const Signup = () => {
  const navigate = useNavigate();

  const [image, setImage] = useState();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState([]);
  const [userType, setUserType] = useState("Hook_Cook");
  const [customerPopUpShow, setCustomerPopUpShow] = useState(false);

  useEffect(() => {
    if (!customerPopUpShow) {
      setUserType("Hook_Cook");
    }
  }, [customerPopUpShow]);

  // Form Errors
  const hasErrorFor = (fieldName) => {
    return !!errors[fieldName];
  };

  const renderError = (fieldName) => {
    let status = hasErrorFor(fieldName);
    if (status) {
      return errors[fieldName][0];
    }
  };

  const handleInputChangeCook = (e) => {
    const { name, value } = e.target;
    if (e.target.name === "profile_file") {
      let files = e.target.files;
      setImage(files[0]);
      setValues((p) => ({ ...p, ["profile_file"]: files[0] }));
      setValues((p) => ({ ...p, ["profile"]: URL.createObjectURL(files[0]) }));
    } else {
      setValues((p) => ({ ...p, [name]: value }));
    }
  };

  const handleInputChangeCustomer = (e) => {
    const { name, value } = e.target;
    setValues((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
    /*formData.append("kitchen_image", image);*/
    if (userType === "Hook_Cook") {
      authService
        .CookSignup(formData)
        .then((response) => {
          SweetAlert.successAlert("created successfully");
          navigate(Url.Home);
        })
        .catch((e) => {
          let errors = e.response.data.error[0];
          setErrors(errors);
        });
    } else {
      authService
        .CustomerSignup(formData)
        .then((response) => {
          SweetAlert.successAlert("created successfully");
          setCustomerPopUpShow(false);
          navigate(Url.Login);
        })
        .catch((e) => {
          let errors = e.response.data.error[0];
          setErrors(errors);
        });
    }
  };

  return (
    <div className="container col-md-6 border">
      <div className="card">
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            id="register1"
            name="register_user"
            value="Hook_Cook"
            checked={userType === "Hook_Cook" ? true : false}
            onChange={(e) => {
              setUserType(e.target.value);
              setCustomerPopUpShow(false);
            }}
          />
          <label htmlFor="register1" className="form-check-label">
            Home Cook
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            id="register2"
            name="register_user"
            value="Customer"
            checked={userType === "Customer" ? true : false}
            onChange={(e) => {
              setUserType(e.target.value);
              setCustomerPopUpShow(true);
            }}
          />
          <label htmlFor="register2" className="form-check-label">
            Customer
          </label>
        </div>
      </div>

      <Customer
        handleInputChange={handleInputChangeCustomer}
        errors={errors}
        onSubmit={onSubmit}
        renderError={renderError}
        customerPopUpShow={customerPopUpShow}
        setCustomerPopUpShow={setCustomerPopUpShow}
      />

      {userType === "Hook_Cook" && values && (
        <Cook
          handleInputChange={handleInputChangeCook}
          errors={errors}
          onSubmit={onSubmit}
          renderError={renderError}
          setValues={setValues}
          values={values}
        />
      )}
    </div>
  );
};
