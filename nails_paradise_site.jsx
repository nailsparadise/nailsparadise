import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NailsParadise() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Shimmer Elegance",
      price: 15,
      image: "https://via.placeholder.com/200x200/f6e6e9/333?text=Shimmer+Elegance"
    },
    {
      id: 2,
      name: "Soft Glow Tips",
      price: 18,
      image: "https://via.placeholder.com/200x200/f2dada/333?text=Soft+Glow+Tips"
    },
    {
      id: 3,
      name: "Gleaming Burgundy",
      price: 20,
      image: "https://via.placeholder.com/200x200/e3b7b3/333?text=Gleaming+Burgundy"
    }
  ]);

  const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "" });
  const [showModal, setShowModal] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    const savedCart = localStorage.getItem("nailsParadiseCart");
    if (savedCart) setCart(JSON.parse(savedCart));

    const adminFlag = localStorage.getItem("nailsParadiseAdmin");
    if (adminFlag === "true") setIsAdmin(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("nailsParadiseCart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => setCart([...cart, product]);

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const addNewProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) return;
    const product = {
      id: products.length + 1,
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      image: newProduct.image
    };
    setProducts([...products, product]);
    setNewProduct({ name: "", price: "", image: "" });
  };

  const removeProduct = (id) => setProducts(products.filter((p) => p.id !== id));

  const handlePlaceOrder = () => {
    if (cart.length > 0) {
      setShowModal(true);
      setCart([]);
    }
  };

  const handleLogin = () => {
    if (password === "paradise123") {
      setIsAdmin(true);
      localStorage.setItem("nailsParadiseAdmin", "true");
      setShowLogin(false);
      setPassword("");
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6e6e9] via-[#f2dada] to-[#e3b7b3] p-6 font-sans relative overflow-hidden">
      <header className="text-center mb-10 relative z-10">
        <div className="flex flex-col items-center">
          <img
            src="/full-logo.jpeg"
            alt="Nails Paradise Full Logo"
            className="w-56 h-56 mb-4 drop-shadow-md"
          />
          <h1 className="text-6xl font-serif font-extrabold tracking-wide drop-shadow-sm text-[#823c44]">
            Nails Paradise
          </h1>
          <p className="text-lg text-[#a65d68] mt-2 font-light tracking-wide font-[cursive]">
            Nailed it together
          </p>
          <a
            href="https://www.nailsparadise.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-2 text-sm text-[#823c44] underline hover:text-[#a65d68]"
          >
            www.nailsparadise.com
          </a>
        </div>
        {!isAdmin && (
          <button
            onClick={() => setShowLogin(true)}
            className="mt-2 text-sm text-gray-500 hover:text-[#823c44] underline"
          >
            Admin Login
          </button>
        )}
      </header>

      {/* Admin Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full">
            <h2 className="text-xl font-semibold text-[#823c44] mb-4">Admin Login</h2>
            <Input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4"
            />
            <div className="flex justify-end gap-2">
              <Button onClick={() => setShowLogin(false)} className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full">
                Cancel
              </Button>
              <Button
                onClick={handleLogin}
                className="bg-[#823c44] hover:bg-[#6b2f37] text-white px-4 py-2 rounded-full"
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Panel */}
      {isAdmin && (
        <div className="bg-white p-6 rounded-3xl shadow-lg max-w-2xl mx-auto mb-10 border border-[#f2dada] relative z-10">
          <h2 className="text-2xl font-semibold text-[#823c44] mb-4">Add New Product</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="rounded-xl border-[#f2dada]"
            />
            <Input
              placeholder="Price"
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              className="rounded-xl border-[#f2dada]"
            />
            <Input
              placeholder="Image URL"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              className="rounded-xl border-[#f2dada]"
            />
          </div>
          <Button
            className="mt-4 w-full bg-[#a65d68] hover:bg-[#823c44] text-white rounded-full px-4 py-2 shadow-sm"
            onClick={addNewProduct}
          >
            Add Product
          </Button>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 relative z-10">
        {products.map((product) => (
          <Card
            key={product.id}
            className="rounded-3xl shadow-md hover:shadow-xl transition border border-[#f2dada] bg-white bg-opacity-70 backdrop-blur-sm"
          >
            <CardContent className="flex flex-col items-center p-4">
              <img
                src={product.image}
                alt={product.name}
                className="rounded-2xl mb-4 w-full h-40 object-cover border border-[#f2dada] shadow-sm"
              />
              <h2 className="text-lg font-medium text-[#823c44] mb-1">{product.name}</h2>
              <p className="text-[#a65d68] mb-3 font-semibold">${product.price}</p>
              <div className="flex gap-2">
                <Button
                  className="bg-[#a65d68] hover:bg-[#823c44] text-white rounded-full px-4 py-2"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </Button>
                {isAdmin && (
                  <Button
                    className="bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full px-4 py-2"
                    onClick={() => removeProduct(product.id)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Floating Cart Button */}
      <button
        onClick={() => setShowCart(true)}
        className="fixed bottom-6 right-6 bg-[#a65d68] hover:bg-[#823c44] text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg text-2xl"
      >
        🛒
      </button>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-3xl shadow-xl p-8 max-w-lg w-full border border-[#f2dada] relative">
            <button
              onClick={() => setShowCart(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold text-[#823c44] mb-4">Your Order</h2>
            {cart.length === 0 ? (
              <p className="text-gray-400 italic">Your cart is empty.</p>
            ) : (
              <ul className="space-y-2">
                {cart.map((item, index) => (
                  <li key={index} className="flex justify-between items-center text-[#823c44]">
                    <span>{item.name}</span>
                    <div className="flex gap-4 items-center">
                      <span className="font-medium">${item.price}</span>
                      <Button
                        className="bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full px-2 py-1 text-sm"
                        onClick={() => removeFromCart(index)}
                      >
                        ❌
                      </Button>
                    </div>
                  </li>
                ))}
                <hr className="my-2" />
                <li className="flex justify-between font-bold text-[#823c44]">
                  Total: ${cart.reduce((sum, item) => sum + item.price, 0)}
                </li>
              </ul>
            )}
            <Button
              className="mt-4 w-full bg-[#a65d68] hover:bg-[#823c44] text-white rounded-full px-6 py-3 text-lg font-semibold shadow-lg transition"
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md text-center border border-[#f2dada]">
            <h2 className="text-2xl font-bold text-[#823c44] mb-4">
              Thank You
            </h2>
            <p className="text-gray-500 mb-6">
              Your order has been placed successfully! We’ll prepare your paradise nails with love.
            </p>
            <Button
              className="bg-[#a65d68] hover:bg-[#823c44] text-white rounded-full px-6 py-2 shadow"
              onClick={() => setShowModal(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
