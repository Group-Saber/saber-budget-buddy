import React, { useState, useEffect} from 'react'

const UserPage = ({uid}) => {
    let [user, setUser] = useState({})

    useEffect(() => {
        let getUser = async () => {
            let response = await fetch(`http://127.0.0.1:8000/app/user/${uid}`)
            let data = await response.json()
            setUser(data)
        }
        
        getUser()
    }, [uid])

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
