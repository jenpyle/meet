import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const EventGenre = ({ events }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(() => getData());
  }, [events]);
  // const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  // const COLORS = ['#70d6ff', '#ff70a6', '#ffd670', '#e9ff70', '#ff9770'];
  const COLORS = ['#ff99c8', '#fcf6bd', '#d0f4de', '#a9def9', '#e4c1f9'];
  // const COLORS = ['#ff0a54', '#ff5c8a', '#ff85a1', '#fbb1bd', '#f7cad0'];
  const getData = () => {
    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
    const data = genres.map((genre) => {
      const value = events.filter((event) => event.summary.split(' ').includes(genre)).length;
      return { name: genre, value };
    });
    return data;
  };

  return (
    <ResponsiveContainer height={400}>
      <PieChart>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={true}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        {/* <Legend align="center" height={36} /> */}
        <Legend layout="horizontal" align="center" verticalAlign="top"></Legend>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenre;
