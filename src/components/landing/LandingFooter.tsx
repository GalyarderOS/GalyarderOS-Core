
const LandingFooter = () => {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center overflow-hidden">
              <img 
                src="/lovable-uploads/1933874e-bfc3-4397-b239-859be4a5d342.png" 
                alt="GalyarderOS Logo" 
                className="w-5 h-5 object-contain"
              />
            </div>
            <span className="text-lg font-bold font-playfair text-foreground">GalyarderOS</span>
          </div>
          
          <p className="text-muted-foreground">
            © 2025 GalyarderOS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
