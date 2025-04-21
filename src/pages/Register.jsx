import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
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

  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
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

      const response = await fetch("http://localhost:4000/api/v1/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registered successfully!");
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
    } catch (err) {
      console.error("Registration error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={step === 1 ? handleNext : handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>

        {step === 1 ? (
          <>
            <Input label="Name" name="name" value={formData.name} onChange={handleChange} />
            <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  className="w-full p-2 rounded-l-lg outline-none"
                  value={formData.password}
                  onChange={handleChange}
                />
                <span
                  className="px-3 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>
            </div>
            <Input label="Country" name="country" value={formData.country} onChange={handleChange} />

            <div className="mb-4">
              <label htmlFor="accType" className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
              <select
                name="accType"
                id="accType"
                value={formData.accType}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="freelancer">Freelancer</option>
                <option value="client">Client</option>
              </select>
            </div>
          </>
        ) : formData.accType === "freelancer" ? (
          <>
            <Input label="Niche/Specialization" name="niche" value={formData.niche} onChange={handleChange} />
            <Input label="Hourly Rate ($)" name="hourlyRate" type="number" value={formData.hourlyRate} onChange={handleChange} />
            <Input label="Qualifications" name="qualification" value={formData.qualification} onChange={handleChange} />
            <Textarea label="About You" name="about" value={formData.about} onChange={handleChange} />
          </>
        ) : (
          <>
            <Input label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} />
            <Input label="Company Address" name="companyAddress" value={formData.companyAddress} onChange={handleChange} />
            <Input label="Your Qualification" name="qualification" value={formData.qualification} onChange={handleChange} />
            <Textarea label="About Your Company" name="about" value={formData.about} onChange={handleChange} />
          </>
        )}

        <div className="flex flex-col sm:flex-row gap-2 mt-6">
          <button type="submit" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
            {step === 1 ? "Next" : "Register"}
          </button>
          {step === 2 && (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full sm:w-auto bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded-lg"
            >
              Back
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

// Reusable Input component
const Input = ({ label, name, value, onChange, type = "text" }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded-lg"
      required
    />
  </div>
);

// Reusable Textarea component
const Textarea = ({ label, name, value, onChange }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <textarea
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded-lg"
      rows="4"
      required
    />
  </div>
);

export default Register;
