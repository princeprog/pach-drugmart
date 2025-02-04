import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function DrugDetails() {
    const { productId } = useParams();
    const [formData, setFormData] = useState({
        genericName: "",
        brandName: "",
        dosage: "",
        description: "",
        image: "",
        price: "",
        quantity: "",
        group: "",
        classification: "OTC",
        categoryId: ""
    });

    const [quantity, setQuantity] = useState(1);
    const [imageUrl, setImageUrl] = useState("");

    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("userEmail");
        setIsLoggedIn(!!user);
    }, []);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8080/products/get/${productId}`);
                if (response.ok) {
                    const data = await response.json();
                    setFormData(data);
                } else {
                    throw new Error("Network response was not ok");
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        const fetchImage = async () => {
            try {
                const response = await fetch(`http://localhost:8080/products/getimage/${productId}`);
                if (response.ok) {
                    const imageBlob = await response.blob();
                    const imageObjectUrl = URL.createObjectURL(imageBlob);
                    setImageUrl(imageObjectUrl);
                } else {
                    throw new Error("Network response was not ok");
                }
            } catch (error) {
                console.error("Error fetching image:", error);
            }
        };

        fetchProduct();
        fetchImage();
    }, [productId]);

    return (
        <div className="container mx-auto p-6 flex ">
            <div className="w-[25%]">
                {imageUrl && <img src={imageUrl} alt={formData.brandName} className="w-[100%] mx-auto" />}
            </div>
            <div className=" w-1/2 p-4">
                <p className="text-gray-500 text-xl">{formData.genericName}</p>
                <h1 className="text-3xl font-montserrat">{formData.description}</h1>
                {isLoggedIn ? (
                    <p className="mt-8 font-roboto2">Selling for <span className="font-montserrat text-2xl">₱{Number(formData.price).toFixed(2)}</span></p>
                ):(
                    <p className="underline cursor-pointer font-montserrat text-gray-500 mt-4"
                        onClick={() => navigate("/login")}
                    >View price</p>
                )}
                {formData.quantity > 0 ? (
                    <p className="mt-4">In stock</p>
                ):(
                    <p>Out of stock</p>
                )}
                <div className="flex items-center">
                    <div className="flex items-center border w-[6rem] px-2 py-2 rounded border-gray-300 justify-between">
                        <p className="cursor-pointer text-3xl"
                            onClick={()=> setQuantity(quantity - 1)}
                        >-</p>
                        <p className="mx-4">{quantity}</p>
                        <p className="cursor-pointer text-2xl"
                            onClick={()=> setQuantity(quantity + 1)}
                        >+</p>
                    </div>
                    <button className="border w-[75%] ml-4 py-2 text-white bg-[#155C9C] flex-grow rounded text-lg cursor-pointer"
                        onClick={() => {
                            if (!isLoggedIn) {
                                navigate("/login");
                                return;
                            }
                        }}
                    >Add to cart</button>
                </div>
            </div>
        </div>
    );
}