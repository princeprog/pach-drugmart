import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ViewDrugs() {
    const [drugs, setDrugs] = useState([]);
    const [filteredDrugs, setFilteredDrugs] = useState([]);
    const [filter, setFilter] = useState("all");
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("userEmail");
        setIsLoggedIn(!!user);
    }, []);

    useEffect(() => {
        const fetchDrugs = async () => {
            try {
                const response = await fetch(`http://localhost:8080/products/getall`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setDrugs(data);
                    setFilteredDrugs(data);
                } else {
                    throw new Error("Network response was not ok");
                }
            } catch (error) {
                console.error("Error fetching drugs:", error);
            }
        };
        fetchDrugs();
    }, []);

    const handleFilterChange = (e) => {
        const selectedFilter = e.target.value;
        setFilter(selectedFilter);

        if (selectedFilter === "all") {
            setFilteredDrugs(drugs);
        } else {
            const filtered = drugs.filter(drug => drug.classification.toLowerCase() === selectedFilter);
            setFilteredDrugs(filtered);
        }
    };

    return (
        <div>
            <div className="border-1 mx-16 py-2 mt-4 px-4 border-gray-400">
                <select
                    className="border-1 w-1/4 h-10 border-gray-400 p-2"
                    value={filter}
                    onChange={handleFilterChange}
                >
                    <option value="all">All</option>
                    <option value="otc">Over-the-Counter</option>
                    <option value="rx">Prescription</option>
                </select>
            </div>
            <div className="grid grid-cols-4 gap-3 mx-16 mt-4 border-gray-300 content-center justify-items-center">
                {filteredDrugs.map((drug) => (
                    <div key={drug.productId} className="border flex flex-col items-center w-[80%] border-gray-300 p-4">
                        <img
                            src={`http://localhost:8080/products/getimage/${drug.productId}`}
                            alt={drug.description}
                            className="w-full mb-4"
                        />
                        <h4 className="font-roboto text-gray-500 hover:text-[#32DBBE] cursor-pointer"
                            onClick={() => navigate(`/drug/details/${drug.productId}`)}
                        >
                            {drug.description}
                        </h4>
                        {isLoggedIn ? (
                            <p>Php <span className="font-montserrat2 text-gray-500">{drug.price.toFixed(2)}</span></p>
                        ) : (
                            <p>Php <span className="font-montserrat2 hover:underline cursor-pointer text-gray-500"
                                onClick={()=>navigate("/login")}
                            >View price</span></p>
                        )}
                        {drug.quantity > 0 ? (
                            <p className="text-green-500 text-sm">In Stock</p>
                        ) : (
                            <p className="text-red-500 text-sm">Out of Stock</p>
                        )}
                        <button className="border px-5 py-1 my-2 rounded-lg text-white bg-[#155C9C] cursor-pointer">Buy Now</button>
                    </div>
                ))}
            </div>
        </div>
    );
}