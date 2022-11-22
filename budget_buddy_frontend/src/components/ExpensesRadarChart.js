import React, { useEffect, useState } from 'react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'

const ExpensesRadarChart = ({expenses, color}) => {
    let [data, setData] = useState([])

    useEffect(() => {
        let getCategories = () => {
            let categories = [
                {type: 'Bills', amount: 0},
                {type: 'Food', amount: 0},
                {type: 'Groceries', amount: 0},
                {type: 'Other', amount: 0},
                {type: 'Shopping', amount: 0},
                {type: 'Subscriptions', amount: 0}]
            let today = new Date()
            today.setDate(1)
            today.setHours(0, 0, 0, 0)

            for (let i in expenses) {
                if (expenses[i].date >= today.getTime()) {
                    switch (expenses[i].type) {
                        case 'bills':
                            categories[0].amount += expenses[i].amount
                            break
                        case 'food':
                            categories[1].amount += expenses[i].amount
                            break
                        case 'groceries':
                            categories[2].amount += expenses[i].amount
                            break
                        case 'other':
                            categories[3].amount += expenses[i].amount
                            break
                        case 'shopping':
                            categories[4].amount += expenses[i].amount
                            break
                        case 'subscriptions':
                            categories[5].amount += expenses[i].amount
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

    let customTick = ({ payload, x, y, textAnchor, stroke, radius }) => {
        return (
          <g>
            <text
              radius={radius}
              stroke={stroke}
              x={x}
              y={y}
              textAnchor={textAnchor}
              fill={color}
            >
              <tspan x={x} dy='0em'>
                {payload.value}
              </tspan>
            </text>
          </g>
        )
      }

    return (
        <>
        <h2>Monthly Expenses</h2>
        <ResponsiveContainer width='100%' height='85%'>
          <RadarChart cx='50%' cy='50%' outerRadius='85%' data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey='type' tick={customTick} />
            <PolarRadiusAxis />
            <Radar dataKey='amount' stroke={color} fill={color} fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
        </>
    );
}

export default ExpensesRadarChart
