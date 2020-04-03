import { FunctionalComponent, h } from '@stencil/core';

export interface ICDKCoreHeaderMenuButton {
  text?: string;
}
export const CDKCoreHeaderMenuButton: FunctionalComponent<ICDKCoreHeaderMenuButton> = ({text}) =>
  <button class="cdk-header-menu-button">
    <span>{text}</span>
    <i class="icon-arrow"></i>
  </button>