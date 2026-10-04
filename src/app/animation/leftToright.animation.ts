// slide-left-to-right.animation.ts
import { createAnimation, Animation } from '@ionic/angular';

export const slideLeftToRightAnimation = (baseEl: HTMLElement, opts?: any): Animation => {
  const enteringEl = opts.enteringEl;
  const leavingEl = opts.leavingEl;

  const rootAnimation = createAnimation();

  const enteringPage = createAnimation()
    .addElement(enteringEl)
    .fill('both')
    .beforeStyles({ 'z-index': '100', 'display': 'block' })
    .fromTo('transform', 'translateX(-100%)', 'translateX(0%)')
    .fromTo('opacity', '0.5', '1');

  const leavingPage = createAnimation()
    .addElement(leavingEl)
    .fill('both')
    .beforeStyles({ 'z-index': '101', 'display': 'block' })
    .fromTo('transform', 'translateX(0%)', 'translateX(100%)')
    .fromTo('opacity', '1', '0')
    .afterStyles({ 'display': 'none' });

  return rootAnimation
    .addAnimation([enteringPage, leavingPage])
    .duration(300)
    .easing('cubic-bezier(0.36,0.66,0.04,1)');
};