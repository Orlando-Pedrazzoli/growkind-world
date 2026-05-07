'use client';

// ============================================================
// GrowKind — ReadingView · Experiência de leitura premium
// Onde o Mundo Nasce Entre Nós · João Pereira
// Inspiração: Apple Books + Substack + Kindle Paper
// ============================================================

import { useState, useEffect, useRef, useCallback } from 'react';
import type { Chapter, ContentBlock } from '@/lib/book-data/types';
import { bookIndex, bookMeta } from '@/lib/book-data';

interface ReadingViewProps {
  chapter: Chapter;
  hasFullAccess: boolean;
  onChapterChange: (chapterId: string) => void;
}

// Largura da sidebar quando ancorada (desktop)
const SIDEBAR_WIDTH_PX = 320;
// Breakpoint mínimo para sidebar persistente
const DESKTOP_MIN_WIDTH = 1024;
// Chave de persistência da preferência
const SIDEBAR_PREF_KEY = 'gk-reading-sidebar-open';

// ── Renderização de cada bloco de conteúdo ────────────────
function BlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'paragraph':
      return <p className='reading-paragraph'>{block.text}</p>;

    case 'pullquote':
      return (
        <blockquote className='reading-pullquote'>
          {block.text.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i < block.text.split('\n').length - 1 && <br />}
            </span>
          ))}
        </blockquote>
      );

    case 'section-title':
      return (
        <div className='reading-section-title'>
          <div className='reading-part-label'>{block.text}</div>
          {block.subtitle && (
            <div className='reading-part-subtitle'>
              {block.subtitle.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < block.subtitle!.split('\n').length - 1 && <br />}
                </span>
              ))}
            </div>
          )}
        </div>
      );

    case 'practices':
      return (
        <div className='reading-practices'>
          <div className='reading-practices-header'>
            <span className='reading-practices-eyebrow'>{block.title}</span>
            <span className='reading-practices-subtitle'>{block.subtitle}</span>
          </div>
          <div className='reading-practices-items'>
            {block.items.map((item, i) => (
              <div key={i} className='reading-practice-item'>
                <h4 className='reading-practice-title'>{item.title}</h4>
                <p className='reading-practice-text'>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case 'exercise':
      return (
        <div className='reading-exercise'>
          <div className='reading-exercise-header'>
            <span className='reading-exercise-eyebrow'>{block.title}</span>
            <span className='reading-exercise-subtitle'>{block.subtitle}</span>
          </div>
          <div className='reading-exercise-body'>
            {block.body.map((para, i) => (
              <p key={i} className='reading-exercise-para'>
                {para}
              </p>
            ))}
          </div>
        </div>
      );

    case 'silence':
      return (
        <div className='reading-silence'>
          <div className='reading-silence-rule' />
          <p className='reading-silence-text'>{block.text}</p>
        </div>
      );

    case 'next':
      return (
        <div className='reading-next'>
          <p className='reading-next-text'>{block.text}</p>
        </div>
      );

    default:
      return null;
  }
}

// ── Paywall suave no final dos capítulos preview ──────────
function PaywallGate() {
  return (
    <div className='reading-paywall'>
      <div className='reading-paywall-fade' />
      <div className='reading-paywall-card'>
        <div className='reading-paywall-ornament'>✦</div>
        <h3 className='reading-paywall-title'>Continue a leitura</h3>
        <p className='reading-paywall-text'>
          Aceda ao livro completo — todos os 20 capítulos, glossário
          técnico-científico e nota de fundamentação científica.
        </p>
        <div className='reading-paywall-price'>
          <span className='reading-paywall-amount'>14€</span>
          <span className='reading-paywall-period'>acesso vitalício</span>
        </div>
        <a href='/comprar/ebook' className='reading-paywall-btn'>
          Comprar acesso completo
        </a>
        <p className='reading-paywall-note'>
          Acesso vitalício · PDF + ePub incluídos
        </p>
      </div>
    </div>
  );
}

// ── Componente principal ──────────────────────────────────
export default function ReadingView({
  chapter,
  hasFullAccess,
  onChapterChange,
}: ReadingViewProps) {
  // Sidebar fechada inicialmente (será definida no useEffect com base em ecrã + preferência)
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [theme, setTheme] = useState<'light' | 'sepia' | 'dark'>('sepia');
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const isGated = chapter.access === 'full' && !hasFullAccess;

  // Detectar tamanho do ecrã + restaurar preferência da sidebar
  useEffect(() => {
    function checkScreen() {
      const desktop = window.innerWidth >= DESKTOP_MIN_WIDTH;
      setIsDesktop(desktop);

      // Em desktop: respeita preferência guardada (default: aberta)
      // Em mobile/tablet: sempre fechada por defeito
      if (desktop) {
        const saved = localStorage.getItem(SIDEBAR_PREF_KEY);
        // Se nunca foi tocada, abre por defeito; senão respeita escolha
        setSidebarOpen(saved === null ? true : saved === 'true');
      } else {
        setSidebarOpen(false);
      }
    }

    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // Toggle com persistência
  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => {
      const next = !prev;
      // Só persistir preferência em desktop (em mobile é sempre overlay temporário)
      if (window.innerWidth >= DESKTOP_MIN_WIDTH) {
        localStorage.setItem(SIDEBAR_PREF_KEY, String(next));
      }
      return next;
    });
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
    if (window.innerWidth >= DESKTOP_MIN_WIDTH) {
      localStorage.setItem(SIDEBAR_PREF_KEY, 'false');
    }
  }, []);

  // Progresso de scroll
  const handleScroll = useCallback(() => {
    if (!contentRef.current) return;
    const el = contentRef.current;
    const scrolled = el.scrollTop;
    const total = el.scrollHeight - el.clientHeight;
    setScrollProgress(total > 0 ? Math.round((scrolled / total) * 100) : 0);

    // Guardar progresso (debounce implícito)
    if (!isGated) {
      const key = `gk-reading-${chapter.id}`;
      localStorage.setItem(key, String(Math.round((scrolled / total) * 100)));
    }
  }, [chapter.id, isGated]);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Restaurar posição guardada
  useEffect(() => {
    const key = `gk-reading-${chapter.id}`;
    const saved = localStorage.getItem(key);
    if (saved && contentRef.current) {
      const pct = Number(saved) / 100;
      const total =
        contentRef.current.scrollHeight - contentRef.current.clientHeight;
      contentRef.current.scrollTop = total * pct;
    }
  }, [chapter.id]);

  const fontSizeClass = {
    sm: 'font-reading-sm',
    md: 'font-reading-md',
    lg: 'font-reading-lg',
  }[fontSize];

  const themeClass = {
    light: 'theme-light',
    sepia: 'theme-sepia',
    dark: 'theme-dark',
  }[theme];

  // Blocos a mostrar (com corte suave se gated)
  const visibleBlocks = isGated
    ? chapter.blocks.slice(0, 3) // Mostra apenas os primeiros 3 parágrafos
    : chapter.blocks;

  // Sidebar ancorada vs overlay:
  // - Em desktop com sidebar aberta → "ancorada" (conteúdo encolhe)
  // - Em mobile/tablet com sidebar aberta → "overlay" (conteúdo coberto)
  const sidebarMode: 'docked' | 'overlay' | 'closed' = !sidebarOpen
    ? 'closed'
    : isDesktop
      ? 'docked'
      : 'overlay';

  return (
    <div className={`reading-root ${themeClass}`}>
      {/* ── Barra de progresso topo ── */}
      <div
        className='reading-progress-bar'
        style={{ width: `${scrollProgress}%` }}
      />

      {/* ── Header ── */}
      <header
        className='reading-header'
        style={
          sidebarMode === 'docked'
            ? { paddingLeft: `${SIDEBAR_WIDTH_PX + 24}px` }
            : undefined
        }
      >
        <button
          className='reading-header-btn'
          onClick={toggleSidebar}
          aria-label={sidebarOpen ? 'Fechar índice' : 'Abrir índice'}
          aria-expanded={sidebarOpen}
        >
          <IconMenu />
        </button>

        <div className='reading-header-title'>
          <span className='reading-header-book'>{bookMeta.title}</span>
        </div>

        <div className='reading-header-controls'>
          {/* Tamanho da fonte */}
          <div className='reading-font-controls'>
            <button
              className={`reading-font-btn ${fontSize === 'sm' ? 'active' : ''}`}
              onClick={() => setFontSize('sm')}
              aria-label='Fonte pequena'
            >
              A
            </button>
            <button
              className={`reading-font-btn reading-font-btn--lg ${fontSize === 'lg' ? 'active' : ''}`}
              onClick={() => setFontSize('lg')}
              aria-label='Fonte grande'
            >
              A
            </button>
          </div>

          {/* Tema */}
          <div className='reading-theme-controls'>
            <button
              className={`reading-theme-btn theme-light-btn ${theme === 'light' ? 'active' : ''}`}
              onClick={() => setTheme('light')}
              aria-label='Tema claro'
            />
            <button
              className={`reading-theme-btn theme-sepia-btn ${theme === 'sepia' ? 'active' : ''}`}
              onClick={() => setTheme('sepia')}
              aria-label='Tema sépia'
            />
            <button
              className={`reading-theme-btn theme-dark-btn ${theme === 'dark' ? 'active' : ''}`}
              onClick={() => setTheme('dark')}
              aria-label='Tema escuro'
            />
          </div>
        </div>
      </header>

      {/* ── Sidebar (índice) ── */}
      {/* Overlay backdrop: só em modo overlay (mobile/tablet) */}
      {sidebarMode === 'overlay' && (
        <div className='reading-sidebar-overlay' onClick={closeSidebar} />
      )}

      {/* Aside da sidebar — sempre renderizada quando aberta. Em modo docked
          fica permanentemente visível à esquerda; em overlay paira sobre o conteúdo. */}
      {sidebarOpen && (
        <aside
          className='reading-sidebar'
          style={{
            // Em desktop ancorada: ocupa altura total e fica na coluna esquerda
            // Em overlay: comportamento default do CSS do João
            ...(sidebarMode === 'docked'
              ? {
                  width: `${SIDEBAR_WIDTH_PX}px`,
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  zIndex: 30,
                  borderRight: '1px solid rgba(0,0,0,0.08)',
                }
              : {}),
          }}
        >
          <div className='reading-sidebar-header'>
            <span className='reading-sidebar-title'>Índice</span>
            <button
              className='reading-sidebar-close'
              onClick={closeSidebar}
              aria-label='Fechar índice'
            >
              ✕
            </button>
          </div>
          <nav className='reading-sidebar-nav'>
            {bookIndex.map(section => (
              <div key={section.id} className='reading-sidebar-section'>
                {'chapters' in section ? (
                  <>
                    <div className='reading-sidebar-part'>{section.label}</div>
                    {section.chapters?.map(ch => (
                      <button
                        key={ch.id}
                        className={`reading-sidebar-chapter ${
                          ch.id === chapter.id ? 'active' : ''
                        } ${ch.access === 'full' && !hasFullAccess ? 'locked' : ''}`}
                        onClick={() => {
                          onChapterChange(ch.id);
                          // Em mobile/tablet, fechar a sidebar ao escolher capítulo
                          // Em desktop, manter aberta (utilizador pode continuar a navegar)
                          if (window.innerWidth < DESKTOP_MIN_WIDTH) {
                            setSidebarOpen(false);
                          }
                        }}
                      >
                        {ch.access === 'full' && !hasFullAccess && (
                          <span className='reading-sidebar-lock'>🔒</span>
                        )}
                        {ch.label}
                      </button>
                    ))}
                  </>
                ) : (
                  <button
                    className={`reading-sidebar-chapter reading-sidebar-chapter--top ${
                      section.id === chapter.id ? 'active' : ''
                    }`}
                    onClick={() => {
                      onChapterChange(section.id);
                      if (window.innerWidth < DESKTOP_MIN_WIDTH) {
                        setSidebarOpen(false);
                      }
                    }}
                  >
                    {section.label}
                  </button>
                )}
              </div>
            ))}
          </nav>
        </aside>
      )}

      {/* ── Conteúdo principal ── */}
      <main
        ref={contentRef}
        className={`reading-content ${fontSizeClass}`}
        style={
          sidebarMode === 'docked'
            ? { marginLeft: `${SIDEBAR_WIDTH_PX}px` }
            : undefined
        }
      >
        <div className='reading-content-inner'>
          {/* Título do capítulo */}
          <div className='reading-chapter-header'>
            <div className='reading-chapter-meta'>
              {chapter.estimatedMinutes} min de leitura
            </div>
            <h1 className='reading-chapter-title'>{chapter.title}</h1>
            {chapter.subtitle && (
              <p className='reading-chapter-subtitle'>
                {chapter.subtitle.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < chapter.subtitle!.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </p>
            )}
            <div className='reading-chapter-rule' />
          </div>

          {/* Blocos de conteúdo */}
          <div className='reading-blocks'>
            {visibleBlocks.map((block, i) => (
              <BlockRenderer key={i} block={block} />
            ))}
          </div>

          {/* Paywall se necessário */}
          {isGated && <PaywallGate />}

          {/* Navegação anterior/próximo */}
          {!isGated && (
            <div className='reading-chapter-nav'>
              <div className='reading-chapter-nav-rule' />
              <p className='reading-chapter-nav-label'>Continuar</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// ── Ícones simples ────────────────────────────────────────
function IconMenu() {
  return (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='currentColor'>
      <rect x='2' y='5' width='16' height='1.5' rx='0.75' />
      <rect x='2' y='9.25' width='16' height='1.5' rx='0.75' />
      <rect x='2' y='13.5' width='10' height='1.5' rx='0.75' />
    </svg>
  );
}
