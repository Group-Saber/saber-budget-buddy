import React from 'react'

const UserPage = ({user}) => {
    return (
        <div className='tab-body'>
            <div className='user-info'>
                <p>First Name: {user.first}</p>
                <p>Last Name: {user.last}</p>
                <p>Email: {user.email}</p>
            </div>
            
        </div>
    )
}

export default UserPage
