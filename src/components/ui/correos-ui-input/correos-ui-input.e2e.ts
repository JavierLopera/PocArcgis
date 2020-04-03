import { E2EPage, E2EElement, newE2EPage } from '@stencil/core/testing';

describe('correos-ui-input', () => {
  let page: E2EPage;  
  let elementRoot: E2EElement;
  beforeEach(async () => {
    page = await newE2EPage({
      html: `<correos-ui-input></correos-ui-input>`
    });
    elementRoot = await page.find('correos-ui-input >>> .correos-ui-input_root');
  });


  it('basic render', async () => {
    // Find in the shadow dom
    const elementField = await elementRoot.find('.mdc-text-field');
    expect(elementField).toHaveClass('mdc-text-field');

    // Icon slot tests
    const iconElement = await elementRoot.find('img.icon_added');
    expect(iconElement).toBeFalsy();
    expect(elementField).not.toHaveClass('mdc-text-field--with-preppend-icon');
    const helperElement = await elementRoot.find('.mdc-text-field-helper-text');
    expect(helperElement).not.toHaveClass('mdc-text-field--with-preppend-icon');   
  });

  
  it('render with icon', async () => {
    await page.setContent('<correos-ui-input><img slot="icon" class="icon_added" src="https://freeiconshop.com/wp-content/uploads/edd/phone-solid.png" /></correos-ui-input>');
    elementRoot = await page.find('correos-ui-input >>> .correos-ui-input_root');
    
    const iconElement = await page.find('correos-ui-input >>> img.icon_added');
    expect(iconElement).toBeDefined();
    const iconElement2 = await elementRoot.find('img.icon_added');
    expect(iconElement2).toBeDefined();
    const helperElement = await elementRoot.find('.mdc-text-field-helper-text');
    expect(helperElement).toHaveClass('mdc-text-field--with-preppend-icon');    
  });

  it('render with some props', async () => {
    // Find in the shadow dom
    const elementField = await elementRoot.find('.mdc-text-field');
    expect(elementField).toHaveClass('mdc-text-field');

    // Label
    const labelElement = await elementField.find('.mdc-floating-label');
    expect(labelElement.innerHTML).toEqual('Label');
    await (await page.find('correos-ui-input')).setProperty('label', 'Nombre');    
    await page.waitForChanges();
    const labelElement2 = await page.find('correos-ui-input >>> .mdc-floating-label');
    expect(labelElement2.innerHTML).toEqual('Nombre'); 

    // Maxlength and the character counter
    await (await page.find('correos-ui-input')).setProperty('maxlength', '10');  
    await (await page.find('correos-ui-input')).setProperty('value', 'Aa');     
    await page.waitForChanges();
    const characterCounterElement = await page.find('correos-ui-input >>> .mdc-text-field-character-counter');
    expect(characterCounterElement.innerHTML).toEqual('2 / 10'); 

    // Minlength and invalid field test    
    await (await page.find('correos-ui-input')).setProperty('minlength', '4');
    const inputElement = await page.find('correos-ui-input >>> .mdc-text-field__input');
    const iconButton = await page.find('correos-ui-input >>> .material-icons.mdc-text-field__icon');

    const onchangeSpyEvent = await inputElement.spyOnEvent('change');
    const onchangeSpyEvent2 = await inputElement.spyOnEvent('focus');
    inputElement.press("0"); 
    await page.waitForChanges(); 
    iconButton.focus(); 
    await page.waitForChanges(); 
    inputElement.focus(); 
    await page.waitForChanges();
    const inputElementInvalid = await page.find('correos-ui-input >>> .mdc-text-field__input:invalid');

    expect(onchangeSpyEvent).toHaveReceivedEventTimes(1);  
    expect(onchangeSpyEvent2).toHaveReceivedEventTimes(2);    
    expect(inputElementInvalid).toBeTruthy();
  });
});
