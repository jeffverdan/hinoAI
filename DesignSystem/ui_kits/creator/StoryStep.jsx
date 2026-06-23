// StoryStep — "Conte sua história": testimony textarea + theme tags.
(function () {
  const { Textarea, Tag, Button, StepDots, ScriptureQuote } = window.HinoAIDesignSystem_121ee1;
  const THEMES = ['Gratidão', 'Esperança', 'Fé', 'Família', 'Cura', 'Segunda vinda', 'Perdão'];

  function StoryStep({ story, setStory, themes, toggleTheme, onNext }) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <StepDots total={3} current={1} />
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 40, lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--text-heading)', margin: '0 0 10px' }}>
            Conte sua história
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--text-muted)', margin: 0, maxWidth: 460 }}>
            Um momento de fé, uma superação, uma graça recebida. Nós transformamos em louvor.
          </p>
        </div>

        <Textarea
          label="Seu testemunho"
          placeholder="Perdi meu emprego em 2024, mas Deus abriu uma porta melhor…"
          showCount maxLength={600}
          value={story}
          onChange={(e) => setStory(e.target.value)}
          rows={5}
        />

        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-heading)', margin: '0 0 12px' }}>
            Temas que aparecem na sua história
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
            {THEMES.map((t) => (
              <Tag key={t} selected={themes.includes(t)} onClick={() => toggleTheme(t)}>{t}</Tag>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, paddingTop: 4 }}>
          <ScriptureQuote verse="Cantai ao Senhor um cântico novo." reference="Salmos 96:1" size="sm" />
          <Button size="lg" iconRight="arrowRight" disabled={story.trim().length < 12} onClick={onNext}>
            Continuar
          </Button>
        </div>
      </div>
    );
  }
  window.StoryStep = StoryStep;
})();
