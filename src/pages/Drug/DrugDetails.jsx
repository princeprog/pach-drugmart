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
    const [imageUrl, setImageUrl] = useState("");

    const navigate = useNavigate();

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
        <div className="container mx-auto p-6">
            <button className="text-blue-600 hover:underline mb-4" onClick={() => navigate(-1)}>Return</button>
            <div className="bg-[#F5F5F5] shadow-md rounded-lg p-6">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/6">
                        {imageUrl && <img src={imageUrl} alt={formData.genericName} className="rounded-lg shadow-md" />}
                    </div>
                    <div className="md:w-2/3 md:pl-6 mt-4 md:mt-0 flex flex-col justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">{formData.description}</h1>
                            <p className="text-gray-600 mb-2"><span className="font-semibold">Brand Name:</span> {formData.brandName}</p>
                            <div>
                                <p className="text-gray-600 mb-2">Php <span className="font-semibold underline cursor-pointer">View price</span></p>
                            </div>
                        </div>
                        <button className="border-1 cursor-pointer w-[12rem] py-2 rounded-3xl mb-8 text-white font-medium bg-[#155C9C]">Order</button>
                    </div>
                </div>
            </div>
        </div>
    );
}