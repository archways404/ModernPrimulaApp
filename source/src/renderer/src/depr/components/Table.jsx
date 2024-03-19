/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

const DataTable = ({ data }) => {
  return (
    <table className="min-w-full leading-normal">
      <thead>
        <tr>
          {Object.keys(data[0]).map((key, index) => (
            <th
              key={index}
              className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              {key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            {Object.values(row).map((val, i) => (
              <td key={i} className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{val}</p>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default DataTable
