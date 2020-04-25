module.exports = {
  hexToRGB: (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return `rgba(${r},${g},${b}, ${alpha})`;
    }
    return `rgb(${r},${g},${b})`;
  },
  randomColor: (alpha) => (
    `rgba(${
      [
        // eslint-disable-next-line no-bitwise
        ~~(Math.random() * 255),
        // eslint-disable-next-line no-bitwise
        ~~(Math.random() * 255),
        // eslint-disable-next-line no-bitwise
        ~~(Math.random() * 255),
        alpha || 1,
      ]
    })`
  ),
  computedSource: (source) => {
    switch (source) {
      case 'twitter':
        return {
          icon: 'mdi-twitter',
          title: 'Twitter',
          color: '#26c6da',
        };
      case 'rss':
        return {
          icon: 'mdi-rss',
          title: 'RSS',
          color: '#da6826',
        };
      default:
        return {
          icon: '',
          title: '',
        };
    }
  },
};
