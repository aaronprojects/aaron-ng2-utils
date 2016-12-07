import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'advancedFilter', pure: false})
export class AdvancedFilter implements PipeTransform {

    /** @function checkkey
     *
     * @input {any} an Object that contains certain strings
     * @key {any} the index of the element
     * @value {any} The Element has to contain this String
     *
     * Checks if input[key] contains the value
     *
     * @returns {boolean} if input[key] contains one of the values
     * */
    checkkey(input: any, values: any) {
        var toRet: boolean = false;

        for (var search of values) {
            if(search.value == '') {
                toRet = true;
            }

            // Check if it is an underlying Object
            if (search.key.indexOf(".") != -1) {
                var attributes = search.key.split(".");
                if (input[attributes[0]] != undefined
                    && input[attributes[0]][attributes[1]].toString().toLowerCase().indexOf(search.value.toLowerCase()) != -1
                    && search.value != '')
                    toRet = true;
            } else {
                    if (input[search.key] != undefined
                && input[search.key].toString().toLowerCase().indexOf(search.value.toLowerCase()) != -1
                && search.value != '')
                    toRet = true;
            }
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
    transform(input: any, searchVals: any): any {
        if (searchVals != undefined && searchVals.length > 0)
            return input.filter((input: any) =>
                this.checkkey(input, searchVals) == true
            );
        else
            return input;
    }
}