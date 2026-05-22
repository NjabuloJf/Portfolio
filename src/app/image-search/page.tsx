"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Search, Download, Heart, HeartOff, 
  Loader2, Grid3x3, LayoutGrid, X, TrendingUp,
  Copy, Check, AlertCircle, Sparkles,
  Camera, Car, Dog, Cat, Flower, Mountain, Sun
} from "lucide-react";

// Google Custom Search API Keys
const GCSE_KEY = 'AIzaSyDMbI3nvmQUrfjoCJYLS69Lej1hSXQjnWI';
const GCSE_CX = 'baf9bdb0c631236e5';

// Free fallback images API (no API key required)
const getFallbackImages = (query: string) => {
  const imageMap: Record<string, string[]> = {
    "bmw": [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800",
      "https://images.unsplash.com/photo-1607853554439-0069ec0f29b6?w=800"
    ],
    "mercedes": [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d5?w=800",
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800"
    ],
    "nature": [
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800"
    ],
    "anime": [
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800",
      "https://images.unsplash.com/photo-1541562232579-512a21360020?w=800"
    ],
    "cars": [
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800"
    ],
    "dogs": [
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800",
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800"
    ],
    "cats": [
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800",
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800"
    ]
  };

  const lowerQuery = query.toLowerCase();
  for (const [key, images] of Object.entries(imageMap)) {
    if (lowerQuery.includes(key)) {
      return images.map((url, i) => ({
        link: url,
        title: `${query} image ${i + 1}`,
        snippet: `Beautiful ${query} image from Unsplash`,
        displayLink: "unsplash.com",
        image: { contextLink: url, height: 600, width: 800 }
      }));
    }
  }
  
  // Default fallback
  return [
    {
      link: `https://picsum.photos/id/${Math.floor(Math.random() * 200)}/800/600`,
      title: `${query} image`,
      snippet: `Random image for ${query}`,
      displayLink: "picsum.photos",
      image: { contextLink: "", height: 600, width: 800 }
    }
  ];
};

type ImageResult = {
  link: string;
  title: string;
  snippet: string;
  displayLink: string;
  image: {
    contextLink: string;
    height: number;
    width: number;
  };
};

type LikedImage = {
  link: string;
  title: string;
  snippet: string;
  likedAt: Date;
};

export default function ImageSearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [images, setImages] = useState<ImageResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<ImageResult | null>(null);
  const [likedImages, setLikedImages] = useState<LikedImage[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("grid");
  const [copied, setCopied] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [useFallback, setUseFallback] = useState(false);

  const searchImages = async (page: number = 1, query?: string) => {
    const searchTerm = query || searchQuery;
    if (!searchTerm.trim()) {
      setError("Please enter a search term");
      return;
    }

    setLoading(true);
    setError(null);
    setUseFallback(false);

    // Add to search history
    if (page === 1 && !searchHistory.includes(searchTerm.trim())) {
      setSearchHistory(prev => [searchTerm.trim(), ...prev].slice(0, 10));
    }

    try {
      const params = new URLSearchParams({
        key: GCSE_KEY,
        cx: GCSE_CX,
        q: searchTerm,
        searchType: 'image',
        num: '10',
        start: '1',
        safe: 'active'
      });

      const response = await fetch(`https://www.googleapis.com/customsearch/v1?${params.toString()}`);
      const data = await response.json();

      if (data.error) {
        console.error("API Error:", data.error);
        // Use fallback images
        setUseFallback(true);
        const fallbackImages = getFallbackImages(searchTerm);
        setImages(fallbackImages);
        setError(null);
        return;
      }

      if (data.items && data.items.length > 0) {
        setImages(data.items);
      } else {
        // Use fallback images
        setUseFallback(true);
        const fallbackImages = getFallbackImages(searchTerm);
        setImages(fallbackImages);
      }
    } catch (err) {
      console.error("Search error:", err);
      // Use fallback images on error
      setUseFallback(true);
      const fallbackImages = getFallbackImages(searchTerm);
      setImages(fallbackImages);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    searchImages(1);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const downloadImage = async (url: string, title: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `${title.substring(0, 50).replace(/[^a-z0-9]/gi, '_')}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      window.open(url, "_blank");
    }
  };

  const toggleLike = (image: ImageResult) => {
    const alreadyLiked = likedImages.some(l => l.link === image.link);
    if (alreadyLiked) {
      setLikedImages(likedImages.filter(l => l.link !== image.link));
    } else {
      setLikedImages([...likedImages, { 
        link: image.link, 
        title: image.title, 
        snippet: image.snippet,
        likedAt: new Date() 
      }]);
    }
  };

  const isLiked = (link: string) => likedImages.some(l => l.link === link);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const quickSearches = [
    { name: "BMW", query: "BMW M4" },
    { name: "Mercedes", query: "Mercedes AMG" },
    { name: "Nature", query: "nature landscape" },
    { name: "Anime", query: "anime art" },
    { name: "Cars", query: "supercar" },
    { name: "Dogs", query: "cute dog" },
    { name: "Cats", query: "cute cat" },
    { name: "Flowers", query: "beautiful flowers" },
    { name: "Mountains", query: "mountain view" },
    { name: "Beach", query: "beach sunset" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground text-sm">
              ← Back
            </Link>
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground">Powered by</span>
              <span className="text-xs font-medium text-primary">Njabulo Jb</span>
            </div>
          </div>
        </div>

        {/* Main Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-2">
            <Camera className="size-5 text-primary" />
            <h1 className="text-xl font-semibold">Image Search</h1>
          </div>
          <p className="text-xs text-muted-foreground">Search BMW, Nature, Anime, Cars & more</p>
        </div>

        {/* Quick Search Categories */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {quickSearches.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setSearchQuery(item.query);
                setTimeout(() => searchImages(1, item.query), 100);
              }}
              className="px-3 py-1.5 text-xs bg-muted hover:bg-accent rounded-full transition-colors"
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search images... (e.g., BMW M3, nature, anime)"
              className="w-full pl-10 pr-24 py-2.5 text-sm border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : "Search"}
            </button>
          </div>
        </div>

        {/* API Notice */}
        {useFallback && images.length > 0 && (
          <div className="max-w-2xl mx-auto mb-4 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-center">
            <p className="text-xs text-yellow-600">
              ⚡ Using demo images (Google API quota exceeded)
            </p>
          </div>
        )}

        {/* Results Header */}
        {images.length > 0 && (
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-accent"}`}
              >
                <Grid3x3 className="size-4" />
              </button>
              <button
                onClick={() => setViewMode("masonry")}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === "masonry" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-accent"}`}
              >
                <LayoutGrid className="size-4" />
              </button>
            </div>
            <div className="text-xs text-muted-foreground">
              {images.length} images for "{searchQuery}"
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="size-8 animate-spin text-primary mb-3" />
            <p className="text-sm text-muted-foreground">Searching for {searchQuery}...</p>
          </div>
        )}

        {/* Popular Searches (when no search) */}
        {images.length === 0 && !loading && !error && !searchQuery && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="p-4 border rounded-xl bg-card/50">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="size-4 text-orange-500" />
                <h3 className="text-sm font-semibold">Popular Searches</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {["BMW M4", "Mercedes AMG", "Porsche 911", "Nature", "Anime", "Cats", "Dogs", "Sunset", "Mountains", "Beach"].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchQuery(term);
                      setTimeout(() => searchImages(1, term), 100);
                    }}
                    className="px-2 py-1 text-xs bg-muted hover:bg-accent rounded-full transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Image Grid */}
        {!loading && images.length > 0 && (
          <div className={viewMode === "grid" 
            ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3" 
            : "columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3"
          }>
            {images.map((image, index) => (
              <div
                key={`${image.link}-${index}`}
                className="group relative overflow-hidden rounded-lg bg-card border hover:shadow-lg transition-all duration-300 break-inside-avoid"
              >
                <div 
                  className="relative cursor-pointer overflow-hidden"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.link}
                    alt={image.title}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-black/50 text-white text-[9px] rounded-full">
                    {image.displayLink}
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadImage(image.link, image.title);
                      }}
                      className="p-1.5 bg-white rounded-full hover:bg-gray-100"
                      title="Download"
                    >
                      <Download className="size-3 text-gray-800" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(image);
                      }}
                      className="p-1.5 bg-white rounded-full hover:bg-gray-100"
                      title={isLiked(image.link) ? "Unlike" : "Like"}
                    >
                      {isLiked(image.link) ? (
                        <Heart className="size-3 text-red-500 fill-red-500" />
                      ) : (
                        <Heart className="size-3 text-gray-800" />
                      )}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(image.link);
                      }}
                      className="p-1.5 bg-white rounded-full hover:bg-gray-100"
                      title="Copy Link"
                    >
                      {copied ? <Check className="size-3 text-green-500" /> : <Copy className="size-3 text-gray-800" />}
                    </button>
                  </div>
                </div>
                <div className="p-1.5">
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {image.snippet?.substring(0, 60) || image.title?.substring(0, 60)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Liked Images Section */}
        {likedImages.length > 0 && (
          <div className="mt-6 p-3 border rounded-xl bg-card/30">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="size-4 text-red-500 fill-red-500" />
              <h2 className="text-sm font-semibold">Liked Images</h2>
              <span className="text-xs text-muted-foreground">({likedImages.length})</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {likedImages.map((liked, idx) => (
                <div 
                  key={idx} 
                  className="relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden cursor-pointer group"
                  onClick={() => {
                    const fullImage = { link: liked.link, title: liked.title, snippet: liked.snippet, displayLink: "", image: { contextLink: "", height: 0, width: 0 } };
                    setSelectedImage(fullImage);
                  }}
                >
                  <img
                    src={liked.link}
                    alt={liked.title}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLikedImages(likedImages.filter(l => l.link !== liked.link));
                    }}
                    className="absolute top-0.5 right-0.5 p-0.5 bg-red-500 rounded-full text-white hover:bg-red-600 opacity-0 group-hover:opacity-100"
                  >
                    <HeartOff className="size-2" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm" onClick={() => setSelectedImage(null)}>
            <div className="relative max-w-4xl max-h-[90vh] p-4" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-10 right-0 p-1 text-white hover:text-gray-300"
              >
                <X className="size-5" />
              </button>
              <img
                src={selectedImage.link}
                alt={selectedImage.title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <p className="text-white text-xs">{selectedImage.snippet?.substring(0, 100) || selectedImage.title}</p>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => downloadImage(selectedImage.link, selectedImage.title)}
                      className="p-1.5 bg-white rounded-lg hover:bg-gray-100"
                    >
                      <Download className="size-3" />
                    </button>
                    <button
                      onClick={() => toggleLike(selectedImage)}
                      className="p-1.5 bg-white rounded-lg hover:bg-gray-100"
                    >
                      {isLiked(selectedImage.link) ? (
                        <Heart className="size-3 text-red-500 fill-red-500" />
                      ) : (
                        <Heart className="size-3" />
                      )}
                    </button>
                    <button
                      onClick={() => copyToClipboard(selectedImage.link)}
                      className="p-1.5 bg-white rounded-lg hover:bg-gray-100"
                    >
                      {copied ? <Check className="size-3 text-green-500" /> : <Copy className="size-3" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-border text-center">
          <p className="text-[10px] text-muted-foreground">
            © 2026 Njabulo-Jb Image Search
          </p>
        </div>
      </div>
    </div>
  );
      }
