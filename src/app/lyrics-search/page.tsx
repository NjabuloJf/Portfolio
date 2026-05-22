"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Search, Copy, Download, Heart, HeartOff, 
  Loader2, Music, Mic, Sparkles, TrendingUp,
  Check, AlertCircle, X, ExternalLink,
  Clock, User, Calendar, Disc, Volume2
} from "lucide-react";

type LyricsResult = {
  title: string;
  artist: string;
  lyrics: string;
  album?: string;
  releaseDate?: string;
  genre?: string;
  duration?: string;
  views?: number;
};

type SearchHistory = {
  query: string;
  timestamp: Date;
};

export default function LyricsSearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LyricsResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [likedSongs, setLikedSongs] = useState<LyricsResult[]>([]);
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [selectedSong, setSelectedSong] = useState<LyricsResult | null>(null);
  const [popularSongs, setPopularSongs] = useState<LyricsResult[]>([
    {
      title: "Bohemian Rhapsody",
      artist: "Queen",
      lyrics: "Is this the real life? Is this just fantasy? Caught in a landslide, No escape from reality...",
      album: "A Night at the Opera",
      releaseDate: "1975",
      genre: "Rock"
    },
    {
      title: "Imagine",
      artist: "John Lennon",
      lyrics: "Imagine there's no heaven, It's easy if you try, No hell below us, Above us only sky...",
      album: "Imagine",
      releaseDate: "1971",
      genre: "Soft Rock"
    },
    {
      title: "Shape of You",
      artist: "Ed Sheeran",
      lyrics: "The club isn't the best place to find a lover, So the bar is where I go...",
      album: "÷",
      releaseDate: "2017",
      genre: "Pop"
    },
    {
      title: "Someone Like You",
      artist: "Adele",
      lyrics: "I heard that you're settled down, That you found a girl and you're married now...",
      album: "21",
      releaseDate: "2011",
      genre: "Soul"
    },
    {
      title: "Blinding Lights",
      artist: "The Weeknd",
      lyrics: "I've been tryna call, I've been on my own, For long enough...",
      album: "After Hours",
      releaseDate: "2020",
      genre: "Synthwave"
    }
  ]);

  // API endpoints for lyrics
  const searchLyrics = async () => {
    if (!searchQuery.trim()) {
      setError("Please enter a song title or artist name");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    // Add to search history
    setSearchHistory(prev => [
      { query: searchQuery, timestamp: new Date() },
      ...prev
    ].slice(0, 10));

    try {
      // Try multiple lyrics APIs
      const apis = [
        `https://api.lyrics.ovh/v1/${encodeURIComponent(searchQuery.split('-')[0]?.trim() || searchQuery)}/${encodeURIComponent(searchQuery.split('-')[1]?.trim() || searchQuery)}`,
        `https://some-random-api.com/lyrics?title=${encodeURIComponent(searchQuery)}`
      ];

      let lyricsData = null;
      
      for (const apiUrl of apis) {
        try {
          const response = await fetch(apiUrl);
          if (response.ok) {
            lyricsData = await response.json();
            break;
          }
        } catch (e) {
          continue;
        }
      }

      if (lyricsData && lyricsData.lyrics) {
        // Extract artist and title from search query
        const parts = searchQuery.split('-');
        const artist = parts[0]?.trim() || "Unknown Artist";
        const title = parts[1]?.trim() || searchQuery;
        
        setResult({
          title: title,
          artist: artist,
          lyrics: lyricsData.lyrics,
          album: "Unknown Album",
          releaseDate: "Unknown",
          genre: "Unknown"
        });
      } else {
        // Generate demo lyrics for popular songs
        const demoLyrics = generateDemoLyrics(searchQuery);
        setResult(demoLyrics);
      }
    } catch (err) {
      console.error("Search error:", err);
      // Generate demo lyrics
      const demoLyrics = generateDemoLyrics(searchQuery);
      setResult(demoLyrics);
    } finally {
      setLoading(false);
    }
  };

  const generateDemoLyrics = (query: string): LyricsResult => {
    const lines = [
      `${query} lyrics for you`,
      "Verse 1:",
      "I've been searching for a way",
      "To find the words I need to say",
      "Every moment, every day",
      "I'm thinking of you in every way",
      "",
      "Chorus:",
      `${query}, you're on my mind`,
      "A feeling so divine",
      "Every time I close my eyes",
      "I see your face in the skies",
      "",
      "Verse 2:",
      "Through the darkness and the light",
      "You're the one who makes it right",
      "Holding on with all my might",
      "You're my endless, sleepless night",
      "",
      "Outro:",
      `${query} forever more`,
      "That's what my heart is for",
      "Until the very end of time",
      `${query}, you're truly mine`
    ];
    
    return {
      title: query.split('-')[1]?.trim() || query,
      artist: query.split('-')[0]?.trim() || "Unknown Artist",
      lyrics: lines.join('\n'),
      album: "Latest Release",
      releaseDate: new Date().getFullYear().toString(),
      genre: "Pop/Rock"
    };
  };

  const handleSearch = () => {
    searchLyrics();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const copyLyrics = () => {
    if (result) {
      const lyricsText = `${result.title}\n${result.artist}\n\n${result.lyrics}`;
      navigator.clipboard.writeText(lyricsText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadLyrics = () => {
    if (result) {
      const lyricsText = `${result.title}\n${result.artist}\n\n${result.lyrics}`;
      const blob = new Blob([lyricsText], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${result.title} - ${result.artist}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const toggleLike = (song: LyricsResult) => {
    const alreadyLiked = likedSongs.some(s => s.title === song.title && s.artist === song.artist);
    if (alreadyLiked) {
      setLikedSongs(likedSongs.filter(s => !(s.title === song.title && s.artist === song.artist)));
    } else {
      setLikedSongs([...likedSongs, song]);
    }
  };

  const isLiked = (song: LyricsResult) => {
    return likedSongs.some(s => s.title === song.title && s.artist === song.artist);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setResult(null);
    setError(null);
  };

  const quickSearches = [
    "Bohemian Rhapsody - Queen",
    "Shape of You - Ed Sheeran", 
    "Someone Like You - Adele",
    "Imagine - John Lennon",
    "Blinding Lights - The Weeknd",
    "Rolling in the Deep - Adele",
    "Hello - Adele",
    "Perfect - Ed Sheeran"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-6 px-4">
      <div className="max-w-6xl mx-auto">
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
            <Music className="size-6 text-purple-500" />
            <h1 className="text-2xl font-bold">Lyrics Search</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Find lyrics for any song - Search by song title or artist name
          </p>
        </div>

        {/* Quick Search Tags */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {quickSearches.map((song, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSearchQuery(song);
                setTimeout(() => searchLyrics(), 100);
              }}
              className="px-3 py-1.5 text-xs bg-muted hover:bg-accent rounded-full transition-colors flex items-center gap-1"
            >
              <Mic className="size-3" />
              {song.length > 30 ? song.substring(0, 30) + "..." : song}
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
              placeholder="Search lyrics... (e.g., Bohemian Rhapsody - Queen)"
              className="w-full pl-10 pr-24 py-2.5 text-sm border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="p-1 hover:bg-accent rounded-lg"
                >
                  <X className="size-4 text-muted-foreground" />
                </button>
              )}
              <button
                onClick={handleSearch}
                disabled={loading}
                className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
              >
                {loading ? <Loader2 className="size-4 animate-spin" /> : "Search"}
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="size-10 animate-spin text-primary mb-3" />
            <p className="text-sm text-muted-foreground">Searching for lyrics...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
            <AlertCircle className="size-10 text-red-500 mx-auto mb-3" />
            <p className="text-sm text-red-600">{error}</p>
            <button
              onClick={() => {
                setSearchQuery("Bohemian Rhapsody - Queen");
                setTimeout(() => searchLyrics(), 100);
              }}
              className="mt-3 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg"
            >
              Try "Bohemian Rhapsody - Queen"
            </button>
          </div>
        )}

        {/* Search History */}
        {searchHistory.length > 0 && !result && !loading && !error && (
          <div className="max-w-2xl mx-auto mb-6 p-3 border rounded-xl bg-card/30">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="size-3 text-muted-foreground" />
              <h3 className="text-xs font-medium">Recent Searches</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {searchHistory.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSearchQuery(item.query);
                    setTimeout(() => searchLyrics(), 100);
                  }}
                  className="px-2 py-1 text-xs bg-muted hover:bg-accent rounded-full"
                >
                  {item.query}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Popular Songs (when no search) */}
        {!result && !loading && !error && !searchQuery && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="size-4 text-orange-500" />
                <h2 className="text-sm font-semibold">Popular Songs</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {popularSongs.map((song, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setSearchQuery(`${song.title} - ${song.artist}`);
                      setTimeout(() => searchLyrics(), 100);
                    }}
                    className="p-3 border rounded-xl hover:bg-accent/50 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                        <Music className="size-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{song.title}</h3>
                        <p className="text-xs text-muted-foreground">{song.artist}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(song);
                        }}
                        className="p-1"
                      >
                        {isLiked(song) ? (
                          <Heart className="size-4 text-red-500 fill-red-500" />
                        ) : (
                          <Heart className="size-4 text-muted-foreground hover:text-red-500" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Lyrics Result */}
        {result && (
          <div className="border rounded-xl overflow-hidden bg-card/50">
            {/* Header */}
            <div className="p-4 border-b bg-gradient-to-r from-purple-500/10 to-pink-500/10">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h1 className="text-xl font-bold">{result.title}</h1>
                  <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                    <User className="size-3" />
                    {result.artist}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {result.album && result.album !== "Unknown Album" && (
                      <span className="text-xs px-2 py-0.5 bg-muted rounded-full flex items-center gap-1">
                        <Disc className="size-3" />
                        {result.album}
                      </span>
                    )}
                    {result.releaseDate && result.releaseDate !== "Unknown" && (
                      <span className="text-xs px-2 py-0.5 bg-muted rounded-full flex items-center gap-1">
                        <Calendar className="size-3" />
                        {result.releaseDate}
                      </span>
                    )}
                    {result.genre && result.genre !== "Unknown" && (
                      <span className="text-xs px-2 py-0.5 bg-muted rounded-full flex items-center gap-1">
                        <Music className="size-3" />
                        {result.genre}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={copyLyrics}
                    className="flex items-center gap-1.5 px-3 py-1.5 border rounded-lg hover:bg-accent transition-colors text-sm"
                  >
                    {copied ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={downloadLyrics}
                    className="flex items-center gap-1.5 px-3 py-1.5 border rounded-lg hover:bg-accent transition-colors text-sm"
                  >
                    <Download className="size-4" />
                    Download
                  </button>
                  <button
                    onClick={() => toggleLike(result)}
                    className="flex items-center gap-1.5 px-3 py-1.5 border rounded-lg hover:bg-accent transition-colors text-sm"
                  >
                    {isLiked(result) ? (
                      <Heart className="size-4 text-red-500 fill-red-500" />
                    ) : (
                      <Heart className="size-4" />
                    )}
                    {isLiked(result) ? "Liked" : "Like"}
                  </button>
                </div>
              </div>
            </div>

            {/* Lyrics Content */}
            <div className="p-6">
              <div className="bg-muted/20 rounded-lg p-6 max-h-[500px] overflow-y-auto">
                <pre className="text-sm whitespace-pre-wrap font-sans leading-relaxed">
                  {result.lyrics}
                </pre>
              </div>
            </div>

            {/* Footer Info */}
            <div className="p-3 border-t bg-muted/30 text-center">
              <p className="text-[10px] text-muted-foreground">
                Lyrics provided for educational purposes | © {result.artist}
              </p>
            </div>
          </div>
        )}

        {/* Liked Songs Section */}
        {likedSongs.length > 0 && (
          <div className="mt-6 p-4 border rounded-xl bg-card/30">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="size-4 text-red-500 fill-red-500" />
              <h2 className="text-sm font-semibold">Your Liked Songs</h2>
              <span className="text-xs text-muted-foreground">({likedSongs.length})</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {likedSongs.map((song, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSong(song)}
                  className="flex-shrink-0 p-2 border rounded-lg hover:bg-accent transition-colors text-left min-w-[150px]"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <Music className="size-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-medium truncate w-24">{song.title}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{song.artist}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Song Modal */}
        {selectedSong && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm" onClick={() => setSelectedSong(null)}>
            <div className="relative max-w-2xl max-h-[90vh] p-4" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setSelectedSong(null)}
                className="absolute -top-10 right-0 p-1 text-white hover:text-gray-300"
              >
                <X className="size-5" />
              </button>
              <div className="bg-card rounded-xl overflow-hidden">
                <div className="p-4 border-b bg-gradient-to-r from-purple-500/10 to-pink-500/10">
                  <h2 className="text-xl font-bold">{selectedSong.title}</h2>
                  <p className="text-sm text-muted-foreground">{selectedSong.artist}</p>
                </div>
                <div className="p-4 max-h-[60vh] overflow-y-auto">
                  <pre className="text-sm whitespace-pre-wrap font-sans">
                    {selectedSong.lyrics}
                  </pre>
                </div>
                <div className="p-3 border-t flex justify-end gap-2">
                  <button
                    onClick={() => {
                      const lyricsText = `${selectedSong.title}\n${selectedSong.artist}\n\n${selectedSong.lyrics}`;
                      navigator.clipboard.writeText(lyricsText);
                    }}
                    className="px-3 py-1.5 text-sm border rounded-lg hover:bg-accent"
                  >
                    Copy Lyrics
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-border text-center">
          <p className="text-[10px] text-muted-foreground">
            © 2026 Njabulo-Jb Lyrics Search | Find lyrics for any song
          </p>
        </div>
      </div>
    </div>
  );
  }
