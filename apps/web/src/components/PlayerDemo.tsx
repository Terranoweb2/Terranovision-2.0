import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, Pause, Volume2, VolumeX, Maximize, Settings, Heart, Share2, Download, MoreVertical, Users, Eye, Star, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PREMIUM_IMAGES } from '../constants/premiumImages';

const PlayerDemo: React.FC = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(3600); // 1 heure de démonstration
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [quality, setQuality] = useState('4K');
  const [isLiked, setIsLiked] = useState(false);
  const [viewerCount, setViewerCount] = useState(2147);
  const videoRef = useRef<HTMLDivElement>(null);

  // Simulation du temps de lecture
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => Math.min(prev + 1, duration));
        setViewerCount(prev => prev + Math.floor(Math.random() * 10) - 5);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  // Masquer les contrôles automatiquement
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (showControls && isPlaying) {
      timeout = setTimeout(() => setShowControls(false), 3000);
    }
    return () => clearTimeout(timeout);
  }, [showControls, isPlaying]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    setShowControls(true);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    setShowControls(true);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    setShowControls(true);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseInt(e.target.value);
    setCurrentTime(newTime);
    setShowControls(true);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    setShowControls(true);
  };

  const channelInfo = {
    name: 'Canal+',
    category: 'Cinéma & Séries',
    quality: '4K Ultra HD',
    status: 'LIVE',
    program: 'Film Premium: "Avatar: La Voie de l\'Eau"',
    description: 'Découvrez le nouveau chef-d\'œuvre de James Cameron en qualité 4K Ultra HD avec son Dolby Atmos.',
    logo: PREMIUM_IMAGES.CANAL.CANAL_PREMIUM_1,
    background: PREMIUM_IMAGES.HERO.HERO_MANAGER
  };

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'min-h-screen'} bg-black relative overflow-hidden`}>
      {/* Background premium */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${channelInfo.background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60" />
      </div>

      {/* Header (masqué en plein écran) */}
      {!isFullscreen && (
        <div className="relative z-20 flex items-center justify-between p-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
            <span className="text-white font-medium">TerranoVision</span>
          </button>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-xl">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-red-300 font-medium">EN DIRECT</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-xl">
              <Eye className="w-4 h-4 text-green-400" />
              <span className="text-green-300 font-medium">{viewerCount.toLocaleString()} spectateurs</span>
            </div>
          </div>
        </div>
      )}

      {/* Zone vidéo principale */}
      <div 
        ref={videoRef}
        className={`relative ${isFullscreen ? 'h-full' : 'h-[60vh] mx-6 mb-6'} bg-black rounded-2xl overflow-hidden cursor-pointer group`}
        onClick={() => setShowControls(!showControls)}
        onMouseMove={() => setShowControls(true)}
      >
        {/* Simulation de la vidéo */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-pink-900/50">
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage: `url(${channelInfo.logo})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          
          {/* Overlay de lecture */}
          <div className="absolute inset-0 flex items-center justify-center">
            {!isPlaying && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className="w-20 h-20 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200"
              >
                <Play className="w-8 h-8 text-white ml-1" />
              </button>
            )}
          </div>

          {/* Informations du programme (coin supérieur) */}
          <div className="absolute top-4 left-4 right-4">
            <div className="bg-black/50 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white rounded-lg p-2">
                  <img src={channelInfo.logo} alt={channelInfo.name} className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{channelInfo.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-white/70">{channelInfo.category}</span>
                    <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">{channelInfo.quality}</span>
                    <span className="px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded-full">{channelInfo.status}</span>
                  </div>
                </div>
              </div>
              <p className="text-white font-medium">{channelInfo.program}</p>
              <p className="text-white/70 text-sm mt-1">{channelInfo.description}</p>
            </div>
          </div>

          {/* Contrôles vidéo */}
          <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 transition-all duration-300 ${
            showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            {/* Barre de progression */}
            <div className="mb-4">
              <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(currentTime / duration) * 100}%, rgba(255,255,255,0.2) ${(currentTime / duration) * 100}%, rgba(255,255,255,0.2) 100%)`
                }}
              />
              <div className="flex justify-between text-white/70 text-sm mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Contrôles principaux */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Play/Pause */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                  className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white ml-0.5" />
                  )}
                </button>

                {/* Volume */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMute();
                    }}
                    className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all duration-200"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-5 h-5 text-white" />
                    ) : (
                      <Volume2 className="w-5 h-5 text-white" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span className="text-white/70 text-sm w-8">{isMuted ? 0 : volume}%</span>
                </div>

                {/* Qualité */}
                <select
                  value={quality}
                  onChange={(e) => setQuality(e.target.value)}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 text-white text-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  <option value="8K">8K Ultra HD</option>
                  <option value="4K">4K Ultra HD</option>
                  <option value="1080p">1080p HD</option>
                  <option value="720p">720p HD</option>
                  <option value="480p">480p</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                {/* Actions */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLiked(!isLiked);
                  }}
                  className={`w-10 h-10 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center transition-all duration-200 ${
                    isLiked ? 'bg-red-500/20 text-red-400' : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                </button>

                <button
                  onClick={(e) => e.stopPropagation()}
                  className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all duration-200"
                >
                  <Share2 className="w-5 h-5 text-white" />
                </button>

                <button
                  onClick={(e) => e.stopPropagation()}
                  className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all duration-200"
                >
                  <Download className="w-5 h-5 text-white" />
                </button>

                <button
                  onClick={(e) => e.stopPropagation()}
                  className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all duration-200"
                >
                  <Settings className="w-5 h-5 text-white" />
                </button>

                {/* Plein écran */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFullscreen();
                  }}
                  className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all duration-200"
                >
                  <Maximize className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Informations détaillées (masquées en plein écran) */}
      {!isFullscreen && (
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Informations principales */}
            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-2xl font-bold text-white mb-2">{channelInfo.program}</h1>
                    <p className="text-white/70 mb-4">{channelInfo.description}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-blue-400" />
                        <span className="text-white/80">{viewerCount.toLocaleString()} spectateurs</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-white/80">4.8/5</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-green-400" />
                        <span className="text-white/80">Qualité {quality}</span>
                      </div>
                    </div>
                  </div>
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-200">
                    S'abonner à Canal+
                  </button>
                </div>

                {/* Statistiques */}
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { label: 'Qualité', value: quality, icon: Zap },
                    { label: 'Spectateurs', value: `${viewerCount.toLocaleString()}`, icon: Users },
                    { label: 'Note', value: '4.8/5', icon: Star },
                    { label: 'Statut', value: 'EN DIRECT', icon: Eye }
                  ].map((stat, index) => (
                    <div key={index} className="bg-white/5 rounded-xl p-4 text-center">
                      <stat.icon className="w-6 h-6 text-primary-400 mx-auto mb-2" />
                      <div className="text-white font-medium">{stat.value}</div>
                      <div className="text-white/60 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Chaînes recommandées */}
            <div>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">Chaînes Recommandées</h3>
                <div className="space-y-4">
                  {[
                    { name: 'National Geographic', category: 'Documentaires', viewers: '1.8M', quality: 'HD' },
                    { name: 'Discovery Channel', category: 'Sciences', viewers: '1.3M', quality: '4K' },
                    { name: 'MTV', category: 'Musique', viewers: '1.1M', quality: 'HD' },
                    { name: 'Eurosport', category: 'Sport', viewers: '2.5M', quality: '4K' }
                  ].map((channel, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-200 cursor-pointer">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{channel.name.charAt(0)}</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium">{channel.name}</div>
                        <div className="text-white/60 text-sm">{channel.category}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white/80 text-sm">{channel.viewers}</div>
                        <div className="text-green-400 text-xs">{channel.quality}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerDemo;
