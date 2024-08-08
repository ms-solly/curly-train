import React from 'react';
import Avatar from '../../public/download.png'
import Avatar2 from '../../public/next.svg'

import Image from 'next/image';

const HeroImgs = () => {
    return (
        <div className='grid-col-masonry grid-row-masonry grid grid-cols-2 gap-4 md:grid-cols-4 '>
            <Image src={Avatar} alt={''} className='h-auto max-w-full rounded-lg'/>
            <Image src={Avatar2} alt={''} className='h-auto max-w-full rounded-lg'/>
            <Image src={Avatar2} alt={''} className='h-auto max-w-full rounded-lg'/> <Image src={Avatar} alt={''} className='h-auto max-w-full rounded-lg'/>
            <Image src={Avatar2} alt={''} className='h-auto max-w-full rounded-lg'/>
            <Image src={Avatar} alt={''} className='h-auto max-w-full rounded-lg'/>
            <Image src={Avatar2} alt={''} className='h-auto max-w-full rounded-lg'/>
            <Image src={Avatar2} alt={''} className='h-auto max-w-full rounded-lg'/> <Image src={Avatar} alt={''} className='h-auto max-w-full rounded-lg'/>
            <Image src={Avatar2} alt={''} className='h-auto max-w-full rounded-lg'/> <Image src={Avatar} alt={''} className='h-auto max-w-full rounded-lg'/>
            <Image src={Avatar2} alt={''} className='h-auto max-w-full rounded-lg'/>
            <Image src={Avatar2} alt={''} className='h-auto max-w-full rounded-lg'/> <Image src={Avatar} alt={''} className='h-auto max-w-full rounded-lg'/>
            <Image src={Avatar2} alt={''} className='h-auto max-w-full rounded-lg'/>
        </div>
    );
};

export default HeroImgs;