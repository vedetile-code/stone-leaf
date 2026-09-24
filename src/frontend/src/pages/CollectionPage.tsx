import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  SCALE_LABELS,
  SPECIMENS,
  SPECIMEN_SCALES,
  type Specimen,
  type SpecimenScale,
  VESSEL_MATERIALS,
  type VesselMaterial,
  formatMaterial,
} from "@/lib/specimens";
import { cn } from "@/lib/utils";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { ArrowRight, SlidersHorizontal } from "lucide-react";

/**
 * Search schema for /collection. Owned here (the page file) so the route can
 * validate and reflect filter state in the URL for shareable, refresh-safe
 * views. `undefined` means "all".
 */
export interface CollectionSearch {
  vessel?: VesselMaterial;
  scale?: SpecimenScale;
}

export function validateCollectionSearch(
  search: Record<string, unknown>,
): CollectionSearch {
  const next: CollectionSearch = {};
  if (VESSEL_MATERIALS.includes(search.vessel as VesselMaterial)) {
    next.vessel = search.vessel as VesselMaterial;
  }
  if (SPECIMEN_SCALES.includes(search.scale as SpecimenScale)) {
    next.scale = search.scale as SpecimenScale;
  }
  return next;
}

/**
 * Each piece is photographed inside a Bermuda interior. The setting is named
 * per specimen so the alt text describes the room, not just the plant.
 */
const INTERIOR_SETTINGS: Record<string, string> = {
  "monstera-alba":
    "a double-height living room with a limestone floor and ocean-facing glazing",
  "fiddle-leaf": "a coral stone wall with navy ironwork beyond the doorway",
  strelitzia:
    "an ocean-facing glazed wall spilling daylight across a limestone floor",
  "rubber-tree": "a coral stone wall framed by navy ironwork",
  philodendron: "a limestone floor beneath a glazed wall",
  "olive-tree":
    "a gallery wall beside the estate's gravel drive and coral stone",
  "zz-plant": "a limestone floor beside navy ironwork and a coral stone reveal",
  dracaena: "ocean-facing glazing and a coral stone wall",
};

function interiorSetting(specimen: Specimen): string {
  return (
    INTERIOR_SETTINGS[specimen.id] ??
    "a Bermuda interior with coral stone and limestone floors"
  );
}

interface FilterOption<T extends string> {
  value: T | undefined;
  label: string;
}

function FilterRow<T extends string>({
  label,
  options,
  active,
  onSelect,
  marker,
}: {
  label: string;
  options: FilterOption<T>[];
  active: T | undefined;
  onSelect: (value: T | undefined) => void;
  marker: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="eyebrow text-muted-foreground">{label}</span>
      <div className="flex flex-wrap gap-2" data-ocid={`collection.${marker}`}>
        {options.map((option) => {
          const isActive = option.value === active;
          return (
            <button
              key={option.value ?? "all"}
              type="button"
              data-ocid={`collection.${marker}.${option.value ?? "all"}`}
              aria-pressed={isActive}
              onClick={() => onSelect(option.value)}
              className={cn(
                "tracked border px-4 py-2 text-[0.65rem] transition-smooth",
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary hover:text-foreground",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SpecimenCard({
  specimen,
  index,
}: { specimen: Specimen; index: number }) {
  return (
    <Link
      to="/collection/$specimenId"
      params={{ specimenId: specimen.id }}
      search={(previous) => previous}
      data-ocid={`collection.item.${index + 1}`}
      className="group flex flex-col border border-border bg-card transition-smooth hover:border-primary/40 hover:shadow-elevated"
    >
      <div className="room-frame aspect-[3/4]">
        <img
          src={specimen.image}
          alt={`${specimen.name} in a ${specimen.vessel.toLowerCase()}, photographed in ${interiorSetting(specimen)}`}
          loading="lazy"
          className="size-full object-cover transition-smooth duration-700 group-hover:scale-[1.03]"
        />
        <span className="absolute left-4 top-4 z-10">
          <Badge
            variant="secondary"
            className="tracked rounded-none border-0 bg-background/85 px-3 py-1 text-[0.6rem] text-foreground backdrop-blur-sm"
          >
            {formatMaterial(specimen.material)}
          </Badge>
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="lockup text-sm leading-tight">{specimen.name}</h3>
          <span className="eyebrow shrink-0 text-muted-foreground">
            {specimen.height}
          </span>
        </div>
        <p className="font-body text-sm italic text-muted-foreground">
          {specimen.botanical}
        </p>
        <p className="mt-auto flex items-center gap-2 pt-2 text-[0.7rem] text-muted-foreground">
          <span className="tracked">{SCALE_LABELS[specimen.scale]}</span>
          <span aria-hidden="true" className="h-px w-4 bg-border" />
          <span className="truncate">{specimen.vessel}</span>
        </p>
        <span className="tracked mt-2 inline-flex items-center gap-2 text-[0.65rem] text-accent">
          View Piece
          <ArrowRight className="size-3.5 transition-smooth group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

/**
 * The Collection — a curated grid of finished specimen pieces with
 * vessel-material and scale filters reflected in the URL.
 */
export function CollectionPage() {
  const search = useSearch({ from: "/collection" });
  const navigate = useNavigate();

  const vessel = search.vessel;
  const scale = search.scale;

  const filtered = SPECIMENS.filter(
    (specimen) =>
      (!vessel || specimen.material === vessel) &&
      (!scale || specimen.scale === scale),
  );

  const hasFilters = Boolean(vessel || scale);

  const setFilter = (next: Partial<CollectionSearch>) => {
    void navigate({
      to: "/collection",
      search: { vessel, scale, ...next },
      replace: true,
    });
  };

  return (
    <div className="bg-background">
      <section className="wash-interior border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p className="eyebrow text-muted-foreground">The Collection</p>
          <h1 className="lockup mt-6 max-w-3xl text-3xl leading-tight md:text-5xl">
            Finished Pieces, Ready to Place.
          </h1>
          <p className="mt-6 max-w-xl font-body text-sm leading-relaxed text-muted-foreground md:text-base">
            Each specimen is presented as a completed work — a rare indoor plant
            already paired with its stone, matte ceramic, or concrete vessel.
            Browse the full collection at your own pace, and come by the studio
            whenever you would like to see a piece in person.
          </p>
          <div className="ironwork-rule mt-10 max-w-xs" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div
          className="flex flex-col gap-8 border-b border-border pb-10 md:flex-row md:items-end md:justify-between"
          data-ocid="collection.filters"
        >
          <div className="flex items-center gap-3">
            <SlidersHorizontal className="size-4 text-muted-foreground" />
            <span className="eyebrow text-foreground">Refine</span>
          </div>
          <div className="flex flex-col gap-6 md:flex-row md:gap-12">
            <FilterRow
              label="Vessel Material"
              marker="vessel"
              active={vessel}
              onSelect={(value) => setFilter({ vessel: value })}
              options={[
                { value: undefined, label: "All" },
                ...VESSEL_MATERIALS.map((material) => ({
                  value: material,
                  label: formatMaterial(material),
                })),
              ]}
            />
            <FilterRow
              label="Scale"
              marker="scale"
              active={scale}
              onSelect={(value) => setFilter({ scale: value })}
              options={[
                { value: undefined, label: "All" },
                ...SPECIMEN_SCALES.map((item) => ({
                  value: item,
                  label: SCALE_LABELS[item],
                })),
              ]}
            />
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <p
            className="eyebrow text-muted-foreground"
            data-ocid="collection.count"
          >
            {filtered.length} {filtered.length === 1 ? "Piece" : "Pieces"}
          </p>
          {hasFilters ? (
            <Button
              type="button"
              variant="ghost"
              data-ocid="collection.clear_button"
              onClick={() => setFilter({ vessel: undefined, scale: undefined })}
              className="tracked h-auto rounded-none px-0 text-[0.65rem] text-muted-foreground hover:bg-transparent hover:text-foreground"
            >
              Clear Filters
            </Button>
          ) : null}
        </div>

        {filtered.length > 0 ? (
          <div
            className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            data-ocid="collection.list"
          >
            {filtered.map((specimen, index) => (
              <SpecimenCard
                key={specimen.id}
                specimen={specimen}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div
            className="mt-10 flex flex-col items-center border border-dashed border-border bg-card px-6 py-20 text-center"
            data-ocid="collection.empty_state"
          >
            <span className="eyebrow text-muted-foreground">No Match</span>
            <h2 className="lockup mt-6 max-w-md text-xl leading-tight md:text-2xl">
              No Pieces in This Combination.
            </h2>
            <p className="mt-5 max-w-md font-body text-sm leading-relaxed text-muted-foreground">
              The collection is small and deliberately so. Adjust your filters,
              or come by the studio and we will walk you through the pieces
              currently on the floor.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                variant="outline"
                data-ocid="collection.empty_clear_button"
                onClick={() =>
                  setFilter({ vessel: undefined, scale: undefined })
                }
                className="tracked h-auto rounded-none border-primary px-6 py-3 text-[0.65rem] text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Clear Filters
              </Button>
              <Button
                asChild
                className="tracked h-auto rounded-none bg-primary px-6 py-3 text-[0.65rem] text-primary-foreground hover:bg-primary/90"
              >
                <Link to="/contact" data-ocid="collection.empty_visit_button">
                  Plan a Visit
                </Link>
              </Button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
