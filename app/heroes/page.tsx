"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';

interface Hero {
  id: number;
  localized_name: string;
  img: string;
}

const Heroes: React.FC = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredHeroes, setFilteredHeroes] = useState<Hero[]>([]);

  useEffect(() => {
    axios.get('https://api.opendota.com/api/heroStats')
      .then(response => {
        setHeroes(response.data);
      })
      .catch(error => {
        console.error('Error fetching hero stats:', error);
      });
  }, []);

  useEffect(() => {
    setFilteredHeroes(
      heroes.filter(hero =>
        hero.localized_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, heroes]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Dota 2 Heroes</h1>
      
      <div className="mb-8">
        <input 
          type="text" 
          placeholder="Search heroes..." 
          className="w-full p-2 rounded-lg border border-gray-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredHeroes.map(hero => (
          <Link key={hero.id} href={`/heroes/${hero.id}`}>
            <div className="relative group cursor-pointer rounded">
              <Image 
                src={`https://api.opendota.com${hero.img}`} 
                alt={hero.localized_name}  
                width={40} 
                height={40}
                className="rounded-lg w-full h-auto"
              />
              <div className="absolute inset-0 flex items-end justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity pb-10 rounded">
                <span className="text-white text-xl font-semibold">{hero.localized_name}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Heroes;
