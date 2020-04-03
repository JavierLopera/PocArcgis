import { UiButton } from '../component/ui-button';
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

describe('When the component is instantiated', () => {

	let component;
	let page: SpecPage;
	beforeEach(async () => {
		// newSpecPage permite renderizar el componente como lo mostraria el navegador
		page = await newSpecPage({
			components: [UiButton],
			html: `<correos-ui-button></correos-ui-button>`
		});
		component = await page.doc.querySelector('correos-ui-button');
	});


	it('should be instantiated', () => {
		expect(new UiButton()).toBeTruthy();
	});

	it('and the button is disabled, it should be disabled', async () => {
		page.setContent('<correos-ui-button disabled></correos-ui-button>');
		await page.waitForChanges();
		// expect(page.root.shadowRoot.querySelector('.mdc-button')).toBe('dff')
		expect(page.root).toEqualHtml(`
      <correos-ui-button disabled="">
         <mock:shadow-root>
           <div class="mdc-touch-target-wrapper">
             <button class="mdc-button" disabled="">
               <div class="mdc-button__ripple"></div>
               <slot name="icon-left"></slot>
               <span class="mdc-button__label">
                 <slot name="text"></slot>
               </span>
               <slot name="icon-right"></slot>
             </button>
           </div>
         </mock:shadow-root>
       </correos-ui-button>
      `);

		// let isDisabled = '';
		// const test = component = await page.doc.querySelector('correos-ui-button');
		// test.addEventListener('click', () => {
		//   isDisabled = 'isClick';
		// });
		// test.click();
		// await page.waitForChanges();
		// // Se debe esperar la accion contraria, problema con el click -- Revisar
		// expect(isDisabled).toBe('isClick');

		// let isDisabled = '';
		// const test = component = await page.root.shadowRoot.querySelector('.mdc-button');
		// const prueba = await test.spyOnEvent('click');
		// test.click();
		// await page.waitForChanges();
		// expect(prueba).toHaveReceivedEventTimes(1);
	});

	it('and the button have the property type submit', async () => {

		/**** Se setea la propiedad disabled ****/
		expect(component.type).toBeUndefined;
		component.type = 'submit';
		await page.waitForChanges();
		expect(component.type).toEqual('submit');
		expect(page.root).toEqualHtml(`
      <correos-ui-button>
        <mock:shadow-root>
          <div class=\"mdc-touch-target-wrapper\">
          <button class="mdc-button" type="submit">
              <div class=\"mdc-button__ripple\"></div>
              <slot name=\"icon-left\"></slot>
              <span class=\"mdc-button__label\">
                <slot name=\"text\"></slot>
              </span>
              <slot name=\"icon-right\"></slot>
            </button>
          </div>
        </mock:shadow-root>
      </correos-ui-button>`
		);

		let isSubmit = '';
		// const test = component = await page.root.shadowRoot.querySelector('button');
		const test = component = await page.root.shadowRoot.querySelector('.mdc-button');
		// expect(test).toEqualHtml('f');
		test.addEventListener('submit', () => {
			isSubmit = 'onSubmit';
		});
		test.click();
		await page.waitForChanges();
		// Deberia recibir onSumit
		expect(isSubmit).toBe('');

	});

	it("and the left icon is added, it should be visible", async () => {
		page.setContent('<correos-ui-button><i slot="icon-left" class="icon-download"></i></correos-ui-button>');
		await page.waitForChanges();
		expect(page.root.querySelector('.icon-download').className).toBe('icon-download');
		expect(page.root).toEqualHtml(`
      <correos-ui-button>
        <mock:shadow-root>
          <div class=\"mdc-touch-target-wrapper\">
            <button class=\"mdc-button\">
              <div class=\"mdc-button__ripple\"></div>
              <slot name=\"icon-left\"></slot>
              <span class=\"mdc-button__label\">
                <slot name=\"text\"></slot>
              </span>
              <slot name=\"icon-right\"></slot>
            </button>
          </div>
        </mock:shadow-root>
        <i class=\"icon-download\" slot=\"icon-left\"></i>
      </correos-ui-button>`);
	});

	it("and the right icon is added, it should be visible", async () => {
		page.setContent('<correos-ui-button><i slot="icon-right" class="icon-download"></i></correos-ui-button>');
		await page.waitForChanges();
		expect(page.root.querySelector('.icon-download').className).toBe('icon-download');
		expect(page.root).toEqualHtml(`
    <correos-ui-button>
      <mock:shadow-root>
        <div class=\"mdc-touch-target-wrapper\">
          <button class=\"mdc-button\">
            <div class=\"mdc-button__ripple\"></div>
            <slot name=\"icon-left\"></slot>
            <span class=\"mdc-button__label\">
              <slot name=\"text\"></slot>
            </span>
            <slot name=\"icon-right\"></slot>
          </button>
        </div>
      </mock:shadow-root>
      <i class=\"icon-download\" slot=\"icon-right\"></i>
    </correos-ui-button>`);
	});

	it("and the text of the button is modified, it should have the new value", async () => {
		page.setContent('<correos-ui-button><span slot="text">Change text</span></correos-ui-button>');
		await page.waitForChanges();
		expect(page.root.querySelector('span').innerHTML).toBe('Change text');
		expect(page.root).toEqualHtml(`
    <correos-ui-button>
      <mock:shadow-root>
        <div class=\"mdc-touch-target-wrapper\">
          <button class=\"mdc-button\">
            <div class=\"mdc-button__ripple\"></div>
            <slot name=\"icon-left\"></slot>
            <span class=\"mdc-button__label\">
              <slot name=\"text\"></slot>
            </span>
            <slot name=\"icon-right\"></slot>
          </button>
        </div>
      </mock:shadow-root>
      <span slot=\"text\">
        Change text
      </span>
    </correos-ui-button>`);
	});

	it("Permite cambiar las variables css", async () => {
		// var a = document.documentElement;
		// expect(a).toBe('ss');
		// const aa = getComputedStyle(page.root.shadowRoot.querySelector('.mdc-button')).getPropertyValue('--ui-button-bg-color-hover');
		// expect(aa).toBe('ddd');
	});

});

