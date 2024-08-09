import Image from 'next/image';
import React from 'react';

const PlayerCard= ()=>{
    return(
        <>
        <figure>
            <Image src='' alt='' height="40" width='40'/>
            <figcaption>Player&apos;s Name
            </figcaption>
        </figure>              
        </>                
    )
}

const TeamsCard = () => {
    return (
        <>
        
        <div className='w-full bg-gray-700 bg-gradient-to-r from-stone-950 to-gray-900 '>
            
                        <div className='flex h-56 w-full  self-center hover:bg-white/10 p-5 shadow-lg backdrop-blur-lg  '>
                
                <div className='w-1/4 bg-gray-800 border-2 rounded '>
                <div>
                    <div className='border-2 border-gray-400 rounded h-24 grid place-items-center '>
                    <figure>
                    
                    <Image src='' alt='' height="40" width='40' className=''/>
                            <figcaption>Team&apos;s Logo
                            </figcaption>
                    </figure>
                    </div>
                    </div>
                    <h1 className='text-center bottom-0 text-2xl h-1/2 bg-gray-900  '>Team&apos;s Name</h1>
                </div>
                <div className='w-2/3 ml-4 '>
                    <div className='text-center m-2 '>
                        <h4 className='bg-gray-900 rounded p-2 '>Players</h4>
                    <div className='grid grid-cols-5 gap-4  my-2 right
                    '>
                        <div className=''>
                            <PlayerCard/>
                        </div>
                        <div className=''>
                        <PlayerCard/>
                        </div>
                        <div className=''>
                        <PlayerCard/>
                        </div>
                        <div className=''>
                        <PlayerCard/>
                        </div>
                        <div className=''>
                            <PlayerCard/>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <hr />



        </div>
        </>
    );
};

export default TeamsCard;