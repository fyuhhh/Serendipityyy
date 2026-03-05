import { motion, AnimatePresence } from 'framer-motion';
import { formatNumber, formatValueStr } from '../utils/parser';
import type { BrandData } from '../utils/parser';

interface CompetitorGridProps {
    data: BrandData[];
    yesterdayData: BrandData[];
    updateField: (index: number, field: keyof BrandData, value: string) => void;
}

export const CompetitorGrid = ({ data, updateField }: Omit<CompetitorGridProps, 'yesterdayData'>) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2 gap-3 sm:gap-6">
            <AnimatePresence mode="popLayout">
                {data.map((item, idx) => (
                    <motion.div
                        key={item.brand_name}
                        layout
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="glass-card rounded-[1.5rem] sm:rounded-[2.5rem] p-3 sm:p-6 hover:shadow-2xl transition-all group border-2 border-transparent hover:border-rose-100"
                    >
                        <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-6">
                            <div className="w-7 h-7 sm:w-10 sm:h-10 bg-rose-50 text-primary-main font-black rounded-lg sm:rounded-2xl flex items-center justify-center shadow-sm text-xs sm:text-base group-hover:bg-primary-main group-hover:text-white transition-colors">
                                {idx + 1}
                            </div>
                            <h3 className="text-sm sm:text-lg font-black text-rose-900 flex-1 truncate">{item.brand_name}</h3>
                        </div>

                        <div className="space-y-3 sm:space-y-6">
                            {/* Harian Section */}
                            <div className="bg-rose-50/30 rounded-xl sm:rounded-3xl p-2 sm:p-5 border border-rose-100/50">
                                <p className="text-[8px] sm:text-[10px] font-black text-primary-soft uppercase tracking-widest mb-2 sm:mb-4">Statistik Harian</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                                    <div>
                                        <label className="text-[8px] sm:text-[10px] font-bold text-rose-400 mb-1 block px-1">N</label>
                                        <div className="flex items-center gap-1 bg-white rounded-lg sm:rounded-2xl p-1 shadow-sm border border-rose-50">
                                            <input type="number" value={item.harian_n_qty || ''} onChange={e => updateField(idx, 'harian_n_qty', e.target.value)} className="w-8 sm:w-10 bg-transparent text-center text-xs font-bold py-1 sm:py-2 outline-none" placeholder="Q" />
                                            <div className="w-px h-3 sm:h-4 bg-rose-100" />
                                            <input type="text" value={item.harian_n_harga ? formatNumber(item.harian_n_harga) : ''} onChange={e => updateField(idx, 'harian_n_harga', e.target.value)} className="flex-1 bg-transparent text-right text-xs font-bold py-1 sm:py-2 px-1 outline-none min-w-0" placeholder="Rp" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-[8px] sm:text-[10px] font-bold text-rose-400 mb-1 block px-1">OB</label>
                                        <div className="flex items-center gap-1 bg-white rounded-lg sm:rounded-2xl p-1 shadow-sm border border-rose-100">
                                            <input type="number" value={item.harian_ob_qty || ''} onChange={e => updateField(idx, 'harian_ob_qty', e.target.value)} className="w-8 sm:w-10 bg-transparent text-center text-xs font-bold py-1 sm:py-2 outline-none" placeholder="Q" />
                                            <div className="w-px h-3 sm:h-4 bg-rose-100" />
                                            <input type="text" value={item.harian_ob_harga ? formatNumber(item.harian_ob_harga) : ''} onChange={e => updateField(idx, 'harian_ob_harga', e.target.value)} className="flex-1 bg-transparent text-right text-xs font-bold py-1 sm:py-2 px-1 outline-none min-w-0" placeholder="Rp" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Kumulatif Section */}
                            <div className="bg-white/50 rounded-xl sm:rounded-3xl p-2 sm:p-5 border border-rose-100/30">
                                <p className="text-[8px] sm:text-[10px] font-black text-rose-300 uppercase tracking-widest mb-2 sm:mb-4">Kumulatif 1-30</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                                    <div>
                                        <label className="text-[8px] sm:text-[10px] font-bold text-rose-300 mb-1 block px-1">N</label>
                                        <div className="flex items-center gap-1 bg-white/80 rounded-lg sm:rounded-2xl p-1 shadow-sm border border-rose-50">
                                            <input
                                                type="number"
                                                value={item.kumulatif_n_qty || ''}
                                                onChange={e => updateField(idx, 'kumulatif_n_qty', e.target.value)}
                                                className="w-8 sm:w-10 bg-transparent text-center text-xs font-bold py-1 sm:py-2 outline-none"
                                            />
                                            <div className="w-px h-3 sm:h-4 bg-rose-100" />
                                            <input
                                                type="text"
                                                value={item.kumulatif_n_harga ? formatNumber(item.kumulatif_n_harga) : ''}
                                                onChange={e => updateField(idx, 'kumulatif_n_harga', e.target.value)}
                                                className="flex-1 bg-transparent text-right text-xs font-bold py-1 sm:py-2 px-1 outline-none min-w-0"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-[8px] sm:text-[10px] font-bold text-rose-300 mb-1 block px-1">OB</label>
                                        <div className="flex items-center gap-1 bg-white/80 rounded-lg sm:rounded-2xl p-1 shadow-sm border border-rose-100">
                                            <input
                                                type="number"
                                                value={item.kumulatif_ob_qty || ''}
                                                onChange={e => updateField(idx, 'kumulatif_ob_qty', e.target.value)}
                                                className="w-8 sm:w-10 bg-transparent text-center text-xs font-bold py-1 sm:py-2 outline-none"
                                            />
                                            <div className="w-px h-3 sm:h-4 bg-rose-100" />
                                            <input
                                                type="text"
                                                value={item.kumulatif_ob_harga ? formatNumber(item.kumulatif_ob_harga) : ''}
                                                onChange={e => updateField(idx, 'kumulatif_ob_harga', e.target.value)}
                                                className="flex-1 bg-transparent text-right text-xs font-bold py-1 sm:py-2 px-1 outline-none min-w-0"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center px-1 sm:px-2">
                                <span className="text-[8px] sm:text-[10px] font-black text-rose-400">TOTAL</span>
                                <span className="text-xs sm:text-sm font-black text-primary-main">
                                    {formatValueStr(item.harian_n_qty + item.harian_ob_qty, item.harian_n_harga + item.harian_ob_harga) || '0/0'}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};
