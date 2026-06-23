// GeneratingStep — the "compondo seu hino" moment: pulsing mark + waveform + progress.
(function () {
  const { Logo, WaveBars, ScriptureQuote } = window.HinoAIDesignSystem_121ee1;

  const STAGES = ['Interpretando seu testemunho…', 'Escrevendo a letra…', 'Compondo a melodia…', 'Gravando a voz…'];

  function GeneratingStep({ progress, stage }) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 26, padding: '20px 0' }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ position: 'absolute', width: 132, height: 132, borderRadius: '50%', background: 'var(--wash-halo)' }} />
          <span className="hino-pulse" style={{ position: 'relative' }}><Logo showWordmark={false} size={72} /></span>
        </div>

        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 34, lineHeight: 1.15, color: 'var(--text-heading)', margin: '0 0 10px', whiteSpace: 'nowrap' }}>
            Compondo seu hino
          </h1>
          <p style={{ fontSize: 16, color: 'var(--text-muted)', margin: 0, minHeight: 22 }}>{STAGES[stage] || STAGES[0]}</p>
        </div>

        <WaveBars playing bars={32} height={44} />

        <div style={{ width: 320, maxWidth: '80%' }}>
          <div style={{ height: 6, borderRadius: 'var(--radius-pill)', background: 'var(--bg-sunken)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: progress + '%', background: 'var(--wash-gold)', borderRadius: 'var(--radius-pill)', transition: 'width 400ms var(--ease-out)' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-faint)', marginTop: 8 }}>{progress}%</div>
        </div>

        <div style={{ paddingTop: 8 }}>
          <ScriptureQuote verse="Cantai ao Senhor um cântico novo." reference="Salmos 96:1" size="sm" align="center" />
        </div>
      </div>
    );
  }
  window.GeneratingStep = GeneratingStep;
})();
