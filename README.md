![](https://badgen.net/bundlephobia/minzip/couillard)
![](https://badgen.net/bundlephobia/dependency-count/couillard)

# Couillard
Couillard is a [small trebuchet](https://en.wikipedia.org/wiki/Trebuchet#Couillard) you aim and launch at your users. It's a *lean* A/B testing tool to validate hypotheses and determine what to build.

## More About Lean A/B Testing
- [Unit 3 Module 1: An Introduction to Experimental Product Development
](https://www.youtube.com/watch?v=HEnpiMUhRJ0)
- [Unit 3 Module 2: A/B testing overview](https://www.youtube.com/watch?v=08hBllMQ770)
- [Unit 3 Module 4: Guidance on Experiments](https://www.youtube.com/watch?v=jHo4w-ErXaI)
- [Tech planet 2014 트랙2 세션5 Nell Thomas](https://www.youtube.com/watch?v=4Ov61a9IqBU)
- [Emily Robinson - A/B Testing in the Wild - 2017-07-26](https://www.youtube.com/watch?v=SF-ryGgLOgQ)

## Install
```
yarn add couillard
```

## Usage
```javascript
// Your metrics store, can be Segment, Amplitude, SQL, mongo, or whatever you like.
const saveMetrics = metrics =>
  fetch('...', {
    method: 'POST',
    body: JSON.stringify(metrics)
  })

// Create variation A component.
const WelcomeA = props => (
  <p>
    Welcome I'm experiment A, {props.name},
    <button onClick={hit('welcome', saveMetrics)}>Click Me</button>
  </p>
)

// Create variation B component.
const WelcomeB = props => (
  <p>
    Welcome I'm experiment B, {props.name},
    <button onClick={hit('welcome', saveMetrics)}>Click Me</button>
  </p>
)

// Aim your experiment at your users.
const Welcome = aim('welcome', 50, saveMetrics, {
  A: WelcomeA,
  B: WelcomeB
})

// Only WelcomeA or WelcomeB will render.
const Home = () => {
  launch('welcome', saveMetrics)

  return (
    <div class={style.home}>
      <h1>Home</h1>
      <Welcome name="Jannette" />
    </div>
  )
}

export Home
```


