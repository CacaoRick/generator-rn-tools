# Generator React Native
[Yeoman](http://yeoman.io) generator for [React Native](https://facebook.github.io/react-native/), Help you install npm dependencies and generator file structure in project which created by [react-native-cli](https://facebook.github.io/react-native/docs/getting-started.html#installing-dependencies) or [create-react-native-app](https://facebook.github.io/react-native/docs/getting-started.html).

## Installation

```bash
npm install -g yo
npm install -g generator-react-native-cacaorick
```

## Create React Native project

Create project.

```bash
create-react-native-app projectName
# or
react-native init projectName
```

`cd` to your project.
Create file structure.
```bash
yo react-native-cacaorick
```
Select project type.

![](/images/react-native-cacaorick.png)

Generator will install dependencies and create file structure in your project (see below).

### Included dependencies

* immutable
* prop-types
* react-native-router-flux
* react-redux
* redux
* redux-thunk

### File structure

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

## Other Generator
### Component

Create a component in `src/components/index.js`.

```bash
yo react-native-cacaorick:component componentName
```

### Container

Create a component in `src/containers/containerName/index.js`, export with react-redux connect().

```bash
yo react-native-cacaorick:container containerName
```