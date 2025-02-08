import React, { useState } from "react";

const DataTable = () => {
  const sampleData = [
    { id: 1, name: "John Doe", age: 25, role: "Admin" },
    { id: 2, name: "Jane Smith", age: 30, role: "User" },
    { id: 3, name: "Charlie", age: 28, role: "Supervisor" },
    { id: 4, name: "David", age: 35, role: "User" },
    { id: 5, name: "Eve", age: 22, role: "Admin" },
    { id: 6, name: "Frank", age: 29, role: "Supervisor" },
    { id: 7, name: "Grace", age: 27, role: "User" },
  ];

  const [originalData] = useState(sampleData);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [data, setData] = useState(sampleData);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1);
  };

  const resetSorting = () => {
    setSortConfig({ key: null, direction: "asc" });
    setData(originalData);
  };

  const handleSort = (key) => {
    let direction = "asc";
  
    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") {
        direction = "desc";
      } else {
        resetSorting();
        return;
      }
    }
  
    setSortConfig({ key, direction });
  
    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
  
    setData(sortedData);
  };
  

  // Search & filter logic
  const filteredData = data.filter((item) =>
    Object.values(item).some(
      (value) =>
        value.toString().toLowerCase().includes(search.toLowerCase()) &&
        (filter ? item.role === filter : true)
    )
  );

  
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Custom Data Table</h2>

     
      <div className="flex justify-between items-center mb-4">
        <input
          value={search}
          onChange={handleSearch}
          type="text"
          placeholder="Search..."
          className="border p-2 rounded-md w-1/3 focus:ring-2 focus:ring-blue-400 outline-none transition"
        />

        <select
          value={filter}
          onChange={handleFilter}
          className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none transition"
        >
          <option value="">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
          <option value="Supervisor">Supervisor</option>
        </select>
      </div>

    
      <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm">
        <table className="w-full border-collapse">
          <thead className="bg-blue-500 text-white">
            <tr>
              {["ID", "Name", "Age", "Role"].map((header) => (
                <th
                  key={header}
                  onClick={() => handleSort(header.toLowerCase())}
                  className="border p-3 cursor-pointer hover:bg-blue-600 transition"
                >
                  {header}{" "}
                  {sortConfig.key === header.toLowerCase() &&
                    (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr
                  key={item.id}
                  className={`border ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-200 transition`}
                >
                  <td className="p-3 text-center">{item.id}</td>
                  <td className="p-3 text-center">{item.name}</td>
                  <td className="p-3 text-center">{item.age}</td>
                  <td className="p-3 text-center">{item.role}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-3 text-center text-gray-600">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-md bg-blue-500 text-white disabled:opacity-50 hover:bg-blue-600 transition"
        >
          Prev
        </button>
        <span className="text-gray-700 font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded-md bg-blue-500 text-white disabled:opacity-50 hover:bg-blue-600 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
