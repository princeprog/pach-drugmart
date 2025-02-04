import { useState, useEffect } from "react";

export default function AddProduct({ setShowAddProduct, setProductModal }) {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        genericName: "",
        brandName: "",
        dosage: "",
        description: "",
        image: null,
        price: "",
        quantity: "",
        group: "",
        classification: "OTC",
        categoryId: ""
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:8080/categories");
                
                if(response.ok) {
                    const data = await response.json();
                    const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
                    setCategories(sortedData);
                    console.log("Categories:", sortedData);
                } else {
                    throw new Error("Network response was not ok");
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        }

        fetchCategories();
    },[])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCategoryChange = (e) => {
        const { value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            categoryId: value
        }));
    };

    const handleImageChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            image: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('genericName', formData.genericName);
        formDataToSend.append('brandName', formData.brandName);
        formDataToSend.append('dosage', formData.dosage);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('image', formData.image);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('quantity', formData.quantity);
        formDataToSend.append('group', formData.group);
        formDataToSend.append('classification', formData.classification);
        formDataToSend.append('categoryId', formData.categoryId);

        fetch("http://localhost:8080/products/save", {
            method: "POST",
            body: formDataToSend
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("Product saved:", data);
            setShowAddProduct(false);
            setProductModal(true);
        })
        .catch(error => console.error("Error saving product:", error));
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl w-full max-w-md relative h-[90%] overflow-y-auto">
                {/* Close Button */}
                <button 
                    onClick={() => setShowAddProduct(false)} 
                    className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
                >
                    ✕
                </button>

                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Add Product</h1>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Generic Name</label>
                        <input 
                            type="text" 
                            name="genericName"
                            value={formData.genericName}
                            onChange={handleChange}
                            className="w-full p-2 mt-1 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring focus:ring-blue-500 outline-none" 
                            placeholder="Enter generic name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Brand Name</label>
                        <input 
                            type="text" 
                            name="brandName"
                            value={formData.brandName}
                            onChange={handleChange}
                            className="w-full p-2 mt-1 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring focus:ring-blue-500 outline-none" 
                            placeholder="Enter brand name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Dosage</label>
                        <input 
                            type="text" 
                            name="dosage"
                            value={formData.dosage}
                            onChange={handleChange}
                            className="w-full p-2 mt-1 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring focus:ring-blue-500 outline-none" 
                            placeholder="Enter dosage"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                        <textarea 
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-2 mt-1 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring focus:ring-blue-500 outline-none" 
                            placeholder="Enter description"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image</label>
                        <input 
                            type="file" 
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full p-2 mt-1 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price</label>
                        <input 
                            type="number" 
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full p-2 mt-1 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring focus:ring-blue-500 outline-none" 
                            placeholder="Enter price"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Quantity</label>
                        <input 
                            type="number" 
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            className="w-full p-2 mt-1 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring focus:ring-blue-500 outline-none" 
                            placeholder="Enter quantity"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Group</label>
                        <input 
                            type="text" 
                            name="group"
                            value={formData.group}
                            onChange={handleChange}
                            className="w-full p-2 mt-1 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring focus:ring-blue-500 outline-none" 
                            placeholder="Enter group"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                        <select 
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleCategoryChange}
                            className="w-full p-2 mt-1 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring focus:ring-blue-500 outline-none"
                        >
                            <option value="">Select Category</option>
                            {categories.map(category => (
                                <option key={category.categoryId} value={category.categoryId}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Classification</label>
                        <select 
                            name="classification"
                            value={formData.classification}
                            onChange={handleChange}
                            className="w-full p-2 mt-1 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring focus:ring-blue-500 outline-none"
                        >
                            <option value="OTC">OTC / Over-The-Counter</option>
                            <option value="RX">Prescription (Rx)</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button 
                            type="button" 
                            onClick={() => setShowAddProduct(false)} 
                            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}