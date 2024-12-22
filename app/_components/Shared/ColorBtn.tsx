import React from 'react';
interface ColorBtnProps {
    data: any;
    setState: any;
    selectAction: any;
    statePath:any;
}

const ColorBtn = ({data,setState,statePath,selectAction}:ColorBtnProps) => {
    // const data = Array.from({ length: 10 }, (_, i) => i + 1);
    return (
        <div className='flex flex-wrap gap-2 items-center'>
            {data?.map((item:any, index:number) => (
                <button type='button' onClick={()=>{
                    // handleSelectedColor(item)
                }} style={{ backgroundColor: item?.color }} key={index} className={`py-1 text-10 px-2 rounded-md flex items-center gap-2`}>
                    {item?.name}
                </button>
            ))}
        </div>
    );
};

export default ColorBtn;