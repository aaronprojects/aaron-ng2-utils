import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'search', pure: false })
export class Search implements PipeTransform {

    /** @function checkforString 
     * 
     * @input {any} an Object that contains certain strings
     * @searchVal {string} the string this function has to look for
     * 
     * Looks up a string input in an Object.
     * Returns true if the Object contains the given String
     * */
    checkforString(input: any, searchVal: string) {
        var found = true;
        searchVal = searchVal.toLocaleLowerCase();

        // Seperate the searchVal and count the number of elements
        var vals = searchVal.split(" ");
        var quantity = vals.length;

        // Init Bool Array for each Element in the searchVal Input
        var valFound = new Array(quantity);
        for (var i = 0; i < valFound.length; ++i) { valFound[i] = false; }

        for (var index in vals) {
            for (var key in input) {
                if (input[key] != undefined && input[key].toString().toLocaleLowerCase().indexOf(vals[index]) != -1)
                    valFound[index] = true;
            }
        }
        
        // Found if each Element in searchVal could be found
        for (var key in valFound) {
            if (valFound[key] === false) {
                found = false;
            }
        }

        return found;
    }
    
    
    /** @function transform 
     * 
     * @input {any} an Object that contains certain strings
     * @value {string} the string this function has to look for
     * 
     * Filters all elements in input that doesn't match the search Value
     * */
    transform(input: any, value: string): any {
        if (value != undefined)
            return input.filter((input: any) =>
                this.checkforString(input, value) == true
            );
        else
            return input;
    }
}