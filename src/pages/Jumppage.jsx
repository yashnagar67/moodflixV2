import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function JumpPage() {
  const { id } = useParams(); // Movie ID or slug
  const [downloadUrl, setDownloadUrl] = useState('');
  const [counter, setCounter] = useState(5); // Countdown in seconds
  

//   useEffect(() => {
//     console.log(title)
//     // 1. Fetch the actual URL from DB
//     async function fetchDownloadUrl() {
//       try {
//         const res = await fetch(`https://your-api.com/movies/${id}`);
//         const data = await res.json();
//         setDownloadUrl(data.url); // Secure download URL
//       } catch (err) {
//         console.error('Failed to fetch URL', err);
//       }
//     }

//     fetchDownloadUrl();
//   }, [id]);

  // 2. Countdown logic + redirect
  useEffect(() => {
    if (!downloadUrl) return;

    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev === 1) {
          window.location.href = downloadUrl;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [downloadUrl]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h2 className="text-xl font-semibold mb-4">Redirecting to your download...</h2>
      <p className="text-gray-400">Please wait <span className="text-white">{counter}</span> seconds</p>

      <div className="mt-4 text-sm text-neutral-500 max-w-md text-center px-2">
        We’re verifying the download link for your safety and redirecting shortly.
        If you’re not redirected, <a href={downloadUrl} className="text-blue-400 underline">click here</a>.
      </div>
    </div>
  );
}

export default JumpPage;
