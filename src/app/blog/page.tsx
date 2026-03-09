import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Artigos sobre educação, neurodiversidade e desenvolvimento infantil.',
};

export default function BlogPage() {
  return (
    <section className="section-padding">
      <div className="content-width">
        <h1 className="text-[var(--color-gk-green-dark)]">Blog</h1>
        <p className="mt-6 text-lg text-[var(--color-gk-black)]/70">
          Artigos em preparação. Em breve, conteúdos sobre educação,
          neurodiversidade e desenvolvimento infantil.
        </p>
      </div>
    </section>
  );
}
