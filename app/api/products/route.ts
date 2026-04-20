import { db } from "@/lib/db";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const category = url.searchParams.get("category"); 

  try {
    let products;

    if (category) {

      products = await db.product.findMany({
        where: {
          category: {
            equals: category,
            mode: "insensitive", 
          },
        },
        orderBy: { name: "asc" },
      });
    } else {
      products = await db.product.findMany({
        orderBy: { name: "asc" },
      });
    }

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch products" }),
      { status: 500 }
    );
  }
}