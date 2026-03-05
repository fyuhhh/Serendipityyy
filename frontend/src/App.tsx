import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Ghost, CloudMoon } from 'lucide-react';
import { format } from 'date-fns';

import { CustomModal, type ModalConfig } from './components/CustomModal';
import { AppHeader } from './components/AppHeader';
import { CompetitorTable } from './components/CompetitorTable';
import { CompetitorGrid } from './components/CompetitorGrid';
import { SidebarTools } from './components/SidebarTools';
import { BubbleTransition } from './components/BubbleTransition';

import { BRANDS, parseRawText, generateReportText, generateEmptyTemplate } from './utils/parser';
import type { BrandData } from './utils/parser';

const API_URL = 'https://api.serendipityyy.site/api';

const SuccessFeedback = ({ onComplete }: { onComplete: () => void }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: [0, 1.2, 1], opacity: 1 }}
    exit={{ scale: 1.5, opacity: 0 }}
    onAnimationComplete={() => setTimeout(onComplete, 1500)}
    className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
  >
    <div className="bg-white/80 backdrop-blur-xl rounded-[3rem] p-12 shadow-2xl border-4 border-rose-200 flex flex-col items-center gap-4">
      <motion.div
        animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="text-[80px]"
      >
        ❀
      </motion.div>
      <h2 className="text-3xl font-black text-rose-900">BERHASIL! ❀</h2>
      <p className="text-rose-400 font-bold">Laporan Ayang sudah aman!</p>
    </div>
  </motion.div>
);

const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-20 text-center space-y-4"
  >
    <div className="relative">
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="text-rose-200"
      >
        <CloudMoon size={100} strokeWidth={1} />
      </motion.div>
      <motion.div
        animate={{ x: [-5, 5, -5] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-0 right-0 text-rose-300"
      >
        <Ghost size={40} />
      </motion.div>
    </div>
    <div>
      <h3 className="text-xl font-black text-rose-900">Sepi Banget... 🥺</h3>
      <p className="text-rose-400 text-sm font-medium">Belum ada data kompetitor buat tanggal ini.<br />Coba import dari WA atau pilih tanggal lain ya!</p>
    </div>
  </motion.div>
);

function App() {
  const [data, setData] = useState<BrandData[]>([]);
  const [yesterdayData, setYesterdayData] = useState<BrandData[]>([]);
  const [loading, setLoading] = useState(true);
  const [rawText, setRawText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showBubbles, setShowBubbles] = useState(false);

  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('en-CA'));
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [modalConfig, setModalConfig] = useState<ModalConfig>({
    isOpen: false, type: 'alert', flavor: 'info', title: '', message: ''
  });
  const [isWelcomeVisible, setIsWelcomeVisible] = useState(true);

  const fetchDates = async () => {
    try {
      const res = await axios.get(`${API_URL}/dates`);
      setAvailableDates(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchReports = async (dateStr: string) => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/reports?date=${dateStr}`);
      if (res.data && res.data.current && res.data.current.length > 0) {
        setData(res.data.current);
        setYesterdayData(res.data.yesterday || []);
      } else {
        setData(BRANDS.map(name => ({
          brand_name: name,
          harian_n_qty: 0, harian_n_harga: 0, harian_ob_qty: 0, harian_ob_harga: 0,
          kumulatif_n_qty: 0, kumulatif_n_harga: 0, kumulatif_ob_qty: 0, kumulatif_ob_harga: 0
        })));
        setYesterdayData([]);
      }
    } catch (err) {
      console.error(err);
      setData(BRANDS.map(name => ({ brand_name: name, harian_n_qty: 0, harian_n_harga: 0, harian_ob_qty: 0, harian_ob_harga: 0, kumulatif_n_qty: 0, kumulatif_n_harga: 0, kumulatif_ob_qty: 0, kumulatif_ob_harga: 0 })));
    } finally { setLoading(false); }
  };

  useEffect(() => {
    fetchDates();
    const timer = setTimeout(() => {
      setIsWelcomeVisible(false);
      setShowBubbles(true);
      // Let bubbles play for their duration
      setTimeout(() => setShowBubbles(false), 2500);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => { fetchReports(selectedDate); }, [selectedDate]);

  const closeModal = () => setModalConfig(prev => ({ ...prev, isOpen: false }));

  const doSave = async (dataToSave: BrandData[]) => {
    try {
      await axios.post(`${API_URL}/reports`, { date: selectedDate, data: dataToSave });
      setShowSuccess(true);
      fetchDates();
    } catch (err) {
      setModalConfig({ isOpen: true, type: 'alert', flavor: 'danger', title: 'Gagal!', message: 'Gagal menyimpan data.', onConfirm: closeModal });
    }
  };

  const handleSave = () => {
    if (availableDates.includes(selectedDate)) {
      setModalConfig({
        isOpen: true, type: 'confirm', flavor: 'warning',
        title: 'Timpa Data?',
        message: `Catatan tanggal ${selectedDate} sudah ada!\n\nIngin menimpa data tersebut?`,
        confirmText: 'Ya, Timpa', onConfirm: () => { closeModal(); doSave(data); }, onCancel: closeModal
      });
    } else { doSave(data); }
  };

  const handleDeleteDate = async () => {
    if (!availableDates.includes(selectedDate)) return;
    setModalConfig({
      isOpen: true, type: 'confirm', flavor: 'danger', title: 'Hapus Data?', message: `Hapus semua data untuk tanggal ${selectedDate} permanen?`, confirmText: 'Hapus Permanen',
      onConfirm: async () => {
        closeModal();
        try {
          setLoading(true);
          await axios.delete(`${API_URL}/reports?date=${selectedDate}`);
          fetchDates();
          const yesterday = new Date(selectedDate);
          yesterday.setDate(yesterday.getDate() - 1);
          setSelectedDate(format(yesterday, 'yyyy-MM-dd'));
        } catch (err) { console.error(err); setLoading(false); }
      },
      onCancel: closeModal
    });
  };

  const updateField = (index: number, field: keyof BrandData, value: string) => {
    const newData = [...data];
    const isHarga = field.includes('harga');
    const cleanValue = isHarga ? value.replace(/\D/g, '') : value;
    const numValue = parseInt(cleanValue, 10) || 0;
    newData[index] = { ...newData[index], [field]: numValue };

    const yRecord = yesterdayData.find(y => y.brand_name === newData[index].brand_name);
    if (field === 'harian_n_qty') newData[index].kumulatif_n_qty = numValue + (yRecord?.kumulatif_n_qty || 0);
    else if (field === 'harian_n_harga') newData[index].kumulatif_n_harga = numValue + (yRecord?.kumulatif_n_harga || 0);
    else if (field === 'harian_ob_qty') newData[index].kumulatif_ob_qty = numValue + (yRecord?.kumulatif_ob_qty || 0);
    else if (field === 'harian_ob_harga') newData[index].kumulatif_ob_harga = numValue + (yRecord?.kumulatif_ob_harga || 0);
    setData(newData);
  };

  const processPaste = (mode: 'AWAL' | 'LANJUTAN') => {
    if (!rawText.trim()) return;
    const newData = parseRawText(rawText, data, yesterdayData, mode);
    setData(newData);
  };

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-rose-50 overflow-hidden">
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          className="text-7xl md:text-9xl text-primary-soft filter drop-shadow-lg"
        >
          ❀
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute inset-0 text-7xl md:text-9xl text-rose-200 -z-10 blur-sm flex items-center justify-center"
        >
          ❀
        </motion.div>
      </div>
    </div>
  );

  const isDataEmpty = data.every(item =>
    !item.harian_n_qty && !item.harian_n_harga && !item.harian_ob_qty && !item.harian_ob_harga
  );

  return (
    <div className="min-h-screen pb-20">
      <AnimatePresence>
        {isWelcomeVisible && (
          <motion.div
            key="welcome-panel"
            initial={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: '-100vh',
              transition: { duration: 1.2, ease: "easeInOut" }
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-white/60 backdrop-blur-3xl"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center p-12 glass-card rounded-[3rem] shadow-2xl"
            >
              <h2 className="text-4xl md:text-6xl font-black text-primary-main mb-4 flex items-center justify-center gap-4">HALO CAYANG! <Sparkles className="text-rose-400" /></h2>
              <p className="text-xl md:text-2xl font-bold text-rose-500 tracking-widest uppercase">Siap Laporan Hari Ini? 🌸</p>
            </motion.div>
          </motion.div>
        )}
        {showSuccess && <SuccessFeedback onComplete={() => setShowSuccess(false)} />}
        {showBubbles && <BubbleTransition />}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-2 sm:px-6 py-8 space-y-8">
        <AppHeader
          selectedDate={selectedDate} setSelectedDate={setSelectedDate}
          availableDates={availableDates} onSave={handleSave} onDelete={handleDeleteDate}
        />

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          <div className="xl:col-span-3 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-2">
              <h2 className="text-xl font-black text-rose-900 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-primary-main rounded-full" /> Input Data Kompetitor
              </h2>
              <div className="flex bg-white/50 p-1 rounded-xl shadow-sm border border-rose-100 w-full sm:w-auto">
                <button onClick={() => setViewMode('card')} className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-black transition-all ${viewMode === 'card' ? 'bg-primary-main text-white shadow-md' : 'text-rose-400 hover:text-rose-600'}`}>CARD VIEW</button>
                <button onClick={() => setViewMode('table')} className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-black transition-all ${viewMode === 'table' ? 'bg-primary-main text-white shadow-md' : 'text-rose-400 hover:text-rose-600'}`}>TABLE VIEW</button>
              </div>
            </div>

            {isDataEmpty ? <EmptyState /> : (
              viewMode === 'card' ?
                <CompetitorGrid data={data} updateField={updateField} /> :
                <CompetitorTable data={data} updateField={updateField} />
            )}
          </div>

          <SidebarTools
            rawText={rawText} setRawText={setRawText} outputText={outputText}
            processPaste={processPaste}
            handleCopyEmptyTemplate={() => {
              navigator.clipboard.writeText(generateEmptyTemplate());
              setShowSuccess(true);
            }}
            handleGenerateText={() => setOutputText(generateReportText(data))}
            handleCopy={() => {
              navigator.clipboard.writeText(outputText);
              setShowSuccess(true);
            }}
          />
        </div>
      </div>

      <CustomModal config={modalConfig} />
    </div>
  );
}

export default App;
