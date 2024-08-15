"use client";
import React, { useState, useEffect } from 'react';
import config from '@/src/config';
import action from '@/src/actions/action';

interface HeroStats {
  id: number;
  localized_name: string;
  primary_attr: string;
  attack_type: string;
  roles: string[];
  base_health: number;
  base_mana: number;
  base_armor: number;
  base_attack_min: number;
  base_attack_max: number;
  base_str: number;
  base_agi: number;
  base_int: number;
}

interface ActionResponse {
  type: string;
  payload?: HeroStats[];
  error?: any;
}

const getHeroStats = async (params: {} | undefined): Promise<ActionResponse> =>
    action('heroStats', config.API_HOST, 'api/heroStats', params);

const HeroesPage: React.FC = () => {
    const [heroStats, setHeroStats] = useState<HeroStats[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const heroStatsData = await getHeroStats({});
                
                if (heroStatsData.payload) {
                    setHeroStats(heroStatsData.payload);
                } else {
                    setError("Failed to load hero stats.");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to load hero stats. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-4 bg-cover bg-center min-h-screen" style={{ backgroundImage: 'url(/_next/static/media/bg.720ca035.png)', backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
            <div className="p-4">
                <h1 className="text-4xl text-center font-bold mb-4 font-rubik">Hero Stats</h1>
                {loading ? (
                    <p>Loading hero stats...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <div className="max-h-96 overflow-y-auto">
                        <table className="min-w-full text-white rounded-lg overflow-hidden shadow-md backdrop-blur-sm bg-white/10 p-4 border border-gray-200">
                            <thead>
                                <tr className="bg-sky-700 border-b border-gray-200 font-bold hover:border-x-cyan-500">
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
                                {heroStats.map((hero) => (
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
                )}
            </div>
        </div>
    );
};

export default HeroesPage;
