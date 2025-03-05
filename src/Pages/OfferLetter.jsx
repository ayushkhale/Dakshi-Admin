import React, { useState } from "react";
import axios from "axios";
import networkconfig from "../Dynamics/networkconfig";
import CustomModal from "../Components/CustomModal";

const OfferLetter = () => {
  const [name, setName] = useState("");
  const [rp, setRp] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [salaryIw, setSalaryIw] = useState("");
  const [salary, setSalary] = useState("");
  const [designation, setDesignation] = useState(""); 
  const [joiningDate, setJoiningDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("error");

  const handleApiError = (error) => {
    if (!error.response) {
      setModalTitle("Network Error");
      setModalMessage("Check your internet connection.");
    } else {
      const { status, data } = error.response;
      switch (status) {
        case 400:
          setModalTitle("Bad Request");
          setModalMessage(data.message || "Invalid input data.");
          break;
        case 401:
          setModalTitle("Unauthorized");
          setModalMessage(data.message || "Authentication required.");
          break;
        case 403:
          setModalTitle("Access Denied");
          setModalMessage(data.message || "You don't have permission.");
          break;
        case 404:
          setModalTitle("Not Found");
          setModalMessage(data.message || "Requested resource not found.");
          break;
        case 500:
          setModalTitle("Server Error");
          setModalMessage(data.message || "An error occurred on the server. Try again later.");
          break;
        default:
          setModalTitle("Error");
          setModalMessage(data.message || "An unexpected error occurred.");
          break;
      }
    }
    setModalType("error");
    setModalOpen(true);
  };

  const handleOfferLetter = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setModalTitle("Error");
        setModalMessage("Session Expired, Please Log In");
        setModalType("error");
        setModalOpen(true);
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `${networkconfig.BASE_URL}/admin/generate/v1/offer-letter`,
        { NAME: name, RP: rp, LOCATION: location, DATE: date, DESIGNATION: designation, JOINING_DATE: joiningDate, SALARY: salary, SALARY_IW: salaryIw },
        { headers: { authorization: `Bearer ${token}` } }
      );

      if (response.data.redirect_url) {
        window.open(response.data.redirect_url, "_blank");
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
      setName('');
      setRp('');
      setLocation('');
      setDate('');
      setSalaryIw('');
      setSalary('');
      setDesignation('');
      setJoiningDate('');
    }
  };

  return (
    <div className="container bg-white px-5 py-8 flex justify-center items-baseline md:h-[80vh] rounded-b-lg">
      <div className="max-w-full w-full lg:max-w-3xl bg-white p-8 rounded-xl shadow-xl outline-dashed outline-slate-500">
        <h2 className="text-center text-3xl font-semibold text-gray-600 mb-6">Create Offer Letter</h2>
        <form onSubmit={handleOfferLetter} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {[{ label: 'Name', value: name, setter: setName },
            { label: 'Reporting Person', value: rp, setter: setRp },
            { label: 'Location', value: location, setter: setLocation },
            { label: 'Designation', value: designation, setter: setDesignation },
            { label: 'Salary', value: salary, setter: setSalary, type:'number' },
            { label: 'Salary in Words', value: salaryIw, setter: setSalaryIw },
            { label: 'Joining Date', value: joiningDate, setter: setJoiningDate, type: 'date' },
            { label: 'Date of Issue', value: date, setter: setDate, type: 'date' },
          ].map((field, index) => (
            <div key={index} className="flex flex-col">
              <label htmlFor={field.label} className="text-gray-600 mb-2 font-semibold">{field.label}:</label>
              <input
                type={field.type || 'text'}
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                required
                className="w-full p-4 border border-gray-300 rounded-lg"
              />
            </div>
          ))}
          <button type="submit" disabled={loading} className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 w-full">
            {loading ? "Generating..." : "Generate Offer Letter"}
          </button>
        </form>
      </div>
      {modalOpen && (
        <CustomModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle} message={modalMessage} type={modalType} />
      )}
    </div>
  );
};

export default OfferLetter;