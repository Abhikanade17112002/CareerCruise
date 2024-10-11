import React, { useEffect, useState } from 'react'
import CompaniesTable from '../CompaniesTable/CompaniesTable'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';



function Companies() {
   const navigate = useNavigate();
   const [ searchParam , setSearchParam ] = useState("") ;


    return (
        <div className='min-h-[100vh]'>
            
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input
                    type="search"
                    value={searchParam}

                        className="w-fit"
                        placeholder="Filter by name"
                        onChange={(e) => setSearchParam(e.target.value)}
                    />
                    <Button onClick={() => navigate("/admin/company/register")}>New Company</Button>
                </div>
                <CompaniesTable   searchParam={searchParam}  setSearchParam={setSearchParam}/>
            </div>
        </div>
    )
}

export default Companies
