# u-wave-web-dailymotion

A [Dailymotion player] for the [üWave Web Client].

## Installation

```bash
npm install --save u-wave-web-dailymotion
```

## Usage

First, install the [Dailymotion source plugin] for the üWave server. It allows
users to search for Dailymotion videos to add to their playlists.

Then, in your üWave Web Client plugins file, do:

```js
import dailymotion from 'u-wave-web-dailymotion';

uw.source('dailymotion', dailymotion);
```

And in your üWave Web Client plugin styles file, do:

```css
@import "u-wave-web-dailymotion";
```

## License

[MIT]

[Dailymotion player]: https://github.com/u-wave/react-dailymotion
[Dailymotion source plugin]: https://github.com/u-wave/u-wave-source-dailymotion
[üWave Web Client]: https://github.com/u-wave/web
[MIT]: ./LICENSE
