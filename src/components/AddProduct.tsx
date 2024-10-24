import { useState } from 'react'

interface Product {
  name: string
  quantity: number
  price: number
}

export default function AddProductsPage() {
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [products, setProducts] = useState<Product[]>([])

  const handleAddProduct = () => {
    if (productName && productPrice && quantity) {
      const newProduct: Product = {
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
    const data = {
      products: products,
      total: calculateTotal(),
      gst: calculateGST(),
    };

    try {
      const response = await fetch("https://mern-invoice-gen-api.onrender.com/api/auth/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
        <button className="bg-lime-500 text-black px-4 py-2 rounded hover:bg-lime-600 transition-colors"
          onClick={() => window.location.href = '/login'}>Logout</button>
        <div className="absolute top-100 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-bl from-purple-500 to-transparent rounded-full filter blur-3xl opacity-25"></div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Add Products</h1>
        <p className="text-gray-400 mb-2">This is basic login page which is used for levitation</p>
        <p className="text-gray-400 mb-12">assignment purpose.</p>

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
          <button className="bg-gray-700 text-lime-500 px-64 py-3 rounded hover:bg-gray-600 transition-colors font-bold" onClick={handleGeneratePDF}>
            Generate PDF Invoice
          </button>
        </div>
      </main>
    </div>
  )
}