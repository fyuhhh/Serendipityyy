import { motion } from 'framer-motion';
import { Heart, Sparkles, Flower2, Calendar as CalendarIcon, Save, Trash2 } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { parseISO, format } from 'date-fns';
import { id } from 'date-fns/locale';

interface AppHeaderProps {
    selectedDate: string;
    setSelectedDate: (date: string) => void;
    availableDates: string[];
    onSave: () => void;
    onDelete: () => void;
}

const HeaderDecorations = () => {
    const flowers = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        size: 10 + Math.random() * 12,
        x: `${Math.random() * 100}%`,
        delay: Math.random() * 10,
        duration: 10 + Math.random() * 10,
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
            <motion.div
                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-6 -left-6 text-rose-300/30"
            >
                <Heart size={80} fill="currentColor" />
            </motion.div>
            <motion.div
                animate={{ rotate: [0, -15, 15, 0], scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-8 -right-8 text-rose-300/30"
            >
                <Heart size={100} fill="currentColor" />
            </motion.div>

            {flowers.map((item) => (
                <motion.div
                    key={item.id}
                    className="absolute text-rose-300/10"
                    initial={{ y: "120%", x: item.x, opacity: 0 }}
                    animate={{
                        y: "-20%",
                        opacity: [0, 0.3, 0],
                        rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
                    }}
                    transition={{
                        duration: item.duration,
                        repeat: Infinity,
                        delay: -item.delay,
                        ease: "linear"
                    }}
                >
                    <Flower2 size={item.size} />
                </motion.div>
            ))}
        </div>
    );
};

export const AppHeader = ({ selectedDate, setSelectedDate, availableDates, onSave, onDelete }: AppHeaderProps) => {
    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass-header sticky top-4 z-50 rounded-3xl p-4 md:p-6 flex flex-col xl:flex-row items-center justify-between gap-6 shadow-xl border border-white/40"
        >
            <HeaderDecorations />

            <div className="flex items-center gap-4 relative z-10 w-full xl:w-auto">
                <div className="w-12 h-12 bg-primary-main rounded-2xl flex items-center justify-center shadow-lg shadow-rose-200 rotate-3 flex-shrink-0">
                    <Sparkles className="text-white" size={28} />
                </div>
                <div className="flex-1">
                    <h1 className="text-xl md:text-2xl font-black text-rose-900 tracking-tight leading-none mb-1 text-shadow-sm">Serendipity Dashboard</h1>
                    <p className="text-[10px] md:text-xs font-bold text-rose-400 uppercase tracking-widest">Laporan Brand Kompetitor</p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto relative z-10">
                <div className="flex items-center gap-3 bg-white/60 backdrop-blur-md border-2 border-rose-200 px-6 py-3 rounded-[2rem] shadow-md w-full sm:w-auto transition-all hover:bg-white/90 hover:shadow-xl hover:border-rose-300 group cursor-pointer">
                    <CalendarIcon size={22} className="text-primary-main group-hover:scale-110 transition-transform" />
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-rose-400 uppercase tracking-tighter leading-none">Pilih Tanggal Laporan</span>
                        <DatePicker
                            selected={parseISO(selectedDate)}
                            onChange={(date: Date | null) => date && setSelectedDate(format(date, 'yyyy-MM-dd'))}
                            dateFormat="dd MMMM yyyy"
                            locale={id}
                            highlightDates={availableDates.map(d => parseISO(d))}
                            className="bg-transparent text-lg font-black text-rose-900 outline-none w-full !cursor-pointer mt-0.5"
                            todayButton="Ke Hari Ini"
                            withPortal
                            portalId="datepicker-portal"
                            onFocus={(e) => e.target.blur()}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-center gap-3 w-full sm:w-auto">
                    <button
                        onClick={onSave}
                        className="flex-1 px-6 py-2.5 bg-primary-main hover:bg-primary-deep text-white rounded-2xl text-sm font-black transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 group"
                    >
                        <Save size={18} className="group-hover:rotate-12 transition-transform" /> Simpan
                    </button>
                    <button
                        onClick={onDelete}
                        className="w-12 h-11 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-2xl transition-all border border-rose-100 flex items-center justify-center active:scale-90"
                        title="Hapus Data Tanggal"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
            </div>
        </motion.header>
    );
};
