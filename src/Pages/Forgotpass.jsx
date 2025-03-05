import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import networkconfig from "../Dynamics/networkconfig";
import CustomModal from '../Components/CustomModal';

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingo, setLoadingo] = useState(false);

   const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [modalType, setModalType] = useState('error');
  
    const handleApiError = (error) => {
      if (!error.response) {
        setModalTitle("Network Error");
        setModalMessage("An Unexpected Error Occured");
      } else {
        const { status } = error.response;
        switch (status) {
          case 400:
            setModalTitle("Bad Request");
            setModalMessage("Invalid credentials.");
            break;
          case 401:
            setModalTitle("Unauthorized");
            setModalMessage("Incorrect username or password.");
            break;
          case 403:
            setModalTitle("Access Denied");
            setModalMessage("You don't have permission.");
            break;
          case 404:
            setModalTitle("Not Found");
            setModalMessage("User not found.");
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
      setLoading(false)
      setLoadingo(false)
    };
  
  
  const handleSendOtp = async (e) => {
    
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post("http://192.168.1.2:3000/v1/forget-password", { username, email });
      setModalTitle("Success");
      setModalMessage(response.data.message);
      setModalType("default");
      setModalOpen(true);

      setStep(2);
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleVerifyOtpAndResetPassword = async (e) => {
    e.preventDefault();
    setLoadingo(true);

    if (newpassword !== confirmpassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post( `${networkconfig.BASE_URL}/v1/forget-password/otp-submission`, {
        email,
        otp,
        newpassword,
        confirmpassword,
      });
      setMessage(response.data.message);
    } catch (err) {
      handleApiError(err);
    }

    setUsername('')
    setEmail('')
    setOtp('')
    setnewpassword('')
    setconfirmpassword('')

    setTimeout(() => {
      setError('')
      setMessage('')
    }, 4000);

    setTimeout(() => {
        navigate('/login')
    }, 5000);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-white">
      <div className="relative m-10 bg-white p-4 sm:p-6 shadow-lg w-11/12 sm:w-96 outline-dashed outline-gray-400 ">
        <div className="flex justify-center mb-3">
          <img src="public/dakshilogo.jpg" alt="Teacher Profile" className="w-28 mb-5" />
        </div>
        {message && <p className="text-green-500 text-center">{message}</p>}
        {error && <p className="text-red-500">{error}</p>}
        {step === 1 ? (
          <form onSubmit={handleSendOtp}>
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                className="w-full p-2 mt-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                v ue={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full p-2 mt-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-gray-700 text-white font-semibold hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
            <div className="flex justify-center text-s mt-5">
                <a href="/login" className="text-red-700 font-bold">
                <span className="text-gray-500 font-normal">Remembered Password? </span> Login
                </a>
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
          </form>
          
        ) : (
          <form onSubmit={handleVerifyOtpAndResetPassword}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded mt-1"
                value={email}
                inputMode="block"
                onChange={(e) => setEmail(e.target.value)}
                required disabled
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">OTP</label>
              <input
                type="number"
                className="w-full p-2 border rounded mt-1"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">New Password</label>
              <input
                type="password"
                className="w-full p-2 border rounded mt-1"
                value={newpassword}
                onChange={(e) => setnewpassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                className="w-full p-2 border rounded mt-1"
                value={confirmpassword}
                onChange={(e) => setconfirmpassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
            >
              {loadingo ? " Resetting..." : "Reset"}
            </button>
          </form>
        )}
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
}