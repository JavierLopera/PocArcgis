import ResizeObserver from "resize-observer-polyfill";
import { getElement } from "@stencil/core";
/**
 * Resize element observer
 */
export function ElementSizeListener() {

  return (proto: any, prop: string) => {
    console.log(prop,proto);
    const { componentDidLoad, componentDidUnload} = proto;

    proto.componentDidLoad = function() {
      const elementRef: any = getElement(this);
      if (componentDidLoad) {
        this.__break = '';
        this.__resizeObserver = new ResizeObserver(entries => {
          let newBreak: string;
          if (entries[0].contentRect.width <= 640 ) newBreak = 'sm';
          else if (entries[0].contentRect.width <= 1312 ) newBreak = 'md';
          else newBreak = 'lg';
          if (this.__break !== newBreak) {
            console.log('NEW SIZE:', this.__break);
            this.__break = newBreak;
            elementRef.setAttribute('size', this.__break)
          }
        })
        .observe(elementRef);

        return componentDidLoad.apply(this);
      }

    };

    proto.componentDidUnload = function() {
      if (componentDidUnload && this.__resizeObserver) {
        console.log(this)
        this.__resizeObserver.disconnect();
        return componentDidUnload.apply(this);
      }
    }
  };

}