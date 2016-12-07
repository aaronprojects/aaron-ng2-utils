import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'orderBy', pure: false })
export class OrderBy implements PipeTransform {
    static _orderByComparator(a: any, b: any): number {
        if (a instanceof Date && b instanceof Date) {
            if (a.getTime() < b.getTime()) return -1;
            if (a.getTime() > b.getTime()) return 1;
            else return 1;
        }

        if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
            if(a == null && b != null) {
                return -1;
            } else if(a != null && b == null) {
                return 1;
            } else if(a != null && b != null) {
                //Isn't a number so lowercase the string to properly compare
                if (a.toLowerCase() < b.toLowerCase()) return -1;
                if (a.toLowerCase() > b.toLowerCase()) return 1;
            } else {
                return 0;
            }
        }
        else {
            //Parse strings as numbers to compare properly
            if (parseFloat(a) < parseFloat(b)) return -1;
            if (parseFloat(a) > parseFloat(b)) return 1;
        }

        return 0; //equal each other
    }

    transform(input: any, sortBy: any, config: any) {
        var propertyToCheck: string = sortBy;
        var desc = config;
        if (!Array.isArray(input)) return input;

        // Check the additional given Params
        if (desc == undefined && propertyToCheck == undefined) {
            desc = '+';
            propertyToCheck = undefined;
        } else if (desc == undefined) {
            // The First given Paramenter should be our desc Parameter
            desc = sortBy;
            // User didn't give us an sortBy Param
            propertyToCheck = undefined;
        }

        // No Param given to sort by
        if (propertyToCheck == undefined || propertyToCheck == null) {
            // TODO: implement for no Param
//            if (desc == '-') {
//                return input.sort('propertyToCheck').reverse();
//            } else {
//                return input.sort();
//            }
        } else {
            var temp: any;

            for (var n = input.length; n > 1; n--) {
                for (var i = 0; i < n - 1; i++) {
                    var firstElement: any = input[i][propertyToCheck];
                    var secondElement: any = input[i+1][propertyToCheck];
                    
                    if (
                        desc == '+'
                        && OrderBy._orderByComparator(firstElement, secondElement) == 1
                        || desc == '-'
                        && OrderBy._orderByComparator(firstElement, secondElement) == -1
                    ) {
                        var temp = input[i];
                        input[i] = input[i + 1];
                        input[i + 1] = temp;
                    }
                }
            }

            if (desc == '-') {
                return input;
            } else {
                return input;
            }
        }
    }
}