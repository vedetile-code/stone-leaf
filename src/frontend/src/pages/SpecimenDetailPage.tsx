import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  SCALE_LABELS,
  SPECIMENS,
  formatMaterial,
  getSpecimen,
} from "@/lib/specimens";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface DetailRow {
  label: string;
  value: string;
}

/**
 * Specimen detail — the plant, its paired vessel, scale, and a short
 * editorial description, presented as a finished piece inside a Bermuda
 * interior room rather than as a product shot.
 */
export function SpecimenDetailPage() {
  const { specimenId } = useParams({ from: "/collection/$specimenId" });
  const specimen = getSpecimen(specimenId);

  if (!specimen) {
    return (
      <div className="bg-background">
        <section className="mx-auto flex max-w-3xl flex-col items-center px-6 py-28 text-center md:py-40">
          <span className="eyebrow text-muted-foreground">Not Found</span>
          <h1 className="lockup mt-6 text-2xl leading-tight md:text-4xl">
            This Piece Is No Longer Listed.
          </h1>
          <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-muted-foreground">
            The collection changes quietly. Return to the collection, or come by
            the studio and we will walk you through the pieces held off the
            floor.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              variant="outline"
              className="tracked h-auto rounded-none border-primary px-6 py-3 text-[0.65rem] text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Link to="/collection" data-ocid="detail.back_button">
                Back to Collection
              </Link>
            </Button>
            <Button
              asChild
              className="tracked h-auto rounded-none bg-primary px-6 py-3 text-[0.65rem] text-primary-foreground hover:bg-primary/90"
            >
              <Link to="/contact" data-ocid="detail.request_button">
                Plan a Visit
              </Link>
            </Button>
          </div>
        </section>
      </div>
    );
  }

  const details: DetailRow[] = [
    { label: "Botanical", value: specimen.botanical },
    { label: "Vessel", value: specimen.vessel },
    { label: "Material", value: formatMaterial(specimen.material) },
    { label: "Scale", value: SCALE_LABELS[specimen.scale] },
    { label: "Height", value: specimen.height },
  ];

  const related = SPECIMENS.filter(
    (item) => item.id !== specimen.id && item.material === specimen.material,
  ).slice(0, 3);

  return (
    <div className="bg-background">
      <section className="mx-auto max-w-6xl px-6 pt-10 md:pt-14">
        <Link
          to="/collection"
          search={(previous) => previous}
          data-ocid="detail.back_link"
          className="tracked inline-flex items-center gap-2 text-[0.65rem] text-muted-foreground transition-smooth hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          The Collection
        </Link>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-12 md:grid-cols-2 md:gap-16 md:py-16">
        <div className="reveal">
          <div className="room-frame aspect-[3/4]">
            <img
              src={specimen.image}
              alt={`${specimen.name} in a ${specimen.vessel.toLowerCase()}, set against a coral stone wall with navy ironwork and ocean daylight across a limestone floor`}
              className="size-full object-cover"
            />
          </div>
          <div className="ironwork-rule mt-5" />
          <p className="eyebrow mt-4 text-muted-foreground">
            Shown in the studio · coral stone, navy ironwork, ocean daylight
          </p>
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3">
            <Badge
              variant="secondary"
              className="tracked rounded-none border-0 bg-secondary px-3 py-1 text-[0.6rem] text-secondary-foreground"
            >
              {formatMaterial(specimen.material)}
            </Badge>
            <span className="eyebrow text-muted-foreground">
              {SCALE_LABELS[specimen.scale]}
            </span>
          </div>

          <h1 className="lockup mt-7 text-2xl leading-tight md:text-4xl">
            {specimen.name}
          </h1>
          <p className="mt-4 font-body text-base italic text-muted-foreground">
            {specimen.botanical}
          </p>

          <p className="mt-8 max-w-lg font-body text-sm leading-relaxed text-foreground/80 md:text-base">
            {specimen.description}
          </p>

          <dl className="mt-10 grid grid-cols-1 gap-x-10 gap-y-5 border-t border-border pt-8 sm:grid-cols-2">
            {details.map((row) => (
              <div key={row.label} className="flex flex-col gap-1.5">
                <dt className="eyebrow text-muted-foreground">{row.label}</dt>
                <dd className="font-body text-sm text-foreground">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              className="tracked h-auto rounded-none bg-primary px-7 py-3.5 text-[0.65rem] text-primary-foreground hover:bg-primary/90"
            >
              <Link to="/contact" data-ocid="detail.primary_button">
                Plan a Visit
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="tracked h-auto rounded-none border-primary px-7 py-3.5 text-[0.65rem] text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Link
                to="/collection"
                search={(previous) => previous}
                data-ocid="detail.secondary_button"
              >
                Come See Us
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="wash-interior border-t border-border">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <div className="flex items-end justify-between">
              <h2 className="lockup text-lg md:text-xl">
                More in {formatMaterial(specimen.material)}
              </h2>
              <Link
                to="/collection"
                search={{ vessel: specimen.material }}
                data-ocid="detail.related_view_all_link"
                className="tracked inline-flex items-center gap-2 text-[0.65rem] text-accent transition-smooth hover:opacity-70"
              >
                View All
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => (
                <Link
                  key={item.id}
                  to="/collection/$specimenId"
                  params={{ specimenId: item.id }}
                  search={(previous) => previous}
                  data-ocid={`detail.related_item.${index + 1}`}
                  className="group flex flex-col border border-border bg-card transition-smooth hover:border-primary/40 hover:shadow-elevated"
                >
                  <div className="room-frame aspect-[3/4]">
                    <img
                      src={item.image}
                      alt={`${item.name} in a ${item.vessel.toLowerCase()}, placed in a Bermuda interior with coral stone, navy ironwork and limestone floor`}
                      loading="lazy"
                      className="size-full object-cover transition-smooth duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-col gap-2 p-6">
                    <h3 className="lockup text-sm leading-tight">
                      {item.name}
                    </h3>
                    <p className="font-body text-xs italic text-muted-foreground">
                      {item.botanical}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
