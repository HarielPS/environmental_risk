'use client'
import React, { useState } from 'react';
import {useRouter} from 'next/navigation';
import { 
  Building2, 
  Calculator, 
  ClipboardCheck,
  BrainCircuit,
  ChevronRight, 
  HardHat, 
  ArrowRight,
  ShieldCheck,
  Clock,
  Menu,
  X
} from 'lucide-react';

// Componente de Tarjeta de Opción Principal
const FlowCard = ({ title, description, items, icon: Icon, onClick, badge, trustText, primaryColor }) => (
  <div 
    onClick={onClick}
    className="group relative flex flex-col bg-white border border-slate-200 rounded-2xl p-8 transition-all duration-300 hover:border-amber-500 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
  >
    {badge && (
      <span className="absolute -top-3 right-8 bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full border border-amber-200 uppercase tracking-wider">
        {badge}
      </span>
    )}
    
    <div className={`w-14 h-14 rounded-xl ${primaryColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
      <Icon className="text-white" size={28} />
    </div>

    <h3 className="text-2xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 mb-6 leading-relaxed">
      {description}
    </p>

    <ul className="space-y-3 mb-8 flex-grow">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-3 text-sm text-slate-500">
          <ShieldCheck size={18} className="text-amber-500 mt-0.5 flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>

    <div className="mt-auto">
      <button className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white font-semibold py-4 rounded-xl group-hover:bg-amber-600 transition-colors duration-300">
        Continuar
        <ChevronRight size={20} />
      </button>
      <div className="flex items-center justify-center gap-1.5 mt-4 text-xs font-medium text-slate-400">
        <Clock size={14} />
        {trustText}
      </div>
    </div>
  </div>
);

export default function App() {
    const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-slate-900 p-2 rounded-lg group-hover:bg-amber-600 transition-colors">
              <Building2 className="text-white" size={24} />
            </div>
            <span className="text-xl font-black tracking-tight uppercase">Ori<span className="text-amber-600">on</span></span>
          </div>

          {/* <div className="hidden md:flex items-center gap-4">
            <button className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
              Iniciar sesión
            </button>
            <button className="px-6 py-2.5 text-sm font-bold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
              Registrarse
            </button>
          </div> */}

          <button className="md:hidden p-2">
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="relative pt-16 pb-24 px-6">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-gradient-to-b from-amber-50/50 to-transparent -z-10 rounded-full blur-3xl"></div>

        <div className="max-w-6xl mx-auto">
          {/* Hero Content */}
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-widest mb-4">
              <HardHat size={14} className="text-amber-600" />
              Portal B2B Profesional
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              Selecciona cómo quieres <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500">empezar tu proyecto</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto">
              Optimiza tu gestión de suministros con auditorías LCA especializadas o genera cotizaciones rápidas para tu obra en minutos.
            </p>
          </div>

          {/* Cards Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <FlowCard 
              title="Tengo un desarrollo actual con auditoría"
              description="Ideal para proyectos en marcha que requieren validación técnica y cumplimiento normativo."
              badge="Recomendado"
              icon={ClipboardCheck}
              primaryColor="bg-blue-600"
              trustText="Toma 5-8 min completar"
              onClick={() => router.push('/auditoria')}
              items={[
                "Subida de reportes técnicos existentes",
                "Validación de cumplimiento LCA y sostenibilidad",
                "Acceso a red de proveedores certificados"
              ]}
            />

            <FlowCard 
              title="Quiero solo hacer una cotización"
              description="Obtén precios competitivos de materiales y servicios para tu próxima obra de forma inmediata."
              icon={Calculator}
              primaryColor="bg-slate-800"
              trustText="Toma menos de 3 min"
              onClick={()=> router.push('/start')}
              items={[
                "Estimación rápida por materiales en obra",
                "Comparativa de precios de mercado real",
                "Los mejores proveedores con menos emisiones"
              ]}
            />

            <FlowCard 
              title="Tengo los planos de un desarrollo por iniciar"
              description="Ideal para proyectos definidos que buscan optimizar costos y sostenibilidad desde el inicio."
              badge="Beta"
              icon={BrainCircuit }
              primaryColor="bg-blue-600"
              trustText="Toma 1-2 min completar"
              onClick={() => router.push('/planos')}
              items={[
                "Carga de planos y especificaciones",
                "Análisis preliminar de materiales",
                "Acceso a red de proveedores certificados"
              ]}
            />
          </div>
          

          {/* Bottom Trust Section */}
          <div className="mt-20 pt-10 border-t border-slate-200 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2 grayscale brightness-0">
              <span className="font-bold text-lg italic">LOGOPRESA_A</span>
            </div>
            <div className="flex items-center gap-2 grayscale brightness-0">
              <span className="font-bold text-lg italic">CONSTRU-MAX</span>
            </div>
            <div className="flex items-center gap-2 grayscale brightness-0">
              <span className="font-bold text-lg italic">STEEL_CORP</span>
            </div>
            <div className="flex items-center gap-2 grayscale brightness-0">
              <span className="font-bold text-lg italic">INFRA-PRO</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer minimalista */}
      <footer className="bg-white py-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <p>© 2026 Orion Marketplace B2B. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-600">Soporte</a>
            <a href="#" className="hover:text-slate-600">Términos</a>
            <a href="#" className="hover:text-slate-600">Privacidad</a>
          </div>
        </div>
      </footer>
    </div>
  );
}