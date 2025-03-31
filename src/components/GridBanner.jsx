import React from 'react';

export const GridBanner = () => {
  return (
    <div className="w-screen h-100 sm:h-300 grid grid-cols-3 grid-rows-4 gap-2 py-3" id='style'>
      {/* Ensure each div is structured properly in grid */}
      <div className="col-span-1 row-span-2 flex">
        <img src="m1.png" className="w-full h-full object-cover" />
      </div>
      <div className="col-span-2 row-span-2 flex">
        <img src="m3.png" className="w-full h-full object-cover" />
      </div>
      <div className="col-span-1 row-span-2 flex">
        <img src="m2.png" className="w-full h-full object-cover" />
      </div>
      <div className="col-span-1 row-span-2 flex">
        <img src="m4.png" className="w-full h-full object-cover" />
      </div>
      <div className="col-span-1 row-span-2 flex">
        <img src="m5.png" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};
