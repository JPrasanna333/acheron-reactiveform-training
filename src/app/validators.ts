import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function ageRangeValidators(minAge:number, maxAge:number) : ValidatorFn  {
 
    return(control: AbstractControl) : ValidationErrors | null =>{

        if(control.value !== undefined && (isNaN(control.value) || control.value < minAge || control.value > maxAge)){
            return {
                'ageerror':true
            }
        }
        return null; 
    }
}