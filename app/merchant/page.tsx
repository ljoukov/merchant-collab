"use client";

import { useUser } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";
import { listProducts } from "../actions";
import Stripe from "stripe";
import ImportButton from "./import-button";

function ProductList() {
  const [products, setProducts] = useState<Stripe.Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await listProducts();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) return <div className="text-center">Loading products...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                {product.images?.[0] ? (
                  <div className="w-16 h-16 relative">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
              </td>
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900">{product.name}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-500">{product.description}</div>
              </td>
              <td className="px-6 py-4">
                {product.active ? (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                ) : (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Inactive</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function MerchantLogin() {
  const { user, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-center">Merchant Dashboard</h1>
        </div>

        {user ? (
          <div>
            <p className="mb-4 text-center">Welcome, {user.email}</p>
            <div className="mb-4 text-center">
              <ImportButton />
            </div>
            <ProductList />
          </div>
        ) : (
          <div className="text-center">
            <a
              href="/auth/login"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 inline-block"
            >
              Login with Auth0
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
