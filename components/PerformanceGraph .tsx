
"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Mock data: Replace this with your dynamic data for Radiant and Dire team performance
const matchPerformanceData = [
  { time: "00:00", radiantGold: 0, direGold: 0, radiantXP: 0, direXP: 0 },
  { time: "05:00", radiantGold: 500, direGold: -500, radiantXP: 300, direXP: -300 },
  { time: "10:00", radiantGold: 1000, direGold: -1000, radiantXP: 800, direXP: -800 },
  { time: "15:00", radiantGold: 1500, direGold: -1500, radiantXP: 1200, direXP: -1200 },
  { time: "20:00", radiantGold: 2000, direGold: -2000, radiantXP: 1600, direXP: -1600 },
  { time: "25:00", radiantGold: 2500, direGold: -2500, radiantXP: 2000, direXP: -2000 },
  // Add more data points as per match duration
]

const PerformanceGraph = () => {
  return (
    <div className="p-4 bg-gray-900/50 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-center mb-4">Match Performance</h2>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={matchPerformanceData}>
          <defs>
            <linearGradient id="colorRadiantGold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#4CAF50" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorDireGold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F44336" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#F44336" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorRadiantXP" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2196F3" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#2196F3" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorDireXP" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF9800" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#FF9800" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="radiantGold"
            stroke="#4CAF50"
            fillOpacity={1}
            fill="url(#colorRadiantGold)"
            name="Radiant Gold Advantage"
          />
          <Area
            type="monotone"
            dataKey="direGold"
            stroke="#F44336"
            fillOpacity={1}
            fill="url(#colorDireGold)"
            name="Dire Gold Advantage"
          />
          <Area
            type="monotone"
            dataKey="radiantXP"
            stroke="#2196F3"
            fillOpacity={1}
            fill="url(#colorRadiantXP)"
            name="Radiant XP Advantage"
          />
          <Area
            type="monotone"
            dataKey="direXP"
            stroke="#FF9800"
            fillOpacity={1}
            fill="url(#colorDireXP)"
            name="Dire XP Advantage"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PerformanceGraph

// import React, { useEffect, useState } from "react"
// import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"

// const PerformanceGraph = ({ goldAdv, xpAdv }) => {
//   const [matchPerformanceData, setMatchPerformanceData] = useState([])

//   useEffect(() => {
//     if (goldAdv && xpAdv) {
//       const formattedData = goldAdv.map((gold, index) => ({
//         time: `${index * 5}:00`, // Assuming each index is 5 minutes in the game
//         radiantGold: gold,
//         direGold: -gold, // Negative for Dire
//         radiantXP: xpAdv[index] || 0,
//         direXP: -(xpAdv[index] || 0), // Negative for Dire
//       }))

//       setMatchPerformanceData(formattedData)
//     }
//   }, [goldAdv, xpAdv])

//   return (
//     <div className="p-4 bg-gray-800/50 rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold text-center mb-4">Match Performance</h2>
//       <ResponsiveContainer width="100%" height={400}>
//         <AreaChart data={matchPerformanceData}>
//           <defs>
//             <linearGradient id="colorRadiantGold" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8} />
//               <stop offset="95%" stopColor="#4CAF50" stopOpacity={0.1} />
//             </linearGradient>
//             <linearGradient id="colorDireGold" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="5%" stopColor="#F44336" stopOpacity={0.8} />
//               <stop offset="95%" stopColor="#F44336" stopOpacity={0.1} />
//             </linearGradient>
//             <linearGradient id="colorRadiantXP" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="5%" stopColor="#2196F3" stopOpacity={0.8} />
//               <stop offset="95%" stopColor="#2196F3" stopOpacity={0.1} />
//             </linearGradient>
//             <linearGradient id="colorDireXP" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="5%" stopColor="#FF9800" stopOpacity={0.8} />
//               <stop offset="95%" stopColor="#FF9800" stopOpacity={0.1} />
//             </linearGradient>
//           </defs>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="time" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Area
//             type="monotone"
//             dataKey="radiantGold"
//             stroke="#4CAF50"
//             fillOpacity={1}
//             fill="url(#colorRadiantGold)"
//             name="Radiant Gold Advantage"
//           />
//           <Area
//             type="monotone"
//             dataKey="direGold"
//             stroke="#F44336"
//             fillOpacity={1}
//             fill="url(#colorDireGold)"
//             name="Dire Gold Advantage"
//           />
//           <Area
//             type="monotone"
//             dataKey="radiantXP"
//             stroke="#2196F3"
//             fillOpacity={1}
//             fill="url(#colorRadiantXP)"
//             name="Radiant XP Advantage"
//           />
//           <Area
//             type="monotone"
//             dataKey="direXP"
//             stroke="#FF9800"
//             fillOpacity={1}
//             fill="url(#colorDireXP)"
//             name="Dire XP Advantage"
//           />
//         </AreaChart>
//       </ResponsiveContainer>
//     </div>
//   )
// }

// export default PerformanceGraph

