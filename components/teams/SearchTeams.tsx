import React from 'react';
// import {FaSearch} from 'react-icons/fa'

const heroesNames= ()=>{

}
const SearhTeamsInp = () => {
    return (
        <div className='flex justify-center m-5 mb-10'>
            {/* <FaSearch className=' inline-block m-2 mt-3  justify-center'/> */}
            <input type="input" list='heroes' name="search" id="search" placeholder='Search heroes' className=' border-box w-2/3 rounded border-2 border-solid  p-2 outline-none focus:border-green-500  focus:transition-all lg:w-1/3 '/>
            <datalist id='heroes'>
                <option value="Gaimin Gladiators"></option>
                <option value="WBG.XG"></option>
                <option value="1WIN"></option>
                <option value="Team Liquid"></option>
            </datalist>
        </div>
    );
};

export default SearhTeamsInp;