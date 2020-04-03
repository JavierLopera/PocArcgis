// import { E2EPage, E2Ecomponent, newE2EPage } from '@stencil/core/testing';
import { UiIconButton } from './correos-ui-icon-button';
import { newSpecPage, SpecPage } from '@stencil/core/dist/testing';

/**
 * - Analizar que el componente se ha instanciado
 * - Analizar que el componente se ha renderizado
 * - Analizar la propiedad disabled
 * - Analizar que se añade el slot del texto
 * - Analizar que se añade el slot con el icono izquierdo
 * - Analizar que se añade el slot con el icono derecho
 * - Analizar que si el padre me cambia una propiedad css el boton lo recibe
 * 
 * - El componente se ha instanciado: Necesita un aria-role???
 * - El componente se ha renderizado
 * - Estado disable: No se puede hacer click / Tiene el color adecuado / Cumple con la accesibilidad AA
 * - Estado con icono a la izquierda: Existe el icono / cumple la accesibilidad
 * - Estado con icono a la derecha: Existe el icono / cumple la accesibilidad
 * - Se puede cambiar el texto
 * - Estado activo: se puede hacer click / tiene el color establecido / Tiene el hover adecuado /
 * - Cumple la accesibilidad AA / ¿Se puede analizar el ripple?
 * - Comportamiento en un formulario: Type?
 * - Comportamiento con dos botones: Cumple AA? / tiene un id asignado para la accesibilidad
 * - Cuando se instancia el correos-button: se puede hacer onclick y se llama a la funcion
 */

describe('Correos icon button test', () => {

  it('When the component is instantiated', () => {
    expect(new UiIconButton()).toBeTruthy();
  });

  describe('When the component is rendered', () => {

    let component;
    let page: SpecPage;
    beforeEach(async () => {
      // newSpecPage permite renderizar el componente como lo mostraria el navegador
      page = await newSpecPage({
        components: [UiIconButton],
        html: `<correos-ui-icon-button></correos-ui-icon-button>`
      });
      component = await page.doc.querySelector('correos-ui-icon-button');
    });

    it('When the button is disabled', async () => {

      /**** Se setea la propiedad disabled ****/
      expect(component.disabled).toBeUndefined;
      component.disabled = false;
      await page.waitForChanges();
      expect(component.disabled).toBeFalsy;
      component.disabled = true;
      await page.waitForChanges();
      expect(component.disabled).toBeTruthy;
      expect(page.root).toEqualHtml(`
        <correos-ui-icon-button>
          <mock:shadow-root>
            <button class="mdc-fab mdc-fab--mini" disabled="">
              <div class="mdc-fab__ripple"></div>
              <slot name="icon"></slot>
            </button>
          </mock:shadow-root>
        </correos-ui-icon-button>`
      );
    });
    it('When the button set hte aria label', async () => {

      /**** Se setea la propiedad ariaLabel ****/
      expect(component.ariaLabel).toBeUndefined;
      component.ariaLabel = 'favorito';
      await page.waitForChanges();
      expect(component.ariaLabel).toEqual('favorito');
      expect(page.root).toEqualHtml(`
        <correos-ui-icon-button>
          <mock:shadow-root>
            <button aria-label="favorito" class="mdc-fab mdc-fab--mini">
              <div class="mdc-fab__ripple"></div>
              <slot name="icon"></slot>
            </button>
          </mock:shadow-root>
        </correos-ui-icon-button>`
      );
    });

    it("when the left icon is injected", async () => {
      page.setContent('<correos-ui-icon-button><i slot="icon" class="ico_download"></i></i></correos-ui-icon-button>');
      await page.waitForChanges();
      expect(page.root.querySelector('.ico_download').className).toBe('ico_download');
      expect(page.root).toEqualHtml(`
      <correos-ui-icon-button>
        <mock:shadow-root>
          <button class=\"mdc-fab mdc-fab--mini\">
            <div class=\"mdc-fab__ripple\"></div>
            <slot name=\"icon\"></slot>
          </button>
        </mock:shadow-root>
        <i class=\"ico_download\" slot=\"icon\"></i>
      </correos-ui-icon-button>
        `
      );
    });

   

  });
});

