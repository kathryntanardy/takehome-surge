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
    <main className="
      w-[375px] sm:w-[788px] lg:w-[1280px]
      pt-6 sm:pt-10 lg:pt-10
      pb-6 sm:pb-10 lg:pb-10
      px-6 sm:px-10 lg:px-20
      space-y-6 sm:space-y-10
      bg-[#FAFAFA]
      mx-auto
    ">
      <div className="mb-6">
        <p className="text-sm font-semibold tracking-wide text-500 [color:#EC484B]">HIGHLIGHT</p>
        <h1 className="font-semibold [font-size:29px] [line-height:113%] [letter-spacing:-0.015em] text-black mb-2">
          What are the special moments of your life?
        </h1>
        {/* 327, 600, 660 */}
        <div className="w-[327px] sm:w-[500px] lg:w-[660px]">
          <p className="font-normal [font-size:16px] [line-height:150%] [letter-spacing:-0.0075em] [color:rgba(0,0,0,0.8)]">
            We believe every moment counts! Share your favorite highlights, unforgettable memories, and the stories that make your life shine.
          </p>
        </div>

        {/* 327, 500,660 */}
      </div>


      <div className="columns-1 sm:columns-2 lg:columns-3 [column-gap:12px] space-y-3">
        {highlights.map((item: any, i: number) => (
          <div
            key={i}
            className="break-inside-avoid w-full border border-[#F3F3F3] rounded-[12px] shadow-sm p-5 bg-white flex flex-col opacity-90"
          >
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-48 object-cover rounded mb-1"
              />
            )}
            <h2 className="font-semibold [font-size:16px]">{item.title}</h2>
            <p className="[font-size:14px] text-gray-500 mt-[-1px] mb-1">{item.location}</p>
            <p className="[font-size:14px] text-gray-700">{item.description}</p>
          </div>





        ))}
      </div>




      <CreateModal />
    </main>
  );
}
