import ReactPlayer from "react-player";
export default function PlayerModal({url,onClose}){
  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
      <ReactPlayer url={url} controls playing width="80%" height="80%" />
      <button onClick={onClose} className="absolute top-4 right-4 text-white text-3xl font-bold">×</button>
    </div>
  );
}