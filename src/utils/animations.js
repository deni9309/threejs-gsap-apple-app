import React from 'react'
import * as THREE from 'three'

/**
 * @param {gsap.core.Timeline} timeline
 * @param {React.MutableRefObject<THREE.Group<THREE.Object3DEventMap>>} rotationRef
 * @param {number} rotationState
 * @param {string} firstTarget
 * @param {string} secondTarget
 * @param {gsap.TweenVars} animationProps
 */
export const animateWithGsapTimeline = (
  timeline,
  rotationRef,
  rotationState,
  firstTarget,
  secondTarget,
  animationProps,
) => {
  timeline.to(rotationRef.current.rotation, {
    y: rotationState,
    duration: 1,
    ease: 'power2.inOut',
  })

  timeline.to(firstTarget, { ...animationProps, ease: 'power2.inOut' }, '<')
  timeline.to(secondTarget, { ...animationProps, ease: 'power2.inOut' }, '<')
}
