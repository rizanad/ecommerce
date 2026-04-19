import Link from "next/link";

export default function ProductCard({ product }: any) {
  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-lg transition bg-white">
      
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-cover rounded-lg"
      />

      <h2 className="mt-3 font-bold text-lg">{product.name}</h2>

      <p className="text-gray-600 text-sm">{product.description}</p>

      <div className="mt-2 font-semibold text-black">
        ${product.price}
      </div>

      <Link href={`/products/${product.id}`}>
        <button className="mt-3 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
          View Product
        </button>
      </Link>

    </div>
  );
}