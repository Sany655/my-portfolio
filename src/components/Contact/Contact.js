import React from 'react'

function Contact() {
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="flex flex-col">
                <h1 className="text-2xl text-center">Send Email</h1>
                <input className='p-2 border block my-2' placeholder='name' type="text" name="name" id="" />
                <input className='p-2 border block my-2' placeholder='email' type="email" name="email" id="" />
                <textarea className='p-2 border block my-2' placeholder='message' name="text" id=""></textarea>
                <button className="bg-green-600 text-white p-2 border">Send</button>
            </div>
        </div>
    )
}

export default Contact
