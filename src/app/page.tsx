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
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-2">
          What are the special moments of your life?
        </h1>
        {/* 327, 600, 660 */}
        <p className="text-black text-sm sm:text-base">
          We believe every moment counts! Share your favorite highlights, unforgettable memories, and the stories that make your life shine.
        </p>
        {/* 327, 500,660 */}
      </div>


      <div className="columns-1 sm:columns-2 lg:columns-3 [column-gap:12px] space-y-3">
        {highlights.map((item: any, i: number) => (
          <div
            key={i}
            className="break-inside-avoid w-full border border-[#F3F3F3] rounded-[12px] shadow-sm p-5 bg-white flex flex-col gap-2 opacity-90"
          >
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-48 object-cover rounded mb-2"
              />
            )}
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-sm text-gray-500">{item.location}</p>
            <p className="text-sm text-gray-700">{item.description}</p>
          </div>
        ))}
      </div>




      <CreateModal />
    </main>
  );
}
