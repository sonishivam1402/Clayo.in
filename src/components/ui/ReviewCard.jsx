import React from 'react'

export const ReviewCard = () => {
    return (
        <div className='p-6 w-1/3 h-55 bg-white shadow-2xl border-2 border-amber-800 shadow-orange-100 rounded-2xl text-left shrink-0'>
            <div className='pb-2 w-full flex justify-between items-center text-amber-800 font-medium'>
                <div className='flex gap-4'>
                    <img src="vite.svg" alt="dp" />
                    <span>Shivam Soni</span>
                </div>
                <span>⭐5</span>
            </div>
            <p className='text-gray-500 italic'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis, nemo accusamus maxime, quaerat fuga et asperiores magni incidunt cum architecto aut similique, at voluptate voluptatibus adipisci voluptatum reiciendis numquam modi.</p>

        </div>
    )
}
