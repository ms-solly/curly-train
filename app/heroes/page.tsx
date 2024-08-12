"use client"


import Header from '@/components/Header';
import HeroImgs from '@/components/heroes/HeroImgs';
import SearchInp from '@/components/heroes/SearchHeroes';
import React from 'react';

const HeroesPg = () => {
    return (
        <>
        <SearchInp/>
        <HeroImgs/>
        </>
    );
};

export default HeroesPg;