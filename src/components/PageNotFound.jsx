import React from 'react'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-amber-50 px-6">
            <div className='px-6 w-fit flex justify-between items-center gap-5'>
                {/* Big 404 */}
                <h1 className="text-9xl font-extrabold text-amber-600 tracking-widest relative">404</h1>

                {/* Divider line */}
                <div className="bg-amber-600  text-white px-2 h-fit text-sm rounded ">
                    Page Not Found
                </div>

            </div>


            {/* Message */}
            <p className="mt-4 text-lg text-gray-600 text-center">
                Oops! The page you are looking for doesn't exist.
            </p>

            {/* Go Back button */}
            <button
                onClick={() => navigate('/')}
                className="mt-6 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
            >
                Go Back Home
            </button>
        </div>
    )
}

export default PageNotFound
