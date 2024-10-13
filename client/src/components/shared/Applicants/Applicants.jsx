import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ApplicantsTable from '../ApplicantsTable/ApplicantsTable';




function Applicants() {
   const navigate = useNavigate();
   const [ searchParam , setSearchParam ] = useState("") ;


    return (
        <div className='min-h-[100vh] px-4'>
            
            <div className='max-w-7xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input
                    type="search"
                    value={searchParam}

                        className="w-fit text-[10px] sm:text-sm"
                        placeholder="Filter by name"
                        onChange={(e) => setSearchParam(e.target.value)}
                    />
                   
                </div>
                <ApplicantsTable   searchParam={searchParam}  setSearchParam={setSearchParam}/>
            </div>
        </div>
    )
}

export default Applicants ;
