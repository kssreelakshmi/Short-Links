import React from 'react';

const AllLinks = () => {
    return (
        <>
            <div className="mt-4 flex flex-col px-6">
                {/* Header */}
                <div className="font-mono text-4xl font-extrabold text-blue-800 text-center mb-8">
                    <h1>All Links</h1>
                </div>

                {/* Table */}
                <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
                    <table className="table-auto w-full text-left">
                        {/* Table Head */}
                        <thead className="bg-gray-100 border-b border-gray-300">
                            <tr>
                                <th className="px-4 py-3">
                                    <input type="checkbox" className="checkbox" />
                                </th>
                                <th className="px-4 py-3 text-gray-700 font-semibold">Actual URL</th>
                                <th className="px-4 py-3 text-gray-700 font-semibold">Shortened URL</th>
                                <th className="px-4 py-3 text-gray-700 font-semibold">Validity</th>
                                <th className="px-4 py-3 text-gray-700 font-semibold">Actions</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {/* Example Row */}
                            <tr className="hover:bg-gray-50">
                                <td className="px-4 py-3">
                                    <input type="checkbox" className="checkbox" />
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <span className="truncate">https://example.com/long-url</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-blue-600">
                                    <a href="#" className="truncate underline">https://short.ly/123</a>
                                </td>
                                <td className="px-4 py-3">30 days</td>
                                <td className="px-4 py-3">
                                    <button className="bg-blue-600 text-white px-3 py-1 text-sm rounded hover:bg-blue-700 transition">
                                        Details
                                    </button>
                                </td>
                            </tr>
                            {/* Additional Rows can be added here */}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default AllLinks;
