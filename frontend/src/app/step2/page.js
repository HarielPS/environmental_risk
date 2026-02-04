"use client";
import React, { useState, useMemo, useEffect } from "react";
import {
  ChevronRight,
  ChevronLeft,
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
} from "lucide-react";
import { useRouter } from "next/navigation";

// --- CAPA DE SERVICIOS (LÓGICA DE BACKEND SEPARADA) ---
/**
 * Función principal de búsqueda y filtrado.
 * Esta lógica simula el procesamiento que haría un Backend (SQL/NoSQL).
 */
const searchProductsFromBackend = async (query, filters = {}) => {
  await new Promise((resolve) => setTimeout(resolve, 600));


  const database = [
    // =========================
    // CEMENTO
    // =========================
    {
      offerId: "c3",
      stepId: "cemento",
      productName: "Cemento CPC 40",
      variant: "Alta Resistencia 50kg",
      price: { value: 270, currency: "MXN", unit: "saco" },
      co2: { value: 0.55, unit: "tCO2e", level: "Medio", verified: true },
      supplier: {
        name: "Cruz Azul Planta Aguascalientes",
        location: "Aguascalientes, AGS",
        address: "Carretera Panamericana Km 14, AGS",
        logo: "CA",
        phone: "+52 449 910 2200",
        rating: 4.6,
      },
      delivery: { minDays: 2, maxDays: 4 },
    },
    {
      offerId: "c4",
      stepId: "cemento",
      productName: "Cemento Ecológico",
      variant: "Baja Huella 50kg",
      price: { value: 290, currency: "MXN", unit: "saco" },
      co2: { value: 0.3, unit: "tCO2e", level: "Muy Bajo", verified: true },
      supplier: {
        name: "Holcim Verde",
        location: "Querétaro, QRO",
        address: "Parque Industrial Querétaro",
        logo: "HV",
        phone: "+52 442 300 1100",
        rating: 4.9,
      },
      delivery: { minDays: 3, maxDays: 6 },
    },

    // =========================
    // PISO / RECUBRIMIENTO
    // =========================
    {
      offerId: "p2",
      stepId: "piso",
      productName: "Porcelanato Beige Natural",
      variant: "45x90cm",
      price: { value: 520, currency: "MXN", unit: "m2" },
      co2: { value: 2.8, unit: "kgCO2e", level: "Medio", verified: false },
      supplier: {
        name: "Porcelanite León",
        location: "León, GTO",
        address: "Blvd. Aeropuerto 1020, León, Gto.",
        logo: "PL",
        phone: "+52 477 710 9900",
        rating: 4.4,
      },
      delivery: { minDays: 6, maxDays: 9 },
    },
    {
      offerId: "p3",
      stepId: "piso",
      productName: "Loseta Cerámica Antiderrapante",
      variant: "Exterior 30x30cm",
      price: { value: 310, currency: "MXN", unit: "m2" },
      co2: { value: 3.2, unit: "kgCO2e", level: "Alto", verified: false },
      supplier: {
        name: "Castel Puebla",
        location: "Puebla, PUE",
        address: "Zona Industrial Puebla 2000",
        logo: "CP",
        phone: "+52 222 220 8800",
        rating: 4.2,
      },
      delivery: { minDays: 4, maxDays: 7 },
    },

    // =========================
    // PINTURA
    // =========================
    {
      offerId: "pt2",
      stepId: "pintura",
      productName: "Pintura Vinílica Satinada",
      variant: "Interior",
      price: { value: 980, currency: "MXN", unit: "cubeta" },
      co2: { value: 0.22, unit: "kgCO2e", level: "Bajo", verified: true },
      supplier: {
        name: "Berel Guadalajara",
        location: "Guadalajara, JAL",
        address: "Av. López Mateos Sur 4500",
        logo: "B",
        phone: "+52 33 3669 9900",
        rating: 4.6,
      },
      delivery: { minDays: 2, maxDays: 4 },
    },
    {
      offerId: "pt3",
      stepId: "pintura",
      productName: "Pintura Ecológica Zero VOC",
      variant: "Interior Premium",
      price: { value: 1350, currency: "MXN", unit: "cubeta" },
      co2: { value: 0.05, unit: "kgCO2e", level: "Muy Bajo", verified: true },
      supplier: {
        name: "Comex Verde",
        location: "CDMX",
        address: "Av. Insurgentes Sur 1271",
        logo: "CV",
        phone: "+52 55 1100 3344",
        rating: 4.9,
      },
      delivery: { minDays: 1, maxDays: 2 },
    },

    // =========================
    // LADRILLO / BLOCK
    // =========================
    {
      offerId: "l1",
      stepId: "ladrillo",
      productName: "Block Hueco de Concreto",
      variant: "12x20x40cm",
      price: { value: 18, currency: "MXN", unit: "pza" },
      co2: { value: 0.9, unit: "kgCO2e", level: "Medio", verified: false },
      supplier: {
        name: "Blockera del Bajío",
        location: "Celaya, GTO",
        address: "Carretera Celaya-Salvatierra Km 5",
        logo: "BB",
        phone: "+52 461 220 3344",
        rating: 4.3,
      },
      delivery: { minDays: 3, maxDays: 5 },
    },

    // =========================
    // AISLANTE
    // =========================
    {
      offerId: "a1",
      stepId: "aislante",
      productName: "Aislante Térmico Reflectivo",
      variant: "Rollo 1.20x10m",
      price: { value: 1450, currency: "MXN", unit: "rollo" },
      co2: { value: 1.2, unit: "kgCO2e", level: "Bajo", verified: true },
      supplier: {
        name: "IsoTech México",
        location: "Toluca, EDOMEX",
        address: "Parque Industrial Toluca 2000",
        logo: "IT",
        phone: "+52 722 210 5566",
        rating: 4.7,
      },
      delivery: { minDays: 4, maxDays: 6 },
    },
    {
      offerId: "c5",
      stepId: "cemento",
      productName: "Cemento CPC 30R Plus",
      variant: "Uso estructural 50kg",
      price: { value: 255, currency: "MXN", unit: "saco" },
      co2: { value: 0.48, unit: "tCO2e", level: "Bajo", verified: true },
      supplier: {
        name: "Cemex Ramos Arizpe",
        location: "Coahuila, MX",
        address: "Zona Industrial Ramos Arizpe",
        logo: "CX",
        phone: "+52 844 488 2200",
        rating: 4.7,
      },
      delivery: { minDays: 2, maxDays: 4 },
    },
    {
      offerId: "c6",
      stepId: "cemento",
      productName: "Cemento Alta Durabilidad",
      variant: "Ambientes húmedos",
      price: { value: 300, currency: "MXN", unit: "saco" },
      co2: { value: 0.62, unit: "tCO2e", level: "Medio", verified: false },
      supplier: {
        name: "Moctezuma Cementos",
        location: "Veracruz, MX",
        address: "Carretera Córdoba-Orizaba Km 6",
        logo: "M",
        phone: "+52 271 720 1100",
        rating: 4.4,
      },
      delivery: { minDays: 3, maxDays: 6 },
    },
    {
      offerId: "c7",
      stepId: "cemento",
      productName: "Cemento Verde Plus",
      variant: "Reducción CO₂ 30%",
      price: { value: 320, currency: "MXN", unit: "saco" },
      co2: { value: 0.28, unit: "tCO2e", level: "Muy Bajo", verified: true },
      supplier: {
        name: "Holcim ECO Solutions",
        location: "Edo. Méx.",
        address: "Parque Industrial Toluca",
        logo: "HE",
        phone: "+52 722 215 9000",
        rating: 4.9,
      },
      delivery: { minDays: 4, maxDays: 7 },
    },
    {
      offerId: "p4",
      stepId: "piso",
      productName: "Porcelanato Tipo Madera",
      variant: "20x120cm",
      price: { value: 690, currency: "MXN", unit: "m2" },
      co2: { value: 3.1, unit: "kgCO2e", level: "Medio", verified: false },
      supplier: {
        name: "Interceramic León",
        location: "León, GTO",
        address: "Blvd. Torres Landa 4500",
        logo: "I",
        phone: "+52 477 710 3300",
        rating: 4.8,
      },
      delivery: { minDays: 6, maxDays: 10 },
    },
    {
      offerId: "p5",
      stepId: "piso",
      productName: "Piso Cerámico Económico",
      variant: "45x45cm",
      price: { value: 220, currency: "MXN", unit: "m2" },
      co2: { value: 4.5, unit: "kgCO2e", level: "Alto", verified: false },
      supplier: {
        name: "Cerámica Santa Julia",
        location: "Tlaxcala, MX",
        address: "Zona Industrial Xicohténcatl",
        logo: "SJ",
        phone: "+52 246 465 2200",
        rating: 4.1,
      },
      delivery: { minDays: 5, maxDays: 8 },
    },
    {
      offerId: "p6",
      stepId: "piso",
      productName: "Porcelanato Técnico Sustentable",
      variant: "80x80cm",
      price: { value: 890, currency: "MXN", unit: "m2" },
      co2: { value: 1.9, unit: "kgCO2e", level: "Bajo", verified: true },
      supplier: {
        name: "GreenTile México",
        location: "Querétaro, QRO",
        address: "Parque Industrial Querétaro",
        logo: "GT",
        phone: "+52 442 399 8822",
        rating: 4.9,
      },
      delivery: { minDays: 7, maxDays: 12 },
    },
    {
      offerId: "pt4",
      stepId: "pintura",
      productName: "Pintura Acrílica Lavable",
      variant: "Interior",
      price: { value: 1050, currency: "MXN", unit: "cubeta" },
      co2: { value: 0.3, unit: "kgCO2e", level: "Medio", verified: false },
      supplier: {
        name: "Osel Monterrey",
        location: "Monterrey, NL",
        address: "Av. Lincoln 3200",
        logo: "O",
        phone: "+52 81 8333 1100",
        rating: 4.5,
      },
      delivery: { minDays: 1, maxDays: 3 },
    },
    {
      offerId: "pt5",
      stepId: "pintura",
      productName: "Pintura Ecológica Base Agua",
      variant: "Interior / Exterior",
      price: { value: 1420, currency: "MXN", unit: "cubeta" },
      co2: { value: 0.08, unit: "kgCO2e", level: "Muy Bajo", verified: true },
      supplier: {
        name: "Berel Sustentable",
        location: "Saltillo, COAH",
        address: "Blvd. Venustiano Carranza 5500",
        logo: "BS",
        phone: "+52 844 410 8800",
        rating: 4.9,
      },
      delivery: { minDays: 2, maxDays: 4 },
    },
    {
      offerId: "l2",
      stepId: "ladrillo",
      productName: "Ladrillo Rojo Recocido",
      variant: "Tradicional",
      price: { value: 9.5, currency: "MXN", unit: "pza" },
      co2: { value: 1.4, unit: "kgCO2e", level: "Alto", verified: false },
      supplier: {
        name: "Ladrillera San José",
        location: "San Luis Potosí, SLP",
        address: "Camino a Peñasco Km 3",
        logo: "LSJ",
        phone: "+52 444 210 3344",
        rating: 4.0,
      },
      delivery: { minDays: 3, maxDays: 6 },
    },
    {
      offerId: "l3",
      stepId: "ladrillo",
      productName: "Block Ecológico Celular",
      variant: "Aislante térmico",
      price: { value: 32, currency: "MXN", unit: "pza" },
      co2: { value: 0.45, unit: "kgCO2e", level: "Muy Bajo", verified: true },
      supplier: {
        name: "EcoBlock México",
        location: "Querétaro, QRO",
        address: "Parque Industrial El Marqués",
        logo: "EB",
        phone: "+52 442 299 4400",
        rating: 4.8,
      },
      delivery: { minDays: 4, maxDays: 7 },
    },
    {
      offerId: "a2",
      stepId: "aislante",
      productName: "Lana Mineral Térmica",
      variant: "Rollo 1.20x15m",
      price: { value: 1680, currency: "MXN", unit: "rollo" },
      co2: { value: 2.3, unit: "kgCO2e", level: "Medio", verified: false },
      supplier: {
        name: "ThermoBuild México",
        location: "Tlalnepantla, EDOMEX",
        address: "Av. Gustavo Baz 200",
        logo: "TB",
        phone: "+52 55 5390 1122",
        rating: 4.6,
      },
      delivery: { minDays: 3, maxDays: 5 },
    },
    {
      offerId: "a3",
      stepId: "aislante",
      productName: "Aislante PET Reciclado",
      variant: "Alta eficiencia",
      price: { value: 1890, currency: "MXN", unit: "rollo" },
      co2: { value: 0.6, unit: "kgCO2e", level: "Muy Bajo", verified: true },
      supplier: {
        name: "GreenFoam LATAM",
        location: "CDMX",
        address: "Iztapalapa, Zona Industrial",
        logo: "GF",
        phone: "+52 55 5522 7788",
        rating: 4.9,
      },
      delivery: { minDays: 5, maxDays: 8 },
    },
    {
      offerId: "c8",
      stepId: "cemento",
      productName: "Cemento CPC 30R Económico",
      variant: "Obra gris 50kg",
      price: { value: 235, currency: "MXN", unit: "saco" },
      co2: { value: 0.65, unit: "tCO2e", level: "Alto", verified: false },
      supplier: {
        name: "Cementos del Norte",
        location: "Durango, DGO",
        address: "Carretera Durango-Gómez Km 12",
        logo: "CN",
        phone: "+52 618 123 7788",
        rating: 4.1,
      },
      delivery: { minDays: 2, maxDays: 5 },
    },
    {
      offerId: "c9",
      stepId: "cemento",
      productName: "Cemento Resistente Sulfatos",
      variant: "Infraestructura",
      price: { value: 345, currency: "MXN", unit: "saco" },
      co2: { value: 0.52, unit: "tCO2e", level: "Medio", verified: true },
      supplier: {
        name: "Cemex Infra",
        location: "Tamaulipas, MX",
        address: "Puerto Industrial Altamira",
        logo: "CI",
        phone: "+52 833 200 9911",
        rating: 4.6,
      },
      delivery: { minDays: 4, maxDays: 7 },
    },
    {
      offerId: "c10",
      stepId: "cemento",
      productName: "Cemento Bajo Clinker",
      variant: "Tecnología LC3",
      price: { value: 330, currency: "MXN", unit: "saco" },
      co2: { value: 0.25, unit: "tCO2e", level: "Muy Bajo", verified: true },
      supplier: {
        name: "EcoCement LATAM",
        location: "Puebla, PUE",
        address: "Parque Industrial Huejotzingo",
        logo: "EC",
        phone: "+52 222 501 2200",
        rating: 4.9,
      },
      delivery: { minDays: 5, maxDays: 9 },
    },
    {
      offerId: "p7",
      stepId: "piso",
      productName: "Porcelanato Pulido Blanco",
      variant: "90x90cm",
      price: { value: 980, currency: "MXN", unit: "m2" },
      co2: { value: 2.4, unit: "kgCO2e", level: "Bajo", verified: true },
      supplier: {
        name: "Luxury Tile México",
        location: "Zapopan, JAL",
        address: "Av. Aviación 6200",
        logo: "LT",
        phone: "+52 33 3888 4400",
        rating: 4.9,
      },
      delivery: { minDays: 8, maxDays: 12 },
    },
    {
      offerId: "p8",
      stepId: "piso",
      productName: "Piso Cerámico Antiderrapante",
      variant: "Zona húmeda",
      price: { value: 350, currency: "MXN", unit: "m2" },
      co2: { value: 4.0, unit: "kgCO2e", level: "Alto", verified: false },
      supplier: {
        name: "Cerámica del Pacífico",
        location: "Mazatlán, SIN",
        address: "Zona Industrial Bonfil",
        logo: "CPAC",
        phone: "+52 669 988 1133",
        rating: 4.2,
      },
      delivery: { minDays: 6, maxDays: 9 },
    },
    {
      offerId: "p9",
      stepId: "piso",
      productName: "Recubrimiento Cementicio",
      variant: "Estilo industrial",
      price: { value: 560, currency: "MXN", unit: "m2" },
      co2: { value: 1.6, unit: "kgCO2e", level: "Muy Bajo", verified: true },
      supplier: {
        name: "UrbanSurface",
        location: "CDMX",
        address: "Col. Doctores",
        logo: "US",
        phone: "+52 55 4900 8800",
        rating: 4.8,
      },
      delivery: { minDays: 4, maxDays: 6 },
    },
    {
      offerId: "pt6",
      stepId: "pintura",
      productName: "Pintura Acrílica Antihongos",
      variant: "Baños y cocinas",
      price: { value: 1180, currency: "MXN", unit: "cubeta" },
      co2: { value: 0.18, unit: "kgCO2e", level: "Bajo", verified: true },
      supplier: {
        name: "Comex Pro",
        location: "Toluca, EDOMEX",
        address: "Av. Industria Automotriz 320",
        logo: "CP",
        phone: "+52 722 270 5500",
        rating: 4.7,
      },
      delivery: { minDays: 1, maxDays: 3 },
    },
    {
      offerId: "pt7",
      stepId: "pintura",
      productName: "Pintura Elastomérica",
      variant: "Impermeable",
      price: { value: 1650, currency: "MXN", unit: "cubeta" },
      co2: { value: 0.4, unit: "kgCO2e", level: "Medio", verified: false },
      supplier: {
        name: "Osel Tech",
        location: "Querétaro, QRO",
        address: "Blvd. Bernardo Quintana 1800",
        logo: "OT",
        phone: "+52 442 390 1122",
        rating: 4.4,
      },
      delivery: { minDays: 3, maxDays: 5 },
    },
    {
      offerId: "l4",
      stepId: "ladrillo",
      productName: "Block Macizo de Concreto",
      variant: "Alta resistencia",
      price: { value: 24, currency: "MXN", unit: "pza" },
      co2: { value: 1.1, unit: "kgCO2e", level: "Medio", verified: false },
      supplier: {
        name: "Prefabricados del Centro",
        location: "Cuautitlán, EDOMEX",
        address: "Zona Industrial Xhala",
        logo: "PC",
        phone: "+52 55 5870 3399",
        rating: 4.3,
      },
      delivery: { minDays: 2, maxDays: 4 },
    },
    {
      offerId: "l5",
      stepId: "ladrillo",
      productName: "Ladrillo Ecológico Compactado",
      variant: "Tierra-cemento",
      price: { value: 14, currency: "MXN", unit: "pza" },
      co2: { value: 0.35, unit: "kgCO2e", level: "Muy Bajo", verified: true },
      supplier: {
        name: "BioConstrucción MX",
        location: "Oaxaca, OAX",
        address: "Santa Cruz Xoxocotlán",
        logo: "BC",
        phone: "+52 951 220 9988",
        rating: 4.9,
      },
      delivery: { minDays: 5, maxDays: 8 },
    },
    {
      offerId: "a4",
      stepId: "aislante",
      productName: "Espuma Poliuretano Proyectada",
      variant: "Alta densidad",
      price: { value: 2100, currency: "MXN", unit: "rollo" },
      co2: { value: 3.5, unit: "kgCO2e", level: "Alto", verified: false },
      supplier: {
        name: "IsoBuild Systems",
        location: "San Nicolás, NL",
        address: "Av. Universidad 1800",
        logo: "IB",
        phone: "+52 81 8350 4400",
        rating: 4.2,
      },
      delivery: { minDays: 3, maxDays: 6 },
    },
    {
      offerId: "a5",
      stepId: "aislante",
      productName: "Aislante Natural de Celulosa",
      variant: "Reciclado",
      price: { value: 1750, currency: "MXN", unit: "rollo" },
      co2: { value: 0.4, unit: "kgCO2e", level: "Muy Bajo", verified: true },
      supplier: {
        name: "EcoTherm México",
        location: "Morelia, MICH",
        address: "Ciudad Industrial",
        logo: "ET",
        phone: "+52 443 310 7766",
        rating: 4.8,
      },
      delivery: { minDays: 6, maxDays: 9 },
    },
  ];

  let results = [...database];

  // 1. Filtrado por Búsqueda de Texto
  if (query && query.trim() !== "") {
    const lowerQuery = query.toLowerCase();
    results = results.filter(
      (item) =>
        item.productName.toLowerCase().includes(lowerQuery) ||
        item.stepId.toLowerCase().includes(lowerQuery) ||
        item.supplier.name.toLowerCase().includes(lowerQuery),
    );
  }

  // 2. Filtrado por Categoría (Step)
  if (filters.stepId) {
    results = results.filter((item) => item.stepId === filters.stepId);
  }

  // 3. Filtrado por Precio Máximo
  if (filters.maxPrice) {
    results = results.filter((item) => item.price.value <= filters.maxPrice);
  }

  // 4. Filtrado por Nivel de CO2
  if (filters.co2Levels && filters.co2Levels.length > 0) {
    results = results.filter((item) =>
      filters.co2Levels.includes(item.co2.level),
    );
  }

  // 5. Ordenamiento
  if (filters.sortBy) {
    results.sort((a, b) => {
      if (filters.sortBy === "price_asc") return a.price.value - b.price.value;
      if (filters.sortBy === "price_desc") return b.price.value - a.price.value;
      if (filters.sortBy === "co2_asc") return a.co2.value - b.co2.value;
      return 0;
    });
  }

  return results;
};

const MaterialService = {
  getProjectSteps: async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return [
      { id: "cemento", label: "Cemento", unit: "t", required: true },
      { id: "piso", label: "Piso / Recubrimiento", unit: "m2", required: true },
      { id: "pintura", label: "Pintura", unit: "L", required: true },
      {
        id: "ladrillo",
        label: "Ladrillo / Block",
        unit: "pza",
        required: false,
      },
      {
        id: "aislante",
        label: "Aislante Térmico",
        unit: "rollo",
        required: false,
      },
    ];
  },

  // Obtiene productos aplicando filtros globales o por paso
  fetchOffers: async (query, filters) => {
    return await searchProductsFromBackend(query, filters);
  },
};

// --- COMPONENTES DE UI ---

const CO2Badge = ({ level, value, unit }) => {
  const colors = {
    Bajo: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Medio: "bg-amber-100 text-amber-700 border-amber-200",
    Alto: "bg-rose-100 text-rose-700 border-rose-200",
  };

  return (
    <div
      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold ${colors[level]}`}
    >
      <Leaf size={10} fill="currentColor" className="opacity-80" />
      <span>
        {value} {unit}
      </span>
    </div>
  );
};

const SupplierLogo = ({ supplier, size = "md" }) => {
  const sizeClasses = {
    sm: "w-6 h-6 text-[8px]",
    md: "w-8 h-8 text-xs",
    lg: "w-20 h-20 text-2xl",
  }[size];

  return (
    <div
      className={`${sizeClasses} rounded-xl bg-slate-900 flex items-center justify-center text-white font-bold`}
    >
      {supplier.logo}
    </div>
  );
};

const ProductCard = ({
  offer,
  isSelected,
  onSelect,
  onShowDetails,
  compact = false,
}) => {
  return (
    <div
      className={`relative group transition-all duration-300 rounded-2xl border-2 p-5 bg-white shadow-sm hover:shadow-md ${
        isSelected ? "border-blue-600 ring-4 ring-blue-50" : "border-slate-100"
      }`}
    >
      <div onClick={() => onSelect(offer)} className="cursor-pointer">
        {isSelected && (
          <div className="absolute top-4 right-4 text-blue-600 animate-in zoom-in duration-300">
            <CheckCircle2
              size={24}
              fill="currentColor"
              className="text-white fill-blue-600"
            />
          </div>
        )}

        <div className="flex flex-col gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {compact && (
                <span className="text-[10px] font-bold text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded">
                  {offer.stepId}
                </span>
              )}
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 leading-tight">
              {offer.productName}
            </h3>
            <p className="text-slate-500 font-medium text-sm">
              {offer.variant}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-2xl font-black text-slate-900">
              ${offer.price.value}{" "}
              <span className="text-sm font-normal text-slate-500">
                / {offer.price.unit}
              </span>
            </div>
            <CO2Badge {...offer.co2} />
          </div>

          <hr className="border-slate-100" />
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-3">
          <SupplierLogo supplier={offer.supplier} />
          <div>
            <p className="text-sm font-bold text-slate-800 leading-tight">
              {offer.supplier.name}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onShowDetails(offer.supplier);
              }}
              className="text-[10px] text-blue-600 font-bold uppercase tracking-wider hover:underline flex items-center gap-1"
            >
              Info <Info size={10} />
            </button>
          </div>
        </div>
        {!compact && (
          <div className="flex items-center gap-1 text-slate-500 text-xs font-semibold">
            <Truck size={14} className="text-blue-500" />
            <span>
              {offer.delivery.minDays}-{offer.delivery.maxDays} d
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

// --- VISTA DETALLE EMPRESA ---

const SupplierDetailView = ({ supplier, onClose }) => {
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(supplier.address)}&output=embed`;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col gap-6 max-w-5xl mx-auto w-full">
      <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[500px]">
        <div className="md:w-5/12 p-8 flex flex-col bg-white border-r border-slate-100">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold mb-6 group text-sm"
          >
            <ArrowLeft size={18} /> Volver
          </button>
          <div className="flex flex-col gap-4">
            <SupplierLogo supplier={supplier} size="lg" />
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              {supplier.name}
            </h2>
            <div className="flex items-center gap-2 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-black w-fit">
              ★ {supplier.rating} VERIFICADO
            </div>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">
              Infraestructura certificada para proyectos de alta escala.
            </p>
            <div className="space-y-3 mt-4">
              <div className="p-4 bg-slate-50 rounded-2xl flex items-start gap-3">
                <MapPin className="text-blue-600" size={18} />
                <p className="text-xs font-bold text-slate-800">
                  {supplier.address}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-7/12 bg-slate-100 relative">
          <iframe
            title="map"
            width="100%"
            height="100%"
            frameBorder="0"
            src={mapEmbedUrl}
            className="w-full h-full grayscale-[0.3]"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

// --- APP PRINCIPAL ---

export default function App() {
  const router = useRouter();
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentOffers, setCurrentOffers] = useState([]);
  const [cart, setCart] = useState({});
  const [view, setView] = useState("selection");
  const [activeSupplierDetail, setActiveSupplierDetail] = useState(null);

  // Estados de Búsqueda y Filtros
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [filters, setFilters] = useState({
    maxPrice: 2000,
    co2Levels: [], // ['Bajo', 'Medio', 'Alto']
    sortBy: "price_asc",
  });

  const [isSearching, setIsSearching] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loading, setLoading] = useState({ steps: true, offers: false });

  // 1. Cargar pasos del proyecto
  useEffect(() => {
    const init = async () => {
      setLoading((prev) => ({ ...prev, steps: true }));
      const projectSteps = await MaterialService.getProjectSteps();
      setSteps(projectSteps);
      setLoading((prev) => ({ ...prev, steps: false }));
    };
    init();
  }, []);

  // 2. Efecto centralizado para cargar ofertas (Step View o Global Search) con filtros
  useEffect(() => {
    if (steps.length === 0) return;

    const loadData = async () => {
      // Si el usuario está buscando, no filtramos por stepId a menos que quiera
      const activeFilters = isSearching
        ? filters
        : { ...filters, stepId: steps[currentStepIndex].id };

      setLoading((prev) => ({ ...prev, offers: true }));
      if (isSearching) setLoadingSearch(true);

      const results = await MaterialService.fetchOffers(
        searchQuery,
        activeFilters,
      );

      setCurrentOffers(results);
      setLoading((prev) => ({ ...prev, offers: false }));
      setLoadingSearch(false);
    };

    const delayDebounce = setTimeout(loadData, 400);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery, filters, currentStepIndex, steps, isSearching, view]);

  // Sincronizar estado isSearching con la query
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [searchQuery]);

  const currentStep = steps[currentStepIndex];
  const progress =
    steps.length > 0 ? ((currentStepIndex + 1) / steps.length) * 100 : 0;

  const handleSelect = (offer) => {
    setCart((prev) => ({ ...prev, [offer.stepId]: offer }));
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      setActiveSupplierDetail(null);
    } else {
      setView("cart");
    }
  };

  const toggleCO2Filter = (level) => {
    setFilters((prev) => ({
      ...prev,
      co2Levels: prev.co2Levels.includes(level)
        ? prev.co2Levels.filter((l) => l !== level)
        : [...prev.co2Levels, level],
    }));
  };

  if (loading.steps) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <Loader2 className="text-blue-600 animate-spin" size={40} />
        <p className="text-slate-500 font-bold">Cargando proyecto...</p>
      </div>
    );
  }

  if (view === "selection") {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
        <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-6 py-4">
          <div className="max-w-6xl mx-auto flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-black tracking-tight flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-[10px]">
                  M
                </div>
                MAT-CONFIGURATOR
              </h1>

              {/* Barra de Búsqueda y Botón Filtros */}
              <div className="flex-1 max-w-xl mx-8 hidden md:flex items-center gap-2">
                <div className="relative flex-1 group">
                  <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Busca material, marca o categoría..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-2.5 bg-slate-100 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
                <button
                  onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                  className={`p-2.5 rounded-2xl border-2 transition-all flex items-center gap-2 font-bold text-xs ${
                    isFilterPanelOpen || filters.co2Levels.length > 0
                      ? "border-blue-600 bg-blue-50 text-blue-600"
                      : "border-slate-100 bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  <Filter size={18} />
                  Filtros
                </button>
              </div>

              <button
                onClick={() => setView("cart")}
                className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white hover:bg-black rounded-xl transition-colors text-sm font-bold shadow-lg shadow-slate-200"
              >
                <ShoppingCart size={16} />
                <span className="hidden sm:inline">
                  ({Object.keys(cart).length})
                </span>
              </button>
            </div>

            {/* Panel de Filtros Expandible */}
            {isFilterPanelOpen && (
              <div className="animate-in slide-in-from-top-4 duration-300 bg-slate-50 rounded-3xl p-6 border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-8 mb-2">
                {/* Rango de Precio */}
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Precio Máximo: ${filters.maxPrice}
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="5000"
                    step="50"
                    value={filters.maxPrice}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        maxPrice: parseInt(e.target.value),
                      }))
                    }
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-slate-400">
                    <span>$100</span>
                    <span>$5000+</span>
                  </div>
                </div>

                {/* Niveles de CO2 */}
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Contaminación (CO2e)
                  </label>
                  <div className="flex gap-2">
                    {["Bajo", "Medio", "Alto"].map((level) => (
                      <button
                        key={level}
                        onClick={() => toggleCO2Filter(level)}
                        className={`flex-1 py-2 rounded-xl text-[10px] font-black border-2 transition-all ${
                          filters.co2Levels.includes(level)
                            ? "bg-blue-600 border-blue-600 text-white"
                            : "bg-white border-slate-100 text-slate-400 hover:border-slate-200"
                        }`}
                      >
                        {level.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ordenamiento */}
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none flex items-center gap-2">
                    <ArrowUpDown size={12} /> Ordenar por
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        sortBy: e.target.value,
                      }))
                    }
                    className="bg-white border-2 border-slate-100 rounded-xl p-2.5 text-xs font-bold text-slate-700 focus:ring-0 outline-none cursor-pointer"
                  >
                    <option value="price_asc">Menor precio</option>
                    <option value="price_desc">Mayor precio</option>
                    <option value="co2_asc">Sostenibilidad (Menor CO2)</option>
                  </select>
                </div>
              </div>
            )}

            {!activeSupplierDetail && !isSearching && (
              <div className="animate-in slide-in-from-top-2 duration-300">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xl font-black text-slate-800 uppercase tracking-tighter">
                    {currentStepIndex + 1}.{" "}
                    <span className="text-blue-600">{currentStep?.label}</span>
                  </span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                    STEP {currentStepIndex + 1}/{steps.length}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all duration-700"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 max-w-7xl mx-auto w-full p-6 pb-32">
          {activeSupplierDetail ? (
            <SupplierDetailView
              supplier={activeSupplierDetail}
              onClose={() => setActiveSupplierDetail(null)}
            />
          ) : (
            <>
              {isSearching && (
                <div className="flex items-center justify-between mb-8 animate-in fade-in duration-300">
                  <h2 className="text-2xl font-black text-slate-900">
                    Resultados Globales
                  </h2>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-sm font-bold text-blue-600 flex items-center gap-2"
                  >
                    <ArrowLeft size={16} /> Cerrar búsqueda
                  </button>
                </div>
              )}

              {loading.offers || loadingSearch ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <Loader2 className="text-blue-600 animate-spin" size={32} />
                  <p className="text-slate-400 font-bold">
                    Consultando al servidor...
                  </p>
                </div>
              ) : currentOffers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {currentOffers.map((offer) => (
                    <ProductCard
                      key={offer.offerId}
                      offer={offer}
                      isSelected={cart[offer.stepId]?.offerId === offer.offerId}
                      onSelect={handleSelect}
                      onShowDetails={setActiveSupplierDetail}
                      compact={isSearching}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-slate-100 animate-in fade-in zoom-in-95 duration-500">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                    <AlertCircle size={40} className="text-slate-300" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-800">
                    Sin coincidencias
                  </h2>
                  <p className="text-slate-400 text-sm max-w-xs mt-3 font-medium leading-relaxed">
                    No encontramos productos que coincidan con tus filtros
                    actuales. Prueba ajustando el precio o seleccionando otros
                    niveles de CO2.
                  </p>
                  <button
                    onClick={() => {
                      setFilters({
                        maxPrice: 2000,
                        co2Levels: [],
                        sortBy: "price_asc",
                      });
                      setSearchQuery("");
                    }}
                    className="mt-8 px-8 py-3 bg-slate-900 text-white rounded-2xl text-xs font-bold transition-transform active:scale-95"
                  >
                    Restablecer todo
                  </button>
                </div>
              )}
            </>
          )}
        </main>

        {!activeSupplierDetail && !isSearching && (
          <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-200 p-4 z-40">
            <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
              <div className="hidden sm:flex items-center gap-4">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-1 leading-none">
                    Selección actual
                  </p>
                  <p className="text-sm font-black text-slate-800 leading-none truncate max-w-[150px]">
                    {cart[currentStep?.id]
                      ? cart[currentStep.id].productName
                      : "---"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() =>
                    currentStepIndex > 0 &&
                    setCurrentStepIndex(currentStepIndex - 1)
                  }
                  disabled={currentStepIndex === 0}
                  className="flex-1 sm:flex-none px-6 py-3 border border-slate-200 rounded-2xl font-black hover:bg-slate-50 disabled:opacity-30 text-sm"
                >
                  Anterior
                </button>

                <button
                  onClick={handleNext}
                  className={`flex-1 sm:flex-none px-10 py-3 rounded-2xl font-black text-sm shadow-xl transition-all ${
                    cart[currentStep?.id] || !currentStep?.required
                      ? "bg-blue-600 text-white shadow-blue-200 hover:bg-blue-700"
                      : "bg-slate-100 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  {currentStepIndex === steps.length - 1
                    ? "Revisar Carrito"
                    : "Siguiente"}
                </button>
              </div>
            </div>
          </footer>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <header className="bg-white border-b border-slate-200 px-6 py-8 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => setView("selection")}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold text-sm"
          >
            <ChevronLeft size={20} /> Configurador
          </button>
          <h1 className="text-3xl font-black text-slate-900">Resumen</h1>
          <div className="w-20 hidden sm:block"></div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full p-6 pb-32">
        <div className="flex flex-col gap-8">
          {steps.map((step) => {
            const selectedItem = cart[step.id];
            return (
              <section key={step.id}>
                <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-2">
                  {step.label}
                </h2>
                {selectedItem ? (
                  <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                      <SupplierLogo
                        supplier={selectedItem.supplier}
                        size="md"
                      />
                      <div>
                        <h3 className="text-lg font-black text-slate-900 leading-tight">
                          {selectedItem.productName}
                        </h3>
                        <p className="text-sm font-bold text-slate-500 mb-2">
                          {selectedItem.variant}
                        </p>
                        <CO2Badge {...selectedItem.co2} />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-black text-slate-900 mr-4">
                        ${selectedItem.price.value}
                      </span>
                      <button
                        onClick={() => {
                          setView("selection");
                          setCurrentStepIndex(
                            steps.findIndex((s) => s.id === step.id),
                          );
                        }}
                        className="p-3 rounded-2xl bg-blue-50 text-blue-600 font-black hover:bg-blue-100 transition-all"
                      >
                        <RefreshCw size={20} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setView("selection");
                      setCurrentStepIndex(
                        steps.findIndex((s) => s.id === step.id),
                      );
                    }}
                    className="w-full bg-slate-100/50 border-2 border-dashed border-slate-200 rounded-3xl p-6 flex items-center justify-center gap-3 text-slate-400 hover:bg-white hover:border-blue-400 transition-all"
                  >
                    <span className="font-black uppercase text-[10px] tracking-widest">
                      + Añadir {step.label}
                    </span>
                  </button>
                )}
              </section>
            );
          })}
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-6 shadow-2xl z-40">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
              Inversión estimada
            </span>
            <span className="text-3xl font-black text-slate-900">
              $
              {Object.values(cart)
                .reduce((a, c) => a + c.price.value, 0)
                .toLocaleString()}{" "}
              <small className="text-sm font-normal opacity-50">MXN</small>
            </span>
          </div>
          <button
            onClick={() => router.push("/step1")}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-4 py-2.5 text-xs md:text-sm font-semibold text-slate-900 shadow-sm hover:bg-emerald-300 transition-colors"
          >
            Visualizar opciones óptimas
            <ArrowRight size={16} />
          </button>
        </div>
      </footer>
    </div>
  );
}
