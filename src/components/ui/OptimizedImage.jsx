import React, { useState } from 'react'
import Skeleton from './Skeleton'

const OptimizedImage = ({
  src,
  alt = '',
  className = '',
  placeholder, // can be an LQIP/base64 or small image URL
  lqip, // alias
  priority = false,
  animatedHighlight = true,
  useSkeleton = false,
  srcSet,
  sizes,
  generateSrcSet = true,
  srcWidths = [320, 480, 768, 1024, 1366, 1600, 2000],
  onClick,
}) => {
  const [loaded, setLoaded] = useState(false)

  const handleLoad = () => setLoaded(true)

  const effectivePlaceholder = lqip || placeholder
  // Helper: generate srcSet by replacing `w=` query parameter when present
  const buildSrcSetFromQuery = (inputSrc) => {
    try {
      if (!inputSrc || !/\bw=\d+\b/.test(inputSrc)) return null
      const set = srcWidths
        .map((w) => inputSrc.replace(/(\bw=)\d+\b/, `$1${w}`) + ` ${w}w`)
        .join(', ')
      return set
    } catch (e) {
      return null
    }
  }

  let generatedSrcSet = null
  let renderError = false
  try {
    generatedSrcSet = generateSrcSet ? buildSrcSetFromQuery(src) : null
  } catch (e) {
    console.error('OptimizedImage: failed to generate srcSet', e)
    // mark render error but continue to render placeholder
    renderError = true
  }

  if (renderError) {
    return (
      <div className={`relative overflow-hidden ${className}`} onClick={onClick} role="img" aria-label={alt} aria-busy={!loaded}>
        <div className="absolute inset-0 bg-slate-100" />
        <img src={effectivePlaceholder || ''} alt={alt} className="w-full h-full object-cover" />
      </div>
    )
  }

  return (
    <div
      className={`overflow-hidden ${className}`}
      onClick={onClick}
      role="img"
      aria-label={alt}
      aria-busy={!loaded}
    >
      {/* Placeholder layer (blur or solid) */}
      {effectivePlaceholder ? (
        <div
          aria-hidden
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${loaded ? 'opacity-0' : 'opacity-100'}`}
          style={{ backgroundImage: `url(${effectivePlaceholder})` }}
        />
      ) : (
        <div className={`absolute inset-0 transition-opacity duration-700 ${loaded ? 'opacity-0' : 'opacity-100'}`} style={{ backgroundColor: '#f3f4f6' }} />
      )}

      {useSkeleton && !loaded && (
        <div className="absolute inset-0 p-2">
          <Skeleton className="h-full w-full" />
        </div>
      )}

      <img
        src={src}
        srcSet={srcSet || generatedSrcSet}
        sizes={sizes}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={`w-full h-full object-cover transform transition-all duration-700 ease-out ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-102'} ${animatedHighlight ? 'hover:scale-105' : ''}`}
        onLoad={handleLoad}
        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = effectivePlaceholder || '' }}
      />
    </div>
  )
}

export default OptimizedImage
