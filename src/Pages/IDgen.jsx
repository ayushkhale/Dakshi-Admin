import React, { useState } from "react";
import axios from "axios";
import networkconfig from "../Dynamics/networkconfig";
import CustomModal from "../Components/CustomModal";

const IDgen = () => {
  const [formData, setFormData] = useState({
    NAME: "", 
    POSITION: "", 
    CONTACT: "", 
    EMAIL: "",
    ADDRESS: "", 
    FATHER: "", 
    ADHAR: "", 
    BLOOD: "",
    DOB: "", 
    DOJ: "", 
    DOE: "", 
    IMAGE: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, IMAGE: e.target.files[0] });
  };

  const handleGenerateIDCard = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => formDataToSend.append(key, formData[key]));

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
        `${networkconfig.BASE_URL}/admin/generate/v1/id-card`,
        formDataToSend,
        { headers: { authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
      );
      if (response.data.success && response.data.redirect_url) {
        window.open(response.data.redirect_url, "_blank");
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
      setFormData({
        NAME: "", 
        POSITION: "", 
        CONTACT: "", 
        EMAIL: "",
        ADDRESS: "", 
        FATHER: "", 
        ADHAR: "", 
        BLOOD: "",
        DOB: "", 
        DOJ: "", 
        DOE: "", 
        IMAGE: null,
      })
    }
  };

  return (
    <div className="container bg-white  px-5 py-5 flex justify-center items-baseline md:h-[80vh] rounded-b-lg ">
      <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow-lg outline-dashed outline-2 outline-gray-400 ">
        <h2 className="text-center text-2xl font-semibold text-gray-700 mb-4">ID Card Generator</h2>
        <form onSubmit={handleGenerateIDCard} className="grid grid-cols-2 md:grid-cols-3 gap-5 ">
          {Object.keys(formData).map((key) => (
            <div key={key} className="flex flex-col justify-center">
              <label className="text-gray-600 text-sm font-medium">{key.replace("_", " ")}</label>
              {key === "IMAGE" ? (
                <input type="file" accept="image/*" onChange={handleFileChange} className="border p-2 rounded-md" required />
              ) : (
                <input
                  type={key.includes("DO") ? "date" : "text"}
                  name={key}
                  value={formData[key]}
                  onChange={handleInputChange}
                  className="border p-2 rounded-md"
                  required
                />
              )}
            </div>
          ))}
          <button type="submit" disabled={loading} className="col-span-2 bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 w-full">
            {loading ? "Generating..." : "Generate ID Card"}
          </button>
        </form>
      </div>

      {modalOpen && (
        <CustomModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={modalTitle}
          message={modalMessage}
          type={modalType}
        />
      )}
      
    </div>
  );
};

export default IDgen;
