"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  FileText,
  Upload,
  CheckCircle2,
  X,
  AlertCircle,
  Loader2,
  Eye,
  ArrowRight,
  ChevronLeft,
  FileUp,
  CloudUpload,
  Check,
  Building2,
  ExternalLink,
} from "lucide-react";
import { useRouter } from "next/navigation";

// Tipos de documentos requeridos
const REQUIRED_DOCUMENTS = [
  {
    id: "planos",
    title: "Planos de tu desarrollo inmobiliario",
    description:
      "Ingresa los planos arquitectónicos y estructurales en formato PDF.",
    icon: <FileText className="w-6 h-6" />,
  },
];

const TEXTO_CARGA_ANALISIS_PLANOS = [
  "Extrallendo datos de los planos subidos...",
  "Analizando estructuras y materiales...",
  "Analizando planos y especificaciones...",
  "Comparando con base de datos de materiales sostenibles...",
  "Generando recomendaciones personalizadas...",
  "Casi listo, preparando resultados finales...",
];

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB

const App = () => {
  const router = useRouter();
  // Estados de la aplicación
  const [loadingText, setLoadingText] = useState(TEXTO_CARGA_ANALISIS_PLANOS[0]);

  const [view, setView] = useState("upload"); // 'upload' | 'success'
  const [files, setFiles] = useState({ planos: null });
  const [uploading, setUploading] = useState({ planos: false });
  const [progress, setProgress] = useState({ planos: 0 });
  const [errors, setErrors] = useState({ planos: null });
  const [toast, setToast] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Función simulada para enviar archivos al backend
  const uploadFilesToBackend = async (data, onTextChange) => {
    return new Promise((resolve, reject) => {
      console.log("Enviando archivos al servidor...", data);

      const randomDelay = (min, max) => Math.random() * (max - min) + min;

      let i = 0;

      const tick = () => {
        const texto = TEXTO_CARGA_ANALISIS_PLANOS[i];

        if (onTextChange) {
          onTextChange(texto); // 🔥 actualiza React / UI
        }

        i++;

        if (i >= TEXTO_CARGA_ANALISIS_PLANOS.length) {
          Math.random() > 0.05
            ? resolve({ status: "success" })
            : reject(new Error("Error de conexión"));
          return;
        }

        setTimeout(tick, randomDelay(2000, 5000));
      };

      tick();
    });
  };

  const serverIsReady = async () => {
    return new Promise((resolve) => {
      console.log("Esperando a que el servidor procese los archivos...");
      setTimeout(() => {
        resolve(true);
      }, 2000);
    });
  };

  const simulateUpload = (id) => {
    setUploading((prev) => ({ ...prev, [id]: true }));
    setProgress((prev) => ({ ...prev, [id]: 0 }));

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 30;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setUploading((prev) => ({ ...prev, [id]: false }));
      }
      setProgress((prev) => ({ ...prev, [id]: currentProgress }));
    }, 400);
  };

  const handleFileChange = (id, file) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      setErrors((prev) => ({
        ...prev,
        [id]: "Solo se permiten archivos PDF.",
      }));
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setErrors((prev) => ({ ...prev, [id]: "El archivo excede los 25 MB." }));
      return;
    }
    setErrors((prev) => ({ ...prev, [id]: null }));
    setFiles((prev) => ({ ...prev, [id]: file }));
    simulateUpload(id);
  };

  const removeFile = (id) => {
    setFiles((prev) => ({ ...prev, [id]: null }));
    setProgress((prev) => ({ ...prev, [id]: 0 }));
    setErrors((prev) => ({ ...prev, [id]: null }));
  };

  const isAllUploaded =
    Object.values(files).every((file) => file !== null) &&
    Object.values(uploading).every((u) => !u);

  const handleContinue = async () => {
  if (!isAllUploaded) {
    setToast("Faltan documentos por subir o validar.");
    return;
  }

  setIsSubmitting(true);
  setLoadingText(TEXTO_CARGA_ANALISIS_PLANOS[0]);

  try {
    await uploadFilesToBackend(files, setLoadingText); // ✅ pasar callback
    await serverIsReady();

    setView("success");         // ✅ ahora sí usas la vista success
    router.push("/resultados");      // ✅ navega solo si fue éxito
  } catch (error) {
    console.error(error);
    setToast("Hubo un problema al procesar los archivos. Inténtalo de nuevo.");
  } finally {
    setIsSubmitting(false);
  }
};


  const formatSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // --- VISTA DE ÉXITO ---
  if (view === "success") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-in zoom-in duration-500">
            <Check size={40} strokeWidth={3} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            ¡Documentos recibidos!
          </h2>
          <p className="text-slate-500 mb-8">
            Hemos comenzado el análisis de sostenibilidad de tu proyecto. Te
            notificaremos cuando las recomendaciones estén listas.
          </p>
          <div className="space-y-3">
            <button className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
              <Building2 size={18} />
              Ir al Dashboard del Proyecto
            </button>
            <button
              onClick={() => setView("upload")}
              className="w-full bg-white text-slate-600 border border-gray-200 font-bold py-3 rounded-xl hover:bg-gray-50 transition-all"
            >
              Subir más documentos
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-900 pb-24">
      {/* Loading Overlay Global */}
      {isSubmitting && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6 text-center">
          <div className="bg-white rounded-3xl p-10 shadow-2xl max-w-sm w-full animate-in fade-in zoom-in duration-300">
            <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mx-auto mb-6" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              {loadingText}
            </h3>
            <p className="text-slate-500 text-sm">
              Estamos enviando tus archivos a nuestros servidores para el
              análisis ambiental. Esto puede tardar unos segundos...
            </p>
          </div>
        </div>
      )}

      {/* Header Superior */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Sube tus documentos
            </h1>
            <p className="text-slate-500 text-sm md:text-base mt-1">
              Necesitamos los planos de tu desarrollo para sugerirte provedores
              sostenibles.
            </p>
          </div>
          {/* <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Paso 1 de 3
            </span>
            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-1/3"></div>
            </div>
          </div> */}
        </div>
      </header>

      {/* Cuerpo Principal */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REQUIRED_DOCUMENTS.map((doc) => (
            <UploadCard
              key={doc.id}
              doc={doc}
              file={files[doc.id]}
              isUploading={uploading[doc.id]}
              progress={progress[doc.id]}
              error={errors[doc.id]}
              onFileSelect={(file) => handleFileChange(doc.id, file)}
              onRemove={() => removeFile(doc.id)}
              formatSize={formatSize}
            />
          ))}
        </div>
      </main>

      {/* Footer Fijo */}
      <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-6 shadow-lg z-20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-medium transition-colors">
            <ChevronLeft size={20} />
            Volver
          </button>

          <div className="flex gap-4">
            {/* <button className="px-6 py-2.5 text-slate-600 hover:bg-gray-50 font-medium rounded-lg transition-colors border border-gray-200">
              Guardar y salir
            </button> */}
            <button
              onClick={handleContinue}
              disabled={!isAllUploaded || isSubmitting}
              className={`flex items-center gap-2 px-8 py-2.5 rounded-lg font-semibold transition-all shadow-sm ${
                isAllUploaded && !isSubmitting
                  ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? "Enviando..." : "Finalizar y Continuar"}
              {!isSubmitting && <ArrowRight size={18} />}
            </button>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-32 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-slate-800 text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl border border-slate-700 animate-in slide-in-from-bottom-4">
            <AlertCircle size={18} className="text-amber-400" />
            <span className="text-sm font-medium">{toast}</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Componente de Tarjeta de Carga
const UploadCard = ({
  doc,
  file,
  isUploading,
  progress,
  error,
  onFileSelect,
  onRemove,
  formatSize,
}) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  return (
    <div
      className={`flex flex-col h-full bg-white rounded-2xl border transition-all duration-300 ${
        error
          ? "border-red-200 ring-1 ring-red-100 shadow-red-50"
          : file
            ? "border-emerald-100 shadow-sm"
            : "border-gray-200 shadow-sm hover:shadow-md"
      }`}
    >
      {/* Cabecera de la tarjeta */}
      <div className="p-6 pb-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
            file
              ? "bg-emerald-50 text-emerald-600"
              : "bg-slate-50 text-slate-500"
          }`}
        >
          {doc.icon}
        </div>
        <h3 className="text-lg font-bold text-slate-800 leading-snug">
          {doc.title}
        </h3>
        <p className="text-sm text-slate-500 mt-2 leading-relaxed">
          {doc.description}
        </p>
      </div>

      {/* Cuerpo de la tarjeta / Dropzone */}
      <div className="flex-grow px-6 pb-6">
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          accept=".pdf"
          onChange={(e) => onFileSelect(e.target.files[0])}
        />

        {!file && !isUploading && (
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
            className={`cursor-pointer group relative overflow-hidden rounded-xl border-2 border-dashed transition-all p-8 flex flex-col items-center justify-center gap-3 text-center ${
              isDragging
                ? "border-emerald-400 bg-emerald-50"
                : "border-gray-100 bg-gray-50/50 hover:bg-gray-50 hover:border-gray-300"
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
              <Upload
                size={18}
                className="text-slate-400 group-hover:text-emerald-500"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-700">
                Seleccionar PDF
              </p>
              <p className="text-xs text-slate-400 mt-1">
                o arrastra el archivo aquí
              </p>
            </div>
            <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mt-2">
              Máx 25 MB
            </p>
          </div>
        )}

        {isUploading && (
          <div className="rounded-xl border border-gray-100 bg-white p-6 flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
            <div className="w-full text-center">
              <div className="flex justify-between items-center mb-2 px-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                  Validando...
                </span>
                <span className="text-xs font-bold text-emerald-600">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-emerald-50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {file && !isUploading && (
          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/30 p-4 flex items-start gap-3">
              <div className="mt-1">
                <CheckCircle2 size={18} className="text-emerald-500" />
              </div>
              <div className="flex-grow min-w-0">
                <p className="text-sm font-bold text-slate-800 truncate">
                  {file.name}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {formatSize(file.size)} • PDF
                </p>
              </div>
              <button
                onClick={onRemove}
                className="text-slate-400 hover:text-red-500 transition-colors p-1"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex items-center justify-between gap-4">
              <button
                onClick={() => fileInputRef.current.click()}
                className="text-xs font-bold text-slate-600 hover:text-emerald-600 transition-colors underline decoration-slate-200 underline-offset-4"
              >
                Reemplazar
              </button>
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    window.open(URL.createObjectURL(file), "_blank")
                  }
                  className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-md transition-colors"
                >
                  <Eye size={14} />
                  Vista previa
                </button>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 flex items-center gap-2 text-red-600">
            <AlertCircle size={14} />
            <span className="text-xs font-medium">{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
