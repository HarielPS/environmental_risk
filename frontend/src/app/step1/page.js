"use client";
import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  Trash2,
  RefreshCw,
  CheckCircle2,
  Info,
  Leaf,
  Truck,
  ArrowRight,
  Loader2,
  MapPin,
  X,
  Phone,
  Globe,
  Award,
  ExternalLink,
  Navigation,
  Search,
  PackageSearch,
  ArrowLeft,
  AlertCircle,
  SlidersHorizontal,
  Filter,
  ArrowUpDown,
  ChevronLeft,
  Box,
  TrendingDown,
  Sparkles,
  Zap,
  Send
} from "lucide-react";

// --- SERVICIOS ---

const searchProductsFromBackend = async (query, filters = {}) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const database = [
    // ===================== ESTRUCTURA =====================
    {
      offerId: "o001",
      stepId: "cemento",
      productName: "Cemento CPC 40",
      variant: "Alta Resistencia 50kg",
      price: { value: 265, currency: "MXN", unit: "saco" },
      co2: { value: 0.58, unit: "tCO2e", level: "Medio", verified: true },
      supplier: {
        name: "Cementos Sierra MX",
        location: "Monterrey, NL",
        address: "Av. Industrial 1200, Parque Norte, NL",
        logo: "CS",
        phone: "+52 81 2000 1200",
        rating: 4.6,
      },
      delivery: { minDays: 2, maxDays: 4 },
    },
    {
      offerId: "o002",
      stepId: "cemento",
      productName: "Cemento Gris",
      variant: "Uso General 25kg",
      price: { value: 145, currency: "MXN", unit: "saco" },
      co2: { value: 0.32, unit: "tCO2e", level: "Bajo", verified: false },
      supplier: {
        name: "Materiales Valle",
        location: "Puebla, PUE",
        address: "Blvd. Constructores 88, PUE",
        logo: "MV",
        phone: "+52 222 410 7788",
        rating: 4.3,
      },
      delivery: { minDays: 1, maxDays: 3 },
    },

    {
      offerId: "o003",
      stepId: "concreto",
      productName: "Concreto Premezclado",
      variant: "f'c 250 kg/cm² (Bombeable)",
      price: { value: 2350, currency: "MXN", unit: "m3" },
      co2: { value: 0.22, unit: "tCO2e", level: "Medio", verified: true },
      supplier: {
        name: "Concretos Delta",
        location: "CDMX",
        address: "Eje 3 Nte 540, Industrial, CDMX",
        logo: "CD",
        phone: "+52 55 3100 5400",
        rating: 4.7,
      },
      delivery: { minDays: 1, maxDays: 2 },
    },
    {
      offerId: "o004",
      stepId: "concreto",
      productName: "Concreto Premezclado",
      variant: "f'c 300 kg/cm² (Rápido)",
      price: { value: 2690, currency: "MXN", unit: "m3" },
      co2: { value: 0.28, unit: "tCO2e", level: "Alto", verified: true },
      supplier: {
        name: "Hormigón Urbano",
        location: "Guadalajara, JAL",
        address: "Carretera a Chapala Km 9, JAL",
        logo: "HU",
        phone: "+52 33 2400 9001",
        rating: 4.4,
      },
      delivery: { minDays: 1, maxDays: 3 },
    },

    {
      offerId: "o005",
      stepId: "acero",
      productName: "Varilla Corrugada",
      variant: "Grado 42, 3/8” (9.5mm)",
      price: { value: 16800, currency: "MXN", unit: "t" },
      co2: { value: 1.75, unit: "tCO2e", level: "Alto", verified: true },
      supplier: {
        name: "Aceros Nova",
        location: "Saltillo, COAH",
        address: "Blvd. Metales 300, COAH",
        logo: "AN",
        phone: "+52 844 210 0300",
        rating: 4.5,
      },
      delivery: { minDays: 2, maxDays: 5 },
    },
    {
      offerId: "o006",
      stepId: "acero",
      productName: "Varilla Corrugada",
      variant: "Grado 60, 1/2” (12.7mm)",
      price: { value: 18250, currency: "MXN", unit: "t" },
      co2: { value: 1.62, unit: "tCO2e", level: "Alto", verified: false },
      supplier: {
        name: "Metales Oriente",
        location: "Veracruz, VER",
        address: "Av. Puerto 77, VER",
        logo: "MO",
        phone: "+52 229 390 0077",
        rating: 4.2,
      },
      delivery: { minDays: 3, maxDays: 7 },
    },

    {
      offerId: "o007",
      stepId: "malla",
      productName: "Malla Electrosoldada",
      variant: "6-6/10-10 (2.44x6m)",
      price: { value: 1190, currency: "MXN", unit: "pieza" },
      co2: { value: 0.12, unit: "tCO2e", level: "Medio", verified: true },
      supplier: {
        name: "Redes y Mallas MX",
        location: "Querétaro, QRO",
        address: "Parque Industrial El Marqués, QRO",
        logo: "RM",
        phone: "+52 442 290 6601",
        rating: 4.6,
      },
      delivery: { minDays: 2, maxDays: 4 },
    },

    {
      offerId: "o008",
      stepId: "cimbra",
      productName: "Cimbra Fenólica",
      variant: "Triplay 12mm (1.22x2.44m)",
      price: { value: 565, currency: "MXN", unit: "hoja" },
      co2: { value: 0.04, unit: "tCO2e", level: "Bajo", verified: false },
      supplier: {
        name: "Maderas & Obra",
        location: "Toluca, MEX",
        address: "Av. Lerma 220, MEX",
        logo: "MO",
        phone: "+52 722 180 0220",
        rating: 4.1,
      },
      delivery: { minDays: 1, maxDays: 3 },
    },

    {
      offerId: "o009",
      stepId: "aditivos",
      productName: "Aditivo Plastificante",
      variant: "Mejora trabajabilidad 19L",
      price: { value: 980, currency: "MXN", unit: "garrafa" },
      co2: { value: 0.02, unit: "tCO2e", level: "Bajo", verified: true },
      supplier: {
        name: "Químicos de Construcción A1",
        location: "León, GTO",
        address: "Blvd. Industria 910, GTO",
        logo: "QA",
        phone: "+52 477 410 0910",
        rating: 4.7,
      },
      delivery: { minDays: 2, maxDays: 4 },
    },
    // (Datos de DB omitidos para brevedad, pero se asumen presentes)
    {
      offerId: "o036",
      stepId: "cemento",
      productName: "Cemento Bajo Clinker",
      variant: "Sustentable 40kg",
      price: { value: 295, currency: "MXN", unit: "saco" },
      co2: { value: 0.42, unit: "tCO2e", level: "Bajo", verified: true },
      supplier: {
        name: "EcoCement MX",
        location: "Querétaro, QRO",
        address: "Parque Industrial Verde, QRO",
        logo: "EC",
        phone: "+52 442 300 0888",
        rating: 4.8,
      },
      delivery: { minDays: 3, maxDays: 6 },
    },
  ];
  return database;
};

const MaterialService = {
  getProjectSteps: async () => [
    { id: "cemento", label: "Cemento", required: true },
    { id: "concreto", label: "Concreto", required: true },
    { id: "acero", label: "Acero", required: true },
    { id: "malla", label: "Malla", required: true },
  ],
  fetchAll: async () => await searchProductsFromBackend()
};

// --- COMPONENTES ---

const CO2Badge = ({ level, value, unit }) => {
  const colors = {
    Bajo: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Medio: "bg-amber-50 text-amber-700 border-amber-100",
    Alto: "bg-rose-50 text-rose-700 border-rose-100",
    Verificado: "bg-blue-50 text-blue-700 border-blue-100",
  };
  return (
    <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[9px] font-bold ${colors[level] || colors.Medio}`}>
      <Leaf size={10} fill="currentColor" />
      <span>{value} {unit}</span>
    </div>
  );
};

const PackageCard = ({ stepLabel, product, isPremium }) => {
  if (!product) return (
    <div className="h-24 bg-slate-50 border border-dashed border-slate-200 rounded-xl flex items-center justify-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
      No disponible
    </div>
  );

  return (
    <div className={`p-4 rounded-xl border transition-all ${isPremium ? 'bg-blue-50/30 border-blue-100' : 'bg-white border-slate-100'}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stepLabel}</span>
        <CO2Badge {...product.co2} />
      </div>
      <h4 className="text-sm font-black text-slate-800 leading-tight mb-1 truncate">{product.productName}</h4>
      <p className="text-[11px] font-bold text-slate-500 mb-3">{product.variant}</p>
      <div className="flex items-center justify-between">
        <div className="text-xs font-black text-slate-900">${product.price.value.toLocaleString()} <span className="text-[10px] font-normal opacity-50">/{product.price.unit}</span></div>
        <div className="w-6 h-6 bg-slate-900 rounded-lg flex items-center justify-center text-white text-[8px] font-bold">{product.supplier.logo}</div>
      </div>
    </div>
  );
};

// --- APP ---

export default function App() {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showExportMessage, setShowExportMessage] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const [packages, setPackages] = useState({
    economico: { id: 'economico', title: "Económico", icon: <TrendingDown size={18} />, color: "text-amber-600", items: {} },
    sustentable: { id: 'sustentable', title: "Ecológico", icon: <Leaf size={18} />, color: "text-emerald-600", items: {} },
    premium: { id: 'premium', title: "Eficiente", icon: <Zap size={18} />, color: "text-blue-600", items: {} }
  });

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const projectSteps = await MaterialService.getProjectSteps();
      const allProducts = await MaterialService.fetchAll();
      setSteps(projectSteps);

      const newPackages = { ...packages };
      
      projectSteps.forEach(step => {
        const stepProducts = allProducts.filter(p => p.stepId === step.id);
        if (stepProducts.length > 0) {
          newPackages.economico.items[step.id] = [...stepProducts].sort((a,b) => a.price.value - b.price.value)[0];
          newPackages.sustentable.items[step.id] = [...stepProducts].sort((a,b) => a.co2.value - b.co2.value)[0];
          newPackages.premium.items[step.id] = [...stepProducts].sort((a,b) => b.supplier.rating - a.supplier.rating)[0];
        }
      });

      setPackages(newPackages);
      setLoading(false);
    };
    init();
  }, []);

  const handleExport = () => {
    if (!selectedPackage) return;
    setShowExportMessage(true);
  };

  const handleSelectPackage = (packageId) => {
    setSelectedPackage(packageId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
        <Loader2 className="text-blue-600 animate-spin" size={40} />
        <p className="text-slate-500 font-bold animate-pulse">Armando paquetes comparativos...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <header className="bg-white border-b border-slate-200 px-6 py-6 w-full">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs">M</div>
              MAT-BUNDLES
            </h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Comparativa de Suministro Integral</p>
          </div>
          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">
                <RefreshCw size={16} /> Regenerar
             </button>
             <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-black shadow-lg shadow-slate-200">
                Guardar Comparativa
             </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-6 pb-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(packages).map(([key, pkg]) => {
            const total = Object.values(pkg.items).reduce((acc, curr) => acc + (curr?.price.value || 0), 0);
            const totalCO2 = Object.values(pkg.items).reduce((acc, curr) => acc + (curr?.co2.value || 0), 0);
            const isSelected = selectedPackage === pkg.id;
            
            return (
              <div key={key} className={`flex flex-col gap-6 transition-all ${isSelected ? 'scale-[1.02]' : ''}`}>
                <div className={`bg-white rounded-3xl border p-6 shadow-sm relative overflow-hidden transition-colors ${isSelected ? 'border-blue-500 ring-2 ring-blue-100' : 'border-slate-200'}`}>
                  {isSelected && (
                    <div className="absolute top-0 left-0 bg-blue-600 text-white text-[10px] font-black px-4 py-1 rounded-br-2xl uppercase tracking-tighter">
                      Seleccionado
                    </div>
                  )}
                  <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 opacity-5 ${pkg.color} bg-current rounded-full`}></div>
                  
                  <div className="flex items-center gap-3 mb-6 mt-2">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center bg-slate-50 ${pkg.color}`}>
                      {pkg.icon}
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-slate-900 leading-tight">Paquete {pkg.title}</h2>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Opción optimizada</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-end justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inversión Total</span>
                        <span className="text-2xl font-black text-slate-900">${total.toLocaleString()}</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Huella Global</span>
                        <div className="flex items-center gap-1 text-emerald-600 font-black text-sm">
                          <Leaf size={12} /> {totalCO2.toFixed(2)} t
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  {steps.map(step => (
                    <PackageCard 
                      key={step.id} 
                      stepLabel={step.label} 
                      product={pkg.items[step.id]} 
                      isPremium={key === 'premium'}
                    />
                  ))}
                </div>

                <button 
                  onClick={() => handleSelectPackage(pkg.id)}
                  className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95 ${
                  isSelected 
                  ? 'bg-blue-600 text-white shadow-blue-100' 
                  : key === 'sustentable' 
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                  : key === 'premium'
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-slate-900 text-white hover:bg-black'
                }`}>
                  {isSelected ? 'Paquete Seleccionado' : 'Seleccionar este Paquete'}
                </button>
              </div>
            );
          })}
        </div>
      </main>

      <footer className="block bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-200 p-6 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden md:block">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Análisis Comparativo</p>
            <p className="text-sm font-bold text-slate-700">Analizando {steps.length} categorías clave en 3 escenarios de obra.</p>
          </div>
          <div className="flex items-center gap-6 w-full md:w-auto">
             <div className="bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100 flex items-center gap-2">
                <Leaf size={16} className="text-emerald-600" />
                <span className="text-xs font-black text-emerald-700">Ahorro CO2: -15% vs Promedio</span>
             </div>
             <button 
                onClick={handleExport}
                disabled={!selectedPackage}
                className={`flex-1 md:flex-none px-10 py-3.5 rounded-2xl font-black text-sm flex items-center gap-2 transition-all ${
                  selectedPackage 
                  ? "bg-blue-600 text-white shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95" 
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                Exportar Cotización <ArrowRight size={18} />
             </button>
          </div>
        </div>
      </footer>

      {showExportMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-sm w-full shadow-2xl border border-slate-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
              <Send size={28} />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">¡Solicitud Enviada!</h3>
            <p className="text-slate-500 font-bold text-sm leading-relaxed mb-8">
              Se le envió la oferta a los proveedores del paquete seleccionado. Recibirás las confirmaciones en tu panel de control.
            </p>
            <button 
              onClick={() => setShowExportMessage(false)}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all active:scale-95 shadow-xl shadow-slate-200"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}