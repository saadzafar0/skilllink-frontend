import React, { useState } from "react";
import "../styles/Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    country: "",
    accType: "freelancer",
    // Freelancer fields
    niche: "",
    hourlyRate: "",
    qualification: "",
    about: "",
    // Client fields
    companyName: "",
    companyAddress: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1); // 1 for basic info, 2 for account-specific info

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    // Validate basic fields first
    if (!formData.name || !formData.email || !formData.password || !formData.country) {
      alert("Please fill all required fields");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        country: formData.country,
        accType: formData.accType
      };

      // Add account-specific fields
      if (formData.accType === "freelancer") {
        payload.niche = formData.niche;
        payload.hourlyRate = formData.hourlyRate;
        payload.qualification = formData.qualification;
        payload.about = formData.about;
      } else {
        payload.companyName = formData.companyName;
        payload.companyAddress = formData.companyAddress;
        payload.qualification = formData.qualification;
        payload.about = formData.about;
      }

      const response = await fetch(
        "http://localhost:4000/api/v1/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Registered successfully!");
        // Reset form
        setFormData({
          name: "",
          email: "",
          password: "",
          country: "",
          accType: "freelancer",
          niche: "",
          hourlyRate: "",
          qualification: "",
          about: "",
          companyName: "",
          companyAddress: ""
        });
        setStep(1);
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={step === 1 ? handleNext : handleSubmit}>
        <h2>Register</h2>

        {step === 1 ? (
          <>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group password-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span className="eye-icon" onClick={togglePasswordVisibility}>
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                name="country"
                id="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="accType">Account Type</label>
              <select
                name="accType"
                id="accType"
                value={formData.accType}
                onChange={handleChange}
                required
              >
                <option value="freelancer">Freelancer</option>
                <option value="client">Client</option>
              </select>
            </div>
          </>
        ) : (
          <>
            {formData.accType === "freelancer" ? (
              <>
                <div className="form-group">
                  <label htmlFor="niche">Niche/Specialization</label>
                  <input
                    type="text"
                    name="niche"
                    id="niche"
                    value={formData.niche}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="hourlyRate">Hourly Rate ($)</label>
                  <input
                    type="number"
                    name="hourlyRate"
                    id="hourlyRate"
                    value={formData.hourlyRate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="qualification">Qualifications</label>
                  <input
                    type="text"
                    name="qualification"
                    id="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="about">About You</label>
                  <textarea
                    name="about"
                    id="about"
                    value={formData.about}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            ) : (
              <>
                <div className="form-group">
                  <label htmlFor="companyName">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    id="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="companyAddress">Company Address</label>
                  <input
                    type="text"
                    name="companyAddress"
                    id="companyAddress"
                    value={formData.companyAddress}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="qualification">Your Qualification</label>
                  <input
                    type="text"
                    name="qualification"
                    id="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="about">About Your Company</label>
                  <textarea
                    name="about"
                    id="about"
                    value={formData.about}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}
          </>
        )}

        <button type="submit" className="submit-btn">
          {step === 1 ? "Next" : "Register"}
        </button>

        {step === 2 && (
          <button
            type="button"
            className="back-btn"
            onClick={() => setStep(1)}
          >
            Back
          </button>
        )}
      </form>
    </div>
  );
};

export default Register;