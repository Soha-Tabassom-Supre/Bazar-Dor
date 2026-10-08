export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-base-200">
      <div className="flex flex-col items-center gap-4">
        <span className="loading loading-spinner loading-lg"></span>

        <p className="text-lg font-medium">পণ্য লোড হচ্ছে...</p>
      </div>
    </main>
  );
}
