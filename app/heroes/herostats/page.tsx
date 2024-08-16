"use client";

import React, { useState, useEffect } from 'react';
import config from '@/src/config';
import action from '@/src/actions/action';

const getHeroStats = async (params: {} | undefined) =>
    action('heroStats', config.API_HOST, 'api/heroStats', params);

const HeroesPage: React.FC = () => {
    const [heroStats, setHeroStats] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const heroStatsData = await getHeroStats({});
                if ('payload' in heroStatsData) {
                    setHeroStats(heroStatsData.payload);
                } else {
                    console.error("Error fetching data:", heroStatsData.error);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // Pagination logic
    const indexOfLastHero = currentPage * itemsPerPage;
    const indexOfFirstHero = indexOfLastHero - itemsPerPage;
    const currentHeroes = heroStats.slice(indexOfFirstHero, indexOfLastHero);

    const totalPages = Math.ceil(heroStats.length / itemsPerPage);
    const pageNumbers: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const handleNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
    const handlePrevious = () => setCurrentPage(prev => Math.max(prev - 1, 1));

    const getVisiblePages = () => {
        const maxVisiblePages = 5;
        const halfVisible = Math.floor(maxVisiblePages / 2);

        if (totalPages <= maxVisiblePages) {
            return pageNumbers;
        }

        if (currentPage <= halfVisible) {
            return pageNumbers.slice(0, maxVisiblePages);
        }

        if (currentPage + halfVisible >= totalPages) {
            return pageNumbers.slice(totalPages - maxVisiblePages);
        }

        return pageNumbers.slice(currentPage - halfVisible - 1, currentPage + halfVisible);
    };

    return (
        <div className="p-4">
            <h1 className="text-4xl text-center font-bold mb-4 font-rubik">Hero Stats</h1>
            {heroStats.length > 0 ? (
                <div className="max-w-full overflow-x-auto">
                    <div className="relative">
                        <table className="min-w-full text-white rounded-lg overflow-hidden shadow-md backdrop-blur-sm bg-white/10 p-4 border border-gray-200">
                            <thead className="bg-sky-700 border-b border-gray-200 font-bold hover:border-x-cyan-500">
                                <tr>
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
                        </table>
                        <div className="max-h-96 overflow-auto">
                            <table className="min-w-full text-white rounded-lg overflow-hidden shadow-md backdrop-blur-sm bg-white/10 p-4 border border-gray-200">
                                <tbody>
                                    {currentHeroes.map((hero: any) => (
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
                    </div>
                    <Pagination
                        itemsPerPage={itemsPerPage}
                        totalItems={heroStats.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                </div>
            ) : (
                <p>Loading hero stats...</p>
            )}
        </div>
    );
};

interface PaginationProps {
    itemsPerPage: number;
    totalItems: number;
    paginate: (pageNumber: number) => void;
    currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="flex justify-center mt-4">
            <ul className="flex items-center space-x-2">
                {currentPage > 1 && (
                    <li>
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Previous
                        </button>
                    </li>
                )}
                {pageNumbers.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length)).map(number => (
                    <li key={number}>
                        <button
                            onClick={() => paginate(number)}
                            className={`px-4 py-2 ${number === currentPage ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white'} rounded hover:bg-blue-600`}
                        >
                            {number}
                        </button>
                    </li>
                ))}
                {currentPage < totalPages && (
                    <li>
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Next
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default HeroesPage;
