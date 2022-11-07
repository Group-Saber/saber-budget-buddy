import React, { useState } from 'react'

const UserPage = ({user}) => {
    let [color, setColor] = useState('#222222')

    let handleClick = () => {
        const hex = '0123456789abcdef'
        let newColor = '#'

        for(let i = 0; i < 6; i++) {
            newColor += hex.charAt(Math.floor(Math.random() * hex.length))
        }

        console.log(newColor)
        setColor(newColor)
    }

    return (
        <div className='tab-body'>
            <div className='user-info'>
                <div className='user-detail'>
                    <div className='user-label'>Email:</div>
                    <div className='user-text'>{user.email}</div>
                </div>
                <div className='user-detail'>
                    <div className='user-label'>First Name:</div>
                    <div className='user-text'>{user.first}</div>
                    <div className='user-icon'><i className='material-icons'>edit</i></div>
                </div>
                <div className='user-detail'>
                    <div className='user-label'>Last Name:</div>
                    <div className='user-text'>{user.last}</div>
                    <div className='user-icon'><i className='material-icons'>edit</i></div>
                </div>
            </div>
            <div className='box' style={{backgroundColor: color}} onClick={handleClick}>{color}</div>
        </div>
    )
}

export default UserPage
