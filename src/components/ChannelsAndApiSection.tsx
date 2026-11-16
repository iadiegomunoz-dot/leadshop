import { ArrowUpRight, Check, Code2, Plus } from 'lucide-react';
import { useState } from 'react';
import { OUTBOUND_CHANNELS } from '../data/zleadsData';
import { ThreeCursorArrow } from './ThreeCursorArrow';

interface ChannelsAndApiSectionProps {
  onStartOrder: (presetQuery?: string) => void;
}

export function ChannelsAndApiSection({ onStartOrder }: ChannelsAndApiSectionProps) {
  const [selectedChannels, setSelectedChannels] = useState<string[]>([
    'whatsapp',
    'website',
  ]);
  const [showApiSnippet, setShowApiSnippet] = useState(false);

  const toggleChannel = (id: string) => {
    setSelectedChannels((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };


  return (
    <div className="space-y-10 pt-6 pb-8">
      {/* Channels Customization Section */}
      <section
        id="canales"
        className="rounded-[28px] md:rounded-[32px] bg-[#EFF4FA] p-6 sm:p-8 lg:p-10"
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-[#3368F7] px-4 py-1 text-[12px] font-bold text-white">
              La base se adapta a tu outbound
            </span>
            <h2 className="section-title mt-3 text-[25px] sm:text-[32px] font-bold leading-[1.2] tracking-[-0.02em] text-[#181D27]">
              Elige los canales de contacto para cada negocio
            </h2>
            <p className="mt-2.5 text-[14px] leading-[1.55] text-[#4C5565]">
              Eliges cómo llegar a cada cliente: 2 canales vienen incluidos (WhatsApp y web
              por defecto, o los que prefieras). Los canales adicionales se cotizan
              según el volumen de tu pack.
            </p>
          </div>

          <div className="shrink-0 rounded-[20px] bg-white px-5 py-3.5 shadow-[0_4px_16px_rgba(24,29,39,0.04)]">
            <div className="text-[11.5px] font-semibold text-[#60697A]">
              Canales en tu base ({selectedChannels.length} seleccionados)
            </div>
            <div className="mt-0.5 text-[22px] font-extrabold text-[#2B62F6] tabular-nums">
              {selectedChannels.length}
              <span className="ml-1.5 text-[12px] font-bold text-[#60697A]">
                · 2 incluidos
              </span>
            </div>
          </div>
        </div>

        {/* 10 Interactive Channel Cards */}
        <div className="mt-7 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {OUTBOUND_CHANNELS.map((channel) => {
            const selectedIndex = selectedChannels.indexOf(channel.id);
            const isSelected = selectedIndex !== -1;
            const isIncludedSlot = isSelected && selectedIndex < 2;

            return (
              <button
                key={channel.id}
                type="button"
                onClick={() => toggleChannel(channel.id)}
                className={`flex flex-col justify-between rounded-[18px] p-4 text-left transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B62F6] ${
                  isSelected
                    ? 'blue-card-gradient text-white shadow-[0_8px_20px_rgba(43,98,246,0.22)]'
                    : 'bg-white text-[#181D27] hover:bg-white/80'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[14px] font-bold">{channel.name}</span>
                  <span
                    className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${
                      isSelected
                        ? 'bg-[#EAFC66] text-[#181D27]'
                        : 'bg-[#EFF4FA] text-[#60697A]'
                    }`}
                  >
                    {isSelected ? (
                      <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                    ) : (
                      <Plus className="h-3.5 w-3.5" />
                    )}
                  </span>
                </div>
                <div
                  className={`mt-3 text-[11.5px] font-semibold tabular-nums ${
                    isSelected
                      ? isIncludedSlot
                        ? 'text-[#EAFC66]'
                        : 'text-white/85'
                      : 'text-[#60697A]'
                  }`}
                >
                  {isIncludedSlot ? 'Incluido (2 base)' : 'Opcional'}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() =>
              onStartOrder(
                `Canales seleccionados: ${selectedChannels.join(', ')}`
              )
            }
            className="group inline-flex items-center gap-3 rounded-full bg-white py-2 pl-5 pr-2 text-[13.5px] font-bold text-[#181D27] shadow-sm hover:shadow transition-all cursor-pointer"
          >
            <span>Armar base con estos canales</span>
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#EAFC66] text-[#181D27] transition-transform duration-200 group-hover:rotate-12">
              <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.2]" />
            </span>
          </button>
        </div>
      </section>

      {/* API y Conectores Card */}
      <section className="reveal-card rounded-[24px] bg-[#F4F6FA] p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <div className="inline-flex items-center gap-2 text-[12.5px] font-bold text-[#2B62F6]">
              <Code2 className="h-4 w-4" />
              <span>API y conectores</span>
            </div>
            <h3 className="mt-2 text-[20px] sm:text-[22px] font-bold text-[#181D27]">
              Conecta LeadShop directo a tu stack o asistente
            </h3>
            <p className="mt-1.5 text-[13.5px] text-[#60697A]">
              Compatible vía MCP y API. Marcas de sus dueños, sin afiliación ni convenio.
            </p>
          </div>

          <div className="relative hidden md:block h-[120px] w-[150px] shrink-0">
            <ThreeCursorArrow />
            <span className="float-chip absolute -bottom-1 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-[#181D27] shadow-[0_10px_26px_rgba(24,29,39,0.14)] whitespace-nowrap">
              <span className="inline-block h-2 w-2 rounded-full bg-[#2B62F6]" />
              API · MCP · CRM
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowApiSnippet((prev) => !prev)}
            className="self-start md:self-auto inline-flex items-center gap-2.5 rounded-full bg-[#2B62F6] px-5 py-2.5 text-[13px] font-bold text-white hover:bg-[#2457ED] transition-colors whitespace-nowrap cursor-pointer"
          >
            <span>{showApiSnippet ? 'Ocultar integración' : 'Ver cómo conectarlo'}</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        {showApiSnippet && (
          <div className="mt-5 rounded-[18px] bg-[#181D27] p-5 text-[12.5px] font-mono text-[#DCE6FF] overflow-x-auto">
            <pre>{`POST https://api.leadshop.app/v1/orders
{
  "query": "Clínicas odontológicas en Buenos Aires",
  "channels": ["whatsapp", "website", "instagram"],
  "volume": 300,
  "format": "csv"
}`}</pre>
          </div>
        )}
      </section>
    </div>
  );
}
