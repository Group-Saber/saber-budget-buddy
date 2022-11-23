import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const ExpensesLineChart = ({expenses, color}) => {
    let [dates, setDates] = useState([])

    useEffect(() => {
        /**
         * gets the total expenses amount for the past six weeks
         */
        let getDates = () => {
            let week = []
            let today = new Date()
            today.setHours(0, 0, 0, 0)

            if(today.getDay() !== 0) {
                today.setDate(today.getDate() - today.getDay())
            }

            for(let i = 0; i < 6; i++) {
                week.push({amount: 0, date: new Date(today)})
                today.setDate(today.getDate() - 7)
            }

            for(let i = 0; i < expenses.length; i++) {
                today = expenses[i].date
                
                if(today >= week[0].date.getTime()) {
                    week[0].amount += expenses[i].amount
                } else if(today >= week[1].date.getTime()) {
                    week[1].amount += expenses[i].amount
                } else if(today >= week[2].date.getTime()) {
                    week[2].amount += expenses[i].amount
                } else if(today >= week[3].date.getTime()) {
                    week[3].amount += expenses[i].amount
                } else if(today >= week[4].date.getTime()) {
                    week[4].amount += expenses[i].amount
                } else if(today >= week[5].date.getTime()) {
                    week[5].amount += expenses[i].amount
                } 
            }

            setDates(week)
        }
        
        getDates()
    }, [expenses])

    let formatDate = (date) => {
        let newDate = `${date.getMonth() + 1}/${date.getDate()}`

        if(new Date().getFullYear() !== date.getFullYear()) {
            newDate += `/${date.getFullYear()}`
        }

        return newDate
    }

    const data = dates.map((expense) => ({amount: Math.abs(expense.amount), date: formatDate(new Date(expense.date))})).filter(n => n).reverse()

    const CustomTooltip = ({active, payload}) => {
        if (active && payload && payload.length) {
            return (
              <div className='custom-tooltip' style={{color: color}}>
                <p>{`${payload[0].name} : ${payload[0].value.toFixed(2)}`}</p>
              </div>
            );
          }
        
          return null;
    }

    return (
        <>
        <h2>Expenses (6 Weeks)</h2>
        <ResponsiveContainer width='100%' height='80%'>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type='monotone' dataKey='amount' stroke={color} strokeWidth={3} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
        </>
    )
}

export default ExpensesLineChart
