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

// --- CAPA DE SERVICIOS (LÓGICA DE BACKEND SEPARADA) ---

/**
 * Función principal de búsqueda y filtrado.
 * Esta lógica simula el procesamiento que haría un Backend (SQL/NoSQL).
 */
const searchProductsFromBackend = async (query, filters = {}) => {
  await new Promise((resolve) => setTimeout(resolve, 600));

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

  // ===================== MUROS Y FACHADAS =====================
  {
    offerId: "o010",
    stepId: "ladrillo",
    productName: "Block Hueco",
    variant: "12x20x40 cm",
    price: { value: 19.5, currency: "MXN", unit: "pza" },
    co2: { value: 0.003, unit: "tCO2e", level: "Bajo", verified: false },
    supplier: {
      name: "Blockera La Central",
      location: "Mérida, YUC",
      address: "Calle 60 #410, YUC",
      logo: "BC",
      phone: "+52 999 300 4410",
      rating: 4.4,
    },
    delivery: { minDays: 2, maxDays: 5 },
  },
  {
    offerId: "o011",
    stepId: "tablaroca",
    productName: "Panel de Yeso",
    variant: "Estándar 12.7mm (1.22x2.44m)",
    price: { value: 189, currency: "MXN", unit: "panel" },
    co2: { value: 0.01, unit: "tCO2e", level: "Bajo", verified: true },
    supplier: {
      name: "Drywall Pro MX",
      location: "Tijuana, BC",
      address: "Av. Las Torres 55, BC",
      logo: "DP",
      phone: "+52 664 210 5055",
      rating: 4.6,
    },
    delivery: { minDays: 1, maxDays: 3 },
  },
  {
    offerId: "o012",
    stepId: "fachada",
    productName: "Fachada Ventilada",
    variant: "Panel cerámico 60x120",
    price: { value: 1650, currency: "MXN", unit: "m2" },
    co2: { value: 0.06, unit: "tCO2e", level: "Medio", verified: true },
    supplier: {
      name: "Fachadas Urbanas",
      location: "CDMX",
      address: "Insurgentes Sur 1250, CDMX",
      logo: "FU",
      phone: "+52 55 4100 1250",
      rating: 4.8,
    },
    delivery: { minDays: 5, maxDays: 12 },
  },
  {
    offerId: "o013",
    stepId: "impermeabilizante",
    productName: "Impermeabilizante Acrílico",
    variant: "3 años, cubeta 19L",
    price: { value: 980, currency: "MXN", unit: "cubeta" },
    co2: { value: 0.02, unit: "tCO2e", level: "Bajo", verified: false },
    supplier: {
      name: "Recubrimientos Atlas",
      location: "Monterrey, NL",
      address: "Av. Techos 301, NL",
      logo: "RA",
      phone: "+52 81 2200 0301",
      rating: 4.2,
    },
    delivery: { minDays: 2, maxDays: 4 },
  },
  {
    offerId: "o014",
    stepId: "aislante_termico",
    productName: "Aislante Térmico",
    variant: "Lana mineral 50mm",
    price: { value: 185, currency: "MXN", unit: "m2" },
    co2: { value: 0.008, unit: "tCO2e", level: "Bajo", verified: true },
    supplier: {
      name: "Aislamientos Noroeste",
      location: "Hermosillo, SON",
      address: "Blvd. Energía 77, SON",
      logo: "AN",
      phone: "+52 662 300 0077",
      rating: 4.5,
    },
    delivery: { minDays: 3, maxDays: 6 },
  },
  {
    offerId: "o015",
    stepId: "aislante_acustico",
    productName: "Aislante Acústico",
    variant: "Panel PET reciclado 25mm",
    price: { value: 245, currency: "MXN", unit: "m2" },
    co2: { value: 0.004, unit: "tCO2e", level: "Bajo", verified: true },
    supplier: {
      name: "EcoAcústica MX",
      location: "Querétaro, QRO",
      address: "Circuito Sustentable 12, QRO",
      logo: "EA",
      phone: "+52 442 310 0012",
      rating: 4.7,
    },
    delivery: { minDays: 4, maxDays: 7 },
  },

  // ===================== ACABADOS =====================
  {
    offerId: "o016",
    stepId: "piso",
    productName: "Piso Porcelanato",
    variant: "60x60 mate",
    price: { value: 385, currency: "MXN", unit: "m2" },
    co2: { value: 0.02, unit: "tCO2e", level: "Medio", verified: true },
    supplier: {
      name: "Cerámicos del Centro",
      location: "San Luis Potosí, SLP",
      address: "Av. Azulejo 210, SLP",
      logo: "CC",
      phone: "+52 444 220 0210",
      rating: 4.5,
    },
    delivery: { minDays: 3, maxDays: 8 },
  },
  {
    offerId: "o017",
    stepId: "pintura",
    productName: "Pintura Vinílica",
    variant: "Interior mate 19L",
    price: { value: 790, currency: "MXN", unit: "cubeta" },
    co2: { value: 0.01, unit: "tCO2e", level: "Bajo", verified: false },
    supplier: {
      name: "Pinturas Horizonte",
      location: "CDMX",
      address: "Calz. La Viga 900, CDMX",
      logo: "PH",
      phone: "+52 55 2900 0900",
      rating: 4.4,
    },
    delivery: { minDays: 1, maxDays: 3 },
  },
  {
    offerId: "o018",
    stepId: "plafon",
    productName: "Plafón Registrable",
    variant: "Fibra mineral 60x60",
    price: { value: 165, currency: "MXN", unit: "m2" },
    co2: { value: 0.006, unit: "tCO2e", level: "Bajo", verified: true },
    supplier: {
      name: "Interiores Pro",
      location: "Guadalajara, JAL",
      address: "Av. Diseño 144, JAL",
      logo: "IP",
      phone: "+52 33 3100 0144",
      rating: 4.6,
    },
    delivery: { minDays: 3, maxDays: 6 },
  },
  {
    offerId: "o019",
    stepId: "barandales",
    productName: "Barandal de Acero Inoxidable",
    variant: "Satín con pasamanos",
    price: { value: 980, currency: "MXN", unit: "m" },
    co2: { value: 0.03, unit: "tCO2e", level: "Medio", verified: false },
    supplier: {
      name: "Herreria Metropolitana",
      location: "Monterrey, NL",
      address: "Av. Forja 321, NL",
      logo: "HM",
      phone: "+52 81 3300 0321",
      rating: 4.2,
    },
    delivery: { minDays: 6, maxDays: 12 },
  },

  // ===================== CARPINTERÍA / CANCELERÍA =====================
  {
    offerId: "o020",
    stepId: "puertas",
    productName: "Puerta de Seguridad",
    variant: "Metal + aislamiento",
    price: { value: 3450, currency: "MXN", unit: "pza" },
    co2: { value: 0.05, unit: "tCO2e", level: "Medio", verified: true },
    supplier: {
      name: "Puertas Seguras MX",
      location: "Puebla, PUE",
      address: "Av. Umbral 14, PUE",
      logo: "PS",
      phone: "+52 222 310 0014",
      rating: 4.6,
    },
    delivery: { minDays: 5, maxDays: 10 },
  },
  {
    offerId: "o021",
    stepId: "ventanas",
    productName: "Cancel de Aluminio",
    variant: "Serie 70 con vidrio 6mm",
    price: { value: 1550, currency: "MXN", unit: "m2" },
    co2: { value: 0.04, unit: "tCO2e", level: "Medio", verified: false },
    supplier: {
      name: "Aluminio y Cristal Norte",
      location: "Monterrey, NL",
      address: "Av. Vidrio 88, NL",
      logo: "AC",
      phone: "+52 81 2000 0088",
      rating: 4.3,
    },
    delivery: { minDays: 7, maxDays: 14 },
  },

  // ===================== INSTALACIÓN ELÉCTRICA =====================
  {
    offerId: "o022",
    stepId: "cableado",
    productName: "Cable THW-LS",
    variant: "Calibre 12 AWG (100m)",
    price: { value: 1450, currency: "MXN", unit: "rollo" },
    co2: { value: 0.02, unit: "tCO2e", level: "Bajo", verified: true },
    supplier: {
      name: "Eléctrico Industrial MX",
      location: "CDMX",
      address: "Av. Corriente 210, CDMX",
      logo: "EI",
      phone: "+52 55 2100 0210",
      rating: 4.7,
    },
    delivery: { minDays: 2, maxDays: 5 },
  },
  {
    offerId: "o023",
    stepId: "tableros",
    productName: "Tablero Eléctrico",
    variant: "12 polos con interruptor principal",
    price: { value: 2650, currency: "MXN", unit: "pza" },
    co2: { value: 0.03, unit: "tCO2e", level: "Medio", verified: true },
    supplier: {
      name: "Control & Energía",
      location: "Querétaro, QRO",
      address: "Parque Tecnológico 33, QRO",
      logo: "CE",
      phone: "+52 442 290 0033",
      rating: 4.5,
    },
    delivery: { minDays: 4, maxDays: 8 },
  },
  {
    offerId: "o024",
    stepId: "luminarias",
    productName: "Luminaria LED",
    variant: "Panel 60x60 48W",
    price: { value: 420, currency: "MXN", unit: "pza" },
    co2: { value: 0.005, unit: "tCO2e", level: "Bajo", verified: false },
    supplier: {
      name: "Iluminación Nova",
      location: "Guadalajara, JAL",
      address: "Av. Luz 500, JAL",
      logo: "IN",
      phone: "+52 33 2400 0500",
      rating: 4.4,
    },
    delivery: { minDays: 3, maxDays: 7 },
  },

  // ===================== INSTALACIÓN HIDROSANITARIA =====================
  {
    offerId: "o025",
    stepId: "tuberia_agua",
    productName: "Tubería Hidráulica",
    variant: "CPVC 1\" (3m)",
    price: { value: 185, currency: "MXN", unit: "tramo" },
    co2: { value: 0.004, unit: "tCO2e", level: "Bajo", verified: true },
    supplier: {
      name: "Hidráulicos del Bajío",
      location: "León, GTO",
      address: "Av. Agua 150, GTO",
      logo: "HB",
      phone: "+52 477 200 0150",
      rating: 4.6,
    },
    delivery: { minDays: 2, maxDays: 5 },
  },
  {
    offerId: "o026",
    stepId: "tuberia_drenaje",
    productName: "Tubería Sanitaria",
    variant: "PVC 4\" (6m)",
    price: { value: 340, currency: "MXN", unit: "tramo" },
    co2: { value: 0.006, unit: "tCO2e", level: "Bajo", verified: false },
    supplier: {
      name: "Sanitarios y Conexiones MX",
      location: "Puebla, PUE",
      address: "Blvd. Drenaje 66, PUE",
      logo: "SC",
      phone: "+52 222 310 0066",
      rating: 4.2,
    },
    delivery: { minDays: 2, maxDays: 6 },
  },
  {
    offerId: "o027",
    stepId: "bombas",
    productName: "Bomba Centrífuga",
    variant: "1 HP para cisterna",
    price: { value: 3850, currency: "MXN", unit: "pza" },
    co2: { value: 0.04, unit: "tCO2e", level: "Medio", verified: true },
    supplier: {
      name: "Equipos HidroTech",
      location: "CDMX",
      address: "Eje 5 Sur 110, CDMX",
      logo: "HT",
      phone: "+52 55 2800 0110",
      rating: 4.5,
    },
    delivery: { minDays: 4, maxDays: 9 },
  },

  // ===================== CLIMATIZACIÓN Y EFICIENCIA =====================
  {
    offerId: "o028",
    stepId: "hvac",
    productName: "Mini Split Inverter",
    variant: "24,000 BTU",
    price: { value: 12990, currency: "MXN", unit: "pza" },
    co2: { value: 0.12, unit: "tCO2e", level: "Medio", verified: false },
    supplier: {
      name: "Clima Eficiente MX",
      location: "Monterrey, NL",
      address: "Av. Frío 700, NL",
      logo: "CM",
      phone: "+52 81 2400 0700",
      rating: 4.3,
    },
    delivery: { minDays: 5, maxDays: 12 },
  },
  {
    offerId: "o029",
    stepId: "ventilacion",
    productName: "Extractor Industrial",
    variant: "Axial 18\"",
    price: { value: 2650, currency: "MXN", unit: "pza" },
    co2: { value: 0.03, unit: "tCO2e", level: "Medio", verified: true },
    supplier: {
      name: "Ventilación Técnica",
      location: "Querétaro, QRO",
      address: "Circuito Aire 19, QRO",
      logo: "VT",
      phone: "+52 442 290 0019",
      rating: 4.6,
    },
    delivery: { minDays: 4, maxDays: 10 },
  },

  // ===================== SEGURIDAD Y NORMATIVA =====================
  {
    offerId: "o030",
    stepId: "incendios",
    productName: "Sistema Contra Incendios",
    variant: "Hidrantes + gabinete (kit)",
    price: { value: 18900, currency: "MXN", unit: "kit" },
    co2: { value: 0.22, unit: "tCO2e", level: "Alto", verified: true },
    supplier: {
      name: "Seguridad Industrial 360",
      location: "CDMX",
      address: "Av. Protección 300, CDMX",
      logo: "S3",
      phone: "+52 55 3000 0300",
      rating: 4.8,
    },
    delivery: { minDays: 7, maxDays: 15 },
  },
  {
    offerId: "o031",
    stepId: "extintores",
    productName: "Extintor PQS",
    variant: "6 kg, ABC",
    price: { value: 690, currency: "MXN", unit: "pza" },
    co2: { value: 0.008, unit: "tCO2e", level: "Bajo", verified: false },
    supplier: {
      name: "Extintores Express",
      location: "Guadalajara, JAL",
      address: "Av. Brigada 10, JAL",
      logo: "EE",
      phone: "+52 33 2400 0010",
      rating: 4.4,
    },
    delivery: { minDays: 2, maxDays: 5 },
  },
  {
    offerId: "o032",
    stepId: "senalizacion",
    productName: "Señalización Fotoluminiscente",
    variant: "Salida / Ruta de evacuación (set)",
    price: { value: 1450, currency: "MXN", unit: "set" },
    co2: { value: 0.003, unit: "tCO2e", level: "Bajo", verified: true },
    supplier: {
      name: "Señalética Pro",
      location: "Puebla, PUE",
      address: "Calle Seguridad 21, PUE",
      logo: "SP",
      phone: "+52 222 310 0021",
      rating: 4.6,
    },
    delivery: { minDays: 3, maxDays: 6 },
  },

  // ===================== SUSTENTABILIDAD / LCA =====================
  {
    offerId: "o033",
    stepId: "paneles_solares",
    productName: "Panel Solar Monocristalino",
    variant: "550W",
    price: { value: 3690, currency: "MXN", unit: "pza" },
    co2: { value: 0.05, unit: "tCO2e", level: "Medio", verified: true },
    supplier: {
      name: "Solar Urbana",
      location: "Hermosillo, SON",
      address: "Blvd. Energía 550, SON",
      logo: "SU",
      phone: "+52 662 300 0550",
      rating: 4.7,
    },
    delivery: { minDays: 5, maxDays: 11 },
  },
  {
    offerId: "o034",
    stepId: "material_reciclado",
    productName: "Agregado Reciclado",
    variant: "Para sub-base (a granel)",
    price: { value: 420, currency: "MXN", unit: "t" },
    co2: { value: 0.001, unit: "tCO2e", level: "Bajo", verified: true },
    supplier: {
      name: "ReciclaObra",
      location: "CDMX",
      address: "Periférico 100, CDMX",
      logo: "RO",
      phone: "+52 55 2000 0100",
      rating: 4.5,
    },
    delivery: { minDays: 2, maxDays: 6 },
  },
  {
    offerId: "o035",
    stepId: "bonos_carbono",
    productName: "Bono de Carbono",
    variant: "Compensación verificada (1 tCO2e)",
    price: { value: 290, currency: "MXN", unit: "tCO2e" },
    co2: { value: 1.0, unit: "tCO2e", level: "Verificado", verified: true },
    supplier: {
      name: "Compensa Verde",
      location: "CDMX",
      address: "Av. Sustentable 44, CDMX",
      logo: "CV",
      phone: "+52 55 3100 0044",
      rating: 4.8,
    },
    delivery: { minDays: 1, maxDays: 2 },
  },
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
  {
    offerId: "o037",
    stepId: "cemento",
    productName: "Cemento Portland",
    variant: "Obra Negra 50kg",
    price: { value: 240, currency: "MXN", unit: "saco" },
    co2: { value: 0.65, unit: "tCO2e", level: "Alto", verified: false },
    supplier: {
      name: "Distribuidora del Centro",
      location: "Toluca, MEX",
      address: "Av. Obra 101, MEX",
      logo: "DC",
      phone: "+52 722 310 0101",
      rating: 4.1,
    },
    delivery: { minDays: 1, maxDays: 2 },
  },

  // ===================== CONCRETO =====================
  {
    offerId: "o038",
    stepId: "concreto",
    productName: "Concreto Ecológico",
    variant: "f'c 200 con agregado reciclado",
    price: { value: 2150, currency: "MXN", unit: "m3" },
    co2: { value: 0.17, unit: "tCO2e", level: "Bajo", verified: true },
    supplier: {
      name: "GreenMix Concretos",
      location: "León, GTO",
      address: "Blvd. Circular 400, GTO",
      logo: "GM",
      phone: "+52 477 290 0400",
      rating: 4.7,
    },
    delivery: { minDays: 2, maxDays: 3 },
  },

  // ===================== ACERO =====================
  {
    offerId: "o039",
    stepId: "acero",
    productName: "Acero Reciclado",
    variant: "Varilla 3/8” – 90% reciclado",
    price: { value: 19500, currency: "MXN", unit: "t" },
    co2: { value: 1.1, unit: "tCO2e", level: "Medio", verified: true },
    supplier: {
      name: "Aceros Circulares",
      location: "Monclova, COAH",
      address: "Av. Fundición 88, COAH",
      logo: "AC",
      phone: "+52 866 210 0088",
      rating: 4.9,
    },
    delivery: { minDays: 4, maxDays: 8 },
  },

  // ===================== FACHADAS =====================
  {
    offerId: "o040",
    stepId: "fachada",
    productName: "Fachada de Aluminio",
    variant: "Panel compuesto ACP",
    price: { value: 1450, currency: "MXN", unit: "m2" },
    co2: { value: 0.08, unit: "tCO2e", level: "Alto", verified: false },
    supplier: {
      name: "MetalFachadas MX",
      location: "CDMX",
      address: "Av. Arquitectura 700, CDMX",
      logo: "MF",
      phone: "+52 55 3300 0700",
      rating: 4.3,
    },
    delivery: { minDays: 6, maxDays: 14 },
  },

  // ===================== PISOS =====================
  {
    offerId: "o041",
    stepId: "piso",
    productName: "Piso Vinílico SPC",
    variant: "Uso comercial alto tránsito",
    price: { value: 520, currency: "MXN", unit: "m2" },
    co2: { value: 0.015, unit: "tCO2e", level: "Bajo", verified: true },
    supplier: {
      name: "Interiores Sustenta",
      location: "CDMX",
      address: "Av. Diseño Interior 55, CDMX",
      logo: "IS",
      phone: "+52 55 2100 0055",
      rating: 4.6,
    },
    delivery: { minDays: 4, maxDays: 9 },
  },

  // ===================== PINTURA =====================
  {
    offerId: "o042",
    stepId: "pintura",
    productName: "Pintura Ecológica",
    variant: "Base agua, baja emisión VOC",
    price: { value: 980, currency: "MXN", unit: "cubeta" },
    co2: { value: 0.004, unit: "tCO2e", level: "Bajo", verified: true },
    supplier: {
      name: "EcoPinturas Urbanas",
      location: "Guadalajara, JAL",
      address: "Calle Color 12, JAL",
      logo: "EP",
      phone: "+52 33 2900 0012",
      rating: 4.8,
    },
    delivery: { minDays: 2, maxDays: 4 },
  },

  // ===================== HVAC =====================
  {
    offerId: "o043",
    stepId: "hvac",
    productName: "Sistema VRF",
    variant: "Edificio corporativo",
    price: { value: 185000, currency: "MXN", unit: "sistema" },
    co2: { value: 0.35, unit: "tCO2e", level: "Alto", verified: true },
    supplier: {
      name: "Climatización Avanzada",
      location: "Monterrey, NL",
      address: "Av. Tecnología 900, NL",
      logo: "CA",
      phone: "+52 81 2900 0900",
      rating: 4.7,
    },
    delivery: { minDays: 15, maxDays: 30 },
  },

  // ===================== ILUMINACIÓN =====================
  {
    offerId: "o044",
    stepId: "luminarias",
    productName: "Luminaria LED Inteligente",
    variant: "Sensor de presencia + DALI",
    price: { value: 890, currency: "MXN", unit: "pza" },
    co2: { value: 0.003, unit: "tCO2e", level: "Bajo", verified: true },
    supplier: {
      name: "SmartLight MX",
      location: "Querétaro, QRO",
      address: "Parque IoT 21, QRO",
      logo: "SL",
      phone: "+52 442 300 0021",
      rating: 4.9,
    },
    delivery: { minDays: 5, maxDays: 10 },
  },

  // ===================== SEGURIDAD =====================
  {
    offerId: "o045",
    stepId: "incendios",
    productName: "Sistema de Detección",
    variant: "Sensores humo + panel central",
    price: { value: 32500, currency: "MXN", unit: "kit" },
    co2: { value: 0.09, unit: "tCO2e", level: "Medio", verified: true },
    supplier: {
      name: "FireTech Solutions",
      location: "CDMX",
      address: "Av. Prevención 404, CDMX",
      logo: "FT",
      phone: "+52 55 3400 0404",
      rating: 4.8,
    },
    delivery: { minDays: 8, maxDays: 14 },
  },

  // ===================== SUSTENTABILIDAD =====================
  {
    offerId: "o046",
    stepId: "paneles_solares",
    productName: "Panel Solar Bifacial",
    variant: "600W alta eficiencia",
    price: { value: 4490, currency: "MXN", unit: "pza" },
    co2: { value: 0.045, unit: "tCO2e", level: "Bajo", verified: true },
    supplier: {
      name: "NextGen Solar",
      location: "Chihuahua, CHIH",
      address: "Av. Renovable 600, CHIH",
      logo: "NG",
      phone: "+52 614 310 0600",
      rating: 4.9,
    },
    delivery: { minDays: 6, maxDays: 12 },
  },
  {
    offerId: "o047",
    stepId: "bonos_carbono",
    productName: "Bono de Carbono Premium",
    variant: "Reforestación certificada LATAM",
    price: { value: 420, currency: "MXN", unit: "tCO2e" },
    co2: { value: 1.0, unit: "tCO2e", level: "Verificado", verified: true },
    supplier: {
      name: "CarbonTrust LATAM",
      location: "CDMX",
      address: "Av. Neutralidad 1, CDMX",
      logo: "CT",
      phone: "+52 55 3000 0001",
      rating: 5.0,
    },
    delivery: { minDays: 1, maxDays: 1 },
  },{
    offerId: "o048",
    stepId: "cimbra",
    productName: "Cimbra Metálica",
    variant: "Panel modular reutilizable",
    price: { value: 1250, currency: "MXN", unit: "m2" },
    co2: { value: 0.07, unit: "tCO2e", level: "Medio", verified: true },
    supplier: {
      name: "Encofrados Titan",
      location: "Querétaro, QRO",
      address: "Av. Estructura 140, QRO",
      logo: "ET",
      phone: "+52 442 320 0140",
      rating: 4.7,
    },
    delivery: { minDays: 4, maxDays: 9 },
  },
  {
    offerId: "o049",
    stepId: "cimbra",
    productName: "Cimbra de Madera",
    variant: "Triplay 15mm (1.22x2.44m)",
    price: { value: 690, currency: "MXN", unit: "hoja" },
    co2: { value: 0.05, unit: "tCO2e", level: "Bajo", verified: false },
    supplier: {
      name: "Maderera Obra Norte",
      location: "Chihuahua, CHIH",
      address: "Blvd. Carpintería 22, CHIH",
      logo: "MN",
      phone: "+52 614 320 0022",
      rating: 4.2,
    },
    delivery: { minDays: 2, maxDays: 5 },
  },

  // ===================== MALLA =====================
  {
    offerId: "o050",
    stepId: "malla",
    productName: "Malla Electrosoldada",
    variant: "8-8/10-10 (2.44x6m)",
    price: { value: 1490, currency: "MXN", unit: "pieza" },
    co2: { value: 0.15, unit: "tCO2e", level: "Medio", verified: true },
    supplier: {
      name: "Aceros y Mallas Bajío",
      location: "León, GTO",
      address: "Av. Metal 505, GTO",
      logo: "AM",
      phone: "+52 477 320 0505",
      rating: 4.5,
    },
    delivery: { minDays: 3, maxDays: 6 },
  },
  {
    offerId: "o051",
    stepId: "malla",
    productName: "Malla para Losa",
    variant: "6-6/8-8 (2.44x5m)",
    price: { value: 1090, currency: "MXN", unit: "pieza" },
    co2: { value: 0.11, unit: "tCO2e", level: "Bajo", verified: false },
    supplier: {
      name: "RedSteel MX",
      location: "Puebla, PUE",
      address: "Calle Soldadura 19, PUE",
      logo: "RS",
      phone: "+52 222 320 0019",
      rating: 4.1,
    },
    delivery: { minDays: 2, maxDays: 4 },
  },

  // ===================== ADITIVOS =====================
  {
    offerId: "o052",
    stepId: "aditivos",
    productName: "Aditivo Impermeabilizante",
    variant: "Integral para mortero 19L",
    price: { value: 1120, currency: "MXN", unit: "garrafa" },
    co2: { value: 0.03, unit: "tCO2e", level: "Bajo", verified: true },
    supplier: {
      name: "Químicos ObraPlus",
      location: "Guadalajara, JAL",
      address: "Av. Mezclas 301, JAL",
      logo: "QO",
      phone: "+52 33 320 0301",
      rating: 4.6,
    },
    delivery: { minDays: 2, maxDays: 5 },
  },
  {
    offerId: "o053",
    stepId: "aditivos",
    productName: "Aditivo Acelerante",
    variant: "Fraguado rápido 5L",
    price: { value: 420, currency: "MXN", unit: "bidon" },
    co2: { value: 0.01, unit: "tCO2e", level: "Bajo", verified: false },
    supplier: {
      name: "ConstruQuímicos Centro",
      location: "CDMX",
      address: "Eje Químico 77, CDMX",
      logo: "CC",
      phone: "+52 55 320 0077",
      rating: 4.2,
    },
    delivery: { minDays: 1, maxDays: 3 },
  },

  // ===================== LADRILLO / BLOCK =====================
  {
    offerId: "o054",
    stepId: "ladrillo",
    productName: "Block Macizo",
    variant: "15x20x40 cm",
    price: { value: 27, currency: "MXN", unit: "pza" },
    co2: { value: 0.004, unit: "tCO2e", level: "Bajo", verified: true },
    supplier: {
      name: "Bloques del Sureste",
      location: "Tuxtla Gutiérrez, CHIS",
      address: "Carretera Industrial Km 3, CHIS",
      logo: "BS",
      phone: "+52 961 320 0003",
      rating: 4.6,
    },
    delivery: { minDays: 3, maxDays: 7 },
  },
  {
    offerId: "o055",
    stepId: "ladrillo",
    productName: "Ladrillo Rojo Recocido",
    variant: "Estándar para muros",
    price: { value: 7.5, currency: "MXN", unit: "pza" },
    co2: { value: 0.002, unit: "tCO2e", level: "Bajo", verified: false },
    supplier: {
      name: "Ladrillera San Miguel",
      location: "San Luis Potosí, SLP",
      address: "Camino a Hornos 12, SLP",
      logo: "LS",
      phone: "+52 444 320 0012",
      rating: 4.3,
    },
    delivery: { minDays: 2, maxDays: 5 },
  },

  // ===================== TABLAROCA =====================
  {
    offerId: "o056",
    stepId: "tablaroca",
    productName: "Panel de Yeso RH",
    variant: "Resistente a humedad 12.7mm",
    price: { value: 245, currency: "MXN", unit: "panel" },
    co2: { value: 0.012, unit: "tCO2e", level: "Bajo", verified: true },
    supplier: {
      name: "Drywall & Sistemas",
      location: "Monterrey, NL",
      address: "Av. Panel 55, NL",
      logo: "DS",
      phone: "+52 81 320 0055",
      rating: 4.6,
    },
    delivery: { minDays: 2, maxDays: 4 },
  },
  {
    offerId: "o057",
    stepId: "tablaroca",
    productName: "Panel de Yeso RF",
    variant: "Resistente al fuego 15.9mm",
    price: { value: 325, currency: "MXN", unit: "panel" },
    co2: { value: 0.016, unit: "tCO2e", level: "Medio", verified: true },
    supplier: {
      name: "ConstruPanel Pro",
      location: "CDMX",
      address: "Av. Seguridad 180, CDMX",
      logo: "CP",
      phone: "+52 55 320 0180",
      rating: 4.7,
    },
    delivery: { minDays: 3, maxDays: 6 },
  },

  // ===================== IMPERMEABILIZANTE =====================
  {
    offerId: "o058",
    stepId: "impermeabilizante",
    productName: "Impermeabilizante Prefabricado",
    variant: "APP 3.5mm (rollo 10m2)",
    price: { value: 1490, currency: "MXN", unit: "rollo" },
    co2: { value: 0.03, unit: "tCO2e", level: "Medio", verified: true },
    supplier: {
      name: "Techados y Sellos",
      location: "Querétaro, QRO",
      address: "Av. Techo 100, QRO",
      logo: "TS",
      phone: "+52 442 320 0100",
      rating: 4.5,
    },
    delivery: { minDays: 4, maxDays: 8 },
  },
  {
    offerId: "o059",
    stepId: "impermeabilizante",
    productName: "Impermeabilizante Elastomérico",
    variant: "7 años, cubeta 19L",
    price: { value: 1580, currency: "MXN", unit: "cubeta" },
    co2: { value: 0.018, unit: "tCO2e", level: "Bajo", verified: false },
    supplier: {
      name: "Recubrimientos Alta Vida",
      location: "Guadalajara, JAL",
      address: "Calle Durabilidad 9, JAL",
      logo: "RV",
      phone: "+52 33 320 0009",
      rating: 4.4,
    },
    delivery: { minDays: 2, maxDays: 5 },
  },

  // ===================== AISLAMIENTO =====================
  {
    offerId: "o060",
    stepId: "aislante_termico",
    productName: "Aislante Reflectivo",
    variant: "Foil burbuja 1.2m x 25m",
    price: { value: 780, currency: "MXN", unit: "rollo" },
    co2: { value: 0.006, unit: "tCO2e", level: "Bajo", verified: false },
    supplier: {
      name: "Aislantes Express",
      location: "Puebla, PUE",
      address: "Av. Aislar 44, PUE",
      logo: "AE",
      phone: "+52 222 320 0044",
      rating: 4.2,
    },
    delivery: { minDays: 2, maxDays: 4 },
  },
  {
    offerId: "o061",
    stepId: "aislante_acustico",
    productName: "Lámina Acústica",
    variant: "Vinil cargado 3mm",
    price: { value: 390, currency: "MXN", unit: "m2" },
    co2: { value: 0.009, unit: "tCO2e", level: "Medio", verified: true },
    supplier: {
      name: "SoundShield MX",
      location: "CDMX",
      address: "Av. Ruido 200, CDMX",
      logo: "SS",
      phone: "+52 55 320 0200",
      rating: 4.6,
    },
    delivery: { minDays: 4, maxDays: 7 },
  },

  // ===================== PISO =====================
  {
    offerId: "o062",
    stepId: "piso",
    productName: "Piso Cerámico",
    variant: "45x45 brillante",
    price: { value: 245, currency: "MXN", unit: "m2" },
    co2: { value: 0.028, unit: "tCO2e", level: "Medio", verified: false },
    supplier: {
      name: "Azulejos del Pacífico",
      location: "Mazatlán, SIN",
      address: "Blvd. Cerámica 70, SIN",
      logo: "AP",
      phone: "+52 669 320 0070",
      rating: 4.1,
    },
    delivery: { minDays: 5, maxDays: 10 },
  },
  {
    offerId: "o063",
    stepId: "piso",
    productName: "Piso Epóxico",
    variant: "Industrial (kit 20m2)",
    price: { value: 6200, currency: "MXN", unit: "kit" },
    co2: { value: 0.11, unit: "tCO2e", level: "Alto", verified: true },
    supplier: {
      name: "Recubrimientos Industriales Pro",
      location: "Monterrey, NL",
      address: "Av. Planta 88, NL",
      logo: "RI",
      phone: "+52 81 320 0088",
      rating: 4.7,
    },
    delivery: { minDays: 6, maxDays: 12 },
  },

  // ===================== PINTURA =====================
  {
    offerId: "o064",
    stepId: "pintura",
    productName: "Pintura Acrílica",
    variant: "Exterior 19L (alto rendimiento)",
    price: { value: 1090, currency: "MXN", unit: "cubeta" },
    co2: { value: 0.012, unit: "tCO2e", level: "Bajo", verified: true },
    supplier: {
      name: "Pinturas Fortaleza",
      location: "Querétaro, QRO",
      address: "Calle Brocha 18, QRO",
      logo: "PF",
      phone: "+52 442 320 0018",
      rating: 4.5,
    },
    delivery: { minDays: 2, maxDays: 4 },
  },
  {
    offerId: "o065",
    stepId: "pintura",
    productName: "Pintura Antimoho",
    variant: "Interior 19L",
    price: { value: 1250, currency: "MXN", unit: "cubeta" },
    co2: { value: 0.014, unit: "tCO2e", level: "Medio", verified: false },
    supplier: {
      name: "Pinturas Saludables",
      location: "Mérida, YUC",
      address: "Av. Ambiente 101, YUC",
      logo: "PS",
      phone: "+52 999 320 0101",
      rating: 4.4,
    },
    delivery: { minDays: 3, maxDays: 6 },
  },

  // ===================== PLAFÓN =====================
  {
    offerId: "o066",
    stepId: "plafon",
    productName: "Plafón de PVC",
    variant: "Listón blanco (caja 20m2)",
    price: { value: 2150, currency: "MXN", unit: "caja" },
    co2: { value: 0.03, unit: "tCO2e", level: "Medio", verified: false },
    supplier: {
      name: "Interiores Económicos",
      location: "Puebla, PUE",
      address: "Calle Acabado 6, PUE",
      logo: "IE",
      phone: "+52 222 320 0006",
      rating: 4.0,
    },
    delivery: { minDays: 4, maxDays: 8 },
  },
  {
    offerId: "o067",
    stepId: "plafon",
    productName: "Plafón Acústico",
    variant: "Fibra mineral NRC alto 60x60",
    price: { value: 245, currency: "MXN", unit: "m2" },
    co2: { value: 0.008, unit: "tCO2e", level: "Bajo", verified: true },
    supplier: {
      name: "Acústica & Oficinas",
      location: "CDMX",
      address: "Av. Silencio 77, CDMX",
      logo: "AO",
      phone: "+52 55 320 0077",
      rating: 4.7,
    },
    delivery: { minDays: 5, maxDays: 9 },
  },

  // ===================== BARANDALES =====================
  {
    offerId: "o068",
    stepId: "barandales",
    productName: "Barandal de Cristal Templado",
    variant: "10mm con herrajes",
    price: { value: 1650, currency: "MXN", unit: "m" },
    co2: { value: 0.06, unit: "tCO2e", level: "Medio", verified: true },
    supplier: {
      name: "Cristales Arquitectónicos",
      location: "Guadalajara, JAL",
      address: "Av. Transparencia 14, JAL",
      logo: "CA",
      phone: "+52 33 320 0014",
      rating: 4.8,
    },
    delivery: { minDays: 8, maxDays: 16 },
  },

  // ===================== PUERTAS =====================
  {
    offerId: "o069",
    stepId: "puertas",
    productName: "Puerta de Madera",
    variant: "Interior (semi-sólida)",
    price: { value: 1850, currency: "MXN", unit: "pza" },
    co2: { value: 0.02, unit: "tCO2e", level: "Bajo", verified: false },
    supplier: {
      name: "Carpintería Moderna",
      location: "Morelia, MICH",
      address: "Av. Cedro 33, MICH",
      logo: "CM",
      phone: "+52 443 320 0033",
      rating: 4.2,
    },
    delivery: { minDays: 6, maxDays: 12 },
  },
  {
    offerId: "o070",
    stepId: "puertas",
    productName: "Puerta Cortafuego",
    variant: "Certificada 90 min",
    price: { value: 9800, currency: "MXN", unit: "pza" },
    co2: { value: 0.09, unit: "tCO2e", level: "Alto", verified: true },
    supplier: {
      name: "Protección Passive Fire",
      location: "CDMX",
      address: "Av. Norma 500, CDMX",
      logo: "PF",
      phone: "+52 55 320 0500",
      rating: 4.9,
    },
    delivery: { minDays: 10, maxDays: 20 },
  },

  // ===================== VENTANAS / CANCELES =====================
  {
    offerId: "o071",
    stepId: "ventanas",
    productName: "Ventana Doble Vidrio",
    variant: "DVH acústico/ térmico",
    price: { value: 2650, currency: "MXN", unit: "m2" },
    co2: { value: 0.055, unit: "tCO2e", level: "Medio", verified: true },
    supplier: {
      name: "Cristal Térmico MX",
      location: "Querétaro, QRO",
      address: "Av. Aislamiento 90, QRO",
      logo: "CT",
      phone: "+52 442 320 0090",
      rating: 4.7,
    },
    delivery: { minDays: 10, maxDays: 18 },
  },

  // ===================== CABLEADO =====================
  {
    offerId: "o072",
    stepId: "cableado",
    productName: "Cable XHHW-2",
    variant: "Calibre 8 AWG (100m)",
    price: { value: 2950, currency: "MXN", unit: "rollo" },
    co2: { value: 0.03, unit: "tCO2e", level: "Medio", verified: true },
    supplier: {
      name: "Cableados Industriales Norte",
      location: "Monterrey, NL",
      address: "Av. Conductores 210, NL",
      logo: "CI",
      phone: "+52 81 320 0210",
      rating: 4.6,
    },
    delivery: { minDays: 3, maxDays: 7 },
  },
  {
    offerId: "o073",
    stepId: "cableado",
    productName: "Cable THHN",
    variant: "Calibre 10 AWG (100m)",
    price: { value: 1780, currency: "MXN", unit: "rollo" },
    co2: { value: 0.02, unit: "tCO2e", level: "Bajo", verified: false },
    supplier: {
      name: "Eléctrico Rápido",
      location: "Puebla, PUE",
      address: "Av. Voltaje 12, PUE",
      logo: "ER",
      phone: "+52 222 320 0012",
      rating: 4.2,
    },
    delivery: { minDays: 2, maxDays: 4 },
  },

  // ===================== TABLEROS =====================
  {
    offerId: "o074",
    stepId: "tableros",
    productName: "Centro de Carga",
    variant: "24 polos (caja metálica)",
    price: { value: 4200, currency: "MXN", unit: "pza" },
    co2: { value: 0.04, unit: "tCO2e", level: "Medio", verified: false },
    supplier: {
      name: "Tableros y Control Bajío",
      location: "León, GTO",
      address: "Calle Breaker 8, GTO",
      logo: "TC",
      phone: "+52 477 320 0008",
      rating: 4.3,
    },
    delivery: { minDays: 6, maxDays: 10 },
  },

  // ===================== LUMINARIAS =====================
  {
    offerId: "o075",
    stepId: "luminarias",
    productName: "Reflector LED",
    variant: "100W exterior IP65",
    price: { value: 590, currency: "MXN", unit: "pza" },
    co2: { value: 0.004, unit: "tCO2e", level: "Bajo", verified: false },
    supplier: {
      name: "Ilumina Exterior",
      location: "Cancún, QROO",
      address: "Av. Costa 21, QROO",
      logo: "IE",
      phone: "+52 998 320 0021",
      rating: 4.4,
    },
    delivery: { minDays: 4, maxDays: 8 },
  },
  {
    offerId: "o076",
    stepId: "luminarias",
    productName: "Downlight LED",
    variant: "12W empotrable",
    price: { value: 110, currency: "MXN", unit: "pza" },
    co2: { value: 0.001, unit: "tCO2e", level: "Bajo", verified: true },
    supplier: {
      name: "Luz Arquitectónica",
      location: "CDMX",
      address: "Av. Proyectos 65, CDMX",
      logo: "LA",
      phone: "+52 55 320 0065",
      rating: 4.7,
    },
    delivery: { minDays: 2, maxDays: 5 },
  },

  // ===================== TUBERÍA AGUA =====================
  {
    offerId: "o077",
    stepId: "tuberia_agua",
    productName: "Tubería PEX",
    variant: "3/4\" (rollo 100m)",
    price: { value: 2950, currency: "MXN", unit: "rollo" },
    co2: { value: 0.01, unit: "tCO2e", level: "Bajo", verified: true },
    supplier: {
      name: "HidroPEX México",
      location: "Querétaro, QRO",
      address: "Av. Conexión 11, QRO",
      logo: "HP",
      phone: "+52 442 320 0011",
      rating: 4.8,
    },
    delivery: { minDays: 4, maxDays: 9 },
  },

  // ===================== TUBERÍA DRENAJE =====================
  {
    offerId: "o078",
    stepId: "tuberia_drenaje",
    productName: "Tubería Sanitaria",
    variant: "PVC 2\" (6m)",
    price: { value: 165, currency: "MXN", unit: "tramo" },
    co2: { value: 0.003, unit: "tCO2e", level: "Bajo", verified: false },
    supplier: {
      name: "Conexiones y Drenajes",
      location: "Monterrey, NL",
      address: "Av. Sanitaria 42, NL",
      logo: "CD",
      phone: "+52 81 320 0042",
      rating: 4.2,
    },
    delivery: { minDays: 2, maxDays: 6 },
  },

  // ===================== BOMBAS =====================
  {
    offerId: "o079",
    stepId: "bombas",
    productName: "Bomba Sumergible",
    variant: "1/2 HP para cárcamo",
    price: { value: 4650, currency: "MXN", unit: "pza" },
    co2: { value: 0.05, unit: "tCO2e", level: "Medio", verified: false },
    supplier: {
      name: "Bombas & Fluidos MX",
      location: "Guadalajara, JAL",
      address: "Av. Flujo 700, JAL",
      logo: "BF",
      phone: "+52 33 320 0700",
      rating: 4.3,
    },
    delivery: { minDays: 5, maxDays: 10 },
  },

  // ===================== VENTILACIÓN =====================
  {
    offerId: "o080",
    stepId: "ventilacion",
    productName: "Unidad Manejadora de Aire",
    variant: "UMAs para pisos completos",
    price: { value: 98000, currency: "MXN", unit: "pza" },
    co2: { value: 0.25, unit: "tCO2e", level: "Alto", verified: true },
    supplier: {
      name: "HVAC Corporativo",
      location: "CDMX",
      address: "Av. Ductos 808, CDMX",
      logo: "HC",
      phone: "+52 55 320 0808",
      rating: 4.7,
    },
    delivery: { minDays: 14, maxDays: 28 },
  },

  // ===================== EXTINTORES =====================
  {
    offerId: "o081",
    stepId: "extintores",
    productName: "Extintor CO2",
    variant: "4.5 kg para eléctrico",
    price: { value: 1890, currency: "MXN", unit: "pza" },
    co2: { value: 0.01, unit: "tCO2e", level: "Bajo", verified: true },
    supplier: {
      name: "FireSafe Equipos",
      location: "Querétaro, QRO",
      address: "Av. Respuesta 12, QRO",
      logo: "FS",
      phone: "+52 442 320 0012",
      rating: 4.8,
    },
    delivery: { minDays: 3, maxDays: 6 },
  },

  // ===================== SEÑALIZACIÓN =====================
  {
    offerId: "o082",
    stepId: "senalizacion",
    productName: "Señalización PVC",
    variant: "Prohibición / obligación (set 20)",
    price: { value: 980, currency: "MXN", unit: "set" },
    co2: { value: 0.002, unit: "tCO2e", level: "Bajo", verified: false },
    supplier: {
      name: "Señales Urbanas",
      location: "Monterrey, NL",
      address: "Calle Evacuación 9, NL",
      logo: "SU",
      phone: "+52 81 320 0009",
      rating: 4.2,
    },
    delivery: { minDays: 2, maxDays: 5 },
  },

  // ===================== PANEL SOLAR =====================
  {
    offerId: "o083",
    stepId: "paneles_solares",
    productName: "Inversor Solar",
    variant: "5kW híbrido",
    price: { value: 28900, currency: "MXN", unit: "pza" },
    co2: { value: 0.08, unit: "tCO2e", level: "Medio", verified: true },
    supplier: {
      name: "Solar Integraciones MX",
      location: "Guadalajara, JAL",
      address: "Av. Fotovoltaica 500, JAL",
      logo: "SI",
      phone: "+52 33 320 0500",
      rating: 4.8,
    },
    delivery: { minDays: 7, maxDays: 14 },
  },

  // ===================== MATERIAL RECICLADO =====================
  {
    offerId: "o084",
    stepId: "material_reciclado",
    productName: "Panel de PET Reciclado",
    variant: "Para plafón/acústico 60x60",
    price: { value: 210, currency: "MXN", unit: "m2" },
    co2: { value: 0.002, unit: "tCO2e", level: "Bajo", verified: true },
    supplier: {
      name: "ReciclaMateriales MX",
      location: "Querétaro, QRO",
      address: "Av. Circular 22, QRO",
      logo: "RM",
      phone: "+52 442 320 0022",
      rating: 4.7,
    },
    delivery: { minDays: 6, maxDays: 12 },
  },

  // ===================== BONOS CARBONO =====================
  {
    offerId: "o085",
    stepId: "bonos_carbono",
    productName: "Bono de Carbono",
    variant: "Energía renovable verificada (1 tCO2e)",
    price: { value: 310, currency: "MXN", unit: "tCO2e" },
    co2: { value: 1.0, unit: "tCO2e", level: "Verificado", verified: true },
    supplier: {
      name: "Neutraliza Ahora",
      location: "CDMX",
      address: "Av. Renovación 12, CDMX",
      logo: "NA",
      phone: "+52 55 320 0012",
      rating: 4.7,
    },
    delivery: { minDays: 1, maxDays: 2 },
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
      // --- ESTRUCTURA ---
      { id: "cemento", label: "Cemento", unit: "t", required: true },
      {
        id: "concreto",
        label: "Concreto Premezclado",
        unit: "m3",
        required: true,
      },
      {
        id: "acero",
        label: "Acero de Refuerzo (Varilla)",
        unit: "t",
        required: true,
      },
      {
        id: "malla",
        label: "Malla Electrosoldada",
        unit: "m2",
        required: true,
      },
      { id: "cimbra", label: "Cimbra / Encofrado", unit: "m2", required: true },
      {
        id: "aditivos",
        label: "Aditivos para Concreto",
        unit: "L",
        required: false,
      },

      // --- MUROS Y FACHADAS ---
      {
        id: "ladrillo",
        label: "Ladrillo / Block",
        unit: "pza",
        required: true,
      },
      {
        id: "tablaroca",
        label: "Tablaroca / Panel de Yeso",
        unit: "m2",
        required: false,
      },
      {
        id: "fachada",
        label: "Sistema de Fachada",
        unit: "m2",
        required: false,
      },
      {
        id: "impermeabilizante",
        label: "Impermeabilizante",
        unit: "m2",
        required: true,
      },
      {
        id: "aislante_termico",
        label: "Aislante Térmico",
        unit: "m2",
        required: false,
      },
      {
        id: "aislante_acustico",
        label: "Aislante Acústico",
        unit: "m2",
        required: false,
      },

      // --- ACABADOS ---
      { id: "piso", label: "Piso / Recubrimiento", unit: "m2", required: true },
      { id: "pintura", label: "Pintura", unit: "L", required: true },
      {
        id: "plafon",
        label: "Plafón / Cielo Falso",
        unit: "m2",
        required: false,
      },
      {
        id: "barandales",
        label: "Barandales / Pasamanos",
        unit: "m",
        required: false,
      },

      // --- CARPINTERÍA / CANCELERÍA ---
      { id: "puertas", label: "Puertas", unit: "pza", required: true },
      {
        id: "ventanas",
        label: "Ventanas / Canceles",
        unit: "m2",
        required: true,
      },

      // --- INSTALACIÓN ELÉCTRICA ---
      {
        id: "cableado",
        label: "Cableado Eléctrico",
        unit: "m",
        required: true,
      },
      {
        id: "tableros",
        label: "Tableros Eléctricos",
        unit: "pza",
        required: true,
      },
      { id: "luminarias", label: "Luminarias", unit: "pza", required: true },

      // --- INSTALACIÓN HIDROSANITARIA ---
      {
        id: "tuberia_agua",
        label: "Tubería Hidráulica",
        unit: "m",
        required: true,
      },
      {
        id: "tuberia_drenaje",
        label: "Tubería Sanitaria",
        unit: "m",
        required: true,
      },
      { id: "bombas", label: "Bombas de Agua", unit: "pza", required: false },

      // --- CLIMATIZACIÓN Y EFICIENCIA ---
      { id: "hvac", label: "Sistema HVAC", unit: "pza", required: false },
      {
        id: "ventilacion",
        label: "Ventilación Mecánica",
        unit: "pza",
        required: false,
      },

      // --- SEGURIDAD Y NORMATIVA ---
      {
        id: "incendios",
        label: "Sistema contra Incendios",
        unit: "pza",
        required: true,
      },
      { id: "extintores", label: "Extintores", unit: "pza", required: true },
      {
        id: "senalizacion",
        label: "Señalización de Seguridad",
        unit: "pza",
        required: true,
      },

      // --- SUSTENTABILIDAD / LCA ---
      {
        id: "paneles_solares",
        label: "Paneles Solares",
        unit: "pza",
        required: false,
      },
      {
        id: "material_reciclado",
        label: "Material Reciclado",
        unit: "t",
        required: false,
      },
      {
        id: "bonos_carbono",
        label: "Bonos de Carbono",
        unit: "tCO2",
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
            disabled={Object.keys(cart).length === 0}
            className="px-12 py-4 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center gap-2 active:scale-95 disabled:opacity-20"
          >
            Finalizar Orden <ArrowRight size={20} />
          </button>
        </div>
      </footer>
    </div>
  );
}
