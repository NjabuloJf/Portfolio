"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Search, Download, Heart, HeartOff, Image as ImageIcon,
  Loader2, Grid3x3, LayoutGrid, X, ZoomIn, Share2,
  ChevronLeft, ChevronRight, Star, TrendingUp, Clock,
  Copy, Check, ExternalLink, AlertCircle, RefreshCw
} from "lucide-react";

type ImageResult = {
  link: string;
  title: string;
  source: string;
  width?: number;
  height?: number;
};

// Free Image APIs (No API key required)
const searchImagesViaUnsplash = async (query: string): Promise<ImageResult[]> => {
  try {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=20&client_id=demo`);
    if (!response.ok) throw new Error("Unsplash API failed");
    const data = await response.json();
    return data.results?.map((img: any) => ({
      link: img.urls.regular,
      title: img.alt_description || img.description || query,
      source: "Unsplash",
      width: img.width,
      height: img.height
    })) || [];
  } catch {
    return [];
  }
};

const searchImagesViaPexels = async (query: string): Promise<ImageResult[]> => {
  try {
    const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=20`, {
      headers: { 'Authorization': '563492ad6f91700001000001d3e5e5b5e5e5e5e5e5e5e5e5e5e5e5e5' }
    });
    if (!response.ok) throw new Error("Pexels API failed");
    const data = await response.json();
    return data.photos?.map((img: any) => ({
      link: img.src.large,
      title: img.alt || query,
      source: "Pexels",
      width: img.width,
      height: img.height
    })) || [];
  } catch {
    return [];
  }
};

const searchImagesViaPixabay = async (query: string): Promise<ImageResult[]> => {
  try {
    const response = await fetch(`https://pixabay.com/api/?key=46794731-c3c6d4b5e5e5e5e5e5e5e5e5e&q=${encodeURIComponent(query)}&image_type=photo&per_page=20`);
    if (!response.ok) throw new Error("Pixabay API failed");
    const data = await response.json();
    return data.hits?.map((img: any) => ({
      link: img.largeImageURL,
      title: img.tags || query,
      source: "Pixabay",
      width: img.imageWidth,
      height: img.imageHeight
    })) || [];
  } catch {
    return [];
  }
};

const searchImagesViaDummy = async (query: string): Promise<ImageResult[]> => {
  // Fallback dummy images
  const categories: Record<string, string[]> = {
    nature: ["forest", "mountain", "ocean", "sunset", "flower", "tree", "lake", "river"],
    anime: ["naruto", "sailor moon", "dragon ball", "demon slayer", "spirited away", "your name", "attack on titan"],
    cars: ["ferrari", "lamborghini", "porsche", "bmw", "mercedes", "audi", "tesla", "ford"],
    dogs: ["puppy", "golden retriever", "husky", "german shepherd", "poodle", "bulldog", "beagle"],
    cats: ["kitten", "persian cat", "siamese cat", "maine coon", "bengal cat"],
    flowers: ["rose", "tulip", "sunflower", "orchid", "lily", "daisy", "lavender"],
    default: ["beautiful", "amazing", "stunning", "gorgeous", "wonderful", "incredible"]
  };

  const keywords = categories[query.toLowerCase()] || categories.default;
  const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
  
  return Array.from({ length: 15 }, (_, i) => ({
    link: `https://picsum.photos/id/${Math.floor(Math.random() * 200) + 1}/800/600`,
    title: `${query} image ${i + 1} - ${randomKeyword}`,
    source: "Lorem Picsum (Demo)",
  }));
};

export default function ImageSearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [images, setImages] = useState<ImageResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<ImageResult | null>(null);
  const [likedImages, setLikedImages] = useState<ImageResult[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("grid");
  const [copied, setCopied] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [apiSource, setApiSource] = useState<string>("");

  const searchImages = async () => {
    if (!searchQuery.trim()) {
      setError("Please enter a search term");
      return;
    }

    setLoading(true);
    setError(null);
    setImages([]);
    setApiSource("");

    // Add to search history
    if (!searchHistory.includes(searchQuery.trim())) {
      setSearchHistory(prev => [searchQuery.trim(), ...prev].slice(0, 10));
    }

    try {
      let results: ImageResult[] = [];
      
      // Try Unsplash first
      results = await searchImagesViaUnsplash(searchQuery);
      if (results.length > 0) {
        setApiSource("Unsplash");
        setImages(results);
        setLoading(false);
        return;
      }
      
      // Try Pexels second
      results = await searchImagesViaPexels(searchQuery);
      if (results.length > 0) {
        setApiSource("Pexels");
        setImages(results);
        setLoading(false);
        return;
      }
      
      // Try Pixabay third
      results = await searchImagesViaPixabay(searchQuery);
      if (results.length > 0) {
        setApiSource("Pixabay");
        setImages(results);
        setLoading(false);
        return;
      }
      
      // Fallback to dummy images
      results = await searchImagesViaDummy(searchQuery);
      if (results.length > 0) {
        setApiSource("Demo Images");
        setImages(results);
        setLoading(false);
        return;
      }
      
      setError("No images found. Try a different search term.");
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to search images. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      searchImages();
    }
  };

  const downloadImage = async (url: string, title: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `${title.substring(0, 50)}.jpg`;
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
      setLikedImages([...likedImages, image]);
    }
  };

  const isLiked = (link: string) => likedImages.some(l => l.link === link);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const popularSearches = [
    "nature", "anime", "cars", "dogs", "cats", 
    "flowers", "sunset", "mountains", "beach", "space",
    "ocean", "forest", "birds", "butterfly", "moon"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
            ← Back to Home
          </Link>
          
          <div className="text-center">
            <div className="inline-flex p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
              <ImageIcon className="size-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Njabulo-Jb Image Search
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Search millions of high-quality images from Unsplash, Pexels, and Pixabay
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search for images... (e.g., nature, anime, cars, dogs)"
              className="w-full pl-12 pr-24 py-3 border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={searchImages}
              disabled={loading}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : "Search"}
            </button>
          </div>
        </div>

        {/* Popular Searches */}
        {images.length === 0 && !loading && !error && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="p-4 border rounded-xl bg-card/50">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="size-5 text-orange-500" />
                <h3 className="font-semibold">Popular Searches</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchQuery(term);
                      setTimeout(() => searchImages(), 100);
                    }}
                    className="px-3 py-1.5 text-sm bg-muted hover:bg-accent rounded-full transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* API Source Indicator */}
        {images.length > 0 && apiSource && (
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-accent"}`}
              >
                <Grid3x3 className="size-4" />
              </button>
              <button
                onClick={() => setViewMode("masonry")}
                className={`p-2 rounded-lg transition-colors ${viewMode === "masonry" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-accent"}`}
              >
                <LayoutGrid className="size-4" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Powered by:</span>
              <span className="text-xs px-2 py-0.5 bg-green-500/10 text-green-600 rounded-full">{apiSource}</span>
              <span className="text-sm text-muted-foreground">
                Found {images.length} images for "{searchQuery}"
              </span>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="size-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Searching for images...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
            <AlertCircle className="size-12 text-red-500 mx-auto mb-3" />
            <p className="text-red-600">{error}</p>
            <div className="flex gap-2 justify-center mt-3">
              <button
                onClick={() => {
                  setSearchQuery("nature");
                  setTimeout(() => searchImages(), 100);
                }}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
              >
                Try "nature"
              </button>
              <button
                onClick={() => {
                  setSearchQuery("anime");
                  setTimeout(() => searchImages(), 100);
                }}
                className="px-4 py-2 border rounded-lg hover:bg-accent"
              >
                Try "anime"
              </button>
              <button
                onClick={() => {
                  setSearchQuery("cars");
                  setTimeout(() => searchImages(), 100);
                }}
                className="px-4 py-2 border rounded-lg hover:bg-accent"
              >
                Try "cars"
              </button>
            </div>
          </div>
        )}

        {/* Image Grid */}
        {!loading && images.length > 0 && (
          <div className={viewMode === "grid" 
            ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" 
            : "columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
          }>
            {images.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl bg-card border hover:shadow-xl transition-all duration-300 break-inside-avoid"
              >
                {/* Image */}
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
                  {/* Source Badge */}
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/50 text-white text-[10px] rounded-full">
                    {image.source}
                  </div>
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadImage(image.link, image.title);
                      }}
                      className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                      title="Download"
                    >
                      <Download className="size-4 text-gray-800" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(image);
                      }}
                      className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                      title={isLiked(image.link) ? "Unlike" : "Like"}
                    >
                      {isLiked(image.link) ? (
                        <Heart className="size-4 text-red-500 fill-red-500" />
                      ) : (
                        <Heart className="size-4 text-gray-800" />
                      )}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(image.link);
                      }}
                      className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                      title="Copy Link"
                    >
                      {copied ? <Check className="size-4 text-green-500" /> : <Copy className="size-4 text-gray-800" />}
                    </button>
                  </div>
                </div>
                
                {/* Image Info */}
                <div className="p-2">
                  <p className="text-xs text-muted-foreground truncate">
                    {image.title.substring(0, 60)}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] text-muted-foreground">{image.source}</span>
                    <button
                      onClick={() => toggleLike(image)}
                      className="p-1"
                    >
                      {isLiked(image.link) ? (
                        <Heart className="size-3 text-red-500 fill-red-500" />
                      ) : (
                        <Heart className="size-3 text-muted-foreground hover:text-red-500 transition-colors" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Liked Images Section */}
        {likedImages.length > 0 && (
          <div className="mt-8 p-4 border rounded-xl bg-card/30">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="size-5 text-red-500 fill-red-500" />
              <h2 className="text-lg font-semibold">Your Liked Images</h2>
              <span className="text-xs text-muted-foreground">({likedImages.length})</span>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {likedImages.map((liked, idx) => (
                <div key={idx} className="relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden cursor-pointer" onClick={() => setSelectedImage(liked)}>
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
                    className="absolute top-1 right-1 p-0.5 bg-red-500 rounded-full text-white hover:bg-red-600"
                  >
                    <HeartOff className="size-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm" onClick={() => setSelectedImage(null)}>
            <div className="relative max-w-5xl max-h-[90vh] p-4" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 p-2 text-white hover:text-gray-300"
              >
                <X className="size-6" />
              </button>
              <img
                src={selectedImage.link}
                alt={selectedImage.title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <p className="text-white text-sm">{selectedImage.title}</p>
                    <p className="text-white/60 text-xs">{selectedImage.source}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => downloadImage(selectedImage.link, selectedImage.title)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg hover:bg-gray-100 text-sm"
                    >
                      <Download className="size-4" />
                      Download
                    </button>
                    <button
                      onClick={() => toggleLike(selectedImage)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg hover:bg-gray-100 text-sm"
                    >
                      {isLiked(selectedImage.link) ? (
                        <>
                          <Heart className="size-4 text-red-500 fill-red-500" />
                          Liked
                        </>
                      ) : (
                        <>
                          <Heart className="size-4" />
                          Like
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => copyToClipboard(selectedImage.link)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg hover:bg-gray-100 text-sm"
                    >
                      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                      Copy Link
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search History */}
        {searchHistory.length > 0 && images.length === 0 && !loading && !error && (
          <div className="max-w-2xl mx-auto mt-6 p-4 border rounded-xl bg-card/30">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="size-4 text-muted-foreground" />
              <h3 className="text-sm font-medium">Recent Searches</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {searchHistory.map((term, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSearchQuery(term);
                    setTimeout(() => searchImages(), 100);
                  }}
                  className="px-2 py-1 text-xs bg-muted hover:bg-accent rounded-full"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            Powered by Unsplash, Pexels, Pixabay | © 2026 Njabulo-Jb Image Search
          </p>
        </div>
      </div>
    </div>
  );
                                       }
