import { motion } from 'framer-motion';

interface BubbleTransitionProps {
    onComplete?: () => void;
}

export const BubbleTransition = ({ onComplete }: BubbleTransitionProps) => {
    // Generate fewer bubbles for better performance
    const bubbles = Array.from({ length: 25 }).map((_, i) => ({
        id: i,
        size: Math.random() * 80 + 40,
        x: Math.random() * 100,
        delay: Math.random() * 0.4,
    }));

    return (
        <div className="fixed inset-0 z-[150] pointer-events-none overflow-hidden">
            {bubbles.map((bubble) => (
                <motion.div
                    key={bubble.id}
                    initial={{ opacity: 0, left: `${bubble.x}%`, y: '110vh', scale: 0 }}
                    animate={{
                        scale: [0, 1, 1, 0],
                        opacity: [0, 0.7, 0.7, 0],
                        y: '-110vh',
                        x: [0, Math.random() * 30 - 15]
                    }}
                    transition={{
                        duration: 1.8,
                        delay: bubble.delay,
                        ease: "linear",
                        times: [0, 0.1, 0.9, 1]
                    }}
                    onAnimationComplete={bubble.id === 0 ? onComplete : undefined}
                    className="absolute rounded-full bg-rose-200/40 border border-white/30"
                    style={{
                        width: bubble.size,
                        height: bubble.size,
                    }}
                >
                    {/* Simplified highlight */}
                    <div className="absolute top-1/4 left-1/4 w-1/4 h-1/4 bg-white/40 rounded-full" />
                </motion.div>
            ))}
        </div>
    );
};
