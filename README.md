# Carteando

An accessible brwser-based tool for making playing cards. That's it, in a nutshell.

Game making tools should be as accessible as possible, and this is not limited to digital game makers. Even if you need only pen and paper to start a brand new card game, it can quickly escalate in complexity. If you decide to use a computer to help out with the design and make it look good too, then you need even more repertoire and previous knowledge.

The goal of *Carteando* is to help game making people to **quickly and easily create functional and nice looking cards for print-and-play prototypes and games**. Write the text on your cards and game rules, upload some images and then just press the print button on your browser. The easier, the better: no installations, no need for internet too (we'll try to keep it as portable as possible).

#### General design principles

- Less is more;
- Easy to localize;
- Appealing and inviting: it should be (at least a bit) fun to use;
- It should be as accessible as possible: cross-browser, responsive, graceful;

#### Technical basis

- A browser-based application that uses client-side JS and CSS: access an online URL or a local version and BAM! there you have it;
- All text editing needed will be made using [zenpen](https://github.com/tholman/zenpen) (or the embedable jQuery version of it) and stored as either Markdown or plain text;
- Drawing the cards will be done via [D3JS](https://github.com/mbostock/d3);
- Printing styles will be made via CSS;

#### The fuzzy future (aka. wishlist)

- Image upload;
- Grid-based design for the cards (probably using [gridster.js](http://gridster.net/));
- CSS-based custom styling (using [selectize.js](https://github.com/brianreavis/selectize.js) for adding/managing custom classes);
- Local storage saving;
- Exporters for CSV, XML, and other formats so the cards' data can be further developed in more powerful tools and more easily localized/revised;
