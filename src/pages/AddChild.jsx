import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ArrowLeft, Camera, ArrowRight } from "lucide-react";
import { PageMetadata } from "../components/PageMetadata";
import { Input } from "../components/ui/formComponents/input";
import { useForm } from "react-hook-form";

const AddChild = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("parentToken");
  const { handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    grade: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Image too large. Max size is 2MB.");
      return;
    }

    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAddChild = async () => {
    const { firstName, lastName, age, grade, password } = formData;

    if (!image) {
      alert("Profile image is required.");
      return;
    }
    if (!firstName || !lastName || !age || !grade || !password) {
      alert("Please fill out all fields.");
      return;
    }

    setLoading(true);
    const form = new FormData();
    form.append("firstName", firstName);
    form.append("lastName", lastName);
    form.append("age", age);
    form.append("grade", grade);
    form.append("password", password);
    form.append("role", "student");
    form.append("image", image);

    try {
      const response = await axios.post(`${apiURL}/auth/addStudent`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 201) {
        alert("Child added successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          age: "",
          grade: "",
          password: "",
        });
        setImage(null);
        setPreview(null);
        onOpenChange(false);
      }
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong.";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageMetadata
        title="Add Child | SkillSeed"
        description="Connect your child's account to your SkillSeed parent dashboard"
      />
      <div className="min-h-[800px] bg-[#F5F7FA] p-6">
        <div id="add-child-container" className="max-w-2xl mx-auto">
          {/* Back Navigation */}
          <div className="flex items-center gap-2 mb-4">
            <Link
              to="/home"
              className="text-[#0A1F44] hover:text-[#1A73E8] flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-2xl shadow-sm p-8 relative overflow-hidden">
            {/* Decorative Bubbles */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100 rounded-full opacity-50"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-[#FFC107] rounded-full opacity-30"></div>

            {/* Header */}
            <div id="add-child-header" className="text-center mb-4">
              <h1 className="text-2xl font-bold text-[#0A1F44] mb-1">
                Add Your Child
              </h1>
              <p className="text-gray-600">Create your child's profile</p>
            </div>

            <form
              onSubmit={handleSubmit(handleAddChild)}
              className="space-y-4 relative z-10"
            >
              <div className="grid gap-4">
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">
                    First Name
                  </label>
                  <Input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter Child's First Name"
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">
                    Last Name
                  </label>

                  <Input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter Child's Last Name"
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">Age</label>
                  <Input
                    type="text"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="6-17"
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">
                    Grade
                  </label>
                  <Input
                    type="text"
                    name="grade"
                    value={formData.grade}
                    onChange={handleInputChange}
                    placeholder="Enter your child's grade"
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">
                    Password
                  </label>
                  <Input
                    type="text"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="password"
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Profile Picture</h3>
                <div className="flex items-center space-x-6">
                  <div className="relative group">
                    <img
                      src={
                        preview ||
                        "https://via.placeholder.com/96x96.png?text=Preview"
                      }
                      className="w-24 h-24 rounded-full border-4 border-blue-600 object-cover shadow-lg bg-gray-100"
                      alt="Preview"
                    />
                    <label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        hidden
                      />
                      <span className="absolute bottom-0 right-0 bg-yellow-400 p-2 rounded-full border-2 border-white hover:bg-yellow-400/90 text-gray-900 cursor-pointer">
                        <Camera className="w-4 h-4" />
                      </span>
                    </label>
                  </div>
                  <span className="text-gray-500 text-sm">
                    JPG or PNG, Max 2MB
                  </span>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-[#3C91BA] text-white rounded-full font-semibold hover:bg-blue-600/90 flex items-center space-x-2 cursor-pointer"
                >
                  <span>{loading ? "Submitting..." : "Submit"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Recently Added Children */}
          {/* <div id="recent-children" className="mt-8">
            <h3 className="text-lg font-semibold mb-4">
              Recently Added Children
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl flex items-center gap-4 shadow-sm">
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
                  className="w-12 h-12 rounded-full"
                  alt="Child Avatar"
                />
                <div>
                  <h4 className="font-semibold">Emma Johnson</h4>
                  <p className="text-sm text-gray-500">Added May 12, 2025</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl flex items-center gap-4 shadow-sm">
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
                  className="w-12 h-12 rounded-full"
                  alt="Child Avatar"
                />
                <div>
                  <h4 className="font-semibold">Tom Johnson</h4>
                  <p className="text-sm text-gray-500">Added May 10, 2025</p>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default AddChild;
