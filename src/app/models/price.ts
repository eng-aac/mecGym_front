import { DocumentReference } from '@angular/fire/firestore';

export class Price {
  id: string;
  name: string;
  cost: number;
  duration: number;
  type_duration: string;
  seeable: boolean;
  ref: DocumentReference                                                                                
}
