import React, { useEffect, useState } from "react";

const TopPanel = ({uid}) => {
    let [name, setName] = useState('')

    useEffect(() => {
        getName()
    })

    let getName = async () => {
        let response = await fetch('http://127.0.0.1:8000/app/name/' + uid)
        let data = await response.json()
        setName(`${data.first} ${data.last}`)
    }

    return (
        <div className="top-panel">
            <div className="panel-name">
                <p>{name}</p>
            </div>
        </div>
    )
}

export default TopPanel
