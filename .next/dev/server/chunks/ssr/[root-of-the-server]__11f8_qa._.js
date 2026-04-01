module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
}),
"[project]/lib/plantation-data.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// All plantation state data — consumed by the AI, not displayed raw to users
__turbopack_context__.s([
    "ALERTS",
    ()=>ALERTS,
    "CHERRY_STAGES",
    ()=>CHERRY_STAGES,
    "FIELDS",
    ()=>FIELDS,
    "GROWTH_DATA",
    ()=>GROWTH_DATA,
    "MACHINERY",
    ()=>MACHINERY,
    "SENSORS",
    ()=>SENSORS,
    "SOIL_DATA",
    ()=>SOIL_DATA,
    "WEATHER_FORECAST",
    ()=>WEATHER_FORECAST,
    "YIELD_PREDICTION",
    ()=>YIELD_PREDICTION
]);
const FIELDS = [
    {
        id: "A",
        name: "Bourbon Block",
        hectares: 42,
        variety: "Bourbon",
        altitude: 1650,
        status: "healthy",
        ndvi: 0.81,
        moisture: 38,
        temp: 22.4,
        ph: 5.8,
        cherryStage: "Green",
        plants: 12600,
        age: 4,
        color: "#22c55e"
    },
    {
        id: "B",
        name: "Typica Terrace",
        hectares: 35,
        variety: "Typica",
        altitude: 1720,
        status: "healthy",
        ndvi: 0.76,
        moisture: 42,
        temp: 21.8,
        ph: 6.1,
        cherryStage: "Turning",
        plants: 10500,
        age: 6,
        color: "#3b82f6"
    },
    {
        id: "C",
        name: "Gesha Garden",
        hectares: 28,
        variety: "Gesha",
        altitude: 1890,
        status: "wet",
        ndvi: 0.69,
        moisture: 58,
        temp: 20.1,
        ph: 5.5,
        cherryStage: "Green",
        plants: 8400,
        age: 3,
        color: "#f59e0b"
    },
    {
        id: "D",
        name: "Catuai Ridge",
        hectares: 38,
        variety: "Catuai",
        altitude: 1580,
        status: "stress",
        ndvi: 0.54,
        moisture: 22,
        temp: 24.6,
        ph: 6.4,
        cherryStage: "Ripe",
        plants: 11400,
        age: 8,
        color: "#ef4444"
    },
    {
        id: "E",
        name: "SL28 Slope",
        hectares: 31,
        variety: "SL28",
        altitude: 1760,
        status: "healthy",
        ndvi: 0.78,
        moisture: 36,
        temp: 21.2,
        ph: 5.9,
        cherryStage: "Turning",
        plants: 9300,
        age: 5,
        color: "#8b5cf6"
    },
    {
        id: "F",
        name: "Caturra Flat",
        hectares: 26,
        variety: "Caturra",
        altitude: 1640,
        status: "healthy",
        ndvi: 0.73,
        moisture: 40,
        temp: 22.8,
        ph: 6.0,
        cherryStage: "Green",
        plants: 7800,
        age: 2,
        color: "#06b6d4"
    }
];
const SENSORS = {
    total: 186,
    active: 179,
    types: {
        soil: 62,
        weather: 24,
        camera: 18,
        moisture: 48,
        ndvi: 20,
        pest: 14
    }
};
const WEATHER_FORECAST = [
    {
        day: "Today",
        icon: "sun",
        high: 24,
        low: 14,
        rain: 5,
        humidity: 62,
        wind: 8
    },
    {
        day: "Mon",
        icon: "cloud-sun",
        high: 22,
        low: 13,
        rain: 15,
        humidity: 68,
        wind: 12
    },
    {
        day: "Tue",
        icon: "cloud-rain",
        high: 19,
        low: 12,
        rain: 72,
        humidity: 85,
        wind: 18
    },
    {
        day: "Wed",
        icon: "cloud-rain",
        high: 18,
        low: 11,
        rain: 85,
        humidity: 90,
        wind: 22
    },
    {
        day: "Thu",
        icon: "cloud-sun",
        high: 21,
        low: 12,
        rain: 25,
        humidity: 72,
        wind: 14
    },
    {
        day: "Fri",
        icon: "sun",
        high: 23,
        low: 13,
        rain: 8,
        humidity: 60,
        wind: 9
    },
    {
        day: "Sat",
        icon: "sun",
        high: 25,
        low: 14,
        rain: 3,
        humidity: 55,
        wind: 7
    }
];
const SOIL_DATA = [
    {
        name: "Nitrogen",
        value: 68,
        optimal: "60-80",
        unit: "ppm",
        status: "good"
    },
    {
        name: "Phosphorus",
        value: 42,
        optimal: "30-50",
        unit: "ppm",
        status: "good"
    },
    {
        name: "Potassium",
        value: 185,
        optimal: "150-250",
        unit: "ppm",
        status: "good"
    },
    {
        name: "Calcium",
        value: 1200,
        optimal: "1000-1500",
        unit: "ppm",
        status: "good"
    },
    {
        name: "Magnesium",
        value: 95,
        optimal: "100-200",
        unit: "ppm",
        status: "low"
    },
    {
        name: "Iron",
        value: 32,
        optimal: "10-50",
        unit: "ppm",
        status: "good"
    },
    {
        name: "Organic Matter",
        value: 4.2,
        optimal: "3-6",
        unit: "%",
        status: "good"
    }
];
const ALERTS = [
    {
        id: 1,
        type: "warning",
        field: "Catuai Ridge",
        message: "Soil moisture critically low (22%)",
        time: "08:32"
    },
    {
        id: 2,
        type: "danger",
        field: "Catuai Ridge",
        message: "NDVI declining — possible leaf rust detected",
        time: "07:15"
    },
    {
        id: 3,
        type: "info",
        field: "Gesha Garden",
        message: "High moisture alert (58%) — reduce irrigation",
        time: "09:45"
    },
    {
        id: 4,
        type: "warning",
        field: "All Fields",
        message: "Heavy rain forecast Tue-Wed — prep drainage",
        time: "06:00"
    },
    {
        id: 5,
        type: "success",
        field: "Bourbon Block",
        message: "Optimal NDVI reached (0.81) — healthy canopy",
        time: "10:12"
    },
    {
        id: 6,
        type: "info",
        field: "SL28 Slope",
        message: "Cherry turning stage detected — monitor ripeness",
        time: "11:30"
    }
];
const MACHINERY = [
    {
        name: "Drone Alpha",
        status: "active",
        task: "NDVI Scanning Field A",
        battery: 72
    },
    {
        name: "Drone Beta",
        status: "charging",
        task: "Standby",
        battery: 34
    },
    {
        name: "Irrigation Zone 1",
        status: "active",
        task: "Field B & E watering cycle",
        battery: null
    },
    {
        name: "Irrigation Zone 2",
        status: "idle",
        task: "Scheduled 14:00",
        battery: null
    },
    {
        name: "Tractor Unit 1",
        status: "active",
        task: "Fertilizer application Field F",
        battery: null
    },
    {
        name: "Weather Station",
        status: "active",
        task: "Continuous monitoring",
        battery: 95
    },
    {
        name: "Pest Camera Array",
        status: "active",
        task: "ML detection running",
        battery: 88
    }
];
const YIELD_PREDICTION = {
    current: 2850,
    target: 3200,
    lastYear: 2640,
    unit: "kg/ha",
    byField: FIELDS.map((f)=>({
            name: f.name.split(" ")[0],
            predicted: Math.round(2400 + Math.random() * 1200),
            target: 3200
        }))
};
const CHERRY_STAGES = [
    {
        name: "Flower",
        value: 8,
        color: "#f9fafb"
    },
    {
        name: "Green",
        value: 35,
        color: "#22c55e"
    },
    {
        name: "Turning",
        value: 28,
        color: "#f59e0b"
    },
    {
        name: "Ripe",
        value: 22,
        color: "#ef4444"
    },
    {
        name: "Overripe",
        value: 7,
        color: "#7c2d12"
    }
];
const GROWTH_DATA = Array.from({
    length: 12
}, (_, i)=>{
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];
    return {
        month: months[i],
        thisYear: [
            12,
            18,
            28,
            42,
            55,
            62,
            68,
            72,
            74,
            70,
            58,
            35
        ][i],
        lastYear: [
            10,
            15,
            24,
            38,
            50,
            58,
            64,
            68,
            71,
            66,
            52,
            30
        ][i],
        rainfall: [
            45,
            62,
            88,
            120,
            145,
            85,
            42,
            38,
            55,
            95,
            130,
            78
        ][i]
    };
});
}),
"[project]/components/nav-sidebar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NavSidebar",
    ()=>NavSidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coffee$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Coffee$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/coffee.js [app-ssr] (ecmascript) <export default as Coffee>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-dashboard.js [app-ssr] (ecmascript) <export default as LayoutDashboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flask$2d$conical$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FlaskConical$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flask-conical.js [app-ssr] (ecmascript) <export default as FlaskConical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-ssr] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$radio$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Radio$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/radio.js [app-ssr] (ecmascript) <export default as Radio>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$plantation$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/plantation-data.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
const NAV_ITEMS = [
    {
        href: "/",
        label: "Dashboard",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"]
    },
    {
        href: "/simulation",
        label: "Simulation",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flask$2d$conical$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FlaskConical$3e$__["FlaskConical"]
    },
    {
        href: "/chat",
        label: "Ask AI",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"]
    }
];
function NavSidebar() {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const [time, setTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const update = ()=>setTime(new Date().toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false
            }));
        update();
        const interval = setInterval(update, 1000);
        return ()=>clearInterval(interval);
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "fixed inset-y-0 left-0 z-30 flex w-[220px] flex-col border-r border-border bg-sidebar",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3 px-6 py-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coffee$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Coffee$3e$__["Coffee"], {
                                className: "size-5 text-white"
                            }, void 0, false, {
                                fileName: "[project]/components/nav-sidebar.tsx",
                                lineNumber: 46,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "absolute -right-0.5 -top-0.5 flex size-2.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60"
                                    }, void 0, false, {
                                        fileName: "[project]/components/nav-sidebar.tsx",
                                        lineNumber: 49,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "relative inline-flex size-2.5 rounded-full border border-sidebar bg-emerald-500"
                                    }, void 0, false, {
                                        fileName: "[project]/components/nav-sidebar.tsx",
                                        lineNumber: 50,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/nav-sidebar.tsx",
                                lineNumber: 48,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/nav-sidebar.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-base font-bold tracking-tight text-sidebar-foreground",
                                children: "CafePulse"
                            }, void 0, false, {
                                fileName: "[project]/components/nav-sidebar.tsx",
                                lineNumber: 54,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] font-medium uppercase tracking-widest text-muted-foreground",
                                children: "AI Plantation OS"
                            }, void 0, false, {
                                fileName: "[project]/components/nav-sidebar.tsx",
                                lineNumber: 57,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/nav-sidebar.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/nav-sidebar.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "flex flex-1 flex-col gap-1 px-3 pt-4",
                children: [
                    NAV_ITEMS.map((item)=>{
                        const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: item.href,
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200", isActive ? "bg-sidebar-accent text-sidebar-primary shadow-[inset_0_0_12px_rgba(34,197,94,0.06)]" : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(item.icon, {
                                    className: "size-4"
                                }, void 0, false, {
                                    fileName: "[project]/components/nav-sidebar.tsx",
                                    lineNumber: 81,
                                    columnNumber: 15
                                }, this),
                                item.label
                            ]
                        }, item.href, true, {
                            fileName: "[project]/components/nav-sidebar.tsx",
                            lineNumber: 71,
                            columnNumber: 13
                        }, this);
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 rounded-lg bg-sidebar-accent/50 px-3 py-2.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$radio$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Radio$3e$__["Radio"], {
                                        className: "size-3 text-emerald-400 animate-pulse-subtle"
                                    }, void 0, false, {
                                        fileName: "[project]/components/nav-sidebar.tsx",
                                        lineNumber: 90,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] font-medium text-muted-foreground",
                                        children: [
                                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$plantation$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SENSORS"].active,
                                            "/",
                                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$plantation$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SENSORS"].total,
                                            " sensors online"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/nav-sidebar.tsx",
                                        lineNumber: 91,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/nav-sidebar.tsx",
                                lineNumber: 89,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-1.5 h-1 overflow-hidden rounded-full bg-border",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-full rounded-full bg-emerald-500/60",
                                    style: {
                                        width: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$plantation$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SENSORS"].active / __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$plantation$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SENSORS"].total * 100}%`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/nav-sidebar.tsx",
                                    lineNumber: 96,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/nav-sidebar.tsx",
                                lineNumber: 95,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/nav-sidebar.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/nav-sidebar.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-border px-6 py-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs font-medium text-muted-foreground",
                        children: "Highland Coffee Estate"
                    }, void 0, false, {
                        fileName: "[project]/components/nav-sidebar.tsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-0.5 flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] text-muted-foreground/60",
                                children: "6 blocks · 200 Ha"
                            }, void 0, false, {
                                fileName: "[project]/components/nav-sidebar.tsx",
                                lineNumber: 112,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-mono text-[10px] tabular-nums text-muted-foreground/40",
                                children: time
                            }, void 0, false, {
                                fileName: "[project]/components/nav-sidebar.tsx",
                                lineNumber: 115,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/nav-sidebar.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/nav-sidebar.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/nav-sidebar.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/status-footer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StatusFooter",
    ()=>StatusFooter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$plantation$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/plantation-data.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wifi$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wifi.js [app-ssr] (ecmascript) <export default as Wifi>");
"use client";
;
;
;
;
function StatusFooter() {
    const [syncAgo, setSyncAgo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(2);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const interval = setInterval(()=>{
            setSyncAgo((prev)=>{
                // Reset to simulate periodic sync
                if (prev >= 30) return 1;
                return prev + 1;
            });
        }, 1000);
        return ()=>clearInterval(interval);
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "fixed bottom-0 right-0 left-[220px] z-20 flex items-center justify-between border-t border-border bg-background/80 px-6 py-1.5 backdrop-blur-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-4 text-[11px] text-muted-foreground",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex items-center gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "relative flex size-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-50"
                                    }, void 0, false, {
                                        fileName: "[project]/components/status-footer.tsx",
                                        lineNumber: 26,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "relative inline-flex size-1.5 rounded-full bg-emerald-500"
                                    }, void 0, false, {
                                        fileName: "[project]/components/status-footer.tsx",
                                        lineNumber: 27,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/status-footer.tsx",
                                lineNumber: 25,
                                columnNumber: 11
                            }, this),
                            "System Online"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/status-footer.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-border",
                        children: "|"
                    }, void 0, false, {
                        fileName: "[project]/components/status-footer.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$plantation$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SENSORS"].active,
                            "/",
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$plantation$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SENSORS"].total,
                            " sensors active"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/status-footer.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-border",
                        children: "|"
                    }, void 0, false, {
                        fileName: "[project]/components/status-footer.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wifi$3e$__["Wifi"], {
                                className: "mr-1 inline size-3 text-emerald-400"
                            }, void 0, false, {
                                fileName: "[project]/components/status-footer.tsx",
                                lineNumber: 37,
                                columnNumber: 11
                            }, this),
                            "Last sync ",
                            syncAgo,
                            "s ago"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/status-footer.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/status-footer.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-[10px] text-muted-foreground/40",
                children: "CafePulse v0.1 · Highland Coffee Estate"
            }, void 0, false, {
                fileName: "[project]/components/status-footer.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/status-footer.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__11f8_qa._.js.map