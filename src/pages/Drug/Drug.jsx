import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Drug() {
    const [drugs, setDrugs] = useState([]);
    const [recentlyViewed, setRecentlyViewed] = useState(() => {
        const storedRecentlyViewed = sessionStorage.getItem('recentlyViewed');
        return storedRecentlyViewed ? JSON.parse(storedRecentlyViewed) : [];
    });
    const [letter, setLetter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const fetchDrugsByLetter = async (letter) => {
        try {
            const response = await fetch(`http://localhost:8080/products/getbystartingletter/${letter}`);
            if (response.ok) {
                const data = await response.json();
                setDrugs(data);
            } else {
                throw new Error("Network response was not ok");
            }
        } catch (error) {
            console.error("Error fetching drugs:", error);
        }
    };

    const fetchDrugsBySearchTerm = async (searchTerm) => {
        try {
            const response = await fetch(`http://localhost:8080/products/search?searchTerm=${searchTerm}`);
            if (response.ok) {
                const data = await response.json();
                setDrugs(data);
            } else {
                throw new Error("Network response was not ok");
            }
        } catch (error) {
            console.error("Error fetching drugs:", error);
        }
    };

    const handleLetterClick = (letter) => {
        fetchDrugsByLetter(letter);
        setLetter(letter);
        setSearchQuery(''); // Clear the search query
    };

    const handleDrugClick = (drug) => {
        navigate(`/drug/details/${drug.productId}`);
        setRecentlyViewed(prevState => {
            const updatedRecentlyViewed = [drug, ...prevState.filter(d => d.productId !== drug.productId)];
            sessionStorage.setItem('recentlyViewed', JSON.stringify(updatedRecentlyViewed.slice(0, 5)));
            return updatedRecentlyViewed.slice(0, 5);
        });
    };

    const handleSearchChange = (event) => {
        const searchTerm = event.target.value;
        setSearchQuery(searchTerm);
        fetchDrugsBySearchTerm(searchTerm);
        setLetter('')
    };

    const highlightText = (text, highlight) => {
        if (!highlight.trim()) {
            return text;
        }
        const regex = new RegExp(`(${highlight})`, 'gi');
        return text.split(regex).map((part, index) =>
            regex.test(part) ? <span key={index} className="bg-yellow-300">{part}</span> : part
        );
    };

    return (
        <div className="">
            <div className="border-b-2 flex flex-col md:flex-row justify-between items-center px-4 md:px-32 py-4 bg-[#EBD3F8] border-black/20">
                <div className="w-full flex flex-col justify-between h-auto md:h-[12rem]">
                    <h1 className="text-2xl md:text-3xl font-bold">Drug Information</h1>
                    <p className='font-roboto text-[#155C9C] cursor-pointer hover:underline'
                        onClick={() => navigate('/drug/view')}
                    >View Drugs</p>
                    <div>
                        <input
                            type="text"
                            placeholder="Search by drug, brandname"
                            className="border-1 w-full md:w-[50%] h-[3rem] rounded-lg mt-4 px-4 border-gray-400"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <div className="flex flex-wrap justify-around items-center mt-4 w-full md:w-[60%] font-bold text-[#155C9C] text-sm">
                            {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
                                <p key={letter} className="hover:underline cursor-pointer" onClick={() => handleLetterClick(letter)}>{letter}</p>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-4 md:mt-0">
                    <img src="/images/cartoon.png" alt="pach" className="w-[10rem] md:w-[20rem]" />
                </div>
            </div>
            <div className="px-4 md:px-32 py-8">
                <h1 className="text-lg md:text-xl font-medium">Recently viewed drugs</h1>
                {recentlyViewed.length > 0 ? (
                    <ul>
                        {recentlyViewed.map(drug => (
                            <li key={drug.productId} className="opacity-50">{drug.genericName} ({drug.brandName})</li>
                        ))}
                    </ul>
                ) : (
                    <p className="opacity-50">No recently viewed</p>
                )}
            </div>
            <div className="px-4 md:px-32 py-8">
                <h1 className="text-lg md:text-xl font-medium">Drugs</h1>
                {searchQuery && <h2 className='text-xl md:text-2xl font-medium'>Search results for: "{searchQuery}"</h2>}
                {drugs.length > 0 ? (
                    <ul>
                        <h1 className='text-2xl md:text-3xl font-bold'>{letter}</h1>
                        {drugs.map(drug => (
                            <li key={drug.productId} className="cursor-pointer border-b-1 py-4 border-black/30 w-full md:w-[40%] hover:text-[#32DBBE]" onClick={() => handleDrugClick(drug)}>
                                {highlightText(drug.genericName, searchQuery)} ({highlightText(drug.brandName, searchQuery)})
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="opacity-50">No drugs found</p>
                )}
            </div>
        </div>
    );
}