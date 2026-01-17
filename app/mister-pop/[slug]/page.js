export async function generateStaticParams() {
  return [
    { slug: "item-1" },
    { slug: "item-2" },
    { slug: "item-3" },
  ];
}

export default function Page({ params }) {
  return (
    <>
      <h1 className="bg-green-400">
        Slug: {params.slug}
      </h1>
    </>
  );
}
