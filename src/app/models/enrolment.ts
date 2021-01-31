import { DocumentReference } from '@angular/fire/firestore';

export class Enrolment{
    id: string;
    dateStart: Date;
    dateFinal: Date;
    customer: DocumentReference;
    price_typeEnrolment: DocumentReference;
    subtotal: number;
    iva: number;
    discount: number;
    total: number;
    ref: DocumentReference;

    constructor() {
        this.id = this.id;
        this.dateStart = null;
        this.dateFinal = null;
        this.customer = this.customer;  
        this.price_typeEnrolment = this.price_typeEnrolment;
        this.subtotal = this.subtotal;
        this.iva = this.iva;
        this.discount = this.discount;
        this.total = this.total;
        this.ref = this.ref;
    }

    validate(): any{
        let result = {
            isValid: false,
            message: ''
        }
        
        if(this.customer == null || this.customer == undefined){
            result.isValid = false;
            result.message = 'No ha seleccionado al cliente';
            return result;
        }

        if(this.price_typeEnrolment == null || this.price_typeEnrolment == undefined){
            result.isValid = false;
            result.message = 'No ha seleccionado la actividad.';
            return result;
        }

        if(this.dateStart == null || this.dateStart == undefined){
            result.isValid = false;
            result.message = 'No se puede leer la fecha de inicio.';
            return result;
        }

        if(this.dateFinal == null || this.dateFinal == undefined){
            result.isValid = false;
            result.message = 'No se puede leer la fecha de final.';
            return result;
        }

        if(this.subtotal <= 0 || this.subtotal == undefined){
            result.isValid = false;
            result.message = 'No se ha podido calcular el subtotal.';
            return result;
        }

        if(this.iva <= 0 || this.iva == undefined){
            result.isValid = false;
            result.message = 'No se ha podido calcular el iva.';
            return result;
        }

        if(this.total <= 0 || this.total == undefined){
            result.isValid = false;
            result.message = 'No se ha podido calcular el total.';
            return result;
        }

        result.isValid = true;
        return result;
    }
    
}