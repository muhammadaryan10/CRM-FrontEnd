import React from 'react'
import UpdateProfile from '../../Components/UpdateProfile'
import CSR_SIdebar from '../../Components/CSR_SIdebar'

export default function EditProfileCSR() {
    return (
        <div>
            <div className='flex h-[100vh]'>
                <CSR_SIdebar />
                <div className='bg-white rounded-xl m-4 p-2 w-100 overflow-y-scroll'>
                    <UpdateProfile />
                </div>
            </div>
        </div>
    )
}
