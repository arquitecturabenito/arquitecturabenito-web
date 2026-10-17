/**
 * CONFIGURACIÓN DE MÚSICA POR PROYECTO / PROJECT MUSIC CONFIG
 * =======================================================================
 * Copia y pega el enlace de tu canción (Spotify, SoundCloud o audio .mp3)
 * directamente a la derecha de cada proyecto.
 *
 * Formatos aceptados:
 * - Spotify: https://open.spotify.com/track/... (o album / playlist)
 * - SoundCloud: https://soundcloud.com/...
 * - Audio directo: https://.../cancion.mp3 (o rutas locales /musica/...)
 * =======================================================================
 */

export const projectMusic = {

// ---------------------------------------------------------------------
  // 1. ARQUITECTURA
  // ---------------------------------------------------------------------
  "gritar-lo-publico": "https://open.spotify.com/track/5ChkMS8Otdzsq2gFLtpsth", // GRITAR LO PÚBLICO
  "anexo-aemet": "https://open.spotify.com/track/0VjIjW4GlULA756sLMAaoA",        // Anexo AEMET
  "hashima-animal-park": "https://open.spotify.com/intl-es/track/6da7GpIxrd2kTPq14fuJup?si=6a8d680a73a34262",// Hashima Animal Park si
  "paseo-dehesa": "https://open.spotify.com/track/6pWgRkpqVfxnj3WuUNMu7Z",       // PASEO DEHESA
  "el-escorial": "https://open.spotify.com/track/11D5Yv7G2w7gVnfc0rR9f8",        // COCINA MONACAL DE EL ESCORIAL
  "prato-food-city": "https://open.spotify.com/track/3n3Ppam7vgaVa1iaRUc9Lp",    // PRATO FOOD CITY
  "arboles-y-telas": "https://open.spotify.com/track/1dEa24jG2P3h8C6U3jL3jK",    // ÁRBOLES Y TELAS
  "coleccion-de-curvas": "https://open.spotify.com/track/4ptpT6L3X8FmBf6Bw8hK2U",// COLECCIÓN DE CURVAS
  "ia-render": "https://open.spotify.com/track/7iN1NedaiHGQIVAmWi8Bg2",          // RENDERIZADO IA
  "escritos-arquitectura": "https://open.spotify.com/track/5k7pPj1v3BvW4a6f2c3d1E", // ESCRITOS / PUBLICACIONES

  // ---------------------------------------------------------------------
  // 2. DISEÑO
  // ---------------------------------------------------------------------
  "oneiros-lamp": "https://open.spotify.com/intl-es/track/6da7GpIxrd2kTPq14fuJup?si=6a8d680a73a34262",        // ONEIROS LAMP si
  "estuche": "https://open.spotify.com/track/5QDLhrAO47lsd697qX2q4H",             // ESTUCHE V1 V2 V3
  "natural-lamp": "https://open.spotify.com/track/7lPN2DXiMsVn7XUKtOW1CS",        // NATURAL LAMP
  "juego-mesa-minutos": "https://open.spotify.com/track/0ofHAoxe9vBkTCp2UQIavz",  // JUEGO DE MESA MINUTOS
  "cmfx-walkman": "https://open.spotify.com/track/3USxtqRwSYz57Ewm6w4MpE",        // CMFX WALKMAN
  "coleccion-grabados": "https://open.spotify.com/track/1ZHYJ2W9XZep2USRIHN2Ag",  // COLECCIÓN DE GRABADOS
  "proto-tab": "https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC",           // PROTO TAB
  "archigloss": "https://open.spotify.com/track/1QEElyuhgg1qUBvNuZz0pW",          // ARCHIGLOSS
  "porta-vinilos": "https://open.spotify.com/track/7ouMYWpwJ422jRcDASZB7P",       // PORTA VINILOS
  "territorios-digitales": "https://open.spotify.com/intl-es/track/6da7GpIxrd2kTPq14fuJup?si=6a8d680a73a34262",// Investigación Territorios Digitales  si
  "carteleria": "https://open.spotify.com/track/3UmaczJpikHgJFywhioRAL",          // CARTELERÍA
  "generacion-ia": "https://open.spotify.com/track/6rqhFgbbKwnb9MLmUQDhG6",       // TUTORIAL IA
  "web-design": "https://open.spotify.com/track/2d8hnT72eecjU6wNfIeBfN",          // DISEÑO WEB

 
  // ---------------------------------------------------------------------
  // 3. ESCENOGRAFÍAS
  // ---------------------------------------------------------------------
  "festa-na-terra": "https://open.spotify.com/intl-es/track/3qgcNeTUVH7BTHLD7tn0DT?si=ccfea8173a0b4590",      // FESTA NA TERRA  s
  "cronologia-adios": "https://open.spotify.com/intl-es/track/6UIi779Srkw3xYvMmfoKeM?si=5b6f4d75ff574e9b",    // CRONOLOGÍA DE UN ADIÓS  s


  // ---------------------------------------------------------------------
  // 4. FOTOGRAFÍA / LIBRETOS A5 (PEQUEÑAS REVISTAS A5)
  // ---------------------------------------------------------------------
  "vida-en-tetuan": "https://open.spotify.com/intl-es/track/3gjPEWOgxZRZQ9WKWLhKrW?si=dc5369934d0647af",      // VidA eN TetuÁn 20   23 (vida-en-tetuan.pdf)  si
  "rapa-das-bestas-2025": "https://open.spotify.com/track/2tpWsVSb9UEmDRxAl1zhFR",// RAPA DAS BESTAS 2025 (rapa-das-bestas-2025.pdf)
  "rapa-das-bestas": "https://open.spotify.com/track/2tpWsVSb9UEmDRxAl1zhFR",     // RAPA DAS BESTAS (rapa-das-bestas.pdf)
  "cartagena-2023": "https://open.spotify.com/intl-es/track/68PEuXNjodWFts3Ph4BPVv?si=25180713e0ef4060",      // CArTagena 2023 (cartagena-2023.pdf) si
  "cuaderno-de-campo-2024": "https://open.spotify.com/track/6pWgRkpqVfxnj3WuUNMu7Z", // CUADERNO DE CAMPO 2024 (cuaderno-de-campo-2024.pdf)
  "cuaderno-de-campo": "https://open.spotify.com/track/6pWgRkpqVfxnj3WuUNMu7Z",      // CUADERNO DE CAMPO (cuaderno-de-campo.pdf)
  "baliza": "https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT",              // Baliza (baliza.pdf)
  "mar-alla": "https://open.spotify.com/track/5k7pPj1v3BvW4a6f2c3d1E",            // Mar allá (mar-alla.pdf)
  "abrazos": "https://open.spotify.com/track/11D5Yv7G2w7gVnfc0rR9f8",             // AbrAzoS (abrazos.pdf)
  "epa": "https://open.spotify.com/track/3USxtqRwSYz57Ewm6w4MpE",                 // €pA (epa.pdf)

  // ---------------------------------------------------------------------
  // 5. PÁGINAS GENERALES / GENERAL PAGES
  // ---------------------------------------------------------------------
  "home": "https://open.spotify.com/track/5ChkMS8Otdzsq2gFLtpsth",                // Inicio / Galería Principal
  "escritos": "https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC",            // Textos y Escritos
  "contact": "https://open.spotify.com/track/7ouMYWpwJ422jRcDASZB7P"              // Contacto
};

// Objeto global de compatibilidad para acceso dinámico en cualquier parte
if (typeof window !== "undefined") {
  window.projectMusicConfig = projectMusic;
}

export default projectMusic;
