import { ArrowRight } from 'lucide-react';
import Link from '@/components/ui/AppLink';
import Container from '@/components/ui/Container';
import Reveal from '@/components/ui/Reveal';

export default function DualCta({ data }) {
  return (
    <section className="bg-dark py-14 md:py-16">
      <Container>
        <Reveal className="grid gap-6 lg:grid-cols-2">
          {(data.items ?? []).map((item) => (
            <div key={item.title} className="rounded-3xl border border-white/10 bg-gradient-to-br from-teal/40 to-white/[0.03] p-8 md:p-12">
              {item.text ? (
                <p className="inline-flex rounded-full bg-white/10 px-4 py-1.5 font-display text-[0.8125rem] font-bold uppercase tracking-wide text-white">{item.text}</p>
              ) : null}
              <h2 className="mt-5 text-[1.75rem] font-bold leading-tight text-white md:text-[2rem]">{item.title}</h2>
              {item.cta_label ? (
                <Link
                  href={item.cta_url}
                  className="group mt-7 inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 font-display font-bold text-heading transition hover:bg-brand hover:text-white"
                >
                  {item.cta_label}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              ) : null}
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
