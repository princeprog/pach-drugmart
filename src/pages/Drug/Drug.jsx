import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Drug() {
    const [drugs, setDrugs] = useState([]);
    const [recentlyViewed, setRecentlyViewed] = useState(() => {
        const storedRecentlyViewed = sessionStorage.getItem('recentlyViewed');
        return storedRecentlyViewed ? JSON.parse(storedRecentlyViewed) : [];
    });
    const [letter, setLetter] = useState('');
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

    const handleLetterClick = (letter) => {
        fetchDrugsByLetter(letter);
        setLetter(letter);
    };

    const handleDrugClick = (drug) => {
        navigate(`/drug/details/${drug.productId}`);
        setRecentlyViewed(prevState => {
            const updatedRecentlyViewed = [drug, ...prevState.filter(d => d.productId !== drug.productId)];
            sessionStorage.setItem('recentlyViewed', JSON.stringify(updatedRecentlyViewed.slice(0, 5)));
            return updatedRecentlyViewed.slice(0, 5);
        });
    };

    return (
        <div className="">
            <div className="border-b-2 flex justify-between items-center px-32 py-4 bg-[#EBD3F8] border-black/20">
                <div className="w-full flex flex-col justify-between h-[12rem]">
                    <h1 className="text-3xl font-bold">Drug Information</h1>
                    <div>
                        <input type="text" placeholder="Search by drug, brandname" className="border-1 w-[50%] h-[3rem] rounded-lg mt-4 px-4 border-gray-400" />
                        <div className="flex justify-around items-center mt-4 w-[60%] font-bold text-[#155C9C] text-sm">
                            {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
                                <p key={letter} className="hover:underline cursor-pointer" onClick={() => handleLetterClick(letter)}>{letter}</p>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="">
                    <img src="/images/cartoon.png" alt="pach" className="w-[20rem]" />
                </div>
            </div>
            <div className="px-32 py-8">
                <h1 className="text-xl font-medium">Recently viewed drugs</h1>
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
            <div className="px-32 py-8">
                <h1 className="text-xl font-medium">Drugs</h1>
                {drugs.length > 0 ? (
                    <ul>
                        <h1 className='text-3xl font-bold'>{letter}</h1>
                        {drugs.map(drug => (
                            <li key={drug.productId} className="cursor-pointer border-b-1 py-4 border-black/30 w-[40%] hover:text-[#32DBBE]" onClick={() => handleDrugClick(drug)}>
                                {drug.genericName} ({drug.brandName})
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