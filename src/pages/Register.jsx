import React, { useState } from "react";

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
    companyAddress: "",
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
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.country
    ) {
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
        accType: formData.accType,
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
          companyAddress: "",
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
    <div className="min-h-screen flex items-center justify-center bg-[#111] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-[#1a1a1a] p-8 rounded-xl shadow-2xl">
        <div>
          <h2 className="text-3xl font-bold text-center text-[#1abc9c]">Register</h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={step === 1 ? handleNext : handleSubmit}>
          {step === 1 ? (
            <>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#1abc9c]">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full px-4 py-3 bg-[#222] border border-[#333] rounded-lg text-white placeholder-[#666] focus:outline-none focus:border-[#1abc9c] transition-colors duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#1abc9c]">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full px-4 py-3 bg-[#222] border border-[#333] rounded-lg text-white placeholder-[#666] focus:outline-none focus:border-[#1abc9c] transition-colors duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-[#1abc9c]">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full px-4 py-3 bg-[#222] border border-[#333] rounded-lg text-white placeholder-[#666] focus:outline-none focus:border-[#1abc9c] transition-colors duration-300"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#666] hover:text-[#1abc9c]"
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-[#1abc9c]">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full px-4 py-3 bg-[#222] border border-[#333] rounded-lg text-white placeholder-[#666] focus:outline-none focus:border-[#1abc9c] transition-colors duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="accType" className="block text-sm font-medium text-[#1abc9c]">
                    Account Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="accType"
                    id="accType"
                    value={formData.accType}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full px-4 py-3 bg-[#222] border border-[#333] rounded-lg text-white focus:outline-none focus:border-[#1abc9c] transition-colors duration-300"
                  >
                    <option value="freelancer">Freelancer</option>
                    <option value="client">Client</option>
                  </select>
                </div>
              </div>
            </>
          ) : (
            <>
              {formData.accType === "freelancer" ? (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="niche" className="block text-sm font-medium text-[#1abc9c]">
                      Niche/Specialization <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="niche"
                      id="niche"
                      value={formData.niche}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full px-4 py-3 bg-[#222] border border-[#333] rounded-lg text-white placeholder-[#666] focus:outline-none focus:border-[#1abc9c] transition-colors duration-300"
                    />
                  </div>

                  <div>
                    <label htmlFor="hourlyRate" className="block text-sm font-medium text-[#1abc9c]">
                      Hourly Rate ($) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="hourlyRate"
                      id="hourlyRate"
                      value={formData.hourlyRate}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full px-4 py-3 bg-[#222] border border-[#333] rounded-lg text-white placeholder-[#666] focus:outline-none focus:border-[#1abc9c] transition-colors duration-300"
                    />
                  </div>

                  <div>
                    <label htmlFor="qualification" className="block text-sm font-medium text-[#1abc9c]">
                      Qualifications <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="qualification"
                      id="qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full px-4 py-3 bg-[#222] border border-[#333] rounded-lg text-white placeholder-[#666] focus:outline-none focus:border-[#1abc9c] transition-colors duration-300"
                    />
                  </div>

                  <div>
                    <label htmlFor="about" className="block text-sm font-medium text-[#1abc9c]">
                      About You <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="about"
                      id="about"
                      value={formData.about}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="mt-1 w-full px-4 py-3 bg-[#222] border border-[#333] rounded-lg text-white placeholder-[#666] focus:outline-none focus:border-[#1abc9c] transition-colors duration-300 resize-y"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-[#1abc9c]">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      id="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full px-4 py-3 bg-[#222] border border-[#333] rounded-lg text-white placeholder-[#666] focus:outline-none focus:border-[#1abc9c] transition-colors duration-300"
                    />
                  </div>

                  <div>
                    <label htmlFor="companyAddress" className="block text-sm font-medium text-[#1abc9c]">
                      Company Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="companyAddress"
                      id="companyAddress"
                      value={formData.companyAddress}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full px-4 py-3 bg-[#222] border border-[#333] rounded-lg text-white placeholder-[#666] focus:outline-none focus:border-[#1abc9c] transition-colors duration-300"
                    />
                  </div>

                  <div>
                    <label htmlFor="qualification" className="block text-sm font-medium text-[#1abc9c]">
                      Qualifications <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="qualification"
                      id="qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full px-4 py-3 bg-[#222] border border-[#333] rounded-lg text-white placeholder-[#666] focus:outline-none focus:border-[#1abc9c] transition-colors duration-300"
                    />
                  </div>

                  <div>
                    <label htmlFor="about" className="block text-sm font-medium text-[#1abc9c]">
                      About <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="about"
                      id="about"
                      value={formData.about}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="mt-1 w-full px-4 py-3 bg-[#222] border border-[#333] rounded-lg text-white placeholder-[#666] focus:outline-none focus:border-[#1abc9c] transition-colors duration-300 resize-y"
                    />
                  </div>
                </div>
              )}
            </>
          )}

          <div className="flex justify-between">
            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 text-[#1abc9c] hover:text-[#16a085] transition-colors duration-300"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#1abc9c] text-white rounded-lg font-semibold hover:bg-[#16a085] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#1abc9c] focus:ring-offset-2 focus:ring-offset-[#1a1a1a]"
            >
              {step === 1 ? "Next" : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
