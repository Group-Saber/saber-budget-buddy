import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DebtLineChart = ({debts, color, title}) => {
    let [dates, setDates] = useState([])

    useEffect(() => {
        let getDates = () => {
            let month = []
            let today = new Date()
            today.setHours(0, 0, 0, 0)
            
            if(today.getDay() !== 0) {
                today.setDate(today.getDate()-today.getDate()-1)
            }

            for(let i = 0; i < 5; i++) {
                month.push({amount: 0, date: new Date(today)})
                today.setDate(today.getDate()-7)
            }

            for(let i = 0; i < debts.length; i++) {
                today = debts[i].date
                
                if(today >= month[0].date.getTime()) {
                    month[0].amount += debts[i].amount
                } else if(today >= month[1].date.getTime()) {
                    month[1].amount += debts[i].amount
                } else if(today >= month[2].date.getTime()) {
                    month[2].amount += debts[i].amount
                } else if(today >= month[3].date.getTime()) {
                    month[3].amount += debts[i].amount
                } else if(today >= month[4].date.getTime()) {
                    month[4].amount += debts[i].amount
                } 
            }

            setDates(month)
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

    return (
        <>
        <h2>{title}</h2>
        <ResponsiveContainer width="100%" height={300}>
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
                <Tooltip />
                <Legend />
                <Bar dataKey='amount' fill={color} />
            </BarChart>
        </ResponsiveContainer>
        </>
    )
}

export default DebtLineChart
