import { FunctionalComponent, h } from '@stencil/core';

export interface ICDKCoreHeaderBrandLogo {
  /** Path to image */
  src: string;
}

export const CDKCoreHeaderBrandLogo: FunctionalComponent<ICDKCoreHeaderBrandLogo> = ({ src }) =>
  <div class="cdk-header-logo-container">
    <img class="cdk-header-logo" src={src} alt="logo"/>
  </div>