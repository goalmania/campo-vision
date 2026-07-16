import { useParams, Navigate } from "react-router-dom";
import { useFadeUp } from "@/hooks/useFadeUp";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useJsonLd } from "@/hooks/useJsonLd";
import Nav from "@/components/Nav";
import Logo from "@/components/Logo";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ARTICLES } from "@/data/articles";

const ArticlePage = () => {
  useFadeUp();
  const { slug } = useParams();
  const article = ARTICLES.find((a) => a.slug === slug);

  const canonical = `https://dmfootballservices.it/risorse/${slug}`;

  useDocumentMeta({
    title: article ? `${article.title} | ClubIS` : "Risorsa non trovata | ClubIS",
    description: article?.description ?? "",
    canonical,
  });

  useJsonLd(
    article
      ? {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.description,
          datePublished: article.publishDate,
          dateModified: article.publishDate,
          author: { "@id": "https://dmfootballservices.it/#organization" },
          publisher: { "@id": "https://dmfootballservices.it/#organization" },
          mainEntityOfPage: canonical,
        }
      : { "@context": "https://schema.org", "@type": "WebPage", name: "Risorsa non trovata" }
  );

  useJsonLd({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://dmfootballservices.it/" },
      { "@type": "ListItem", position: 2, name: "Risorse", item: "https://dmfootballservices.it/risorse" },
      ...(article ? [{ "@type": "ListItem", position: 3, name: article.title, item: canonical }] : []),
    ],
  });

  if (!article) return <Navigate to="/risorse" replace />;

  return (
    <div id="top" className="relative">
      <Nav />

      <article className="relative pt-[60px]">
        <div className="max-w-3xl mx-auto px-6 md:px-10 py-20 md:py-28">
          <a href="/risorse" className="fade-up inline-flex items-center gap-2 font-display font-bold uppercase text-cis-muted hover:text-cis-green text-[11px] transition-colors" style={{ letterSpacing: "0.14em" }}>
            <ArrowLeft size={14} /> Tutte le risorse
          </a>

          <h1
            className="fade-up font-display font-black uppercase text-cis-white mt-7"
            data-delay="80"
            style={{ fontSize: "clamp(1.8rem, 4.5vw, 3rem)", lineHeight: 1.05, letterSpacing: "-0.01em" }}
          >
            {article.title}
          </h1>
          <p className="fade-up font-body text-cis-muted mt-4 text-[13px] uppercase" data-delay="140" style={{ letterSpacing: "0.08em" }}>
            {article.readingMinutes} min di lettura · Pubblicato il {new Date(article.publishDate).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" })}
          </p>

          <div className="fade-up mt-12" data-delay="200">
            {article.body}
          </div>

          <div className="fade-up mt-14 pt-8 border-t border-cis-line flex flex-wrap gap-3" data-delay="240">
            <a href="/clubis" className="btn-primary">Scopri ClubIS <ArrowRight size={15} /></a>
            <a href="/risorse" className="btn-outline">Altre guide</a>
          </div>
        </div>
      </article>

      <footer className="relative pt-14 pb-10 border-t border-cis-line" style={{ background: "#111111" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <a href="/"><Logo /></a>
            <div className="flex flex-wrap items-center gap-7">
              <a href="/clubis" className="nav-link">ClubIS</a>
              <a href="/dmscout" className="nav-link">DM Scout</a>
              <a href="/risorse" className="nav-link">Risorse</a>
              <a href="/#prezzi" className="nav-link">Prezzi</a>
              <a href="/#contatti" className="nav-link">Contatti</a>
            </div>
          </div>
          <div className="my-9 h-px bg-cis-line" />
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-cis-muted">
            <div className="flex flex-wrap gap-5 font-display font-bold text-[11px] uppercase" style={{ letterSpacing: "0.16em" }}>
              <a href="/privacy" className="hover:text-cis-white">Privacy Policy</a>
              <a href="/termini" className="hover:text-cis-white">Termini di Servizio</a>
              <a href="/cookie" className="hover:text-cis-white">Cookie Policy</a>
            </div>
            <div className="font-body text-xs">
              © 2026 DM Football Services — Tutti i diritti riservati.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ArticlePage;
