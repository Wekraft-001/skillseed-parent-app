import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, Video, Eye, Play, Book } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

const Resources = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("parentToken");
  const [selectedContent, setSelectedContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("videos");

  const handleContentClick = (content) => {
    setSelectedContent(content);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Small delay to allow modal animation before clearing content
    setTimeout(() => setSelectedContent(null), 300);
  };

  const fetchResources = async () => {
    const res = await axios.get(`${apiURL}/content`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    // console.log(res.data, "content");
    return res.data;
  };

  const {
    data: resources = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["resources"],
    queryFn: fetchResources,
    staleTime: 5 * 60 * 1000,
  });

  // Filter content by type
  const videos = resources.filter((item) => item.type === "video");
  const books = resources.filter((item) => item.type === "book");

  // Empty state component
  const EmptyState = ({ type }) => (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        {type === "videos" ? (
          <Video className="w-12 h-12 text-gray-400" />
        ) : (
          <BookOpen className="w-12 h-12 text-gray-400" />
        )}
      </div>
      <h3 className="text-xl font-semibold text-gray-600 mb-2">
        No {type === "videos" ? "Videos" : "Books"} Available
      </h3>
      <p className="text-gray-500 max-w-md">
        {type === "videos"
          ? "There are no educational videos available at the moment. Check back later for new content!"
          : "There are no digital books available at the moment. Check back later for new reading materials!"}
      </p>
    </div>
  );

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-4 text-gray-600">Loading resources...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="text-red-500 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Unable to Load Resources
          </h3>
          <p className="text-gray-600">
            There was an error loading the content. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Content Modal */}
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
                <div className="flex items-center space-x-4 mt-2">
                  {selectedContent.author && (
                    <div className="text-sm text-gray-500">
                      By: {selectedContent.author}
                    </div>
                  )}
                </div>
              </DialogHeader>

              <div className="mt-6">
                {selectedContent.type === "video" ? (
                  <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden">
                    <div className="w-full h-96 bg-gray-100 flex items-center justify-center">
                      {selectedContent.videoUrl ? (
                        <iframe
                          className="w-full h-full"
                          src={selectedContent.videoUrl
                            .replace("youtu.be/", "youtube.com/embed/")
                            .replace("?si=", "?start=0&")}
                          title={selectedContent.title}
                          frameBorder="0"
                          allowFullScreen
                        />
                      ) : (
                        <div className="text-gray-500 text-center p-8">
                          <Play className="w-16 h-16 mx-auto mb-4" />
                          <p>Video not available</p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="prose max-w-none p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">
                      {selectedContent.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedContent.content || selectedContent.description}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end">
                <Button
                  variant="outline"
                  onClick={handleCloseModal}
                  className="px-6"
                >
                  Close
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Page Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
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
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div id="category-tabs" className="mb-8">
          <div className="flex space-x-4 bg-white rounded-full p-2 shadow-lg border-2 border-gray-100">
            <button
              onClick={() => setActiveTab("videos")}
              className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold shadow-lg transition ${
                activeTab === "videos"
                  ? "bg-gradient-to-r from-primary-blue to-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Video className="w-4 h-4" />
              Videos ({videos.length})
            </button>
            <button
              onClick={() => setActiveTab("books")}
              className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold shadow-lg transition ${
                activeTab === "books"
                  ? "bg-gradient-to-r from-primary-blue to-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Book className="w-4 h-4" />
              Books ({books.length})
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="w-full">
          {/* Videos Section */}
          {activeTab === "videos" && (
            <div id="videos-section" className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-deep-navy">
                  Educational Videos
                </h3>
                <span className="bg-accent-yellow text-deep-navy px-4 py-2 rounded-full text-sm font-semibold">
                  {videos.length} Videos
                </span>
              </div>

              {videos.length === 0 ? (
                <EmptyState type="videos" />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.map((video, index) => (
                    <div
                      key={video.id || index}
                      className="bg-white rounded-3xl overflow-hidden shadow-lg border-2 border-blue-100 card-hover"
                    >
                      <div
                        className="video-thumbnail h-40 relative flex items-center justify-center bg-cover bg-center"
                        style={{
                          backgroundImage: video.thumbnailUrl
                            ? `url(${video.thumbnailUrl})`
                            : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        }}
                      >
                        <Play className="text-white w-12 h-12" />
                      </div>
                      <div className="p-6">
                        <h4 className="font-bold text-deep-navy mb-2">
                          {video.title}
                        </h4>
                        <p className="text-gray-600 text-sm mb-3">
                          {video.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2"></div>
                          <button
                            onClick={() => handleContentClick(video)}
                            className="flex bg-primary-blue text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-blue-600 transition"
                          >
                            <Play className="w-4 h-4 mr-1" />
                            Watch
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Books Section */}
          {activeTab === "books" && (
            <div id="books-section" className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-deep-navy">
                  Digital Books
                </h3>
                <span className="bg-pink-300 text-deep-navy px-4 py-2 rounded-full text-sm font-semibold">
                  {books.length} Books
                </span>
              </div>

              {books.length === 0 ? (
                <EmptyState type="books" />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {books.map((book, index) => (
                    <div
                      key={book.id || index}
                      className="bg-white rounded-3xl overflow-hidden shadow-lg border-2 border-pink-100 card-hover"
                    >
                      <div
                        className="book-cover h-48 relative flex items-center justify-center bg-cover bg-center"
                        style={{
                          backgroundImage: book.thumbnailUrl
                            ? `url(${book.thumbnailUrl})`
                            : "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
                        }}
                      >
                        <BookOpen className="text-white w-12 h-12" />
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-deep-navy mb-2 text-sm">
                          {book.title}
                        </h4>
                        <p className="text-gray-600 text-xs mb-3">
                          {book.description}
                        </p>
                        <div className="flex flex-col space-y-2">
                          <button
                            onClick={() => handleContentClick(book)}
                            className="w-full flex items-center justify-center bg-pink-500 text-white px-3 py-2 rounded-full text-xs font-semibold hover:bg-pink-600 transition"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Read
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Resources;
