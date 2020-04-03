import { CorreosUiInput } from './correos-ui-input';
import { newSpecPage, SpecPage } from '@stencil/core/dist/testing';

/**
 * x - El componente se ha instanciado
 * x - El componente se ha renderizado
 * x - Se añade el slot con el icono izquierdo
 * x - Si el padre me cambia una propiedad css el boton lo recibe
 * x - Analizar las propiedades y eventos
 * x - Cumple con la accesiblidad AA
 * 
 * x - Texto de ayuda se muestra correctamente
 * x - Se marca correctamente el input como invalido
 * x - Input invalido muestra error en texto de ayuda
 * x - Pattern y atributos de restricción funcionan
 * 
 * x - Modifica el valor correctamente
 * x - El listado de opciones se renderiza
 * x - Se modifica el valor al seleccionar una opción del listado
 * x - Se filtran las opciones del listado según valor actual
 * 
 * x - Trasmite su valor a formulario padre
 * x - Cumple con la accesiblidad AA
 */



describe('When the component is instantiated', () => {

  let component;
  let page: SpecPage;
  beforeEach(async () => {
    // newSpecPage permite renderizar el componente como lo mostraria el navegador
    page = await newSpecPage({
      components: [CorreosUiInput],
      html: `<correos-ui-input></correos-ui-input>`
    });
    component = await page.doc.querySelector('correos-ui-input');
  });
3
  it('El componente se ha instanciado', () => {
    expect(new CorreosUiInput()).toBeTruthy();
  });

  // it('Modifica el valor correctamente', async () => {
  //   // let callbackFn = jest.fn();
  //   // //page.doc.addEventListener('onchange', callbackFn);
  //   // //const asd = await component.shadowRoot.querySelector('.correos-ui-input_root');
  //   // //console.log(asd);
  //   // expect(page).toEqualHtml(`asd`);
  //   // const input = component.shadowRoot.querySelector('input');
  //   // input.setAttribute('value','Ma');
  //   // await page.waitForChanges();
  //   // expect(callbackFn).toHaveBeenCalled();
  // });
});
