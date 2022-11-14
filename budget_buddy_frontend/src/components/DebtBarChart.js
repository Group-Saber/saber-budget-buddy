import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DebtLineChart = ({debts, color, title}) => {
    let [dates, setDates] = useState([])

    useEffect(() => {
        let getDates = () => {
            let week = []
            let today = new Date()
            today.setHours(0, 0, 0, 0)

            if(today.getDay() !== 0) {
                today.setDate(today.getDate() - today.getDay())
            }

            for(let i = 0; i < 5; i++) {
                week.push({amount: 0, date: new Date(today)})
                today.setDate(today.getDate()-7)
            }

            for(let i = 0; i < debts.length; i++) {
                today = debts[i].date
                
                if(today >= week[0].date.getTime()) {
                    week[0].amount += debts[i].amount
                } else if(today >= week[1].date.getTime()) {
                    week[1].amount += debts[i].amount
                } else if(today >= week[2].date.getTime()) {
                    week[2].amount += debts[i].amount
                } else if(today >= week[3].date.getTime()) {
                    week[3].amount += debts[i].amount
                } else if(today >= week[4].date.getTime()) {
                    week[4].amount += debts[i].amount
                } 
            }

            setDates(week)
        }
        
        getDates()
    }, [debts])

    let formatDate = (date) => {
        let newDate = `${date.getMonth() + 1}/${date.getDate()}`

        if(new Date().getFullYear() !== date.getFullYear()) {
            newDate += `/${date.getFullYear()}`
        }

        return newDate
    }

    const data = dates.map((debt) => debt === 0 ? null : ({amount: Math.abs(debt.amount), date: formatDate(new Date(debt.date))})).filter(n => n).reverse()

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
        <h2>{title} (5 Weeks)</h2>
        <ResponsiveContainer width='100%' height='80%'>
            <BarChart
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey='date' />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey='amount' fill={color} />
            </BarChart>
        </ResponsiveContainer>
        </>
    )
}

export default DebtLineChart
