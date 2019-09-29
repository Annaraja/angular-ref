import { Invoice } from './../../model/invoice.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {



  transform(value: Invoice[], searchedValue: string, billtoKey:string,
    invoiceNumberKey:string,billingAmountKey:string,descriptionKey:string): any {
   
    if(value.length ==0){
      return value;
    }
    const array=[];
    if(!searchedValue){
return array;
    }
    for(const invoice of value){
     const billToValue=invoice[billtoKey].toLowerCase();
     const invoiceNumberValue=invoice[invoiceNumberKey].toLowerCase();
     const descriptionValue=invoice[descriptionKey].toLowerCase();
     const keyword=searchedValue.toLocaleLowerCase();
     const billtoIndex= billToValue.search(keyword);
     const invoiceNumberIndex=invoiceNumberValue.search(keyword);
     const descriptionIndex=descriptionValue.search(keyword);
     const billingAmountIndex=(invoice[billingAmountKey].toString()).search(keyword);
if(invoiceNumberIndex !==-1 || billtoIndex !==-1 || descriptionIndex !==-1 || billingAmountIndex !==-1){
array.push(invoice);
}
    }
return array;
  }

}
