import { createAnimation, Animation } from '@ionic/angular';

export const createButtonCollapseAnimation = (
  baseEl: HTMLElement,
  opts?: any
): Animation => {
  const enteringEl = opts.enteringEl;
  const leavingEl = opts.leavingEl;

  // Retrieve origin coordinates (defaults to screen center if non-existent)
  const clickX = opts.animationBuilderOpts?.x ?? window.innerWidth / 2;
  const clickY = opts.animationBuilderOpts?.y ?? window.innerHeight / 2;

  const rootAnimation = createAnimation();

  // Current page shrinks down and fades out towards the point
  const leavingPage = createAnimation()
    .addElement(leavingEl)
    .fill('both')
    .beforeStyles({ 'transform-origin': `${clickX}px ${clickY}px`, 'z-index': '101','display': 'block'})
    .fromTo('opacity', '1', '0')
    .fromTo('transform', 'scale(1)', 'scale(0.05)')
    .afterStyles({ 'display': 'none' });

  // Previous page underneath fades back to full opacity
  const enteringPage = createAnimation()
    .addElement(enteringEl)
    .beforeStyles({ 
      'display': 'block', 
      'z-index': '100' 
    })
    .fromTo('opacity', '0', '1');

  return rootAnimation
    .addAnimation([enteringPage, leavingPage])
    .duration(300)
    .easing('cubic-bezier(0.36,0.66,0.04,1)');
};