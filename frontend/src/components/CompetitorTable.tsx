import { formatNumber } from '../utils/parser';
import type { BrandData } from '../utils/parser';

interface CompetitorTableProps {
    data: BrandData[];
    updateField: (index: number, field: keyof BrandData, value: string) => void;
}

export const CompetitorTable = ({ data, updateField }: CompetitorTableProps) => {
    return (
        <div className="glass-card rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden border border-rose-100 shadow-xl bg-white/40">
            {/* Mobile Grid-Table (No Scroll) */}
            <div className="block sm:hidden">
                <div className="grid grid-cols-[65px_1fr_2.2fr_1fr_2.2fr_1fr_2.2fr_1fr_2.2fr] bg-rose-50/80 border-b border-rose-100 sticky top-0 z-20">
                    <div className="p-1 text-[6px] font-black text-rose-900 flex items-center">BRAND</div>
                    <div className="col-span-2 p-1 text-[6px] font-black text-rose-900 text-center border-l border-rose-100/50">HARIAN N</div>
                    <div className="col-span-2 p-1 text-[6px] font-black text-rose-900 text-center border-l border-rose-100/50">HARIAN OB</div>
                    <div className="col-span-2 p-1 text-[6px] font-black text-rose-900 text-center border-l border-rose-100/50">1-30 N</div>
                    <div className="col-span-2 p-1 text-[6px] font-black text-rose-900 text-center border-l border-rose-100/50">1-30 OB</div>
                </div>
                <div className="grid grid-cols-[65px_1fr_2.2fr_1fr_2.2fr_1fr_2.2fr_1fr_2.2fr] bg-rose-50/20 border-b border-rose-100">
                    <div className="border-r border-rose-100/30"></div>
                    <div className="text-[5px] font-bold text-rose-400 text-center border-l border-rose-100/30">Q</div>
                    <div className="text-[5px] font-bold text-rose-400 text-center border-l border-rose-100/30">IDR</div>
                    <div className="text-[5px] font-bold text-rose-400 text-center border-l border-rose-100/30">Q</div>
                    <div className="text-[5px] font-bold text-rose-400 text-center border-l border-rose-100/30">IDR</div>
                    <div className="text-[5px] font-bold text-rose-400 text-center border-l border-rose-100/30">Q</div>
                    <div className="text-[5px] font-bold text-rose-400 text-center border-l border-rose-100/30">IDR</div>
                    <div className="text-[5px] font-bold text-rose-400 text-center border-l border-rose-100/30">Q</div>
                    <div className="text-[5px] font-bold text-rose-400 text-center border-l border-rose-100/30">IDR</div>
                </div>

                <div className="divide-y divide-rose-50">
                    {data.map((item, idx) => (
                        <div key={item.brand_name} className="grid grid-cols-[65px_1fr_2.2fr_1fr_2.2fr_1fr_2.2fr_1fr_2.2fr] hover:bg-rose-50/30 transition-colors py-0.5">
                            <div className="px-1 text-[7px] font-black text-rose-900 truncate flex items-center leading-tight">{item.brand_name}</div>

                            <div className="px-0.5 border-l border-rose-100/20"><input type="number" value={item.harian_n_qty || ''} onChange={e => updateField(idx, 'harian_n_qty', e.target.value)} className="w-full bg-white/50 border border-rose-50 rounded-[2px] text-[7px] text-center p-0 outline-none font-bold placeholder-rose-200" placeholder="0" /></div>
                            <div className="px-0.5 border-l border-rose-100/20"><input type="text" value={item.harian_n_harga ? formatNumber(item.harian_n_harga) : ''} onChange={e => updateField(idx, 'harian_n_harga', e.target.value)} className="w-full bg-white/50 border border-rose-50 rounded-[2px] text-[7px] text-right p-0 pr-0.5 outline-none font-bold placeholder-rose-200" placeholder="0" /></div>

                            <div className="px-0.5 border-l border-rose-100/20"><input type="number" value={item.harian_ob_qty || ''} onChange={e => updateField(idx, 'harian_ob_qty', e.target.value)} className="w-full bg-white/50 border border-rose-50 rounded-[2px] text-[7px] text-center p-0 outline-none font-bold" placeholder="0" /></div>
                            <div className="px-0.5 border-l border-rose-100/20"><input type="text" value={item.harian_ob_harga ? formatNumber(item.harian_ob_harga) : ''} onChange={e => updateField(idx, 'harian_ob_harga', e.target.value)} className="w-full bg-white/50 border border-rose-50 rounded-[2px] text-[7px] text-right p-0 pr-0.5 outline-none font-bold" placeholder="0" /></div>

                            <div className="px-0.5 border-l border-rose-100/20"><input type="number" value={item.kumulatif_n_qty || ''} onChange={e => updateField(idx, 'kumulatif_n_qty', e.target.value)} className="w-full bg-white/50 border border-rose-50 rounded-[2px] text-[7px] text-center p-0 outline-none font-bold" placeholder="0" /></div>
                            <div className="px-0.5 border-l border-rose-100/20"><input type="text" value={item.kumulatif_n_harga ? formatNumber(item.kumulatif_n_harga) : ''} onChange={e => updateField(idx, 'kumulatif_n_harga', e.target.value)} className="w-full bg-white/50 border border-rose-50 rounded-[2px] text-[7px] text-right p-0 pr-0.5 outline-none font-bold" placeholder="0" /></div>

                            <div className="px-0.5 border-l border-rose-100/20"><input type="number" value={item.kumulatif_ob_qty || ''} onChange={e => updateField(idx, 'kumulatif_ob_qty', e.target.value)} className="w-full bg-white/50 border border-rose-50 rounded-[2px] text-[7px] text-center p-0 outline-none font-bold" placeholder="0" /></div>
                            <div className="px-0.5 border-l border-rose-100/20"><input type="text" value={item.kumulatif_ob_harga ? formatNumber(item.kumulatif_ob_harga) : ''} onChange={e => updateField(idx, 'kumulatif_ob_harga', e.target.value)} className="w-full bg-white/50 border border-rose-50 rounded-[2px] text-[7px] text-right p-0 pr-0.5 outline-none font-bold" placeholder="0" /></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Desktop/Tablet Table */}
            <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-left border-collapse table-auto">
                    <thead>
                        <tr className="bg-rose-50/50">
                            <th className="px-4 py-4 text-[10px] font-black text-rose-900 border-b border-rose-100">BRAND</th>
                            <th className="px-4 py-4 text-[10px] font-black text-rose-900 border-b border-rose-100 text-center" colSpan={2}>HARIAN (N)</th>
                            <th className="px-4 py-4 text-[10px] font-black text-rose-900 border-b border-rose-100 text-center" colSpan={2}>HARIAN (OB)</th>
                            <th className="px-4 py-4 text-[10px] font-black text-rose-900 border-b border-rose-100 text-center" colSpan={2}>1-30 (N)</th>
                            <th className="px-4 py-4 text-[10px] font-black text-rose-900 border-b border-rose-100 text-center" colSpan={2}>1-30 (OB)</th>
                        </tr>
                        <tr className="bg-rose-50/20">
                            <th className="border-b border-rose-100"></th>
                            <th className="px-2 py-2 text-[8px] font-bold text-rose-400 border-b border-rose-100 text-center">QTY</th>
                            <th className="px-2 py-2 text-[8px] font-bold text-rose-400 border-b border-rose-100 text-right">HARGA</th>
                            <th className="px-2 py-2 text-[8px] font-bold text-rose-400 border-b border-rose-100 text-center">QTY</th>
                            <th className="px-2 py-2 text-[8px] font-bold text-rose-400 border-b border-rose-100 text-right">HARGA</th>
                            <th className="px-2 py-2 text-[8px] font-bold text-rose-400 border-b border-rose-100 text-center">QTY</th>
                            <th className="px-2 py-2 text-[8px] font-bold text-rose-400 border-b border-rose-100 text-right">HARGA</th>
                            <th className="px-2 py-2 text-[8px] font-bold text-rose-400 border-b border-rose-100 text-center">QTY</th>
                            <th className="px-2 py-2 text-[8px] font-bold text-rose-400 border-b border-rose-100 text-right">HARGA</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, idx) => (
                            <tr key={item.brand_name} className="hover:bg-rose-50/30 transition-colors">
                                <td className="px-4 py-3 text-xs font-black text-rose-900 border-b border-rose-50">{item.brand_name}</td>
                                <td className="px-1 py-2 border-b border-rose-50">
                                    <input type="number" value={item.harian_n_qty || ''} onChange={e => updateField(idx, 'harian_n_qty', e.target.value)} className="w-8 bg-white border border-rose-100 rounded text-[10px] text-center py-1 outline-none font-bold" />
                                </td>
                                <td className="px-1 py-2 border-b border-rose-50">
                                    <input type="text" value={item.harian_n_harga ? formatNumber(item.harian_n_harga) : ''} onChange={e => updateField(idx, 'harian_n_harga', e.target.value)} className="w-20 bg-white border border-rose-100 rounded text-[10px] text-right py-1 px-1 outline-none font-bold" />
                                </td>
                                <td className="px-1 py-2 border-b border-rose-50">
                                    <input type="number" value={item.harian_ob_qty || ''} onChange={e => updateField(idx, 'harian_ob_qty', e.target.value)} className="w-8 bg-white border border-rose-100 rounded text-[10px] text-center py-1 outline-none font-bold" />
                                </td>
                                <td className="px-1 py-2 border-b border-rose-50">
                                    <input type="text" value={item.harian_ob_harga ? formatNumber(item.harian_ob_harga) : ''} onChange={e => updateField(idx, 'harian_ob_harga', e.target.value)} className="w-20 bg-white border border-rose-100 rounded text-[10px] text-right py-1 px-1 outline-none font-bold" />
                                </td>
                                <td className="px-1 py-2 border-b border-rose-50">
                                    <input type="number" value={item.kumulatif_n_qty || ''} onChange={e => updateField(idx, 'kumulatif_n_qty', e.target.value)} className="w-8 bg-white border border-rose-100 rounded text-[10px] text-center py-1 outline-none font-bold" />
                                </td>
                                <td className="px-1 py-2 border-b border-rose-50">
                                    <input type="text" value={item.kumulatif_n_harga ? formatNumber(item.kumulatif_n_harga) : ''} onChange={e => updateField(idx, 'kumulatif_n_harga', e.target.value)} className="w-20 bg-white border border-rose-100 rounded text-[10px] text-right py-1 px-1 outline-none font-bold" />
                                </td>
                                <td className="px-1 py-2 border-b border-rose-50">
                                    <input type="number" value={item.kumulatif_ob_qty || ''} onChange={e => updateField(idx, 'kumulatif_ob_qty', e.target.value)} className="w-8 bg-white border border-rose-100 rounded text-[10px] text-center py-1 outline-none font-bold" />
                                </td>
                                <td className="px-1 py-2 border-b border-rose-50">
                                    <input type="text" value={item.kumulatif_ob_harga ? formatNumber(item.kumulatif_ob_harga) : ''} onChange={e => updateField(idx, 'kumulatif_ob_harga', e.target.value)} className="w-20 bg-white border border-rose-100 rounded text-[10px] text-right py-1 px-1 outline-none font-bold" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
