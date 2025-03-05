import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="flex absolute top-0 left-0 z-50 bg-gray-200 w-[100vw] ">
      {/* Sidebar */}
      <div className="w-64 bg-gray-200 h-screen p-4">
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 mr-2 skeleton"></div>
          <div>
            <div className="w-32 h-6 skeleton"></div>
            <div className="w-24 h-4 mt-1 skeleton"></div>
          </div>
        </div>
        <nav>
          <ul>
            {[...Array(5)].map((_, index) => (
              <li key={index} className="mb-4">
                <div className="flex items-center text-gray-700 hover:text-gray-900">
                  <div className="w-5 h-5 mr-2 skeleton"></div>
                  <div className="w-20 h-4 skeleton"></div>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="text-2xl font-bold mb-8 skeleton w-40 h-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md border-dashed border-2 border-gray-300 text-center">
              <div className="w-24 h-24 mx-auto mb-4 skeleton"></div>
              <div className="text-lg font-semibold skeleton w-32 h-6 mx-auto"></div>
            </div>
          ))}
          <div className="bg-white p-6 rounded-lg shadow-md text-center col-span-1 md:col-span-2 lg:col-span-1">
            <div className="w-24 h-24 rounded-full mx-auto mb-4 skeleton"></div>
            <div className="text-lg font-semibold skeleton w-32 h-6 mx-auto"></div>
            <div className="text-gray-500 skeleton w-24 h-4 mx-auto mt-2"></div>
            <div className="mt-4 text-gray-600 skeleton w-64 h-4 mx-auto"></div>
            <div className="mt-4 font-semibold skeleton w-32 h-6 mx-auto"></div>
            <div className="text-gray-500 skeleton w-24 h-4 mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;

const style = document.createElement("style");
style.innerHTML = `
  .skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
  }
  @keyframes skeleton-loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;
document.head.appendChild(style);
