import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  BookOpen,
  Video,
  Search,
  Filter,
  Download,
  Eye,
  Play,
  Book,
  Image as ImageIcon,
  Puzzle,
  Gamepad,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

const ParentResources = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("parentToken");
  const [selectedContent, setSelectedContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleContentClick = (content) => {
    setSelectedContent(content);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedContent(null), 300);
  };

  const fetchContent = async () => {
    const res = await axios.get(`${apiURL}/content`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(res.data);
    return res.data;
  };

  const { data: contents = [], isLoading } = useQuery({
    queryKey: ["contents"],
    queryFn: fetchContent,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const videos = contents.filter((c) => c.type === "video");
  const books = contents.filter((c) => c.type === "book");

  const getEmbedType = (url) => {
    if (!url) return "unknown";
    if (url.includes("youtube.com") || url.includes("youtu.be"))
      return "youtube";
    if (url.includes("instagram.com")) return "instagram";
    return "unknown";
  };

  const getYoutubeEmbedUrl = (url) => {
    if (!url) return "";
    const shortRegex = /youtu\.be\/([a-zA-Z0-9_-]+)/;
    const longRegex = /v=([a-zA-Z0-9_-]+)/;

    let videoId = null;

    if (shortRegex.test(url)) {
      videoId = url.match(shortRegex)[1];
    } else if (longRegex.test(url)) {
      videoId = url.match(longRegex)[1];
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  return (
    <div className="relative">
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-4xl bg-white">
          {selectedContent && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-deep-navy">
                  {selectedContent.title}
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  {selectedContent.description}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4">
                {selectedContent.type === "video" ? (
                  <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden">
                    <div className="w-full h-96 bg-gray-100 flex items-center justify-center">
                      {selectedContent.videoUrl ? (
                        <iframe
                          className="w-full h-96 rounded-lg"
                          src={getYoutubeEmbedUrl(selectedContent.videoUrl)}
                          title={selectedContent.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <div className="text-white text-center p-8">
                          <Play className="w-16 h-16 mx-auto mb-4" />
                          <p>No Video Available</p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="h-[600px] bg-gray-50 rounded-lg overflow-hidden">
                    {selectedContent.bookUrl ? (
                      <iframe
                        src={selectedContent.bookUrl}
                        title={selectedContent.title}
                        className="w-full h-full"
                      />
                    ) : (
                      <p className="text-gray-600 p-6">
                        No book file available
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={handleCloseModal}
                  className="px-6"
                >
                  Close
                </Button>
                {/* {selectedContent.type === "video" ? (
                  <Button className="bg-blue-600 hover:bg-blue-700 px-6">
                    <Download className="w-4 h-4 mr-2" />
                    Download Video
                  </Button>
                ) : (
                  <Button className="bg-green-600 hover:bg-green-700 px-6">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                )} */}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <div className="container mx-auto px-6 py-8">
        {/* Content Library Header */}
        <div id="content-header" className="mb-8">
          <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-yellow-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full -ml-16 -mt-16"></div>
            <div className="absolute top-4 right-8 w-8 h-8 bg-pink-300 rounded-full opacity-30 animate-pulse"></div>
            <div
              className="absolute bottom-6 right-16 w-6 h-6 bg-blue-300 rounded-full opacity-40 animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>

            <div className="flex justify-between items-center relative z-10">
              <div>
                <h2 className="text-3xl font-bold text-deep-navy mb-2">
                  Content Library
                </h2>
                <p className="text-gray-600">
                  Access educational videos, books, and learning materials
                </p>
              </div>
              {/* <div className="flex space-x-4">
                <button className="bg-gradient-to-r from-primary-blue to-blue-600 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter Content
                </button>
                <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Download All
                </button>
              </div> */}
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div id="category-tabs" className="mb-8">
          <div className="flex space-x-4 bg-white rounded-full p-2 shadow-lg border-2 border-gray-100">
            <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-blue to-blue-600 text-white px-6 py-3 rounded-full text-sm md:text-lg font-semibold shadow-lg">
              <Video className="w-4 h-4 mr-2" />
              Videos
            </button>
            <button className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-600 px-6 py-3 rounded-full text-sm md:text-lg font-semibold hover:bg-gray-200 transition">
              <Book className="w-4 h-4 mr-2" />
              Books
            </button>
            {/* <button className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-600 px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-200 transition">
              <Gamepad className="w-4 h-4 mr-2" />
              Activities
            </button>
            <button className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-600 px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-200 transition">
              <Puzzle className="w-4 h-4 mr-2" />
              Resources
            </button> */}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1  gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Videos Section */}
            <div id="videos-section" className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-deep-navy">
                  Educational Videos
                </h3>
                <span className="bg-accent-yellow text-deep-navy px-4 py-2 rounded-full text-sm font-semibold">
                  {videos.length} Videos
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <div
                    key={video._id}
                    className="bg-white rounded-3xl overflow-hidden shadow-lg border-2 border-blue-100 card-hover"
                  >
                    {/* <div className="h-40 flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600">
                      <Play className="text-white w-12 h-12" />
                    </div> */}
                    <div
                      className="h-40 flex items-center justify-center bg-gray-200 relative"
                      style={{
                        backgroundImage: video.thumbnailUrl
                          ? `url(${video.thumbnailUrl})`
                          : "linear-gradient(to right, #60a5fa, #2563eb)", // fallback gradient
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      {/* Overlay to darken and make Play icon visible */}
                      <div className="absolute inset-0 bg-black/40"></div>
                      <Play className="text-white w-12 h-12 relative z-10" />
                    </div>
                    <div className="p-6">
                      <h4 className="font-bold text-deep-navy mb-2">
                        {video.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-3">
                        {video.description}
                      </p>
                      <button
                        onClick={() => handleContentClick(video)}
                        className="flex bg-primary-blue text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-blue-600 transition"
                      >
                        <Play className="w-4 h-4 mr-1" /> Watch
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Books Section */}
            <div id="books-section" className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-deep-navy">
                  Digital Books
                </h3>
                <span className="bg-pink-300 text-deep-navy px-4 py-2 rounded-full text-sm font-semibold">
                  {books.length} Books
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book) => (
                  <div
                    key={book._id}
                    className="bg-white rounded-3xl overflow-hidden shadow-lg border-2 border-pink-100 card-hover"
                  >
                    <div
                      className="h-40 flex items-center justify-center bg-gray-200 relative"
                      style={{
                        backgroundImage: book.thumbnailUrl
                          ? `url(${book.thumbnailUrl})`
                          : "linear-gradient(to right, #60a5fa, #2563eb)", // fallback gradient
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      {/* Overlay to darken and make Play icon visible */}
                      <div className="absolute inset-0 bg-black/40"></div>
                      <BookOpen className="text-white w-12 h-12 relative z-10" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-deep-navy mb-2 text-sm">
                        {book.title}
                      </h4>
                      <p className="text-gray-600 text-xs mb-3">
                        {book.description}
                      </p>
                      <button
                        onClick={() => handleContentClick(book)}
                        className="w-full flex justify-center bg-pink-500 text-white px-3 py-2 rounded-full text-xs font-semibold hover:bg-pink-600 transition"
                      >
                        <Eye className="w-4 h-4 mr-1" /> Read
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ParentResources;
