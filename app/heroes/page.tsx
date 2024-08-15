"use client";
import React, { useState, useEffect } from 'react';
import config from '@/src/config';
import action from '@/src/actions/action';

const getHeroStats = async (params: {} | undefined) => 
    action('heroStats', config.API_HOST, 'api/heroStats', params);

const HeroesPage: React.FC = () => {
    const [heroStats, setHeroStats] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const heroStatsData = await getHeroStats({});
                setHeroStats(heroStatsData.payload);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-4 bg-cover bg-center min-h-screen" style={{ backgroundImage: 'url(/_next/static/media/bg.720ca035.png)', backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
        <div className="p-4">
            
            <h1 className="text-4xl text-center font-bold mb-4 font-rubik">Hero Stats</h1>
            {heroStats.length > 0 ? (
                <div className="max-h-96 overflow-y-auto">
                <table className="min-w-full text-white rounded-lg overflow-hidden shadow-md backdrop-blur-sm bg-white/10 p-4 border border-gray-200">
                    <thead>
                        <tr className="bg-sky-700 border-b border-gray-200  font-bold hover:border-x-cyan-500" >
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Primary Attribute</th>
                            <th className="px-4 py-2 text-left">Attack Type</th>
                            <th className="px-4 py-2 text-left">Roles</th>
                            <th className="px-4 py-2 text-left">Base Health</th>
                            <th className="px-4 py-2 text-left">Base Mana</th>
                            <th className="px-4 py-2 text-left">Base Armor</th>
                            <th className="px-4 py-2 text-left">Base Attack</th>
                            <th className="px-4 py-2 text-left">Base Strength</th>
                            <th className="px-4 py-2 text-left">Base Agility</th>
                            <th className="px-4 py-2 text-left">Base Intelligence</th>
                        </tr>
                    </thead>
                    <tbody>
                        {heroStats.map((hero: any) => (
                            <tr key={hero.id} className="border-b border-gray-200">
                                <td className="px-4 py-2 font-rubik text-sky-200 text-md font-bold bg-gradient-to-b bg-white/15">{hero.localized_name}</td>
                                <td className="px-4 py-2 text-white font-rubik">{hero.primary_attr}</td>
                                <td className="px-4 py-2 text-white font-rubik bg-white/15">{hero.attack_type}</td>
                                <td className="px-4 py-2 text-white font-rubik">{hero.roles.join(', ')}</td>
                                <td className="px-4 py-2 text-white font-rubik bg-white/15">{hero.base_health}</td>
                                <td className="px-4 py-2 text-white font-rubik">{hero.base_mana}</td>
                                <td className="px-4 py-2 text-white font-rubik bg-white/15">{hero.base_armor}</td>
                                <td className="px-4 py-2 text-white font-rubik">{hero.base_attack_min} - {hero.base_attack_max}</td>
                                <td className="px-4 py-2 text-white font-rubik bg-white/15">{hero.base_str}</td>
                                <td className="px-4 py-2 text-white font-rubik">{hero.base_agi}</td>
                                <td className="px-4 py-2 text-white font-rubik bg-white/15">{hero.base_int}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            ) : (
                <p>Loading hero stats...</p>
            )}
        </div>
        </div>
        
    );
};

export default HeroesPage;

