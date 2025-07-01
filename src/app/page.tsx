import CreateModal from '@/app/components/CreateModal';

async function getReviewsWithImages() {
  const res = await fetch('https://surgetakehome.vercel.app/api/getreviews/locke', {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch highlights');
  const data = await res.json();

  const withImages = await Promise.all(
    data.map(async (item: any) => {
      const imgRes = await fetch(`https://api.openverse.engineering/v1/images?q=${encodeURIComponent(item.title)}`);
      const imgData = await imgRes.json();
      const imageUrl = imgData.results?.[0]?.thumbnail || null;
      return { ...item, imageUrl };
    })
  );

  return withImages;
}

export default async function Home() {
  const highlights = await getReviewsWithImages();

  return (
    <main className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <p className="text-sm font-semibold tracking-wide text-gray-500">HIGHLIGHT</p>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
          What are the special moments of your life?
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          We believe every moment counts! Share your favorite highlights, unforgettable memories, and the stories that make your life shine.
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {highlights.map((item: any, i: number) => (
          <div key={i} className="border rounded shadow-sm p-4 bg-white flex flex-col">
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}
            <h2 className="text-lg font-semibold mb-1">{item.title}</h2>
            <p className="text-sm text-gray-500 mb-2">{item.location}</p>
            <p className="text-sm text-gray-700 flex-grow">{item.description}</p>
          </div>
        ))}
      </div>

      <CreateModal />
    </main>
  );
}
