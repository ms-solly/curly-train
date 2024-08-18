"use client";
import React from 'react';
import Image from 'next/image';

interface Hero {
  id: number;
  localized_name: string;
  primary_attr: string;
  attack_type: string;
  roles: string[];
  img: string;
  icon: string;
  base_health: number;
  base_mana: number;
  base_armor: number;
  base_attack_min: number;
  base_attack_max: number;
  base_str: number;
  base_agi: number;
  base_int: number;
  move_speed: number;
  legs: number;
  turbo_picks: number;
  turbo_wins: number;
  pro_pick: number;
  pro_win: number;
  pro_ban: number;
}

const HeroProfilePage = async ({ params }: { params: { id: string } }) => {
  const heroId = params.id;

  const fetchHeroData = async (): Promise<Hero | null> => {
    try {
      const res = await fetch(`https://api.opendota.com/api/heroStats`);
      if (!res.ok) throw new Error('Failed to fetch hero data');
      const data = await res.json();
      return data.find((hero: Hero) => hero.id.toString() === heroId) || null;
    } catch (error) {
      console.error('Error fetching hero data:', error);
      return null;
    }
  };

  const hero = await fetchHeroData();

  if (!hero) {
    return <div>Error loading hero data</div>;
  }

  // Function to create the dynamic image URL
  const createImageUrl = (heroName: string) => {
    const formattedName = heroName.toLowerCase().replace(/ /g, '_');
    return `https://raw.githubusercontent.com/Ayub-Khan/Dota-2-Hero-Suggester/b268f093bdb53151fb0f7658694fdf7eac35b723/Icons/${formattedName}_vert.jpg`;
  };

  return (
    <div className="p-6 max-w-4xl mx-auto shadow-md rounded-lg overflow-hidden">
      <div className="flex items-start space-x-6 mb-6">
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold">{hero.localized_name}</h1>
            <p className="text-lg text-gray-700">Primary Attribute: {hero.primary_attr}</p>
            <p className="text-lg text-gray-700">Attack Type: {hero.attack_type}</p>
            <p className="text-lg text-gray-700">Roles: {hero.roles.join(', ')}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Hero Image */}
        <div className="col-span-1">
          <Image
            src={createImageUrl(hero.localized_name)}
            alt={hero.localized_name}
            width={400}
            height={225}
            className="rounded-lg"
          />
        </div>

        {/* Core Stats */}
        <div className="col-span-2 bg-gray-900 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Core Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><strong>Health:</strong> {hero.base_health}</div>
            <div><strong>Mana:</strong> {hero.base_mana}</div>
            <div><strong>Armor:</strong> {hero.base_armor}</div>
            <div><strong>Damage:</strong> {hero.base_attack_min} - {hero.base_attack_max}</div>
            <div><strong>Strength:</strong> {hero.base_str}</div>
            <div><strong>Agility:</strong> {hero.base_agi}</div>
            <div><strong>Intelligence:</strong> {hero.base_int}</div>
            <div><strong>Move Speed:</strong> {hero.move_speed}</div>
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="mt-6 bg-gray-900 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Additional Stats</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><strong>Legs:</strong> {hero.legs}</div>
          <div><strong>Turbo Picks:</strong> {hero.turbo_picks}</div>
          <div><strong>Turbo Wins:</strong> {hero.turbo_wins}</div>
          <div><strong>Pro Picks:</strong> {hero.pro_pick}</div>
          <div><strong>Pro Wins:</strong> {hero.pro_win}</div>
          <div><strong>Pro Bans:</strong> {hero.pro_ban}</div>
        </div>
      </div>
    </div>
  );
};

export default HeroProfilePage;
