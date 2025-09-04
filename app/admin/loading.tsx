export default function Loading() {
  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-center items-center">
          <div className="text-center">
            <div className="h-7 w-56 bg-gray-200 rounded mx-auto animate-pulse" />
            <div className="h-4 w-96 bg-gray-200 rounded mx-auto mt-2 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-evenly mt-20 mb-20 gap-10">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="max-w-sm w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="h-[58px] w-[58px] bg-gray-200 rounded mb-4 animate-pulse" />
            <div className="h-6 w-40 bg-gray-200 rounded mb-3 animate-pulse" />
            <div className="space-y-2 mb-3">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </>
  );
}
