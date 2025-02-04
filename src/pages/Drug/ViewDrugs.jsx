import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ViewDrugs() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filters, setFilters] = useState({
        prescription: false,
        otc: false,
    });

    useEffect(() => {
        const user = localStorage.getItem("userEmail");
        setIsLoggedIn(!!user);
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:8080/products/getall", {
                    method: "GET",
                });
                const data = await response.json();
                console.log(data);
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        filterProducts();
    }, [filters]);

    const handleFilterChange = (e) => {
        const { name, checked } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: checked,
        }));
    };

    const filterProducts = () => {
        let filtered = products;

        if (filters.prescription && !filters.otc) {
            filtered = products.filter((product) => product.classification.toLowerCase() === "rx");
        } else if (!filters.prescription && filters.otc) {
            filtered = products.filter((product) => product.classification.toLowerCase() === "otc");
        } else if (filters.prescription && filters.otc) {
            filtered = products.filter(
                (product) => product.classification.toLowerCase() === "rx" || product.classification.toLowerCase() === "otc"
            );
        }

        setFilteredProducts(filtered);
    };

    return (
        <div className="container flex">
            <div className="sidebar w-[20%] border-r-1 px-4 py-2 border-gray-300 h-screen">
                <div className="border-b-1 pb-4 border-gray-300">
                    <h1 className="font-roboto">Drug Classification</h1>
                    <div className="flex items-center mt-4">
                        <input
                            type="checkbox"
                            className="mr-2 w-4 h-4 opacity-50"
                            name="prescription"
                            checked={filters.prescription}
                            onChange={handleFilterChange}
                        />
                        <label className="font-roboto2">Prescription (Rx)</label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            className="mr-2 w-4 h-4 opacity-50"
                            name="otc"
                            checked={filters.otc}
                            onChange={handleFilterChange}
                        />
                        <label className="font-roboto2">OTC / Over-The-Counter</label>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4 w-[80%] p-4">
                {filteredProducts.map((product) => (
                    <div key={product.productId} className="border border-gray-200 flex flex-col">
                        <img
                            src={`http://localhost:8080/products/getimage/${product.productId}`}
                            alt={product.productName}
                            className="object-cover w-[100%]"
                        />
                        <h1 className="ml-4 font-roboto text-gray-500 hover:text-[#155C9C] cursor-pointer"
                            onClick={() => navigate(`/drug/details/${product.productId}`)}
                        >{product.description}</h1>
                        {product.quantity > 0 ? (
                            <p className="text-sm text-green-500 ml-4">In stock</p>
                        ) : (
                            <p className="text-sm text-red-500">Out of stock</p>
                        )}
                        {isLoggedIn ? (
                            <p className="ml-4 mt-4 font-roboto "><span>₱</span>{Number(product.price).toFixed(2)}</p>
                        ) : (
                            <p className="ml-4 mt-8 font-roboto underline text-gray-500 cursor-pointer underline">View price</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}