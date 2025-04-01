"use client";
import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { useTimeContext } from '@/app/contexts/TimeContext';
import { usePlaybackContext } from '@/app/contexts/PlaybackContext';

const Editor = forwardRef(({ media, mediaProperties, setMediaProperties }, ref) => {
  const mediaRef = useRef(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const resizeHandle = useRef(null);
  const { setCurrentTime, setDuration } = useTimeContext();
  const { isPlaying, setIsPlaying } = usePlaybackContext();

  // Use useImperativeHandle to properly expose the media element
  useImperativeHandle(ref, () => ({
    // Expose the underlying DOM element
    current: mediaRef.current,
    // Add helper method to get the actual video element
    getVideoElement: () => {
      if (!mediaRef.current) return null;
      
      // If it's already a video element, return it directly
      if (mediaRef.current.tagName === 'VIDEO') {
        return mediaRef.current;
      }
      
      // Not exposing image elements
      return null;
    }
  }), [mediaRef.current]);

  // Handle timeupdate event to sync with context
  useEffect(() => {
    const video = mediaRef.current;
    if (video && media?.type === 'video') {
      const handleTimeUpdate = () => {
        if (video.currentTime !== undefined) {
          setCurrentTime(video.currentTime);
        }
      };
      
      video.addEventListener('timeupdate', handleTimeUpdate);
      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [media?.type, setCurrentTime]);

  // Handle metadata loading
  useEffect(() => {
    const video = mediaRef.current;
    if (video && media?.type === 'video') {
      const handleMetadata = () => {
        if (video.duration && !isNaN(video.duration)) {
          setDuration(video.duration);
        }
      };
      
      // Check if already loaded
      if (video.readyState >= 1 && video.duration && !isNaN(video.duration)) {
        handleMetadata();
      }
      
      video.addEventListener('loadedmetadata', handleMetadata);
      return () => {
        video.removeEventListener('loadedmetadata', handleMetadata);
      };
    }
  }, [media?.url, media?.type, setDuration]);

  // Handle play/pause state changes
  useEffect(() => {
    const video = mediaRef.current;
    if (video && media?.type === 'video') {
      if (isPlaying) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Error playing video:", error);
            setIsPlaying(false); // Reset playing state if playback fails
          });
        }
      } else {
        video.pause();
      }
    }
  }, [isPlaying, media?.type, setIsPlaying]);

  // Reset when media source changes
  useEffect(() => {
    const video = mediaRef.current;
    if (video && media?.url) {
      // Reset to beginning when source changes
      if (media?.type === 'video') {
        video.currentTime = 0;
        setCurrentTime(0);
        setIsPlaying(false);
        
        // Loading event for new video
        const handleLoaded = () => {
          setCurrentTime(0);
          if (video.duration && !isNaN(video.duration)) {
            setDuration(video.duration);
          }
        };
        
        video.addEventListener('loadeddata', handleLoaded);
        return () => {
          video.removeEventListener('loadeddata', handleLoaded);
        };
      }
    }
  }, [media?.url, media?.type, setCurrentTime, setDuration, setIsPlaying]);

  const handleMouseDown = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if clicked on resize handle
    if (
      x >= mediaProperties.x + mediaProperties.width - 20 &&
      x <= mediaProperties.x + mediaProperties.width + 10 &&
      y >= mediaProperties.y + mediaProperties.height - 20 &&
      y <= mediaProperties.y + mediaProperties.height + 10
    ) {
      resizeHandle.current = { 
        startWidth: mediaProperties.width,
        startHeight: mediaProperties.height
      };
      return;
    }

    // Check if clicked on media
    if (
      x >= mediaProperties.x &&
      x <= mediaProperties.x + mediaProperties.width &&
      y >= mediaProperties.y &&
      y <= mediaProperties.y + mediaProperties.height
    ) {
      isDragging.current = true;
      dragStart.current = {
        x: x - mediaProperties.x,
        y: y - mediaProperties.y
      };
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current && !resizeHandle.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isDragging.current) {
      setMediaProperties(prev => ({
        ...prev,
        x: x - dragStart.current.x,
        y: y - dragStart.current.y
      }));
    } else if (resizeHandle.current) {
      const newWidth = Math.max(50, x - mediaProperties.x);
      const newHeight = Math.max(50, y - mediaProperties.y);
      
      setMediaProperties(prev => ({
        ...prev,
        width: newWidth,
        height: newHeight
      }));
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    resizeHandle.current = null;
  };

  return (
    <div 
      className="editor-canvas"
      style={{
        position: 'relative',
        width: '100%',
        height: '500px',
        backgroundColor: '#f8f9fa',
        border: '1px dashed #ccc',
        overflow: 'hidden',
        cursor: isDragging.current ? 'grabbing' : 'default'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {media && (
        <div
          style={{
            position: 'absolute',
            left: `${mediaProperties.x}px`,
            top: `${mediaProperties.y}px`,
            width: `${mediaProperties.width}px`,
            height: `${mediaProperties.height}px`,
            border: '2px solid #3b82f6',
            boxSizing: 'border-box'
          }}
        >
          {media.type === 'video' ? (
            <video
              ref={mediaRef}
              src={media.url}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
              controls={false}
              preload="auto"
            />
          ) : media.type === 'image' ? (
            <img
              ref={mediaRef}
              src={media.url}
              alt="Uploaded media"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
            />
          ) : null}
          <div
            style={{
              position: 'absolute',
              right: '0',
              bottom: '0',
              width: '20px',
              height: '20px',
              backgroundColor: '#3b82f6',
              cursor: 'nwse-resize',
              borderTopLeftRadius: '4px'
            }}
          />
        </div>
      )}
    </div>
  );
});

Editor.displayName = 'Editor';

export default Editor;