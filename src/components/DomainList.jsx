import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const { logout } = useAuth();

  const fetchCSV = async () => {
    try {
      const response = await fetch("/Domain.csv");
      const csvText = await response.text();

      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const parsedData = result.data.map((row) => ({
            ...row,
            Traffic: row.Traffic?.replace(/,/g, "") || "Not provided",
          }));
          setData(parsedData);
          setLoading(false);
        },
      });
    } catch (error) {
      console.error("Error fetching the CSV file:", error);
    }
  };

  useEffect(() => {
    fetchCSV();
  }, []);

  // Sorting Data 
  const sortData = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setSortConfig({ key, direction });
    setData(sortedData);
  };

  {/* Filtering Data on the basis of search */}

  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      value?.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  {/* Pagination Logic */}
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div>
      <div className="p-4 max-w-7xl mx-auto">
        <div className="p-6 bg-gradient-to-r from-indigo-500 via-blue-600 to-cyan-500 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-6 text-center text-white">
            Your Domain Data Insights
          </h1>

          {/* Search Bar */}
          <div className="mb-4 flex justify-between items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="p-3 pl-10 w-full border rounded-lg shadow-md focus:ring focus:ring-blue-200 focus:border-blue-500"
              />
              <span className="absolute top-3 left-3 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 18l6-6M10 6l6 6-6 6z"
                  />
                </svg>
              </span>
            </div>
            <select
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              className="p-2 border rounded-lg shadow-md focus:ring focus:ring-blue-200 focus:border-blue-500"
            >
              {[5, 10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size} rows
                </option>
              ))}
            </select>
          </div>

          {/* Data Table */}
          {loading ? (
            <p className="text-center text-white">Loading...</p>
          ) : (
            <div className="overflow-x-auto rounded-lg shadow-md">
              <table className="table-auto w-full bg-white shadow-lg rounded-lg">
                <thead className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white sticky top-0">
                  <tr>
                    {Object.keys(data[0] || {}).map((key, index) => (
                      <th
                        key={index}
                        className="px-4 py-2 text-left cursor-pointer hover:bg-blue-700 transition-colors"
                        onClick={() => sortData(key)}
                      >
                        <div className="flex items-center space-x-2">
                          <span>{key}</span>
                          {sortConfig.key === key ? (
                            sortConfig.direction === "asc" ? (
                              <FaSortUp />
                            ) : (
                              <FaSortDown />
                            )
                          ) : (
                            <FaSort />
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className="hover:bg-blue-100 transition-all"
                    >
                      {Object.values(row).map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="px-4 py-2 border text-gray-700"
                        >
                          {cell || "N/A"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex justify-center items-center mt-6 space-x-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md transition-transform transform hover:scale-105"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-white">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md transition-transform transform hover:scale-105"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded"
        >
            Logout
        </button>
      </div>
    </div>
  );
};

export default DataTable;
