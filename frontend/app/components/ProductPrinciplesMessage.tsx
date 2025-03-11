import { PRODUCT_PRINCIPLES_MESSAGES } from "../constants/messages";

interface ProductPrinciplesMessageProps {
  redFlags: string[];
}

export default function ProductPrinciplesMessage({
  redFlags,
}: ProductPrinciplesMessageProps) {
  const getFlagMessage = (flag: string) => {
    return (
      PRODUCT_PRINCIPLES_MESSAGES[
        flag as keyof typeof PRODUCT_PRINCIPLES_MESSAGES
      ] || PRODUCT_PRINCIPLES_MESSAGES.default
    );
  };

  return (
    <>
      <div className="mb-2">
        We have detected the following in your problem statement:
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
