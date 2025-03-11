import { MARKET_SIZE_MESSAGES } from "../constants/messages";

interface ProblemSizeMessageProps {
  marketSizeIssue: string;
}

export default function ProblemSizeMessage({
  marketSizeIssue,
}: ProblemSizeMessageProps) {
  const getIssueMessage = (issue: string) => {
    return (
      MARKET_SIZE_MESSAGES[issue as keyof typeof MARKET_SIZE_MESSAGES] ||
      MARKET_SIZE_MESSAGES.default
    );
  };

  return (
    <>
      <div className="mb-2">
        We have detected the following issues with the size of your problem
        statement:
      </div>
      <ul className="list-disc list-inside mb-4">
        <li className="ml-4">{getIssueMessage(marketSizeIssue)}</li>
      </ul>
    </>
  );
}
