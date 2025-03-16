import React, { useState } from "react";
import axios from "axios";

const NameForm: React.FC = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState<any>(null);
  const [nationality, setNationality] = useState<any>(null);
  const [age, setAge] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const genderResponse = await axios.get(
        `http://localhost:3200/api/genderize/${name}`
      );
      setGender(genderResponse.data);
      console.log("genderResponse:", genderResponse.data);

      const nationalityResponse = await axios.get(
        `http://localhost:3200/api/nationalize/${name}`
      );

      console.log("nationalityResponse", nationalityResponse);

      setNationality(nationalityResponse.data);

      const ageResponse = await axios.get(
        `http://localhost:3200/api/agify/${name}`
      );
      console.log("ageResponse", ageResponse);

      setAge(ageResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Name Information</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="p-2 border rounded w-full"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Submit
        </button>
      </form>

      {gender && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Gender: {gender.gender}</h2>
          <p>Probability: {gender.probability}</p>
        </div>
      )}

      {nationality && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Nationality:</h2>
          <ul>
            {nationality.country.map((country: any) => (
              <li
                key={country.country_id}
                className="flex items-center space-x-2"
              >
                <span>{country.country_id}</span>
                <span>{country.probability}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {age && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Age: {age.age}</h2>
        </div>
      )}
    </div>
  );
};

export default NameForm;
