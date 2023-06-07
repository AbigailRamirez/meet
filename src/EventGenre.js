import React, {useEffect, useState } from 'react';
import {
    PieChart, 
    Pie, 
    Cell, 
    ResponsiveContainer,
    Tooltip, 
    Legend
} from 'recharts';

const EventGenre = ({ events }) => {
    const [data, setData] = useState([]);

    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

    function getData() {
        const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
    
        const data = genres.map((genre, index) => {
          const value = events.filter(({ summary }) => summary.split(" ").includes(genre)).length;
    
          return { name: genre, value, fill: colors[index] };
        });
    
        return data;
    }

    useEffect(() => {
        setData(getData());
    }, [events]);
    
      


    return (

        <ResponsiveContainer height={400} >
            <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index]} />
                    ))}
                </Pie>
                <Legend verticalAlign="bottom" layout="horizontal"  formatter={(value, entry, index) => <span style={{ color: entry.color }}>{entry.payload.name}</span>} />
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>

    );
}

export default EventGenre;