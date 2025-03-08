import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Pager - Home" },
    { name: "description", content: "Welcome to Pager!" },
  ];
}

export default function Home() {
  return (
    <div className="container p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome to Pager</h1>
      <p className="text-gray-600">
        Your AI-powered funding proposal editor. Get started by navigating to
        the Draft Editor.
      </p>
    </div>
  );
}
