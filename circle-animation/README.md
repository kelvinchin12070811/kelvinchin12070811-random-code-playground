# Rotating Dots In A Circle Animation

Preview

[![preview](https://thumbnails.odycdn.com/optimize/s:784:414/quality:85/plain/https://thumbs.odycdn.com/5b45f57fd871b88447685c1dab98a021.jpeg)](https://odysee.com/$/embed/trigo-circle-animation/918dac19cc300ab155bd142585c0b73ad1173bd4?r=9DKRu1Yrrvv2rQofYYB7HpLGDgQ8DgH7)

[View on Odysee](https://odysee.com/@Kelvinchin12070811:8/trigo-circle-animation:9?r=9DKRu1Yrrvv2rQofYYB7HpLGDgQ8DgH7)

This is an implementation of the rotating dots in a circle animation where the red dots are moving in their own orbits.
however, the motion of the dots looks like they rotating inside the circle.

The blue dots rotating on the circumference of the circle is a 'control dots' where each of the red dots' position are
calculated by the blue dot's angle where each of them is based on a shifted Cosine function. More detailed information
please refer to [Numberphile - Beautiful Trigonometric](https://youtu.be/snHKEpCv0Hk) and
[ William Candillon - The Math behind Animations - Beautiful Trigonometry](https://youtu.be/-lF7sSTelOg).

## Build and run

This project use nodejs v16 and yarn berry as package manager. Before building and running the project, please install
nodejs and yarn berry.

Yarn can be installed by running the following command in your terminal if you are using node version 16 or higher:

```bash
corepack enable
```

if you are using node version lower than 16, corepack is available as a global package or install it manually:

```bash
npm install -g corepack
```

Yarn berry binary already included in this repo and can be invoked immediately after enable corepack. To build and run
the project, cd into the project directory and run the following command:

```bash
cd circle-animation
yarn install
yarn dev
```

Then, open a web browser and navigate to [http://localhost:3000](http://localhost:3000).

## Dependencies

This project use the following dependencies:

 * [reactjs](https://reactjs.org/)
 * [nextjs](https://nextjs.org/)
 * [typescript](https://www.typescriptlang.org/)
 * [sass](https://sass-lang.com/)
 * [animejs](https://animejs.com/)

And other libraries required by the above libraries.