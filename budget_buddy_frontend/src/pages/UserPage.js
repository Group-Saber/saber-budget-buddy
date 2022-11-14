import React, { useState } from 'react'

const UserPage = ({user}) => {
    let [color, setColor] = useState('#222222')
    let [contrast, setContrast] = useState('#ffffff')

    let handleClick = () => {
        const hex = '0123456789abcdef'
        let newColor = ''

        for(let i = 0; i < 6; i++) {
            newColor += hex.charAt(Math.floor(Math.random() * hex.length))
        }

        console.log(newColor)
        setColor('#' + newColor)
        setContrast('#' + invertHex(newColor))
    }

    let invertHex = (hex) => {
        return (Number(`0x1${hex}`) ^ 0xFFFFFF).toString(16).substring(1)
    }

    return (
        <div className='tab-body'>
            <div className='user-top'>
                <div className='user-info'>
                    <div className='user-img box' style={{backgroundColor: color, color: contrast}} onClick={handleClick}>Profile Image</div>
                    <div className='user-detail'>
                        <div className='user-label'>Name:</div>
                        <div className='user-text'>{`${user.first} ${user.last}`}</div>
                        <i className='material-icons user-icon'>edit</i>
                    </div>
                    <div className='user-detail'>
                        <div className='user-label'>Email:</div>
                        <div className='user-text'>{user.email}</div>
                    </div>
                </div>
                <div className='user-budget'>Budget</div>
            </div>
        </div>
    )
}

export default UserPage
