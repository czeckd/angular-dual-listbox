[![npm version](https://badge.fury.io/js/angular-dual-listbox.svg)](https://badge.fury.io/js/angular-dual-listbox)

Angular Dual-Listbox
=========

The **angular-dual-listbox** is an Angular 2+ component that provides two lists controls side-by-side that allows items in one list to be moved to the other list via drag-and-drop and/or a button-based interface. The component supports multiple select options from the list and programatic setting of list sources. 

A [working demo](http://czeckd.github.io/angular-dual-listbox/demo/) shows the dual listbox in action.

![Dual ListBox](http://czeckd.github.io/angular-dual-listbox/images/dual-listbox.png)

## How to use?
```
$ npm i angular-dual-listbox --save
```

## Integration
The **angular-dual-listbox** should work as-is with webpack/angular-cli. Just add the ``AngularDualListBoxModule``:
```typescript
import { AngularDualListBoxModule } from 'angular-dual-listbox';

@NgModule({
    imports: [ AngularDualListBoxModule ],
    ...
})
export class AppModule {}
```

## Usage
Basic usage is:
```html
<dual-list [source]="source" [(destination)]="confirmed"></dual-list>
```
The following parameters can be set on a dual-list: 
- **key** - The unique identifier field of each object in the `source` and 
`destination` arrays, default is ``_id``.
- **display** - The field of each object for displaying the object each the
lists, default is ``_name``.
- **height** - The height of the lists, default is ``100px``.
- **filter** - A boolean whether or not to display a filter for the lists,
default is ``false``.
- **sort** - A boolean whether or not to keep the lists sorted, default is 
``false``.
- **compare** - A compare function to be used for sorting the lists. Note if
sort is not set and compare is set, then sort will be set ``true``.
- **source** - The source array of objects for the list. This is the universal, master list of all possible objects.
- **destination** The destination array of objects selected from the list.
Note, the ``destination`` array can have prexisting elements.
- **allText** - The text in the button All.
- **noneText** - The text in the button None.
- **addText** - The text in the button Add.
- **removeText** - The text in the button Remove.

For more usage examples, see the [`demo-app.component.ts`](https://github.com/czeckd/angular-dual-listbox/blob/master/app/demo-app.component.ts).

## Extending
The html template packaged with this component is based on Bootstap 3; however it can be overridden for customization. Here is an example:

```typescript
import { Component } from '@angular/core';
import { DualListComponent } from 'angular-dual-listbox/index';

@Component({
    selector: 'custom-dual-list',
    templateUrl: './custom-dual-list.component.html',
    styleUrls: [ './custom-dual-list.component.css' ]
})
export class CustomDualListComponent extends DualListComponent {
}
```
See [`dual-list.component.html`](https://github.com/czeckd/angular-dual-listbox/blob/master/lib/dual-list.component.html) and [`dual-list.component.css`](https://github.com/czeckd/angular-dual-listbox/blob/master/lib/dual-list.component.css) for template and style guidance.

## Known issue
The drag-and-drop between multiple ``<dual-list>`` components may cause 
undesired moves. For the time being, if the component is used, then it
is recommended only have one ``<dual-list>`` visable to the user at a time.

## Contributions

Contributions may be welcomed depending on impact on the core functionality of the project. In order for pull requests to be accepted, they must include a sign-off in git (See [git-commit
--signoff](https://git-scm.com/docs/git-commit)) certifying the contribution is your own work, are subitting under the project's original license, and agreeing to the [Developer Certificate of
Origin](https://developercertificate.org/).

## License
MIT

## Author
- David Czeck [@czeckd](https://github.com/czeckd)
