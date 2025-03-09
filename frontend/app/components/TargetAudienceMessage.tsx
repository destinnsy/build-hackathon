interface TargetAudienceMessageProps {
  targetAudiences: string[];
}

export default function TargetAudienceMessage({
  targetAudiences,
}: TargetAudienceMessageProps) {
  return (
    <>
      <div className="mb-2">
        There are multiple target audience detected within your project
        proposal:
      </div>
      <ul className="list-disc list-inside mb-4">
        {targetAudiences.map((audience, index) => (
          <li key={index} className="ml-4">
            {audience}
          </li>
        ))}
      </ul>
    </>
  );
}
