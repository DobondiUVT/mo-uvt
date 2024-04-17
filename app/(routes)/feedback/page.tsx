"use client";

import { submitFeedback } from '@/actions/extra';
import InputTextArea from '@/components/Admin/Form/utils/InputTextArea'
import { Button, buttonVariants } from '@/components/ui/button';
import prisma from '@/utilities/db';
import Link from 'next/link';
import React, { useState } from 'react'

const Feedback = () => {
    const [feedBack, setFeedBack] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const submitForm = async () => {
        const { response, errored } = await submitFeedback(feedBack);
        if (errored) {
            console.error(response)
            return
        }
        setSubmitted(true)
    }

    return (
        <section className="overflow-y-hidden bg-gray-100 py-8 lg:py-14">
            <div className="w-full px-4">
                {submitted ? (
                    <>
                        <h1 className='text-xl mb-2 font-bold text-green-600'>Thank you for your feedback!</h1>
                        <p className="text-gray-500 mb-4">We appreciate your feedback and will use it to improve this app.</p>
                        <Link href={'/'} className={buttonVariants({ variant: 'default' })}>
                            Go home
                        </Link>
                    </>
                ) : (
                    <>
                        <h1 className='text-xl mb-1 font-bold'>Let us know about your experience with MO-UVT</h1>
                        <div className='text-md mb-4'>Don't worry, your feedback is anonymised.</div>
                        <div className="mb-4">
                            <textarea
                                className="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 text-zinc-900 ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-400 sm:text-sm sm:leading-6"
                                rows={6}
                                value={feedBack}
                                onChange={(e) => setFeedBack(e.target.value)}
                                placeholder="Type your feedback here"
                                id='feedback'
                                name='feedback'
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button onClick={submitForm} disabled={!feedBack.length}>Send</Button>
                        </div>
                    </>
                )}
            </div>
        </section>
    )
}

export default Feedback