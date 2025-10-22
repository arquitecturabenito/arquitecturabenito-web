export interface Project {
  id: string;
  category: 'architecture' | 'design';
  title: string;
  normalImage: string;
  rolloverImage: string;
  description: string;
  images: string[];
}

const testImageUrl = '/imagenes/portada2.png';

export const allProjectsData: Project[] = [
  {
    id: 'paseo-dehesa',
    category: 'architecture',
    title: 'PASEO DEHESA',
    normalImage: testImageUrl,
    rolloverImage: testImageUrl,
    description: 'Este es un ejemplo de descripción para el proyecto Paseo Dehesa. Aquí puedes detallar los objetivos, el proceso de diseño, los materiales utilizados y cualquier otra información relevante sobre la obra. El objetivo es dar contexto y profundidad a las imágenes que se muestran a continuación.',
    images: [
        testImageUrl,
        testImageUrl,
        testImageUrl,
    ]
  },
  {
    id: 'coleccion-de-curvas',
    category: 'architecture',
    title: 'COLECCIÓN DE CURVAS',
    normalImage: testImageUrl,
    rolloverImage: testImageUrl,
    description: 'Este proyecto explora la fluidez espacial a través de una serie de elementos curvos que definen tanto el interior como el exterior. Se busca romper con la rigidez de la ortogonalidad tradicional para crear ambientes orgánicos y acogedores que se adaptan al movimiento humano.',
    images: [
      testImageUrl, 
      testImageUrl,
      testImageUrl,
      testImageUrl,
    ]
  },
  {
    id: 'ia-render',
    category: 'architecture',
    title: 'RENDERIZADO IA',
    normalImage: testImageUrl,
    rolloverImage: testImageUrl,
    description: 'Una exploración conceptual sobre cómo las herramientas de inteligencia artificial pueden expandir los horizontes del diseño arquitectónico. Este proyecto no representa una construcción física, sino un manifiesto visual de las posibilidades estéticas y formales que emergen al colaborar con algoritmos generativos.',
    images: [
      testImageUrl, 
      testImageUrl,
      testImageUrl,
      testImageUrl
    ]
  },
  {
    id: 'el-escorial',
    category: 'architecture',
    title: 'EL ESCORIAL',
    normalImage: testImageUrl,
    rolloverImage: testImageUrl,
    description: 'Descripción del proyecto El Escorial.',
    images: [testImageUrl, testImageUrl]
  },
  {
    id: 'arboles-y-telas',
    category: 'architecture',
    title: 'ÁRBOLES Y TELAS',
    normalImage: testImageUrl,
    rolloverImage: testImageUrl,
    description: 'Descripción del proyecto Árboles y Telas.',
    images: [testImageUrl, testImageUrl]
  },
  {
    id: 'food-city',
    category: 'architecture',
    title: 'FOOD CITY PRATO',
    normalImage: testImageUrl,
    rolloverImage: testImageUrl,
    description: 'Descripción del proyecto Food City Prato.',
    images: [testImageUrl, testImageUrl]
  },
  {
    id: 'silla-equilibrio',
    category: 'design',
    title: 'SILLA EQUILIBRIO',
    normalImage: testImageUrl,
    rolloverImage: testImageUrl,
    description: 'Diseño conceptual de una silla que juega con las leyes de la física para crear una pieza escultural y funcional. La estructura busca el equilibrio mínimo, generando una tensión visual que invita a la interacción y la curiosidad.',
    images: [testImageUrl, testImageUrl]
  },
  {
    id: 'lampara-luz-calida',
    category: 'design',
    title: 'LÁMPARA LUZ CÁLIDA',
    normalImage: testImageUrl,
    rolloverImage: testImageUrl,
    description: 'Una lámpara diseñada para crear ambientes íntimos y acogedores. Su forma orgánica y el uso de materiales naturales como la madera y el lino tamizan la luz, proyectando sombras suaves que transforman el espacio.',
    images: [testImageUrl, testImageUrl]
  },
];