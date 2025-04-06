import { Product } from '../../types';
import { GoogleGenAI } from "@google/genai";

async function getCollabAds() {
  const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_API_KEY || '' });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "hi",
    });
    
    console.log('Gemini says:', response.text);
  } catch (error) {
    console.error('Error calling Gemini API:', error);
  }
  // Sample product combinations
  const combos: { name: string, products: [Product, Product] }[] = [
    {
      name: "Mystic Collector's Bundle",
      products: [
        {
          id: "col1",
          name: "Vintage Baseball Card",
          price: 49.99,
          category: "collectables",
          description: "Rare 1980s baseball card in mint condition"
        },
        {
          id: "mag1",
          name: "Holographic Sports Magnet",
          price: 12.99,
          category: "magnets",
          description: "Dynamic holographic sports-themed magnet"
        }
      ]
    },
    {
      name: "Nature Explorer Pack",
      products: [
        {
          id: "col2",
          name: "Pressed Flower Collection",
          price: 34.99,
          category: "collectables",
          description: "Set of preserved botanical specimens"
        },
        {
          id: "mag2",
          name: "Butterfly Garden Magnets",
          price: 15.99,
          category: "magnets",
          description: "Set of decorative butterfly magnets"
        }
      ]
    },
    {
      name: "Cosmic Discovery Set",
      products: [
        {
          id: "col3",
          name: "Meteorite Fragment",
          price: 79.99,
          category: "collectables",
          description: "Authenticated space rock specimen"
        },
        {
          id: "mag3",
          name: "Glow-in-Dark Planet Magnets",
          price: 19.99,
          category: "magnets",
          description: "Solar system magnets that glow in darkness"
        }
      ]
    },
    {
      name: "Artistic Treasures Duo",
      products: [
        {
          id: "col4",
          name: "Limited Edition Art Print",
          price: 59.99,
          category: "collectables",
          description: "Numbered art print from local artist"
        },
        {
          id: "mag4",
          name: "Artist Palette Magnet Set",
          price: 16.99,
          category: "magnets",
          description: "Decorative artist palette and brush magnets"
        }
      ]
    }
  ];
  
  return combos;
}

export default async function CombosPage() {
  const combos = await getCollabAds();
  
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-8">Collab Ads</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        {combos.map((combo) => (
          <div key={combo.name} className="border rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-semibold mb-4">{combo.name}</h2>
            <div className="space-y-4">
              {combo.products.map((product) => (
                <div key={product.id} className="bg-gray-50 p-4 rounded">
                  <h3 className="text-xl font-medium">{product.name}</h3>
                  <p className="text-gray-600">{product.description}</p>
                  <p className="text-lg font-semibold mt-2">${product.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-500 mt-1">Category: {product.category}</p>
                </div>
              ))}
              <div className="mt-4 text-xl font-bold text-green-600">
                Bundle Price: $
                {(combo.products.reduce((sum, p) => sum + p.price, 0) * 0.9).toFixed(2)}
                <span className="text-sm font-normal text-gray-600 ml-2">(10% off)</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
