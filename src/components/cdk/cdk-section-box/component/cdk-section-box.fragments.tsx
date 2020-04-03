import { FunctionalComponent, h } from '@stencil/core';

export interface ICDKSectionBoxDecorative {
  className?: string
  color?: string;
}

/** Decorative start for page sections
 * @prop color - color for decorative element (any CSS valid value);
 * @prop className - class names as string;
 */
export const CDKSectionBoxDecorativeStart: FunctionalComponent<ICDKSectionBoxDecorative> = ({ className, color }) =>
  <svg class={className} style={{ 'pointer-events': 'none' }}
    viewBox="10 0 75 10">
    <path class="path" d="M0,0 C0,10 100,10 100,0" fill={color ? color : 'transparent'}></path>
  </svg>

/** Decorative end for page sections
 * @prop color - color for decorative element (any CSS valid value);
 * @prop className - class names as string;
 */
export const CDKSectionBoxDecorativeEnd: FunctionalComponent<ICDKSectionBoxDecorative> = ({ className, color }) =>
  <svg class={className} style={{ 'pointer-events': 'none' }}
    viewBox="0 0 100 36">
    <path class="path" d="M00 30 Q 50 40 100 30 L100 60 L0 60 Z" fill={color ? color : 'transparent'}></path>
  </svg>