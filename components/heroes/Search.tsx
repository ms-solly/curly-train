import React from 'react';
// import {FaSearch} from 'react-icons/fa'

const heroesNames= ()=>{

}
const SearchInp = () => {
    return (
        <div className='flex justify-center m-5 '>
            {/* <FaSearch className=' inline-block m-2 mt-3  justify-center'/> */}
            <input type="input" list='heroes' name="search" id="search" placeholder='Search heroes' className=' border-box w-2/3 rounded border-2 border-solid  p-2 outline-none focus:border-green-500  focus:transition-all lg:w-1/3 '/>
            <datalist id='heroes'>
                <option value="Aaddon"></option>
                <option value="Alchemist"></option>
                <option value="Ancient Apparition"></option>
                <option value="Anti Mage"></option>
            </datalist>
        </div>
    );
};

export default SearchInp;