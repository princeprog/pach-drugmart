import React, { useEffect, useState } from 'react';
import AddProduct from './AddProduct';
import { FaCheckCircle } from "react-icons/fa";
import EditProduct from './EditProduct';

export default function Product() {
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [products, setProducts] = useState([]);
    const [productModal, setProductModal] = useState(false);
    const [editProductModal, setEditProductModal] = useState(false);
    const [editSuccessModal, setEditSuccessModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [deleteProductModal, setDeleteProductModal] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8080/products/getall')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => setProducts(data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/products/getall')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => setProducts(data))
            .catch(err => console.log(err));
    }, [productModal]);

    useEffect(() => {
        fetch('http://localhost:8080/products/getall')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => setProducts(data))
            .catch(err => console.log(err));
    }, [editSuccessModal]);

    useEffect(() => {
        fetch('http://localhost:8080/products/getall')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => setProducts(data))
            .catch(err => console.log(err));
    }, [deleteProductModal]);

    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setEditProductModal(true);
    };

    const handleDeleteClick = (productId) => {
        console.log(productId);
        fetch(`http://localhost:8080/products/delete/${productId}`, {
            method: 'DELETE'
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.text();
            })
            .then(data => {
                console.log('Delete response:', data);
                setProducts(prevState => prevState.filter(product => product.productId !== productId));
                console.log('Product deleted successfully');
                setDeleteProductModal(true);
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="product w-full py-6 px-10 bg-white shadow-lg rounded-lg flex flex-col flex-grow h-screen overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-200">
                <h1 className="text-3xl font-semibold text-gray-800">Manage Products</h1>
                <button
                    className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                    onClick={() => setShowAddProduct(true)}
                >
                    Add New Product
                </button>
            </div>

            <div className="w-full rounded-lg shadow-md h-full">
                <table className="w-full border-collapse bg-white">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700 text-sm uppercase text-center">
                            <th className="px-4 py-3 border-b">Name</th>
                            <th className="px-4 py-3 border-b">Brand Name</th>
                            <th className="px-4 py-3 border-b">Dosage</th>
                            <th className="px-4 py-3 border-b">Price</th>
                            <th className="px-4 py-3 border-b">Quantity</th>
                            <th className="px-4 py-3 border-b">Category</th>
                            <th className="px-4 py-3 border-b">Classification</th>
                            <th className="px-4 py-3 border-b text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.productId} className="text-gray-800 text-sm text-center hover:bg-gray-50 transition">
                                <td className="px-4 py-3 border-b">{product.genericName}</td>
                                <td className="px-4 py-3 border-b">{product.brandName}</td>
                                <td className="px-4 py-3 border-b">{product.dosage}</td>
                                <td className="px-4 py-3 border-b">₱{product.price.toFixed(2)}</td>
                                <td className="px-4 py-3 border-b">{product.quantity}</td>
                                <td className="px-4 py-3 border-b">{product.categories.name}</td>
                                <td className="px-4 py-3 border-b">{product.classification}</td>
                                <td className="px-4 py-3 border-b flex justify-center space-x-3">
                                    <button
                                        className="px-4 py-2 rounded-md bg-green-600 text-white font-medium hover:bg-green-700 transition"
                                        onClick={() => handleEditClick(product)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="px-4 py-2 rounded-md bg-red-600 text-white font-medium hover:bg-red-700 transition"
                                        onClick={() => handleDeleteClick(product.productId)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showAddProduct && <AddProduct setShowAddProduct={setShowAddProduct} setProductModal={setProductModal} />}
            {productModal &&
                <div className='success-modal fixed inset-0 flex items-center justify-center bg-black/40 z-50'>
                    <div className='w-1/3 bg-white h-[18rem] shadow-lg p-6 flex flex-col items-center justify-between'>
                        <div>
                            <FaCheckCircle className='text-5xl text-green-600 mx-auto mb-4' />
                            <h1 className='text-xl font-semibold text-center text-green-600'>SUCCESS</h1>
                            <p className='text-center mt-4'>"The data has been added successfully! You can now view it in the system."</p>
                        </div>
                        <button
                            className='w-full px-4 py-2 bg-green-600 text-white font-semibold mt-4 hover:bg-green-700 transition'
                            onClick={() => setProductModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            }
            {editProductModal &&
                <EditProduct
                    setEditProductModal={setEditProductModal}
                    editSuccessModal={setEditSuccessModal}
                    product={selectedProduct}
                />
            }
            {editSuccessModal &&
                <div className='success-modal fixed inset-0 flex items-center justify-center bg-black/40 z-50'>
                    <div className='w-1/3 bg-white h-[18rem] shadow-lg p-6 flex flex-col items-center justify-between'>
                        <div>
                            <FaCheckCircle className='text-5xl text-green-600 mx-auto mb-4' />
                            <h1 className='text-xl font-semibold text-center text-green-600'>SUCCESS</h1>
                            <p className='text-center mt-4'>"The product has been updated successfully! You can now view the changes in the system."</p>
                        </div>
                        <button
                            className='w-full px-4 py-2 bg-green-600 text-white font-semibold mt-4 hover:bg-green-700 transition'
                            onClick={() => setEditSuccessModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            }
            {deleteProductModal &&
                <div className='success-modal fixed inset-0 flex items-center justify-center bg-black/40 z-50'>
                    <div className='w-1/3 bg-white h-[18rem] shadow-lg p-6 flex flex-col items-center justify-between'>
                        <div>
                            <FaCheckCircle className='text-5xl text-green-600 mx-auto mb-4' />
                            <h1 className='text-xl font-semibold text-center text-green-600'>SUCCESS</h1>
                            <p className='text-center mt-4'>"Data deleted successfully"</p>
                        </div>
                        <button
                            className='w-full px-4 py-2 bg-green-600 text-white font-semibold mt-4 hover:bg-green-700 transition'
                            onClick={() => setDeleteProductModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            }
        </div>
    );
}