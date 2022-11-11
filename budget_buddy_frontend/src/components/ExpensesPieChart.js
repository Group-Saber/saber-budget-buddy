import React from 'react';
import { PieChart, Pie, Legend, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a2f3b3', '#db91b1'];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const style = {
  top: '30px',
  lineHeight: "24px"
};

const ExpensesPieChart = ({bills, food, groceries, shopping, subscriptions, other}) => {
    const data = [
      { name: 'Bills', value: bills },
      { name: 'Food', value: food },
      { name: 'Groceries', value: groceries },
      { name: 'Shopping', value: shopping },
      { name: 'Subscriptions', value: subscriptions },
      { name: 'Other', value: other },
    ];

    return (
      <>
        <h2>Monthly Expenses</h2>
        <ResponsiveContainer width='100%' height='90%'>
          <PieChart width={400} heigh={400}>
            <Pie
              data={data}
              cx='50%'
              cy='50%'
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={250}
              fill="#8884d8"
              dataKey="value"
              >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Legend iconSize={10} layout="horizontal" verticalAlign="middle" wrapperStyle={style} />
          </PieChart>
        </ResponsiveContainer>
      </>
    );
}

export default ExpensesPieChart
