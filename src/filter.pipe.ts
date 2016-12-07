import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filter', pure: false })
export class Filter implements PipeTransform {

    /** @function checkkey 
     * 
     * @input {any} an Object that contains certain strings
     * @key {any} the index of the element
     * @values {any} Element to the key has to match one of these
     * 
     * Checks if input[key] contains one of the values
     * 
     * @returns {boolean} if input[key] contains one of the values
     * */
    checkkey(input: any, key: any, values: any) {
        var toRet: boolean = true;

        for (var index in values) {
            if(values[index] === input[key])
                toRet = false;
        }

        return toRet;
    }

    /** @function transform 
     * 
     * @input {any} an Object that contains certain strings
     * @key {any} the index of the element
     * @values {any} Element to the key has to match one of these
     * 
     * Filters all elements where input[key] doesn't contain one of the values
     * */
    transform(input: any, key: any, values: any): any {
        if (values != undefined && key != undefined)
            return input.filter((input: any) =>
                this.checkkey(input, key, values) == true
            );
        else
            return input;
    }
}