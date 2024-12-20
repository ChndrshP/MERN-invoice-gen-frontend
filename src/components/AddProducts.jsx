import { useState } from 'react'
import { useNavigate } from "react-router-dom"

export default function AddProductsPage() {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [products, setProducts] = useState([]);
  const [customerDetails, setCustomerDetails] = useState({ name: '', email: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      localStorage.removeItem('token');

      sessionStorage.clear();

      document.cookie.split(";").forEach((cookie) => {
        document.cookie = cookie
          .replace(/^ +/, "")
          .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
      });

      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleAddProduct = () => {
    if (productName && productPrice && quantity) {
      const newProduct = {
        name: productName,
        price: parseFloat(productPrice),
        quantity: parseInt(quantity),
      }
      setProducts([...products, newProduct])
      setProductName('')
      setProductPrice('')
      setQuantity('')
    }
  }

  const calculateTotal = () => {
    return products.reduce((total, product) => total + product.price * product.quantity, 0)
  }

  const calculateGST = () => {
    return calculateTotal() * 0.18
  }

  const handleGeneratePDF = async () => {
    if (!customerDetails.name || !customerDetails.email) {
      alert('Please enter customer details');
      return;
    }

    const currentDate = new Date().toISOString().split('T')[0];

    const data = {
      customer: {
        name: customerDetails.name,
        email: customerDetails.email,
        date: currentDate
      },
      products: products,
      total: calculateTotal(),
      gst: calculateGST(),
    };

    try {
      const response = await fetch("http://localhost:5000/api/auth/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();

      if (blob.type !== 'application/pdf') {
        throw new Error('Received invalid file format');
      }

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = url;
      link.download = 'invoice.pdf';

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="bg-gray-900 py-4 px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
            <div className="w-6 h-6 bg-gray-900 transform rotate-45"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold">levitation</span>
            <span className="text-sm text-gray-400">infotech</span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          disabled={isLoading}
          className="bg-lime-500 text-black px-4 py-2 rounded hover:bg-lime-600 transition-colors disabled:bg-lime-300 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Logging out...' : 'Logout'}
        </button>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Add Products</h1>
        <p className="text-gray-400 mb-2">This is basic login page which is used for levitation</p>
        <p className="text-gray-400 mb-12">assignment purpose.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="customerName" className="block text-sm font-medium mb-1">
              Customer Name
            </label>
            <input
              id="customerName"
              placeholder="Enter customer name"
              value={customerDetails.name}
              onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
              className="w-full bg-gray-800 text-white px-3 py-4 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
          </div>
          <div>
            <label htmlFor="customerEmail" className="block text-sm font-medium mb-1">
              Customer Email
            </label>
            <input
              id="customerEmail"
              type="email"
              placeholder="Enter customer email"
              value={customerDetails.email}
              onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })}
              className="w-full bg-gray-800 text-white px-3 py-4 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label htmlFor="productName" className="block text-sm font-medium mb-1">
              Product Name
            </label>
            <input
              id="productName"
              placeholder="Enter the product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full bg-gray-800 text-white px-3 py-4 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
          </div>
          <div>
            <label htmlFor="productPrice" className="block text-sm font-medium mb-1">
              Product Price
            </label>
            <input
              id="productPrice"
              type="number"
              placeholder="Enter the price"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              className="w-full bg-gray-800 text-white px-3 py-4 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
          </div>
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium mb-1">
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              placeholder="Enter the Qty"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full bg-gray-800 text-white px-3 py-4 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
          </div>
        </div>

        <button
          onClick={handleAddProduct}
          className="bg-gray-700 text-lime-500 px-4 py-2 rounded hover:bg-gray-800 transition-colors mb-8"
        >
          Add Product &#10753;
        </button>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border-gray-700">
            <thead>
              <tr className="bg-gray-800">
                <th className="text-left p-3">Product name</th>
                <th className="text-left p-3">Quantity</th>
                <th className="text-left p-3">Price</th>
                <th className="text-left p-3">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="p-3">{product.name}</td>
                  <td className="p-3">{product.quantity}</td>
                  <td className="p-3">{product.price}</td>
                  <td className="p-3">INR {product.quantity * product.price}</td>
                </tr>
              ))}
              <tr className="border-b border-gray-700">
                <td colSpan={3} className="text-right -translate-x-36 p-3 font-medium">
                  +GST 18%
                </td>
                <td className="p-3 font-medium">INR {(calculateTotal() + calculateGST()).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center">
          <button
            className="bg-gray-700 text-lime-500 w-full md:w-2/3 lg:w-1/2 py-3 rounded hover:bg-gray-600 transition-colors font-bold mx-auto"
            onClick={handleGeneratePDF}>
            Generate PDF Invoice
          </button>
        </div>
      </main>
    </div>
  )
}