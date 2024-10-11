import React, { useEffect, useState } from 'react'
import CompaniesTable from '../CompaniesTable/CompaniesTable'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function Companies() {
   
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // useEffect(()=>{
    //     dispatch(setSearchCompanyByText(input));
    // },[input]);
    return (
        <div className='min-h-[100vh]'>
            
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input
                        className="w-fit"
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button onClick={() => navigate("/admin/company/register")}>New Company</Button>
                </div>
                <CompaniesTable/>
            </div>
        </div>
    )
}

export default Companies