// Mock channels data for TerranoVision
export interface Channel {
  id: string;
  name: string;
  logo: string;
  category: string;
  quality: string;
  viewers: string;
  rating: number;
  price: string;
  description: string;
  isLive: boolean;
  badges: string[];
}

export const MOCK_CHANNELS: Channel[] = [
  {
    id: "canal-plus",
    name: "Canal+",
    logo: "/images/channels/canal-plus.jpg",
    category: "Cinéma & Séries",
    quality: "4K",
    viewers: "2.1M",
    rating: 4.8,
    price: "2,500 XOF/mois",
    description: "Cinéma premium et séries exclusives",
    isLive: true,
    badges: ["4K", "LIVE", "Cinéma & Séries"]
  },
  {
    id: "national-geographic",
    name: "National Geographic",
    logo: "/images/channels/natgeo.jpg",
    category: "Documentaires",
    quality: "HD",
    viewers: "1.8M",
    rating: 4.7,
    price: "1,800 XOF/mois",
    description: "Documentaires nature et science",
    isLive: true,
    badges: ["Documentaires", "HD", "LIVE"]
  },
  {
    id: "discovery-channel",
    name: "Discovery Channel",
    logo: "/images/channels/discovery.jpg",
    category: "Sciences & Tech",
    quality: "4K",
    viewers: "1.3M",
    rating: 4.6,
    price: "2,000 XOF/mois",
    description: "Sciences et technologies",
    isLive: true,
    badges: ["Sciences & Tech", "4K", "LIVE"]
  },
  {
    id: "mtv",
    name: "MTV",
    logo: "/images/channels/mtv.jpg",
    category: "Musique & Divertissement",
    quality: "HD",
    viewers: "950K",
    rating: 4.4,
    price: "1,500 XOF/mois",
    description: "Musique et divertissement",
    isLive: true,
    badges: ["Musique & Divertissement", "HD", "LIVE"]
  },
  {
    id: "disney-channel",
    name: "Disney Channel",
    logo: "/images/channels/disney.jpg",
    category: "Enfants",
    quality: "4K",
    viewers: "1.2M",
    rating: 4.8,
    price: "2,000 XOF/mois",
    description: "Magie Disney pour toute la famille",
    isLive: true,
    badges: ["Enfants", "4K", "LIVE"]
  },
  {
    id: "eurosport",
    name: "Eurosport",
    logo: "/images/channels/eurosport.jpg",
    category: "Sport",
    quality: "4K",
    viewers: "2.5M",
    rating: 4.9,
    price: "2,200 XOF/mois",
    description: "Sports en direct et highlights",
    isLive: true,
    badges: ["Sport", "4K", "LIVE"]
  },
  {
    id: "france24",
    name: "France 24",
    logo: "/images/channels/france24.jpg",
    category: "Actualités",
    quality: "HD",
    viewers: "800K",
    rating: 4.3,
    price: "1,200 XOF/mois",
    description: "Actualités internationales",
    isLive: true,
    badges: ["Actualités", "HD", "LIVE"]
  },
  {
    id: "rts-senegal",
    name: "RTS Sénégal",
    logo: "/images/channels/rts.jpg",
    category: "Sénégalais",
    quality: "HD",
    viewers: "600K",
    rating: 4.5,
    price: "1,000 XOF/mois",
    description: "Télévision nationale du Sénégal",
    isLive: true,
    badges: ["Sénégalais", "HD", "LIVE"]
  },
  {
    id: "bbc-world",
    name: "BBC World",
    logo: "/images/channels/bbc.jpg",
    category: "Actualités",
    quality: "HD",
    viewers: "1.1M",
    rating: 4.6,
    price: "1,800 XOF/mois",
    description: "Actualités mondiales BBC",
    isLive: true,
    badges: ["Actualités", "HD", "LIVE"]
  },
  {
    id: "cartoon-network",
    name: "Cartoon Network",
    logo: "/images/channels/cartoon.jpg",
    category: "Enfants",
    quality: "HD",
    viewers: "900K",
    rating: 4.4,
    price: "1,500 XOF/mois",
    description: "Dessins animés pour enfants",
    isLive: true,
    badges: ["Enfants", "HD", "LIVE"]
  },
  {
    id: "tv5-monde",
    name: "TV5 Monde",
    logo: "/images/channels/tv5.jpg",
    category: "International",
    quality: "HD",
    viewers: "750K",
    rating: 4.2,
    price: "1,300 XOF/mois",
    description: "Télévision francophone internationale",
    isLive: true,
    badges: ["International", "HD", "LIVE"]
  },
  {
    id: "cnn-international",
    name: "CNN International",
    logo: "/images/channels/cnn.jpg",
    category: "Actualités",
    quality: "HD",
    viewers: "1.0M",
    rating: 4.4,
    price: "1,700 XOF/mois",
    description: "Actualités internationales CNN",
    isLive: true,
    badges: ["Actualités", "HD", "LIVE"]
  },
  {
    id: "trace-tv",
    name: "Trace TV",
    logo: "/images/channels/trace.jpg",
    category: "Musique Africaine",
    quality: "HD",
    viewers: "650K",
    rating: 4.6,
    price: "1,400 XOF/mois",
    description: "Musique africaine et urbaine",
    isLive: true,
    badges: ["Musique Africaine", "HD", "LIVE"]
  },
  {
    id: "arte",
    name: "Arte",
    logo: "/images/channels/arte.jpg",
    category: "Culture",
    quality: "HD",
    viewers: "500K",
    rating: 4.7,
    price: "1,600 XOF/mois",
    description: "Culture et documentaires",
    isLive: true,
    badges: ["Culture", "HD", "LIVE"]
  },
  {
    id: "animal-planet",
    name: "Animal Planet",
    logo: "/images/channels/animal.jpg",
    category: "Documentaires",
    quality: "4K",
    viewers: "850K",
    rating: 4.5,
    price: "1,900 XOF/mois",
    description: "Documentaires animaliers",
    isLive: true,
    badges: ["Documentaires", "4K", "LIVE"]
  }
];

export default MOCK_CHANNELS;
