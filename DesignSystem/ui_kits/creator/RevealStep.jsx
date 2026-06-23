// RevealStep — the sanctuary "reveal": finished hymn presented on dark.
(function () {
  const { Logo, Button, IconButton, WaveBars, Badge } = window.HinoAIDesignSystem_121ee1;

  function RevealStep({ title, themes, playing, setPlaying, onRestart, onOpenPlayer }) {
    return (
      <div data-theme="sanctuary" className="hino-reveal" style={{
        background: 'var(--wash-sanctuary)', borderRadius: 'var(--radius-xl)', padding: '46px 40px',
        position: 'relative', overflow: 'hidden', textAlign: 'center', boxShadow: 'var(--shadow-xl)',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'var(--wash-halo)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
          <Badge tone="solid">Seu hino está pronto</Badge>

          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 52, lineHeight: 1.08, letterSpacing: '-0.02em', color: 'var(--text-heading)', margin: 0 }}>
            Uma porta melhor
          </h1>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            {themes.map((t) => <Badge key={t} tone="gold">{t}</Badge>)}
          </div>

          <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 19, lineHeight: 1.7, color: 'var(--text-body)', maxWidth: 440, margin: '4px 0 0' }}>
            “Quando a porta se fechou, eu chorei;<br />mas o Senhor abriu o céu pra mim.”
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 6 }}>
            <IconButton icon={playing ? 'pause' : 'play'} variant="solid" size="lg" label="Tocar" onClick={() => setPlaying(p => !p)} />
            <WaveBars playing={playing} bars={36} height={46} color="var(--gold-400)" />
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 8 }}>
            <Button iconLeft="book" onClick={onOpenPlayer}>Abrir player</Button>
            <Button variant="secondary" iconLeft="download">Baixar</Button>
            <Button variant="ghost" iconLeft="share">Compartilhar</Button>
          </div>

          <button type="button" onClick={onRestart} style={{
            background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)',
            fontFamily: 'var(--font-sans)', fontSize: 13.5, marginTop: 4, textDecoration: 'underline', textUnderlineOffset: 3,
          }}>Criar outro hino</button>
        </div>
      </div>
    );
  }
  window.RevealStep = RevealStep;
})();
