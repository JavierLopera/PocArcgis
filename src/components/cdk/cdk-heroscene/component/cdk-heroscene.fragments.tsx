import { FunctionalComponent, h } from '@stencil/core';

export interface ICDKHeroSceneDecorativeEnd {
  className?: string
  color?: string;
}

/** Decorative end for page sections
 * @prop color - color for decorative element (any CSS valid value);
 * @prop className - class names as string;
 */
export const CDKHeroSceneDecorativeEnd: FunctionalComponent<ICDKHeroSceneDecorativeEnd> = ({ className, color }) =>
  <svg class={className} style={{ 'pointer-events': 'none' }}
    viewBox="0 0 100 36">
    <path class="path" d="M00 30 Q 50 40 100 30 L100 60 L0 60 Z" fill={color ? color : 'white'}></path>
  </svg>