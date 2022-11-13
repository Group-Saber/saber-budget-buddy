import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Legend, Cell, ResponsiveContainer } from 'recharts'

const ExpensesPieChart = ({ expenses }) => {
    let [bills, setBills] = useState(0)
    let [food, setFood] = useState(0)
    let [groceries, setGroceries] = useState(0)
    let [other, setOther] = useState(0)
    let [shopping, setShopping] = useState(0)
    let [subscriptions, setSubscriptions] = useState(0)

    useEffect(() => {
        let getCategories = () => {
            let tBills = 0
            let tFood = 0
            let tGroceries = 0
            let tOther = 0
            let tShopping = 0
            let tSubscriptions = 0
            let today = new Date()
            today.setDate(1)
            today.setHours(0, 0, 0, 0)

            for (let i in expenses) {
                if (expenses[i].date >= today.getTime()) {
                    switch (expenses[i].type) {
                        case 'bills':
                            tBills += expenses[i].amount
                            break
                        case 'food':
                            tFood += expenses[i].amount
                            break
                        case 'groceries':
                            tGroceries += expenses[i].amount
                            break
                        case 'other':
                            tOther += expenses[i].amount
                            break
                        case 'shopping':
                            tShopping += expenses[i].amount
                            break
                        case 'subscriptions':
                            tSubscriptions += expenses[i].amount
                            break
                        default:
                            break
                    }
                }
            }

            setBills(tBills)
            setFood(tFood)
            setGroceries(tGroceries)
            setOther(tOther)
            setShopping(tShopping)
            setSubscriptions(tSubscriptions)
        }

        getCategories()
    }, [expenses])

    const data = [
        { name: 'Bills', value: bills },
        { name: 'Food', value: food },
        { name: 'Groceries', value: groceries },
        { name: 'Shopping', value: shopping },
        { name: 'Subscriptions', value: subscriptions },
        { name: 'Other', value: other }
    ]

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A2F3B3', '#DB91B1']
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        )
    }

    const style = {
        top: 0,
        lineHeight: "24px"
    }

    return (
        <>
        <h2>Monthly Expenses</h2>
        <ResponsiveContainer width='100%' height='90%'>
            <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    cx='50%'
                    cy='50%'
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={window.innerWidth > 1700 ? 250 : 125}
                    fill='#8884d8'
                    dataKey='value'
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
