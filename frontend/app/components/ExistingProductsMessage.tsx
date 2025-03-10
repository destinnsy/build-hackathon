interface ExistingProductsMessageProps {
  products: {
    title: string;
    contact_point: string[];
  }[];
}

export default function ExistingProductsMessage({
  products,
}: ExistingProductsMessageProps) {
  return (
    <>
      <div className="mb-2">
        We found the following existing products that may address this problem:
      </div>
      <ul className="list-disc list-inside mb-4">
        {products.map((product, index) => (
          <li key={index} className="ml-4">
            <span className="font-semibold">{product.title}</span>
            {product.contact_point.length > 0 && (
              <div className="ml-6 text-sm text-gray-600">
                Contact: {product.contact_point.join(", ")}
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
