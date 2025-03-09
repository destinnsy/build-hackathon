interface ProblemSizeMessageProps {
  marketSizeIssue: string;
}

export default function ProblemSizeMessage({
  marketSizeIssue,
}: ProblemSizeMessageProps) {
  const getIssueMessage = (issue: string) => {
    switch (issue) {
      case "overly_broad":
        return "The problem scope is too broad and needs to be more focused";
      case "excessively_narrow":
        return "The problem scope is too narrow and may limit impact";
      case "misaligned":
        return "The market size is misaligned with the proposed solution";
      case "undefined":
        return "The market size is not clearly defined";
      default:
        return "There are issues with the problem size definition";
    }
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
