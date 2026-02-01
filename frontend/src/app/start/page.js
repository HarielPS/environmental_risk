"use client";
import React, { useState, useEffect } from "react";
import {
  Home,
  Building2,
  LayoutGrid,
  Store,
  Warehouse,
  Hammer,
  Hash,
  Layers,
  Maximize,
  Wrench,
  Sparkles,
  Bath,
  UtensilsCrossed,
  Trees,
  Car,
  Waves,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  HardHat,
  Loader2,
  ClipboardList,
  Calculator,
  Truck,
  Plus,
  Trash2,
  FileText,
  Upload,
  X,
  AlertCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

const App = () => {
  const router = useRouter();
  // --- Estados de Navegación y Carga ---
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [results, setResults] = useState(null);

  // --- Estado del Formulario Principal ---
  const [formData, setFormData] = useState({
    projectType: "",
    scale: "",
    levels: "",
    surface: "",
    system: "",
    quality: "",
    spaces: [],
    exterior: "",

    foundation: "",
    roof: "",
    electrical: "",
    plumbing: "",
    finishes: [],
    sustainability: [],
    permits: "",

    customMaterials: [],
    attachedFile: null,
  });

  // Estado temporal para la fila de nuevo material en el Paso 9
  const [tempMaterial, setTempMaterial] = useState({ name: "", qty: "" });

  const totalSteps = 15;

  // Mensajes para la pantalla de carga
  const loadingStages = [
    "Analizando estructura de la obra...",
    "Calculando volumen de concreto y acero...",
    "Estimando materiales de instalaciones...",
    "Procesando materiales personalizados...",
    "Verificando documentos adjuntos...",
    "Generando presupuesto y logística...",
  ];

  // --- Definición de los pasos del 1 al 8 ---
  const steps = [
    // 1) MISMO QUE TU YA TENÍAS
    {
      id: 1,
      title: "¿Qué vas a construir?",
      subtitle: "Define la naturaleza principal de tu obra.",
      field: "projectType",
      options: [
        { id: "casa", label: "Casa", icon: <Home size={24} /> },
        {
          id: "edificio",
          label: "Edificio de departamentos",
          icon: <Building2 size={24} />,
        },
        {
          id: "conjunto",
          label: "Conjunto habitacional",
          icon: <LayoutGrid size={24} />,
        },
        {
          id: "comercial",
          label: "Local comercial",
          icon: <Store size={24} />,
        },
        { id: "nave", label: "Nave / Bodega", icon: <Warehouse size={24} /> },
        {
          id: "remodelacion",
          label: "Remodelación",
          icon: <Hammer size={24} />,
        },
      ],
    },

    // 2) UNIDADES (más granular)
    {
      id: 2,
      title: "¿Cuántas unidades?",
      subtitle: "Esto nos ayuda a calcular volúmenes y logística.",
      field: "scale",
      options: [
        { id: "1", label: "1 unidad", icon: <Hash size={24} /> },
        { id: "2", label: "2 unidades", icon: <Hash size={24} /> },
        { id: "3-5", label: "3 – 5 unidades", icon: <Hash size={24} /> },
        { id: "6-10", label: "6 – 10 unidades", icon: <Hash size={24} /> },
        { id: "11-20", label: "11 – 20 unidades", icon: <Hash size={24} /> },
        { id: "21-50", label: "21 – 50 unidades", icon: <Hash size={24} /> },
        { id: "51-100", label: "51 – 100 unidades", icon: <Hash size={24} /> },
        { id: "+100", label: "Más de 100", icon: <Hash size={24} /> },
      ],
    },

    // 3) NIVELES (más opciones)
    {
      id: 3,
      title: "¿Cuántos niveles?",
      subtitle: "La altura define estructura, seguridad y logística.",
      field: "levels",
      options: [
        { id: "1", label: "1 nivel", icon: <Layers size={20} /> },
        { id: "2", label: "2 niveles", icon: <Layers size={22} /> },
        { id: "3", label: "3 niveles", icon: <Layers size={24} /> },
        { id: "4-5", label: "4 – 5 niveles", icon: <Layers size={26} /> },
        { id: "6-10", label: "6 – 10 niveles", icon: <Layers size={28} /> },
        { id: "11-20", label: "11 – 20 niveles", icon: <Layers size={30} /> },
        { id: "+20", label: "+20 niveles", icon: <Layers size={32} /> },
      ],
    },

    // 4) SUPERFICIE (más rangos)
    {
      id: 4,
      title: "¿Superficie aproximada?",
      subtitle: "Metros cuadrados totales de construcción.",
      field: "surface",
      options: [
        { id: "<50", label: "< 50 m²", icon: <Maximize size={20} /> },
        { id: "50-80", label: "50 – 80 m²", icon: <Maximize size={22} /> },
        { id: "80-150", label: "80 – 150 m²", icon: <Maximize size={24} /> },
        { id: "150-300", label: "150 – 300 m²", icon: <Maximize size={26} /> },
        { id: "300-800", label: "300 – 800 m²", icon: <Maximize size={28} /> },
        {
          id: "800-2000",
          label: "800 – 2,000 m²",
          icon: <Maximize size={30} />,
        },
        { id: "+2000", label: "+2,000 m²", icon: <Maximize size={32} /> },
      ],
    },

    // 5) SISTEMA CONSTRUCTIVO (más variedad)
    {
      id: 5,
      title: "¿Sistema constructivo?",
      subtitle: "Define los materiales base de la estructura.",
      field: "system",
      options: [
        {
          id: "concreto",
          label: "Concreto armado",
          icon: <Wrench size={24} />,
        },
        {
          id: "muros",
          label: "Muros de carga",
          icon: <LayoutGrid size={24} />,
        },
        {
          id: "metalica",
          label: "Estructura metálica",
          icon: <Warehouse size={24} />,
        },
        {
          id: "panel",
          label: "Prefabricado / Panel",
          icon: <Layers size={24} />,
        },

        // ✅ extras
        {
          id: "mixto",
          label: "Mixto (acero + concreto)",
          icon: <Wrench size={24} />,
        },
        {
          id: "madera",
          label: "Madera estructural",
          icon: <Trees size={24} />,
        },
        {
          id: "ligera",
          label: "Construcción ligera (drywall)",
          icon: <Hammer size={24} />,
        },

        {
          id: "asesoria",
          label: "Quiero asesoría",
          icon: <HardHat size={24} />,
        },
      ],
    },

    // 6) NIVEL DE ACABADO (más escalones)
    {
      id: 6,
      title: "¿Nivel de acabado?",
      subtitle: "Calidad de materiales, marcas y detalle.",
      field: "quality",
      options: [
        { id: "obra_gris", label: "Obra gris", icon: <Sparkles size={18} /> },
        { id: "basico", label: "Básico", icon: <Sparkles size={20} /> },
        { id: "economico", label: "Económico", icon: <Sparkles size={22} /> },
        { id: "medio", label: "Medio", icon: <Sparkles size={24} /> },
        {
          id: "residencial",
          label: "Residencial",
          icon: <Sparkles size={28} />,
        },
        { id: "premium", label: "Premium", icon: <Sparkles size={32} /> },
        {
          id: "lujo",
          label: "Lujo (alto detalle)",
          icon: <Sparkles size={36} />,
        },
      ],
    },

    // 7) ESPACIOS (más opciones multi)
    {
      id: 7,
      title: "¿Qué espacios incluye?",
      subtitle: "Selecciona todo lo que aplique (Multiselección).",
      field: "spaces",
      multi: true,
      options: [
        { id: "baños", label: "Baños", icon: <Bath size={24} /> },
        { id: "cocina", label: "Cocina", icon: <UtensilsCrossed size={24} /> },
        { id: "patio", label: "Patio / Jardín", icon: <Trees size={24} /> },
        { id: "cochera", label: "Cochera", icon: <Car size={24} /> },
        { id: "alberca", label: "Alberca", icon: <Waves size={24} /> },

        // ✅ extras útiles
        {
          id: "roof_garden",
          label: "Roof / Terraza",
          icon: <LayoutGrid size={24} />,
        },
        {
          id: "cuarto_servicio",
          label: "Cuarto de servicio",
          icon: <Home size={24} />,
        },
        { id: "bodega", label: "Bodega", icon: <Warehouse size={24} /> },
        { id: "elevador", label: "Elevador", icon: <ArrowRight size={24} /> },
        {
          id: "sotano",
          label: "Sótano / Estacionamiento",
          icon: <Car size={24} />,
        },
      ],
    },

    // 8) EXTERIOR (más granular)
    {
      id: 8,
      title: "¿Qué tanto exterior?",
      subtitle: "Urbanización y áreas comunes.",
      field: "exterior",
      options: [
        {
          id: "solo_vivienda",
          label: "Solo vivienda",
          icon: <Home size={24} />,
        },
        {
          id: "jardin_pequeño",
          label: "Jardín pequeño",
          icon: <Trees size={20} />,
        },
        {
          id: "jardin_grande",
          label: "Jardín grande",
          icon: <Trees size={24} />,
        },
        {
          id: "areas_comunes",
          label: "Áreas comunes",
          icon: <LayoutGrid size={24} />,
        },
        {
          id: "urbanizacion",
          label: "Urbanización completa",
          icon: <Building2 size={24} />,
        },
        {
          id: "estacionamiento_exterior",
          label: "Estacionamiento exterior",
          icon: <Car size={24} />,
        },
      ],
    },

    // ✅ NUEVOS PASOS (NO son tipo de construcción) — super útiles para materiales/proveedores

    // 9) CIMENTACIÓN
    {
      id: 9,
      title: "¿Tipo de cimentación?",
      subtitle: "Define los materiales principales bajo el suelo.",
      field: "foundation",
      options: [
        {
          id: "zapata_corrida",
          label: "Zapata corrida",
          icon: <Layers size={24} />,
        },
        {
          id: "losa_cimentacion",
          label: "Losa de cimentación",
          icon: <LayoutGrid size={24} />,
        },
        { id: "pilotes", label: "Pilotes / Pila", icon: <Wrench size={24} /> },
        {
          id: "cimentacion_profunda",
          label: "Cimentación profunda",
          icon: <HardHat size={24} />,
        },
        {
          id: "no_se",
          label: "No lo sé / asesoría",
          icon: <HardHat size={24} />,
        },
      ],
    },

    // 10) TECHO / CUBIERTA
    {
      id: 10,
      title: "¿Tipo de techo o cubierta?",
      subtitle: "Impacta impermeabilización y estructura.",
      field: "roof",
      options: [
        {
          id: "losa_concreto",
          label: "Losa de concreto",
          icon: <Wrench size={24} />,
        },
        {
          id: "lamina",
          label: "Lámina / cubierta metálica",
          icon: <Warehouse size={24} />,
        },
        { id: "teja", label: "Teja", icon: <Home size={24} /> },
        {
          id: "termoacustica",
          label: "Panel termoacústico",
          icon: <Sparkles size={24} />,
        },
        {
          id: "no_definido",
          label: "Aún no definido",
          icon: <HardHat size={24} />,
        },
      ],
    },

    // 11) ELÉCTRICA
    {
      id: 11,
      title: "¿Instalación eléctrica?",
      subtitle: "Define calibre, tableros, canalización y seguridad.",
      field: "electrical",
      options: [
        { id: "basica", label: "Básica", icon: <Sparkles size={22} /> },
        {
          id: "residencial",
          label: "Residencial completa",
          icon: <Home size={24} />,
        },
        { id: "comercial", label: "Comercial", icon: <Store size={24} /> },
        {
          id: "industrial",
          label: "Industrial",
          icon: <Warehouse size={24} />,
        },
        {
          id: "domotica",
          label: "Domótica / Smart",
          icon: <Sparkles size={28} />,
        },
      ],
    },

    // 12) HIDROSANITARIA
    {
      id: 12,
      title: "¿Hidrosanitaria?",
      subtitle: "Define tuberías, calentamiento y descargas.",
      field: "plumbing",
      options: [
        { id: "cpvc", label: "CPVC", icon: <Waves size={24} /> },
        { id: "pex", label: "PEX", icon: <Waves size={24} /> },
        { id: "cobre", label: "Cobre", icon: <Waves size={24} /> },
        { id: "mixto", label: "Mixto", icon: <Waves size={24} /> },
        {
          id: "no_se",
          label: "No lo sé / asesoría",
          icon: <HardHat size={24} />,
        },
      ],
    },

    // 13) ACABADOS ESPECÍFICOS (MULTI)
    {
      id: 13,
      title: "¿Qué acabados vas a incluir?",
      subtitle: "Selecciona lo que aplique (Multiselección).",
      field: "finishes",
      multi: true,
      options: [
        {
          id: "pisos_porcelanato",
          label: "Piso porcelanato",
          icon: <Sparkles size={24} />,
        },
        {
          id: "piso_madera",
          label: "Piso madera / laminado",
          icon: <Trees size={24} />,
        },
        {
          id: "azulejo_banos",
          label: "Azulejo en baños",
          icon: <Bath size={24} />,
        },
        {
          id: "cocina_integral",
          label: "Cocina integral",
          icon: <UtensilsCrossed size={24} />,
        },
        {
          id: "canceles",
          label: "Canceles / vidrio templado",
          icon: <Maximize size={24} />,
        },
        {
          id: "pintura_premium",
          label: "Pintura premium",
          icon: <Sparkles size={28} />,
        },
        { id: "carpinteria", label: "Carpintería", icon: <Hammer size={24} /> },
      ],
    },

    // 14) SUSTENTABILIDAD (MULTI)
    {
      id: 14,
      title: "¿Quieres integrar medidas sustentables?",
      subtitle: "Esto afecta selección de proveedores y materiales.",
      field: "sustainability",
      multi: true,
      options: [
        {
          id: "aislamiento",
          label: "Aislamiento térmico",
          icon: <Sparkles size={24} />,
        },
        {
          id: "paneles_solares",
          label: "Paneles solares",
          icon: <Sparkles size={28} />,
        },
        {
          id: "captacion_pluvial",
          label: "Captación pluvial",
          icon: <Waves size={24} />,
        },
        { id: "reuso_agua", label: "Reúso de agua", icon: <Waves size={24} /> },
        {
          id: "material_reciclado",
          label: "Material reciclado",
          icon: <Trees size={24} />,
        },
        {
          id: "baja_huella",
          label: "Baja huella de carbono",
          icon: <Trees size={24} />,
        },
      ],
    },

    // 15) PERMISOS / PLANOS (B2B)
    {
      id: 15,
      title: "¿Estatus de permisos y planos?",
      subtitle: "Para calcular riesgo, tiempos y proveedores adecuados.",
      field: "permits",
      options: [
        {
          id: "todo_listo",
          label: "Permisos y planos listos",
          icon: <CheckCircle2 size={24} />,
        },
        {
          id: "solo_planos",
          label: "Solo planos",
          icon: <LayoutGrid size={24} />,
        },
        {
          id: "solo_permisos",
          label: "Solo permisos",
          icon: <Building2 size={24} />,
        },
        { id: "en_proceso", label: "En proceso", icon: <HardHat size={24} /> },
        {
          id: "necesito_gestoria",
          label: "Necesito gestoría",
          icon: <HardHat size={24} />,
        },
      ],
    },
  ];

  // --- Manejo de Materiales Personalizados (Paso 9) ---
  const handleAddMaterial = () => {
    if (tempMaterial.name && tempMaterial.qty) {
      setFormData((prev) => ({
        ...prev,
        customMaterials: [
          ...prev.customMaterials,
          { ...tempMaterial, id: Date.now() },
        ],
      }));
      setTempMaterial({ name: "", qty: "" });
    }
  };

  const handleRemoveMaterial = (id) => {
    setFormData((prev) => ({
      ...prev,
      customMaterials: prev.customMaterials.filter((m) => m.id !== id),
    }));
  };

  // --- Manejo de Archivo PDF (Paso 9) ---
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFormData((prev) => ({
        ...prev,
        attachedFile: {
          name: file.name,
          size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        },
      }));
    }
  };

  // --- Simulación de Envío al Backend ---
  const handleSubmit = async () => {
    setIsSubmitting(true);
    let stage = 0;

    // Cambiar mensajes de carga periódicamente
    const interval = setInterval(() => {
      setLoadingMessage(loadingStages[stage % loadingStages.length]);
      stage++;
    }, 800);

    try {
      // Simular latencia de red
      await new Promise((resolve) => setTimeout(resolve, 4500));
      setResults(formData);
      setCurrentStep(totalSteps + 1);
    } catch (err) {
      console.error("Error enviando datos", err);
    } finally {
      clearInterval(interval);
      router.push('/steps');
      //setIsSubmitting(false);
    }
  };

  const handleOptionClick = (field, value, isMulti) => {
    if (isMulti) {
      const current = [...formData[field]];
      const idx = current.indexOf(value);
      idx > -1 ? current.splice(idx, 1) : current.push(value);
      setFormData({ ...formData, [field]: current });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  // --- Renderizado de Pantalla de Carga ---
  if (isSubmitting) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-6">
        <div className="relative mb-10">
          <div className="w-28 h-28 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-blue-600">
            <HardHat size={36} className="animate-bounce" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Calculando tu Obra
        </h2>
        <div className="flex items-center gap-3 text-slate-500 font-medium">
          <Loader2 size={20} className="animate-spin text-blue-500" />
          <span className="animate-pulse">
            {loadingMessage || "Iniciando proceso..."}
          </span>
        </div>
        <div className="mt-16 flex gap-8 opacity-20">
          <Truck size={32} />
          <Calculator size={32} />
          <Wrench size={32} />
        </div>
      </div>
    );
  }

  // --- Renderizado de Pantalla de Éxito ---
  if (currentStep > totalSteps) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full bg-white rounded-[2.5rem] p-10 shadow-2xl animate-in fade-in zoom-in duration-700 border border-slate-100">
          <div className="flex flex-col md:flex-row items-center gap-6 mb-10 border-b border-slate-100 pb-10">
            <div className="bg-green-100 p-5 rounded-3xl text-green-600">
              <CheckCircle2 size={48} />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-black text-slate-900">
                ¡Pedido Enviado!
              </h2>
              <p className="text-slate-500 text-lg">
                Hemos recibido tu configuración y lista de materiales.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="font-bold text-slate-800 flex items-center gap-2 text-xl">
                <ClipboardList size={22} className="text-blue-600" />{" "}
                Configuración Base
              </h3>
              <div className="grid grid-cols-1 gap-3 text-sm">
                {[
                  { l: "Proyecto", v: formData.projectType },
                  { l: "Estructura", v: formData.system },
                  { l: "Superficie", v: formData.surface + " m²" },
                  { l: "Acabados", v: formData.quality },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100"
                  >
                    <span className="text-slate-400 font-semibold uppercase tracking-tighter">
                      {item.l}
                    </span>
                    <span className="text-slate-800 font-bold capitalize">
                      {item.v}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-bold text-slate-800 flex items-center gap-2 text-xl">
                <Plus size={22} className="text-blue-600" /> Extras y
                Documentación
              </h3>
              <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 h-full">
                {formData.customMaterials.length > 0 ? (
                  <ul className="space-y-2 mb-6">
                    {formData.customMaterials.map((m) => (
                      <li
                        key={m.id}
                        className="flex items-center gap-2 text-slate-700 text-sm"
                      >
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        <span className="font-bold">{m.name}</span> — {m.qty}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-400 text-sm italic mb-6">
                    Sin materiales manuales adicionales.
                  </p>
                )}

                {formData.attachedFile ? (
                  <div className="flex items-center gap-4 p-4 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-200">
                    <FileText size={24} />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold opacity-80">
                        LISTA ADJUNTA
                      </span>
                      <span className="text-sm font-bold truncate max-w-[180px]">
                        {formData.attachedFile.name}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-4 bg-slate-200 text-slate-500 rounded-2xl border border-slate-300 border-dashed">
                    <AlertCircle size={20} />
                    <span className="text-xs font-bold uppercase">
                      Sin PDF adjunto
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="w-full mt-12 bg-slate-900 text-white py-5 rounded-3xl font-bold text-lg hover:bg-black transition-all transform hover:-translate-y-1 shadow-xl shadow-slate-200"
          >
            Iniciar Nueva Configuración
          </button>
        </div>
      </div>
    );
  }

  const currentStepData = steps.find((s) => s.id === currentStep);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 overflow-hidden border border-slate-100 flex flex-col">
        {/* Progress bar */}
        <div className="w-full bg-slate-100 h-2.5">
          <div
            className="bg-blue-600 h-full transition-all duration-700 ease-in-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>

        <div className="p-8 md:p-14">
          {/* Header del paso */}
          <div className="mb-10">
            <span className="text-blue-600 font-extrabold text-xs tracking-[0.2em] uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Etapa {currentStep} de {totalSteps}
            </span>
            <h1 className="text-4xl font-black text-slate-900 mt-4 leading-tight">
              {currentStep === 15
                ? "Personalización Final"
                : currentStepData.title}
            </h1>
            <p className="text-slate-500 text-lg mt-2 font-medium">
              {currentStep === 15
                ? "Agrega materiales específicos o sube tu propia lista."
                : currentStepData.subtitle}
            </p>
          </div>

          {/* Contenido dinámico */}
          {currentStep === 15 ? (
            <div className="space-y-10 animate-in slide-in-from-bottom-6 duration-500">
              {/* Sección A: Lista de materiales manuales */}
              <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-3 text-lg">
                  <div className="bg-blue-600 p-1.5 rounded-lg text-white">
                    <Plus size={18} />
                  </div>
                  ¿Falta algo en concreto?
                </h3>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <input
                    type="text"
                    placeholder="Nombre del material (ej: Cemento blanco)"
                    className="flex-1 bg-white p-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all shadow-sm font-medium"
                    value={tempMaterial.name}
                    onChange={(e) =>
                      setTempMaterial({ ...tempMaterial, name: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Cantidad"
                    className="w-full sm:w-32 bg-white p-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all shadow-sm font-medium"
                    value={tempMaterial.qty}
                    onChange={(e) =>
                      setTempMaterial({ ...tempMaterial, qty: e.target.value })
                    }
                  />
                  <button
                    onClick={handleAddMaterial}
                    disabled={!tempMaterial.name || !tempMaterial.qty}
                    className="bg-blue-600 text-white p-4 rounded-2xl hover:bg-blue-700 transition-all disabled:opacity-50 disabled:grayscale"
                  >
                    <Plus size={24} />
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.customMaterials.length > 0 ? (
                    formData.customMaterials.map((m) => (
                      <div
                        key={m.id}
                        className="flex justify-between items-center bg-white p-5 rounded-2xl border border-slate-100 shadow-sm animate-in fade-in slide-in-from-right-2"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span className="text-slate-800 font-bold">
                            {m.name}
                          </span>
                          <span className="text-slate-400 text-sm font-medium italic">
                            — {m.qty}
                          </span>
                        </div>
                        <button
                          onClick={() => handleRemoveMaterial(m.id)}
                          className="text-slate-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-slate-400 text-sm font-medium border-2 border-dashed border-slate-200 rounded-3xl">
                      Aún no has agregado materiales extra.
                    </div>
                  )}
                </div>
              </div>

              {/* Sección B: Carga de PDF */}
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf"
                  id="pdf-input"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="pdf-input"
                  className={`
                    flex flex-col items-center justify-center p-12 border-4 border-dashed rounded-[2.5rem] cursor-pointer transition-all
                    ${
                      formData.attachedFile
                        ? "bg-blue-50 border-blue-400 scale-[1.01]"
                        : "bg-white border-slate-100 hover:border-blue-200 hover:bg-slate-50"
                    }
                  `}
                >
                  {formData.attachedFile ? (
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-blue-600 text-white p-5 rounded-[2rem] mb-4 shadow-xl rotate-3">
                        <FileText size={48} />
                      </div>
                      <h4 className="text-xl font-black text-blue-900">
                        {formData.attachedFile.name}
                      </h4>
                      <p className="text-blue-500 font-bold text-sm mt-1 uppercase tracking-widest">
                        {formData.attachedFile.size}
                      </p>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setFormData({ ...formData, attachedFile: null });
                        }}
                        className="mt-6 flex items-center gap-2 text-red-500 font-bold text-sm hover:underline bg-white px-4 py-2 rounded-full shadow-sm"
                      >
                        <X size={16} /> CAMBIAR ARCHIVO
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="bg-slate-100 p-6 rounded-full text-slate-400 mb-6 transform group-hover:scale-110 transition-transform">
                        <Upload size={40} />
                      </div>
                      <span className="text-2xl font-black text-slate-800">
                        Cargar Lista de Materiales
                      </span>
                      <p className="text-slate-400 font-medium mt-2">
                        Arrastra tu archivo aquí o haz clic para buscar (Solo
                        PDF)
                      </p>
                    </>
                  )}
                </label>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              {currentStepData.options.map((option) => {
                const isSelected = currentStepData.multi
                  ? formData[currentStepData.field].includes(option.id)
                  : formData[currentStepData.field] === option.id;

                return (
                  <button
                    key={option.id}
                    onClick={() =>
                      handleOptionClick(
                        currentStepData.field,
                        option.id,
                        currentStepData.multi,
                      )
                    }
                    className={`
                      relative group flex flex-col items-center justify-center p-8 rounded-[2rem] border-2 transition-all duration-300
                      ${
                        isSelected
                          ? "border-blue-600 bg-blue-50 text-blue-700 shadow-xl shadow-blue-100/50 transform scale-[1.03]"
                          : "border-slate-50 bg-white hover:border-slate-200 text-slate-500 hover:shadow-lg"
                      }
                    `}
                  >
                    <div
                      className={`mb-5 transition-transform group-hover:scale-110 ${isSelected ? "text-blue-600" : "text-slate-300"}`}
                    >
                      {option.icon}
                    </div>
                    <span className="font-extrabold text-center leading-tight tracking-tight uppercase text-xs">
                      {option.label}
                    </span>
                    {isSelected && (
                      <div className="absolute top-4 right-4 text-blue-600 animate-in zoom-in">
                        <CheckCircle2 size={20} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Navegación inferior */}
          <div className="flex justify-between items-center pt-10 border-t border-slate-100 mt-12">
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all ${currentStep === 1 ? "opacity-0" : "text-slate-400 hover:text-slate-900 hover:bg-slate-100"}`}
            >
              <ArrowLeft size={20} /> Atrás
            </button>

            <button
              onClick={
                currentStep === totalSteps
                  ? handleSubmit
                  : () => setCurrentStep(currentStep + 1)
              }
              disabled={
                currentStep < 9 &&
                (!formData[currentStepData.field] ||
                  (currentStepData.multi &&
                    formData[currentStepData.field].length === 0))
              }
              className="flex items-center gap-3 px-10 py-5 rounded-2xl font-black bg-blue-600 text-white hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-300 transition-all shadow-xl shadow-blue-200"
            >
              {currentStep === totalSteps
                ? "Finalizar y Procesar"
                : "Siguiente Paso"}
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
      <p className="mt-8 text-slate-400 text-xs font-bold tracking-widest uppercase flex items-center gap-2 italic">
        <HardHat size={12} /> Versión Profesional — Smart Build v2.5
      </p>
    </div>
  );
};

export default App;
