export interface Project {
  id: string;
  category: 'architecture' | 'design';
  title: string;
  normalImage: string;
  rolloverImage: string;
  description: string;
  images: string[];
  pdf?: string;
}

export const allProjectsData: Project[] = [
  // ARCHITECTURE
  {
    id: 'el-escorial',
    category: 'architecture',
    title: 'COCINA MONACAL DE EL ESCORIAL',
    normalImage: '/imagenes/projects/el-escorial/main.png',
    rolloverImage: '/imagenes/projects/el-escorial/main-rollover.png',
    description: 'Estudio y reconstrucción hipotética de la cocina del monasterio de El Escorial. A través del análisis de tratados y grabados de la época, se recrea el ambiente y funcionamiento de un espacio ajetreado, con un gran flujo de gente y alimentos, esencial para abastecer al monasterio.',
    images: [
        '/imagenes/projects/el-escorial/1.png', 
        '/imagenes/projects/el-escorial/2.png'
    ],
    pdf: '/pdfs/portfolio-benito-quinones.pdf'
  },
  {
    id: 'paseo-dehesa',
    category: 'architecture',
    title: 'PASEO DEHESA',
    normalImage: '/imagenes/projects/paseo-dehesa/main.png',
    rolloverImage: '/imagenes/projects/paseo-dehesa/main-rollover.png',
    description: 'Este es un ejemplo de descripción para el proyecto Paseo Dehesa. Aquí puedes detallar los objetivos, el proceso de diseño, los materiales utilizados y cualquier otra información relevante sobre la obra.',
    images: [
        '/imagenes/projects/paseo-dehesa/1.png', 
        '/imagenes/projects/paseo-dehesa/2.png',
        '/imagenes/projects/paseo-dehesa/3.png'
    ],
    pdf: '/pdfs/portfolio-benito-quinones.pdf'
  },
  {
    id: 'coleccion-de-curvas',
    category: 'architecture',
    title: 'COLECCIÓN DE CURVAS',
    normalImage: '/imagenes/projects/coleccion-de-curvas/main.png',
    rolloverImage: '/imagenes/projects/coleccion-de-curvas/main-rollover.png',
    description: 'El proyecto “Colección de curvas” busca dibujar un paisaje de usos, unas oficinas que sean paisaje y una experiencia para el día a día.',
    images: [
        '/imagenes/projects/coleccion-de-curvas/1.png', 
        '/imagenes/projects/coleccion-de-curvas/2.png',
        '/imagenes/projects/coleccion-de-curvas/3.png',
        '/imagenes/projects/coleccion-de-curvas/4.png'
    ],
    pdf: '/pdfs/portfolio-benito-quinones.pdf'
  },
  {
    id: 'food-city',
    category: 'architecture',
    title: 'FOOD CITY PRATO',
    normalImage: '/imagenes/projects/food-city/main.png',
    rolloverImage: '/imagenes/projects/food-city/main-rollover.png',
    description: 'Propuesta urbanística para la revitalización de una zona industrial en Prato, Italia. El proyecto concibe un nuevo centro neurálgico centrado en la gastronomía y la cultura.',
    images: [
        '/imagenes/projects/food-city/1.png', 
        '/imagenes/projects/food-city/2.png'
    ],
    pdf: '/pdfs/portfolio-benito-quinones.pdf'
  },
  {
    id: 'deja-navigue',
    category: 'architecture',
    title: 'DEJA NAVIGUÉ',
    normalImage: '/imagenes/projects/deja-navigue/main.png',
    rolloverImage: '/imagenes/projects/deja-navigue/main-rollover.png',
    description: 'Este proyecto comprende la construcción de un teatro multifuncional en Hamburgo, Alemania, diseñado para eventos de teatro, música y danza.',
    images: [
        '/imagenes/projects/deja-navigue/1.png', 
        '/imagenes/projects/deja-navigue/2.png'
    ],
    pdf: '/pdfs/portfolio-benito-quinones.pdf'
  },
  {
    id: 'modulus-matrix',
    category: 'architecture',
    title: 'MODULUS MATRIX',
    normalImage: '/imagenes/projects/modulus-matrix/main.png',
    rolloverImage: '/imagenes/projects/modulus-matrix/main-rollover.png',
    description: 'Redibujo del edificio de 85 viviendas de Peris+Toral en Cornellà de Llobregat, detallando su proceso constructivo en madera laminada cruzada (CLT).',
    images: [
        '/imagenes/projects/modulus-matrix/1.png', 
        '/imagenes/projects/modulus-matrix/2.png'
    ],
    pdf: '/pdfs/portfolio-benito-quinones.pdf'
  },
  // DESIGN
  {
    id: 'ia-render',
    category: 'design',
    title: 'RENDERIZADO IA',
    normalImage: '/imagenes/projects/ia-render/main.png',
    rolloverImage: '/imagenes/projects/ia-render/main-rollover.png',
    description: 'Una exploración conceptual sobre cómo las herramientas de inteligencia artificial pueden expandir los horizontes del diseño arquitectónico.',
    images: [
        '/imagenes/projects/ia-render/1.png', 
        '/imagenes/projects/ia-render/2.png',
        '/imagenes/projects/ia-render/3.png',
        '/imagenes/projects/ia-render/4.png'
    ],
    pdf: '/pdfs/portfolio-benito-quinones.pdf'
  },
  {
    id: 'arboles-y-telas',
    category: 'design',
    title: 'ÁRBOLES Y TELAS',
    normalImage: '/imagenes/projects/arboles-y-telas/main.png',
    rolloverImage: '/imagenes/projects/arboles-y-telas/main-rollover.png',
    description: 'Pabellón efímero diseñado para un festival de arte. La estructura, ligera y permeable, se integra con el paisaje natural circundante.',
    images: [
        '/imagenes/projects/arboles-y-telas/1.png', 
        '/imagenes/projects/arboles-y-telas/2.png'
    ],
    pdf: '/pdfs/portfolio-benito-quinones.pdf'
  },
  {
    id: 'silla-equilibrio',
    category: 'design',
    title: 'SILLA EQUILIBRIO',
    normalImage: '/imagenes/projects/silla-equilibrio/main.png',
    rolloverImage: '/imagenes/projects/silla-equilibrio/main-rollover.png',
    description: 'Diseño conceptual de una silla que juega con las leyes de la física para crear una pieza escultural y funcional.',
    images: [
        '/imagenes/projects/silla-equilibrio/1.png', 
        '/imagenes/projects/silla-equilibrio/2.png'
    ],
    pdf: '/pdfs/portfolio-benito-quinones.pdf'
  },
  {
    id: 'lampara-luz-calida',
    category: 'design',
    title: 'LÁMPARA LUZ CÁLIDA',
    normalImage: '/imagenes/projects/lampara-luz-calida/main.png',
    rolloverImage: '/imagenes/projects/lampara-luz-calida/main-rollover.png',
    description: 'Una lámpara diseñada para crear ambientes íntimos y acogedores. Su forma orgánica y el uso de materiales naturales tamizan la luz.',
    images: [
        '/imagenes/projects/lampara-luz-calida/1.png', 
        '/imagenes/projects/lampara-luz-calida/2.png'
    ],
    pdf: '/pdfs/portfolio-benito-quinones.pdf'
  }
];