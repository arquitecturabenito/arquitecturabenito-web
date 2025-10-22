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
    normalImage: 'imagenes/PASEO%201%20PORTADA%201.png',
    rolloverImage: 'imagenes/peli%20byn%20--.png',
    description: 'Este es un ejemplo de descripción para el proyecto Paseo Dehesa. Aquí puedes detallar los objetivos, el proceso de diseño, los materiales utilizados y cualquier otra información relevante sobre la obra. El objetivo es dar contexto y profundidad a las imágenes que se muestran a continuación.',
    images: [
        'imagenes/PASEO%201%20PORTADA%201.png',
        'imagenes/peli%20byn%20--.png',
        'imagenes/AXO%20DE%20CONJUNTO-1.png',
    ]
  },
  {
    id: 'coleccion-de-curvas',
    category: 'architecture',
    title: 'COLECCIÓN DE CURVAS',
    normalImage: 'imagenes/curvas%20portada%201.png',
    rolloverImage: 'imagenes/curvas%20portada%202.png',
    description: 'Este proyecto explora la fluidez espacial a través de una serie de elementos curvos que definen tanto el interior como el exterior. Se busca romper con la rigidez de la ortogonalidad tradicional para crear ambientes orgánicos y acogedores que se adaptan al movimiento humano.',
    images: [
      'imagenes/curvas%20portada%201.png', 
      'imagenes/curvas%20portada%202.png',
      'imagenes/curvas_detalle_1.png',
      'imagenes/curvas_interior.png',
    ]
  },
  {
    id: 'ia-render',
    category: 'architecture',
    title: 'RENDERIZADO IA',
    normalImage: 'imagenes/render%20ia%20portada%201.png',
    rolloverImage: 'imagenes/render%20ia%20portada%202.png',
    description: 'Una exploración conceptual sobre cómo las herramientas de inteligencia artificial pueden expandir los horizontes del diseño arquitectónico. Este proyecto no representa una construcción física, sino un manifiesto visual de las posibilidades estéticas y formales que emergen al colaborar con algoritmos generativos.',
    images: [
      'imagenes/render%20ia%20portada%201.png', 
      'imagenes/render%20ia%20portada%202.png',
      'imagenes/render_ia_proceso.png',
      'imagenes/render_ia_alternativa.png'
    ]
  },
  {
    id: 'el-escorial',
    category: 'architecture',
    title: 'EL ESCORIAL',
    normalImage: 'imagenes/escorial%20portada.png',
    rolloverImage: 'imagenes/escorial%20portada%202.png',
    description: 'Descripción del proyecto El Escorial.',
    images: ['imagenes/escorial%20portada.png', 'imagenes/escorial%20portada%202.png']
  },
  {
    id: 'arboles-y-telas',
    category: 'architecture',
    title: 'ÁRBOLES Y TELAS',
    normalImage: 'imagenes/telas%20portada%201.png',
    rolloverImage: 'imagenes/telas%20portada%202.png',
    description: 'Descripción del proyecto Árboles y Telas.',
    images: ['imagenes/telas%20portada%201.png', 'imagenes/telas%20portada%202.png']
  },
  {
    id: 'food-city',
    category: 'architecture',
    title: 'FOOD CITY PRATO',
    normalImage: 'imagenes/prato%20portada%201.png',
    rolloverImage: 'imagenes/prato%20portada%202.png',
    description: 'Descripción del proyecto Food City Prato.',
    images: ['imagenes/prato%20portada%201.png', 'imagenes/prato%20portada%202.png']
  },
  {
    id: 'silla-equilibrio',
    category: 'design',
    title: 'SILLA EQUILIBRIO',
    normalImage: 'imagenes/diseño_silla_1.png',
    rolloverImage: 'imagenes/diseño_silla_2.png',
    description: 'Diseño conceptual de una silla que juega con las leyes de la física para crear una pieza escultural y funcional. La estructura busca el equilibrio mínimo, generando una tensión visual que invita a la interacción y la curiosidad.',
    images: ['imagenes/diseño_silla_1.png', 'imagenes/diseño_silla_2.png']
  },
  {
    id: 'lampara-luz-calida',
    category: 'design',
    title: 'LÁMPARA LUZ CÁLIDA',
    normalImage: 'imagenes/diseño_lampara_1.png',
    rolloverImage: 'imagenes/diseño_lampara_2.png',
    description: 'Una lámpara diseñada para crear ambientes íntimos y acogedores. Su forma orgánica y el uso de materiales naturales como la madera y el lino tamizan la luz, proyectando sombras suaves que transforman el espacio.',
    images: ['imagenes/diseño_lampara_1.png', 'imagenes/diseño_lampara_2.png']
  },
];