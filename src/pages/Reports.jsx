
import React from 'react';
import { ChevronRight, FileText, Download, Share, BarChart, CheckSquare, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

const Reports = () => {
  return (
    <div className="bg-[#F5F7FA] min-h-[calc(100vh-80px)]">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Breadcrumb */}
        <div id="breadcrumb" className="flex items-center space-x-2 mb-8 text-sm">
          <Link to="/" className="text-[#1A73E8] cursor-pointer">Dashboard</Link>
          <ChevronRight className="text-gray-400 w-4 h-4" />
          <span className="text-gray-600">Reports</span>
        </div>

        {/* Report Generator Section */}
        <div id="report-generator" className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
            <h2 className="text-xl font-bold">Generate Report</h2>
            <button className="bg-[#1A73E8] text-white px-6 py-2 rounded-full text-sm flex items-center w-full sm:w-auto justify-center sm:justify-start">
              <FileText className="w-4 h-4 mr-2" />Export Report
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Report Type</label>
              <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
                <option>Student Progress</option>
                <option>Attendance Summary</option>
                <option>Program Performance</option>
                <option>Ministry Submission</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Grade Level</label>
              <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
                <option>All Grades</option>
                <option>Grade 6-8</option>
                <option>Grade 9-10</option>
                <option>Grade 11-12</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Date Range</label>
              <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
                <option>Last 30 days</option>
                <option>Last Quarter</option>
                <option>Last Semester</option>
                <option>Custom Range</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Format</label>
              <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
                <option>PDF Report</option>
                <option>Excel Sheet</option>
                <option>CSV File</option>
              </select>
            </div>
          </div>
        </div>

        {/* Recent Reports */}
        <div id="recent-reports" className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 mb-6 sm:mb-8">
          <h2 className="text-xl font-bold mb-6">Recent Reports</h2>
          <div className="overflow-x-auto -mx-5 sm:-mx-6 px-5 sm:px-6">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="text-left bg-gray-50">
                  <th className="px-4 sm:px-6 py-3 text-sm font-medium text-gray-500 rounded-l-xl">Report Name</th>
                  <th className="px-4 sm:px-6 py-3 text-sm font-medium text-gray-500">Generated Date</th>
                  <th className="px-4 sm:px-6 py-3 text-sm font-medium text-gray-500">Type</th>
                  <th className="px-4 sm:px-6 py-3 text-sm font-medium text-gray-500">Status</th>
                  <th className="px-4 sm:px-6 py-3 text-sm font-medium text-gray-500 rounded-r-xl">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <FileText className="text-red-500 w-4 h-4" />
                      <span className="whitespace-nowrap">Q1_Progress_Report_2025</span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm text-gray-500 whitespace-nowrap">May 14, 2025</td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm whitespace-nowrap">Ministry Report</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm whitespace-nowrap">Submitted</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex space-x-3">
                      <button className="text-[#1A73E8] hover:text-blue-700">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Share className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <FileText className="text-green-600 w-4 h-4" />
                      <span className="whitespace-nowrap">Attendance_Summary_May2025</span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm text-gray-500 whitespace-nowrap">May 12, 2025</td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm whitespace-nowrap">Attendance</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm whitespace-nowrap">Draft</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex space-x-3">
                      <button className="text-[#1A73E8] hover:text-blue-700">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Share className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Report Templates */}
        <div id="report-templates" className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-6">Report Templates</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="p-4 border border-gray-200 rounded-xl hover:border-[#1A73E8] cursor-pointer transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <BarChart className="text-[#1A73E8] w-5 h-5" />
                </div>
                <Lightbulb className="text-gray-400 w-5 h-5" />
              </div>
              <h3 className="font-semibold mb-2">Progress Report</h3>
              <p className="text-sm text-gray-500">Comprehensive student progress tracking with skill development metrics</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-xl hover:border-[#1A73E8] cursor-pointer transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <CheckSquare className="text-purple-600 w-5 h-5" />
                </div>
                <Lightbulb className="text-gray-400 w-5 h-5" />
              </div>
              <h3 className="font-semibold mb-2">Attendance Summary</h3>
              <p className="text-sm text-gray-500">Detailed attendance records and participation analytics</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-xl hover:border-[#1A73E8] cursor-pointer transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Lightbulb className="text-green-600 w-5 h-5" />
                </div>
                <Lightbulb className="text-gray-400 w-5 h-5" />
              </div>
              <h3 className="font-semibold mb-2">Ministry Format</h3>
              <p className="text-sm text-gray-500">Standardized report format for Ministry of Education submissions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
