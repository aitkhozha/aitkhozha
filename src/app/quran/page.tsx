'use client';

import { useState, useEffect, useCallback } from 'react';

const verses = [
  {
    id: 1,
    arabic:
      'بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ\nيَـٰٓأَيُّهَا ٱلنَّاسُ ٱتَّقُوا۟ رَبَّكُمُ ٱلَّذِى خَلَقَكُم مِّن نَّفْسٍ وَٰحِدَةٍ وَخَلَقَ مِنْهَا زَوْجَهَا وَبَثَّ مِنْهُمَا رِجَالًا كَثِيرًا وَنِسَآءً ۚ وَٱتَّقُوا۟ ٱللَّهَ ٱلَّذِى تَسَآءَلُونَ بِهِۦ وَٱلْأَرْحَامَ ۚ إِنَّ ٱللَّهَ كَانَ عَلَيْكُمْ رَقِيبًا',
    russian:
      'О люди! Бойтесь вашего Господа, Который сотворил вас из одного человека, сотворил из него пару ему и расселил от них обоих множество мужчин и женщин. Бойтесь Аллаха, именем Которого вы просите друг друга, и бойтесь разрывать родственные связи. Воистину, Аллах наблюдает за вами.',
  },
  {
    id: 2,
    arabic:
      'وَءَاتُوا۟ ٱلْيَتَـٰمَىٰٓ أَمْوَٰلَهُمْ ۖ وَلَا تَتَبَدَّلُوا۟ ٱلْخَبِيثَ بِٱلطَّيِّبِ ۖ وَلَا تَأْكُلُوٓا۟ أَمْوَٰلَهُمْ إِلَىٰٓ أَمْوَٰلِكُمْ ۚ إِنَّهُۥ كَانَ حُوبًا كَبِيرًا',
    russian:
      'Отдавайте сиротам их имущество и не подменяйте дурным хорошее. Не присваивайте их имущества вместе со своим, ибо это — великий грех.',
  },
  {
    id: 3,
    arabic:
      'وَإِنْ خِفْتُمْ أَلَّا تُقْسِطُوا۟ فِى ٱلْيَتَـٰمَىٰ فَٱنكِحُوا۟ مَا طَابَ لَكُم مِّنَ ٱلنِّسَآءِ مَثْنَىٰ وَثُلَـٰثَ وَرُبَـٰعَ ۖ فَإِنْ خِفْتُمْ أَلَّا تَعْدِلُوا۟ فَوَٰحِدَةً أَوْ مَا مَلَكَتْ أَيْمَـٰنُكُمْ ۚ ذَٰلِكَ أَدْنَىٰٓ أَلَّا تَعُولُوا۟',
    russian:
      'Если вы боитесь, что не будете справедливы к сиротам, то женитесь на тех женщинах, что приятны вам: на двух, трёх, четырёх. А если боитесь, что не будете одинаково справедливы, то — на одной или на тех, которыми овладели ваши десницы. Это ближе к тому, чтобы вы не были несправедливы.',
  },
];

export default function QuranPage() {
  const [activeVerse, setActiveVerse] = useState(-1);
  const [phase, setPhase] = useState<'idle' | 'showing' | 'done'>('idle');

  const startAnimation = useCallback(() => {
    setActiveVerse(-1);
    setPhase('showing');
    let current = 0;

    const showNext = () => {
      if (current < verses.length) {
        setActiveVerse(current);
        current++;
        setTimeout(showNext, 5000);
      } else {
        setPhase('done');
      }
    };

    setTimeout(showNext, 800);
  }, []);

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  return (
    <div style={styles.wrapper}>
      <div style={styles.overlay} />

      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.surahTitle}>سُورَةُ النِّسَاءِ</h1>
          <p style={styles.surahSubtitle}>Сура ан-Ниса (Женщины)</p>
        </header>

        <div style={styles.versesContainer}>
          {verses.map((verse, index) => {
            const isVisible = activeVerse >= index;
            return (
              <div
                key={verse.id}
                style={{
                  ...styles.verseCard,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? 'translateY(0) scale(1)'
                    : 'translateY(40px) scale(0.97)',
                  transition:
                    'opacity 1.4s cubic-bezier(0.22, 1, 0.36, 1), transform 1.4s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                <div style={styles.verseNumber}>
                  <span style={styles.verseNumberInner}>{verse.id}</span>
                </div>

                <div style={styles.arabicBlock}>
                  <p style={styles.arabicText}>{verse.arabic}</p>
                </div>

                <div style={styles.divider}>
                  <span style={styles.dividerDot} />
                  <span style={styles.dividerLine} />
                  <span style={styles.dividerDot} />
                </div>

                <div style={styles.russianBlock}>
                  <p style={styles.russianText}>{verse.russian}</p>
                </div>
              </div>
            );
          })}
        </div>

        {phase === 'done' && (
          <button
            onClick={startAnimation}
            style={styles.replayButton}
          >
            Повторить анимацию
          </button>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    minHeight: '100vh',
    background: 'transparent',
    position: 'relative',
    overflow: 'hidden',
  },
  overlay: {
    display: 'none',
  },
  container: {
    position: 'relative',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '3rem 1.5rem 4rem',
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem',
  },
  surahTitle: {
    fontFamily: '"Amiri", "Traditional Arabic", serif',
    fontSize: '3rem',
    color: '#d4af37',
    margin: '0 0 0.5rem',
    fontWeight: 400,
    lineHeight: 1.6,
  },
  surahSubtitle: {
    fontSize: '1.1rem',
    color: 'rgba(212, 175, 55, 0.6)',
    margin: 0,
    letterSpacing: '0.15em',
    fontWeight: 300,
  },
  versesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2.5rem',
  },
  verseCard: {
    background: 'transparent',
    border: '1px solid rgba(212, 175, 55, 0.15)',
    borderRadius: '16px',
    padding: '2.5rem 2rem',
    position: 'relative',
  },
  verseNumber: {
    position: 'absolute',
    top: '-14px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '28px',
    height: '28px',
    background: 'linear-gradient(135deg, #d4af37, #b8962e)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verseNumberInner: {
    fontSize: '0.75rem',
    color: '#0a0f1a',
    fontWeight: 700,
  },
  arabicBlock: {
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  arabicText: {
    fontFamily: '"Amiri", "Traditional Arabic", serif',
    fontSize: '1.75rem',
    lineHeight: 2.2,
    color: '#e8dcc8',
    margin: 0,
    direction: 'rtl',
    whiteSpace: 'pre-line',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    margin: '0.5rem 0 1.5rem',
  },
  dividerDot: {
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    background: 'rgba(212, 175, 55, 0.4)',
  },
  dividerLine: {
    width: '60px',
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent)',
  },
  russianBlock: {
    textAlign: 'center',
  },
  russianText: {
    fontSize: '1rem',
    lineHeight: 1.9,
    color: 'rgba(232, 220, 200, 0.65)',
    margin: 0,
    fontWeight: 300,
    fontStyle: 'italic',
  },
  replayButton: {
    display: 'block',
    margin: '3rem auto 0',
    padding: '0.75rem 2rem',
    background: 'transparent',
    border: '1px solid rgba(212, 175, 55, 0.3)',
    borderRadius: '8px',
    color: 'rgba(212, 175, 55, 0.7)',
    fontSize: '0.9rem',
    cursor: 'pointer',
    letterSpacing: '0.1em',
    transition: 'all 0.3s ease',
  },
};
