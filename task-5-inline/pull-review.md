# PULL REVIEW for task 5

##### Line 3
Not a must, but let's use arrow functions to avoid mixing both of them in the project
```typescript
const App = () => {
```

##### Line 5
Typo and let's default to null as we don't have the actual number yet and
0 is a perfectly valid value the user would have. Also, use const/let instead of var.
```typescript
const [fuel, setFuel] = useState<number | null>(null);
```

##### Line 6
Typo and let's set the default alert text to something empty/null,
as we don't want to show any alerts.
Also, would suggest keeping the network request pending status and response
and figure out the text inline in the HTML part of the code.
Just to keep logic and rendering (even text) separate.
```typescript
const [alertText, setAlertText] = useState('Processing...');
```

##### Line 8
Instead of the callback hell, let's use IIFE (Immediately Invoked Function Expression)
to enter async/await signature.
```typescript
useEffect(() => {
  (async () => {
    await fetch(....)
  })();
...
```

##### Line 9
Let not use magic values. Extract to constant and reference it here.

##### Line 13
Leftover console.log

##### Line 15
Forgot to specify empty dependency array.
Without it, this hook would be run every render, and we don't want that.

##### Line 17
This whole thing would be better in `useMemo`,
as it's just a changing string based on some inputs.
Even better, you can have this inline without using any react hooks,
as using `useMemo` is more performance heavy than just having this all inline, since there's no difficult calculation here.

##### Line 18
Avoid using if expressions without scope blocks.
When you want to suddenly add more logic or log something out,
you have to add and later remember to delete it to avoid random code changes,
and that's not very practical. Also keep `else if` on the same line.
```typescript
if (!fuel) {
  setAlertTxt('Processing...');
} else if (...) {
```

##### Line 19
It should be 10000, not 0. Even better, don't use magic numbers,
extract this value to a constant and reference it here.


##### Line 25
Would be much better to use SCSS here to style the DOM elements,
however if we want to stick to styles, I would say to have the styles
defined above the App class statically, as they are not dynamic from what I can see.
And you can use the style based on the fact (fuel.litres > 10000),
not on the outcome (the alert text being set to a specific string).

##### Line 25
I would say to better have different elements and render them based
on the fact (fuel.litres > 10000) rather than have an all-round HTML element
that renders everything itself.
