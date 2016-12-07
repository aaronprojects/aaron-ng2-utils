# aaron Angular 2 Utilities


### Quick start

Install the utils to your project

```bash
# npm install git+https://github.com/aaronprojects/aaron-ng2-utils
```

# Table of Contents

* [Getting Started](#getting-started)
* [Usage] (#usage)
    * [Pipes] (#pipes)
        * [Search Pipe] (#search-pipe)
        * [TimeAgo Pipe] (#timeago-pipe)
        * [OrderBy Pipe] (#orderby-pipe)
		* [Filter Pipe] (#filter-pipe)
		* [Filter Pipe] (#AdvancedFilter-pipe)
	* [Directives] (#directives)
		* [Autocomplete] (#autocomplete)

# Getting Started

Import the Components you want to use into your app.module.ts

```ts

import {Search} from 'aaron-ng2-utils/aaron-ng2-utils';
import {OrderBy} from 'aaron-ng2-utils/aaron-ng2-utils';
...

```


# Usage

## Pipes

### TimeAgo Pipe

```ts

import {TimeAgoPipe} from 'aaron-ng2-utils/aaron-ng2-utils';

```

Just use the pipe within your html template on a Date Object like this.

```xml

{{item.date | timeAgo}}

```

### OrderBy Pipe

Sorts the Elements within ngFor loop by the given Property and the given order.

```ts

import {OrderBy} from 'aaron-ng2-utils/aaron-ng2-utils';
```

```ts
sortingOrder = '+';
sortingProperty = 'name';
```

```xml
<div *ngFor="let element of array | orderBy : sortingProperty : sortingOrder">
```

### Search Pipe

```ts

import {Search} from 'aaron-ng2-utils/aaron-ng2-utils';

````

```ts
// Declare the search Value for the User
searchVal = '';

```

```xml
<!--Searching Input Field for the User-->
<input id="search" [(ngModel)]="searchVal" type="search">

<!--Use the pipe within the Loop-->
<div *ngFor="let element of array | search : searchVal">
```

### Filter Pipe

```ts

import {Filter} from 'aaron-ng2-utils/aaron-ng2-utils';

```

```ts

// Only shows all element where the value to the filterKey is one of these
// for example element.key === 'user'
filterAttributes = ["labour", "user", "device", "request"];
filterKey = "type";
```

```xml
<div *ngFor="let element of array | filter : filterKey : filterAttributes">
```

### AdvancedFilter Pipe

Assign some key/value pairs and filter all elements that doesn't match any of the given key/value pais

```ts

import {AdvancedFilter} from 'aaron-ng2-utils/aaron-ng2-utils';

```ts

//    Assign your key values pair here
advancedFilter: any = [
    { key: "name", value: "Müller" }
];

```

```xml
<!--And pass the list to your Loop-->
<div *ngFor="let element of array | advancedFilter : advancedFilter">

```

## Directives

### Autocomplete

```ts

import {AutocompleteComponent} from 'aaron-ng2-utils/aaron-ng2-utils';

```ts


Now you can use it in your Template.

```xml
<autocomplete [itemList]="list" [prefix]="'fa fa-user'" [col]="'s12 m6'" [label]="'Your own Inputfieldlabel'" [showAttributes]="['firstName', 'name']" (selected)="output = $event"></autocomplete>
```

This example works with a list and an output variable like the following.

```ts
list: any = [
    {firstName: 'Hans', name: 'Beispiel'},
    {firstName: 'Fritz', name: 'Example'}
];
output: any;
```

