/**
 * The Stone & Leaf collection.
 *
 * Each specimen is presented as a finished masterpiece: a rare indoor plant
 * already paired with its stone, matte ceramic, or concrete vessel. This is
 * editorial catalogue data for the studio's curated collection, and every
 * description places the piece inside a Bermuda interior — coral stone walls,
 * navy ironwork, ocean-facing glazing, gravel drives, and limestone floors.
 */

export type VesselMaterial = "stone" | "matte ceramic" | "concrete";
export type SpecimenScale = "tabletop" | "floor" | "statement";

export interface Specimen {
  id: string;
  name: string;
  botanical: string;
  vessel: string;
  material: VesselMaterial;
  scale: SpecimenScale;
  height: string;
  image: string;
  description: string;
}

export const VESSEL_MATERIALS: VesselMaterial[] = [
  "stone",
  "matte ceramic",
  "concrete",
];

export const SPECIMEN_SCALES: SpecimenScale[] = [
  "tabletop",
  "floor",
  "statement",
];

export const SCALE_LABELS: Record<SpecimenScale, string> = {
  tabletop: "Tabletop",
  floor: "Floor",
  statement: "Statement",
};

export const SPECIMENS: Specimen[] = [
  {
    id: "monstera-alba",
    name: "Variegated Monstera",
    botanical: "Monstera deliciosa 'Albo Variegata'",
    vessel: "Honed limestone column",
    material: "stone",
    scale: "statement",
    height: "1.9 m",
    image: "/assets/generated/specimen-monstera.dim_900x1200.jpg",
    description:
      "A single mature vine trained against a honed limestone column, its white-splashed leaves reading as brushwork against the stone. Placed as the anchor of a double-height living room, where ocean-facing glazing throws its shadow across a limestone floor.",
  },
  {
    id: "fiddle-leaf",
    name: "Fiddle-Leaf Fig",
    botanical: "Ficus lyrata",
    vessel: "Matte ceramic urn",
    material: "matte ceramic",
    scale: "floor",
    height: "2.2 m",
    image: "/assets/generated/specimen-fiddle.dim_900x1200.jpg",
    description:
      "Broad, leathery leaves held on a clean single trunk, set into a hand-thrown matte urn. The quiet vertical that gives a coastal interior its architecture, standing against a coral stone wall with navy ironwork beyond.",
  },
  {
    id: "strelitzia",
    name: "Giant Bird of Paradise",
    botanical: "Strelitzia nicolai",
    vessel: "Cast concrete planter",
    material: "concrete",
    scale: "statement",
    height: "2.6 m",
    image: "/assets/generated/specimen-strelitzia.dim_900x1200.jpg",
    description:
      "Fanning paddle leaves on a sculptural clump, held in a cast concrete planter with a raw, sand-blasted face. A living screen for an ocean-facing glazed wall, catching the light that spills across the limestone floor.",
  },
  {
    id: "rubber-tree",
    name: "Burgundy Rubber Tree",
    botanical: "Ficus elastica 'Burgundy'",
    vessel: "Matte ceramic cylinder",
    material: "matte ceramic",
    scale: "floor",
    height: "1.6 m",
    image: "/assets/generated/specimen-rubber.dim_900x1200.jpg",
    description:
      "Deep oxblood leaves with a lacquered finish, rising from a matte ceramic cylinder. Reads as a dark, glossy note against a coral stone wall, with navy ironwork framing the room behind it.",
  },
  {
    id: "philodendron",
    name: "Philodendron Imperial",
    botanical: "Philodendron 'Imperial Green'",
    vessel: "Carved stone bowl",
    material: "stone",
    scale: "tabletop",
    height: "0.7 m",
    image: "/assets/generated/specimen-philodendron.dim_900x1200.jpg",
    description:
      "Dense, upright foliage in a carved stone bowl, sized for a console or a bedside plinth. The smallest piece in the collection, and the most architectural — a green note on a limestone floor beneath a glazed wall.",
  },
  {
    id: "olive-tree",
    name: "Indoor Olive",
    botanical: "Olea europaea",
    vessel: "Cast concrete trough",
    material: "concrete",
    scale: "statement",
    height: "2.0 m",
    image: "/assets/generated/specimen-olive.dim_900x1200.jpg",
    description:
      "A gnarled, silver-leafed olive held in a long cast concrete trough. Placed along a gallery wall, it brings the estate's gravel drive and coral stone language inside, softened by the light from the glazing.",
  },
  {
    id: "zz-plant",
    name: "Zenzi ZZ",
    botanical: "Zamioculcas zamiifolia 'Zenzi'",
    vessel: "Matte ceramic cube",
    material: "matte ceramic",
    scale: "tabletop",
    height: "0.5 m",
    image: "/assets/generated/specimen-zz.dim_900x1200.jpg",
    description:
      "Compact, glossy fronds in a matte ceramic cube. A low-light piece for a study or a hotel suite, requiring almost nothing of its keeper — at home on a limestone floor beside navy ironwork and a coral stone reveal.",
  },
  {
    id: "dracaena",
    name: "Dragon Tree",
    botanical: "Dracaena draco",
    vessel: "Honed limestone plinth",
    material: "stone",
    scale: "floor",
    height: "1.4 m",
    image: "/assets/generated/specimen-dracaena.dim_900x1200.jpg",
    description:
      "A slow-grown rosette on a thick trunk, set on a honed limestone plinth. Sculptural from every angle, it holds a corner without asking for attention, framed by ocean-facing glazing and a coral stone wall.",
  },
];

export function getSpecimen(id: string): Specimen | undefined {
  return SPECIMENS.find((specimen) => specimen.id === id);
}

export function formatMaterial(material: VesselMaterial): string {
  return material.replace(/\b\w/g, (character) => character.toUpperCase());
}
