"use client";
import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { useTimeContext } from '@/app/contexts/TimeContext';

const Editor = forwardRef(({ media, mediaProperties, setMediaProperties, isPlaying, currentTime }, ref) => {
  const mediaRef = useRef(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const resizeHandle = useRef(null);
  const lastPlayState = useRef(false);
  const { setCurrentTime: setContextTime } = useTimeContext();

  // Use useImperativeHandle to properly expose the media element
  useImperativeHandle(ref, () => mediaRef.current, []);

  // Add timeupdate event listener directly to ensure time tracking works
  useEffect(() => {
    const video = mediaRef.current;
    if (video && media?.type === 'video') {
      const handleTimeUpdate = () => {
        if (video.currentTime !== undefined) {
          setContextTime(video.currentTime);
        }
      };
      
      video.addEventListener('timeupdate', handleTimeUpdate);
      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [media?.type, setContextTime]);

  useEffect(() => {
    const video = mediaRef.current;
    if (video && media?.type === 'video') {
      // Set current time if needed first, then handle play/pause
      if (currentTime !== undefined && Math.abs(video.currentTime - currentTime) > 0.5) {
        try {
          video.currentTime = currentTime;
        } catch (error) {
          console.error("Error setting current time:", error);
        }
      }

      if (isPlaying) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Error playing video:", error);
          });
        }
        lastPlayState.current = true;
      } else {
        video.pause();
        lastPlayState.current = false;
      }
    }
  }, [isPlaying, currentTime, media?.type]);

  // Handle dimension changes without affecting playback
  useEffect(() => {
    const video = mediaRef.current;
    if (video && media?.type === 'video' && lastPlayState.current) {
      // Small timeout to ensure DOM updates complete before playing
      setTimeout(() => {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Error resuming video after resize:", error);
          });
        }
      }, 50);
    }
  }, [mediaProperties.width, mediaProperties.height, media?.type]);

  // Add effect to handle media source changes
  useEffect(() => {
    const video = mediaRef.current;
    if (video && media?.type === 'video') {
      // Set initial state when video source changes
      video.currentTime = 0;
      lastPlayState.current = false;
    }
  }, [media?.url]);

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
      
      // Use requestAnimationFrame for smoother updates
      requestAnimationFrame(() => {
        setMediaProperties(prev => ({
          ...prev,
          width: newWidth,
          height: newHeight
        }));
      });
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