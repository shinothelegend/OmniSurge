"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  FileBarChart,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Search,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Activity,
  Layers,
  Zap,
} from "lucide-react";

export default function AnalyticsDashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState<"overview" | "reports" | "pools" | "settings">("overview");
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<"timestamp" | "volume" | "fee" | "latency">("timestamp");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [workspace, setWorkspace] = useState("OmniSurge Mainnet Vault");

  // 4-Up KPI Data
  const kpis = [
    {
      id: "volume",
      label: "Total Volume Protected",
      value: "$18,492,400",
      delta: "+14.2%",
      deltaType: "up",
      period: "vs last month",
    },
    {
      id: "fees",
      label: "JIT LP Fees Harvested",
      value: "$55,477.20",
      delta: "+22.8%",
      deltaType: "up",
      period: "vs last month",
    },
    {
      id: "latency",
      label: "Mean Reactive Latency",
      value: "1.142s",
      delta: "-6.4%",
      deltaType: "down", // lower is better for latency!
      period: "faster execution",
    },
    {
      id: "success",
      label: "Atomic Rebalance Rate",
      value: "99.84%",
      delta: "+0.12%",
      deltaType: "up",
      period: "3,482 executions",
    },
  ];

  // Full-width Time Series Chart Data (SVG-based modern minimal line chart)
  const chartDataPoints: Record<"7d" | "30d" | "90d", { date: string; value: number; fees: number }[]> = {
    "7d": [
      { date: "Nov 01", value: 1.2, fees: 3600 },
      { date: "Nov 02", value: 1.6, fees: 4800 },
      { date: "Nov 03", value: 1.4, fees: 4200 },
      { date: "Nov 04", value: 2.1, fees: 6300 },
      { date: "Nov 05", value: 2.8, fees: 8400 },
      { date: "Nov 06", value: 2.4, fees: 7200 },
      { date: "Nov 07", value: 3.2, fees: 9600 },
    ],
    "30d": [
      { date: "Oct 08", value: 0.8, fees: 2400 },
      { date: "Oct 12", value: 1.1, fees: 3300 },
      { date: "Oct 16", value: 1.5, fees: 4500 },
      { date: "Oct 20", value: 1.3, fees: 3900 },
      { date: "Oct 24", value: 1.9, fees: 5700 },
      { date: "Oct 28", value: 2.2, fees: 6600 },
      { date: "Nov 01", value: 2.6, fees: 7800 },
      { date: "Nov 05", value: 3.0, fees: 9000 },
      { date: "Nov 07", value: 3.5, fees: 10500 },
    ],
    "90d": [
      { date: "Aug", value: 0.4, fees: 1200 },
      { date: "Sep W1", value: 0.9, fees: 2700 },
      { date: "Sep W3", value: 1.4, fees: 4200 },
      { date: "Oct W1", value: 1.8, fees: 5400 },
      { date: "Oct W3", value: 2.4, fees: 7200 },
      { date: "Nov W1", value: 3.5, fees: 10500 },
    ],
  };

  const activePoints = chartDataPoints[timeRange];
  const maxVal = Math.max(...activePoints.map((p) => p.value));

  // Table Data
  const tableRows = [
    {
      id: "tx-8941",
      timestamp: "2 mins ago",
      pool: "WETH / USDC 0.05%",
      network: "Base Sepolia",
      networkBadge: "200ms",
      swapVolume: "$78,500",
      jitLiquidity: "$117,750",
      latency: "1.124s",
      feeHarvested: "+$235.50",
      status: "Settled",
    },
    {
      id: "tx-8940",
      timestamp: "5 mins ago",
      pool: "WETH / USDC 0.30%",
      network: "Unichain Sepolia",
      networkBadge: "1s",
      swapVolume: "$124,000",
      jitLiquidity: "$186,000",
      latency: "1.890s",
      feeHarvested: "+$558.00",
      status: "Settled",
    },
    {
      id: "tx-8939",
      timestamp: "12 mins ago",
      pool: "cbETH / WETH 0.01%",
      network: "Base Sepolia",
      networkBadge: "200ms",
      swapVolume: "$45,200",
      jitLiquidity: "$67,800",
      latency: "1.108s",
      feeHarvested: "+$45.20",
      status: "Settled",
    },
    {
      id: "tx-8938",
      timestamp: "18 mins ago",
      pool: "WBTC / USDC 0.05%",
      network: "Base Sepolia",
      networkBadge: "200ms",
      swapVolume: "$210,000",
      jitLiquidity: "$315,000",
      latency: "1.135s",
      feeHarvested: "+$105.00",
      status: "Settled",
    },
    {
      id: "tx-8937",
      timestamp: "25 mins ago",
      pool: "WETH / USDC 0.05%",
      network: "Unichain Sepolia",
      networkBadge: "1s",
      swapVolume: "$62,000",
      jitLiquidity: "$93,000",
      latency: "1.920s",
      feeHarvested: "+$186.00",
      status: "Settled",
    },
    {
      id: "tx-8936",
      timestamp: "32 mins ago",
      pool: "WETH / USDT 0.05%",
      network: "Base Sepolia",
      networkBadge: "200ms",
      swapVolume: "$94,500",
      jitLiquidity: "$141,750",
      latency: "1.119s",
      feeHarvested: "+$283.50",
      status: "Settled",
    },
  ];

  const filteredRows = tableRows.filter(
    (row) =>
      row.pool.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.network.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen w-full overflow-hidden bg-zinc-950 text-zinc-100 antialiased font-sans">
      {/* 1. Collapsible Left Sidebar */}
      <aside
        className={`flex flex-col border-r border-zinc-800 bg-zinc-900/90 transition-all duration-200 z-20 ${
          isSidebarCollapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Brand Area */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-zinc-800">
          {!isSidebarCollapsed && (
            <div className="flex items-center space-x-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm">
                OS
              </div>
              <div>
                <div className="text-sm font-bold tracking-tight text-white">OmniSurge</div>
                <div className="text-[11px] text-zinc-400">Institutional Analytics</div>
              </div>
            </div>
          )}

          {isSidebarCollapsed && (
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm">
              OS
            </div>
          )}

          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="rounded p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white transition"
            title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isSidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Sidebar Nav Items */}
        <nav className="flex-1 space-y-1 p-2">
          {[
            { id: "overview", label: "Overview", icon: LayoutDashboard },
            { id: "reports", label: "Reports", icon: FileBarChart },
            { id: "pools", label: "Pools & Pairs", icon: Users },
            { id: "settings", label: "Protocol Config", icon: Settings },
          ].map((item) => {
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id as any)}
                className={`flex w-full items-center rounded-lg px-3 py-2 text-xs font-medium transition ${
                  isActive
                    ? "bg-indigo-600/15 text-indigo-400 font-semibold border border-indigo-600/30"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {!isSidebarCollapsed && <span className="ml-3 truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Reactive Node Status (Bottom) */}
        {!isSidebarCollapsed && (
          <div className="m-3 rounded-lg border border-zinc-800 bg-zinc-950/60 p-3 text-xs">
            <div className="flex items-center justify-between text-[11px] text-zinc-400">
              <span>ReactVM Relayer</span>
              <span className="flex items-center text-emerald-400 font-semibold gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active
              </span>
            </div>
            <div className="mt-1 font-mono text-[10px] text-zinc-500 truncate">
              0x000000...fffFfF (Lasna)
            </div>
          </div>
        )}
      </aside>

      {/* 2. Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-900/60 px-6">
          <div className="flex items-center space-x-4">
            {/* Workspace Switcher */}
            <div className="relative">
              <button className="flex items-center space-x-2 rounded-lg border border-zinc-750 bg-zinc-800/80 px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-800 transition">
                <div className="h-2 w-2 rounded-full bg-indigo-500" />
                <span>{workspace}</span>
                <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
              </button>
            </div>

            {/* Global Search */}
            <div className="relative w-64 md:w-80">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
              <input
                type="text"
                placeholder="Search pools, TXs, addresses... (⌘K)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 py-1.5 pl-9 pr-3 text-xs text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* User Avatar Menu */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-zinc-400 border border-zinc-800 rounded-lg px-2.5 py-1 bg-zinc-950">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>Base 200ms / Uni 1s</span>
            </div>

            <div className="flex items-center space-x-2 border-l border-zinc-800 pl-3">
              <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white">
                MM
              </div>
              <div className="hidden md:block text-left">
                <div className="text-xs font-semibold text-white">Citadel Alpha</div>
                <div className="text-[10px] text-zinc-400">Institutional Pro</div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Body (Scrollable) */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Header Action Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">Protocol Liquidity Telemetry</h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Real-time performance analytics for autonomous cross-chain concentrated liquidity rebalancing.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition">
                <Filter className="h-3.5 w-3.5 text-zinc-400" />
                <span>Filter</span>
              </button>
              <button className="flex items-center space-x-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition">
                <Download className="h-3.5 w-3.5 text-zinc-400" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* 4-Up KPI Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map((kpi) => (
              <div
                key={kpi.id}
                className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-4 transition hover:border-zinc-700"
              >
                <div className="text-xs font-medium text-zinc-400">{kpi.label}</div>
                <div className="mt-2 text-2xl font-bold tracking-tight text-white">{kpi.value}</div>
                <div className="mt-2 flex items-center space-x-1.5">
                  <span
                    className={`inline-flex items-center rounded px-1.5 py-0.5 text-[11px] font-semibold ${
                      kpi.deltaType === "up"
                        ? "bg-emerald-950 text-emerald-400 border border-emerald-800/60"
                        : "bg-indigo-950 text-indigo-400 border border-indigo-800/60"
                    }`}
                  >
                    {kpi.deltaType === "up" ? (
                      <ArrowUpRight className="mr-0.5 h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="mr-0.5 h-3 w-3" />
                    )}
                    {kpi.delta}
                  </span>
                  <span className="text-[11px] text-zinc-500">{kpi.period}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Full-Width Time-Series Chart */}
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-sm font-semibold text-white">Daily Protected Volume & LP Yield</h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Concentrated capital dispatched via Reactive Network callbacks.
                </p>
              </div>

              {/* 7d / 30d / 90d Toggle */}
              <div className="flex items-center rounded-lg border border-zinc-800 bg-zinc-950 p-1">
                {(["7d", "30d", "90d"] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`rounded px-3 py-1 text-xs font-medium transition ${
                      timeRange === range
                        ? "bg-indigo-600 text-white font-semibold"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {range.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom SVG Line & Area Chart */}
            <div className="h-64 w-full">
              <svg className="h-full w-full overflow-visible" viewBox="0 0 800 240" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Grid lines */}
                {[0, 60, 120, 180, 240].map((y, i) => (
                  <line
                    key={i}
                    x1="0"
                    y1={y}
                    x2="800"
                    y2={y}
                    stroke="#27272a"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                ))}

                {/* Area Fill */}
                <path
                  d={`
                    M 0 240
                    ${activePoints
                      .map((p, i) => {
                        const x = (i / (activePoints.length - 1)) * 800;
                        const y = 220 - (p.value / maxVal) * 180;
                        return `L ${x} ${y}`;
                      })
                      .join(" ")}
                    L 800 240 Z
                  `}
                  fill="url(#chartGradient)"
                />

                {/* Main Curve Line */}
                <path
                  d={`
                    M 0 ${220 - (activePoints[0].value / maxVal) * 180}
                    ${activePoints
                      .map((p, i) => {
                        const x = (i / (activePoints.length - 1)) * 800;
                        const y = 220 - (p.value / maxVal) * 180;
                        return `L ${x} ${y}`;
                      })
                      .join(" ")}
                  `}
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="2.5"
                />

                {/* Data point dots */}
                {activePoints.map((p, i) => {
                  const x = (i / (activePoints.length - 1)) * 800;
                  const y = 220 - (p.value / maxVal) * 180;
                  return (
                    <g key={i}>
                      <circle cx={x} cy={y} r="4" fill="#6366f1" stroke="#09090b" strokeWidth="2" />
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* X-Axis labels */}
            <div className="mt-3 flex justify-between text-[11px] font-mono text-zinc-500">
              {activePoints.map((p, i) => (
                <span key={i}>{p.date}</span>
              ))}
            </div>
          </div>

          {/* Data Table: Sticky Header, Sortable Columns, Row Hover, Pagination */}
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 overflow-hidden">
            <div className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white">Recent Cross-Chain JIT Executions</h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Verified origin swaps, reactive processing time, and harvested fees.
                </p>
              </div>

              <div className="text-xs font-mono text-zinc-400">
                Showing {filteredRows.length} of 3,482 records
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                {/* Sticky Header */}
                <thead className="sticky top-0 bg-zinc-900 text-zinc-400 border-b border-zinc-800 uppercase tracking-wider font-mono text-[11px]">
                  <tr>
                    <th className="px-6 py-3">Transaction</th>
                    <th className="px-6 py-3">Pool / Pair</th>
                    <th className="px-6 py-3">Origin Chain</th>
                    <th className="px-6 py-3">Swap Volume</th>
                    <th className="px-6 py-3">JIT Surge</th>
                    <th className="px-6 py-3">Latency</th>
                    <th className="px-6 py-3">Fee Harvested</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>

                {/* Table Body with Row Hover */}
                <tbody className="divide-y divide-zinc-800">
                  {filteredRows.map((row) => (
                    <tr key={row.id} className="hover:bg-zinc-800/50 transition cursor-default">
                      <td className="px-6 py-3.5 font-mono text-zinc-300">
                        <div className="font-semibold text-white">{row.id}</div>
                        <div className="text-[10px] text-zinc-500">{row.timestamp}</div>
                      </td>

                      <td className="px-6 py-3.5 font-medium text-white">{row.pool}</td>

                      <td className="px-6 py-3.5">
                        <span className="inline-flex items-center gap-1.5 rounded border border-zinc-700 bg-zinc-800 px-2 py-0.5 text-[11px] font-mono text-zinc-300">
                          {row.network}
                          <span className="text-indigo-400 font-bold">({row.networkBadge})</span>
                        </span>
                      </td>

                      <td className="px-6 py-3.5 font-mono text-zinc-200">{row.swapVolume}</td>

                      <td className="px-6 py-3.5 font-mono text-indigo-400 font-semibold">{row.jitLiquidity}</td>

                      <td className="px-6 py-3.5 font-mono text-emerald-400 font-bold">{row.latency}</td>

                      <td className="px-6 py-3.5 font-mono text-emerald-400 font-extrabold">{row.feeHarvested}</td>

                      <td className="px-6 py-3.5">
                        <span className="inline-flex items-center gap-1 rounded bg-emerald-950 px-2 py-0.5 text-[11px] font-medium text-emerald-300 border border-emerald-800/60">
                          <CheckCircle2 className="h-3 w-3" />
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="flex items-center justify-between border-t border-zinc-800 px-6 py-3 text-xs text-zinc-400">
              <div>Page {currentPage} of 58</div>

              <div className="flex space-x-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="rounded border border-zinc-800 bg-zinc-900 px-3 py-1 font-medium text-zinc-300 hover:bg-zinc-800 disabled:opacity-50 transition"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="rounded border border-zinc-800 bg-zinc-900 px-3 py-1 font-medium text-zinc-300 hover:bg-zinc-800 transition"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
