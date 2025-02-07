"use client";
import React, { useState, useContext } from "react";
import { MyContext } from "@/app/context/MyContext";
import { ToastContainer, toast } from "react-toastify";

const Page: React.FC = () => {
  const { contract } = useContext(MyContext);

  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loanAmount, setLoanAmount] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("5");

  const countries: string[] = ["United States", "India", "Canada", "Australia"];
  const states: Record<string, string[]> = {
    "United States": ["California", "New York", "Texas", "Florida", "Washington"],
    India: ["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Gujarat"],
    Canada: ["Ontario", "Quebec", "British Columbia", "Alberta", "Manitoba"],
    Australia: ["New South Wales", "Victoria", "Queensland", "Tasmania"],
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
    setSelectedState(""); // Reset state when country changes
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Logging form data for debugging
    console.log({
      country: selectedCountry,
      state: selectedState,
      name,
      email,
      loanAmount,
      duration,
    });

    if (contract) {
      try {
        // Validation for empty fields
        if (
          !selectedCountry ||
          !selectedState ||
          !name ||
          !email ||
          !loanAmount ||
          !duration
        ) {
          alert("Please fill all the fields.");
          return;
        }

        // Convert loan amount to Wei (assuming it's already provided in Wei)
        const loanAmountInWei = loanAmount;

        // Interact with the contract
        const tx = await contract.RequestLoanByBorrower(
          loanAmountInWei,
          Number(interestRate), // Convert interest rate to number
          Number(duration) * 30 * 24 * 60 * 60 // Convert months to seconds
        );
        await tx.wait();

        // Reset form state
        setSelectedCountry("");
        setSelectedState("");
        setName("");
        setEmail("");
        setLoanAmount("");
        setDuration("");
        setInterestRate("");
        toast.success("Loan request submitted successfully!");
      } catch (error) {
        // Error handling with proper typing
        if (error instanceof Error) {
          console.error("Error requesting loan:", error.message);
          alert(`Error: ${error.message}`);
        } else {
          console.error("Unexpected error:", error);
          alert("There was an unexpected error processing your loan request.");
        }
      }
    } else {
      alert("Smart contract not found.");
    }
  };

  const handleGoHome = () => {
    window.location.href = "/"; // Redirect to homepage
  };

  return (
    <div className="flex w-full flex-col items-center bg-[#0a0a0a] p-5 sm:p-10">
      {/* Cross Button */}
      <button
        onClick={handleGoHome}
        className="absolute top-5 right-5 text-white text-2xl"
        aria-label="Close"
      >
        &times; {/* Cross icon */}
      </button>
      {/* Header */}
      <h1 className="text-center text-xl md:text-2xl font-bold text-[#f0f0f0] mb-5">
        Fill in the following to apply for a loan
      </h1>

      {/* Form Container */}
      <div className="flex w-full max-w-md flex-col bg-neutral-900 rounded-lg p-5 shadow-md">
        <form className="flex flex-col gap-4">
          {/* Country Dropdown */}
          <label htmlFor="country" className="text-sm font-medium text-[#f0f0f0]">
            Country
          </label>
          <select
            id="country"
            name="country"
            value={selectedCountry}
            onChange={handleCountryChange}
            className="px-4 py-2 border border-neutral-600 rounded-lg focus:outline-none bg-neutral-700 text-[#f0f0f0]"
          >
            <option value="" disabled>
              Choose your country
            </option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>

          {/* State Dropdown */}
          <label htmlFor="state" className="text-sm font-medium text-[#f0f0f0]">
            State
          </label>
          <select
            id="state"
            name="state"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="px-4 py-2 border border-neutral-600 rounded-lg focus:outline-none bg-neutral-700 text-[#f0f0f0]"
            disabled={!selectedCountry} // Disable until a country is selected
          >
            <option value="" disabled>
              Choose your state
            </option>
            {selectedCountry && states[selectedCountry].map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>

          {/* Name Input */}
          <label htmlFor="name" className="text-sm font-medium text-[#f0f0f0]">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 border border-neutral-600 rounded-lg focus:outline-none bg-neutral-700 text-[#f0f0f0]"
          />

          {/* Email Input */}
          <label htmlFor="email" className="text-sm font-medium text-[#f0f0f0]">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 border border-neutral-600 rounded-lg focus:outline-none bg-neutral-700 text-[#f0f0f0]"
          />

          {/* Loan Amount Input */}
          <label htmlFor="loanAmount" className="text-sm font-medium text-[#f0f0f0]">
            Loan Amount (in Wei)
          </label>
          <input
            type="number"
            id="loanAmount"
            placeholder="Enter loan amount"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className="px-4 py-2 border border-neutral-600 rounded-lg focus:outline-none bg-neutral-700 text-[#f0f0f0]"
          />

          {/* Duration Input */}
          <label htmlFor="duration" className="text-sm font-medium text-[#f0f0f0]">
            Duration (in months)
          </label>
          <input
            type="number"
            id="duration"
            placeholder="Enter duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="px-4 py-2 border border-neutral-600 rounded-lg focus:outline-none bg-neutral-700 text-[#f0f0f0]"
          />

          {/* Fixed Interest Rate Display */}
          <label className="text-sm font-medium text-[#f0f0f0]">
            Fixed Interest Rate
          </label>
          <input
            type="text"
            value="5%"
            readOnly
            className="px-4 py-2 border border-neutral-600 rounded-lg bg-neutral-600 cursor-not-allowed text-[#f0f0f0]"
          />

          <button
            onClick={handleSubmit}
            className="mt-4 w-full py-2 bg-blue-600 text-[#f0f0f0] rounded-lg hover:bg-blue-700"
          >
            Apply
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Page;
