import React from "react";

export const Table = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white rounded-b-lg shadow-sm overflow-hidden">
    <table className="min-w-full text-sm">{children}</table>
  </div>
);

export const TableHead = ({ children }: { children: React.ReactNode }) => (
  <thead className="bg-indigo-900 text-white uppercase text-xs tracking-wider">
    {children}
  </thead>
);

export const TableBody = ({ children }: { children: React.ReactNode }) => (
  <tbody>{children}</tbody>
);

export const TableRow = ({ children }: { children: React.ReactNode }) => (
  <tr className="even:bg-gray-100 odd:bg-white hover:bg-gray-250 transition duration-200">
    {children}
  </tr>
);

export const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <th className="px-6 py-4 text-left">{children}</th>
);

export const TableCell = ({ children }: { children: React.ReactNode }) => (
  <td className="px-6 py-2 text-gray-600">{children}</td>
);
