"use client";
import { useState } from "react";
import { useEffect } from "react";

const options = [
  { value: 1, text: "January" },
  { value: 2, text: "February" },
  { value: 3, text: "March" },
  { value: 4, text: "April" },
  { value: 5, text: "May" },
  { value: 6, text: "June" },
  { value: 7, text: "July" },
  { value: 8, text: "August" },
  { value: 9, text: "September" },
  { value: 10, text: "October" },
  { value: 11, text: "November" },
  { value: 12, text: "December" },
];

const BASE_URL = "http://localhost:5000";
const LIMIT = 5;

export default function hero() {
  const [searchInput, setSearchInput] = useState("");
  const [selectedOption, setSelectedOption] = useState(options[2].value);
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLastPage, setIsLastPage] = useState("false");
  const [page, setPage] = useState(1);

  const searchInputchangehandler = (e) => {
    setSearchInput(e.target.value);
  };

  console.log("5");
  const fetchData = async () => {
    console.log("5");

    try {
      const url = `${BASE_URL}/transactions?offset=${page}&limit=${LIMIT}&month=${selectedOption}&q=${searchInput}`;
      setIsLoading(true);
      console.log(`Fetching data with URL: ${url}`);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      console.log("Fetched data:", result);
      setData(result);
      setIsLoading(false);
    } catch (error) {
      console.error("Fetch data error:", error);
      setIsLoading(false);
      setData({ response: [] });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Successfully fetched");
    fetchData();
  }, [selectedOption, searchInput]);

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    setPage(1);
  }, [selectedOption]);

  const selectoptionhandler = (e) => {
    setSelectedOption(e.target.value);
  };

  const paginationNextHandler = (e) => {
    setPage(page + 1);
  };

  const paginationPrevHandler = (e) => {
    if (page == 1) {
      return;
    }
    setPage(page - 1);
  };

  useEffect(() => {
    console.log("Search input value changed:", searchInput);
  }, [searchInput]);

  useEffect(() => {
    console.log("Month selection changed:", selectedOption);
  }, [selectedOption]);

  return (
    <section className="my-20 flex flex-col items-center">
      <div
        className="text-center font-bold uppercase text-3xl bg-blue-300 p-2"
        style={{
          color: "#000080",
          fontFamily: "Helvetica, serif",
          transform: "translateX(-6px)",
        }}
      >
        transaction dashboard
      </div>
      <div className="my-8" style={{ textAlign: "right" }}>
        <input
          type="text"
          placeholder="search transactions"
          value={searchInput}
          onChange={searchInputchangehandler}
          style={{
            backgroundColor: "#e6e6e6",
            border: "1px solid gray",
            padding: "2px",
            borderRadius: "4px",
          }}
        />
        <select
          value={selectedOption}
          onChange={selectoptionhandler}
          style={{
            backgroundColor: "#e6e6e6",
            border: "1px solid gray",
            padding: "2px",
            borderRadius: "4px",
            marginRight: "10px",
          }}
        >
          {options.map((option) => {
            return <option value={option.value}>{option.text}</option>;
          })}
        </select>
      </div>
      <div className="max-w-7xl mx-auto">
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid gray", padding: "8px" }}>ID</th>
              <th style={{ border: "1px solid gray", padding: "8px" }}>
                Title
              </th>
              <th style={{ border: "1px solid gray", padding: "8px" }}>
                Description
              </th>
              <th style={{ border: "1px solid gray", padding: "8px" }}>
                Price
              </th>
              <th style={{ border: "1px solid gray", padding: "8px" }}>
                Category
              </th>
              <th style={{ border: "1px solid gray", padding: "8px" }}>Sold</th>
              <th style={{ border: "1px solid gray", padding: "8px" }}>
                Image
              </th>
            </tr>
          </thead>
          <tbody>
            {data.response && data.response.length > 0 ? (
              data.response.map((dataRow) => (
                <tr key={dataRow.id}>
                  <td style={{ border: "1px solid gray", padding: "8px" }}>
                    {dataRow.id}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "8px" }}>
                    {dataRow.title}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "8px" }}>
                    {dataRow.description}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "8px" }}>
                    {dataRow.price}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "8px" }}>
                    {dataRow.category}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "8px" }}>
                    {dataRow.sold ? "Yes" : "No"}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "8px" }}>
                    <img
                      src={dataRow.image}
                      alt="Product Image"
                      style={{ maxWidth: "200px", maxHeight: "200px" }}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="pagination flex justify-between mt-4">
          <span>Page: {page}</span>
          <div className="font-semibold" style={{ color: "#059DFF" }}>
            <span
              className="pagination-prev bg-blue-600 text-gray-200 p-1"
              onClick={paginationPrevHandler}
            >
              Previous
            </span>
            <span> </span>
            <span className="text-gray-600">- </span>
            <span
              className="pagination-prev bg-blue-600 text-gray-200 p-1"
              onClick={paginationNextHandler}
            >
              Next
            </span>
          </div>
          <span>Per Page: {LIMIT}</span>
        </div>
      </div>
    </section>
  );
}
