"use client";

import React from "react";
import {
  MapPin,
  FileText,
  Leaf,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Info,
} from "lucide-react";
import { useRouter } from "next/navigation";

const auditoriaData = {
  obra_id: "OBRA-001",
  obra_tipo: "vivienda_unifamiliar",
  obra_descripcion: "Casa chica 1 nivel, 45 m2, muros de block, losa de concreto",
  ubicacion: {
    pais: "MX",
    estado: "CDMX",
    alcaldia_municipio: "Iztapalapa",
  },
  normativa_objetivo: {
    co2: ["RENE", "ISO_14064-1", "ISO_14067", "GHG_Protocol_Scope3"],
    ambiental_obra: [
      "NACDMX-007-RNAT-2019",
      "NADF-018-AMBT-2009",
      "Ley_Residuos_Solidos_CDMX",
    ],
    construccion_base: ["Reglamento_Construcciones_CDMX"],
    instalaciones_opcional: ["NOM-001-SEDE-2012"],
  },
  materiales: [
    {
      material_nombre: "Cemento CPC 30R",
      categoria: "cemento",
      cantidad: 8.0,
      unidad: "t",
      costo_unitario_mxn: 3200,
      factor_emision_kgco2e_por_unidad: 850,
      co2e_kg: 6800,
      proveedor: { nombre: "Proveedor Local A", dist_km: 25, transporte: "camion" },
    },
    {
      material_nombre: "Varilla 3/8 Grado 42",
      categoria: "acero",
      cantidad: 1200,
      unidad: "kg",
      costo_unitario_mxn: 22,
      factor_emision_kgco2e_por_unidad: 1.7,
      co2e_kg: 2040,
      proveedor: { nombre: "Acerera B", dist_km: 60, transporte: "camion" },
    },
    {
      material_nombre: "Concreto premezclado f'c=200",
      categoria: "concreto",
      cantidad: 25,
      unidad: "m3",
      costo_unitario_mxn: 2300,
      factor_emision_kgco2e_por_unidad: 300,
      co2e_kg: 7500,
      proveedor: {
        nombre: "Planta Concreto C",
        dist_km: 18,
        transporte: "camion_olla",
      },
    },
    {
      material_nombre: "Block hueco 12x20x40",
      categoria: "mamposteria",
      cantidad: 1800,
      unidad: "pza",
      costo_unitario_mxn: 16,
      factor_emision_kgco2e_por_unidad: 1.1,
      co2e_kg: 1980,
      proveedor: { nombre: "Blockera D", dist_km: 35, transporte: "camion" },
    },
    {
      material_nombre: "Mortero/arena/grava (mezcla)",
      categoria: "agregados",
      cantidad: 20,
      unidad: "t",
      costo_unitario_mxn: 450,
      factor_emision_kgco2e_por_unidad: 12,
      co2e_kg: 240,
      proveedor: {
        nombre: "Banco Materiales E",
        dist_km: 40,
        transporte: "camion",
      },
    },
    {
      material_nombre: "Yeso/pasta/recubrimientos",
      categoria: "acabados",
      cantidad: 2.0,
      unidad: "t",
      costo_unitario_mxn: 4200,
      factor_emision_kgco2e_por_unidad: 250,
      co2e_kg: 500,
      proveedor: { nombre: "Distribuidor F", dist_km: 20, transporte: "camioneta" },
    },
    {
      material_nombre: "Pintura vinílica",
      categoria: "acabados",
      cantidad: 120,
      unidad: "L",
      costo_unitario_mxn: 95,
      factor_emision_kgco2e_por_unidad: 2.5,
      co2e_kg: 300,
      proveedor: { nombre: "Ferretería G", dist_km: 8, transporte: "camioneta" },
    },
  ],
  resumen: {
    costo_estimado_mxn: 0,
    co2e_total_kg: 19360,
    notas: ["Considerar verificación de factores de emisión con EPDs para materiales clave."],
  },
};

const currencyFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 text-slate-700 px-3 py-1 text-xs font-semibold">
      {children}
    </span>
  );
}

function CO2Chip({ label, valueKg }) {
  let level = "Bajo";
  if (valueKg > 5000) level = "Alto";
  else if (valueKg > 2000) level = "Medio";

  const colors = {
    Bajo: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Medio: "bg-amber-50 text-amber-700 border-amber-200",
    Alto: "bg-rose-50 text-rose-700 border-rose-200",
  };

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${colors[level]}`}
    >
      <Leaf size={12} className="shrink-0" />
      <span>{label}</span>
      <span className="opacity-80">
        {valueKg.toLocaleString("es-MX")} kg CO₂e
      </span>
    </div>
  );
}

export default function AuditoriaResumenPage() {
  const router = useRouter();
  const data = auditoriaData;

  const totalCosto = data.materiales.reduce(
    (acc, m) => acc + m.cantidad * m.costo_unitario_mxn,
    0
  );

  const totalCO2FromMaterials = data.materiales.reduce(
    (acc, m) => acc + m.co2e_kg,
    0
  );

  const totalCO2 =
    data.resumen.co2e_total_kg && data.resumen.co2e_total_kg > 0
      ? data.resumen.co2e_total_kg
      : totalCO2FromMaterials;

  const resumenCosto =
    data.resumen.costo_estimado_mxn && data.resumen.costo_estimado_mxn > 0
      ? data.resumen.costo_estimado_mxn
      : totalCosto;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={() => router.push("/auditoria")}
            className="inline-flex cursor-pointer items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900"
          >
            <ArrowLeft size={16} />
            Volver a Auditoría
          </button>

          <div className="flex flex-col items-end">
            <span className="text-[11px] uppercase tracking-[0.16em] text-slate-400 font-semibold">
              Auditoría de obra
            </span>
            <h1 className="text-sm md:text-base font-black tracking-tight">
              Resumen de información extraída del PDF
            </h1>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 px-4 py-8 md:px-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* OBRA / UBICACIÓN */}
          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-[0.18em]">
                  <FileText size={16} className="text-blue-600" />
                  Obra auditada
                </div>
                <h2 className="text-lg md:text-xl font-black tracking-tight">
                  {data.obra_descripcion}
                </h2>
                <p className="text-xs md:text-sm text-slate-500">
                  ID:{" "}
                  <span className="font-semibold text-slate-700">
                    {data.obra_id}
                  </span>{" "}
                  · Tipo:{" "}
                  <span className="font-semibold text-slate-700">
                    {data.obra_tipo.replace("_", " ")}
                  </span>
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl border border-slate-200 px-4 py-3 flex items-start gap-3 text-xs md:text-sm">
                <div className="mt-0.5">
                  <MapPin size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800 flex flex-wrap gap-1">
                    {data.ubicacion.alcaldia_municipio},{" "}
                    {data.ubicacion.estado}
                  </p>
                  <p className="text-slate-500">
                    {data.ubicacion.pais === "MX" ? "México" : data.ubicacion.pais}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-400">
                    Datos extraídos automáticamente del PDF de proyecto / ficha
                    técnica para configurar la auditoría.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* NORMATIVA OBJETIVO */}
          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400 font-semibold">
                  Normativa objetivo
                </p>
                <h2 className="mt-1 text-base md:text-lg font-black tracking-tight">
                  Alcances de auditoría configurados
                </h2>
                <p className="mt-1 text-xs md:text-sm text-slate-500 max-w-xl">
                  Este conjunto define qué normas se usarán en el RAG para
                  generar checklist de cumplimiento, faltantes y evidencia
                  requerida.
                </p>
              </div>

              <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
                <Info size={16} />
                <span>Campos detectados desde el documento de entrada.</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4">
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-400 font-semibold mb-2">
                  CO₂ / GEI
                </p>
                <div className="flex flex-wrap gap-2">
                  {data.normativa_objetivo.co2.map((norma) => (
                    <Badge key={norma}>{norma}</Badge>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4">
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-400 font-semibold mb-2">
                  Ambiental de obra
                </p>
                <div className="flex flex-wrap gap-2">
                  {data.normativa_objetivo.ambiental_obra.map((norma) => (
                    <Badge key={norma}>{norma}</Badge>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4">
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-400 font-semibold mb-2">
                  Construcción base
                </p>
                <div className="flex flex-wrap gap-2">
                  {data.normativa_objetivo.construccion_base.map((norma) => (
                    <Badge key={norma}>{norma}</Badge>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4">
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-400 font-semibold mb-2">
                  Instalaciones (opcional)
                </p>
                <div className="flex flex-wrap gap-2">
                  {data.normativa_objetivo.instalaciones_opcional.map(
                    (norma) => (
                      <Badge key={norma}>{norma}</Badge>
                    )
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* MATERIALES / HUELLA CO2 */}
          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400 font-semibold">
                  Materiales identificados
                </p>
                <h2 className="mt-1 text-base md:text-lg font-black tracking-tight">
                  Insumos y huella de carbono reportada
                </h2>
                <p className="mt-1 text-xs md:text-sm text-slate-500 max-w-2xl">
                  Cada material incluye su factor de emisión (kg CO₂e por
                  unidad) y la huella total asociada a la cantidad reportada en
                  el documento.
                </p>
              </div>

              <CO2Chip
                label="Huella total materiales"
                valueKg={totalCO2}
              />
            </div>

            <div className="overflow-hidden border border-slate-200 rounded-2xl">
              <div className="hidden md:grid grid-cols-[2.3fr,1.1fr,1fr,1.3fr,1.3fr] bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-[0.16em] px-4 py-3">
                <span>Material</span>
                <span>Cantidad</span>
                <span>Costo unitario</span>
                <span>Costo estimado</span>
                <span>Huella CO₂e / Proveedor</span>
              </div>

              <div className="divide-y divide-slate-100">
                {data.materiales.map((m) => {
                  const costoEstimado = m.cantidad * m.costo_unitario_mxn;
                  const porcentajeCO2 =
                    totalCO2 > 0 ? (m.co2e_kg / totalCO2) * 100 : 0;

                  let nivel = "Bajo";
                  if (m.co2e_kg > 4000) nivel = "Alto";
                  else if (m.co2e_kg > 1500) nivel = "Medio";

                  const nivelColors = {
                    Bajo: "bg-emerald-50 text-emerald-700 border-emerald-200",
                    Medio: "bg-amber-50 text-amber-700 border-amber-200",
                    Alto: "bg-rose-50 text-rose-700 border-rose-200",
                  };

                  return (
                    <div
                      key={m.material_nombre}
                      className="px-4 py-4 md:grid md:grid-cols-[2.3fr,1.1fr,1fr,1.3fr,1.3fr] md:items-center gap-3"
                    >
                      {/* Material */}
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-semibold text-slate-900">
                          {m.material_nombre}
                        </p>
                        <p className="text-[11px] uppercase tracking-[0.14em] text-slate-400 font-semibold">
                          {m.categoria}
                        </p>
                        <div
                          className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${nivelColors[nivel]}`}
                        >
                          <Leaf size={11} />
                          <span>{nivel} impacto</span>
                          <span className="opacity-80">
                            {porcentajeCO2.toFixed(1)}% del total
                          </span>
                        </div>
                      </div>

                      {/* Cantidad */}
                      <div className="mt-2 md:mt-0 text-xs text-slate-700">
                        <p className="font-semibold">
                          {m.cantidad.toLocaleString("es-MX")} {m.unidad}
                        </p>
                      </div>

                      {/* Costo unitario */}
                      <div className="mt-2 md:mt-0 text-xs text-slate-700">
                        <p className="font-semibold">
                          {currencyFormatter.format(m.costo_unitario_mxn)}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          por {m.unidad}
                        </p>
                      </div>

                      {/* Costo estimado */}
                      <div className="mt-2 md:mt-0 text-xs text-slate-700">
                        <p className="font-semibold">
                          {currencyFormatter.format(costoEstimado)}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          estimado para la obra
                        </p>
                      </div>

                      {/* CO2 + proveedor */}
                      <div className="mt-3 md:mt-0 flex flex-col gap-1 text-xs text-slate-700">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] text-slate-500">
                            {m.co2e_kg.toLocaleString("es-MX")} kg CO₂e
                          </span>
                          <span className="text-[11px] text-slate-400 text-right">
                            {m.factor_emision_kgco2e_por_unidad.toLocaleString(
                              "es-MX"
                            )}{" "}
                            kg CO₂e / {m.unidad}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="truncate text-[11px] text-slate-500">
                            {m.proveedor.nombre}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {m.proveedor.dist_km} km · {m.proveedor.transporte}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* RESUMEN / NOTAS */}
          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400 font-semibold">
                  Resumen numérico
                </p>
                <h2 className="mt-1 text-base md:text-lg font-black tracking-tight">
                  Foto rápida de la obra
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs">
                <div className="bg-slate-50 rounded-2xl border border-slate-200 px-4 py-2 flex flex-col">
                  <span className="text-[11px] text-slate-400 uppercase tracking-[0.12em] font-semibold">
                    Costo estimado
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {currencyFormatter.format(resumenCosto)}
                  </span>
                </div>

                <div className="bg-slate-50 rounded-2xl border border-slate-200 px-4 py-2 flex flex-col">
                  <span className="text-[11px] text-slate-400 uppercase tracking-[0.12em] font-semibold">
                    Huella total CO₂e
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {totalCO2.toLocaleString("es-MX")} kg
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 rounded-2xl border border-amber-200 px-4 py-4 flex gap-3 text-xs md:text-sm text-amber-900">
              <AlertTriangle size={18} className="mt-1 shrink-0" />
              <div className="space-y-1">
                {data.resumen.notas.map((nota, idx) => (
                  <p key={idx}>{nota}</p>
                ))}
              </div>
            </div>
          </section>

          {/* CTA PARA AVANZAR A PARTNERS */}
          <section className="sticky bottom-4 md:static">
            <div className="max-w-6xl mx-auto">
              <div className="bg-slate-900 text-slate-50 rounded-3xl px-5 py-4 md:px-6 md:py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 shadow-lg shadow-slate-900/20">
                <div className="space-y-1">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400 font-semibold">
                    Siguiente paso
                  </p>
                  <p className="text-sm md:text-base font-semibold">
                    Ver opciones de partners para optimizar costo y huella de carbono.
                  </p>
                  <p className="text-xs text-slate-400 max-w-lg">
                    Usaremos estos materiales como base para buscar proveedores
                    alternativos y combinaciones de suministro que reduzcan la
                    huella CO₂e total de la obra.
                  </p>
                </div>

                <button
                  onClick={() => router.push("/steps")}
                  className="inline-flex items-center cursor-pointer justify-center gap-2 rounded-full bg-emerald-400 px-4 py-2.5 text-xs md:text-sm font-semibold text-slate-900 shadow-sm hover:bg-emerald-300 transition-colors"
                >
                  Continuar con selección de partners
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
