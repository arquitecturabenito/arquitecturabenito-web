export interface Project {
  id: string;
  category: 'architecture' | 'design';
  title: string;
  normalImage: string;
  rolloverImage: string;
  description: string;
  images: string[];
}

export const allProjectsData: Project[] = [
  {
    id: 'paseo-dehesa',
    category: 'architecture',
    title: 'PASEO DEHESA',
    normalImage: '/imagenes/PASEO 1 PORTADA 1.png',
    rolloverImage: '/imagenes/peli byn --.png',
    description: 'Este es un ejemplo de descripción para el proyecto Paseo Dehesa. Aquí puedes detallar los objetivos, el proceso de diseño, los materiales utilizados y cualquier otra información relevante sobre la obra. El objetivo es dar contexto y profundidad a las imágenes que se muestran a continuación.',
    images: [
        '/imagenes/PASEO 1 PORTADA 1.png',
        '/imagenes/peli byn --.png',
        '/imagenes/AXO DE CONJUNTO-1.png',
    ]
  },
  {
    id: 'coleccion-de-curvas',
    category: 'architecture',
    title: 'COLECCIÓN DE CURVAS',
    normalImage: '/imagenes/curvas portada 1.png',
    rolloverImage: '/imagenes/curvas portada 2.png',
    description: 'Este proyecto explora la fluidez espacial a través de una serie de elementos curvos que definen tanto el interior como el exterior. Se busca romper con la rigidez de la ortogonalidad tradicional para crear ambientes orgánicos y acogedores que se adaptan al movimiento humano.',
    images: [
      '/imagenes/curvas portada 1.png', 
      '/imagenes/curvas portada 2.png',
      '/imagenes/curvas_detalle_1.png',
      '/imagenes/curvas_interior.png',
    ]
  },
  {
    id: 'ia-render',
    category: 'architecture',
    title: 'RENDERIZADO IA',
    normalImage: '/imagenes/render ia portada 1.png',
    rolloverImage: '/imagenes/render ia portada 2.png',
    description: 'Una exploración conceptual sobre cómo las herramientas de inteligencia artificial pueden expandir los horizontes del diseño arquitectónico. Este proyecto no representa una construcción física, sino un manifiesto visual de las posibilidades estéticas y formales que emergen al colaborar con algoritmos generativos.',
    images: [
      '/imagenes/render ia portada 1.png', 
      '/imagenes/render ia portada 2.png',
      '/imagenes/render_ia_proceso.png',
      '/imagenes/render_ia_alternativa.png'
    ]
  },
  {
    id: 'el-escorial',
    category: 'architecture',
    title: 'EL ESCORIAL',
    normalImage: '/imagenes/escorial portada.png',
    rolloverImage: '/imagenes/escorial portada 2.png',
    description: 'Descripción del proyecto El Escorial.',
    images: ['/imagenes/escorial portada.png', '/imagenes/escorial portada 2.png']
  },
  {
    id: 'arboles-y-telas',
    category: 'architecture',
    title: 'ÁRBOLES Y TELAS',
    normalImage: '/imagenes/telas portada 1.png',
    rolloverImage: '/imagenes/telas portada 2.png',
    description: 'Descripción del proyecto Árboles y Telas.',
    images: ['/imagenes/telas portada 1.png', '/imagenes/telas portada 2.png']
  },
  {
    id: 'food-city',
    category: 'architecture',
    title: 'FOOD CITY PRATO',
    normalImage: '/imagenes/prato portada 1.png',
    rolloverImage: '/imagenes/prato portada 2.png',
    description: 'Descripción del proyecto Food City Prato.',
    images: ['/imagenes/prato portada 1.png', '/imagenes/prato portada 2.png']
  },
  {
    id: 'silla-equilibrio',
    category: 'design',
    title: 'SILLA EQUILIBRIO',
    normalImage: '/imagenes/diseño_silla_1.png',
    rolloverImage: '/imagenes/diseño_silla_2.png',
    description: 'Diseño conceptual de una silla que juega con las leyes de la física para crear una pieza escultural y funcional. La estructura busca el equilibrio mínimo, generando una tensión visual que invita a la interacción y la curiosidad.',
    images: ['/imagenes/diseño_silla_1.png', '/imagenes/diseño_silla_2.png']
  },
  {
    id: 'lampara-luz-calida',
    category: 'design',
    title: 'LÁMPARA LUZ CÁLIDA',
    normalImage: '/imagenes/diseño_lampara_1.png',
    rolloverImage: '/imagenes/diseño_lampara_2.png',
    description: 'Una lámpara diseñada para crear ambientes íntimos y acogedores. Su forma orgánica y el uso de materiales naturales como la madera y el lino tamizan la luz, proyectando sombras suaves que transforman el espacio.',
    images: ['/imagenes/diseño_lampara_1.png', '/imagenes/diseño_lampara_2.png']
  },
];