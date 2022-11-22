import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Legend, Cell, Tooltip, ResponsiveContainer } from 'recharts'

const ExpensesPieChart = ({ expenses }) => {
    let [data, setData] = useState([])

    useEffect(() => {
        let getCategories = () => {
            let categories = [
                {name: 'Bills', value: 0},
                {name: 'Food', value: 0},
                {name: 'Groceries', value: 0},
                {name: 'Other', value: 0},
                {name: 'Shopping', value: 0},
                {name: 'Subscriptions', value: 0}]
            let today = new Date()
            today.setDate(1)
            today.setHours(0, 0, 0, 0)

            for (let i in expenses) {
                if (expenses[i].date >= today.getTime()) {
                    switch (expenses[i].type) {
                        case 'bills':
                            categories[0].value += expenses[i].amount
                            break
                        case 'food':
                            categories[1].value += expenses[i].amount
                            break
                        case 'groceries':
                            categories[2].value += expenses[i].amount
                            break
                        case 'other':
                            categories[3].value += expenses[i].amount
                            break
                        case 'shopping':
                            categories[4].value += expenses[i].amount
                            break
                        case 'subscriptions':
                            categories[5].value += expenses[i].amount
                            break
                        default:
                            break
                    }
                }
            }

            setData(categories)
        }

        getCategories()
    }, [expenses])

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FE0E3A', '#DB91B1']
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill='white' textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        )
    }

    const style = {
        top: 0,
        lineHeight: '24px'
    }

    const CustomTooltip = ({active, payload}) => {
        if (active && payload && payload.length) {
            return (
              <div className='custom-tooltip' style={{color: payload[0].payload.fill}}>
                <p>{`${payload[0].name} : ${payload[0].value.toFixed(2)}`}</p>
              </div>
            );
          }
        
          return null;
    }

    return (
        <>
        <h2>Monthly Expenses</h2>
        <ResponsiveContainer width='100%' height='85%'>
            <PieChart width={300} height={300}>
                <Pie
                    data={data}
                    cx='50%'
                    cy='50%'
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius='85%'
                    fill='#8884d8'
                    dataKey='value'
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />}/>
                <Legend iconSize={10} layout='horizontal' verticalAlign='middle' wrapperStyle={style} />
            </PieChart>
        </ResponsiveContainer>
        </>
    );
}

export default ExpensesPieChart
