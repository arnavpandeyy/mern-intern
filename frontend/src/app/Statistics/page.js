"use client";
import { useState } from "react";
import { useEffect } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
  } from "recharts";

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

const BASE_URL = "http://localhost:5000"
const LIMIT = 7;

export default function Statistics() {
    
  const [searchInput, setSearchInput] = useState("");
  const [selectedOption, setSelectedOption] = useState(options[2].value);
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLastPage, setIsLastPage] = useState("false");
  const [page, setPage] = useState(1);
  const [statsData, setStatsData] = useState({
    response: {
      textResponse: {
        totalSalesByMonth: 0,
        itemSoldByMonth: 0,
        itemsNotSoldByMonth: 0
      }
    }
  });
    
  const searchInputchangehandler = (e) => {
    setSearchInput(e.target.value);
  };


console.log('5');
  const fetchData = async () => {
console.log('5');

    try {
      const url = `${BASE_URL}/stats?offset=${page}&month=${selectedOption}`;
      setIsLoading(true);
      console.log(`Fetching data with URL: ${url}`);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      console.log('Fetched data:', result);
      setStatsData(result);
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
        }}
      >
        transaction Statistics
      </div>
      <div className="my-8 mx-10" style={{ textAlign: "right" }}>
        <select
          value={selectedOption}
          onChange={selectoptionhandler}
          style={{
            backgroundColor: '#e6e6e6',
            border: "1px solid gray",
            padding: "2px",
            borderRadius: "4px",
            marginRight: "10px",
          }}
        >
          {options.map((option) => {
            return <option value={option.value}>
                {option.text}</option>;
          })}
        </select>
      </div>
      <div>
          <h1 className="my-2 text-3xl text-center italic uppercase font-semibold underline" style={{color: "#013220"}}>Statistics - {options[selectedOption - 1].text}</h1>
          <div className="my-10 grid grid-cols-3 gap-12">
            <p className="my-2 text-xl mx-2 bg-gray-600 text-white p-5 rounded-2xl">
              Total Sales: {statsData.response.textResponse.totalSalesByMonth}
            </p>
            <p className="my-2 mx-4 text-xl bg-gray-600 text-white p-5 rounded-2xl">
              Total Sold items:{" "}
              {statsData.response.textResponse.itemSoldByMonth}
            </p>
            <p className="my-2 text-xl bg-gray-600 text-white p-5 rounded-2xl">
              Total not sold items:{" "}
              {statsData.response.textResponse.itemsNotSoldByMonth}
            </p>
        </div>
    </div>

    </section>
  );
}