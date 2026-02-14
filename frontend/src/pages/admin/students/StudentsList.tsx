import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import TopNav from "../../../layouts/TopNav";
import FilterBar from "../../../components/common/table/FilterBar";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
} from "../../../components/common/table/TableUI";

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
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // 🔍 Filter Logic
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchSearch =
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.college.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "all" || student.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [search, statusFilter]);

  // 📊 Counts
  const counts = useMemo(() => {
    return {
      total: students.length,
      active: students.filter(s => s.status === "active").length,
      inactive: students.filter(s => s.status === "inactive").length,
    };
  }, []);

  // 📥 Export
  const exportCSV = () => {
    const headers = ["Name", "Phone", "College", "Mess", "Status"];
    const rows = filteredStudents.map(s => [
      s.name,
      s.phone,
      s.college,
      s.messName,
      s.status,
    ]);

    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "students.csv";
    a.click();
  };

  return (
    <div className="min-h-screen">

      <TopNav
       title="Students"
        subtitle="Manage student registrations"
        showBackButton={true}
       />

      <FilterBar
        search={search}
        setSearch={setSearch}
        onExport={exportCSV}
        showStatusButtons={false}
        showExportButton={true}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        total={counts.total}
        pending={0}
        approved={counts.active}
        rejected={counts.inactive}
      />

      {/* Table */}
      <div className="bg-white rounded-b-xl shadow-sm overflow-x-auto">
        <Table>
          <TableHead>
            <tr>
              <TableHeader>Sr</TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>Phone</TableHeader>
              <TableHeader>College</TableHeader>
              <TableHeader>Mess</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Action</TableHeader>
            </tr>
          </TableHead>

          <TableBody>
            {filteredStudents.map((student, index) => (
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

            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  No students found
                </td>
              </tr>
            )}
          </TableBody>
        </Table>
      </div>

    </div>
  );
};

export default StudentsList;
