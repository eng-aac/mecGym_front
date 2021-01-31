import { DocumentReference } from '@angular/fire/firestore';

export class Customer {
    id: string;
    name: string;
    surname: string;
    email: string;
    identityCard: string;
    birthday: Date;
    cellPhoneNumer: string;
    imgUrl: string;
    seeable: boolean;
    ref: DocumentReference;

    constructor(){}
}