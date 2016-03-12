# Sharky
## About
Sharky gives you a Javascript deck of playing cards. Sharky is written in ES6/Harmony.

## API
Sharky exposes the global variable `Deck`. Deck is a class definition, so to use Sharky, you instantiate the deck with the new keyword `new Deck()`

### Options
The Deck constructor accepts an options object.

`cards`: Array of card objects

### `Deck.shuffle()`
Accepts no arguments. Shuffles the cards in the deck.

### `Deck.cut()`
Optionally accepts the argument `numCardsIn` which indicates how many cards into the deck the cut should be made. By default this method cuts the deck in half.

### `Deck.draw()`
Expects one argument `numCards`. This method will return the number of card objects that you specified in your argument from the top of the deck.

## Contributing
Please fork and pull request. See Gruntfile for details on linting, coding style standards, and testing. Submit a test with your pull request.
