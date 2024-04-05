import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AppointmentForm = () => {
  const [firstName, setFirstName] = useState("");
  const [dob, setDob] = useState("");
 
  const [symptoms, setSymptoms] = useState([""]);
  const [additionalSymptom, setAdditionalSymptom] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // Add this line
  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const handleAddSymptom = () => {
    if (symptoms.length < 3) {
      setSymptoms([...symptoms, ""]);
    }
  };

  const handleSymptomChange = (index, value) => {
    const newSymptoms = [...symptoms];
    newSymptoms[index] = value;
    setSymptoms(newSymptoms);
  };

  const handleRemoveSymptom = (index) => {
    const newSymptoms = [...symptoms];
    newSymptoms.splice(index, 1);
    setSymptoms(newSymptoms);
  };
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const { data } = await axios.post(
        "http://localhost:4000/api/v1/appointment/post",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="container mx-auto p-4 flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Appointment</h2>
        <form onSubmit={handleAppointment} className="flex flex-col">
          <div className="mb-4">
            <div className="flex items-center mb-4">
              <input
                type="text"
                placeholder="Full Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 mr-2"
              />
              <input
                type="date"
                placeholder="Date of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2"
              />
            </div>
            {symptoms.map((symptom, index) => (
              <div key={index} className="flex items-center mb-4">
                <input
                  placeholder="Enter Symptom"
                  type="text"
                  className="border border-gray-300 rounded px-4 py-2 mr-2"
                  value={symptom}
                  onChange={(e) => handleSymptomChange(index, e.target.value)}
                />
                {index !== 0 && (
                  <button
                    type="button"
                    className="bg-red-500 text-white rounded px-2 py-1 text-lg"
                    onClick={() => handleRemoveSymptom(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            {additionalSymptom && symptoms.length < 3 && (
              <div className="flex items-center mb-4">
                <input
                  type="text"
                  className="border border-gray-300 rounded px-4 py-2 mr-2 text-lg w-64"
                  placeholder="Enter Symptom"
                  value={""}
                  onChange={() => {}}
                />
                <button
                  type="button"
                  className="bg-blue-500 text-white rounded px-2 py-1 text-lg"
                  onClick={handleAddSymptom}
                >
                  Add
                </button>
              </div>
            )}
            <label className="inline-flex items-center mb-4">
              <input
                placeholder="Enter symptom"
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-600"
                checked={additionalSymptom}
                onChange={() => setAdditionalSymptom(!additionalSymptom)}
              />
              <span className="ml-2 text-gray-700 text-lg">Add Another Symptom</span>
            </label>
            <div>
              <input type="file" name="" id="file" onChange={handleFileChange} className="items-center" />
              {selectedFile && <p>Selected File: {selectedFile.name}</p>}
            </div>
           
            <button
              className="flex mx-auto mt-4 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              type="submit"
            >
              Get Appointment
            </button>
          </div>
        </form>
      </div>
    </>
  );
  
};

export default AppointmentForm;
