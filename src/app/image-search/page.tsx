"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Search, Download, Heart, HeartOff, 
  Loader2, Grid3x3, LayoutGrid, X, TrendingUp,
  Copy, Check, AlertCircle, Sparkles, ChevronLeft, ChevronRight,
  Camera, Car, Dog, Cat, Flower, Mountain, Sun
} from "lucide-react";

// Google Custom Search API Keys
const GCSE_KEY = 'AIzaSyDMbI3nvmQUrfjoCJYLS69Lej1hSXQjnWI';
const GCSE_CX = 'baf9bdb0c631236e5';

// Images per page
const IMAGES_PER_PAGE = 100; // Show 100 images per page

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

// Fallback images when API fails
const getFallbackImages = (query: string, count: number = 100) => {
  const imageMap: Record<string, string[]> = {
    "bmw": [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600",
      "https://images.unsplash.com/photo-1607853554439-0069ec0f29b6?w=600",
      "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=600",
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600",
      "https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?w=600"
    ],
    "mercedes": [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d5?w=600",
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600",
      "https://images.unsplash.com/photo-1620106390902-32d8a5de4f0c?w=600",
      "https://images.unsplash.com/photo-1592160543405-61d2ab96c1bb?w=600"
    ],
    "nature": [
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600",
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=600"
    ],
    "anime": [
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600",
      "https://images.unsplash.com/photo-1541562232579-512a21360020?w=600",
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600"
    ],
    "cars": [
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?w=600"
    ],
    "dogs": [
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600",
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600",
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=600"
    ],
    "cats": [
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600",
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600",
      "https://images.unsplash.com/photo-1577023311546-cdc077a0c4c4?w=600"
    ]
  };

  const lowerQuery = query.toLowerCase();
  for (const [key, images] of Object.entries(imageMap)) {
    if (lowerQuery.includes(key)) {
      // Repeat images to reach desired count
      const repeatedImages = [];
      for (let i = 0; i < count; i++) {
        repeatedImages.push({
          link: images[i % images.length],
          title: `${query} image ${i + 1}`,
          snippet: `Beautiful ${query} image`,
          displayLink: "unsplash.com",
          image: { contextLink: "", height: 600, width: 800 }
        });
      }
      return repeatedImages.slice(0, count);
    }
  }
  
  // Default fallback with many images
  const defaultImages = [];
  for (let i = 1; i <= Math.min(count, 100); i++) {
    defaultImages.push({
      link: `https://picsum.photos/id/${(i * 7) % 200}/600/400`,
      title: `${query} image ${i}`,
      snippet: `Random image for ${query}`,
      displayLink: "picsum.photos",
      image: { contextLink: "", height: 400, width: 600 }
    });
  }
  return defaultImages;
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
  const [startIndex, setStartIndex] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [useFallback, setUseFallback] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const searchImages = async (page: number = 1) => {
    if (!searchQuery.trim()) {
      setError("Please enter a search term");
      return;
    }

    setLoading(true);
    setError(null);
    setUseFallback(false);
    setCurrentPage(page);
    
    const newStartIndex = (page - 1) * IMAGES_PER_PAGE + 1;
    setStartIndex(newStartIndex);

    // Add to search history
    if (page === 1 && !searchHistory.includes(searchQuery.trim())) {
      setSearchHistory(prev => [searchQuery.trim(), ...prev].slice(0, 10));
    }

    try {
      // Google API max is 10 per request, so we need multiple requests
      const numRequests = Math.ceil(IMAGES_PER_PAGE / 10);
      let allItems: ImageResult[] = [];
      
      for (let i = 0; i < numRequests; i++) {
        const requestStart = newStartIndex + (i * 10);
        
        const params = new URLSearchParams({
          key: GCSE_KEY,
          cx: GCSE_CX,
          q: searchQuery,
          searchType: 'image',
          num: '10',
          start: requestStart.toString(),
          safe: 'active',
          alt: 'json'
        });

        const response = await fetch(`https://www.googleapis.com/customsearch/v1?${params.toString()}`);
        const data = await response.json();

        if (data.error) {
          console.error("API Error:", data.error);
          // Use fallback images
          setUseFallback(true);
          const fallbackImages = getFallbackImages(searchQuery, IMAGES_PER_PAGE);
          setImages(fallbackImages);
          setTotalResults(0);
          setLoading(false);
          return;
        }

        if (data.items && data.items.length > 0) {
          allItems = [...allItems, ...data.items];
          if (data.queries?.request?.[0]?.totalResults) {
            setTotalResults(parseInt(data.queries.request[0].totalResults));
          }
        }
      }

      if (allItems.length > 0) {
        setImages(allItems.slice(0, IMAGES_PER_PAGE));
      } else {
        setError("No images found. Try a different search term.");
        setImages([]);
      }
    } catch (err) {
      console.error("Search error:", err);
      setUseFallback(true);
      const fallbackImages = getFallbackImages(searchQuery, IMAGES_PER_PAGE);
      setImages(fallbackImages);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    searchImages(1);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const nextPage = () => {
    const nextPageNum = currentPage + 1;
    searchImages(nextPageNum);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prevPage = () => {
    if (currentPage > 1) {
      const prevPageNum = currentPage - 1;
      searchImages(prevPageNum);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToPage = (page: number) => {
    searchImages(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  const totalPages = Math.ceil(totalResults / IMAGES_PER_PAGE);
  const maxVisiblePages = 5;
  
  const getPageNumbers = () => {
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

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
                setTimeout(() => searchImages(1), 100);
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
              📸 Showing {images.length} sample images (Demo mode)
            </p>
          </div>
        )}

        {/* Results Header with Pagination */}
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
              Showing {images.length} images for "{searchQuery}"
              {totalResults > 0 && ` (${totalResults.toLocaleString()} total)`}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="size-8 animate-spin text-primary mb-3" />
            <p className="text-sm text-muted-foreground">Searching for {searchQuery}...</p>
            <p className="text-xs text-muted-foreground mt-1">Loading {IMAGES_PER_PAGE} images...</p>
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
                      setTimeout(() => searchImages(1), 100);
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

        {/* Error State */}
        {error && (
          <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
            <AlertCircle className="size-10 text-red-500 mx-auto mb-3" />
            <p className="text-sm text-red-600">{error}</p>
            <button
              onClick={() => {
                setSearchQuery("BMW M4");
                setTimeout(() => searchImages(1), 100);
              }}
              className="mt-3 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg"
            >
              Try "BMW M4"
            </button>
          </div>
        )}

        {/* Image Grid - Shows up to 100 images */}
        {!loading && images.length > 0 && (
          <>
            <div className={viewMode === "grid" 
              ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3" 
              : "columns-2 md:columns-3 lg:columns-5 gap-3 space-y-3"
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
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://placehold.co/600x400/e2e8f0/64748b?text=Image";
                      }}
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

            {/* Pagination Controls */}
            {(totalPages > 1 || images.length >= IMAGES_PER_PAGE) && (
              <div className="flex flex-col items-center gap-3 mt-6">
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevPage}
                    disabled={currentPage <= 1}
                    className="flex items-center gap-1 px-3 py-1.5 border rounded-lg hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    <ChevronLeft className="size-4" />
                    Previous
                  </button>
                  
                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {getPageNumbers().map((page) => (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`w-8 h-8 rounded-lg text-sm transition-colors ${
                          currentPage === page
                            ? "bg-primary text-primary-foreground"
                            : "border hover:bg-accent"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={nextPage}
                    disabled={totalResults > 0 && currentPage >= totalPages}
                    className="flex items-center gap-1 px-3 py-1.5 border rounded-lg hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    Next
                    <ChevronRight className="size-4" />
                  </button>
                </div>
                <div className="text-xs text-muted-foreground">
                  Page {currentPage} of {totalPages || 1} | {images.length} images on this page
                  {totalResults > 0 && ` | ${totalResults.toLocaleString()} total images`}
                </div>
              </div>
            )}
          </>
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
              {likedImages.slice(0, 20).map((liked, idx) => (
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
            © 2026 Njabulo-Jb Image Search | Showing up to {IMAGES_PER_PAGE} images per page
          </p>
        </div>
      </div>
    </div>
  );
  }
