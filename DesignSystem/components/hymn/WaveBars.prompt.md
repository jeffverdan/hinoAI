Audio waveform bars for the hymn player — gentle `scaleY` animation while playing, respects reduced-motion.

```jsx
<WaveBars playing={isPlaying} bars={28} height={40} />
```

This is the one allowed infinite decorative loop — only while audio plays.
