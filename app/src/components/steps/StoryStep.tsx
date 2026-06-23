'use client';
import { Textarea }       from '@/components/ui/Textarea';
import { Tag }            from '@/components/ui/Tag';
import { Button }         from '@/components/ui/Button';
import { StepDots }       from '@/components/ui/StepDots';
// import { ScriptureQuote } from '@/components/ui/ScriptureQuote';

const THEMES = ['Gratidão', 'Esperança', 'Fé', 'Família', 'Cura', 'Segunda vinda', 'Perdão'];

interface StoryStepProps {
  story: string;
  setStory: (v: string) => void;
  themes: string[];
  toggleTheme: (t: string) => void;
  onNext: () => void;
}

export function StoryStep({ story, setStory, themes, toggleTheme, onNext }: StoryStepProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <StepDots total={3} current={1} />

      <div>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 40,
          lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--text-heading)', margin: '0 0 10px',
        }}>
          Conte sua história
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--text-muted)', margin: 0, maxWidth: 460 }}>
          Um momento de fé, uma superação, uma graça recebida, um pedido. Nós transformamos em louvor.
        </p>
      </div>

      <div>
        
        <Textarea
          label="Conte com suas palavras"
          placeholder="Ex.: Passei por um momento muito difícil, mas senti a presença de Deus me sustentando e fui renovado pela Sua graça…"
          showCount
          hint='mínimo de 12 caracteres'
          maxLength={600}
          value={story}
          onChange={(e) => setStory(e.target.value)}
          rows={5}
        />
        {/* <p style={{ fontSize: 12.5, color: 'var(--text-muted)', margin: '0 0 8px' }}>
          mínimo de 12 caracteres.
        </p> */}
      </div>

      <div>
        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-heading)', margin: '0 0 12px' }}>
          Temas que aparecem na sua história{' '}
          <span style={{ fontWeight: 500, color: 'var(--text-faint)' }}>(opcional)</span>
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
          {THEMES.map((t) => (
            <Tag key={t} selected={themes.includes(t)} onClick={() => toggleTheme(t)}>
              {t}
            </Tag>
          ))}
        </div>
      </div>

      <div className="hino-story-cta">
        <Button size="lg" iconRight="arrowRight" disabled={story.trim().length < 12} onClick={onNext}>
          Continuar
        </Button>
      </div>
    </div>
  );
}
