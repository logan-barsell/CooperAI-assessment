import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const tests = [
    {
      link: "/tests/test-1",
      title: "Test 1",
    },
    {
      link: "/tests/test-2",
      title: "Test 2",
    },
    {
      link: "/tests/test-3",
      title: "Test 3",
    },
    {
      link: "/tests/test-4",
      title: "Test 4",
    },
    {
      link: "/tests/test-5",
      title: "Test 5",
    },
    {
      link: "/tests/test-6",
      title: "Test 6",
    },
  ];

  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">
        👋 Welcome to the Cooper AI Tech Challenge! 🚀
      </h1>
      <ul className="list-disc mt-4 pl-6 space-y-2">
        {tests.map((test) => (
          <li key={test.link}>
            <a
              className="text-blue-700 underline visited:text-purple-900"
              href={test.link}
            >
              {test.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
