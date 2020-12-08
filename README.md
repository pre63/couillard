![](https://badgen.net/bundlephobia/minzip/couillard)
![](https://badgen.net/bundlephobia/tree-shaking/couillard)
![](https://badgen.net/bundlephobia/dependency-count/couillard)

# Couillard
Couillard is a small trebuchet you aim and launch at your users.

## Install
```
yarn add couillard
```

## Usage
```javascript
aim('welcome', 50, ['A', 'B'])

const WelcomeA = launch('welcome', 'A', props => <p>Welcome I'm A, {props.name}</p>)
const WelcomeB = launch('welcome', 'B', props => <p>Welcome I'm B, {props.name}</p>)

const Home = () => (
  <div class={style.home}>
    <h1>Home</h1>
    <WelcomeA name="Jannette" />
    <WelcomeB name="John" />
  </div>
)
```


