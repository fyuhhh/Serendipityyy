import { motion } from 'framer-motion';
import { Download, Copy } from 'lucide-react';

interface SidebarToolsProps {
    rawText: string;
    setRawText: (text: string) => void;
    outputText: string;
    processPaste: (mode: 'AWAL' | 'LANJUTAN') => void;
    handleCopyEmptyTemplate: () => void;
    handleGenerateText: () => void;
    handleCopy: () => void;
}

export const SidebarTools = ({
    rawText,
    setRawText,
    outputText,
    processPaste,
    handleCopyEmptyTemplate,
    handleGenerateText,
    handleCopy
}: SidebarToolsProps) => {
    return (
        <div className="space-y-8">
            <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="glass-card rounded-[2.5rem] p-6 space-y-6"
            >
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-rose-900 flex items-center gap-2">
                        <Download size={22} className="text-primary-main" /> Import WA
                    </h3>
                    <span className="text-rose-300 text-xl">୨ৎ</span>
                </div>
                <textarea
                    className="w-full bg-rose-50/50 rounded-3xl p-5 text-base sm:text-xs font-bold text-rose-900 placeholder-rose-300 border border-rose-100 min-h-[180px] outline-none focus:ring-2 ring-primary-soft transition-all"
                    placeholder="Paste dari WA ya sayangku ᰔᩚ ..."
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                />
                <div className="grid grid-cols-1 gap-3">
                    <button
                        onClick={() => processPaste('AWAL')}
                        className="w-full py-3 bg-rose-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg active:scale-95"
                    >
                        Import Awal Baru
                    </button>
                    <button
                        onClick={() => processPaste('LANJUTAN')}
                        className="w-full py-3 bg-primary-soft text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary-main transition-all shadow-lg active:scale-95"
                    >
                        Import Lanjutan
                    </button>
                </div>
            </motion.div>

            <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="glass-card rounded-[2.5rem] p-6 space-y-6"
            >
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-rose-900">Output Laporan</h3>
                    <span className="text-primary-main animate-pulse">˗ˋˏ ♡ ˎˊ˗</span>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleCopyEmptyTemplate}
                        className="flex-1 text-[10px] font-black text-rose-400 hover:text-rose-600 uppercase tracking-tighter"
                    >
                        Template
                    </button>
                    <button
                        onClick={handleGenerateText}
                        className="flex-1 py-2 bg-rose-50 text-primary-main rounded-xl text-[10px] font-black uppercase tracking-widest border border-rose-100 hover:bg-white transition-all"
                    >
                        Generate Text
                    </button>
                </div>
                <textarea
                    className="w-full bg-white/50 rounded-3xl p-5 text-base sm:text-xs font-mono text-rose-900 border border-rose-100 min-h-[300px] outline-none resize-none"
                    readOnly
                    value={outputText}
                    placeholder="Hasil generate kamu muncul disini sayangku ♡ㅤ"
                />
                {outputText && (
                    <button
                        onClick={handleCopy}
                        className="w-full py-4 bg-primary-main text-white rounded-2xl text-sm font-black shadow-rose-200 shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
                    >
                        <Copy size={20} /> COPY LAPORAN
                    </button>
                )}
            </motion.div>
        </div>
    );
};
