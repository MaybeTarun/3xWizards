"use client";
import React, { useState, useContext } from "react";
import ShimmerButton from "@/components/ui/shimmer-button";
import { MyContext } from "@/app/context/MyContext";
import TypingAnimation from "@/components/ui/typing-animation";
import { ToastContainer, toast } from "react-toastify";

const Page: React.FC = () => {
  const { contract } = useContext(MyContext);

  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loanAmount, setLoanAmount] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");

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
      interestRate,
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
          !duration ||
          !interestRate
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

  return (
    <div className="flex w-full text-white flex-col items-center bg-black p-5 sm:p-10">
      {/* Header */}
      <TypingAnimation className="font-bold font-serif text-center sm:text-4xl mb-10">
        Fill Below Credentials to Get Loan
      </TypingAnimation>

      {/* Form Container */}
      <div className="flex w-full max-w-4xl flex-col shadow-cust bg-black rounded-lg items-center border-2 border-black p-5 sm:p-10 mb-10">
        <form className="flex flex-col w-[70%] items-center text-black gap-5 sm:gap-8">
          {/* Country Dropdown */}
          <select
            id="country"
            name="country"
            value={selectedCountry}
            onChange={handleCountryChange}
            className="px-4 py-2 border-2 text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 w-full"
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
          <select
            id="state"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            disabled={!selectedCountry}
            className={`px-4 py-2 border-2 ${
              selectedCountry
                ? "border-gray-300"
                : "border-gray-200 bg-gray-100 cursor-not-allowed"
            } rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
          >
            <option value="" disabled>
              {selectedCountry ? "Choose a state" : "Select a country first"}
            </option>
            {selectedCountry &&
              states[selectedCountry]?.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
          </select>

          {/* Name Input */}
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-sky-500"
          />

          {/* Email Input */}
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-sky-500"
          />

          {/* Loan Amount Input */}
          <input
            type="number"
            placeholder="Loan Amount (in Wei)"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-sky-500"
          />

          {/* Duration Input */}
          <input
            type="number"
            placeholder="Duration (in months)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-sky-500"
          />

          {/* Interest Rate Input */}
          <input
            type="number"
            placeholder="Interest Rate (%)"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-sky-500"
          />

          <ShimmerButton
            onClick={handleSubmit}
            className="w-full shadow-2xl max-w-[250px] py-2 border-sky-700 hover:bg-green-700 sm:py-3 md:py-4"
          >
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-base xl:text-lg">
              Submit
            </span>
          </ShimmerButton>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Page;
