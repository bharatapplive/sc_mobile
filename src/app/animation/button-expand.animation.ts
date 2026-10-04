import { createAnimation, Animation } from '@ionic/angular';

export const createButtonExpandAnimation = (
  baseEl: HTMLElement,
  opts?: any
): Animation => {
  const enteringEl = opts.enteringEl;
  const leavingEl = opts.leavingEl;

  // Fetch coordinates passed via navigation options
  const clickX = opts.animationBuilderOpts?.x ?? window.innerWidth / 2;
  const clickY = opts.animationBuilderOpts?.y ?? window.innerHeight / 2;

  const rootAnimation = createAnimation();

  // Animate incoming page from button center
  const enteringPage = createAnimation()
    .addElement(enteringEl)
    .fill('both')
    .beforeStyles({ 'transform-origin': `${clickX}px ${clickY}px` })
    .fromTo('opacity', '0', '1')
    .fromTo('transform', 'scale(0.05)', 'scale(1)');

  // Fade out leaving page slightly
  const leavingPage = createAnimation()
    .addElement(leavingEl)
    .fromTo('opacity', '1', '0');

  return rootAnimation
    .addAnimation([enteringPage, leavingPage])
    .duration(350)
    .easing('cubic-bezier(0.36,0.66,0.04,1)');
};