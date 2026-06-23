// StyleStep — "Escolha o estilo": hymn arrangement + tone + options.
(function () {
  const { RadioCard, Switch, Button, StepDots, Badge } = window.HinoAIDesignSystem_121ee1;

  const STYLES = [
    { id: 'trad', icon: 'church', title: 'Hino tradicional', desc: 'Solene, do hinário clássico adventista' },
    { id: 'quart', icon: 'music', title: 'Quarteto', desc: 'Quatro vozes em harmonia' },
    { id: 'cong', icon: 'user', title: 'Congregacional', desc: 'Simples, para toda a igreja cantar' },
    { id: 'jovem', icon: 'sparkles', title: 'Jovem', desc: 'Contemporâneo e inspirador' },
  ];
  const TONES = ['Solene', 'Alegre', 'Inspirador', 'Sereno'];

  function StyleStep({ style, setStyle, tone, setTone, video, setVideo, onBack, onCreate }) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
        <StepDots total={3} current={2} />
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 40, lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--text-heading)', margin: '0 0 10px' }}>
            Escolha o estilo
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--text-muted)', margin: 0 }}>
            Como você imagina o seu hino sendo cantado?
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {STYLES.map((s) => (
            <RadioCard key={s.id} icon={s.icon} title={s.title} description={s.desc}
              selected={style === s.id} onClick={() => setStyle(s.id)} />
          ))}
        </div>

        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-heading)', margin: '0 0 12px' }}>Tom emocional</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
            {TONES.map((t) => (
              <button key={t} type="button" onClick={() => setTone(t)}
                style={{
                  fontFamily: 'var(--font-sans)', fontSize: 13.5, fontWeight: tone === t ? 600 : 500, cursor: 'pointer',
                  padding: '8px 16px', borderRadius: 'var(--radius-pill)',
                  border: '1.5px solid ' + (tone === t ? 'var(--border-gold)' : 'var(--border)'),
                  background: tone === t ? 'var(--accent-soft)' : 'var(--surface-card)',
                  color: tone === t ? 'var(--accent-ink)' : 'var(--text-body)',
                }}>{t}</button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '16px 18px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-heading)' }}>Gerar vídeo para redes</span>
              <Badge tone="gold">Ministério</Badge>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>Vídeo vertical para Instagram, TikTok e WhatsApp</div>
          </div>
          <Switch checked={video} onChange={(e) => setVideo(e.target.checked)} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, paddingTop: 2 }}>
          <Button variant="ghost" iconLeft="chevronLeft" onClick={onBack}>Voltar</Button>
          <Button size="lg" iconLeft="sparkles" onClick={onCreate}>Criar meu hino</Button>
        </div>
      </div>
    );
  }
  window.StyleStep = StyleStep;
})();
