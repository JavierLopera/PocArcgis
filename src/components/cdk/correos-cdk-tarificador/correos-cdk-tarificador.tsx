import { Component, h, getAssetPath, State, Event, Host, EventEmitter } from '@stencil/core';
import { ElementSizeListener } from '@app/utils';

@Component({
    tag: 'correos-cdk-tarificador',
    styleUrl: 'correos-cdk-tarificador.scss',
    shadow: true
})
export class CorreosCdkTarificador {
    /**
     * Valor (requerido) minimo requerido para realizar un envío
	 */
    // @Prop() price: string;

    @ElementSizeListener()

    @State() valueDesde: string;
    @State() valueHasta: string;
    @State() valueQue: string;
    @State() valueCuantos: string;
    @State() disabledform: boolean;

    @Event() eventChange: EventEmitter;

    submitResult;

    // componentDidLoad() {
    //     this.rippleButtonElement.addEventListener ('invalid', () => {
    //         console.log(this.rippleButtonElement.onInvalid());
    //     });
    // }

    handleSubmit(e) {
			debugger;
        // console.log(this.rippleButtonElement);
        e.preventDefault();
        // console.log('submit');
				// console.log(e);
				console.log(this.valueDesde);
        this.submitResult = {
            input1: this.valueDesde,
            input2: this.valueHasta,
            input3: this.valueQue,
            input4: this.valueCuantos
        }
        console.log(this.submitResult);
        this.eventChange.emit(this.submitResult);
    }

    handleChangeDesde(event) {
        console.log(event);
        console.log(event.target.value);
        console.log(event.target);

        // console.log(event.target.validity);
        this.valueDesde = event.value;
        console.log('entrodesde');
        console.log(this.valueDesde);

        if (event.validity.patternMismatch) {
            console.log('this element is not valid')
        }
    }

    handleChangeHasta(event) {
        this.valueHasta = event.target.value;
        console.log('entroHasta');
        console.log(this.valueHasta);

        if (event.target.validity.typeMismatch) {
            console.log('this element is not valid')
        }
    }

    handleChangeQue(event) {
        this.valueQue = event.target.value;
        console.log('entroQue');
        console.log(this.valueQue);

        if (event.target.validity.typeMismatch) {
            console.log('this element is not valid')
        }
    }

    handleChangeCuantos(event) {
        this.valueCuantos = event.target.value;
        console.log('entroCuantos');
        console.log(this.valueCuantos);

        if (event.target.validity.typeMismatch) {
            console.log('this element is not valid')
        }
    }

    rippleButtonElement!: HTMLFormElement;
    render() {
        return (
            <Host class="wrapper-main1">
                <link rel="stylesheet" href={getAssetPath('./wc-ui.css')}></link>
                <slot name="title" />

                <form onSubmit={(e) => this.handleSubmit(e)} ref={el => this.rippleButtonElement = el as HTMLFormElement}>
                {/* <form> */}
                    <div class="section">
                        <correos-ui-input
                            label="Desde"
                            type="email"
                            // required
                            value={this.valueDesde} onInput={(e) => this.handleChangeDesde(e)}
                        >
                        </correos-ui-input>
                        <correos-ui-input
                            label="Hasta"
                            pattern="^[a-zA-Z0-9]+$"
                            type="number"
                            // onTodoCompleted = {(e) =>{console.log(e)}}
                            // required
                            value={this.valueHasta} onInput={(e) => this.handleChangeHasta(e)}
                        >
                        </correos-ui-input>
                    </div>
                    <div class="second">
                        <correos-ui-input class="aaa"
                            label="Qué"
                            // pattern="^[a-zA-Z0-9]+$"
                            type="number"
                            // required
                            value={this.valueQue} onInput={(e) => this.handleChangeQue(e)}
                        >
                        </correos-ui-input>
                        <correos-ui-input class="aaa"
                            label="Cuántos"
                            // pattern="^[a-zA-Z0-9]+$"
                            type="number"
                            // required
                            value={this.valueCuantos} onInput={(e) => this.handleChangeCuantos(e)}
                        >
                        </correos-ui-input>
                    </div>
                    <slot name="minimo" />
                    <correos-ui-button class="button-submit"
                        // primary
                        disabled={this.disabledform}
                        type="submit"
                        aria-disabled="false"
                        onClick={(e) => this.handleSubmit(e)}
                    >
                        <span slot="text">Calcula tu tarifa</span>
                    </correos-ui-button>
                    <button type="submit">Holaaa</button>
                </form>
            </Host>
        );
    }

}

