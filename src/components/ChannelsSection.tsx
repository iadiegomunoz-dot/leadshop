import { ArrowUpRight, Check } from 'lucide-react';
import { useState } from 'react';
import { OUTBOUND_CHANNELS } from '../data/siteData';
import { T, type Lang } from '../data/i18n';
import { ChannelIcon } from './ChannelIcon';

interface ChannelsSectionProps {
  onStartOrder: (presetQuery?: string) => void;
  lang?: Lang;
}

export function ChannelsSection({ onStartOrder, lang = 'es' }: ChannelsSectionProps) {
  const c = T[lang].sec.channels;
  const [selectedChannels, setSelectedChannels] = useState<string[]>([
    'whatsapp',
    'website',
  ]);

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
              {c.badge}
            </span>
            <h2 className="section-title mt-3 text-[25px] sm:text-[32px] font-bold leading-[1.2] tracking-[-0.02em] text-[#181D27]">
              {c.title}
            </h2>
            <p className="mt-2.5 text-[14px] leading-[1.55] text-[#4C5565]">
              {c.p}
            </p>
          </div>

          <div className="shrink-0 rounded-[20px] bg-white px-5 py-3.5 shadow-[0_4px_16px_rgba(24,29,39,0.04)]">
            <div className="text-[11.5px] font-semibold text-[#60697A]">
              {c.counter(selectedChannels.length)}
            </div>
            <div className="mt-0.5 text-[22px] font-extrabold text-[#2B62F6] tabular-nums">
              {selectedChannels.length}
              <span className="ml-1.5 text-[12px] font-bold text-[#60697A]">
                {c.includedNote}
              </span>
            </div>
          </div>
        </div>

        {/* 10 Interactive Channel Cards — white boxes with brand logos */}
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
                aria-pressed={isSelected}
                className={`group relative flex flex-col gap-3 rounded-[20px] border p-4 text-left transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B62F6] ${
                  isSelected
                    ? 'border-[#2B62F6]/60 bg-[#F2F6FF] shadow-[0_10px_24px_rgba(43,98,246,0.14)]'
                    : 'border-slate-200/80 bg-white hover:border-[#2B62F6]/35 hover:shadow-[0_8px_20px_rgba(24,29,39,0.06)]'
                }`}
              >
                {/* Selection badge */}
                <span
                  className={`absolute right-3 top-3 inline-flex h-6 w-6 items-center justify-center rounded-full transition-colors ${
                    isSelected
                      ? 'bg-[#2B62F6] text-white'
                      : 'bg-[#F4F6FA] text-[#A7B0C0] group-hover:text-[#2B62F6]'
                  }`}
                >
                  <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                </span>

                {/* Brand logo — official colors */}
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#F4F6FA] transition-colors group-hover:bg-[#E8EFFD]">
                  <ChannelIcon name={channel.icon} className="h-5 w-5" />
                </span>

                <span>
                  <span className="block text-[13.5px] font-bold leading-tight">
                    {channel.name}
                  </span>
                  <span
                    className={`mt-1 block text-[11px] font-semibold tabular-nums ${
                      isIncludedSlot
                        ? 'text-[#15803D]'
                        : isSelected
                        ? 'text-[#2B62F6]'
                        : 'text-[#60697A]'
                    }`}
                  >
                    {isIncludedSlot ? c.included : c.optional}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() =>
              onStartOrder(
                `${c.presetPrefix} ${selectedChannels.join(', ')}`
              )
            }
            className="group inline-flex items-center gap-3 rounded-full bg-white py-2 pl-5 pr-2 text-[13.5px] font-bold text-[#181D27] shadow-sm hover:shadow transition-all cursor-pointer"
          >
            <span>{c.cta}</span>
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#EAFC66] text-[#181D27] transition-transform duration-200 group-hover:rotate-12">
              <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.2]" />
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}
