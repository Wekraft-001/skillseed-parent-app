import React, { useState } from "react";
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
  const [selectedContent, setSelectedContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleContentClick = (content) => {
    setSelectedContent(content);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Small delay to allow the modal to close before clearing the content
    setTimeout(() => setSelectedContent(null), 300);
  };
  {
    /* Content Modal */
  }

  return (
    <div className="relative">
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-4xl">
          {selectedContent && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-deep-navy">
                  {selectedContent.title}
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  {selectedContent.description}
                </DialogDescription>
                {selectedContent.grade && (
                  <div className="text-sm text-gray-500">
                    Grade Level: {selectedContent.grade}
                  </div>
                )}
              </DialogHeader>

              <div className="mt-6">
                {selectedContent.type === "video" ? (
                  <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden">
                    <div className="w-full h-96 bg-gray-100 flex items-center justify-center">
                      {selectedContent.videoUrl ? (
                        <video
                          className="w-full h-full object-cover"
                          controls
                          autoPlay
                          src={selectedContent.videoUrl}
                        />
                      ) : (
                        <div className="text-white text-center p-8">
                          <Play className="w-16 h-16 mx-auto mb-4" />
                          <p>Video Player</p>
                          <p className="text-sm opacity-75 mt-2">
                            {selectedContent.duration}
                          </p>
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
                      {selectedContent.content}
                    </p>
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
                {selectedContent.type === "video" ? (
                  <Button className="bg-blue-600 hover:bg-blue-700 px-6">
                    <Download className="w-4 h-4 mr-2" />
                    Download Video
                  </Button>
                ) : (
                  <Button className="bg-green-600 hover:bg-green-700 px-6">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                )}
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
              <div className="flex space-x-4">
                <button className="bg-gradient-to-r from-primary-blue to-blue-600 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter Content
                </button>
                <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Download All
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div id="category-tabs" className="mb-8">
          <div className="flex space-x-4 bg-white rounded-full p-2 shadow-lg border-2 border-gray-100">
            <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-blue to-blue-600 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg">
              <Video className="w-4 h-4 mr-2" />
              Videos
            </button>
            <button className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-600 px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-200 transition">
              <Book className="w-4 h-4 mr-2" />
              Books
            </button>
            <button className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-600 px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-200 transition">
              <Gamepad className="w-4 h-4 mr-2" />
              Activities
            </button>
            <button className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-600 px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-200 transition">
              <Puzzle className="w-4 h-4 mr-2" />
              Resources
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Videos Section */}
            <div id="videos-section" className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-deep-navy">
                  Educational Videos
                </h3>
                <span className="bg-accent-yellow text-deep-navy px-4 py-2 rounded-full text-sm font-semibold">
                  24 Videos
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Video Card 1 */}
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg border-2 border-blue-100 card-hover">
                  <div
                    className="video-thumbnail h-40 relative flex items-center justify-center"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <Play className="text-white w-12 h-12" />
                    <div className="absolute top-3 right-3 bg-accent-yellow text-deep-navy px-2 py-1 rounded-full text-xs font-bold">
                      12:34
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold text-deep-navy mb-2">
                      Introduction to STEAM
                    </h4>
                    <p className="text-gray-600 text-sm mb-3">
                      Learn the basics of Science, Technology, Engineering, Arts
                      &amp; Math
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <img
                          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
                          alt="Child"
                          className="w-6 h-6 rounded-full border-2 border-blue-200"
                        />
                        <span className="text-xs text-gray-500">Grade 5-7</span>
                      </div>
                      <button
                        onClick={() =>
                          handleContentClick({
                            id: "video-1",
                            type: "video",
                            title: "Introduction to Science",
                            description:
                              "Learn the basics of science in this fun and interactive video",
                            duration: "12:34",
                            grade: "Grade 5-7",
                            videoUrl: "https://www.example.com/video1",
                          })
                        }
                        className="flex bg-primary-blue text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-blue-600 transition"
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Watch
                      </button>
                    </div>
                  </div>
                </div>

                {/* Video Card 2 */}
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg border-2 border-purple-100 card-hover">
                  <div
                    className="h-40 relative flex items-center justify-center"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <Play className="text-white w-12 h-12" />
                    <div className="absolute top-3 right-3 bg-accent-yellow text-deep-navy px-2 py-1 rounded-full text-xs font-bold">
                      8:45
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold text-deep-navy mb-2">
                      Career Exploration
                    </h4>
                    <p className="text-gray-600 text-sm mb-3">
                      Discover different career paths and opportunities
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <img
                          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
                          alt="Child"
                          className="w-6 h-6 rounded-full border-2 border-purple-200"
                        />
                        <span className="text-xs text-gray-500">
                          Grade 8-10
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          handleContentClick({
                            id: "video-2",
                            type: "video",
                            title: "Math Magic",
                            description:
                              "Discover the magic of numbers and equations",
                            duration: "8:45",
                            grade: "Grade 8-10",
                            videoUrl: "https://www.example.com/video2",
                          })
                        }
                        className="flex bg-purple-600 text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-purple-700 transition"
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Watch
                      </button>
                    </div>
                  </div>
                </div>

                {/* Video Card 3 */}
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg border-2 border-green-100 card-hover">
                  <div
                    className="h-40 relative flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
                    }}
                  >
                    <Play className="text-white w-12 h-12" />
                    <div className="absolute top-3 right-3 bg-accent-yellow text-deep-navy px-2 py-1 rounded-full text-xs font-bold">
                      15:22
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold text-deep-navy mb-2">
                      Entrepreneurship Basics
                    </h4>
                    <p className="text-gray-600 text-sm mb-3">
                      Learn how to start your own business
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <img
                          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg"
                          alt="Child"
                          className="w-6 h-6 rounded-full border-2 border-green-200"
                        />
                        <span className="text-xs text-gray-500">
                          Grade 9-12
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          handleContentClick({
                            id: "video-3",
                            type: "video",
                            title: "Entrepreneurship Basics",
                            description: "Learn how to start your own business",
                            duration: "15:22",
                            grade: "Grade 9-12",
                            videoUrl: "https://www.example.com/video3",
                          })
                        }
                        className="flex bg-green-600 text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-green-700 transition"
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Watch
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Books Section */}
            <div id="books-section" className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-deep-navy">
                  Digital Books
                </h3>
                <span className="bg-pink-300 text-deep-navy px-4 py-2 rounded-full text-sm font-semibold">
                  18 Books
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Book Card 1 */}
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg border-2 border-pink-100 card-hover">
                  <div
                    className="book-cover h-48 relative flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
                    }}
                  >
                    <BookOpen className="text-white w-12 h-12" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-deep-navy mb-2 text-sm">
                      Science Adventures
                    </h4>
                    <p className="text-gray-600 text-xs mb-3">
                      Fun experiments for kids
                    </p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          handleContentClick({
                            id: "book-1",
                            type: "text",
                            title: "Science Fun",
                            description: "Fun experiments for kids",
                            grade: "Grade 3-5",
                            content:
                              "This is the full content of the Science Fun book. It contains exciting experiments and activities for young scientists.",
                          })
                        }
                        className="w-full flex align-center justify-center bg-pink-500 text-white px-3 py-2 rounded-full text-xs font-semibold hover:bg-pink-600 transition"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Read
                      </button>
                      <button className="bg-gray-200 text-gray-600 px-3 py-2 rounded-full text-xs hover:bg-gray-300 transition">
                        <Download className="w-4 h-4 mr-2" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Book Card 2 */}
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg border-2 border-orange-100 card-hover">
                  <div
                    className="h-48 relative flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
                    }}
                  >
                    <BookOpen className="text-white w-12 h-12" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-deep-navy mb-2 text-sm">
                      Math Magic
                    </h4>
                    <p className="text-gray-600 text-xs mb-3">
                      Making numbers fun
                    </p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          handleContentClick({
                            id: "book-2",
                            type: "text",
                            title: "Math Adventures",
                            description: "Making numbers fun",
                            grade: "Grade 2-4",
                            content:
                              "This is the full content of the Math Adventures book. It makes learning math fun and engaging for young learners.",
                          })
                        }
                        className="w-full flex align-center justify-center bg-orange-500 text-white px-3 py-2 rounded-full text-xs font-semibold hover:bg-orange-600 transition"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Read
                      </button>
                      <button className="bg-gray-200 text-gray-600 px-3 py-2 rounded-full text-xs hover:bg-gray-300 transition">
                        <Download className="w-4 h-4 mr-2" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Book Card 3 */}
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg border-2 border-blue-100 card-hover">
                  <div
                    className="h-48 relative flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    }}
                  >
                    <BookOpen className="text-white w-12 h-12" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-deep-navy mb-2 text-sm">
                      Tech Tales
                    </h4>
                    <p className="text-gray-600 text-xs mb-3">
                      Stories about technology
                    </p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          handleContentClick({
                            id: "book-3",
                            type: "text",
                            title: "Tech Tales",
                            description: "Stories about technology",
                            grade: "Grade 5-7",
                            content:
                              "This is the full content of the Tech Tales book. It contains exciting stories about technology and innovation.",
                          })
                        }
                        className="w-full flex align-center justify-center bg-primary-blue text-white px-3 py-2 rounded-full text-xs font-semibold hover:bg-blue-600 transition"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Read
                      </button>
                      <button className="bg-gray-200 text-gray-600 px-3 py-2 rounded-full text-xs hover:bg-gray-300 transition">
                        <Download className="w-4 h-4 mr-2" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Book Card 4 */}
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg border-2 border-green-100 card-hover">
                  <div
                    className="h-48 relative flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
                    }}
                  >
                    <BookOpen className="text-white w-12 h-12" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-deep-navy mb-2 text-sm">
                      Art &amp; Creativity
                    </h4>
                    <p className="text-gray-600 text-xs mb-3">
                      Unleash your creativity
                    </p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          handleContentClick({
                            id: "book-4",
                            type: "text",
                            title: "Art & Creativity",
                            description: "Unleash your creativity",
                            grade: "All Ages",
                            content:
                              "This is the full content of the Art & Creativity book. It provides activities and inspiration to unleash your creative potential.",
                          })
                        }
                        className="w-full flex align-center justify-center bg-green-500 text-white px-3 py-2 rounded-full text-xs font-semibold hover:bg-green-600 transition"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Read
                      </button>
                      <button className="bg-gray-200 text-gray-600 px-3 py-2 rounded-full text-xs hover:bg-gray-300 transition">
                        <Download className="w-4 h-4 mr-2" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Content Stats */}
            <div
              id="content-stats"
              className="bg-white rounded-3xl p-6 shadow-lg border-2 border-gray-100 relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 w-6 h-6 bg-accent-yellow rounded-full opacity-30 animate-pulse"></div>
              <div
                className="absolute bottom-4 left-4 w-4 h-4 bg-pink-300 rounded-full opacity-40 animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>

              <h3 className="text-xl font-bold text-deep-navy mb-6">
                Content Overview
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary-blue p-2 rounded-full">
                      <i className="text-white text-sm" data-fa-i2svg="">
                        <svg
                          className="svg-inline--fa fa-play"
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="play"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 384 512"
                          data-fa-i2svg=""
                        >
                          <path
                            fill="currentColor"
                            d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
                          ></path>
                        </svg>
                      </i>
                    </div>
                    <span className="font-semibold text-deep-navy">Videos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ParentResources;
