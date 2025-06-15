
import { motion } from 'framer-motion';

interface Quote {
    quote: string;
    author: string;
}

interface InspirationSectionProps {
    quotes: Quote[];
}

const InspirationSection = ({ quotes }: InspirationSectionProps) => {
    return (
        <section className="py-16 px-6">
            <div className="max-w-5xl mx-auto text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="text-3xl md:text-4xl font-bold font-playfair text-foreground mb-12"
                >
                    Inspiration for Your Journey
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {quotes.map((item, index) => (
                        <div key={index} className="bg-card/70 rounded-xl p-8 border border-border flex flex-col justify-center items-center space-y-6">
                            <blockquote className="italic text-lg text-muted-foreground mb-6">
                                “{item.quote}”
                            </blockquote>
                            <span className="font-semibold text-foreground">{item.author}</span>
                        </div>
                    ))}
                </div>
                <div className="border-t border-border my-12"/>
                
                <div className="mx-auto text-center mt-8">
                    <blockquote className="text-xl italic text-foreground mb-4 font-playfair">
                        "There’s no limit to what you can design for your own life, if you make yourself the architect."
                    </blockquote>
                    <span className="font-semibold text-muted-foreground">Galyarder</span>
                </div>
            </div>
        </section>
    );
};

export default InspirationSection;
