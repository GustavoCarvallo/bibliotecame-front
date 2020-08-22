## Bibliotecame Front

### Installation 
##### Clone the repository:

With http:

``git clone https://github.com/GustavoCarvallo/bibliotecame-front.git``

or with ssh:

``git clone git@github.com:GustavoCarvallo/bibliotecame-front.git``

##### Install all the dependencies:
``npm install``

##### Start the app:
``npm start``

### Best Practices
##### Project Structure Example:
```
├── src
│   └── index.tsx
│   └── common
│       └──  components
│            └── Button
│                └── Button.tsx
│                └── Button.scss
│   └── book
│       └──  book.service.ts
│       └──  components
│            └── BookForm
│                └── BookForm.tsx
│                └── BookForm.scss
│            └── BookScreen
│                └── BookScreen.tsx
│                └── BookScreen.scss
├── router
│   └── Routes.tsx
│   └── AuthRoute.tsx
│   └── RoleRoute.tsx
├── utils
│   └── http.ts
│   └── parser.ts
└── styles
    └── fonts.scss
    └── main.scss
    └── styles.scss
```