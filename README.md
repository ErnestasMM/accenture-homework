# Homework solution for Accenture

## Homework

You can find the homework file here: [HOMEWORK](./HOMEWORK.md)

## Task 2
I extracted the mockup code into a separate class [provider.ts](./task-2/provider.ts).
The main file is [index.ts](./task-2/index.ts).

To run the file run the command:
`yarn start:2`

## Task 3
You can see the solution for this task here: [task-3/README.md](./task-3/README.md)

## Task 4
I present 2 options here.
The simple straight forward working solution and
a bit more generified and scalable solution.

### Task4-simple
The main file is [index.ts](./task-4-simple/index.ts). The test file is [index.test.ts](./task-4-simple/index.test.ts)

This solution is straight forward, just gets the job done. It was very fast to do it this way,
though, it's a very bad, non-scaleable solution.

To run the tests run the command: `yarn test:4-simple`

### Task4-proper
The main file is [index.ts](./task-4-proper/index.ts). The test file is [index.test.ts](./task-4-proper/index.test.ts)

This solution uses several typescript features, like types, enums, type-checking.
This kind of code is what you would see in a professional environment. Since most of the things are
generified, you can easily scale whatever you want:

* New state? Add the state in `constants.ts#States` type and add a processing handler in `index.ts#PROCESSING_HANDLERS`. Done.
* Updating any existing handlers - just go and change their logic.
* New error message? Add new error code in `constants.ts#ErrorCodes`, new error message in `constants.ts#ErrorMessages`. Done. 

None of these changes requires any changes to the code as long as the contract doesn't change.
*(Contract in this case would be that if a handler returns null, you go to next state. If it returns a ProcessingPage, you return it.)*

To run the tests run the command: `yarn test:4-proper`

## Task 5
I present you with two examples of this task solution.

### Task 5 - inline-file
You can find the file here: [pull-review.md](./task-5-inline/pull-review.md)
Here you can find all pull review comments with the specified lines and comments.
Since I was using some code examples, I used the .md file type, for some syntax highlighting.

### Task 5 - actual PULL REQUEST
You can find the actual pull review in a professional setting here: [Pull Request](https://github.com/ErnestasMitkus/accenture-homework/pull/1)

### Bonus
As a bonus I quickly updated the example code based on my PR feedback,
as to what I imagine the end result could look like, given these circumstances.
*(Disclaimer - it's just a quick draft, it still could contain some errors)*

You can find the file here: [improved-task-5.tsx](./task-5-inline/improved-task-5.tsx)
