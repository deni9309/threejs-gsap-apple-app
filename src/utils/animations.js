import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import React from 'react'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

/**
 *
 * @param {gsap.TweenTarget} target
 * @param {gsap.TweenVars} animationProps
 * @param {ScrollTrigger.Vars} scrollProps
 */
export const animateWithGsap = (target, animationProps, scrollProps) => {
  gsap.to(target, {
    ...animationProps,
    scrollTrigger: {
      trigger: target,
      toggleActions: 'restart reverse restart reverse',
      start: 'top 85%',
      ...scrollProps,
    },
  })
}

/**
 * @param {gsap.core.Timeline} timeline
 * @param {React.MutableRefObject<THREE.Group<THREE.Object3DEventMap>>} rotationRef
 * @param {number} rotationState
 * @param {gsap.TweenTarget} firstTarget
 * @param {gsap.TweenTarget} secondTarget
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
