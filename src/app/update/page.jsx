'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    Img: searchParams.get('Img'),
    ProductCode: searchParams.get('ProductCode'),
    ProductName: searchParams.get('ProductName'),
    Qty: searchParams.get('Qty'),
    TotalPrice: searchParams.get('TotalPrice'),
    UnitPrice: searchParams.get('UnitPrice')
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://crud.teamrabbil.com/api/v1/UpdateProduct/${searchParams.get('_id')}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Product updated successfully');
        setSuccessMessage('Product updated successfully!');
        setTimeout(() => {
          setSuccessMessage('');
          router.push(`/products`);
        }, 2000);
        // Optionally reset form or show a success message
        setFormData({
          Img: '',
          ProductCode: '',
          ProductName: '',
          Qty: '',
          TotalPrice: '',
          UnitPrice: ''
        });
      } else {
        console.error('Error creating product');
        setSuccessMessage('Error creating product');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      }
    } catch (error) {
      console.error('Something went wrong', error);
      setSuccessMessage('Something went wrong', error);
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }
  };

  return (
    <div className="max-w-3xl mt-5 mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Update Product</h1>
            {/* Success Alert */}
            {successMessage && (
        <div className="mb-4 p-4 text-green-800 bg-green-100 border border-green-200 rounded-md">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Product Name</label>
            <input
              type="text"
              name="ProductName"
              value={formData.ProductName}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Product Code</label>
            <input
              type="text"
              name="ProductCode"
              value={formData.ProductCode}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Image</label>
            <input
              type="text"
              name="Img"
              value={formData.Img}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Unit Price($)</label>
            <input
              type="number"
              name="UnitPrice"
              value={formData.UnitPrice}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Quantity</label>
            <input
              type="number"
              name="Qty"
              value={formData.Qty}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Total Price($)</label>
            <input
              type="number"
              name="TotalPrice"
              value={formData.TotalPrice}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
        >
          Update
        </button>
      </form>
    </div>
  );
}
