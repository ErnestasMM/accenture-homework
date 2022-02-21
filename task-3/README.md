# Description for task 3

## Frontend

### Tools, frameworks, npm libraries you plan to use and why
* I would use React (as it's a requirements from the Task description, but I would go for it as well)
* Redux for state management
* Some CSS preprocessor like SASS
* Maybe MaterialUI, depending on branding requirements (it's immediately noticeable and comparable to Google/Android)
* Some testing library like jest, which allows unit testing and snapshot testing, which is useful for frontend development 

### Directory structure for source code folder

```
src
|_components
  |_ContactList
    |___tests__
      |_ContactListItem.test.tsx
      |_ContactList.test.tsx
    |_ContactListItem.tsx
    |_ContactList.tsx
    |_index.ts
  |_ContactCard
    |___tests__
      |_ContactCard.test.tsx
    |_ContactCard.tsx
    |_index.ts
|_pages
  |_ContactListPage
    |_index.ts
  |_ContactCardPage
    |_index.ts
|_store
  |_actions
    |_index.ts
  |_reducers
    |_contactsReducer.ts
    |_index.ts
  |_index.ts
|_App.tsx
|_index.ts
```

### List of components which you’ll implement (with short description)
* **ContactList** - It's a list that would take the data from the store (Redux) and
  display the contacts using ContactListItem component for each item
* **ContactListItem** - Inner component for ContactList, which renders the contact's avatar,
  first name and email for the list
* **ContactCard** - Component for displaying the full information for the contact.
  Depending on its complexity, it would evolve to using multiple components inside,
  based on the requirements for rendering the details

### For one of the components also provide in which directory/-ies component’s file/-es will be located
`src/components/ContactList/ContactList.tsx`
(index.ts for each component is there to manage any selectors, dispatchers for Redux and export the component for usage)

### Benefits/drawbacks comparing with traditional (not-SPA) app approach

#### Benefits
The biggest benefit is the search engine optimization (SEO). Client-side rendering is not yet optimized
for SEO, so usually you would get better results with server-side rendering.

Some other benefits include better browser history, overall better security, better insights from Analytics.

#### Drawbacks
First, it's slow. Each time a new page needs to be opened,
a request to the server has to be sent, and you have to wait until you download the new page.
Plus it can request the specific data when it's needed, much easier (infinite scrolling, for example) 

There's not much useful caching you can do with non-SPA approach. Definitely cannot use Offline-first approach
using service workers, so the website won't be very good with poor/no internet connectivity.

Some other drawbacks: it's harder to maintain and develop. 


### Any other comments and suggestions
Never used non-SPA approach with React, so most of this is just what I think how it would happen

## Backend

### Short description of API – URI, format, why needed
For the API I would go with REST API approach, as it's the most popular choice.
Plus the given example represents the resource-based case.

URLs for this scenario:
* GET - https://someapp.com/contacts/
* GET - https://someapp.com/contacts/some-uuid-of-the-contact

### Framework
Since we use NodeJS as base technology, I would use Express for server-side rendering.

### Any other comments and suggestions
Since we use server side rendering, I assume all the required data would be calculated in the backend
and attached via store for the frontend to render.

So it would essentially use some templating system to inject the data, or even handle the data rendering
in the backend using ReactDOMServer. For templating, probably .ejs could be used, as that's what it's made for.
