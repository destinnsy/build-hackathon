interface ExistingProductsMessageProps {
  products: {
    title: string;
    contact_point: string[];
    summary: string;
  }[];
}

export default function ExistingProductsMessage({
  products,
}: ExistingProductsMessageProps) {
  return (
    <div className="bg-orange-100 border-l-4 border-orange-500 p-4 mb-4">
      <div className="text-orange-700 font-bold mb-2">Warning!</div>
      <div className="mb-2">
        We found the following existing products that may address this problem:
      </div>
      <div className="space-y-4">
        {products.map((product, index) => (
          <div key={index} className="ml-4">
            <div>
              <span className="font-semibold">Title: </span>
              <span className="text-gray-900">{product.title}</span>
            </div>
            {product.contact_point.length > 0 && (
              <div>
                <span className="font-semibold">Contact: </span>
                <span className="text-gray-900">
                  {product.contact_point.join(", ")}
                </span>
              </div>
            )}
            <div>
              <span className="font-semibold">Summary: </span>
              <span className="text-gray-900 whitespace-pre-wrap">
                {product.summary}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
