"use client"

import Header from '@/components/Header';
import SearhTeamsInp from '@/components/teams/SearchTeams';
import TeamsCard from '@/components/teams/TeamsCard';
import React from 'react';

const Teamspg = () => {
    return (
        <div>
            <SearhTeamsInp/>
            <TeamsCard/>
            <TeamsCard/>
            <TeamsCard/>
            <TeamsCard/>
        </div>
    );
};

export default Teamspg;