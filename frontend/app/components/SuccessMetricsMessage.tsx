interface SuccessMetricsMessageProps {
  redFlags: string[];
}

export default function SuccessMetricsMessage({
  redFlags,
}: SuccessMetricsMessageProps) {
  return (
    <>
      <div className="mb-2">
        We have detected the following issues in your success metrics:
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
