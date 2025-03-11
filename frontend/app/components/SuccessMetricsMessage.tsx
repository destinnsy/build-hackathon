import { SUCCESS_METRICS_MESSAGES } from "../constants/messages";

interface SuccessMetricsMessageProps {
  redFlags: string[];
}

export default function SuccessMetricsMessage({
  redFlags,
}: SuccessMetricsMessageProps) {
  const getFlagMessage = (flag: string) => {
    return (
      SUCCESS_METRICS_MESSAGES[flag as keyof typeof SUCCESS_METRICS_MESSAGES] ||
      SUCCESS_METRICS_MESSAGES.default
    );
  };

  return (
    <>
      <div className="mb-2">
        We have detected the following issues in your success metrics:
      </div>
      <ul className="list-disc list-inside mb-4">
        {redFlags.map((flag, index) => (
          <li key={index} className="ml-4">
            {getFlagMessage(flag)}
          </li>
        ))}
      </ul>
    </>
  );
}
