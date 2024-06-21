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

const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#a4de6c", "#d0ed57", "#8884d8"];

const BASE_URL = "http://localhost:5000"
const LIMIT = 2;

export default function BarGraph() {
    
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

  const monthChangeHandler = (e) => {
    setSelectedOption(e.target.value);
    console.log("selected option:", JSON.stringify(selectedOption));
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
          transform: "translateX(-15px)",
        }}
      >
        transaction PieChart
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
      {/* {JSON.stringify(statsData.response.pieResponse)} */}
          <div className="text-center"   style={{ height: "300px", width: "800px" }}>
            <ResponsiveContainer width="100%" height="100%">
            <PieChart className="items-center" width={1000} height={1000}>
                <Pie
                  dataKey="count"
                  nameKey="category"
                  data={statsData.response.pieResponse}
                  isAnimationActive={true}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#4B006E"
                  label={({ name, value }) => `${name}: ${value}`}
                />
                    {
          (statsData.response.pieResponse || []).map((entry, index) => (
            <cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))
        }
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
    </section>
  );
}