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
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    axios.get('https://api.opendota.com/api/heroStats')
      .then(response => {
        setHeroes(response.data);
        setLoading(false); // Data fetched, stop loading
      })
      .catch(error => {
        console.error('Error fetching hero stats:', error);
        setLoading(false); // Stop loading even if there is an error
      });
  }, []);

  useEffect(() => {
    setFilteredHeroes(
      heroes.filter(hero =>
        hero.localized_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, heroes]);

  // Function to create the dynamic image URL
  const createImageUrl = (heroName: string) => {
    const formattedName = heroName.toLowerCase().replace(/ /g, '_');
    return `https://raw.githubusercontent.com/Ayub-Khan/Dota-2-Hero-Suggester/b268f093bdb53151fb0f7658694fdf7eac35b723/Icons/${formattedName}_vert.jpg`;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Dota 2 Heroes</h1>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="text-center flex-col justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
            <p className="text-2xl font-semibold">Loading heroes...</p>
          </div>
        </div>
      ) : (
        <>
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
                    src={createImageUrl(hero.localized_name)}
                    alt={hero.localized_name}  
                    width={300}  // Increased width
                    height={450} // Increased height
                    layout="responsive" // Ensures the image maintains its aspect ratio
                    objectFit="cover" // Ensures the image covers the entire container without distortion
                    quality={50} // Adjust image quality for faster loading
                    priority={false} // Defer loading of non-critical images
                    className="rounded-lg"
                  />
                  <div className="absolute inset-0 flex items-end justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity pb-10 rounded">
                    <span className="text-white text-2xl font-semibold">{hero.localized_name}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Heroes;
