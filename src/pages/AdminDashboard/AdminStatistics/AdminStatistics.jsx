import React, { useEffect, useState } from "react";
import "chart.js/auto"
import { Bar } from "react-chartjs-2";
import SideBar from "../../../components/SideBar/SideBar";
import axios from "axios";

export default function AdminStatistics() {
  const [statistics,setStatistics]= useState([]);
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August', 'September', 'October', 'November', 'December'];
  async function fecthStatistic(){
    const response = await axios.get("https://jsonplaceholder.typicode.com/users");
    setStatistics(response.data);
    console.log(response.data);
  }
  useEffect(() => {
    fecthStatistic();
  }, []);


  const data = {
    labels: labels,
    datasets: [
      {
        label: 'My First Dataset',
        data: statistics.map((item,index) =>(item.address.geo.lat)),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      },
      {
        label: 'My Second Dataset',
        data: statistics.map((item,index) =>(item.address.geo.lng)),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <div>
      <SideBar />
      <div className='bar-chart-table' style={{ width: '80%', marginLeft: '500px', marginTop:'100px' }}>
        <div style={{ height: '400px', width: '70%' }}>
          <Bar
            data={data}
          />
        </div>
      </div>

    </div>
  );
}
