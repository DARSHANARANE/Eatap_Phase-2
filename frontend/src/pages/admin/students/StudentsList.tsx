import { Link } from "react-router-dom";

const students = [
  {
    id: 1,
    name: "Amit Sharma",
    phone: "9012345678",
    college: "Shivaji University",
    messName: "Patil Mess",
    status: "active",
  },
  {
    id: 2,
    name: "Rahul Patil",
    phone: "9876123456",
    college: "YC College",
    messName: "Jadhav Mess",
    status: "inactive",
  },
];

const StudentsList = () => {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Students</h1>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm text-gray-600">#</th>
              <th className="px-4 py-3 text-left text-sm text-gray-600">Name</th>
              <th className="px-4 py-3 text-left text-sm text-gray-600">Phone</th>
              <th className="px-4 py-3 text-left text-sm text-gray-600">College</th>
              <th className="px-4 py-3 text-left text-sm text-gray-600">Mess</th>
              <th className="px-4 py-3 text-left text-sm text-gray-600">Status</th>
              <th className="px-4 py-3 text-center text-sm text-gray-600">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {students.map((student, index) => (
              <tr
                key={student.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3 text-sm">{index + 1}</td>
                <td className="px-4 py-3 text-sm font-medium">
                  {student.name}
                </td>
                <td className="px-4 py-3 text-sm">{student.phone}</td>
                <td className="px-4 py-3 text-sm">{student.college}</td>
                <td className="px-4 py-3 text-sm">{student.messName}</td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      student.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {student.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-center">
                  <Link
                    to={`/admin/students/${student.id}`}
                    className="text-indigo-600 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsList;
