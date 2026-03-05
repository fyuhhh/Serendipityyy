import React from 'react';
import { AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type ModalType = 'alert' | 'confirm';
export type ModalFlavor = 'info' | 'success' | 'warning' | 'danger';

export interface ModalConfig {
    isOpen: boolean;
    type: ModalType;
    flavor: ModalFlavor;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
}

interface CustomModalProps {
    config: ModalConfig;
}

export const CustomModal: React.FC<CustomModalProps> = ({ config }) => {
    const getIcon = () => {
        switch (config.flavor) {
            case 'success': return <CheckCircle className="text-emerald-500 w-16 h-16 mb-4 drop-shadow-sm" />;
            case 'warning': return <AlertTriangle className="text-amber-500 w-16 h-16 mb-4 drop-shadow-sm" />;
            case 'danger': return <AlertTriangle className="text-rose-500 w-16 h-16 mb-4 drop-shadow-sm" />;
            default: return <Info className="text-primary-soft w-16 h-16 mb-4 drop-shadow-sm" />;
        }
    };

    const getConfirmBtnStyle = () => {
        switch (config.flavor) {
            case 'danger': return 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-200';
            case 'warning': return 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-100';
            case 'success': return 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-100';
            default: return 'bg-primary-main hover:bg-primary-deep text-white shadow-rose-200';
        }
    };

    return (
        <AnimatePresence>
            {config.isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={config.onConfirm}
                        className="absolute inset-0 bg-rose-900/20 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 400 }}
                        className="bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-2xl w-full max-w-sm border border-white/50 p-8 flex flex-col items-center text-center relative overflow-hidden"
                    >
                        {/* Decorative circles */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-rose-50 rounded-full blur-3xl opacity-50" />
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-pink-50 rounded-full blur-3xl opacity-50" />

                        {/* Optional close X button */}
                        {config.type === 'alert' && (
                            <button
                                onClick={config.onConfirm}
                                className="absolute top-5 right-5 text-rose-300 hover:text-rose-500 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        )}

                        {getIcon()}

                        <h3 className="text-2xl font-bold text-rose-900 mb-2">{config.title}</h3>
                        <p className="text-base text-rose-600/80 mb-8 leading-relaxed whitespace-pre-wrap font-medium">
                            {config.message}
                        </p>

                        <div className="flex w-full gap-4 justify-center">
                            {config.type === 'confirm' && (
                                <button
                                    onClick={config.onCancel}
                                    className="flex-1 py-3 px-6 text-sm font-bold text-rose-400 bg-rose-50 hover:bg-rose-100/50 rounded-2xl transition-all border border-rose-100/50"
                                >
                                    {config.cancelText || 'Batal'}
                                </button>
                            )}
                            <button
                                onClick={config.onConfirm}
                                className={`flex-1 py-3 px-6 text-sm font-bold rounded-2xl transition-all shadow-lg active:scale-95 ${getConfirmBtnStyle()}`}
                            >
                                {config.confirmText || 'Oke'}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

