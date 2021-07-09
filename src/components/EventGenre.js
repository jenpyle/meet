import React, { useEffect, useState } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';

const EventGenre = ({ events }) => {
  const [data, setData] = useState([]);
  const COLORS = ['#ff99c8', '#fcf6bd', '#d0f4de', '#a9def9', '#e4c1f9'];

  useEffect(() => {
    setData(() => getData());
  }, [events]);

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
        <Legend layout="horizontal" align="center" verticalAlign="top"></Legend>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenre;
