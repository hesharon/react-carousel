import { useState, useEffect, useRef } from 'react'
import { isMobileOrTablet } from '../../data/browser'

const Carousel = ({ children, id }) => {
  const [currentIndex, setCurrentIndex] = useState(1)
  const [lastTouch, setLastTouch] = useState(0)
  const [movement, setMovement] = useState(0)
  const [transitionDuration, setTransitionDuration] = useState('')
  const [transitionTimeout, setTransitionTimeout] = useState(null)
  const [imgWidth, setImgWidth] = useState(0)
  const [images, setImages] = useState([children[children.length - 1], ...children, children[0]])
  const carouselRef = useRef(null)

  useEffect(() => {
    document.getElementById(id).addEventListener('touchstart', () => false, { passive: false }) // Safari has problems with pinpointing where to listen for touch events, so this fixes it

    window.addEventListener('resize', setImageWidth, { passive: false })    // Keeps track of image size as screen resizes
    return () => {
      window.removeEventListener('resize', setImageWidth, { passive: false })
      clearTimeout(transitionTimeout)
    }
  }, [])

  useEffect(
    () => {
      setImgWidth(carouselRef.current.offsetWidth)
      setMovement(currentIndex * carouselRef.current.offsetWidth)
    },
    [carouselRef.current && carouselRef.current.offsetWidth]
  )

  const setImageWidth = () => {
    setImgWidth(carouselRef.current && carouselRef.current.offsetWidth)
  }

  const transitionTo = (index, duration) => {
    setCurrentIndex(index)
    setMovement(index * imgWidth)
    setTransitionDuration(`${duration}s`)

    setTransitionTimeout(
      setTimeout(() => {
        setTransitionDuration('0s')
      }, duration * 100))
  }

  const handleMovementEnd = () => {
    const endPosition = movement / imgWidth
    const endPartial = endPosition % 1
    const endingIndex = endPosition - endPartial
    const deltaInteger = endingIndex - currentIndex

    let nextIndex = endingIndex

    if (deltaInteger >= 0) {
      if (endPartial >= 0.1) {
        nextIndex++
      }
    } else if (deltaInteger < 0) {
      nextIndex = currentIndex - Math.abs(deltaInteger)
      if (endPartial > 0.9) {
        nextIndex++
      }
    }

    transitionTo(nextIndex, Math.min(0.5, 1 - Math.abs(endPartial)))
  }

  const handleMovement = delta => {
    clearTimeout(transitionTimeout)

    setMovement(movement + delta)
    setTransitionDuration('0s')
  }

  const handleTouchStart = event => setLastTouch(event.nativeEvent.touches[0].clientX)

  const handleTouchMove = event => {
    const delta = lastTouch - event.nativeEvent.touches[0].clientX
    setLastTouch(event.nativeEvent.touches[0].clientX)
    handleMovement(delta)
  }

  const handleTouchEnd = () => {
    handleMovementEnd()
    setLastTouch(0)
  }

  const handleTransitionEnd = () => {
    if (currentIndex > children.length) {
      setCurrentIndex(1)
      setMovement(1 * imgWidth)
    } else if (currentIndex === 0) {
      setCurrentIndex(children.length)
      setMovement(children.length * imgWidth)
    }
  }

  return (
    <div className="carousel-main">
      <div
        className="carousel-container"
        ref={carouselRef}
        id={id}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}>
        <div
          className="carousel"
          onTransitionEnd={() => handleTransitionEnd()}
          style={{
            transform: `translateX(${movement * -1}px)`,
            transitionDuration
          }}>
          {images.map((image, index) => (
            <div key={`slide-${index}`} style={{ minWidth: '100%' }} className="slide">
              {image}
            </div>
          ))}
        </div>
        {!isMobileOrTablet() && (   // Implementation of this function in data/browser.js
          <div>
            <button className="back move" onClick={() => transitionTo(currentIndex - 1, 0.5)}>
              <img src="/icons/chevron-left.svg" width="10px" />
            </button>
            <button className="next move" onClick={() => transitionTo(currentIndex + 1, 0.5)}>
              <img src="/icons/chevron-right.svg" width="10px" />
            </button>
          </div>
        )}
      </div>
      <div className="bullets">
        {[...Array(children.length)].map((bullet, index) => (
          <div
            key={`bullet-${index}`}
            className={`dot ${currentIndex - 1 === index && 'red-dot'}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel
