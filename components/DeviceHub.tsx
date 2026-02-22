
import React, { useState, useRef } from 'react';
import { Camera, MapPin, Video, VideoOff, Loader2 } from 'lucide-react';

const DeviceHub: React.FC = () => {
  const [location, setLocation] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsCameraActive(true);
      }
    } catch (err) {
      alert("Error accessing camera: " + err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };

  const getLocation = () => {
    setLoadingLocation(true);
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      setLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(`Lat: ${position.coords.latitude.toFixed(4)}, Lng: ${position.coords.longitude.toFixed(4)}`);
        setLoadingLocation(false);
      },
      (error) => {
        alert("Error getting location: " + error.message);
        setLoadingLocation(false);
      }
    );
  };

  return (
    <div className="flex-1 h-full flex flex-col p-8 overflow-y-auto animate-fade-in">
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">📱 Device Dashboard</h2>
        <p className="text-gray-500">Access system tools and manage hardware permissions for Scholar Hub apps.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Camera Module */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-scholar-100 text-scholar-600 rounded-2xl">
              <Camera size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">System Camera</h3>
              <p className="text-sm text-gray-500">Preview hardware visual input</p>
            </div>
          </div>

          <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden relative mb-6">
            {!isCameraActive && (
               <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                  <VideoOff size={48} className="mb-2 opacity-20" />
                  <p className="text-xs uppercase font-bold tracking-widest">Camera Inactive</p>
               </div>
            )}
            <video 
              ref={videoRef} 
              className={`w-full h-full object-cover ${isCameraActive ? 'opacity-100' : 'opacity-0'}`}
              autoPlay 
              playsInline
            />
          </div>

          <div className="flex gap-4">
            {!isCameraActive ? (
              <button 
                onClick={startCamera}
                className="flex-1 bg-scholar-600 hover:bg-scholar-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-scholar-100 flex items-center justify-center gap-2"
              >
                <Video size={18} /> Start Camera
              </button>
            ) : (
              <button 
                onClick={stopCamera}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-red-100 flex items-center justify-center gap-2"
              >
                <VideoOff size={18} /> Stop Camera
              </button>
            )}
          </div>
        </div>

        {/* Location Module */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl">
              <MapPin size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">GPS Geolocation</h3>
              <p className="text-sm text-gray-500">Request current geographic coordinates</p>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 rounded-2xl p-8 mb-6 border border-dashed border-gray-200">
             {loadingLocation ? (
               <div className="flex flex-col items-center gap-2">
                 <Loader2 className="animate-spin text-scholar-600" size={32} />
                 <p className="text-xs font-bold text-gray-400">Pinging GPS Satellites...</p>
               </div>
             ) : location ? (
               <div className="text-center">
                 <p className="text-2xl font-black text-gray-800 tracking-tighter mb-1">{location}</p>
                 <p className="text-xs font-bold text-green-500 uppercase tracking-widest">Verified Coordinate</p>
               </div>
             ) : (
               <p className="text-gray-400 text-center italic">No location data requested yet</p>
             )}
          </div>

          <button 
            onClick={getLocation}
            disabled={loadingLocation}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-orange-100 flex items-center justify-center gap-2"
          >
            {loadingLocation ? <Loader2 className="animate-spin" /> : <><MapPin size={18} /> Fetch Location</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeviceHub;
