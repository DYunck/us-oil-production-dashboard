import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LineChart, Line, Legend, PieChart, Pie } from 'recharts';

const OilProductionMap = () => {
  const [selectedState, setSelectedState] = useState(null);
  const [viewMode, setViewMode] = useState('map');
  const [showComparison, setShowComparison] = useState(false);

  // Current WTI price
  const currentWTIPrice = 68.50; // December 2024
  const avg2024WTIPrice = 77;

  const stateData2024 = [
    { 
      name: 'Texas', 
      production: 5675, 
      prod2019: 5350, 
      color: '#8B0000',
      topCompanies: ['ExxonMobil (XTO Energy)', 'Occidental Petroleum', 'Chevron', 'Pioneer Natural Resources', 'Diamondback Energy'],
      region: 'Permian Basin (Midland & Delaware)',
      breakeven: 63,
      existingWellBreakeven: 35
    },
    { 
      name: 'New Mexico', 
      production: 2023, 
      prod2019: 930, 
      color: '#DC143C',
      topCompanies: ['Occidental Petroleum', 'Chevron', 'Concho Resources', 'EOG Resources', 'ConocoPhillips'],
      region: 'Permian Basin (Delaware)',
      breakeven: 64,
      existingWellBreakeven: 31
    },
    { 
      name: 'Offshore', 
      production: 1802, 
      prod2019: 1860, 
      color: '#DC143C',
      topCompanies: ['BP', 'Shell', 'Chevron', 'ExxonMobil', 'Equinor'],
      region: 'Gulf of Mexico',
      breakeven: 55,
      existingWellBreakeven: 40
    },
    { 
      name: 'North Dakota', 
      production: 1194, 
      prod2019: 1430, 
      color: '#DC143C',
      topCompanies: ['Continental Resources', 'Chord Energy', 'Hess', 'EOG Resources', 'Marathon Oil'],
      region: 'Bakken/Williston Basin',
      breakeven: 59,
      existingWellBreakeven: 42
    },
    { 
      name: 'Colorado', 
      production: 465, 
      prod2019: 480, 
      color: '#CD5C5C',
      topCompanies: ['Occidental Petroleum', 'PDC Energy', 'Civitas Resources'],
      region: 'Denver-Julesburg Basin',
      breakeven: 65,
      existingWellBreakeven: 45
    },
    { 
      name: 'Alaska', 
      production: 421, 
      prod2019: 445, 
      color: '#FFB6C1',
      topCompanies: ['ConocoPhillips', 'Hilcorp', 'ExxonMobil'],
      region: 'North Slope, Prudhoe Bay',
      breakeven: 52,
      existingWellBreakeven: 38
    },
    { 
      name: 'Oklahoma', 
      production: 399, 
      prod2019: 510, 
      color: '#FFB6C1',
      topCompanies: ['Continental Resources', 'Devon Energy', 'Marathon Oil'],
      region: 'Anadarko Basin',
      breakeven: 62,
      existingWellBreakeven: 43
    },
    { 
      name: 'California', 
      production: 300, 
      prod2019: 425, 
      color: '#FFB6C1',
      topCompanies: ['Chevron', 'California Resources Corp', 'Aera Energy'],
      region: 'San Joaquin Valley',
      breakeven: 68,
      existingWellBreakeven: 50
    },
    { 
      name: 'Wyoming', 
      production: 292, 
      prod2019: 275, 
      color: '#FFB6C1',
      topCompanies: ['Occidental Petroleum', 'Devon Energy'],
      region: 'Powder River Basin',
      breakeven: 60,
      existingWellBreakeven: 44
    },
    { name: 'Utah', production: 183, prod2019: 110, color: '#FFB6C1', topCompanies: ['Various small operators'], region: 'Uinta Basin', breakeven: 63, existingWellBreakeven: 46 },
    { name: 'Ohio', production: 100, prod2019: 95, color: '#FFB6C1', topCompanies: ['Ascent Resources', 'Gulfport Energy'], region: 'Utica Shale', breakeven: 66, existingWellBreakeven: 48 },
    { name: 'Louisiana', production: 83, prod2019: 110, color: '#FFB6C1', topCompanies: ['Shell', 'Chevron', 'ExxonMobil'], region: 'Haynesville Shale', breakeven: 58, existingWellBreakeven: 41 },
    { name: 'Montana', production: 73, prod2019: 80, color: '#FFB6C1', topCompanies: ['Continental Resources', 'Kraken Operating'], region: 'Bakken', breakeven: 59, existingWellBreakeven: 42 },
    { name: 'Kansas', production: 73, prod2019: 95, color: '#FFB6C1', topCompanies: ['Various independent operators'], region: 'Hugoton Field', breakeven: 64, existingWellBreakeven: 47 },
    { name: 'West Virginia', production: 37, prod2019: 20, color: '#FFB6C1', topCompanies: ['EQT', 'Antero Resources'], region: 'Marcellus/Utica', breakeven: 67, existingWellBreakeven: 49 },
    { name: 'Mississippi', production: 33, prod2019: 50, color: '#FFB6C1', topCompanies: ['Denbury Resources', 'Various operators'], region: 'Mississippi Interior Salt Basin', breakeven: 70, existingWellBreakeven: 52 },
    { name: 'Michigan', production: 12, prod2019: 10, color: '#FFB6C1', topCompanies: ['Various small operators'], region: 'Michigan Basin', breakeven: 72, existingWellBreakeven: 54 },
    { name: 'Pennsylvania', production: 12, prod2019: 8, color: '#FFB6C1', topCompanies: ['Range Resources', 'EQT'], region: 'Marcellus Shale', breakeven: 67, existingWellBreakeven: 50 },
    { name: 'Arkansas', production: 11, prod2019: 12, color: '#FFB6C1', topCompanies: ['Murphy Oil', 'Various operators'], region: 'Fayetteville Shale', breakeven: 69, existingWellBreakeven: 51 },
    { name: 'Alabama', production: 9, prod2019: 11, color: '#FFB6C1', topCompanies: ['Various small operators'], region: 'Black Warrior Basin', breakeven: 71, existingWellBreakeven: 53 },
    { name: 'Kentucky', production: 6, prod2019: 7, color: '#FFB6C1', topCompanies: ['Various small operators'], region: 'Eastern Kentucky Field', breakeven: 73, existingWellBreakeven: 55 },
    { name: 'Nebraska', production: 4, prod2019: 3, color: '#FFB6C1', topCompanies: ['Various small operators'], region: 'Various fields', breakeven: 74, existingWellBreakeven: 56 },
    { name: 'Indiana', production: 4, prod2019: 3, color: '#FFB6C1', topCompanies: ['Various small operators'], region: 'Illinois Basin', breakeven: 74, existingWellBreakeven: 56 },
    { name: 'South Dakota', production: 2, prod2019: 2, color: '#FFB6C1', topCompanies: ['Various small operators'], region: 'Williston Basin', breakeven: 75, existingWellBreakeven: 57 },
    { name: 'Florida', production: 2, prod2019: 2, color: '#FFB6C1', topCompanies: ['Various small operators'], region: 'Sunniland Trend', breakeven: 76, existingWellBreakeven: 58 },
    { name: 'Illinois', production: 19, prod2019: 15, color: '#FFB6C1', topCompanies: ['Various small operators'], region: 'Illinois Basin', breakeven: 74, existingWellBreakeven: 56 },
    { name: 'New York', production: 1, prod2019: 0.3, color: '#FFB6C1', topCompanies: ['Various small operators'], region: 'Allegheny Plateau', breakeven: 75, existingWellBreakeven: 57 }
  ];

  const oilUsesData = [
    { name: 'Gasoline', value: 45, gallons: 20, color: '#FF6B6B' },
    { name: 'Diesel/Heating Oil', value: 25, gallons: 11, color: '#4ECDC4' },
    { name: 'Jet Fuel', value: 9, gallons: 4, color: '#45B7D1' },
    { name: 'Kerosene', value: 4, gallons: 2, color: '#FFA07A' },
    { name: 'HGL/Petrochemicals', value: 4, gallons: 2, color: '#98D8C8' },
    { name: 'Other Products', value: 13, gallons: 6, color: '#C7CEEA' }
  ];

  const totalProduction2024 = 13235;
  const totalProduction2019 = 12307;
  const projectedProduction2025 = 13500;

  const historicalData = [
    { year: '2019', production: 12307 },
    { year: '2020', production: 11283 },
    { year: '2021', production: 11185 },
    { year: '2022', production: 11879 },
    { year: '2023', production: 12900 },
    { year: '2024', production: 13235 },
    { year: '2025*', production: 13500 }
  ];

  const sortedData = [...stateData2024].sort((a, b) => b.production - a.production);

  // Calculate profitability
  const profitabilityData = sortedData.map(state => ({
    ...state,
    profitPerBarrel: currentWTIPrice - state.breakeven,
    existingProfitPerBarrel: currentWTIPrice - state.existingWellBreakeven,
    avgProfitPerBarrel: avg2024WTIPrice - state.breakeven,
    dailyProfit: ((currentWTIPrice - state.breakeven) * state.production * 1000) / 1000000, // In millions
    isProfitable: currentWTIPrice > state.breakeven
  })).filter(state => state.production > 50); // Only show major producers

  const getGrowthPercentage = (current, old) => {
    return (((current - old) / old) * 100).toFixed(1);
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-amber-50 to-orange-50 p-6 overflow-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect fill='%23654321' x='20' y='35' width='4' height='20'/%3E%3Cpolygon fill='%23654321' points='28,25 36,20 36,30 28,35'/%3E%3Crect fill='%23333' x='26' y='18' width='12' height='25'/%3E%3Cpolygon fill='%23666' points='36,20 42,16 42,28 36,30'/%3E%3Ccircle fill='%23444' cx='40' cy='24' r='3'/%3E%3C/svg%3E" alt="Oil Derrick" className="w-16 h-16" />
            <h1 className="text-5xl font-bold text-gray-800">U.S. OIL PRODUCTION</h1>
          </div>
          <p className="text-xl text-gray-600 mb-2">BY STATE</p>
          
          {/* Production Stats */}
          <div className="flex justify-center gap-4 mb-4 flex-wrap">
            <div className="bg-gradient-to-r from-red-600 to-red-800 text-white px-8 py-3 rounded-lg shadow-lg">
              <span className="text-xs uppercase tracking-wider">2024 Production</span>
              <div className="text-4xl font-bold mt-1">{totalProduction2024.toLocaleString()}</div>
              <div className="text-xs">thousand barrels/day</div>
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-3 rounded-lg shadow-lg">
              <span className="text-xs uppercase tracking-wider">Current WTI Price</span>
              <div className="text-4xl font-bold mt-1">${currentWTIPrice.toFixed(2)}</div>
              <div className="text-xs">per barrel (Dec 2024)</div>
            </div>
            <div className="bg-gradient-to-r from-green-600 to-green-800 text-white px-8 py-3 rounded-lg shadow-lg">
              <span className="text-xs uppercase tracking-wider">2024 Avg Price</span>
              <div className="text-4xl font-bold mt-1">${avg2024WTIPrice}</div>
              <div className="text-xs">per barrel</div>
            </div>
          </div>

          <div className="text-sm text-gray-500 italic">
            📅 Data as of December 2024 | WTI prices updated daily
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex justify-center gap-3 mb-6 flex-wrap">
          <button
            onClick={() => setViewMode('map')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              viewMode === 'map'
                ? 'bg-red-700 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            📊 State Rankings
          </button>
          <button
            onClick={() => setViewMode('profitability')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              viewMode === 'profitability'
                ? 'bg-red-700 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            💰 Profitability
          </button>
          <button
            onClick={() => setViewMode('chart')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              viewMode === 'chart'
                ? 'bg-red-700 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            📈 Bar Chart
          </button>
          <button
            onClick={() => setViewMode('trends')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              viewMode === 'trends'
                ? 'bg-red-700 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            📉 Historical Trends
          </button>
          <button
            onClick={() => setViewMode('uses')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              viewMode === 'uses'
                ? 'bg-red-700 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            ⛽ Oil Uses
          </button>
        </div>

        {/* Content Area */}
        {viewMode === 'profitability' ? (
          <div className="space-y-6">
            {/* Price Alert */}
            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">⚠️ Current Market Conditions</h2>
              <p className="text-gray-700 mb-2">
                <strong>Current WTI Price:</strong> ${currentWTIPrice}/barrel (December 2024)
              </p>
              <p className="text-gray-700 mb-2">
                <strong>2024 Average:</strong> ${avg2024WTIPrice}/barrel
              </p>
              <p className="text-gray-700">
                Most U.S. oil producers remain profitable at current prices, especially in the low-cost Permian Basin.
                The Permian's breakeven prices average $62-64/barrel for new wells and $31-38/barrel for existing wells.
              </p>
            </div>

            {/* Profitability Table */}
            <div className="bg-white rounded-xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Profitability by State/Region
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-3 text-left font-bold">State/Region</th>
                      <th className="p-3 text-center font-bold">Production<br/>(k bbl/day)</th>
                      <th className="p-3 text-center font-bold">Breakeven<br/>(New Wells)</th>
                      <th className="p-3 text-center font-bold">Breakeven<br/>(Existing)</th>
                      <th className="p-3 text-center font-bold">Profit/Barrel<br/>(Current)</th>
                      <th className="p-3 text-center font-bold">Daily Profit<br/>(Millions)</th>
                      <th className="p-3 text-center font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profitabilityData.slice(0, 15).map((state, idx) => (
                      <tr key={idx} className={`border-b ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                        <td className="p-3 font-semibold">{state.name}</td>
                        <td className="p-3 text-center">{state.production.toLocaleString()}</td>
                        <td className="p-3 text-center">${state.breakeven}</td>
                        <td className="p-3 text-center text-green-600 font-semibold">${state.existingWellBreakeven}</td>
                        <td className={`p-3 text-center font-bold ${state.isProfitable ? 'text-green-600' : 'text-red-600'}`}>
                          ${state.profitPerBarrel.toFixed(2)}
                        </td>
                        <td className={`p-3 text-center font-bold ${state.dailyProfit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          ${state.dailyProfit.toFixed(1)}M
                        </td>
                        <td className="p-3 text-center">
                          {state.isProfitable ? 
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">✓ Profitable</span> : 
                            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-bold">✗ Loss</span>
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Profit Leaders */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {profitabilityData.slice(0, 3).map((state, idx) => (
                <div key={idx} className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-300 shadow-lg">
                  <div className="text-4xl mb-3">
                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{state.name}</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Daily Profit:</strong> <span className="text-green-700 font-bold text-lg">${state.dailyProfit.toFixed(1)}M</span></p>
                    <p><strong>Profit/Barrel:</strong> ${state.profitPerBarrel.toFixed(2)}</p>
                    <p><strong>Production:</strong> {state.production.toLocaleString()} k bbl/day</p>
                    <p><strong>Breakeven:</strong> ${state.breakeven}/bbl</p>
                    <div className="mt-3 pt-3 border-t border-green-300">
                      <p className="text-xs text-gray-600"><strong>Top Operator:</strong> {state.topCompanies[0]}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Regional Cost Comparison */}
            <div className="bg-white rounded-xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Breakeven Costs by Region
              </h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={profitabilityData.slice(0, 10)} margin={{ top: 5, right: 30, left: 20, bottom: 100 }}>
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis label={{ value: 'Price ($/barrel)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="breakeven" fill="#DC143C" name="New Well Breakeven" />
                  <Bar dataKey="existingWellBreakeven" fill="#90EE90" name="Existing Well Breakeven" />
                  <Line type="monotone" dataKey={() => currentWTIPrice} stroke="#000" strokeWidth={3} name="Current WTI Price" dot={false} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : viewMode === 'map' ? (
          <div className="bg-white rounded-xl shadow-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedData.map((state, index) => {
                const percentage = ((state.production / totalProduction2024) * 100).toFixed(1);
                const growth = getGrowthPercentage(state.production, state.prod2019);
                const isTop3 = index < 3;
                const isGrowing = state.production > state.prod2019;
                const profitPerBarrel = currentWTIPrice - state.breakeven;
                
                return (
                  <div
                    key={state.name}
                    onClick={() => setSelectedState(selectedState === state.name ? null : state.name)}
                    className={`cursor-pointer p-4 rounded-lg transition-all transform hover:scale-105 ${
                      selectedState === state.name
                        ? 'ring-4 ring-red-500 shadow-xl'
                        : 'hover:shadow-lg'
                    } ${
                      isTop3 ? 'bg-gradient-to-br from-red-700 to-red-900 text-white' : 'bg-gradient-to-br from-red-50 to-red-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm font-bold ${isTop3 ? 'text-red-200' : 'text-gray-500'}`}>
                        #{index + 1}
                      </span>
                      {isTop3 && <span className="text-2xl">🏆</span>}
                    </div>
                    <h3 className={`text-xl font-bold mb-2 ${isTop3 ? 'text-white' : 'text-gray-800'}`}>
                      {state.name}
                    </h3>
                    <div className={`text-3xl font-bold mb-1 ${isTop3 ? 'text-white' : 'text-red-700'}`}>
                      {state.production.toLocaleString()}
                    </div>
                    <div className={`text-sm ${isTop3 ? 'text-red-200' : 'text-gray-600'}`}>
                      thousand barrels/day
                    </div>
                    <div className={`mt-2 text-sm font-semibold ${isTop3 ? 'text-red-200' : 'text-red-600'}`}>
                      {percentage}% of total
                    </div>
                    
                    {/* Profitability Indicator */}
                    <div className={`mt-3 pt-3 border-t ${isTop3 ? 'border-red-500' : 'border-red-300'}`}>
                      <div className={`text-xs font-semibold mb-1 ${isTop3 ? 'text-red-200' : 'text-gray-600'}`}>
                        💰 Profit: ${profitPerBarrel.toFixed(2)}/barrel
                      </div>
                      <div className={`text-xs ${isTop3 ? 'text-red-200' : 'text-gray-600'}`}>
                        Breakeven: ${state.breakeven}/bbl
                      </div>
                    </div>
                    
                    {/* Region & Companies Info */}
                    {state.region && (
                      <div className={`mt-3 pt-3 border-t ${isTop3 ? 'border-red-500' : 'border-red-300'}`}>
                        <div className={`text-xs font-semibold mb-1 ${isTop3 ? 'text-red-200' : 'text-gray-600'}`}>
                          📍 {state.region}
                        </div>
                        {state.topCompanies && state.topCompanies.length > 0 && (
                          <div className={`text-xs ${isTop3 ? 'text-red-100' : 'text-gray-500'} mt-2`}>
                            <div className="font-semibold mb-1">Top Operators:</div>
                            <div className="space-y-0.5">
                              {state.topCompanies.slice(0, 3).map((company, idx) => (
                                <div key={idx}>• {company}</div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : viewMode === 'chart' ? (
          <div className="bg-white rounded-xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Oil Production by State (2024)
            </h2>
            <ResponsiveContainer width="100%" height={700}>
              <BarChart data={sortedData.slice(0, 15)} margin={{ top: 5, right: 30, left: 20, bottom: 120 }}>
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  interval={0}
                />
                <YAxis 
                  label={{ value: 'Thousand Barrels/Day', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      const percentage = ((data.production / totalProduction2024) * 100).toFixed(1);
                      const growth = getGrowthPercentage(data.production, data.prod2019);
                      const profit = currentWTIPrice - data.breakeven;
                      return (
                        <div className="bg-white p-4 rounded-lg shadow-xl border-2 border-red-500 max-w-xs">
                          <p className="font-bold text-lg text-gray-800">{data.name}</p>
                          <p className="text-red-700 font-semibold">
                            2024: {data.production.toLocaleString()} thousand barrels/day
                          </p>
                          <p className="text-gray-600 text-sm">{percentage}% of total</p>
                          <p className="text-green-600 text-sm mt-2 font-semibold">
                            💰 Profit: ${profit.toFixed(2)}/barrel
                          </p>
                          <p className="text-blue-600 text-sm">
                            Breakeven: ${data.breakeven}/barrel
                          </p>
                          {data.region && (
                            <p className="text-xs text-gray-500 mt-2">📍 {data.region}</p>
                          )}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="production" radius={[8, 8, 0, 0]}>
                  {sortedData.slice(0, 15).map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index < 3 ? '#8B0000' : index < 8 ? '#DC143C' : '#FFB6C1'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="text-center text-sm text-gray-600 mt-4">
              Showing top 15 producing states and offshore regions
            </div>
          </div>
        ) : viewMode === 'trends' ? (
          <div className="bg-white rounded-xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              U.S. Oil Production: 2019-2025
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={historicalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="year" />
                <YAxis label={{ value: 'Thousand Barrels/Day', angle: -90, position: 'insideLeft' }} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-4 rounded-lg shadow-xl border-2 border-red-500">
                          <p className="font-bold text-lg text-gray-800">{data.year}</p>
                          <p className="text-red-700 font-semibold">
                            {data.production.toLocaleString()} thousand barrels/day
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="production" 
                  stroke="#8B0000" 
                  strokeWidth={3}
                  dot={{ fill: '#8B0000', r: 6 }}
                  name="Production (thousand bbl/day)"
                />
              </LineChart>
            </ResponsiveContainer>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Lowest (2021)</div>
                <div className="text-2xl font-bold text-red-700">11,185</div>
                <div className="text-xs text-gray-500">thousand bbl/day</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Current (2024)</div>
                <div className="text-2xl font-bold text-green-700">13,235</div>
                <div className="text-xs text-gray-500">thousand bbl/day</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Projected (2025)</div>
                <div className="text-2xl font-bold text-blue-700">13,500</div>
                <div className="text-xs text-gray-500">thousand bbl/day</div>
              </div>
            </div>

            <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> The dip in 2020-2021 was primarily due to COVID-19 pandemic impacts on demand and production. 
                The strong recovery and record production in 2024 was driven largely by the Permian Basin.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              What One Barrel of Crude Oil Produces
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">Product Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={oilUsesData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {oilUsesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="text-center text-sm text-gray-600 mt-4">
                  From a 42-gallon barrel of crude oil, refineries produce approximately <strong>45 gallons</strong> of petroleum products (volume increase due to refining process)
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Product Breakdown</h3>
                <div className="space-y-4">
                  {oilUsesData.map((product, idx) => (
                    <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-gray-800">{product.name}</span>
                        <span className="text-2xl font-bold" style={{ color: product.color }}>
                          {product.value}%
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        ≈ {product.gallons} gallons per barrel
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className="h-2 rounded-full transition-all"
                          style={{ width: `${product.value}%`, backgroundColor: product.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg border-2 border-red-200">
                <div className="text-4xl mb-3">⛽</div>
                <h4 className="font-bold text-lg text-gray-800 mb-2">Gasoline (45%)</h4>
                <p className="text-sm text-gray-700">
                  Powers passenger vehicles, boats, small engines, and powertools. The largest petroleum product by volume in the U.S.
                </p>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-lg border-2 border-teal-200">
                <div className="text-4xl mb-3">🚛</div>
                <h4 className="font-bold text-lg text-gray-800 mb-2">Diesel & Heating Oil (25%)</h4>
                <p className="text-sm text-gray-700">
                  Fuels trucks, buses, trains, construction equipment, and generators. Also used for heating homes and buildings.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border-2 border-blue-200">
                <div className="text-4xl mb-3">✈️</div>
                <h4 className="font-bold text-lg text-gray-800 mb-2">Jet Fuel (9%)</h4>
                <p className="text-sm text-gray-700">
                  Highly refined kerosene that powers commercial and military aircraft. Essential for global aviation.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border-2 border-orange-200">
                <div className="text-4xl mb-3">💡</div>
                <h4 className="font-bold text-lg text-gray-800 mb-2">Kerosene (4%)</h4>
                <p className="text-sm text-gray-700">
                  Used for heating, lighting, and as a component in jet fuel. Still important in rural and developing areas.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border-2 border-purple-200">
                <div className="text-4xl mb-3">🧪</div>
                <h4 className="font-bold text-lg text-gray-800 mb-2">Petrochemicals (4%)</h4>
                <p className="text-sm text-gray-700">
                  Raw materials for plastics, synthetic rubber, fertilizers, medicines, cosmetics, and thousands of everyday products.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg border-2 border-gray-200">
                <div className="text-4xl mb-3">🏭</div>
                <h4 className="font-bold text-lg text-gray-800 mb-2">Other Products (13%)</h4>
                <p className="text-sm text-gray-700">
                  Includes asphalt for roads, lubricating oils, waxes, petroleum coke, and various industrial products.
                </p>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">🔬 Did You Know?</h3>
              <div className="space-y-2 text-gray-700">
                <p>• A single 42-gallon barrel of crude oil produces about <strong>20 gallons of gasoline</strong> after refining</p>
                <p>• The refining process actually <strong>increases volume</strong> - producing ~45 gallons of products from 42 gallons of crude</p>
                <p>• Over <strong>6,000 everyday products</strong> are made from petroleum, including plastics, cosmetics, and synthetic fabrics</p>
                <p>• The U.S. consumes about <strong>20 million barrels of oil per day</strong>, making it the world's largest oil consumer</p>
                <p>• Transportation accounts for <strong>~70%</strong> of all petroleum consumed in the United States</p>
              </div>
            </div>
          </div>
        )}

        {/* Key Insights */}
        <div className="mt-8 bg-amber-100 border-2 border-amber-300 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">📌 Key Insights</h2>
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start gap-2">
              <span className="text-xl">🏆</span>
              <p>
                <strong>Texas</strong> leads both in production ({' '}
                <span className="text-red-700 font-bold">5,675</span> thousand barrels/day) and profitability, 
                generating approximately <strong>${((currentWTIPrice - 63) * 5675 / 1000).toFixed(1)} million/day</strong> in profit 
                at current prices with major operators like ExxonMobil, Occidental, and Chevron.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-xl">💰</span>
              <p>
                The <strong>Permian Basin</strong> (Texas & New Mexico) has the lowest breakeven costs at <strong>$31-38/barrel 
                for existing wells</strong>, making it the most profitable oil-producing region in the U.S. even when prices dip.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-xl">📈</span>
              <p>
                At the current WTI price of <strong>${currentWTIPrice}/barrel</strong>, all major U.S. oil-producing 
                regions remain profitable, with the Permian generating <strong>${(currentWTIPrice - 63).toFixed(2)}/barrel</strong> profit 
                on new wells and <strong>${(currentWTIPrice - 35).toFixed(2)}/barrel</strong> on existing wells.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-xl">🏢</span>
              <p>
                <strong>Offshore Gulf of Mexico</strong> production has relatively low breakeven costs at <strong>$40/barrel 
                for existing wells</strong>, making it highly profitable despite the higher initial development costs.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-xl">⛽</span>
              <p>
                Nearly <strong>half (45%)</strong> of every barrel of oil is refined into gasoline. Transportation fuels 
                (gasoline, diesel, jet fuel) account for about <strong>80%</strong> of all petroleum products.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-xl">🌎</span>
              <p>
                The U.S. produces <strong>13.2 million barrels/day</strong> but consumes <strong>20 million barrels/day</strong>, 
                requiring imports to meet domestic demand despite being the world's top producer.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          Source: U.S. Energy Information Administration (EIA), Bloomberg, Rystad Energy
          <br />
          WTI Price as of December 2024 | Breakeven costs are estimates and vary by operator
        </div>
      </div>
    </div>
  );
};

export default OilProductionMap;