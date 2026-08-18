import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { ValidationErrors } from '@angular/forms';
import { signal } from '@angular/core';
import { AuthFacade } from '../../../core/facades/auth.facade';
import { CarrinhoFacade } from '../../../core/facades/carrinho.facade';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  
  carrinhoFacade = inject(CarrinhoFacade);

  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3), nomeSemNumeros]),
    email: new FormControl('',[Validators.required, Validators.email]),
    endereco: new FormControl('',[Validators.required, Validators.minLength(5)]), 
  });

  finalizar (){
    this.compraFinalizada.set(false);
    if(this.carrinhoFacade.carrinhoVazio()){
      console.log('Não é possível finalizar a compra com o carrinho vazio!');
      return;
    }
    if(this.formulario.invalid){
      console.log('Formulário inválido!');
      this.formulario.markAllAsTouched();
      return;
    }
    const dados = this.formulario.value;
    const itens = this.carrinhoFacade.itensCarrinho();
    const total = this.carrinhoFacade.totalCarrinho();

    console.log('Compra finalizada com sucesso');
    console.log('Dados do formulário', dados);
    console.log('Itens do carrinho', itens);
    console.log('Total da compra:', total);

    this.carrinhoFacade.limparCarrinho();
    this.formulario.reset();
    this.compraFinalizada.set(true);
    
  }

compraFinalizada = signal (false)

}

function nomeSemNumeros(control: AbstractControl): ValidationErrors | null {
  const valor = control.value;
  if (!valor) return null;

  if (/\d/.test(valor)){
    return {numeroInvalido: true};
  }
  return null;
}
