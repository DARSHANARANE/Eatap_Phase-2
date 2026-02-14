import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import TopNav from "../../../layouts/TopNav";

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const student = {
    id,
    name: "Amit Sharma",
    phone: "9012345678",
    email: "amit@gmail.com",
    college: "Shivaji University",
    address: "Satara, Maharashtra",
    status: "active",
    mess: {
      name: "Patil Mess",
      location: "Satara",
      joiningDate: "05 Feb 2024",
    },
  };

  const handleToggleStatus = () => {
    alert(
      student.status === "active"
        ? "Student Blocked"
        : "Student Activated"
    );
  };

  return (
    <div className="">  
    {/* Top Navigation with Back Button */}
      <TopNav
        title="Student Details"
        showBackButton={true}
      />  

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        
        {/* Student Info */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-5 border-b pb-3">
            Student Information
          </h2>

          <div className="space-y-3 text-sm text-gray-600">
            <p><span className="font-medium text-gray-800">Name:</span> {student.name}</p>
            <p><span className="font-medium text-gray-800">Phone:</span> {student.phone}</p>
            <p><span className="font-medium text-gray-800">Email:</span> {student.email}</p>
            <p><span className="font-medium text-gray-800">College:</span> {student.college}</p>
            <p><span className="font-medium text-gray-800">Address:</span> {student.address}</p>
          </div>
        </div>

        {/* Mess Info */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-5 border-b pb-3">
            Mess Information
          </h2>

          <div className="space-y-3 text-sm text-gray-600">
            <p><span className="font-medium text-gray-800">Mess Name:</span> {student.mess.name}</p>
            <p><span className="font-medium text-gray-800">Location:</span> {student.mess.location}</p>
            <p><span className="font-medium text-gray-800">Joining Date:</span> {student.mess.joiningDate}</p>
          </div>
        </div>
      </div>

      {/* Status Card */}
      <div className="bg-white rounded-xl shadow-sm border p-6 flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div className="text-sm">
          <span className="font-medium text-gray-800">Status:</span>
          <span
            className={`ml-3 px-4 py-1 rounded-full text-xs font-semibold ${
              student.status === "active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {student.status}
          </span>
        </div>

        <button
          onClick={handleToggleStatus}
          className={`px-6 py-2 rounded-lg text-white font-medium transition ${
            student.status === "active"
              ? "bg-red-600 hover:bg-red-700"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {student.status === "active" ? "Block Student" : "Activate Student"}
        </button>
      </div>

    </div>
  );
};

export default StudentDetails;
