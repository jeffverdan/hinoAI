Large selectable option card — choosing a hymn style, voice arrangement, or plan tier. Gold ring + tick when selected.

```jsx
<RadioCard icon="church" title="Hino tradicional" description="Solene, hinário clássico" selected={style==='trad'} onClick={()=>setStyle('trad')} />
<RadioCard icon="user" title="Jovem" description="Contemporâneo, congregacional" />
```

Lay several out in a vertical stack or 2-col grid for the creation flow's style step.
