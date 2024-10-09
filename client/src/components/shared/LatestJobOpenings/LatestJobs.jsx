import React from 'react'
import LatestJobCards from './LatestJobsCards';
import {  useSelector } from 'react-redux';
import { getAllJobs } from '@/store/jobSlice/jobSlice';

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
    const allJobs = useSelector(getAllJobs) ;
    console.log('====================================');
    console.log(allJobs);
    console.log('====================================');

   
    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top </span> Job Openings</h1>
            <div className='grid grid-cols-3 gap-4 my-5'>
                {
                    randomJobs.length <= 0 ? <span>No Job Available</span> : randomJobs?.slice(0,6).map((job,index) => <LatestJobCards key={allJobs[0]?._id} job={allJobs[0]}/>)
                }
            </div>
        </div>
    )
}

export default LatestJobs