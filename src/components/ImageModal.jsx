export default function ImageModal({url,onClose}){
  return (
    <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-50">
      <img src={url} className="max-h-[90%] max-w-[90%]" />
      <button onClick={onClose} className="absolute top-4 right-4 text-white text-3xl font-bold">×</button>
    </div>
  );
}