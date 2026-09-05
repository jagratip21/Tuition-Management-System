"use client"
import fallbackImg from "../assets/service-default.jpeg";
import { useNavigate } from "react-router-dom"
import { Scale, Landmark, Gavel, Building2, Users2, FileSignature, ArrowRight } from "lucide-react"

function ServiceCard({ name, slug, imageUrl }) {
  const navigate = useNavigate()
  const Icon = getIconByName(name)

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:border-primary"
      role="article"
      aria-label={name}
    >
      {/* top accent bar */}
      <span className="absolute inset-x-0 top-0 h-1 bg-primary/80" aria-hidden="true" />

      {/* media */}
      {imageUrl ? (
        <div className="relative w-full h-44 overflow-hidden">
          <img
            src={imageUrl || fallbackImg}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/80 px-2 py-1 text-xs font-medium text-foreground backdrop-blur">
            <Icon className="h-3.5 w-3.5 text-primary" />
            <span className="uppercase tracking-wide">Practice</span>
          </span>
        </div>
      ) : (
        <div className="w-full h-44 bg-muted flex items-center justify-center">
          <Icon className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
          <span className="sr-only">{"No image available"}</span>
        </div>
      )}

      {/* content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-start gap-3">
          <div className="hidden sm:flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/20">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <h3 className="text-lg font-semibold leading-snug text-foreground text-pretty">{name}</h3>
        </div>

        <p className="mb-5 text-sm text-muted-foreground line-clamp-2">
          {slug ? slug.replace(/-/g, " ") : "Explore how our experienced attorneys can help."}
        </p>

        <div className="mt-auto">
          <button
            onClick={() => navigate(`/services/${slug}`)}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded"
          >
            Learn more
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </article>
  )
}

function getIconByName(name = "") {
  const n = name.toLowerCase()
  if (n.includes("criminal")) return Gavel
  if (n.includes("corporate") || n.includes("business")) return Building2
  if (n.includes("family")) return Users2
  if (n.includes("real") || n.includes("estate") || n.includes("property")) return Landmark
  if (n.includes("contract") || n.includes("agreement")) return FileSignature
  return Scale
}

export default ServiceCard
