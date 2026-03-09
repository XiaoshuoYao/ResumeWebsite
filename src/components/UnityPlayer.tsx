"use client";

import { useState } from "react";

interface UnityPlayerProps {
  buildPath: string;
  title?: string;
}

export default function UnityPlayer({ buildPath, title = "Unity Game" }: UnityPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);

  const handleFullscreen = () => {
    const iframe = document.getElementById("unity-iframe") as HTMLIFrameElement;
    if (iframe) {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      }
    }
  };

  return (
    <div className="my-6">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <button
          onClick={handleFullscreen}
          className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          Fullscreen
        </button>
      </div>
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <div className="text-center">
              <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
              <p className="text-sm text-gray-500 dark:text-gray-400">Loading Unity Player...</p>
            </div>
          </div>
        )}
        <iframe
          id="unity-iframe"
          src={`${buildPath}/index.html`}
          className="h-full w-full"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </div>
  );
}
