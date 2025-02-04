
import { useEffect, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { CiCircleRemove } from "react-icons/ci";




export default function Cart() {

    const user = localStorage.getItem("userEmail");
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch(`http://localhost:8080/cart/user?email=${user}`, {
                    method: "GET",
                });
                const data = await response.json();
                console.log(data);
                setCart(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCart();
    }, [])

    const handleDeleteCart = async (cartId) => {
        try {
            const response = await fetch(`http://localhost:8080/cart/delete/${cartId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                
                setCart((prevCart) => prevCart.filter((cart) => cart.cartId !== cartId));
            } else {
                throw new Error("Network response was not ok");
            }
        } catch (error) {
            console.error("Error deleting cart:", error);
        }
    }

    return (
        <div>
            <h1 className="font-montserrat ml-16 text-3xl mt-4">Cart Contents</h1>
            <div className="mx-16 mt-4 flex justify-between bg-gray-200 px-4 py-2 h-[5rem] items-center">
                <div className="border px-4 py-2 rounded-3xl text-white bg-gray-500 font-roboto2">Continue Shopping</div>
                <button className="flex items-center bg-[#155C9C] text-white font-roboto2 px-4 py-2 rounded-3xl"><FaRegCheckCircle className="text-xl mr-2" />Proceed Checkout</button>
            </div>
            <div className="">
                {cart.map((cart) => (
                    <div key={cart.cartId} className="flex justify-between  mx-16 mt-4 border-b-1 border-gray-300 p-4">
                        <CiCircleRemove className="text-4xl text-center mr-8 opacity-40 cursor-pointer"
                            onClick={() => handleDeleteCart(cart.cartId)}
                        />
                        <div className="flex justify-between items-center w-[50%]">
                            <img
                                src={`http://localhost:8080/products/getimage/${cart.products.productId}`}
                                alt={cart.products.description}
                                className="w-[10rem]"
                            />
                            <div>
                                <h1 className="text-xl text-[#155C9C] font-roboto2">{cart.products.description}</h1>
                                <p className="text-gray-500 font-bold">{cart.products.brandName}</p>
                            </div>
                        </div>
                        <div className="flex justify-around w-[50%] items-center font-roboto2">
                            <div className="flex items-center flex-col">
                                <h1 className="font-bold">Unit price</h1>
                                <p>₱{cart.products.price}</p>
                            </div>
                            <div className="flex items-center flex-col">
                                <h1 className="font-bold">Quantity</h1>
                                <p>{cart.products.quantity}</p>
                            </div>
                            <div className="flex items-center flex-col">
                                <h1 className="font-bold">Total Price</h1>
                                <p>₱{cart.products.price * cart.products.quantity}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}