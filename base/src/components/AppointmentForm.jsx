import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AppointmentForm = () => {
  const [symptoms, setSymptoms] = useState([""]);
  const [additionalSymptom, setAdditionalSymptom] = useState(false);

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

  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/appointment/post",
        {
          symptoms,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      setSymptoms([""]);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="container mx-auto p-4 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Appointment</h2>
        <form onSubmit={handleAppointment} className="flex flex-col items-center">
          <div className="mb-4">
            {symptoms.map((symptom, index) => (
              <div key={index} className="flex items-center mb-4">
                <input
                  type="text"
                  placeholder="Enter the symptoms"
                  className="border border-gray-300 rounded px-4 py-3"
                  style={{ width: "250px", height: "30px", marginTop: "10px" }}
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
                  style={{ width: "250px", height: "30px", marginTop: "10px" }}
                  placeholder="Enter Symptom"
                  value={""}
                  onChange={() => { }}
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
            {symptoms.length < 3 && (
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-gray-600"
                  style={{ marginTop: "10px" }}
                  checked={additionalSymptom}
                  onChange={() => setAdditionalSymptom(!additionalSymptom)}
                />
                <span className="ml-2 text-gray-700 text-lg">Add Another Symptom</span>
              </label>
            )}
          </div>

        </form>
      </div>
    </>
  );
};

export default AppointmentForm;
