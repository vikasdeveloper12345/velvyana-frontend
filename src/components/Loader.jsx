const Loader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#020617]/90 backdrop-blur-sm z-50">
      <div className="w-14 h-14 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>

      <p className="mt-4 text-sm text-gray-300 tracking-wide">
        Loading Velvyana...
      </p>
    </div>
  );
};

export default Loader;
