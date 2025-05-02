export interface PackageSectionConfig {
  id: string
  title: string
  description: string
  filter: (pkg: any) => boolean
  sort?: (a: any, b: any) => number
  limit?: number
}

export const packageSections: PackageSectionConfig[] = [
  {
    id: "budget-friendly",
    title: "Budget Friendly Packages",
    description: "Explore amazing destinations without breaking the bank",
    filter: (pkg) => pkg.price < 1500,
    sort: (a, b) => a.price - b.price,
    limit: 6
  },
  {
    id: "trending",
    title: "Trending Packages",
    description: "Discover our most popular travel experiences",
    filter: (pkg) => pkg.price >= 1500,
    sort: (a, b) => b.price - a.price,
    limit: 6
  },
  {
    id: "short-trips",
    title: "Short Getaways",
    description: "Perfect for quick escapes and weekend adventures",
    filter: (pkg) => pkg.duration.includes("3") || pkg.duration.includes("4"),
    sort: (a, b) => parseInt(a.duration) - parseInt(b.duration),
    limit: 6
  },
  {
    id: "luxury",
    title: "Luxury Escapes",
    description: "Indulge in premium travel experiences",
    filter: (pkg) => pkg.price >= 2000,
    sort: (a, b) => b.price - a.price,
    limit: 6
  }
] 