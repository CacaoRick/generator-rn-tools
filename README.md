# generator-rn-tools [![npm version](https://badge.fury.io/js/generator-rn-tools.svg)](https://badge.fury.io/js/generator-rn-tools)

[Yeoman](http://yeoman.io) generator for [React Native](https://facebook.github.io/react-native/), Help you install npm dependencies and generator file structure in project which created by [react-native-cli](https://facebook.github.io/react-native/docs/getting-started.html#installing-dependencies) or [create-react-native-app](https://facebook.github.io/react-native/docs/getting-started.html).

## Installation

```bash
npm install -g yo
npm install -g generator-rn-tools
```

## Create React Native project

Create project.

```bash
create-react-native-app appname
# or
react-native init appname
```

`cd` to your project.
Create file structure.
```bash
yo rn-tools
```

Generator will ask you project name and decide whether to use typescript.
Then install dependencies and create file structure in your project (see below) According to your options.

Build project

```bash
yarn run build
# or
yarn run watch
```

Start project

```bash
yarn start
```

### Included dependencies

#### normal babel project
* immutable
* prop-types
* react-native-router-flux
* react-redux
* redux
* redux-immutable
* redux-thunk

#### typescript project
* immutable
* react-native-router-flux
* react-redux
* redux
* redux-immutable
* redux-saga
* typescript-fsa

devDependencies:
* @types/immutable
* @types/react
* @types/react-native
* @types/react-redux
* @types/redux-saga
* @types/redux
* @types/redux-immutable
* rimraf
* tslint
* tslint-react
* typescript

### Add scripts to package.json

If you are in typescript project, generator will add some scripts to package.json
* tsc: `tsc --pretty`
* clean: `rimraf build`
* build: `yarn run clean && yarn run tsc --`
* watch: `npm run build -- -w`

### File structure

#### normal babel project
```text
├─src/
│   ├─components/
│   ├─constants/
│   │    ├─ActionTypes.js
│   │    ├─Colors.js
│   │    └─StorageKey.js
│   ├─containers/
│   │    ├─AppRoot/
│   │    │    └─index.js
│   │    ├─AppRouter/
│   │    │    └─index.js
│   │    └─Main/
│   │         └─index.js
│   ├─images/
│   ├─lib/
│   ├─models/
│   └─redux/
│        ├─main/
│        │    ├─mainActions.js
│        │    └─mainReducers.js
│        ├─actions.js
│        └─reducers.js
├─.eslintrc
├─App.js            <-- Only in Expo App
├─index.android.js  <-- Only in Standard App
└─index.ios.js      <-- Only in Standard App
```

#### typescript project
```text
├─build/					<-- After npm run build or npm run watch
├─images/
├─src/
│   ├─components/
│   ├─constants/
│   │    ├─Colors.ts
│   │    └─StorageKey.ts
│   ├─containers/
│   │    ├─AppRoot/
│   │    │    └─index.tsx
│   │    ├─AppRouter/
│   │    │    └─index.tsx
│   │    └─Main/
│   │         └─index.tsx
│   ├─lib/
│   │    └─configureStore.ts
│   ├─redux/
│   │    ├─main/
│   │    │    ├─mainActions.ts
│   │    │    ├─mainReducers.ts
│   │    │    └─mainSaga.ts
│   │    ├─actions.ts
│   │    ├─reducer.ts
│   │    └─sagas.ts
│   └─index.d.ts
├─tsconfig.json
├─tslint.json
├─App.js            <-- Only in Expo App
├─index.android.js  <-- Only in Standard App
└─index.ios.js      <-- Only in Standard App
```

## Other Generator
### Component

Create a component in `src/components/index.js`.

```bash
yo rn-tools:component componentName
```

### Container

Create a component in `src/containers/containerName/index.js`, export with react-redux connect().

```bash
yo rn-tools:container containerName
```
