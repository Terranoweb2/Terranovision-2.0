import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Filter, Play, Star, Clock, Eye, Download, Heart, Share2, Grid, List } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PREMIUM_IMAGES } from '../constants/premiumImages';

const FilmsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedQuality, setSelectedQuality] = useState('Toutes');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favoriteFilms, setFavoriteFilms] = useState<string[]>([]);

  // Base de données complète des films
  const films = [
    // Blockbusters Récents
    {
      id: 'avatar-la-voie-de-leau',
      title: 'Avatar: La Voie de l\'Eau',
      poster: PREMIUM_IMAGES.CANAL.CANAL_PREMIUM_1,
      category: 'Cinéma & Séries',
      quality: '4K',
      duration: '3h 12min',
      year: 2022,
      rating: 4.8,
      views: '2.1M',
      genre: 'Science-Fiction, Aventure',
      description: 'Découvrez le nouveau chef-d\'œuvre de James Cameron en qualité 4K Ultra HD avec son Dolby Atmos.',
      channel: 'Canal+',
      link: 'https://terranovision.com/films/avatar-la-voie-de-leau',
      status: 'Nouveau'
    },
    {
      id: 'top-gun-maverick',
      title: 'Top Gun: Maverick',
      poster: PREMIUM_IMAGES.CANAL.CANAL_PREMIUM_2,
      category: 'Cinéma & Séries',
      quality: '4K',
      duration: '2h 11min',
      year: 2022,
      rating: 4.9,
      views: '1.8M',
      genre: 'Action, Drame',
      description: 'Tom Cruise revient dans la suite épique du classique de 1986.',
      channel: 'Canal+',
      link: 'https://terranovision.com/films/top-gun-maverick',
      status: 'Populaire'
    },
    {
      id: 'black-panther-wakanda-forever',
      title: 'Black Panther: Wakanda Forever',
      poster: PREMIUM_IMAGES.CANAL.CANAL_PREMIUM_3,
      category: 'Cinéma & Séries',
      quality: '4K',
      duration: '2h 41min',
      year: 2022,
      rating: 4.7,
      views: '1.5M',
      genre: 'Action, Super-héros',
      description: 'La suite émouvante qui rend hommage à Chadwick Boseman.',
      channel: 'Disney Channel',
      link: 'https://terranovision.com/films/black-panther-wakanda-forever',
      status: 'Tendance'
    },
    {
      id: 'dune-2021',
      title: 'Dune',
      poster: PREMIUM_IMAGES.HERO.HERO_MANAGER,
      category: 'Cinéma & Séries',
      quality: '4K',
      duration: '2h 35min',
      year: 2021,
      rating: 4.6,
      views: '1.3M',
      genre: 'Science-Fiction, Épique',
      description: 'L\'adaptation épique du roman de Frank Herbert par Denis Villeneuve.',
      channel: 'Canal+',
      link: 'https://terranovision.com/films/dune-2021',
      status: 'Classique'
    },
    {
      id: 'spider-man-no-way-home',
      title: 'Spider-Man: No Way Home',
      poster: PREMIUM_IMAGES.HERO.HERO_PREMIUM,
      category: 'Cinéma & Séries',
      quality: '4K',
      duration: '2h 28min',
      year: 2021,
      rating: 4.8,
      views: '2.5M',
      genre: 'Action, Super-héros',
      description: 'Le multivers s\'ouvre dans cette aventure Spider-Man révolutionnaire.',
      channel: 'Canal+',
      link: 'https://terranovision.com/films/spider-man-no-way-home',
      status: 'Populaire'
    },
    // Documentaires
    {
      id: 'planete-terre-3',
      title: 'Planète Terre III',
      poster: PREMIUM_IMAGES.HERO.HERO_ULTRA,
      category: 'Documentaires',
      quality: '4K',
      duration: '8 × 50min',
      year: 2023,
      rating: 4.9,
      views: '900K',
      genre: 'Nature, Environnement',
      description: 'La série documentaire nature la plus spectaculaire jamais réalisée.',
      channel: 'National Geographic',
      link: 'https://terranovision.com/documentaires/planete-terre-3',
      status: 'Nouveau'
    },
    {
      id: 'cosmos-nouveaux-mondes',
      title: 'Cosmos: Nouveaux Mondes',
      poster: PREMIUM_IMAGES.CANAL.CANAL_PREMIUM_1,
      category: 'Documentaires',
      quality: '4K',
      duration: '6 × 45min',
      year: 2024,
      rating: 4.8,
      views: '750K',
      genre: 'Science, Espace',
      description: 'Explorez les mystères de l\'univers avec cette série scientifique fascinante.',
      channel: 'National Geographic',
      link: 'https://terranovision.com/documentaires/cosmos-nouveaux-mondes',
      status: 'Nouveau'
    },
    {
      id: 'afrique-sauvage',
      title: 'Afrique Sauvage',
      poster: PREMIUM_IMAGES.CANAL.CANAL_PREMIUM_2,
      category: 'Documentaires',
      quality: '4K',
      duration: '5 × 55min',
      year: 2023,
      rating: 4.9,
      views: '1.1M',
      genre: 'Nature, Afrique',
      description: 'Découvrez la beauté sauvage du continent africain.',
      channel: 'National Geographic',
      link: 'https://terranovision.com/documentaires/afrique-sauvage',
      status: 'Populaire'
    },
    // Films pour Enfants
    {
      id: 'encanto',
      title: 'Encanto',
      poster: PREMIUM_IMAGES.CANAL.CANAL_PREMIUM_3,
      category: 'Enfants',
      quality: '4K',
      duration: '1h 42min',
      year: 2021,
      rating: 4.8,
      views: '1.2M',
      genre: 'Animation, Musical',
      description: 'L\'histoire magique de la famille Madrigal et de leurs pouvoirs extraordinaires.',
      channel: 'Disney Channel',
      link: 'https://terranovision.com/enfants/encanto',
      status: 'Populaire'
    },
    {
      id: 'luca',
      title: 'Luca',
      poster: PREMIUM_IMAGES.HERO.HERO_MANAGER,
      category: 'Enfants',
      quality: '4K',
      duration: '1h 35min',
      year: 2021,
      rating: 4.7,
      views: '980K',
      genre: 'Animation, Aventure',
      description: 'Une aventure estivale inoubliable sur la Riviera italienne.',
      channel: 'Disney Channel',
      link: 'https://terranovision.com/enfants/luca',
      status: 'Famille'
    },
    {
      id: 'raya-dernier-dragon',
      title: 'Raya et le Dernier Dragon',
      poster: PREMIUM_IMAGES.HERO.HERO_PREMIUM,
      category: 'Enfants',
      quality: '4K',
      duration: '1h 47min',
      year: 2021,
      rating: 4.6,
      views: '850K',
      genre: 'Animation, Aventure',
      description: 'Une quête épique pour sauver le royaume de Kumandra.',
      channel: 'Disney Channel',
      link: 'https://terranovision.com/enfants/raya-dernier-dragon',
      status: 'Aventure'
    },
    // Séries Premium
    {
      id: 'the-last-of-us',
      title: 'The Last of Us',
      poster: PREMIUM_IMAGES.HERO.HERO_ULTRA,
      category: 'Séries',
      quality: '4K',
      duration: '9 × 55min',
      year: 2023,
      rating: 4.9,
      views: '2.8M',
      genre: 'Post-apocalyptique, Drame',
      description: 'L\'adaptation de la série de jeux vidéo acclamée.',
      channel: 'Canal+',
      link: 'https://terranovision.com/series/the-last-of-us',
      status: 'Nouveau'
    },
    {
      id: 'house-of-the-dragon',
      title: 'House of the Dragon',
      poster: PREMIUM_IMAGES.CANAL.CANAL_PREMIUM_1,
      category: 'Séries',
      quality: '4K',
      duration: '10 × 60min',
      year: 2022,
      rating: 4.7,
      views: '2.2M',
      genre: 'Fantasy, Drame',
      description: 'Le prequel épique de Game of Thrones.',
      channel: 'Canal+',
      link: 'https://terranovision.com/series/house-of-the-dragon',
      status: 'Épique'
    },
    // Contenu Africain
    {
      id: 'maitresse-homme-marie',
      title: 'Maîtresse d\'un Homme Marié',
      poster: PREMIUM_IMAGES.CANAL.CANAL_PREMIUM_2,
      category: 'Africain',
      quality: 'HD',
      duration: '2h 15min',
      year: 2023,
      rating: 4.5,
      views: '600K',
      genre: 'Drame, Romance',
      description: 'Un drame sénégalais contemporain sur l\'amour et les relations.',
      channel: 'RTS Sénégal',
      link: 'https://terranovision.com/africain/maitresse-homme-marie',
      status: 'Local'
    },
    {
      id: 'adama',
      title: 'Adama',
      poster: PREMIUM_IMAGES.CANAL.CANAL_PREMIUM_3,
      category: 'Africain',
      quality: 'HD',
      duration: '1h 45min',
      year: 2022,
      rating: 4.7,
      views: '800K',
      genre: 'Drame historique',
      description: 'L\'histoire poignante d\'un jeune homme pendant la colonisation.',
      channel: 'RTS Sénégal',
      link: 'https://terranovision.com/africain/adama',
      status: 'Historique'
    }
  ];

  const categories = ['Tous', 'Cinéma & Séries', 'Documentaires', 'Enfants', 'Séries', 'Africain'];
  const qualities = ['Toutes', '4K', 'HD'];

  const filteredFilms = films.filter(film => {
    const matchesSearch = film.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         film.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         film.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tous' || film.category === selectedCategory;
    const matchesQuality = selectedQuality === 'Toutes' || film.quality === selectedQuality;
    return matchesSearch && matchesCategory && matchesQuality;
  });

  const toggleFavorite = (filmId: string) => {
    setFavoriteFilms(prev => 
      prev.includes(filmId) 
        ? prev.filter(id => id !== filmId)
        : [...prev, filmId]
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

  const getStatusColor = (status: string) => {
    const colors = {
      'Nouveau': 'text-green-400 bg-green-500/20',
      'Populaire': 'text-red-400 bg-red-500/20',
      'Tendance': 'text-yellow-400 bg-yellow-500/20',
      'Classique': 'text-blue-400 bg-blue-500/20',
      'Famille': 'text-pink-400 bg-pink-500/20',
      'Aventure': 'text-orange-400 bg-orange-500/20',
      'Épique': 'text-purple-400 bg-purple-500/20',
      'Local': 'text-emerald-400 bg-emerald-500/20',
      'Historique': 'text-cyan-400 bg-cyan-500/20'
    };
    return colors[status as keyof typeof colors] || 'text-gray-400 bg-gray-500/20';
  };

  const copyLink = (link: string, title: string) => {
    navigator.clipboard.writeText(link);
    // Ici vous pourriez ajouter une notification toast
    console.log(`Lien copié pour ${title}: ${link}`);
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
            <Play className="w-4 h-4 text-primary-400" />
            <span className="text-primary-300 font-medium">{filteredFilms.length} films disponibles</span>
          </div>
        </div>
      </div>

      {/* Titre et description */}
      <div className="relative z-10 text-center mb-8 px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400 bg-clip-text text-transparent">
          Catalogue Complet des Films
        </h1>
        <p className="text-xl text-white/70 max-w-3xl mx-auto">
          Découvrez notre collection de {films.length} films premium en 4K, documentaires, 
          séries et contenus exclusifs avec liens directs
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
                placeholder="Rechercher un film..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-primary-400 transition-all duration-200"
              />
            </div>

            {/* Filtres */}
            <div className="flex items-center gap-4">
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

              <select
                value={selectedQuality}
                onChange={(e) => setSelectedQuality(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-400"
              >
                {qualities.map(quality => (
                  <option key={quality} value={quality} className="bg-dark-800">
                    {quality}
                  </option>
                ))}
              </select>

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
      </div>

      {/* Grille des films */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-8">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFilms.map((film) => (
              <div
                key={film.id}
                className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-primary-400/50 transition-all duration-300"
              >
                {/* Poster et statut */}
                <div className="relative mb-4">
                  <div className="w-full h-48 bg-white/10 rounded-xl overflow-hidden">
                    <img
                      src={film.poster}
                      alt={film.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 bg-black/80 backdrop-blur-sm rounded-lg">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(film.status)}`}>
                      {film.status}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleFavorite(film.id)}
                    className={`absolute top-2 left-2 p-2 rounded-lg backdrop-blur-sm transition-all duration-200 ${
                      favoriteFilms.includes(film.id)
                        ? 'bg-red-500/80 text-red-100'
                        : 'bg-black/50 text-white/70 hover:text-red-400'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${favoriteFilms.includes(film.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Informations */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-primary-400 transition-colors duration-200 line-clamp-2">
                      {film.title}
                    </h3>
                    <p className="text-white/60 text-sm line-clamp-2">{film.description}</p>
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getQualityColor(film.quality)}`}>
                      {film.quality}
                    </span>
                    <span className="px-2 py-1 bg-gray-500/20 text-gray-300 rounded-lg text-xs font-medium">
                      {film.year}
                    </span>
                  </div>

                  {/* Statistiques */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <span className="text-white/70">{film.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-white/70">{film.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4 text-green-400" />
                      <span className="text-white/70">{film.views}</span>
                    </div>
                  </div>

                  {/* Lien et actions */}
                  <div className="space-y-2">
                    <div className="bg-white/5 rounded-lg p-2">
                      <div className="text-xs text-white/50 mb-1">Lien direct :</div>
                      <div className="text-xs text-primary-400 font-mono break-all">
                        {film.link}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => window.open(film.link, '_blank')}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-all duration-200"
                      >
                        <Play className="w-4 h-4" />
                        <span>Regarder</span>
                      </button>
                      <button
                        onClick={() => copyLink(film.link, film.title)}
                        className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-200"
                        title="Copier le lien"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-200"
                        title="Télécharger"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFilms.map((film) => (
              <div
                key={film.id}
                className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-primary-400/50 transition-all duration-300"
              >
                <div className="flex items-center gap-6">
                  {/* Poster */}
                  <div className="relative">
                    <div className="w-24 h-36 bg-white/10 rounded-xl overflow-hidden">
                      <img
                        src={film.poster}
                        alt={film.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Informations */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors duration-200">
                          {film.title}
                        </h3>
                        <p className="text-white/60 mt-1">{film.description}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(film.status)}`}>
                        {film.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 flex-wrap">
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getQualityColor(film.quality)}`}>
                        {film.quality}
                      </span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <span className="text-white/70 text-sm">{film.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-white/70 text-sm">{film.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4 text-green-400" />
                        <span className="text-white/70 text-sm">{film.views}</span>
                      </div>
                      <span className="text-white/50 text-sm">{film.channel}</span>
                    </div>

                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-xs text-white/50 mb-1">Lien direct :</div>
                      <div className="text-sm text-primary-400 font-mono break-all">
                        {film.link}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col items-center gap-2">
                    <button
                      onClick={() => toggleFavorite(film.id)}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        favoriteFilms.includes(film.id)
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-white/10 text-white/70 hover:text-red-400'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${favoriteFilms.includes(film.id) ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={() => window.open(film.link, '_blank')}
                      className="flex items-center gap-2 px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-all duration-200"
                    >
                      <Play className="w-4 h-4" />
                      <span>Regarder</span>
                    </button>
                    <button
                      onClick={() => copyLink(film.link, film.title)}
                      className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-200"
                      title="Copier le lien"
                    >
                      <Share2 className="w-4 h-4" />
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
              <div className="text-2xl font-bold text-primary-400">{films.length}</div>
              <div className="text-white/70">Films Premium</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">4K</div>
              <div className="text-white/70">Qualité Ultra HD</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">15</div>
              <div className="text-white/70">Chaînes Partenaires</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">24/7</div>
              <div className="text-white/70">Accès Illimité</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmsPage;
