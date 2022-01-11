import React from 'react'
import { useForm, ValidationError } from '@formspree/react';

function Contact() {
    const [state, handleSubmit] = useForm("mayvnrvv");

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl text-center">Send Email</h1>
                {
                    state.succeeded ? (
                        <div className="bg-green-500 text-center text-white text-md p-2 rounded">
                            <p>Email has sent successfully!</p>
                        </div>
                    ) : ''
                }
                <form onSubmit={handleSubmit}>
                    <input
                        className='p-2 border block my-2'
                        placeholder='Full name'
                        type="text"
                        name="name"
                        required
                    />
                    <ValidationError
                        prefix="Full Name"
                        field="name"
                        errors={state.errors}
                    />

                    <input
                        className='p-2 border block my-2'
                        placeholder='Email'
                        type="email"
                        name="email"
                        required
                    />
                    <ValidationError
                        prefix="Email"
                        field="email"
                        errors={state.errors}
                    />

                    <input
                        className='p-2 border block my-2'
                        placeholder='Subject'
                        type="text"
                        name="subject"
                        required
                    />
                    <ValidationError
                        prefix="Subject"
                        field="subject"
                        errors={state.errors}
                    />

                    <textarea
                        className='p-2 border block my-2'
                        placeholder='Message'
                        name="message"
                        required
                    ></textarea>
                    <ValidationError
                        prefix="Message"
                        field="message"
                        errors={state.errors}
                    />

                    <button
                        className="bg-green-600 text-white p-2 border"
                        type="submit"
                        disabled={state.submitting}
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Contact
