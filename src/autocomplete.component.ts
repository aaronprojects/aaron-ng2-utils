import {Component, Injectable, ElementRef, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'autocomplete',
    host: {
        '(document:click)': 'handleClick($event)',
    },
    template: `
    <div class="input-field col {{col}}">
    <i *ngIf="prefix != undefined" class="{{prefix}} prefix"></i>
    <input type="text" class="validate filter-input" [attr.placeholder]="placeholder" [(ngModel)]=query [class.invalid]="check" (click)="filter()"(keydown)="onKey($event)"(keyup)=filter()>
    <label [class.active]="errorInput" [attr.data-error]="errorLabel">{{label}}</label>
    <ul class="autocomplete-content dropdown-content" *ngIf="filteredList.length != 0">
        <li *ngFor="let item of filteredList; let i = index;">
            <a (click)="select(item)" [class.hovered]="i == hover">
                <span *ngFor="let element of showAttributes">
                    {{item[element]}}
                </span>
            </a>
        </li>
    </ul>
</div>
    `
})
@Injectable()
export class AutocompleteComponent {
    public query = '';

    @Input()
    public itemList: any;
    @Input()
    public showAttributes: string;
    @Input()
    public label: string;
    @Input()
    public prefix: string;
    @Input()
    public col: string;
    @Input()
    public check: boolean;
    @Input()
    public placeholder: string;
    @Input()
    public errorLabel: string;
    @Input()
    public errorInput: boolean;

    @Output()
    selected = new EventEmitter();

    @Output()
    error = new EventEmitter();

    hover: number = -1;

    public filteredList: any = [];
    public elementRef: any;

    private foundElements: number = 0;

    constructor(myElement: ElementRef) {
        this.elementRef = myElement;
    }

    /** @function onKey
     *
     * @event {event} Event Item for the User Input
     *
     * Handles User Interaction with the keyboard and enables the selection
     * with Arrow Keys and Enter
     * */
    onKey(event: any) {
        if (this.filteredList.length == 0) {
            this.hover = -1;
        }
        if (event.key == "ArrowDown") {
            if (this.hover < this.filteredList.length)
                this.hover++;
        }

        if (event.key == "ArrowUp") {
            if (this.hover > -1)
                this.hover--;
        }

        if (event.key == "Enter") {
            this.select(this.filteredList[this.hover]);
            this.hover = -1;
        }
    }

    /** @function filter
     *
     * Filters all Elements that doesn't contain the query
     * */
    filter() {
        var tempList = this.itemList.slice(0);
        this.filteredList = tempList.filter(function (el: any) {
            return this.checkforString(el, this.query);
        }.bind(this));

        this.foundElements = 0;

        this.error.emit(this.query);
    }

    /** @function select
     *
     * @item {any} the Clicked Item
     *
     * Select Method for one of the Sugestions
     * */
    select(item: any) {
        var value = '';
        for (var i: number; i < this.showAttributes.length; i++) {
            value += item[this.showAttributes[i]];
            if (i < this.showAttributes.length - 1) {
                value += ' ';
            }
        }

        this.query = value;
        this.filteredList = [];

        this.selected.emit(item);
    }

    /** @function handleClick
     *
     * @event {any} the Click Event
     *
     * ClickEvent Handler for the Suggestions
     * */
    handleClick(event: any) {
        var clickedComponent = event.target;
        var inside = false;
        do {
            if (clickedComponent === this.elementRef.nativeElement) {
                inside = true;
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
        if (!inside) {
            this.filteredList = [];
        }
    }

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

        // return false per Default if we already got 5 Elements
        if (this.foundElements == 5) {
            return false;
        }

        // Seperate the searchVal and count the number of elements
        var vals = searchVal.split(" ");
        var quantity = vals.length;

        // Init Bool Array for each Element in the searchVal Input
        var valFound = new Array(quantity);
        for (var i = 0; i < valFound.length; ++i) {
            valFound[i] = false;
        }

        for (var index in vals) {
            for (var key in input) {
                if (input[key] != undefined && input[key] != null && input[key].toString().toLocaleLowerCase().indexOf(vals[index]) != -1)
                    valFound[index] = true;
            }
        }

        // Found if each Element in searchVal could be found
        for (var key in valFound) {
            if (valFound[key] === false) {
                found = false;
            } else {
                this.foundElements++;
            }
        }

        return found;
    }
}