import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Camera,
  CheckCircle,
  Image as ImageIcon,
  MapPin,
  Upload,
  X,
} from 'lucide-react';

import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import MapPreview from '../components/MapPreview';

const ReportIssue = () => {
  const { addIssue } = useApp();

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    area: 'Nankana Sahib',
  });

  const [pin, setPin] = useState({
    x: 55,
    y: 45,
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMapPick = (x, y) => {
    setPin({
      x,
      y,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }

    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }

    const previewUrl = URL.createObjectURL(file);

    setSelectedFile(file);
    setImagePreview(previewUrl);
  };

  const removeImage = () => {
    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }

    setSelectedFile(null);
    setImagePreview('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.title.trim()) {
      alert('Please enter an issue title.');
      return;
    }

    if (!formData.category) {
      alert('Please select an issue category.');
      return;
    }

    if (!formData.description.trim()) {
      alert('Please describe the issue.');
      return;
    }

    /*
      Nankana Sahib reference coordinates.

      The map itself is handled by Leaflet in MapPreview.jsx.
      These values preserve compatibility with the existing
      COMFIX issue structure.
    */
    const location = {
      area: formData.area || 'Nankana Sahib',
      lat: 31.4504 + (45 - pin.y) * 0.001,
      lng: 73.7065 + (pin.x - 55) * 0.001,
    };

    const newIssue = {
      title: formData.title.trim(),
      category: formData.category,
      description: formData.description.trim(),

      location,

      image: imagePreview || '',
      imageName: selectedFile?.name || '',

      stage: 'Reported',

      votes: 0,
      requiredVotes: 10,

      fundingTarget: 0,
      fundingRaised: 0,

      reportedBy: 'You',
      reportedAt: new Date().toISOString(),
    };

    addIssue(newIssue);

    setSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      description: '',
      area: 'Nankana Sahib',
    });

    setPin({
      x: 55,
      y: 45,
    });

    removeImage();
    setSubmitted(false);
  };

  // =========================================================
  // SUCCESS SCREEN
  // =========================================================

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-8 text-center">

          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle
              size={46}
              className="text-green-600"
            />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Issue Reported Successfully!
          </h1>

          <p className="text-gray-600 mb-8">
            Your issue has been submitted to the COMFIX community.
            Residents of Nankana Sahib can now view and support it.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">

            <button
              onClick={resetForm}
              className="flex-1 px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Report Another Issue
            </button>

            <Link
              to="/issues"
              className="flex-1 px-5 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition text-center"
            >
              Explore Issues
            </Link>

          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // MAIN PAGE
  // =========================================================

  return (
    <div className="min-h-screen bg-gray-50">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="bg-white border-b border-gray-200">

        <div className="max-w-6xl mx-auto px-4 py-6">

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-4"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>

          <h1 className="text-3xl font-bold text-gray-900">
            Report a Community Issue
          </h1>

          <p className="text-gray-600 mt-2">
            Help improve Nankana Sahib by reporting a problem in your area.
          </p>

        </div>

      </div>

      {/* =====================================================
          PROGRESS GUIDE
      ====================================================== */}

      <div className="max-w-6xl mx-auto px-4 pt-6">

        <div className="bg-white rounded-2xl border border-gray-200 p-5">

          <div className="flex items-center justify-between">

            {/* STEP 1 */}

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                1
              </div>

              <div>
                <p className="font-semibold text-gray-900">
                  Issue Details
                </p>

                <p className="text-xs text-gray-500 hidden sm:block">
                  Describe the problem
                </p>
              </div>

            </div>

            <div className="flex-1 h-1 bg-blue-200 mx-4" />

            {/* STEP 2 */}

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                2
              </div>

              <div>
                <p className="font-semibold text-gray-900">
                  Location & Photo
                </p>

                <p className="text-xs text-gray-500 hidden sm:block">
                  Show where it is
                </p>
              </div>

            </div>

            <div className="flex-1 h-1 bg-blue-200 mx-4" />

            {/* STEP 3 */}

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                3
              </div>

              <div>
                <p className="font-semibold text-gray-900">
                  Review
                </p>

                <p className="text-xs text-gray-500 hidden sm:block">
                  Check and submit
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          FORM
      ====================================================== */}

      <form
        onSubmit={handleSubmit}
        className="max-w-6xl mx-auto px-4 py-6 pb-12"
      >

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* =================================================
              LEFT COLUMN
          ================================================= */}

          <div className="space-y-6">

            {/* =================================================
                1. ISSUE DETAILS
            ================================================== */}

            <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="font-bold text-blue-700">
                    1
                  </span>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Issue Details
                  </h2>

                  <p className="text-sm text-gray-500">
                    Tell your community what needs to be fixed.
                  </p>
                </div>

              </div>

              <div className="space-y-5">

                {/* TITLE */}

                <div>

                  <label className="block font-semibold text-gray-700 mb-2">
                    Issue Title
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Large pothole on Railway Road"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                </div>

                {/* CATEGORY */}

                <div>

                  <label className="block font-semibold text-gray-700 mb-2">
                    Category
                  </label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >

                    <option value="">
                      Select an issue category
                    </option>

                    {CATEGORIES.map((category) => (
                      <option
                        key={category.id || category}
                        value={category.name || category}
                      >
                        {category.name || category}
                      </option>
                    ))}

                  </select>

                </div>

                {/* DESCRIPTION */}

                <div>

                  <label className="block font-semibold text-gray-700 mb-2">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Explain what is wrong, where it is, and how it affects the community..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                </div>

              </div>

            </section>

            {/* =================================================
                2. LOCATION
            ================================================== */}

            <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="font-bold text-blue-700">
                    2
                  </span>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Location
                  </h2>

                  <p className="text-sm text-gray-500">
                    Tell us where the problem is located.
                  </p>
                </div>

              </div>

              {/* AREA */}

              <div className="mb-5">

                <label className="block font-semibold text-gray-700 mb-2">
                  Area
                </label>

                <div className="relative">

                  <MapPin
                    size={20}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600"
                  />

                  <input
                    type="text"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    placeholder="Nankana Sahib"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                </div>

              </div>

              {/* MAP */}

              <div>

                <label className="block font-semibold text-gray-700 mb-2">
                  Pin Exact Location
                </label>

                <p className="text-sm text-gray-500 mb-3">
                  Tap anywhere on the map or drag the marker to the exact location.
                </p>

                <div className="rounded-xl overflow-hidden border border-gray-300">

                  <MapPreview
                    interactive
                    onPick={handleMapPick}
                    pinX={pin.x}
                    pinY={pin.y}
                    label="Tap to place the issue location"
                  />

                </div>

              </div>

            </section>

          </div>

          {/* =================================================
              RIGHT COLUMN
          ================================================= */}

          <div className="space-y-6">

            {/* =================================================
                PHOTO
            ================================================== */}

            <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Camera
                    size={20}
                    className="text-blue-700"
                  />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Photo
                  </h2>

                  <p className="text-sm text-gray-500">
                    Add a photo showing the problem.
                  </p>
                </div>

              </div>

              {!imagePreview ? (

                <label
                  htmlFor="issue-image"
                  className="block border-2 border-dashed border-gray-300 rounded-xl p-10 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition"
                >

                  <div className="flex flex-col items-center">

                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">

                      <Camera
                        size={32}
                        className="text-blue-600"
                      />

                    </div>

                    <p className="font-bold text-gray-800">
                      Upload a photo
                    </p>

                    <p className="text-sm text-gray-500 mt-2">
                      Show the issue clearly
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      JPG, PNG or WEBP
                    </p>

                    <div className="mt-5 inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl font-semibold">

                      <Upload size={18} />

                      Choose Image

                    </div>

                  </div>

                  <input
                    id="issue-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                </label>

              ) : (

                <div className="relative border border-gray-300 rounded-xl overflow-hidden">

                  <img
                    src={imagePreview}
                    alt="Issue preview"
                    className="w-full max-h-[450px] object-cover"
                  />

                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition"
                    title="Remove image"
                  >
                    <X size={20} />
                  </button>

                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white px-4 py-3 flex items-center gap-2">

                    <ImageIcon size={18} />

                    <span className="text-sm truncate">
                      {selectedFile?.name}
                    </span>

                  </div>

                </div>

              )}

            </section>

            {/* =================================================
                3. REVIEW
            ================================================== */}

            <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="font-bold text-blue-700">
                    3
                  </span>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Review
                  </h2>

                  <p className="text-sm text-gray-500">
                    Check your report before submitting.
                  </p>
                </div>

              </div>

              {/* REVIEW DETAILS */}

              <div className="space-y-4">

                {/* TITLE */}

                <div className="bg-gray-50 rounded-xl p-4">

                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Issue
                  </p>

                  <p className="font-bold text-gray-900 mt-1">
                    {formData.title || 'Issue title will appear here'}
                  </p>

                </div>

                {/* CATEGORY */}

                <div className="bg-gray-50 rounded-xl p-4">

                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Category
                  </p>

                  <p className="font-semibold text-gray-900 mt-1">
                    {formData.category || 'No category selected'}
                  </p>

                </div>

                {/* DESCRIPTION */}

                <div className="bg-gray-50 rounded-xl p-4">

                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Description
                  </p>

                  <p className="text-gray-700 mt-1 whitespace-pre-wrap">
                    {formData.description || 'No description added yet'}
                  </p>

                </div>

                {/* LOCATION */}

                <div className="bg-gray-50 rounded-xl p-4">

                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Location
                  </p>

                  <div className="flex items-center gap-2 mt-1">

                    <MapPin
                      size={18}
                      className="text-blue-600"
                    />

                    <p className="font-semibold text-gray-900">
                      {formData.area || 'Nankana Sahib'}
                    </p>

                  </div>

                </div>

                {/* PHOTO STATUS */}

                <div className="bg-gray-50 rounded-xl p-4">

                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Photo
                  </p>

                  <div className="flex items-center gap-2 mt-1">

                    {imagePreview ? (
                      <>
                        <CheckCircle
                          size={18}
                          className="text-green-600"
                        />

                        <p className="font-semibold text-green-700">
                          Photo attached
                        </p>
                      </>
                    ) : (
                      <>
                        <Camera
                          size={18}
                          className="text-gray-400"
                        />

                        <p className="text-gray-500">
                          No photo attached
                        </p>
                      </>
                    )}

                  </div>

                </div>

              </div>

              {/* NOTICE */}

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-5">

                <p className="text-sm text-blue-800">
                  Once submitted, this issue will appear in the COMFIX
                  community feed. Residents can then support the issue
                  through community voting.
                </p>

              </div>

              {/* SUBMIT */}

              <button
                type="submit"
                className="w-full mt-5 px-6 py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
              >

                <CheckCircle size={22} />

                Submit Issue

              </button>

            </section>

          </div>

        </div>

      </form>

    </div>
  );
};

export default ReportIssue;