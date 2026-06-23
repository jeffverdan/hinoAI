Multi-line input — the core "conte sua história" testimony field. Optional character counter.

```jsx
<Textarea
  label="Sua história"
  placeholder="Conte um momento de fé, uma superação, uma gratidão…"
  showCount maxLength={600}
  value={story} onChange={e => setStory(e.target.value)}
/>
```
