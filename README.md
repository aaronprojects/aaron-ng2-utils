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
		* [Filter Pipe] (#filter-pipe)
	* [Directives] (#directives)
		* [Autocomplete] (#autocomplete)

# Getting Started

Import the Components you want to use into your app.module.ts

```ts

import {Search} from 'aaron-ng2-utils/aaron-ng2-utils';
import {OrderByPipe} from 'aaron-ng2-utils/aaron-ng2-utils';
...

```


# Usage

## Pipes

### Filter Pipe

```ts

import {Filter} from 'aaron-ng2-utils/aaron-ng2-utils';

```ts

// Only shows all element where the value to the filterKey is one of these
// for example element.key === 'user'
filterAttributes = ["labour", "user", "device", "request"];
filterKey = "type";
```

```xml
<div *ngFor="let element of array | filter : filterKey : filterAttributes">
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

