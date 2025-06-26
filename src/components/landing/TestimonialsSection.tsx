
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/global/ui/card';
import { Star } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

const TestimonialsSection = ({ testimonials }: TestimonialsSectionProps) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 font-playfair text-foreground">From Our Users</h2>
          <p className="text-xl text-muted-foreground">
            Real people, real transformations with GalyarderOS.
          </p>
        </motion.div>

        <motion.div
          key={currentTestimonial}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-2 border-border bg-card/80 p-8">
            <CardContent className="space-y-6">
              <div className="flex justify-center space-x-1 mb-4">
                {testimonials[currentTestimonial] && [...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current text-accent" />
                ))}
              </div>
              
              <blockquote className="text-xl font-playfair text-foreground leading-relaxed">
                "{testimonials[currentTestimonial]?.content}"
              </blockquote>
              
              <div>
                <p className="font-semibold text-foreground">
                  {testimonials[currentTestimonial]?.name}
                </p>
                <p className="text-muted-foreground">
                  {testimonials[currentTestimonial]?.role}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentTestimonial ? 'bg-primary' : 'bg-muted'
              }`}
              onClick={() => setCurrentTestimonial(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
