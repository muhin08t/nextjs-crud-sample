'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handleUpdate = async (product) => {
    const query = new URLSearchParams(product).toString();
    router.push(`/update?${query}`);
  }
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://crud.teamrabbil.com/api/v1/DeleteProduct/${id}`, {
      });
      const json = await res.json();
      console.log("json delete value "+json.status);
      if (json.status === "success") {
        setSuccessMessage('Product deleted successfully!');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
        // Remove the deleted product from the state
        setProducts(products.filter(product => product._id !== id));
      } else {
        console.error('Failed to delete the product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('https://crud.teamrabbil.com/api/v1/ReadProduct');
        const json = await res.json();
        console.log('API Response:', json); // Check the structure here
              // Extract the array from the `data` property
      if (json.status === "success" && Array.isArray(json.data)) {
        setProducts(json.data); // Set the `data` array to the `products` state
      } else {
        setProducts([]); // Handle unexpected structure
        console.error("Unexpected response structure");
      }
      setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <p className="m-10">Loading...</p>;
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      {successMessage && (
        <div className="mb-4 p-4 text-green-800 bg-green-100 border border-green-200 rounded-md">
          {successMessage}
        </div>
      )}
      <table className="min-w-full bg-white border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border border-gray-200 text-left">
              PRODUCT
            </th>
            <th className="py-2 px-4 border border-gray-200">UNIT PRICE</th>
            <th className="py-2 px-4 border border-gray-200">Quantity</th>
            <th className="py-2 px-4 border border-gray-200">TOTAL PRICE</th>
            <th className="py-2 px-4 border border-gray-200">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="py-2 px-4 border border-gray-200 text-left">
                <div className="flex items-center">
                  <div className="relative">
                    <Image
                      src={product.Img}
                      alt="Product Image"
                      className="rounded-lg"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="ml-4">
                    <p className="font-bold">{product.ProductName}</p>
                  </div>
                </div>
              </td>
              <td className="py-2 px-4 border border-gray-200 text-center">
                {product.UnitPrice}
              </td>
              <td className="py-2 px-4 border border-gray-200 text-center">
                {product.Qty}
              </td>
              <td className="py-2 px-4 border border-gray-200 text-center">
                {product.TotalPrice}
              </td>
              <td className="py-2 px-4 border border-gray-200 text-center">
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white py-1 px-3 rounded-md mr-2"
                >
                  🗑
                </button>
                <button
                  onClick={() => handleUpdate(product)}
                  className="bg-green-500 text-white py-1 px-3 rounded-md"
                >
                  ✏️
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
