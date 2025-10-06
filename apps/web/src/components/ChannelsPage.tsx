import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Filter, Grid, List, Play, Users, Star, Zap, Eye, Heart, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PREMIUM_IMAGES } from '../constants/premiumImages';

const ChannelsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favoriteChannels, setFavoriteChannels] = useState<string[]>([]);

  // Base de données des chaînes avec logos
  const channels = [
    {
      id: 'canal-plus',
      name: 'Canal+',
      logo: PREMIUM_IMAGES.CANAL.CANAL_PREMIUM_1,
      category: 'Cinéma & Séries',
      quality: '4K',
      viewers: '2.1M',
      rating: 4.8,
      description: 'Films exclusifs, séries premium et sport en direct',
      status: 'LIVE',
      price: '2,500 XOF/mois'
    },
    {
      id: 'national-geographic',
      name: 'National Geographic',
      logo: PREMIUM_IMAGES.CANAL.CANAL_PREMIUM_2,
      category: 'Documentaires',
      quality: 'HD',
      viewers: '1.8M',
      rating: 4.7,
      description: 'Documentaires nature et sciences en haute définition',
      status: 'LIVE',
      price: '1,800 XOF/mois'
    },
    {
      id: 'discovery-channel',
      name: 'Discovery Channel',
      logo: PREMIUM_IMAGES.CANAL.CANAL_PREMIUM_3,
      category: 'Sciences & Tech',
      quality: '4K',
      viewers: '1.3M',
      rating: 4.6,
      description: 'Sciences, technologie et découvertes fascinantes',
      status: 'LIVE',
      price: '2,000 XOF/mois'
    },
    {
      id: 'mtv',
      name: 'MTV',
      logo: PREMIUM_IMAGES.HERO.HERO_MANAGER,
      category: 'Musique & Divertissement',
      quality: 'HD',
      viewers: '1.1M',
      rating: 4.5,
      description: 'Musique, clips et divertissement pour les jeunes',
      status: 'LIVE',
      price: '1,500 XOF/mois'
    },
    {
      id: 'eurosport',
      name: 'Eurosport',
      logo: PREMIUM_IMAGES.HERO.HERO_PREMIUM,
      category: 'Sport',
      quality: '4K',
      viewers: '2.5M',
      rating: 4.9,
      description: 'Tous les sports en direct et en haute qualité',
      status: 'LIVE',
      price: '2,200 XOF/mois'
    },
    {
      id: 'france-24',
      name: 'France 24',
      logo: PREMIUM_IMAGES.HERO.HERO_ULTRA,
      category: 'Actualités',
      quality: 'HD',
      viewers: '1.5M',
      rating: 4.4,
      description: 'Actualités internationales 24h/24 en français',
      status: 'LIVE',
      price: '1,200 XOF/mois'
    },
    {
      id: 'bbc-world',
      name: 'BBC World',
      logo: PREMIUM_IMAGES.HERO.HERO_MANAGER,
      category: 'Actualités',
      quality: 'HD',
      viewers: '1.7M',
      rating: 4.6,
      description: 'Actualités mondiales et documentaires BBC',
      status: 'LIVE',
      price: '1,800 XOF/mois'
    },
    {
      id: 'cartoon-network',
      name: 'Cartoon Network',
      logo: PREMIUM_IMAGES.HERO.HERO_PREMIUM,
      category: 'Enfants',
      quality: 'HD',
      viewers: '900K',
      rating: 4.7,
      description: 'Dessins animés et programmes pour enfants',
      status: 'LIVE',
      price: '1,000 XOF/mois'
    },
    {
      id: 'disney-channel',
      name: 'Disney Channel',
      logo: PREMIUM_IMAGES.HERO.HERO_ULTRA,
      category: 'Enfants',
      quality: '4K',
      viewers: '1.2M',
      rating: 4.8,
      description: 'Magie Disney pour toute la famille',
      status: 'LIVE',
      price: '2,000 XOF/mois'
    },
    {
      id: 'tf1',
      name: 'TF1',
      logo: PREMIUM_IMAGES.CANAL.CANAL_PREMIUM_1,
      category: 'Généraliste',
      quality: 'HD',
      viewers: '2.8M',
      rating: 4.3,
      description: 'Première chaîne française généraliste',
      status: 'LIVE',
      price: '1,500 XOF/mois'
    },
    {
      id: 'france-2',
      name: 'France 2',
      logo: PREMIUM_IMAGES.CANAL.CANAL_PREMIUM_2,
      category: 'Généraliste',
      quality: 'HD',
      viewers: '2.2M',
      rating: 4.2,
      description: 'Service public français de télévision',
      status: 'LIVE',
      price: '1,300 XOF/mois'
    },
    {
      id: 'rts-senegal',
      name: 'RTS Sénégal',
      logo: PREMIUM_IMAGES.CANAL.CANAL_PREMIUM_3,
      category: 'Local',
      quality: 'HD',
      viewers: '800K',
      rating: 4.5,
      description: 'Télévision nationale du Sénégal',
      status: 'LIVE',
      price: '800 XOF/mois'
    },
    {
      id: 'africa-24',
      name: 'Africa 24',
      logo: PREMIUM_IMAGES.HERO.HERO_MANAGER,
      category: 'Actualités',
      quality: 'HD',
      viewers: '600K',
      rating: 4.3,
      description: 'Actualités africaines et internationales',
      status: 'LIVE',
      price: '1,000 XOF/mois'
    },
    {
      id: 'trace-tv',
      name: 'Trace TV',
      logo: PREMIUM_IMAGES.HERO.HERO_PREMIUM,
      category: 'Musique',
      quality: 'HD',
      viewers: '750K',
      rating: 4.6,
      description: 'Musique urbaine et culture afro',
      status: 'LIVE',
      price: '1,200 XOF/mois'
    },
    {
      id: 'tv5-monde',
      name: 'TV5 Monde',
      logo: PREMIUM_IMAGES.HERO.HERO_ULTRA,
      category: 'International',
      quality: 'HD',
      viewers: '1.1M',
      rating: 4.4,
      description: 'Chaîne francophone internationale',
      status: 'LIVE',
      price: '1,400 XOF/mois'
    }
  ];

  const categories = ['Toutes', 'Cinéma & Séries', 'Documentaires', 'Sciences & Tech', 'Musique & Divertissement', 'Sport', 'Actualités', 'Enfants', 'Généraliste', 'Local', 'International'];

  const filteredChannels = channels.filter(channel => {
    const matchesSearch = channel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         channel.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Toutes' || channel.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (channelId: string) => {
    setFavoriteChannels(prev => 
      prev.includes(channelId) 
        ? prev.filter(id => id !== channelId)
        : [...prev, channelId]
    );
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case '4K': return 'text-green-400 bg-green-500/20';
      case 'HD': return 'text-blue-400 bg-blue-500/20';
      case '8K': return 'text-purple-400 bg-purple-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Cinéma & Séries': 'text-red-400 bg-red-500/20',
      'Documentaires': 'text-green-400 bg-green-500/20',
      'Sciences & Tech': 'text-blue-400 bg-blue-500/20',
      'Musique & Divertissement': 'text-pink-400 bg-pink-500/20',
      'Sport': 'text-orange-400 bg-orange-500/20',
      'Actualités': 'text-yellow-400 bg-yellow-500/20',
      'Enfants': 'text-purple-400 bg-purple-500/20',
      'Généraliste': 'text-gray-400 bg-gray-500/20',
      'Local': 'text-emerald-400 bg-emerald-500/20',
      'International': 'text-cyan-400 bg-cyan-500/20'
    };
    return colors[category as keyof typeof colors] || 'text-gray-400 bg-gray-500/20';
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white relative overflow-hidden">
      {/* Background premium */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${PREMIUM_IMAGES.HERO.HERO_PREMIUM})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
        
        {/* Particules animées */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary-400/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="relative z-20 flex items-center justify-between p-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-200"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
          <span className="text-white font-medium">TerranoVision</span>
        </button>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-primary-500/20 border border-primary-500/30 rounded-xl">
            <Zap className="w-4 h-4 text-primary-400" />
            <span className="text-primary-300 font-medium">{filteredChannels.length} chaînes disponibles</span>
          </div>
        </div>
      </div>

      {/* Titre et description */}
      <div className="relative z-10 text-center mb-8 px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400 bg-clip-text text-transparent">
          Toutes nos Chaînes Premium
        </h1>
        <p className="text-xl text-white/70 max-w-3xl mx-auto">
          Découvrez notre collection complète de {channels.length} chaînes premium avec logos HD, 
          qualité 4K et streaming illimité
        </p>
      </div>

      {/* Filtres et recherche */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 mb-8">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Recherche */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
              <input
                type="text"
                placeholder="Rechercher une chaîne..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-primary-400 transition-all duration-200"
              />
            </div>

            {/* Filtre par catégorie */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-white/70" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-400"
              >
                {categories.map(category => (
                  <option key={category} value={category} className="bg-dark-800">
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Mode d'affichage */}
            <div className="flex items-center gap-2 bg-white/10 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'grid' ? 'bg-primary-500 text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'list' ? 'bg-primary-500 text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grille des chaînes */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-8">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredChannels.map((channel) => (
              <div
                key={channel.id}
                className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-primary-400/50 transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/player/${channel.id}`)}
              >
                {/* Logo et statut */}
                <div className="relative mb-4">
                  <div className="w-full h-32 bg-white/10 rounded-xl overflow-hidden">
                    <img
                      src={channel.logo}
                      alt={channel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  {channel.status === 'LIVE' && (
                    <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 bg-red-500/80 backdrop-blur-sm rounded-lg">
                      <div className="w-2 h-2 bg-red-300 rounded-full animate-pulse" />
                      <span className="text-red-100 text-xs font-medium">LIVE</span>
                    </div>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(channel.id);
                    }}
                    className={`absolute top-2 left-2 p-2 rounded-lg backdrop-blur-sm transition-all duration-200 ${
                      favoriteChannels.includes(channel.id)
                        ? 'bg-red-500/80 text-red-100'
                        : 'bg-black/50 text-white/70 hover:text-red-400'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${favoriteChannels.includes(channel.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Informations */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-primary-400 transition-colors duration-200">
                      {channel.name}
                    </h3>
                    <p className="text-white/60 text-sm">{channel.description}</p>
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getCategoryColor(channel.category)}`}>
                      {channel.category}
                    </span>
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getQualityColor(channel.quality)}`}>
                      {channel.quality}
                    </span>
                  </div>

                  {/* Statistiques */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-blue-400" />
                        <span className="text-white/70">{channel.viewers}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-white/70">{channel.rating}</span>
                      </div>
                    </div>
                    <span className="text-primary-400 font-medium">{channel.price}</span>
                  </div>

                  {/* Boutons d'action */}
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/player/${channel.id}`);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-all duration-200"
                    >
                      <Play className="w-4 h-4" />
                      <span>Regarder</span>
                    </button>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-200"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredChannels.map((channel) => (
              <div
                key={channel.id}
                className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-primary-400/50 transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/player/${channel.id}`)}
              >
                <div className="flex items-center gap-6">
                  {/* Logo */}
                  <div className="relative">
                    <div className="w-20 h-20 bg-white/10 rounded-xl overflow-hidden">
                      <img
                        src={channel.logo}
                        alt={channel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    {channel.status === 'LIVE' && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
                    )}
                  </div>

                  {/* Informations */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors duration-200">
                        {channel.name}
                      </h3>
                      <span className="text-primary-400 font-medium">{channel.price}</span>
                    </div>
                    <p className="text-white/60">{channel.description}</p>
                    <div className="flex items-center gap-4">
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getCategoryColor(channel.category)}`}>
                        {channel.category}
                      </span>
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getQualityColor(channel.quality)}`}>
                        {channel.quality}
                      </span>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-blue-400" />
                        <span className="text-white/70 text-sm">{channel.viewers}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-white/70 text-sm">{channel.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(channel.id);
                      }}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        favoriteChannels.includes(channel.id)
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-white/10 text-white/70 hover:text-red-400'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${favoriteChannels.includes(channel.id) ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/player/${channel.id}`);
                      }}
                      className="flex items-center gap-2 px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-all duration-200"
                    >
                      <Play className="w-4 h-4" />
                      <span>Regarder</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Statistiques en bas */}
      <div className="relative z-10 bg-white/5 backdrop-blur-xl border-t border-white/10 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-primary-400">{channels.length}</div>
              <div className="text-white/70">Chaînes Premium</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">100%</div>
              <div className="text-white/70">Avec Logos HD</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">4K</div>
              <div className="text-white/70">Qualité Ultra HD</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">24/7</div>
              <div className="text-white/70">Streaming Continu</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelsPage;
