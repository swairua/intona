import { get } from './client'

export interface GalleryItem {
  id: number
  title: string
  image: string
  category: string
}

const defaultGalleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Modern Residential Complex",
    image: "https://cdn.builder.io/api/v1/image/assets%2Fc289c2c29f354ddfba7264f2fced3fad%2F23058ba24ee54a83aac0513a8b23cea4?format=webp&width=1200",
    category: "Residential"
  },
  {
    id: 2,
    title: "Multi-Story Apartment Building",
    image: "https://cdn.builder.io/api/v1/image/assets%2Fc289c2c29f354ddfba7264f2fced3fad%2F047753769db24e5e91f7bfb612eaf949?format=webp&width=1200",
    category: "Residential"
  },
  {
    id: 3,
    title: "Urban Housing Project",
    image: "https://cdn.builder.io/api/v1/image/assets%2Fc289c2c29f354ddfba7264f2fced3fad%2F7ea274c04f374b529778cd0cdf834ff6?format=webp&width=1200",
    category: "Residential"
  },
  {
    id: 4,
    title: "Commercial Office Building",
    image: "https://cdn.builder.io/api/v1/image/assets%2Fc289c2c29f354ddfba7264f2fced3fad%2F4ce34cc1f7674d679ed4b0bdd0162e33?format=webp&width=1200",
    category: "Commercial"
  },
  {
    id: 5,
    title: "Mixed-Use Development",
    image: "https://cdn.builder.io/api/v1/image/assets%2Fc289c2c29f354ddfba7264f2fced3fad%2F4cbd85c3202a4b42b03c6472f85aed7b?format=webp&width=1200",
    category: "Commercial"
  },
  {
    id: 6,
    title: "Industrial Facility",
    image: "https://cdn.builder.io/api/v1/image/assets%2Fc289c2c29f354ddfba7264f2fced3fad%2F68d23b4eb46f4011bf3d33193412ee98?format=webp&width=1200",
    category: "Commercial"
  },
  {
    id: 7,
    title: "Infrastructure Foundation Work",
    image: "https://cdn.builder.io/api/v1/image/assets%2Fc289c2c29f354ddfba7264f2fced3fad%2Fbd1101b749f44231922e72387b40ec6b?format=webp&width=1200",
    category: "Infrastructure"
  },
  {
    id: 8,
    title: "Road Construction & Maintenance",
    image: "https://cdn.builder.io/api/v1/image/assets%2Fc289c2c29f354ddfba7264f2fced3fad%2Fbf0cb8792aeb4b0889d5c5dfa8ae6387?format=webp&width=1200",
    category: "Infrastructure"
  },
  {
    id: 9,
    title: "Utility Pipeline Installation",
    image: "https://cdn.builder.io/api/v1/image/assets%2Fc289c2c29f354ddfba7264f2fced3fad%2F59dad5403e67408097449e7180418680?format=webp&width=1200",
    category: "Infrastructure"
  },
  {
    id: 10,
    title: "Foundation Excavation",
    image: "https://cdn.builder.io/api/v1/image/assets%2Fc289c2c29f354ddfba7264f2fced3fad%2Fcdac921557b943bf8759f9cae8fd7fd7?format=webp&width=1200",
    category: "Ongoing Work"
  },
  {
    id: 11,
    title: "Concrete Foundation Pouring",
    image: "https://cdn.builder.io/api/v1/image/assets%2Fc289c2c29f354ddfba7264f2fced3fad%2F1faf6fe8df394827ac262dfdcc8d5a6b?format=webp&width=1200",
    category: "Ongoing Work"
  },
  {
    id: 12,
    title: "Steel Framework Installation",
    image: "https://cdn.builder.io/api/v1/image/assets%2Fc289c2c29f354ddfba7264f2fced3fad%2F1ea82a1404fb473f883e5a750e634b87?format=webp&width=1200",
    category: "Ongoing Work"
  },
  {
    id: 13,
    title: "Structural Reinforcement",
    image: "https://cdn.builder.io/api/v1/image/assets%2Fc289c2c29f354ddfba7264f2fced3fad%2F41bfeedeb4434ac0bfd361aee2951f55?format=webp&width=1200",
    category: "Ongoing Work"
  },
  {
    id: 14,
    title: "Site Operations Team",
    image: "https://cdn.builder.io/api/v1/image/assets%2Fc289c2c29f354ddfba7264f2fced3fad%2Fe112a2552e494a35bfa8f9083e860c76?format=webp&width=1200",
    category: "Team & Operations"
  },
  {
    id: 15,
    title: "Construction Equipment in Use",
    image: "https://cdn.builder.io/api/v1/image/assets%2Fc289c2c29f354ddfba7264f2fced3fad%2F221f2fd35ad04e648ae977e9d5b77a1f?format=webp&width=1200",
    category: "Team & Operations"
  },
  {
    id: 16,
    title: "Project Planning & Design",
    image: "https://cdn.builder.io/api/v1/image/assets%2Fc289c2c29f354ddfba7264f2fced3fad%2Fc6fd245adaee400b8dc5d631351dde91?format=webp&width=1200",
    category: "Team & Operations"
  },
  {
    id: 17,
    title: "Site Safety Compliance",
    image: "https://cdn.builder.io/api/v1/image/assets%2Fc289c2c29f354ddfba7264f2fced3fad%2F9f5d3861339548c49a8e74b9c091e447?format=webp&width=1200",
    category: "Team & Operations"
  },
  {
    id: 18,
    title: "Equipment & Machinery",
    image: "https://cdn.builder.io/api/v1/image/assets%2Fc289c2c29f354ddfba7264f2fced3fad%2F577d6b0b355a4cb79cd36321058bd88b?format=webp&width=1200",
    category: "Team & Operations"
  },
  {
    id: 19,
    title: "Project Coordination",
    image: "https://cdn.builder.io/api/v1/image/assets%2Fc289c2c29f354ddfba7264f2fced3fad%2F2c401f7532914ce197e90a63dae8c0f9?format=webp&width=1200",
    category: "Team & Operations"
  },
  {
    id: 20,
    title: "Finishing Phase",
    image: "https://cdn.builder.io/api/v1/image/assets%2Fc289c2c29f354ddfba7264f2fced3fad%2Face675ac01934f0f9a5533bbffe6c3dd?format=webp&width=1200",
    category: "Ongoing Work"
  },
  {
    id: 21,
    title: "Completed Modern Home",
    image: "https://cdn.builder.io/api/v1/image/assets%2Fc289c2c29f354ddfba7264f2fced3fad%2F54b52653206e4b849cb3996bf17b2983?format=webp&width=1200",
    category: "Residential"
  },
  {
    id: 22,
    title: "Premium Residential Project",
    image: "https://cdn.builder.io/api/v1/image/assets%2Fc289c2c29f354ddfba7264f2fced3fad%2Fddd49a58c6864d5a867dff3caad2d99f?format=webp&width=1200",
    category: "Residential"
  },
  {
    id: 23,
    title: "Estate Housing Development",
    image: "https://cdn.builder.io/api/v1/image/assets%2Fc289c2c29f354ddfba7264f2fced3fad%2F951da5623dac45ab9c1228ba10538eae?format=webp&width=1200",
    category: "Residential"
  },
  {
    id: 24,
    title: "Commercial District Project",
    image: "https://cdn.builder.io/api/v1/image/assets%2Fc289c2c29f354ddfba7264f2fced3fad%2F0dfc28b254f14be7b017a2786b574422?format=webp&width=1200",
    category: "Commercial"
  }
]

export function getGallery(category?: string): Promise<GalleryItem[]> {
  return new Promise((resolve) => {
    const items = category
      ? defaultGalleryItems.filter(item => item.category === category)
      : defaultGalleryItems
    resolve(items)
  })
}
