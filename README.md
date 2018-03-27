# generator-rn-tools [![npm version](https://badge.fury.io/js/generator-rn-tools.svg)](https://badge.fury.io/js/generator-rn-tools)

[Yeoman](http://yeoman.io) generator for [React Native](https://facebook.github.io/react-native/), to install npm [dependencies](#included-dependencies) and generator file structure in project which created by [react-native-cli](https://facebook.github.io/react-native/docs/getting-started.html#installing-dependencies) or [create-react-native-app](https://facebook.github.io/react-native/docs/getting-started.html) and generator component, container and reducer.

## Installation

```bash
npm install -g yo
npm install -g generator-rn-tools
```

## Usage

Create project.

```bash
create-react-native-app appname
# or
react-native init appname

cd appname
```

Create file structure.
```bash
yo rn-tools
```

Generator will ask you project name (Only in standard project) and which version of `react-native-router-flux` to use.
Then install [dependencies](#included-dependencies) and create [file structure](#file-structure) in this project.

Run packager server

```bash
yarn start
```

### Included dependencies

* [immutable](https://facebook.github.io/immutable-js/)
* prop-types
* react-native-router-flux ([v4](https://github.com/aksonov/react-native-router-flux), [v3](https://github.com/aksonov/react-native-router-flux/tree/v3))
* [react-redux](https://github.com/reactjs/react-redux)
* [redux](https://github.com/reactjs/redux)
* [redux-immutable](https://github.com/gajus/redux-immutable)
* [redux-thunk](https://github.com/gaearon/redux-thunk)

### File structure

#### normal babel project
```text
├─src/
│   ├─components/
│   ├─constants/
│   │    ├─ActionTypes.js
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
│   ├─redux/
│   │    ├─main/
│   │    │    ├─mainActions.js
│   │    │    └─mainReducers.js
│   │    ├─actions.js
│   │    └─reducers.js
│   └─Styles/
│        ├─Colors.js
│        └─Styles.js
├─.eslintrc
├─App.js
├─app.json	<-- Write default androidStatusBar setting into app.json in Expo project
└─index.js  <-- Only in Standard App
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

### Reducer

Create a actions, reducers in `src/redux/reducerName`, and auto import in `src/redux/actions` last line, so file must follow [eol-last](https://eslint.org/docs/rules/eol-last) rule (end with a newline).

```bash
yo rn-tools:reducer reducerName
```

After file created, need to manually add reducer to `src/redux/reducers`.
