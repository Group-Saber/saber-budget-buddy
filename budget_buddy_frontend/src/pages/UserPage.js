import React, { useEffect, useState } from 'react'

const UserPage = ({user}) => {
    let [color, setColor] = useState('')

    useEffect(() => {
        handleClick()
    }, [user])

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
            <div className='user-top'>
                <div className='user-info'>
                    <div className='user-img box' style={{backgroundColor: color}} onClick={handleClick}>Profile Image</div>
                    <div className='user-detail'>
                        <div className='user-label'>Name:</div>
                        <div className='user-text'>{`${user.first} ${user.last}`}</div>
                        <i className='material-icons user-icon'>edit</i>
                    </div>
                    <div className='user-detail'>
                        <div className='user-label'>Email:</div>
                        <div className='user-text'>{user.email}</div>
                    </div>
                    <i className='material-icons user-icon'>dark_mode</i>
                    <i className='material-icons user-icon'>light_mode</i>
                </div>
                <div className='user-budget'>Budget</div>
            </div>
        </div>
    )
}

export default UserPage
