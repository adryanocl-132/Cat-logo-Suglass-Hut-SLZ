/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, MapPin, ChevronRight, X } from "lucide-react";

interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  image: string;
}

const products: Product[] = [
  // Ray-Ban (6)
  { id: 1, name: "RB3768 Minimalist", brand: "Ray-Ban", category: "Ícone", image: "https://res.cloudinary.com/dcdzuilxa/image/upload/v1777091940/RB3768_MINIMALIST_ovm1lf.avif" },
  { id: 2, name: "Ray-Ban Meta Wayfarer", brand: "Ray-Ban", category: "Smart • Todas as Versões", image: "https://res.cloudinary.com/dcdzuilxa/image/upload/v1777092139/RAY-BAN_META_WAYFARER_u9niki.avif" },
  { id: 3, name: "Yevi Bio-Based", brand: "Ray-Ban", category: "Sustainable", image: "https://res.cloudinary.com/dcdzuilxa/image/upload/v1777092767/YEVI_BIO-BASED_jkdcsz.avif" },
  { id: 4, name: "Aviator Reverse", brand: "Ray-Ban", category: "Revolutionary", image: "https://res.cloudinary.com/dcdzuilxa/image/upload/v1777092838/AVIATOR_REVERSE_qauv2k.avif" },
  { id: 5, name: "Clubmaster Classic", brand: "Ray-Ban", category: "Vintage", image: "https://res.cloudinary.com/dcdzuilxa/image/upload/v1777092924/CLUBMASTER_CLASSIC_rbnh3d.avif" },
  { id: 101, name: "Justin Classic", brand: "Ray-Ban", category: "Modern", image: "https://res.cloudinary.com/dcdzuilxa/image/upload/v1777092950/JUSTIN_CLASSIC_bvggjc.avif" },
  
  // Oakley (6)
  { id: 6, name: "BXTR OO9280", brand: "Oakley", category: "Sport", image: "https://res.cloudinary.com/dcdzuilxa/image/upload/v1777093037/BXTR_OO9280_qcwehk.avif" },
  { id: 7, name: "Sutro Lite Sweep", brand: "Oakley", category: "Performance", image: "https://res.cloudinary.com/dcdzuilxa/image/upload/v1777093115/SUTRO_LITE_SWEEP_wpfiga.avif" },
  { id: 10, name: "Eye Jacket Redux", brand: "Oakley", category: "Futuristic", image: "https://res.cloudinary.com/dcdzuilxa/image/upload/v1777093177/EYE_JACKET_REDUX_bhmjje.avif" },
  { id: 102, name: "Kato Polished Black", brand: "Oakley", category: "Hyper-Performance", image: "https://res.cloudinary.com/dcdzuilxa/image/upload/v1777093229/KATO_POLISHED_BLACK_fwyxjk.webp" },
  { id: 103, name: "Radar EV Path", brand: "Oakley", category: "Elite Sport", image: "https://res.cloudinary.com/dcdzuilxa/image/upload/v1777093292/RADAR_EV_PATH_ikn1ws.avif" },
  { id: 104, name: "Holbrook Polarizado", brand: "Oakley", category: "Lifestyle", image: "https://res.cloudinary.com/dcdzuilxa/image/upload/v1777093369/HOLBROOK_rx8uxi.webp" },

  // Prada (3)
  { id: 11, name: "PR 17WS Marmorizado", brand: "Prada", category: "High Fashion", image: "https://res.cloudinary.com/dcdzuilxa/image/upload/v1777093724/PR_17WS_MARMORIZADO_f0ffma.avif" },
  { id: 13, name: "Linea Rossa PS 01US", brand: "Prada", category: "Luxury Sport", image: "https://res.cloudinary.com/dcdzuilxa/image/upload/v1777093768/LINEA_ROSSA_PS_01US_snfu6q.avif" },
  { id: 105, name: "Prada Symbole", brand: "Prada", category: "Avant-Garde", image: "https://res.cloudinary.com/dcdzuilxa/image/upload/v1777094088/PRADA-SYMBOLE_or60ou.png" },

  // Versace (3)
  { id: 16, name: "VE4361 Biggie Neon", brand: "Versace", category: "Luxo", image: "https://res.cloudinary.com/dcdzuilxa/image/upload/v1777094203/VE4361_BIGGIE_NEON_uohcuk.avif" },
  { id: 18, name: "Medusa Biggie Shield", brand: "Versace", category: "Extravagance", image: "https://res.cloudinary.com/dcdzuilxa/image/upload/v1777094292/MEDUSA_BIGGIE_SHIELD_g1nau0.avif" },
  { id: 106, name: "Versace Greca", brand: "Versace", category: "Glamour", image: "https://res.cloudinary.com/dcdzuilxa/image/upload/v1777094457/GRECA_ty76wm.png" },

  // Gucci (3)
  { id: 31, name: "GG1421S Double G", brand: "Gucci", category: "Best Seller", image: "https://res.cloudinary.com/dcdzuilxa/image/upload/v1777094530/GG1421S_DOUBLE_G_rpvg03.avif" },
  { id: 35, name: "GG1221S Navigator", brand: "Gucci", category: "Contemporary", image: "https://res.cloudinary.com/dcdzuilxa/image/upload/v1777094849/GG1221S_NAVIGATOR_jivtt5.avif" },
  { id: 107, name: "GG0034S Rectangular", brand: "Gucci", category: "Iconic", image: "https://res.cloudinary.com/dcdzuilxa/image/upload/v1777095074/GUCCI-GG0034S-RECTANGULAR_psvpx8.png" },

  // Persol (3)
  { id: 201, name: "Persol 714 SM", brand: "Persol", category: "Iconic Folding", image: "https://res.cloudinary.com/dcdzuilxa/image/upload/v1777095234/PERSOL_714_SM_kzt8vd.webp" },
  { id: 202, name: "649 Series", brand: "Persol", category: "Handmade", image: "https://res.cloudinary.com/dcdzuilxa/image/upload/v1777095113/PERSOL_649_SERIES_oko7oy.avif" },
  { id: 203, name: "Persol Calligrapher", brand: "Persol", category: "Artisan", image: "https://res.cloudinary.com/dcdzuilxa/image/upload/v1777095281/PERSOL_CALLIGRAPHER_mevjh8.avif" },

  // Burberry (3)
  { id: 301, name: "BE4291 Check", brand: "Burberry", category: "Classic British", image: "https://res.cloudinary.com/dcdzuilxa/image/upload/v1777095601/BE4291_CHECK_h3iml6.webp" },
  { id: 302, name: "BE4403 Navigator", brand: "Burberry", category: "Modern Sophistication", image: "https://res.cloudinary.com/dcdzuilxa/image/upload/v1777095751/BE4403_NAVIGATOR_dukf1s.avif" },
  { id: 303, name: "BE4344 Rectangular", brand: "Burberry", category: "Bold Silhouette", image: "https://res.cloudinary.com/dcdzuilxa/image/upload/v1777095792/BE4344_RECTANGULAR_emjxg0.webp" },
];

const brands = ["Todas", "Ray-Ban", "Oakley", "Prada", "Versace", "Persol", "Burberry", "Gucci"];

const WHATSAPP_BASE_URL = `https://api.whatsapp.com/send?phone=5598985287957&text=${encodeURIComponent("Olá, olhei os modelos no catálogo digital e quero saber mais!")}`;

const getWhatsAppProductLink = (productName: string) => {
  const message = `Vi o ${productName} no catálogo digital e queria saber mais sobre o modelos e as opões disponíveis.`;
  return `https://api.whatsapp.com/send?phone=5598985287957&text=${encodeURIComponent(message)}`;
};

export default function App() {
  const [selectedBrand, setSelectedBrand] = useState("Todas");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = selectedBrand === "Todas" 
    ? products 
    : products.filter(p => p.brand === selectedBrand);

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white font-sans transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-black/10 px-6 py-6 flex justify-between items-center sticky top-0 bg-white/90 backdrop-blur-md z-50">
        <div 
          className="h-10 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img 
            src="https://res.cloudinary.com/dcdzuilxa/image/upload/v1777090963/sunglass-hut-logo.jpg_ni3uqe.png" 
            alt="Sunglass Hut" 
            className="h-full object-contain"
          />
        </div>
        <a 
          href={WHATSAPP_BASE_URL} 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center gap-2 px-6 py-2 border-2 border-black rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300 group"
        >
          <MessageCircle className="w-4 h-4 group-hover:scale-110" />
          WhatsApp
        </a>
      </header>

      {/* Main Content */}
      <main>
        {/* Ray-Ban Meta Hero */}
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden border-b border-black/10">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img 
              src="https://res.cloudinary.com/dcdzuilxa/image/upload/v1777091295/META_GEN_2_rabgr6.webp" 
              className="w-full h-full object-cover opacity-80"
              alt="Ray-Ban Meta Background"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
          <div className="relative z-10 text-center px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-3xl"
            >
              <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4 leading-none text-white hover:text-white/80 cursor-default transition-colors">
                Ray-Ban <br/> Meta Gen 2
              </h1>
              <p className="text-sm md:text-lg font-medium text-white/80 mb-8 max-w-xl mx-auto uppercase tracking-widest italic">
                A nova geração de óculos inteligentes chegou em São Luís. Temos todas as versões disponíveis no mercado.
              </p>
              <a 
                href={getWhatsAppProductLink("Ray-Ban Meta Collection")}
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-white text-black px-12 py-5 rounded-full text-xs font-bold uppercase tracking-[0.3em] hover:bg-black hover:text-white border-2 border-white transition-all shadow-2xl"
              >
                CONHECER TODAS AS OPÇÕES!
              </a>
            </motion.div>
          </div>
        </section>

        {/* Filter Bar */}
        <div className="bg-white border-b border-black/10 px-6 py-6 sticky top-[88px] z-40 overflow-x-auto">
          <div className="flex gap-4 min-w-max justify-center">
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest border-2 transition-all ${
                  selectedBrand === brand 
                    ? "bg-black text-white border-black" 
                    : "border-black/5 hover:border-black/50 hover:text-gray-600"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* Product Group 1 */}
        <section className="px-6 py-20">
          <div className="grid grid-cols-1 gap-12">
            <AnimatePresence mode="popLayout">
              {filteredProducts.slice(0, 6).map((product) => (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group flex flex-col md:flex-row bg-gray-50 rounded-[2rem] overflow-hidden border border-black/5 hover:border-black/10 transition-colors"
                >
                  <div 
                    className="w-full md:w-1/2 md:h-[400px] aspect-square overflow-hidden relative cursor-zoom-in"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-contain p-8 md:p-12 rounded-[2rem] transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-6 left-6">
                      <span className="bg-black text-white text-[9px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full">
                        {product.brand}
                      </span>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 p-8 pt-2 md:p-16 md:pl-4 flex flex-col justify-center">
                    <h3 className="text-xl md:text-5xl font-black uppercase tracking-tight mb-2 group-hover:text-gray-600 transition-colors leading-tight">{product.name}</h3>
                    <p className="text-xs md:text-sm uppercase tracking-[0.3em] opacity-40 font-bold mb-10 italic">{product.category}</p>
                    <a 
                      href={getWhatsAppProductLink(product.name)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block w-full md:w-auto md:px-12 text-center py-5 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black hover:border-black border-2 border-transparent transition-all shadow-lg"
                    >
                      CONHECER TODAS AS OPÇÕES!
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Oakley Meta Banner */}
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden border-y border-black/10">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img 
              src="https://res.cloudinary.com/dcdzuilxa/image/upload/v1777091294/AOKLEY_GEN_2_ismu1b.webp" 
              className="w-full h-full object-cover opacity-80"
              alt="Oakley Meta Background"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
          <div className="relative z-10 text-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl"
            >
              <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4 leading-none text-white hover:text-white/80 cursor-default transition-colors">
                Oakley Meta <br/> Vanguard
              </h2>
              <p className="text-sm md:text-lg font-medium text-white/80 mb-8 max-w-xl mx-auto uppercase tracking-widest italic">
                Performance extrema. Conforto total. Estilo inconfundível.
              </p>
              <a 
                href={getWhatsAppProductLink("Oakley Meta vanguard")}
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-white text-black px-12 py-5 rounded-full text-xs font-bold uppercase tracking-[0.3em] hover:bg-black hover:text-white border-2 border-white transition-all shadow-2xl"
              >
                CONHECER TODAS AS OPÇÕES!
              </a>
            </motion.div>
          </div>
        </section>

        {/* Product Group 2 */}
        <section className="px-6 py-20">
          <div className="grid grid-cols-1 gap-12">
            <AnimatePresence mode="popLayout">
              {filteredProducts.slice(6).map((product) => (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group flex flex-col md:flex-row bg-gray-50 rounded-[2rem] overflow-hidden border border-black/5 hover:border-black/10 transition-colors"
                >
                  <div 
                    className="w-full md:w-1/2 md:h-[400px] aspect-square overflow-hidden relative cursor-zoom-in"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-contain p-8 md:p-12 rounded-[2rem] transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-6 left-6">
                      <span className="bg-black text-white text-[9px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full">
                        {product.brand}
                      </span>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 p-8 pt-2 md:p-16 md:pl-4 flex flex-col justify-center">
                    <h3 className="text-xl md:text-5xl font-black uppercase tracking-tight mb-2 group-hover:text-gray-600 transition-colors leading-tight">{product.name}</h3>
                    <p className="text-xs md:text-sm uppercase tracking-[0.3em] opacity-40 font-bold mb-10 italic">{product.category}</p>
                    <a 
                      href={getWhatsAppProductLink(product.name)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block w-full md:w-auto md:px-12 text-center py-5 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black hover:border-black border-2 border-transparent transition-all shadow-lg"
                    >
                      CONHECER TODAS AS OPÇÕES!
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Brands Section */}
        <section className="bg-white py-24 border-t border-black/10 overflow-hidden">
          <div className="px-6 mb-12 flex justify-between items-end">
            <div>
              <h2 className="text-[10px] uppercase font-bold tracking-[0.3em] mb-4 opacity-40">Nossa Curadoria</h2>
              <p className="text-4xl font-black uppercase tracking-tight">Marcas Disponíveis</p>
            </div>
          </div>
          <div className="relative group">
            <div className="flex animate-scroll whitespace-nowrap gap-12 py-4">
              {[
                "Ray-Ban", "Oakley", "Prada", "Vogue Eyewear", "Burberry", "Versace", 
                "Michael Kors", "Coach", "Dolce & Gabbana", "Giorgio Armani", 
                "Emporio Armani", "Persol", "Polo Ralph Lauren", "Ralph Lauren", 
                "Tom Ford", "Gucci", "Saint Laurent", "Valentino", "Arnette"
              ].map((brand, idx) => (
                <span key={idx} className="text-2xl font-black uppercase tracking-tighter opacity-10 hover:opacity-100 transition-opacity cursor-default">
                  {brand}
                </span>
              ))}
              {/* Duplicate for infinite scroll effect */}
              {[
                "Ray-Ban", "Oakley", "Prada", "Vogue Eyewear", "Burberry", "Versace", 
                "Michael Kors", "Coach", "Dolce & Gabbana", "Giorgio Armani", 
                "Emporio Armani", "Persol", "Polo Ralph Lauren", "Ralph Lauren", 
                "Tom Ford", "Gucci", "Saint Laurent", "Valentino", "Arnette"
              ].map((brand, idx) => (
                <span key={`dup-${idx}`} className="text-2xl font-black uppercase tracking-tighter opacity-10 hover:opacity-100 transition-opacity cursor-default">
                  {brand}
                </span>
              ))}
            </div>
            <style>
              {`
                @keyframes scroll {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                .animate-scroll {
                  animation: scroll 40s linear infinite;
                }
              `}
            </style>
          </div>
        </section>

        {/* Location & Info */}
        <section className="bg-black text-white py-24 px-6">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-12">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-8">Visite Nossa Loja</h2>
              <p className="text-lg opacity-60 leading-relaxed font-light italic mb-10">
                Localizada no Golden Shopping Calhau, nossa loja oferece a experiência completa de curadoria internacional com atendimento personalizado e ajustes precisos.
              </p>
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-6 group cursor-default">
                  <div className="p-4 bg-white/10 rounded-full group-hover:bg-white group-hover:text-black transition-all">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold opacity-40 tracking-widest">Endereço</div>
                    <p className="font-semibold text-lg italic">Golden Shopping Calhau, Piso L1, São Luís - MA</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group cursor-default">
                  <div className="p-4 bg-white/10 rounded-full group-hover:bg-white group-hover:text-black transition-all">
                    <ChevronRight className="w-6 h-6 rotate-90" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold opacity-40 tracking-widest">Horários</div>
                    <p className="font-semibold italic">Segunda a Sábado: 10:00 - 22:00</p>
                    <p className="font-semibold italic">Domingo: 13:00 - 21:00</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/3 flex flex-col gap-4">
              <a 
                href={WHATSAPP_BASE_URL} 
                target="_blank" 
                rel="noreferrer"
                className="bg-white text-black p-12 text-center rounded-[2rem] hover:bg-white/90 transition-all group"
              >
                <MessageCircle className="w-10 h-10 mx-auto mb-6 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold uppercase tracking-[0.3em]">Chamar no WhatsApp</span>
                <p className="text-[10px] opacity-40 mt-2">Consultar estoque ou tirar dúvidas</p>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Simplified Footer */}
      <footer className="border-t border-black/10 py-12 px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.3em] font-bold opacity-30">
        <div className="flex gap-12">
          <span>Golden Shopping L1</span>
          <span>São Luís, MA</span>
        </div>
        <span>© 2026 Sunglass Hut Group • EssilorLuxottica</span>
      </footer>

      {/* Image Modal Overlay */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
              onClick={() => setSelectedProduct(null)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl max-h-full flex flex-col items-center gap-6"
            >
              {/* Close Button Top Right */}
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute -top-12 right-0 md:-right-12 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-50 border border-white/10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="w-full bg-white rounded-[2rem] overflow-hidden relative shadow-2xl">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  className="w-full h-auto max-h-[70vh] object-contain bg-gray-50 rounded-[2rem]"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex flex-col items-center text-center text-white px-6 w-full">
                <h2 className="text-xl md:text-4xl font-black uppercase tracking-tight mb-2">{selectedProduct.name}</h2>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-60 mb-8">{selectedProduct.brand} • {selectedProduct.category}</p>
                
                <a 
                  href={getWhatsAppProductLink(selectedProduct.name)}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white text-black px-12 py-5 rounded-full text-xs font-bold uppercase tracking-[0.3em] hover:bg-black hover:text-white border-2 border-white transition-all shadow-2xl flex items-center gap-3 w-full md:w-auto justify-center"
                >
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  CONHECER TODAS AS OPÇÕES!
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
