import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Camera as CameraIcon, RefreshCw, XCircle } from 'lucide-react';

interface CameraProps {
  onCapture: (imageData: string) => void;
  label?: string;
}

export const Camera: React.FC<CameraProps> = ({ onCapture, label = "Ambil Foto" }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    try {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facingMode }
      });
      setStream(newStream);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
      setIsActive(true);
      setCapturedImage(null);
    } catch (err) {
      console.error("Camera Error:", err);
      alert("Gagal membuka kamera. Pastikan izin diberikan.");
    }
  }, [facingMode, stream]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsActive(false);
  }, [stream]);

  const takePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Mirror if user facing
        if (facingMode === 'user') {
          ctx.translate(canvas.width, 0);
          ctx.scale(-1, 1);
        }
        ctx.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
        setCapturedImage(dataUrl);
        onCapture(dataUrl);
        stopCamera();
      }
    }
  };

  const switchCamera = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  };

  // Restart camera when facing mode changes if it was active
  useEffect(() => {
    if (isActive && !capturedImage) {
      startCamera();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facingMode]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-gray-100 rounded-xl overflow-hidden border-2 border-dashed border-gray-300 relative aspect-[4/3] flex flex-col items-center justify-center">
      
      {!isActive && !capturedImage && (
        <div className="flex flex-col items-center text-gray-400 p-4">
          <CameraIcon className="w-12 h-12 mb-2" />
          <span className="text-sm font-medium mb-4 text-center">{label}</span>
          <button 
            onClick={startCamera}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Buka Kamera
          </button>
        </div>
      )}

      {isActive && (
        <>
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
          />
          <div className="absolute bottom-4 flex gap-4 w-full justify-center z-10">
            <button onClick={stopCamera} className="p-3 bg-red-500/80 rounded-full text-white">
              <XCircle className="w-6 h-6" />
            </button>
            <button onClick={takePhoto} className="p-4 bg-white rounded-full border-4 border-gray-200 shadow-lg">
              <div className="w-4 h-4 bg-gray-800 rounded-full"></div>
            </button>
            <button onClick={switchCamera} className="p-3 bg-gray-800/60 rounded-full text-white backdrop-blur">
              <RefreshCw className="w-6 h-6" />
            </button>
          </div>
        </>
      )}

      {capturedImage && (
        <div className="relative w-full h-full">
           <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
           <button 
             onClick={() => { setCapturedImage(null); startCamera(); }}
             className="absolute top-2 right-2 p-2 bg-white/90 rounded-full shadow text-gray-800"
           >
             <RefreshCw className="w-4 h-4" />
           </button>
           <div className="absolute inset-0 flex items-end justify-center pointer-events-none p-2">
             <span className="bg-green-500 text-white text-xs px-2 py-1 rounded shadow">Foto Tersimpan</span>
           </div>
        </div>
      )}
    </div>
  );
};
