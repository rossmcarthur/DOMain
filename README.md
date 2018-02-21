# DOMain

DOMain is a custom JavaScript-based DOM manipulation library inspired by jQuery. Users are able to traverse and manipulate the DOM, create and remove event handlers, and make AJAX requests as needed.

# Live

[DOMain Snake](www.rossmcarthur.com/DOMain)

DOMain Snake is a single-page classic snake game created exclusively with DOMain.

# DOMain API

`html()`
* Returns the first HTML element of the `DOMNodeCollection`.

`empty()`
* Empties HTML elements of the `DOMNodeCollection`.

`append()`
* Appends content to the end of each HTML element in the `DOMNodeCollection`.

`attr()`
* With one argument, gets the attribute provided from the first element from the `DOMNodeCollection`. The second argument allows you to set the attribute (provided as the first argument) of all elements in the `DOMNodeCollection`.

`hasClass()`
* Returns a boolean reflecting whether the provided HTML element has the specified class argument.

`addClass()`
* Adds the provided class attribute to all HTML elements of the `DOMNodeCollection`.

`removeClass()`
* Removes the provided class attribute from all HTML elements of the `DOMNodeCollection`.

`children()`
* Returns all children of each element of the `DOMNodeCollection`.

`parent()`
* Returns the parent of each of the `DOMNodeCollection`.

`find()`
* Returns the descendants of each element in the `DOMNodeCollection`, filtered according to the input.

`remove()`
* Remove the set of matched elements, dependant on the input provided.

`on()`
* Adds an event listener to the `DOMNodeCollection`.

`off()`
* Removes an event listener from the `DOMNodeCollection`.
