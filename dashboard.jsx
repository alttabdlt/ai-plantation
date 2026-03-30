import { useState, useEffect, useRef } from "react";
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar, RadialBarChart, RadialBar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";
import {
  Droplets, Thermometer, Wind, Sun, CloudRain, Leaf, AlertTriangle,
  Activity, Wifi, WifiOff, MapPin, ChevronDown, ChevronRight, Bell,
  Settings, BarChart3, Map, Layers, Eye, EyeOff, Satellite, Zap,
  TrendingUp, TrendingDown, Cloud, CloudSun, CloudLightning, Coffee,
  Sprout, Bug, FlaskConical, Gauge, Radio, Cpu, TreePine, Mountain,
  Calendar, Clock, RefreshCw, ChevronLeft, Menu, X, Search,
  ArrowUp, ArrowDown, Minus, Check, CircleDot, Target, Waves
} from "lucide-react";

// ─── Simulated Data ───────────────────────────────────────────────────────────

const FIELDS = [
  { id: "A", name: "Bourbon Block", hectares: 42, variety: "Bourbon", altitude: 1650, status: "healthy", ndvi: 0.81, moisture: 38, temp: 22.4, ph: 5.8, cherryStage: "Green", plants: 12600, age: 4, color: "#22c55e" },
  { id: "B", name: "Typica Terrace", hectares: 35, variety: "Typica", altitude: 1720, status: "healthy", ndvi: 0.76, moisture: 42, temp: 21.8, ph: 6.1, cherryStage: "Turning", plants: 10500, age: 6, color: "#3b82f6" },
  { id: "C", name: "Gesha Garden", hectares: 28, variety: "Gesha", altitude: 1890, status: "wet", ndvi: 0.69, moisture: 58, temp: 20.1, ph: 5.5, cherryStage: "Green", plants: 8400, age: 3, color: "#f59e0b" },
  { id: "D", name: "Catuai Ridge", hectares: 38, variety: "Catuai", altitude: 1580, status: "stress", ndvi: 0.54, moisture: 22, temp: 24.6, ph: 6.4, cherryStage: "Ripe", plants: 11400, age: 8, color: "#ef4444" },
  { id: "E", name: "SL28 Slope", hectares: 31, variety: "SL28", altitude: 1760, status: "healthy", ndvi: 0.78, moisture: 36, temp: 21.2, ph: 5.9, cherryStage: "Turning", plants: 9300, age: 5, color: "#8b5cf6" },
  { id: "F", name: "Caturra Flat", hectares: 26, variety: "Caturra", altitude: 1640, status: "healthy", ndvi: 0.73, moisture: 40, temp: 22.8, ph: 6.0, cherryStage: "Green", plants: 7800, age: 2, color: "#06b6d4" },
];

const SENSORS = {
  total: 186, active: 179, types: { soil: 62, weather: 24, camera: 18, moisture: 48, ndvi: 20, pest: 14 }
};

const WEATHER_FORECAST = [
  { day: "Today", icon: "sun", high: 24, low: 14, rain: 5, humidity: 62, wind: 8 },
  { day: "Mon", icon: "cloud-sun", high: 22, low: 13, rain: 15, humidity: 68, wind: 12 },
  { day: "Tue", icon: "cloud-rain", high: 19, low: 12, rain: 72, humidity: 85, wind: 18 },
  { day: "Wed", icon: "cloud-rain", high: 18, low: 11, rain: 85, humidity: 90, wind: 22 },
  { day: "Thu", icon: "cloud-sun", high: 21, low: 12, rain: 25, humidity: 72, wind: 14 },
  { day: "Fri", icon: "sun", high: 23, low: 13, rain: 8, humidity: 60, wind: 9 },
  { day: "Sat", icon: "sun", high: 25, low: 14, rain: 3, humidity: 55, wind: 7 },
];

const GROWTH_DATA = Array.from({ length: 12 }, (_, i) => {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return {
    month: months[i],
    thisYear: [12, 18, 28, 42, 55, 62, 68, 72, 74, 70, 58, 35][i],
    lastYear: [10, 15, 24, 38, 50, 58, 64, 68, 71, 66, 52, 30][i],
    rainfall: [45, 62, 88, 120, 145, 85, 42, 38, 55, 95, 130, 78][i],
  };
});

const NDVI_HISTORY = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  fieldA: 0.75 + Math.sin(i / 5) * 0.06 + Math.random() * 0.02,
  fieldB: 0.70 + Math.sin(i / 4) * 0.05 + Math.random() * 0.02,
  fieldC: 0.65 + Math.sin(i / 6) * 0.04 + Math.random() * 0.03,
  fieldD: 0.58 - i * 0.003 + Math.random() * 0.02,
}));

const SOIL_DATA = [
  { name: "Nitrogen", value: 68, optimal: "60-80", unit: "ppm", status: "good" },
  { name: "Phosphorus", value: 42, optimal: "30-50", unit: "ppm", status: "good" },
  { name: "Potassium", value: 185, optimal: "150-250", unit: "ppm", status: "good" },
  { name: "Calcium", value: 1200, optimal: "1000-1500", unit: "ppm", status: "good" },
  { name: "Magnesium", value: 95, optimal: "100-200", unit: "ppm", status: "low" },
  { name: "Iron", value: 32, optimal: "10-50", unit: "ppm", status: "good" },
  { name: "Organic Matter", value: 4.2, optimal: "3-6", unit: "%", status: "good" },
];

const ALERTS = [
  { id: 1, type: "warning", field: "Catuai Ridge", message: "Soil moisture critically low (22%)", time: "08:32", icon: "droplets" },
  { id: 2, type: "danger", field: "Catuai Ridge", message: "NDVI declining — possible leaf rust detected", time: "07:15", icon: "bug" },
  { id: 3, type: "info", field: "Gesha Garden", message: "High moisture alert (58%) — reduce irrigation", time: "09:45", icon: "droplets" },
  { id: 4, type: "warning", field: "All Fields", message: "Heavy rain forecast Tue-Wed — prep drainage", time: "06:00", icon: "cloud" },
  { id: 5, type: "success", field: "Bourbon Block", message: "Optimal NDVI reached (0.81) — healthy canopy", time: "10:12", icon: "leaf" },
  { id: 6, type: "info", field: "SL28 Slope", message: "Cherry turning stage detected — monitor ripeness", time: "11:30", icon: "coffee" },
];

const MACHINERY = [
  { name: "Drone Alpha", status: "active", task: "NDVI Scanning Field A", battery: 72 },
  { name: "Drone Beta", status: "charging", task: "Standby", battery: 34 },
  { name: "Irrigation Zone 1", status: "active", task: "Field B & E watering cycle", battery: null },
  { name: "Irrigation Zone 2", status: "idle", task: "Scheduled 14:00", battery: null },
  { name: "Tractor Unit 1", status: "active", task: "Fertilizer application Field F", battery: null },
  { name: "Weather Station", status: "active", task: "Continuous monitoring", battery: 95 },
  { name: "Pest Camera Array", status: "active", task: "ML detection running", battery: 88 },
];

const YIELD_PREDICTION = {
  current: 2850, target: 3200, lastYear: 2640, unit: "kg/ha",
  byField: FIELDS.map(f => ({ name: f.name.split(" ")[0], predicted: Math.round(2400 + Math.random() * 1200), target: 3200 }))
};

const CHERRY_STAGES = [
  { name: "Flower", value: 8, color: "#f9fafb" },
  { name: "Green", value: 35, color: "#22c55e" },
  { name: "Turning", value: 28, color: "#f59e0b" },
  { name: "Ripe", value: 22, color: "#ef4444" },
  { name: "Overripe", value: 7, color: "#7c2d12" },
];

const HOURLY_TEMP = Array.from({ length: 24 }, (_, i) => ({
  hour: `${String(i).padStart(2, "0")}:00`,
  temp: 14 + 8 * Math.sin((i - 6) * Math.PI / 12) + (Math.random() - 0.5) * 2,
  humidity: 80 - 25 * Math.sin((i - 6) * Math.PI / 12) + (Math.random() - 0.5) * 5,
}));

// ─── Helper Components ────────────────────────────────────────────────────────

const StatusDot = ({ status }) => {
  const colors = { healthy: "#22c55e", wet: "#3b82f6", stress: "#ef4444", dormant: "#6b7280" };
  return <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", backgroundColor: colors[status] || "#6b7280", marginRight: 6, boxShadow: `0 0 6px ${colors[status]}40` }} />;
};

const WeatherIcon = ({ type, size = 18 }) => {
  const props = { size, strokeWidth: 1.5 };
  switch (type) {
    case "sun": return <Sun {...props} color="#f59e0b" />;
    case "cloud-sun": return <CloudSun {...props} color="#94a3b8" />;
    case "cloud-rain": return <CloudRain {...props} color="#60a5fa" />;
    case "cloud-lightning": return <CloudLightning {...props} color="#a78bfa" />;
    default: return <Cloud {...props} color="#94a3b8" />;
  }
};

const AlertIcon = ({ type, size = 16 }) => {
  switch (type) {
    case "droplets": return <Droplets size={size} />;
    case "bug": return <Bug size={size} />;
    case "cloud": return <CloudRain size={size} />;
    case "leaf": return <Leaf size={size} />;
    case "coffee": return <Coffee size={size} />;
    default: return <AlertTriangle size={size} />;
  }
};

const MiniGauge = ({ value, max = 100, label, unit, color, size = 54 }) => {
  const pct = (value / max) * 100;
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div style={{ textAlign: "center" }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#1e293b" strokeWidth={4} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={4}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease" }} />
      </svg>
      <div style={{ marginTop: -size/2 - 8, paddingTop: size > 50 ? 14 : 10, fontSize: 13, fontWeight: 700, color }}>
        {typeof value === "number" ? value.toFixed(value < 10 ? 1 : 0) : value}{unit && <span style={{ fontSize: 9, opacity: 0.7 }}>{unit}</span>}
      </div>
      {label && <div style={{ fontSize: 9, color: "#94a3b8", marginTop: 2 }}>{label}</div>}
    </div>
  );
};

const Card = ({ children, style, onClick, hover }) => (
  <div onClick={onClick} style={{
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    borderRadius: 12, border: "1px solid #1e293b", padding: 16,
    cursor: onClick ? "pointer" : "default",
    transition: "all 0.2s ease",
    ...(hover ? { ":hover": { borderColor: "#334155" } } : {}),
    ...style
  }}>
    {children}
  </div>
);

const SectionTitle = ({ icon: Icon, title, badge, action }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {Icon && <Icon size={16} color="#22c55e" />}
      <span style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0", letterSpacing: 0.5 }}>{title}</span>
      {badge && <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 10, background: "#22c55e20", color: "#22c55e", fontWeight: 600 }}>{badge}</span>}
    </div>
    {action}
  </div>
);

// ─── Field Map (SVG) ──────────────────────────────────────────────────────────

const FieldMap = ({ fields, selectedField, onSelectField, mapLayer }) => {
  const fieldPaths = [
    { id: "A", d: "M80,60 L200,40 L220,140 L160,180 L70,150 Z", cx: 145, cy: 100 },
    { id: "B", d: "M200,40 L340,30 L350,110 L220,140 Z", cx: 275, cy: 80 },
    { id: "C", d: "M70,150 L160,180 L170,300 L60,280 Z", cx: 115, cy: 225 },
    { id: "D", d: "M160,180 L220,140 L350,110 L370,200 L340,300 L170,300 Z", cx: 270, cy: 210 },
    { id: "E", d: "M350,110 L480,60 L510,180 L370,200 Z", cx: 430, cy: 140 },
    { id: "F", d: "M370,200 L510,180 L530,310 L340,300 Z", cx: 440, cy: 250 },
  ];

  const getFieldColor = (field, layer) => {
    if (layer === "ndvi") {
      const v = field.ndvi;
      if (v > 0.75) return "rgba(34,197,94,0.5)";
      if (v > 0.65) return "rgba(245,158,11,0.5)";
      return "rgba(239,68,68,0.5)";
    }
    if (layer === "moisture") {
      const m = field.moisture;
      if (m > 50) return "rgba(59,130,246,0.6)";
      if (m > 30) return "rgba(34,197,94,0.5)";
      return "rgba(239,68,68,0.5)";
    }
    if (layer === "temperature") {
      const t = field.temp;
      if (t > 23) return "rgba(239,68,68,0.5)";
      if (t > 21) return "rgba(245,158,11,0.5)";
      return "rgba(59,130,246,0.5)";
    }
    return field.color + "55";
  };

  const sensorPositions = [
    { x: 120, y: 90, type: "soil" }, { x: 170, y: 120, type: "moisture" },
    { x: 260, y: 65, type: "weather" }, { x: 310, y: 95, type: "camera" },
    { x: 100, y: 210, type: "soil" }, { x: 130, y: 260, type: "moisture" },
    { x: 240, y: 180, type: "ndvi" }, { x: 300, y: 240, type: "soil" },
    { x: 430, y: 110, type: "moisture" }, { x: 470, y: 160, type: "pest" },
    { x: 410, y: 230, type: "soil" }, { x: 480, y: 270, type: "camera" },
    { x: 200, y: 260, type: "moisture" }, { x: 350, y: 160, type: "weather" },
  ];

  return (
    <div style={{ position: "relative", width: "100%", background: "linear-gradient(135deg, #0a1628 0%, #0f1d32 100%)", borderRadius: 12, overflow: "hidden", border: "1px solid #1e293b" }}>
      {/* Map header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px", borderBottom: "1px solid #1e293b20" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Satellite size={14} color="#22c55e" />
          <span style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0" }}>Highland Coffee Estate — Satellite View</span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["Sensors","Machinery","Drone"].map(t => (
            <span key={t} style={{ fontSize: 10, padding: "3px 10px", borderRadius: 6, background: "#1e293b", color: "#94a3b8", cursor: "pointer", border: "1px solid #334155" }}>
              {t === "Sensors" ? <Radio size={10} style={{ marginRight: 4, verticalAlign: -1 }} /> : t === "Machinery" ? <Cpu size={10} style={{ marginRight: 4, verticalAlign: -1 }} /> : <Target size={10} style={{ marginRight: 4, verticalAlign: -1 }} />}
              {t}
            </span>
          ))}
        </div>
      </div>

      <svg viewBox="0 0 590 340" style={{ width: "100%", height: "auto" }}>
        {/* Background terrain texture */}
        <defs>
          <pattern id="terrain" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect width="20" height="20" fill="#0a1628" />
            <circle cx="10" cy="10" r="0.5" fill="#1a3a2a" opacity="0.3" />
            <circle cx="5" cy="5" r="0.3" fill="#1a3a2a" opacity="0.2" />
            <circle cx="15" cy="15" r="0.4" fill="#1a3a2a" opacity="0.25" />
          </pattern>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#374151" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#4b5563" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#374151" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <rect width="590" height="340" fill="url(#terrain)" />

        {/* Roads */}
        <path d="M0,170 Q150,160 295,170 Q440,180 590,165" fill="none" stroke="url(#roadGrad)" strokeWidth="3" strokeDasharray="8,4" />
        <path d="M295,0 Q290,85 295,170 Q300,255 295,340" fill="none" stroke="url(#roadGrad)" strokeWidth="2.5" strokeDasharray="6,4" />

        {/* Contour lines */}
        {[80, 160, 240].map(y => (
          <path key={y} d={`M0,${y} Q150,${y-15} 295,${y+5} Q440,${y-10} 590,${y}`}
            fill="none" stroke="#1e3a2e" strokeWidth="0.5" opacity="0.4" strokeDasharray="4,8" />
        ))}

        {/* Water feature */}
        <path d="M0,320 Q80,300 140,310 Q200,320 260,305 Q320,290 380,300" fill="none" stroke="#1e40af" strokeWidth="2" opacity="0.4" />

        {/* Field polygons */}
        {fieldPaths.map(fp => {
          const field = fields.find(f => f.id === fp.id);
          const isSelected = selectedField === fp.id;
          return (
            <g key={fp.id} onClick={() => onSelectField(fp.id)} style={{ cursor: "pointer" }}>
              <path d={fp.d} fill={getFieldColor(field, mapLayer)}
                stroke={isSelected ? "#22c55e" : field.color} strokeWidth={isSelected ? 2.5 : 1.2}
                opacity={isSelected ? 1 : 0.85}
                style={{ transition: "all 0.3s ease" }} />
              {isSelected && <path d={fp.d} fill="none" stroke="#22c55e" strokeWidth="1" opacity="0.4" filter="url(#glow)" />}

              {/* Field label */}
              <g transform={`translate(${fp.cx}, ${fp.cy})`}>
                <rect x="-32" y="-20" width="64" height="40" rx="6" fill="#0f172aDD" stroke={field.color} strokeWidth="0.8" />
                <text x="0" y="-6" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="700" fontFamily="system-ui">
                  Field {fp.id}
                </text>
                <text x="0" y="8" textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontFamily="system-ui">
                  {mapLayer === "ndvi" ? `NDVI ${field.ndvi}` : mapLayer === "moisture" ? `${field.moisture}% moist` : mapLayer === "temperature" ? `${field.temp}°C` : `${field.moisture}% moist`}
                </text>
              </g>
            </g>
          );
        })}

        {/* Sensor dots */}
        {sensorPositions.map((s, i) => {
          const colors = { soil: "#f59e0b", moisture: "#3b82f6", weather: "#22c55e", camera: "#a78bfa", ndvi: "#10b981", pest: "#ef4444" };
          return (
            <g key={i}>
              <circle cx={s.x} cy={s.y} r="4" fill={colors[s.type]} opacity="0.8" />
              <circle cx={s.x} cy={s.y} r="7" fill="none" stroke={colors[s.type]} strokeWidth="0.5" opacity="0.4">
                <animate attributeName="r" values="5;9;5" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0.1;0.4" dur="3s" repeatCount="indefinite" />
              </circle>
            </g>
          );
        })}

        {/* Irrigation lines */}
        <path d="M100,150 L160,180 L170,220 L140,260" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.3" strokeDasharray="4,3">
          <animate attributeName="strokeDashoffset" values="0;-7" dur="2s" repeatCount="indefinite" />
        </path>
        <path d="M220,140 L260,170 L300,200 L340,230" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.3" strokeDasharray="4,3">
          <animate attributeName="strokeDashoffset" values="0;-7" dur="2s" repeatCount="indefinite" />
        </path>

        {/* Drone path */}
        <path d="M120,80 Q200,60 280,90 Q360,120 430,100" fill="none" stroke="#22c55e" strokeWidth="0.8" opacity="0.5" strokeDasharray="3,6">
          <animate attributeName="strokeDashoffset" values="0;-9" dur="1.5s" repeatCount="indefinite" />
        </path>
        <circle r="5" fill="#22c55e" opacity="0.9">
          <animateMotion dur="8s" repeatCount="indefinite" path="M120,80 Q200,60 280,90 Q360,120 430,100 Q360,120 280,90 Q200,60 120,80" />
        </circle>

        {/* Scale bar */}
        <g transform="translate(460, 320)">
          <line x1="0" y1="0" x2="80" y2="0" stroke="#64748b" strokeWidth="1" />
          <line x1="0" y1="-3" x2="0" y2="3" stroke="#64748b" strokeWidth="1" />
          <line x1="80" y1="-3" x2="80" y2="3" stroke="#64748b" strokeWidth="1" />
          <text x="40" y="-6" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="system-ui">500m</text>
        </g>
      </svg>
    </div>
  );
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function CoffeePlantationDashboard() {
  const [selectedField, setSelectedField] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mapLayer, setMapLayer] = useState("ndvi");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alertsDismissed, setAlertsDismissed] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const totalHa = FIELDS.reduce((s, f) => s + f.hectares, 0);
  const avgNdvi = (FIELDS.reduce((s, f) => s + f.ndvi, 0) / FIELDS.length).toFixed(2);
  const avgMoisture = Math.round(FIELDS.reduce((s, f) => s + f.moisture, 0) / FIELDS.length);
  const selectedFieldData = FIELDS.find(f => f.id === selectedField);
  const activeAlerts = ALERTS.filter(a => !alertsDismissed.includes(a.id));

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "fields", label: "Fields", icon: Map },
    { id: "sensors", label: "Sensors", icon: Radio },
    { id: "reports", label: "Reports", icon: Activity },
    { id: "alerts", label: "Alerts", icon: Bell },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const styles = {
    container: {
      display: "flex", height: "100vh", fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      background: "#030712", color: "#e2e8f0", overflow: "hidden",
    },
    sidebar: {
      width: sidebarOpen ? 240 : 0, minWidth: sidebarOpen ? 240 : 0,
      background: "linear-gradient(180deg, #0f172a 0%, #0a0f1a 100%)",
      borderRight: "1px solid #1e293b", display: "flex", flexDirection: "column",
      transition: "all 0.3s ease", overflow: "hidden",
    },
    main: { flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" },
    header: {
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "10px 20px", borderBottom: "1px solid #1e293b",
      background: "linear-gradient(90deg, #0f172a 0%, #1e293b 100%)",
    },
    content: {
      flex: 1, overflow: "auto", padding: 16,
      display: "grid", gridTemplateColumns: "1fr 320px", gap: 16,
    },
  };

  return (
    <div style={styles.container}>
      {/* ──────── SIDEBAR ──────── */}
      <div style={styles.sidebar}>
        {/* Logo */}
        <div style={{ padding: "16px 16px 12px", borderBottom: "1px solid #1e293b20" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #22c55e, #15803d)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Coffee size={20} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#f8fafc", letterSpacing: 0.5 }}>CaféPulse</div>
              <div style={{ fontSize: 9, color: "#22c55e", fontWeight: 600, letterSpacing: 1 }}>AI PLANTATION OS</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ padding: "12px 8px", flex: 1 }}>
          <div style={{ fontSize: 9, color: "#64748b", fontWeight: 600, letterSpacing: 1.5, padding: "0 8px 8px", textTransform: "uppercase" }}>Navigation</div>
          {navItems.map(item => (
            <div key={item.id} onClick={() => setActiveTab(item.id)}
              style={{
                display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8,
                cursor: "pointer", marginBottom: 2, fontSize: 13, fontWeight: 500,
                background: activeTab === item.id ? "linear-gradient(90deg, #22c55e15, transparent)" : "transparent",
                color: activeTab === item.id ? "#22c55e" : "#94a3b8",
                borderLeft: activeTab === item.id ? "2px solid #22c55e" : "2px solid transparent",
                transition: "all 0.2s ease"
              }}>
              <item.icon size={16} />
              {item.label}
              {item.id === "alerts" && activeAlerts.length > 0 && (
                <span style={{ marginLeft: "auto", fontSize: 10, background: "#ef444430", color: "#ef4444", padding: "1px 7px", borderRadius: 8, fontWeight: 700 }}>{activeAlerts.length}</span>
              )}
            </div>
          ))}

          {/* Fields list */}
          <div style={{ fontSize: 9, color: "#64748b", fontWeight: 600, letterSpacing: 1.5, padding: "16px 8px 8px", textTransform: "uppercase" }}>Fields</div>
          {FIELDS.map(field => (
            <div key={field.id} onClick={() => setSelectedField(selectedField === field.id ? null : field.id)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 12px",
                borderRadius: 8, cursor: "pointer", marginBottom: 1, fontSize: 12,
                background: selectedField === field.id ? `${field.color}15` : "transparent",
                borderLeft: selectedField === field.id ? `2px solid ${field.color}` : "2px solid transparent",
                transition: "all 0.2s ease"
              }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <StatusDot status={field.status} />
                <span style={{ color: selectedField === field.id ? "#f8fafc" : "#cbd5e1", fontWeight: selectedField === field.id ? 600 : 400 }}>
                  Field {field.id}
                </span>
              </div>
              <span style={{ fontSize: 10, color: "#64748b" }}>{field.status}</span>
            </div>
          ))}

          {/* Sensor summary */}
          <div style={{ fontSize: 9, color: "#64748b", fontWeight: 600, letterSpacing: 1.5, padding: "16px 8px 8px", textTransform: "uppercase" }}>Sensors</div>
          <div style={{ padding: "0 12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
              <Wifi size={12} color="#22c55e" />
              <span style={{ fontSize: 12, color: "#94a3b8" }}>Active</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#22c55e", marginLeft: "auto" }}>{SENSORS.active}</span>
              <span style={{ fontSize: 10, color: "#64748b" }}>/ {SENSORS.total}</span>
            </div>
            <div style={{ width: "100%", height: 3, background: "#1e293b", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ width: `${(SENSORS.active / SENSORS.total) * 100}%`, height: "100%", background: "linear-gradient(90deg, #22c55e, #15803d)", borderRadius: 2, transition: "width 1s ease" }} />
            </div>
          </div>
        </div>

        {/* Sidebar footer */}
        <div style={{ padding: 12, borderTop: "1px solid #1e293b", fontSize: 10, color: "#475569" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Mountain size={12} />
            Highland Coffee Estate
          </div>
          <div style={{ marginTop: 2 }}>Alt. 1580–1890m · 6 blocks · 200 Ha</div>
        </div>
      </div>

      {/* ──────── MAIN ──────── */}
      <div style={styles.main}>
        {/* Header */}
        <div style={styles.header}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div onClick={() => setSidebarOpen(!sidebarOpen)} style={{ cursor: "pointer", padding: 4 }}>
              {sidebarOpen ? <ChevronLeft size={18} color="#94a3b8" /> : <Menu size={18} color="#94a3b8" />}
            </div>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#f8fafc" }}>Plantation Dashboard</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#94a3b8" }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e60" }} />
              <span style={{ color: "#22c55e", fontWeight: 600 }}>System Online</span>
            </div>
            <div style={{ color: "#64748b" }}>|</div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#94a3b8" }}>
              <Calendar size={13} />
              {currentTime.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#94a3b8" }}>
              <Clock size={13} />
              {currentTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 8, background: "#1e293b", cursor: "pointer" }}>
              <RefreshCw size={13} color="#22c55e" />
              <span style={{ color: "#94a3b8", fontSize: 11 }}>Sync</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={styles.content}>
          {/* ──────── LEFT COLUMN ──────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, overflow: "auto", paddingRight: 4 }}>

            {/* KPI Cards Row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
              {[
                { label: "Total Area", value: `${totalHa} Ha`, sub: "6 Active Blocks", icon: Map, color: "#3b82f6", trend: null },
                { label: "Avg NDVI", value: avgNdvi, sub: avgNdvi > 0.7 ? "Good Health" : "Needs Attention", icon: Leaf, color: parseFloat(avgNdvi) > 0.7 ? "#22c55e" : "#f59e0b", trend: "+0.03" },
                { label: "Soil Moisture", value: `${avgMoisture}%`, sub: avgMoisture > 30 && avgMoisture < 50 ? "Optimal Range" : "Check Levels", icon: Droplets, color: "#3b82f6", trend: "-2%" },
                { label: "Temperature", value: "22°C", sub: "Ideal for Arabica", icon: Thermometer, color: "#f59e0b", trend: null },
                { label: "Yield Forecast", value: `${YIELD_PREDICTION.current}`, sub: `Target: ${YIELD_PREDICTION.target} kg/ha`, icon: TrendingUp, color: "#22c55e", trend: `+${Math.round((YIELD_PREDICTION.current/YIELD_PREDICTION.lastYear - 1) * 100)}%` },
              ].map((kpi, i) => (
                <Card key={i} style={{ padding: 14 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
                    <div style={{ padding: 6, borderRadius: 8, background: `${kpi.color}15` }}>
                      <kpi.icon size={16} color={kpi.color} />
                    </div>
                    {kpi.trend && (
                      <span style={{ fontSize: 10, color: kpi.trend.startsWith("+") ? "#22c55e" : "#ef4444", fontWeight: 600, display: "flex", alignItems: "center", gap: 2 }}>
                        {kpi.trend.startsWith("+") ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
                        {kpi.trend}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#f8fafc", lineHeight: 1 }}>{kpi.value}</div>
                  <div style={{ fontSize: 10, color: kpi.color, fontWeight: 500, marginTop: 4 }}>{kpi.sub}</div>
                  <div style={{ fontSize: 9, color: "#64748b", marginTop: 2 }}>{kpi.label}</div>
                </Card>
              ))}
            </div>

            {/* Map + Layer Controls */}
            <div>
              <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <SectionTitle icon={Satellite} title="FIELD MAP" badge="LIVE" />
                <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
                  {[
                    { id: "ndvi", label: "NDVI", icon: Leaf },
                    { id: "moisture", label: "Moisture", icon: Droplets },
                    { id: "temperature", label: "Temp", icon: Thermometer },
                  ].map(layer => (
                    <div key={layer.id} onClick={() => setMapLayer(layer.id)}
                      style={{
                        display: "flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 6,
                        fontSize: 11, cursor: "pointer", fontWeight: 500, transition: "all 0.2s ease",
                        background: mapLayer === layer.id ? "#22c55e20" : "#1e293b",
                        color: mapLayer === layer.id ? "#22c55e" : "#94a3b8",
                        border: `1px solid ${mapLayer === layer.id ? "#22c55e40" : "#334155"}`
                      }}>
                      <layer.icon size={12} /> {layer.label}
                    </div>
                  ))}
                </div>
              </div>
              <FieldMap fields={FIELDS} selectedField={selectedField} onSelectField={(id) => setSelectedField(selectedField === id ? null : id)} mapLayer={mapLayer} />
            </div>

            {/* Charts Row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {/* Growth Trends */}
              <Card>
                <SectionTitle icon={TrendingUp} title="CROP GROWTH TRENDS" badge="YoY" />
                <ResponsiveContainer width="100%" height={180}>
                  <AreaChart data={GROWTH_DATA}>
                    <defs>
                      <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="lastYearGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#64748b" stopOpacity={0.2} />
                        <stop offset="100%" stopColor="#64748b" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, fontSize: 11, color: "#e2e8f0" }} />
                    <Area type="monotone" dataKey="lastYear" stroke="#64748b" fill="url(#lastYearGrad)" strokeWidth={1.5} name="Last Year" />
                    <Area type="monotone" dataKey="thisYear" stroke="#22c55e" fill="url(#growthGrad)" strokeWidth={2} name="This Year" />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>

              {/* NDVI Trend */}
              <Card>
                <SectionTitle icon={Leaf} title="NDVI TREND (30 DAY)" badge="4 FIELDS" />
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={NDVI_HISTORY}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="day" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0.4, 0.9]} tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, fontSize: 11, color: "#e2e8f0" }} />
                    <Line type="monotone" dataKey="fieldA" stroke="#22c55e" strokeWidth={2} dot={false} name="Bourbon" />
                    <Line type="monotone" dataKey="fieldB" stroke="#3b82f6" strokeWidth={1.5} dot={false} name="Typica" />
                    <Line type="monotone" dataKey="fieldC" stroke="#f59e0b" strokeWidth={1.5} dot={false} name="Gesha" />
                    <Line type="monotone" dataKey="fieldD" stroke="#ef4444" strokeWidth={2} dot={false} name="Catuai" strokeDasharray="4 2" />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Bottom Row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              {/* Yield Prediction */}
              <Card>
                <SectionTitle icon={Coffee} title="YIELD PREDICTION" badge="AI" />
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={YIELD_PREDICTION.byField} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                    <XAxis type="number" tick={{ fill: "#64748b", fontSize: 9 }} axisLine={false} tickLine={false} domain={[0, 4000]} />
                    <YAxis type="category" dataKey="name" tick={{ fill: "#94a3b8", fontSize: 10 }} axisLine={false} tickLine={false} width={55} />
                    <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, fontSize: 11, color: "#e2e8f0" }} />
                    <Bar dataKey="predicted" fill="#22c55e" radius={[0, 4, 4, 0]} barSize={12} name="Predicted kg/ha" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              {/* Cherry Ripeness */}
              <Card>
                <SectionTitle icon={CircleDot} title="CHERRY RIPENESS" badge="ALL FIELDS" />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <ResponsiveContainer width="100%" height={160}>
                    <PieChart>
                      <Pie data={CHERRY_STAGES} cx="50%" cy="50%" innerRadius={40} outerRadius={65}
                        paddingAngle={3} dataKey="value" stroke="none">
                        {CHERRY_STAGES.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Pie>
                      <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, fontSize: 11, color: "#e2e8f0" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginTop: -4 }}>
                  {CHERRY_STAGES.map(s => (
                    <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 9, color: "#94a3b8" }}>
                      <span style={{ width: 7, height: 7, borderRadius: 2, background: s.color, display: "inline-block" }} />
                      {s.name} {s.value}%
                    </div>
                  ))}
                </div>
              </Card>

              {/* Soil Nutrients */}
              <Card>
                <SectionTitle icon={FlaskConical} title="SOIL ANALYSIS" badge={selectedFieldData ? `FIELD ${selectedField}` : "AVG"} />
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {SOIL_DATA.map(s => (
                    <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 10, color: "#94a3b8", width: 70, flexShrink: 0 }}>{s.name}</span>
                      <div style={{ flex: 1, height: 5, background: "#1e293b", borderRadius: 3, overflow: "hidden" }}>
                        <div style={{
                          width: `${Math.min((s.value / parseFloat(s.optimal.split("-")[1])) * 100, 100)}%`,
                          height: "100%", borderRadius: 3, transition: "width 1s ease",
                          background: s.status === "good" ? "linear-gradient(90deg, #22c55e, #15803d)" : s.status === "low" ? "linear-gradient(90deg, #f59e0b, #d97706)" : "#ef4444"
                        }} />
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 600, color: s.status === "good" ? "#22c55e" : "#f59e0b", width: 36, textAlign: "right" }}>{s.value}</span>
                      <span style={{ fontSize: 8, color: "#64748b", width: 24 }}>{s.unit}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Hourly Weather Chart */}
            <Card>
              <SectionTitle icon={Thermometer} title="24-HOUR TEMPERATURE & HUMIDITY" />
              <ResponsiveContainer width="100%" height={140}>
                <AreaChart data={HOURLY_TEMP}>
                  <defs>
                    <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="humGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="hour" tick={{ fill: "#64748b", fontSize: 9 }} axisLine={false} tickLine={false} interval={3} />
                  <YAxis yAxisId="temp" tick={{ fill: "#f59e0b", fontSize: 9 }} axisLine={false} tickLine={false} domain={[8, 30]} />
                  <YAxis yAxisId="hum" orientation="right" tick={{ fill: "#3b82f6", fontSize: 9 }} axisLine={false} tickLine={false} domain={[40, 100]} />
                  <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, fontSize: 11, color: "#e2e8f0" }} />
                  <Area yAxisId="temp" type="monotone" dataKey="temp" stroke="#f59e0b" fill="url(#tempGrad)" strokeWidth={2} name="Temp °C" />
                  <Area yAxisId="hum" type="monotone" dataKey="humidity" stroke="#3b82f6" fill="url(#humGrad)" strokeWidth={1.5} name="Humidity %" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* ──────── RIGHT COLUMN ──────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, overflow: "auto", paddingLeft: 4 }}>

            {/* Real-Time Alerts */}
            <Card style={{ padding: 14 }}>
              <SectionTitle icon={Bell} title="REAL-TIME ALERTS" badge={`${activeAlerts.length}`} />
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {activeAlerts.slice(0, 5).map(alert => {
                  const colors = { danger: "#ef4444", warning: "#f59e0b", info: "#3b82f6", success: "#22c55e" };
                  return (
                    <div key={alert.id} style={{
                      display: "flex", gap: 10, padding: "8px 10px", borderRadius: 8,
                      background: `${colors[alert.type]}08`, borderLeft: `3px solid ${colors[alert.type]}`,
                      fontSize: 11, alignItems: "flex-start"
                    }}>
                      <div style={{ color: colors[alert.type], marginTop: 1 }}>
                        <AlertIcon type={alert.icon} size={14} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, color: "#e2e8f0", marginBottom: 2 }}>{alert.field}</div>
                        <div style={{ color: "#94a3b8", fontSize: 10, lineHeight: 1.4 }}>{alert.message}</div>
                      </div>
                      <span style={{ fontSize: 9, color: "#64748b", whiteSpace: "nowrap" }}>{alert.time}</span>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Weather Forecast */}
            <Card style={{ padding: 14 }}>
              <SectionTitle icon={CloudSun} title="7-DAY FORECAST" />
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {WEATHER_FORECAST.map((day, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 10, padding: "6px 8px",
                    borderRadius: 6, background: i === 0 ? "#22c55e08" : "transparent",
                    borderLeft: i === 0 ? "2px solid #22c55e" : "2px solid transparent",
                  }}>
                    <span style={{ fontSize: 11, color: i === 0 ? "#22c55e" : "#94a3b8", width: 36, fontWeight: i === 0 ? 700 : 400 }}>{day.day}</span>
                    <WeatherIcon type={day.icon} size={16} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#f8fafc", width: 30 }}>{day.high}°</span>
                    <span style={{ fontSize: 10, color: "#64748b", width: 24 }}>{day.low}°</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <Droplets size={10} color="#3b82f6" />
                        <div style={{ flex: 1, height: 3, background: "#1e293b", borderRadius: 2, overflow: "hidden" }}>
                          <div style={{ width: `${day.rain}%`, height: "100%", background: day.rain > 50 ? "#3b82f6" : "#3b82f680", borderRadius: 2, transition: "width 0.5s" }} />
                        </div>
                        <span style={{ fontSize: 9, color: "#64748b", width: 24, textAlign: "right" }}>{day.rain}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 8, padding: "8px 10px", background: day => "#f59e0b10", borderRadius: 8, border: "1px solid #f59e0b20" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10, color: "#f59e0b", fontWeight: 600 }}>
                  <AlertTriangle size={12} /> Rain Advisory
                </div>
                <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 4, lineHeight: 1.4 }}>
                  Heavy rainfall expected Tue–Wed. Consider pausing irrigation and ensuring drainage channels are clear.
                </div>
              </div>
            </Card>

            {/* Selected Field Detail */}
            {selectedFieldData && (
              <Card style={{ padding: 14, borderColor: selectedFieldData.color + "40" }}>
                <SectionTitle icon={MapPin} title={`FIELD ${selectedField} DETAIL`} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div>
                    <div style={{ fontSize: 10, color: "#64748b" }}>Name</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#f8fafc" }}>{selectedFieldData.name}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: "#64748b" }}>Variety</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#f8fafc" }}>{selectedFieldData.variety}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: "#64748b" }}>Area</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#f8fafc" }}>{selectedFieldData.hectares} Ha</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: "#64748b" }}>Altitude</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#f8fafc" }}>{selectedFieldData.altitude}m</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: "#64748b" }}>Plants</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#f8fafc" }}>{selectedFieldData.plants.toLocaleString()}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: "#64748b" }}>Age</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#f8fafc" }}>{selectedFieldData.age} years</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: "#64748b" }}>Cherry Stage</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#f8fafc" }}>{selectedFieldData.cherryStage}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: "#64748b" }}>pH Level</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#f8fafc" }}>{selectedFieldData.ph}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 12, justifyContent: "center" }}>
                  <MiniGauge value={selectedFieldData.ndvi} max={1} label="NDVI" color={selectedFieldData.ndvi > 0.7 ? "#22c55e" : selectedFieldData.ndvi > 0.6 ? "#f59e0b" : "#ef4444"} />
                  <MiniGauge value={selectedFieldData.moisture} max={100} label="Moisture" unit="%" color={selectedFieldData.moisture > 50 ? "#3b82f6" : selectedFieldData.moisture > 25 ? "#22c55e" : "#ef4444"} />
                  <MiniGauge value={selectedFieldData.temp} max={35} label="Temp" unit="°C" color="#f59e0b" />
                </div>
              </Card>
            )}

            {/* Machinery Status */}
            <Card style={{ padding: 14 }}>
              <SectionTitle icon={Cpu} title="MACHINERY STATUS" />
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {MACHINERY.map((m, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 8px", borderRadius: 6, background: "#0f172a60" }}>
                    <div style={{
                      width: 7, height: 7, borderRadius: "50%",
                      background: m.status === "active" ? "#22c55e" : m.status === "charging" ? "#f59e0b" : "#64748b",
                      boxShadow: m.status === "active" ? "0 0 6px #22c55e60" : "none"
                    }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: "#e2e8f0" }}>{m.name}</div>
                      <div style={{ fontSize: 9, color: "#64748b" }}>{m.task}</div>
                    </div>
                    {m.battery !== null && (
                      <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                        <Zap size={10} color={m.battery > 50 ? "#22c55e" : m.battery > 20 ? "#f59e0b" : "#ef4444"} />
                        <span style={{ fontSize: 10, color: m.battery > 50 ? "#22c55e" : m.battery > 20 ? "#f59e0b" : "#ef4444", fontWeight: 600 }}>{m.battery}%</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* AI Recommendations */}
            <Card style={{ padding: 14, background: "linear-gradient(135deg, #0f2a1a 0%, #0f172a 100%)", borderColor: "#22c55e20" }}>
              <SectionTitle icon={Zap} title="AI RECOMMENDATIONS" badge="ML" />
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { priority: "high", text: "Catuai Ridge (Field D): NDVI declining at 0.003/day. Leaf rust probability 73%. Recommend fungicide application within 48 hours.", color: "#ef4444" },
                  { priority: "medium", text: "Gesha Garden (Field C): Reduce irrigation by 30%. Current moisture 58% exceeds optimal 35-45% range for Gesha variety.", color: "#f59e0b" },
                  { priority: "low", text: "SL28 Slope (Field E): Cherry turning stage detected. Estimated harvest window: 18–24 days. Begin selective picking preparation.", color: "#22c55e" },
                  { priority: "info", text: "Rainfall forecast suggests 85mm Tue-Wed. Postpone fertilizer application in Fields A & B until Thursday.", color: "#3b82f6" },
                ].map((rec, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: rec.color, marginTop: 5, flexShrink: 0, boxShadow: `0 0 6px ${rec.color}` }} />
                    <div style={{ fontSize: 10, color: "#94a3b8", lineHeight: 1.5 }}>
                      <span style={{ color: rec.color, fontWeight: 700, fontSize: 9, textTransform: "uppercase", letterSpacing: 0.5 }}>{rec.priority} </span>
                      {rec.text}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Rainfall Chart */}
            <Card style={{ padding: 14 }}>
              <SectionTitle icon={CloudRain} title="MONTHLY RAINFALL" badge="mm" />
              <ResponsiveContainer width="100%" height={100}>
                <BarChart data={GROWTH_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 9 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 9 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, fontSize: 11, color: "#e2e8f0" }} />
                  <Bar dataKey="rainfall" fill="#3b82f6" radius={[3, 3, 0, 0]} barSize={16} name="Rainfall mm" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
