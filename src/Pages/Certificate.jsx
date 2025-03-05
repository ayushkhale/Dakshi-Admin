import React, { useState } from "react";
import axios from "axios";
import networkconfig from "../Dynamics/networkconfig";
import CustomModal from "../Components/CustomModal";

const Certificate = () => {
  const [name, setName] = useState("");
  const [virtue, setVirtue] = useState("");
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState(null);
  const [certificateGenerated, setCertificateGenerated] = useState(false);


  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('error');

  const handleApiError = (error) => {
    if (!error.response) {
      setModalTitle("Network Error");
      setModalMessage("Check your internet connection.");
    } else {
      const { status } = error.response;
      switch (status) {
        case 400:
          setModalTitle("Bad Request");
          setModalMessage("Unexpected error occured, Please Try gain Later");
          break;
        case 401:
          setModalTitle("Unauthorized");
          setModalMessage("Please Log In");
          break;
        case 403:
          setModalTitle("Access Denied");
          setModalMessage("You don't have permission.");
          break;
        case 404:
          setModalTitle("Not Found");
          setModalMessage("No data Found");
          break;
        case 500:
          setModalTitle("Server Error");
          setModalMessage("Please try again later.");
          break;
        default:
          setModalTitle("Error");
          setModalMessage("Something went wrong.");
          break;
      }
    }
    setModalType("error");
    setModalOpen(true);
  };



  const handleGenerateCertificate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPdfUrl(null);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${networkconfig.BASE_URL}/admin/generate/v1/certificate`,
        { NAME: name, VIRTUE: virtue },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
          mode: "cors",
          maxRedirects: 0,
        }
      );

      const { success, message, redirect_url } = response.data;
      if (success === true) {
        if (redirect_url) {
          try {
            function openLinkInNewTab(redirect_url) {
              const link = document.createElement('a');
              link.href = redirect_url;
              link.target = '_blank';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }
            openLinkInNewTab(redirect_url);
            setModalTitle("Generation succeeded");
            setModalMessage("Download & Save It");
            setModalType("success");
            setModalOpen(true);
          } catch (error) {
            if (error.response) {
              setModalTitle("Generation Failed");
              setModalMessage("error.response.data");
              setModalType("error");
              setModalOpen(true);
            } else {
              handleApiError(error.message)
            }
          }
        }
      }

    } catch (error) {
      handleApiError(error)
    } finally {
      setLoading(false);
    }

    setName("");
    setVirtue("");
  }

  return (
    <div className="container bg-white  px-5 py-5 flex justify-center items-baseline md:h-[80vh] rounded-b-lg">
      {/* Heading */}

      {/* Form Section - Only visible when certificate is not generated */}
      {!certificateGenerated && (
        <form
          onSubmit={handleGenerateCertificate}
          className="max-w-lg w-full bg-white p-8 rounded-xl shadow-xl  outline-dashed outline-gray-400"
        >
          <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Create Certificate</h1>
          <div className="mb-6">
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-500 text-lg"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="text"
              name="virtue"
              placeholder="Enter Virtue"
              value={virtue}
              onChange={(e) => setVirtue(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-500 text-lg"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition duration-300"
          >
            {loading ? "Generating..." : "Generate Certificate"}
          </button>
        </form>
      )}

      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      {/* Certificate Preview Section - Only visible after certificate is generated */}
      {certificateGenerated && (
        <div className="mt-6 text-center">
          <h3 className="text-2xl font-semibold text-gray-600 mb-4">Your Certificate:</h3>
          <iframe
            src={pdfUrl}
            title="Certificate Preview"
            className="w-full h-96 mt-4 border-2 border-gray-300 rounded-lg shadow-md"
          />
          <p className="mt-6">
            <button
              onClick={handleGenerateAnotherCertificate}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition duration-300"
            >
              Generate Another Certificate
            </button>
          </p>
        </div>
      )}

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

export default Certificate;
