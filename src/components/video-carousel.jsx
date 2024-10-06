import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useGSAP } from '@gsap/react'
import { useEffect, useRef, useState } from 'react'

import { hightlightsSlides } from '../constants'
import { cn, pauseImg, playImg, replayImg } from '../utils'

gsap.registerPlugin(ScrollTrigger)

const VideoCarousel = () => {
  const videoRef = useRef([])
  const videoSpanRef = useRef([])
  const videoDivRef = useRef([])

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  })
  const [loadedData, setLoadedData] = useState([])

  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video

  useGSAP(() => {
    gsap.to('#slider', {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: 'power2.inOut',
    })
    gsap.to('#video', {
      scrollTrigger: {
        trigger: '#video',
        toggleActions: 'restart none none none',
      },
      onComplete: () => {
        setVideo((prev) => ({ ...prev, startPlay: true, isPlaying: true }))
      },
    })
  }, [isEnd, videoId])

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause()
      } else {
        startPlay && videoRef.current[videoId].play()
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData])

  const handleLoadedMetadata = (i, e) => {
    setLoadedData((prev) => [...prev, e])
  }

  useEffect(() => {
    let currentProgress = 0
    let span = videoRef.current

    if (span[videoId]) {
      // animation to move the indicator
      let animation = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(animation.progress() * 100) // get the progress of the video

          if (progress !== currentProgress) {
            currentProgress = progress

            // set the width of the progress bar
            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? '10vw' // mobile
                  : window.innerWidth < 1200
                    ? '10vw' // tablet
                    : '4vw', // laptop
            })

            // set the background color of the progress bar
            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: 'white',
            })
          }
        },
        // when the video is ended, replace the progress bar with the indicator and change the background color
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], { width: '12px' })
            gsap.to(span[videoId], { backgroundColor: '#AFAFAF' })
          }
        },
      })

      if (videoId === 0) animation.restart()

      const animationUpdate = () => {
        animation.progress(
          videoRef.current[videoId].currentTime /
            hightlightsSlides[videoId].videoDuration,
        )
      }

      if (isPlaying) {
        gsap.ticker.add(animationUpdate) // ticker to update the progress bar
      } else {
        gsap.ticker.remove(animationUpdate) // remove the ticker when the video is paused (progress bar is stopped)
      }
    }
  }, [videoId, startPlay])

  const handleProcess = (type, i) => {
    switch (type) {
      case 'video-end':
        setVideo((prev) => ({ ...prev, isEnd: true, videoId: i + 1 }))
        break
      case 'video-last':
        setVideo((prev) => ({ ...prev, isLastVideo: true }))
        break
      case 'video-reset':
        setVideo((prev) => ({ ...prev, isLastVideo: false, videoId: 0 }))
        break
      case 'play':
      case 'pause':
        setVideo((prev) => ({
          ...prev,
          isPlaying: !prev.isPlaying,
        }))
        break
      default:
        return video
    }
  }

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div id="slider" key={list.id} className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="flex-center w-full h-full overflow-hidden rounded-3xl bg-black">
                <video
                  id="video"
                  playsInline={true}
                  muted
                  preload="auto"
                  className={cn(
                    'pointer-events-none box-border outline outline-black outline-offset-[-1px]',
                    list.id === 2 && 'translate-x-44',
                    list.id === 4 && 'translate-x-[-0.2px]',
                  )}
                  ref={(el) => (videoRef.current[i] = el)}
                  onPlay={() => {
                    setVideo((prevState) => ({ ...prevState, isPlaying: true }))
                  }}
                  onLoadedMetadata={(e) => handleLoadedMetadata(i, e)}
                  onEnded={() =>
                    i !== 3
                      ? handleProcess('video-end', i)
                      : handleProcess('video-last')
                  }
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>

              <div className="absolute z-10 top-12 left-[5%]">
                {list.textLists.map((text) => (
                  <p key={text} className="md:text-2xl text-xl font-medium">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* -- Start of Video Controls -- */}
      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              ref={(el) => (videoDivRef.current[i] = el)}
              className="relative mx-2 w-3 h-3 bg-gray-200 rounded-full cursor-pointer"
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(el) => (videoSpanRef.current[i] = el)}
              />
            </span>
          ))}
        </div>

        <button className="control-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'}
            onClick={
              isLastVideo
                ? () => handleProcess('video-reset')
                : !isPlaying
                  ? () => handleProcess('play')
                  : () => handleProcess('pause')
            }
          />
        </button>
      </div>
    </>
  )
}

export default VideoCarousel
