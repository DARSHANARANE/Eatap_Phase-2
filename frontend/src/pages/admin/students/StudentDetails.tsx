import { useParams, useNavigate } from "react-router-dom";

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy data
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
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Student Details</h1>
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-600 hover:underline"
        >
          ← Back
        </button>
      </div>

      {/* Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Student Info */}
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Student Information</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Phone:</strong> {student.phone}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>College:</strong> {student.college}</p>
            <p><strong>Address:</strong> {student.address}</p>
          </div>
        </div>

        {/* Mess Info */}
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Mess Information</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Mess Name:</strong> {student.mess.name}</p>
            <p><strong>Location:</strong> {student.mess.location}</p>
            <p><strong>Joining Date:</strong> {student.mess.joiningDate}</p>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="bg-white rounded-xl border shadow-sm p-6 flex justify-between items-center">
        <div className="text-sm">
          Status:
          <span
            className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${
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
          className={`px-6 py-2 rounded-lg text-white ${
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
