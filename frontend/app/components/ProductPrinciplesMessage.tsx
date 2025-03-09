interface ProductPrinciplesMessageProps {
  redFlags: string[];
}

export default function ProductPrinciplesMessage({
  redFlags,
}: ProductPrinciplesMessageProps) {
  return (
    <>
      <div className="mb-2">
        We have detected the following in your problem statement:
      </div>
      <ul className="list-disc list-inside mb-4">
        {redFlags.map((flag, index) => (
          <li key={index} className="ml-4">
            {flag}
          </li>
        ))}
      </ul>
    </>
  );
}
