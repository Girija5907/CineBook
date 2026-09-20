// Official Theatrical Poster & Backdrop SVG Artworks for 2026 Releases

// Helper to encode SVG into clean browser data URI
function svgToDataUri(svgString: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString.trim())}`;
}

// 1. VISHWANATH & SONS - Official Theatrical Poster
export const VISWANATH_AND_SONS_POSTER = svgToDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1200" width="100%" height="100%">
  <defs>
    <linearGradient id="vs-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#140a05"/>
      <stop offset="35%" stop-color="#2a1609"/>
      <stop offset="70%" stop-color="#190e06"/>
      <stop offset="100%" stop-color="#080402"/>
    </linearGradient>
    <linearGradient id="vs-gold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="50%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
    <radialGradient id="vs-glow" cx="50%" cy="45%" r="60%">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.25"/>
      <stop offset="60%" stop-color="#ea580c" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="vs-card" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3d2110" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#170c06" stop-opacity="0.95"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="800" height="1200" fill="url(#vs-bg)"/>
  <rect width="800" height="1200" fill="url(#vs-glow)"/>

  <!-- Subtle Framing Border -->
  <rect x="25" y="25" width="750" height="1150" fill="none" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.4"/>
  <rect x="35" y="35" width="730" height="1130" fill="none" stroke="#fbbf24" stroke-width="0.75" stroke-opacity="0.25"/>

  <!-- Top Studio / Producer Line -->
  <g text-anchor="middle">
    <text x="400" y="85" fill="#fcd34d" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="800" letter-spacing="6">SITHARA ENTERTAINMENTS &amp; FORTUNE FOUR CINEMAS</text>
    <text x="400" y="110" fill="#a1a1aa" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" letter-spacing="3">PRESENT A VENKY ATLURI FILM</text>
  </g>

  <!-- Star Cast Header -->
  <g text-anchor="middle">
    <text x="400" y="170" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="900" letter-spacing="4">SURIYA</text>
    <text x="400" y="198" fill="#fcd34d" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" letter-spacing="3">MAMITHA BAIJU • RADHIKA SARATHKUMAR • RAVEENA TANDON</text>
  </g>

  <!-- Central Visual Motif: Father & Child Silhouette inside Family Shield -->
  <g transform="translate(400, 420)">
    <!-- Radial aura -->
    <circle cx="0" cy="0" r="170" fill="#f59e0b" fill-opacity="0.12"/>
    <circle cx="0" cy="0" r="140" fill="none" stroke="#f59e0b" stroke-width="2" stroke-opacity="0.4" stroke-dasharray="6,6"/>
    
    <!-- Outer Crest Shape -->
    <path d="M 0 -130 L 110 -50 L 110 50 L 0 130 L -110 50 L -110 -50 Z" fill="url(#vs-card)" stroke="#f59e0b" stroke-width="2" stroke-opacity="0.6"/>

    <!-- Suriya silhouette holding baby / heart -->
    <!-- Heart Symbol -->
    <path d="M 0 -60 C -30 -90, -70 -50, 0 10 C 70 -50, 30 -90, 0 -60 Z" fill="#e11d48" fill-opacity="0.85"/>

    <!-- Father holding child silhouette -->
    <circle cx="-15" cy="-20" r="22" fill="#fbbf24"/>
    <path d="M -35 25 C -35 0, 5 0, 5 25 L 5 80 L -35 80 Z" fill="#fbbf24" fill-opacity="0.9"/>
    
    <!-- Baby silhouette -->
    <circle cx="28" cy="5" r="13" fill="#fef08a"/>
    <path d="M 15 25 C 15 15, 42 15, 42 25 L 42 55 L 15 55 Z" fill="#fef08a" fill-opacity="0.95"/>

    <!-- Monogram V & S -->
    <text x="0" y="105" text-anchor="middle" fill="#fbbf24" font-family="Georgia, serif" font-size="18" font-weight="bold" letter-spacing="4">V &amp; S</text>
  </g>

  <!-- Film Title Block -->
  <g text-anchor="middle">
    <!-- Tamil Title -->
    <text x="400" y="670" fill="#fde68a" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="700" letter-spacing="6">விஸ்வநாத் &amp; சன்ஸ்</text>

    <!-- Main Title -->
    <text x="400" y="740" fill="url(#vs-gold)" font-family="Georgia, serif" font-size="56" font-weight="900" letter-spacing="3">VISHWANATH</text>
    <text x="400" y="790" fill="#ffffff" font-family="Georgia, serif" font-size="34" font-weight="800" letter-spacing="12">&amp; SONS</text>

    <!-- Official Tagline -->
    <rect x="180" y="820" width="440" height="34" rx="17" fill="#000000" fill-opacity="0.6" stroke="#d97706" stroke-width="1"/>
    <text x="400" y="842" fill="#fed7aa" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" letter-spacing="2">LOVE WITH A DIFFERENCE • FAMILY WITH A PURPOSE</text>
  </g>

  <!-- Theatrical Formats & Credits -->
  <g text-anchor="middle">
    <!-- Formats -->
    <g transform="translate(400, 920)">
      <rect x="-240" y="-18" width="110" height="32" rx="6" fill="#18181b" stroke="#3f3f46" stroke-width="1.5"/>
      <text x="-185" y="3" fill="#ffffff" font-family="system-ui, sans-serif" font-size="13" font-weight="900">DOLBY ATMOS</text>

      <rect x="-115" y="-18" width="110" height="32" rx="6" fill="#18181b" stroke="#3f3f46" stroke-width="1.5"/>
      <text x="-60" y="3" fill="#ffffff" font-family="system-ui, sans-serif" font-size="13" font-weight="900">RGB LASER 4K</text>

      <rect x="10" y="-18" width="105" height="32" rx="6" fill="#18181b" stroke="#3f3f46" stroke-width="1.5"/>
      <text x="62" y="3" fill="#ffffff" font-family="system-ui, sans-serif" font-size="13" font-weight="900">EPIQ CINEMA</text>

      <rect x="130" y="-18" width="110" height="32" rx="6" fill="#18181b" stroke="#3f3f46" stroke-width="1.5"/>
      <text x="185" y="3" fill="#f59e0b" font-family="system-ui, sans-serif" font-size="13" font-weight="900">U/A CERTIFIED</text>
    </g>

    <!-- Crew Billing -->
    <text x="400" y="995" fill="#fcd34d" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="800" letter-spacing="3">MUSIC: G. V. PRAKASH KUMAR</text>
    <text x="400" y="1025" fill="#d4d4d8" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600" letter-spacing="2">CINEMATOGRAPHY: NIMISH RAVI • EDITING: NAVIN NOOLI</text>
    <text x="400" y="1050" fill="#a1a1aa" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" letter-spacing="2">PRODUCED BY SURYADEVARA NAGA VAMSI &amp; SAI SOUJANYA</text>

    <!-- Release Status Banner -->
    <rect x="220" y="1080" width="360" height="42" rx="8" fill="#b45309" stroke="#fbbf24" stroke-width="1.5"/>
    <text x="400" y="1107" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="900" letter-spacing="4">NOW RUNNING IN THEATERS</text>
  </g>
</svg>
`);

// 2. MANDAADI - Official Theatrical Poster
export const MANDAADI_POSTER = svgToDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1200" width="100%" height="100%">
  <defs>
    <linearGradient id="man-bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#021b29"/>
      <stop offset="35%" stop-color="#082f49"/>
      <stop offset="70%" stop-color="#041f33"/>
      <stop offset="100%" stop-color="#010e17"/>
    </linearGradient>
    <linearGradient id="man-sea" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284c7"/>
      <stop offset="50%" stop-color="#0369a1"/>
      <stop offset="100%" stop-color="#0c4a6e"/>
    </linearGradient>
    <linearGradient id="man-gold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#facc15"/>
      <stop offset="50%" stop-color="#fef08a"/>
      <stop offset="100%" stop-color="#eab308"/>
    </linearGradient>
    <radialGradient id="man-sun" cx="50%" cy="32%" r="45%">
      <stop offset="0%" stop-color="#f97316" stop-opacity="0.4"/>
      <stop offset="50%" stop-color="#0284c7" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="800" height="1200" fill="url(#man-bg)"/>
  <rect width="800" height="1200" fill="url(#man-sun)"/>

  <!-- Border -->
  <rect x="25" y="25" width="750" height="1150" fill="none" stroke="#0284c7" stroke-width="1.5" stroke-opacity="0.5"/>

  <!-- Top Billing -->
  <g text-anchor="middle">
    <text x="400" y="80" fill="#38bdf8" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="800" letter-spacing="5">RS INFOTAINMENT • ELRED KUMAR PRESENTS</text>
    <text x="400" y="105" fill="#bae6fd" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" letter-spacing="3">VETRI MAARAN CREATIVE PRODUCER</text>
  </g>

  <!-- Star Cast -->
  <g text-anchor="middle">
    <text x="400" y="165" fill="#fef08a" font-family="system-ui, -apple-system, sans-serif" font-size="32" font-weight="900" letter-spacing="4">SOORI</text>
    <text x="400" y="195" fill="#e0f2fe" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" letter-spacing="3">SUHAS • MAHIMA NAMBIAR • SATHYARAJ</text>
  </g>

  <!-- Sea & Catamaran Boat Racing Illustration -->
  <g transform="translate(400, 420)">
    <!-- Dramatic ocean waves -->
    <path d="M -360 80 Q -240 20, -120 70 T 120 50 T 360 70 L 360 160 L -360 160 Z" fill="#0369a1" opacity="0.6"/>
    <path d="M -360 110 Q -200 60, -60 110 T 200 90 T 360 120 L 360 160 L -360 160 Z" fill="#082f49" opacity="0.9"/>

    <!-- Wooden Catamaran / Boat -->
    <path d="M -160 50 L 160 50 L 130 90 L -130 90 Z" fill="#78350f" stroke="#b45309" stroke-width="3"/>
    
    <!-- Hero Sailor / Catamaran Captain (Soori / Kaali) standing with oar -->
    <line x1="20" y1="-80" x2="-80" y2="90" stroke="#fde047" stroke-width="4"/>
    <circle cx="10" cy="-60" r="16" fill="#f59e0b"/>
    <path d="M -10 -40 L 30 -40 L 25 35 L -5 35 Z" fill="#d97706"/>
    <!-- Red bandana / headband -->
    <rect x="0" y="-68" width="20" height="6" fill="#ef4444" rx="2"/>

    <!-- Ropes Motif -->
    <path d="M -120 50 Q 0 -10, 120 50" fill="none" stroke="#fcd34d" stroke-width="2.5" stroke-dasharray="8,4"/>
  </g>

  <!-- Title Block -->
  <g text-anchor="middle">
    <!-- Tamil Title -->
    <text x="400" y="650" fill="#38bdf8" font-family="system-ui, -apple-system, sans-serif" font-size="26" font-weight="800" letter-spacing="8">மந்தாடி</text>

    <!-- Main Title -->
    <text x="400" y="730" fill="url(#man-gold)" font-family="Impact, Charcoal, sans-serif" font-size="78" font-weight="900" letter-spacing="6">MANDAADI</text>
    <text x="400" y="765" fill="#e0f2fe" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="800" letter-spacing="10">THE SEA WANDERER</text>

    <!-- Tagline -->
    <rect x="200" y="800" width="400" height="34" rx="6" fill="#082f49" stroke="#0284c7" stroke-width="1"/>
    <text x="400" y="822" fill="#fef08a" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" letter-spacing="2">ROPES • RAGE • REVENGE ON THE WAVES</text>
  </g>

  <!-- Formats & Credits -->
  <g text-anchor="middle">
    <g transform="translate(400, 895)">
      <rect x="-240" y="-16" width="110" height="32" rx="6" fill="#0f172a" stroke="#0284c7" stroke-width="1.5"/>
      <text x="-185" y="4" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="13" font-weight="900">IMAX</text>

      <rect x="-115" y="-16" width="110" height="32" rx="6" fill="#0f172a" stroke="#0284c7" stroke-width="1.5"/>
      <text x="-60" y="4" fill="#ffffff" font-family="system-ui, sans-serif" font-size="13" font-weight="900">DOLBY ATMOS</text>

      <rect x="10" y="-16" width="105" height="32" rx="6" fill="#0f172a" stroke="#0284c7" stroke-width="1.5"/>
      <text x="62" y="4" fill="#ffffff" font-family="system-ui, sans-serif" font-size="13" font-weight="900">EPIQ 4K</text>

      <rect x="130" y="-16" width="110" height="32" rx="6" fill="#0f172a" stroke="#0284c7" stroke-width="1.5"/>
      <text x="185" y="4" fill="#facc15" font-family="system-ui, sans-serif" font-size="13" font-weight="900">U/A 13+</text>
    </g>

    <text x="400" y="975" fill="#fef08a" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="800" letter-spacing="3">MUSIC: G. V. PRAKASH KUMAR</text>
    <text x="400" y="1005" fill="#bae6fd" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" letter-spacing="2">WRITTEN &amp; DIRECTED BY MATHIMARAN PUGAZHENDHI</text>
    <text x="400" y="1030" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" letter-spacing="2">AN RS INFOTAINMENT PRODUCTION</text>

    <!-- Now Showing Banner -->
    <rect x="220" y="1070" width="360" height="42" rx="8" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="400" y="1097" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="900" letter-spacing="4">BLOCKBUSTER HIT IN THEATERS</text>
  </g>
</svg>
`);

// 3. MOTHARATHRI (MODHA RATHRI) - Official Theatrical Poster
export const MOTHARATHRI_POSTER = svgToDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1200" width="100%" height="100%">
  <defs>
    <linearGradient id="mr-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b0764"/>
      <stop offset="40%" stop-color="#581c87"/>
      <stop offset="75%" stop-color="#4a044e"/>
      <stop offset="100%" stop-color="#1f0329"/>
    </linearGradient>
    <linearGradient id="mr-gold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="50%" stop-color="#fde047"/>
      <stop offset="100%" stop-color="#eab308"/>
    </linearGradient>
    <radialGradient id="mr-lights" cx="50%" cy="30%" r="50%">
      <stop offset="0%" stop-color="#f43f5e" stop-opacity="0.35"/>
      <stop offset="50%" stop-color="#a855f7" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="800" height="1200" fill="url(#mr-bg)"/>
  <rect width="800" height="1200" fill="url(#mr-lights)"/>

  <!-- Border -->
  <rect x="25" y="25" width="750" height="1150" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-opacity="0.4"/>

  <!-- Top Studio Header -->
  <g text-anchor="middle">
    <text x="400" y="80" fill="#fde047" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="800" letter-spacing="5">MYTHRI MOVIE MAKERS PRESENTS</text>
    <text x="400" y="105" fill="#f0abfc" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" letter-spacing="3">PRODUCED BY NAVEEN YERNENI &amp; Y. RAVI SHANKAR</text>
  </g>

  <!-- Lead Cast -->
  <g text-anchor="middle">
    <text x="400" y="165" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="26" font-weight="900" letter-spacing="3">RISHIKANTH • ANISHMA ANILKUMAR</text>
    <text x="400" y="195" fill="#fde047" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" letter-spacing="2">SHELLY KISHORE • CHETAN • BAGAVATHI PERUMAL</text>
  </g>

  <!-- Wedding Night Garland & Nuptial Bed Festive Motif -->
  <g transform="translate(400, 420)">
    <!-- Garland string hanging -->
    <path d="M -260 -90 Q 0 40, 260 -90" fill="none" stroke="#f59e0b" stroke-width="8" stroke-linecap="round"/>
    <path d="M -260 -80 Q 0 50, 260 -80" fill="none" stroke="#ef4444" stroke-width="6" stroke-linecap="round"/>
    
    <!-- Marigold Flower beads -->
    <circle cx="-180" cy="-45" r="10" fill="#f59e0b"/>
    <circle cx="-90" cy="5" r="10" fill="#e11d48"/>
    <circle cx="0" cy="22" r="12" fill="#facc15"/>
    <circle cx="90" cy="5" r="10" fill="#e11d48"/>
    <circle cx="180" cy="-45" r="10" fill="#f59e0b"/>

    <!-- Decorative Wedding Bench / Bed -->
    <rect x="-160" y="50" width="320" height="40" rx="8" fill="#701a75" stroke="#fde047" stroke-width="2"/>

    <!-- Comic Groom and Bride Silhouettes -->
    <!-- Groom (Dubai return reluctant guy) -->
    <circle cx="-50" cy="-5" r="18" fill="#fde047"/>
    <path d="M -75 50 L -75 25 Q -50 15, -25 25 L -25 50 Z" fill="#fde047"/>
    <!-- Silk Veshti -->
    <rect x="-75" y="50" width="50" height="25" fill="#ffffff"/>

    <!-- Bride (Secret heartbreak, awkward expression) -->
    <circle cx="50" cy="-5" r="16" fill="#f472b6"/>
    <path d="M 25 50 L 25 25 Q 50 15, 75 25 L 75 50 Z" fill="#ec4899"/>
    <circle cx="68" cy="-12" r="6" fill="#facc15"/> <!-- Jasmine flowers in hair -->
  </g>

  <!-- Main Title Block -->
  <g text-anchor="middle">
    <!-- Tamil Title -->
    <text x="400" y="650" fill="#fde047" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="900" letter-spacing="6">மோத ராத்திரி</text>

    <!-- Main Title -->
    <text x="400" y="730" fill="url(#mr-gold)" font-family="system-ui, -apple-system, sans-serif" font-size="58" font-weight="900" letter-spacing="3">MOTHARATHRI</text>
    <text x="400" y="770" fill="#f472b6" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="800" letter-spacing="6">(MODHA RATHRI)</text>

    <!-- Tagline -->
    <rect x="180" y="805" width="440" height="34" rx="17" fill="#2e1065" stroke="#c084fc" stroke-width="1"/>
    <text x="400" y="827" fill="#fef08a" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" letter-spacing="2">ONE WEDDING NIGHT • A MILLION HILARIOUS TWISTS</text>
  </g>

  <!-- Credits -->
  <g text-anchor="middle">
    <g transform="translate(400, 895)">
      <rect x="-240" y="-16" width="110" height="32" rx="6" fill="#1e1b4b" stroke="#818cf8" stroke-width="1.5"/>
      <text x="-185" y="4" fill="#ffffff" font-family="system-ui, sans-serif" font-size="13" font-weight="900">DOLBY 7.1</text>

      <rect x="-115" y="-16" width="110" height="32" rx="6" fill="#1e1b4b" stroke="#818cf8" stroke-width="1.5"/>
      <text x="-60" y="4" fill="#ffffff" font-family="system-ui, sans-serif" font-size="13" font-weight="900">4K LASER</text>

      <rect x="10" y="-16" width="105" height="32" rx="6" fill="#1e1b4b" stroke="#818cf8" stroke-width="1.5"/>
      <text x="62" y="4" fill="#ffffff" font-family="system-ui, sans-serif" font-size="13" font-weight="900">FAMILY COMEDY</text>

      <rect x="130" y="-16" width="110" height="32" rx="6" fill="#1e1b4b" stroke="#818cf8" stroke-width="1.5"/>
      <text x="185" y="4" fill="#fde047" font-family="system-ui, sans-serif" font-size="13" font-weight="900">U/A 13+</text>
    </g>

    <text x="400" y="975" fill="#fde047" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="800" letter-spacing="3">MUSIC: BHARATH SANKAR</text>
    <text x="400" y="1005" fill="#e9d5ff" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" letter-spacing="2">WRITTEN &amp; DIRECTED BY RAJA KARUPPASAMY</text>
    <text x="400" y="1030" fill="#cbd5e1" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" letter-spacing="2">CINEMATOGRAPHY: SURENDRAN PARANJOTHI</text>

    <!-- Banner -->
    <rect x="220" y="1070" width="360" height="42" rx="8" fill="#9333ea" stroke="#fde047" stroke-width="1.5"/>
    <text x="400" y="1097" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="900" letter-spacing="4">RUNNING SUCCESSFULLY</text>
  </g>
</svg>
`);

// 4. SIGMA - Official Theatrical Poster (Upcoming Releasing October 2, 2026)
export const SIGMA_POSTER = svgToDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1200" width="100%" height="100%">
  <defs>
    <linearGradient id="sig-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#09090b"/>
      <stop offset="40%" stop-color="#18181b"/>
      <stop offset="80%" stop-color="#111827"/>
      <stop offset="100%" stop-color="#030712"/>
    </linearGradient>
    <linearGradient id="sig-gold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#eab308"/>
      <stop offset="40%" stop-color="#fef08a"/>
      <stop offset="70%" stop-color="#ca8a04"/>
      <stop offset="100%" stop-color="#eab308"/>
    </linearGradient>
    <radialGradient id="sig-spotlight" cx="50%" cy="38%" r="45%">
      <stop offset="0%" stop-color="#eab308" stop-opacity="0.3"/>
      <stop offset="55%" stop-color="#8b5cf6" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="800" height="1200" fill="url(#sig-bg)"/>
  <rect width="800" height="1200" fill="url(#sig-spotlight)"/>

  <!-- High-tech grid lines -->
  <line x1="100" y1="0" x2="100" y2="1200" stroke="#27272a" stroke-width="0.75" stroke-dasharray="8,8"/>
  <line x1="700" y1="0" x2="700" y2="1200" stroke="#27272a" stroke-width="0.75" stroke-dasharray="8,8"/>

  <!-- Frame -->
  <rect x="25" y="25" width="750" height="1150" fill="none" stroke="#ca8a04" stroke-width="1.5" stroke-opacity="0.6"/>

  <!-- Top Studio Line -->
  <g text-anchor="middle">
    <text x="400" y="80" fill="#facc15" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="900" letter-spacing="6">LYCA PRODUCTIONS • SUBASKARAN PRESENTS</text>
    <text x="400" y="105" fill="#a1a1aa" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" letter-spacing="3">A JASON SANJAY FILM</text>
  </g>

  <!-- Lead Star -->
  <g text-anchor="middle">
    <text x="400" y="165" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="30" font-weight="900" letter-spacing="4">SUNDEEP KISHAN</text>
    <text x="400" y="195" fill="#fef08a" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" letter-spacing="3">FARIA ABDULLAH • SAMPATH RAJ • SHIV PANDITT</text>
  </g>

  <!-- Central Motif: Heist Gold Bars & Greek Sigma Symbol -->
  <g transform="translate(400, 420)">
    <!-- Gold Bullion Pyramid -->
    <!-- Bottom layer bars -->
    <rect x="-180" y="80" width="80" height="35" rx="3" fill="#ca8a04" stroke="#fef08a" stroke-width="1.5"/>
    <text x="-140" y="102" text-anchor="middle" fill="#fef08a" font-family="monospace" font-size="9" font-weight="bold">999.9 GOLD</text>

    <rect x="-90" y="80" width="80" height="35" rx="3" fill="#eab308" stroke="#fef08a" stroke-width="1.5"/>
    <text x="-50" y="102" text-anchor="middle" fill="#422006" font-family="monospace" font-size="9" font-weight="bold">₹500 CR</text>

    <rect x="0" y="80" width="80" height="35" rx="3" fill="#ca8a04" stroke="#fef08a" stroke-width="1.5"/>
    <text x="40" y="102" text-anchor="middle" fill="#fef08a" font-family="monospace" font-size="9" font-weight="bold">999.9 GOLD</text>

    <rect x="90" y="80" width="80" height="35" rx="3" fill="#eab308" stroke="#fef08a" stroke-width="1.5"/>
    <text x="130" y="102" text-anchor="middle" fill="#422006" font-family="monospace" font-size="9" font-weight="bold">₹500 CR</text>

    <!-- Top layer bars -->
    <rect x="-135" y="40" width="80" height="35" rx="3" fill="#facc15" stroke="#ffffff" stroke-width="1.5"/>
    <rect x="-45" y="40" width="80" height="35" rx="3" fill="#eab308" stroke="#ffffff" stroke-width="1.5"/>
    <rect x="45" y="40" width="80" height="35" rx="3" fill="#facc15" stroke="#ffffff" stroke-width="1.5"/>

    <!-- Peak bar -->
    <rect x="-45" y="0" width="90" height="36" rx="3" fill="#fef08a" stroke="#ffffff" stroke-width="2"/>
    <text x="0" y="23" text-anchor="middle" fill="#000000" font-family="monospace" font-size="11" font-weight="900">SIGMA HEIST</text>

    <!-- Glowing Greek Letter Sigma Σ -->
    <text x="0" y="-40" text-anchor="middle" fill="url(#sig-gold)" font-family="Georgia, serif" font-size="110" font-weight="bold" filter="drop-shadow(0 0 15px rgba(250,204,21,0.8))">Σ</text>
  </g>

  <!-- Title Block -->
  <g text-anchor="middle">
    <!-- Tamil Title -->
    <text x="400" y="640" fill="#a1a1aa" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="800" letter-spacing="8">சிக்மா</text>

    <!-- Main Title -->
    <text x="400" y="730" fill="url(#sig-gold)" font-family="system-ui, -apple-system, sans-serif" font-size="88" font-weight="900" letter-spacing="12">SIGMA</text>

    <!-- Tagline -->
    <rect x="170" y="780" width="460" height="34" rx="6" fill="#09090b" stroke="#eab308" stroke-width="1.5"/>
    <text x="400" y="802" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="800" letter-spacing="3">500 CRORES • ONE ROGUE VOICE • THE HEIST BEGINS</text>
  </g>

  <!-- Formats & Credits -->
  <g text-anchor="middle">
    <g transform="translate(400, 885)">
      <rect x="-240" y="-16" width="110" height="32" rx="6" fill="#18181b" stroke="#eab308" stroke-width="1.5"/>
      <text x="-185" y="4" fill="#facc15" font-family="system-ui, sans-serif" font-size="13" font-weight="900">IMAX 2D</text>

      <rect x="-115" y="-16" width="110" height="32" rx="6" fill="#18181b" stroke="#3f3f46" stroke-width="1.5"/>
      <text x="-60" y="4" fill="#ffffff" font-family="system-ui, sans-serif" font-size="13" font-weight="900">DOLBY ATMOS</text>

      <rect x="10" y="-16" width="105" height="32" rx="6" fill="#18181b" stroke="#3f3f46" stroke-width="1.5"/>
      <text x="62" y="4" fill="#ffffff" font-family="system-ui, sans-serif" font-size="13" font-weight="900">RGB LASER</text>

      <rect x="130" y="-16" width="110" height="32" rx="6" fill="#18181b" stroke="#3f3f46" stroke-width="1.5"/>
      <text x="185" y="4" fill="#facc15" font-family="system-ui, sans-serif" font-size="13" font-weight="900">WORLDWIDE</text>
    </g>

    <text x="400" y="965" fill="#fde047" font-family="system-ui, -apple-system, sans-serif" font-size="17" font-weight="800" letter-spacing="3">MUSIC: S. THAMAN</text>
    <text x="400" y="995" fill="#e4e4e7" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" letter-spacing="2">WRITTEN &amp; DIRECTED BY JASON SANJAY</text>
    <text x="400" y="1020" fill="#a1a1aa" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" letter-spacing="2">PRODUCED BY SUBASKARAN • LYCA PRODUCTIONS</text>

    <!-- Upcoming Release Countdown Banner -->
    <rect x="200" y="1065" width="400" height="46" rx="8" fill="#eab308" stroke="#fef08a" stroke-width="1.5"/>
    <text x="400" y="1094" fill="#000000" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="900" letter-spacing="4">IN THEATERS OCTOBER 02, 2026</text>
  </g>
</svg>
`);

// 5. COOLIE - Official Theatrical Poster (Superstar Rajinikanth)
export const COOLIE_POSTER = svgToDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1200" width="100%" height="100%">
  <defs>
    <linearGradient id="cool-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1c1202"/>
      <stop offset="40%" stop-color="#2a1a05"/>
      <stop offset="70%" stop-color="#140a01"/>
      <stop offset="100%" stop-color="#050300"/>
    </linearGradient>
    <linearGradient id="cool-gold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="30%" stop-color="#fef08a"/>
      <stop offset="70%" stop-color="#d97706"/>
      <stop offset="100%" stop-color="#78350f"/>
    </linearGradient>
    <radialGradient id="cool-glow" cx="50%" cy="40%" r="55%">
      <stop offset="0%" stop-color="#ca8a04" stop-opacity="0.3"/>
      <stop offset="70%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="800" height="1200" fill="url(#cool-bg)"/>
  <rect width="800" height="1200" fill="url(#cool-glow)"/>
  <rect x="25" y="25" width="750" height="1150" fill="none" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.5"/>

  <!-- Studio Header -->
  <g text-anchor="middle">
    <text x="400" y="80" fill="#fde047" font-family="system-ui, sans-serif" font-size="14" font-weight="900" letter-spacing="5">KALANITHI MARAN • SUN PICTURES PRESENTS</text>
    <text x="400" y="105" fill="#a1a1aa" font-family="system-ui, sans-serif" font-size="11" font-weight="700" letter-spacing="3">A LOKESH KANAGARAJ FILM</text>
  </g>

  <!-- Superstar Billing -->
  <g text-anchor="middle">
    <text x="400" y="165" fill="#ffffff" font-family="system-ui, sans-serif" font-size="34" font-weight="900" letter-spacing="6">SUPERSTAR RAJINIKANTH</text>
    <text x="400" y="195" fill="#facc15" font-family="system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="2">NAGARJUNA • SOUBIN SHAHIR • SHRUTI HAASAN • SATHYARAJ • UPENDRA</text>
  </g>

  <!-- Motif: Gold Watch Chain & Coolie Union Badge 131 -->
  <g transform="translate(400, 420)">
    <!-- Gold chain circle -->
    <circle cx="0" cy="0" r="150" fill="#000000" stroke="url(#cool-gold)" stroke-width="8"/>
    <circle cx="0" cy="0" r="130" fill="#18181b" stroke="#713f12" stroke-width="2"/>
    <!-- Gold Bars Stack inside -->
    <rect x="-80" y="20" width="70" height="30" rx="3" fill="#ca8a04" stroke="#fef08a" stroke-width="1.5"/>
    <rect x="10" y="20" width="70" height="30" rx="3" fill="#eab308" stroke="#fef08a" stroke-width="1.5"/>
    <rect x="-35" y="-15" width="70" height="30" rx="3" fill="#facc15" stroke="#ffffff" stroke-width="2"/>
    <!-- Coolie Badge #131 -->
    <circle cx="0" cy="-60" r="35" fill="#dc2626" stroke="#ffffff" stroke-width="2.5"/>
    <text x="0" y="-53" text-anchor="middle" fill="#ffffff" font-family="system-ui, sans-serif" font-size="20" font-weight="900">131</text>
  </g>

  <!-- Title -->
  <g text-anchor="middle">
    <text x="400" y="650" fill="#a1a1aa" font-family="system-ui, sans-serif" font-size="22" font-weight="800" letter-spacing="8">கூலி</text>
    <text x="400" y="740" fill="url(#cool-gold)" font-family="Impact, Charcoal, sans-serif" font-size="110" font-weight="900" letter-spacing="14">COOLIE</text>
    <rect x="180" y="775" width="440" height="32" rx="6" fill="#000000" stroke="#ca8a04" stroke-width="1.5"/>
    <text x="400" y="796" fill="#ffffff" font-family="system-ui, sans-serif" font-size="11" font-weight="800" letter-spacing="2">A SYNDICATE BUILT OF GOLD • BROKEN BY ONE MAN</text>
  </g>

  <!-- Credits & Formats -->
  <g text-anchor="middle">
    <text x="400" y="870" fill="#facc15" font-family="system-ui, sans-serif" font-size="16" font-weight="900" letter-spacing="3">AN ANIRUDH MUSICAL • GIRYSH GANGADHARAN ISC</text>
    <text x="400" y="900" fill="#a1a1aa" font-family="system-ui, sans-serif" font-size="13" font-weight="700">FILMCALENDAR VERIFIED THEATRICAL RUN • MAY 2026</text>
    <rect x="230" y="930" width="340" height="42" rx="8" fill="#ca8a04" stroke="#fef08a" stroke-width="1.5"/>
    <text x="400" y="957" fill="#000000" font-family="system-ui, sans-serif" font-size="15" font-weight="900" letter-spacing="3">IMAX • DOLBY ATMOS • EPIQ 4K</text>
  </g>
</svg>
`);

// 6. THALAPATHY 69 - Official Theatrical Poster (Thalapathy Vijay)
export const THALAPATHY_69_POSTER = svgToDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1200" width="100%" height="100%">
  <defs>
    <linearGradient id="t69-bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#2d0505"/>
      <stop offset="35%" stop-color="#450a0a"/>
      <stop offset="70%" stop-color="#180404"/>
      <stop offset="100%" stop-color="#0a0202"/>
    </linearGradient>
    <linearGradient id="t69-flame" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ef4444"/>
      <stop offset="50%" stop-color="#f97316"/>
      <stop offset="100%" stop-color="#facc15"/>
    </linearGradient>
    <radialGradient id="t69-torch" cx="50%" cy="38%" r="60%">
      <stop offset="0%" stop-color="#f97316" stop-opacity="0.35"/>
      <stop offset="70%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="800" height="1200" fill="url(#t69-bg)"/>
  <rect width="800" height="1200" fill="url(#t69-torch)"/>
  <rect x="25" y="25" width="750" height="1150" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-opacity="0.4"/>

  <!-- Studio Header -->
  <g text-anchor="middle">
    <text x="400" y="80" fill="#fca5a5" font-family="system-ui, sans-serif" font-size="14" font-weight="900" letter-spacing="5">KVN PRODUCTIONS PRESENTS</text>
    <text x="400" y="105" fill="#fecaca" font-family="system-ui, sans-serif" font-size="11" font-weight="700" letter-spacing="3">AN H. VINOTH CINEMATIC ASSAULT</text>
  </g>

  <!-- Lead Star -->
  <g text-anchor="middle">
    <text x="400" y="165" fill="#ffffff" font-family="system-ui, sans-serif" font-size="36" font-weight="900" letter-spacing="6">THALAPATHY VIJAY</text>
    <text x="400" y="195" fill="#f87171" font-family="system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="2">POOJA HEGDE • BOBBY DEOL • GAUTHAM VASUDEV MENON • PRIYAMANI</text>
  </g>

  <!-- Motif: The Flaming Torch of Democracy -->
  <g transform="translate(400, 420)">
    <!-- Torch Base -->
    <path d="M-20,120 L20,120 L35,20 L-35,20 Z" fill="#27272a" stroke="#71717a" stroke-width="2"/>
    <!-- Torch Rim -->
    <ellipse cx="0" cy="20" rx="45" ry="12" fill="#52525b" stroke="#e4e4e7" stroke-width="2"/>
    <!-- Blazing Fire -->
    <path d="M-40,15 Q-50,-40 0,-110 Q50,-40 40,15 Q20,30 0,25 Q-20,30 -40,15 Z" fill="url(#t69-flame)" filter="drop-shadow(0 0 25px rgba(249,115,22,0.8))"/>
    <!-- Inner Flame Core -->
    <path d="M-20,15 Q-25,-20 0,-70 Q25,-20 20,15 Z" fill="#ffffff"/>
  </g>

  <!-- Title -->
  <g text-anchor="middle">
    <text x="400" y="650" fill="#f87171" font-family="system-ui, sans-serif" font-size="24" font-weight="800" letter-spacing="6">தளபதி 69</text>
    <text x="400" y="740" fill="url(#t69-flame)" font-family="Impact, Charcoal, sans-serif" font-size="95" font-weight="900" letter-spacing="8">THALAPATHY 69</text>
    <rect x="180" y="780" width="440" height="34" rx="6" fill="#180404" stroke="#ef4444" stroke-width="1.5"/>
    <text x="400" y="802" fill="#fef2f2" font-family="system-ui, sans-serif" font-size="12" font-weight="900" letter-spacing="3">THE TORCH BEARER OF DEMOCRACY</text>
  </g>

  <!-- Credits -->
  <g text-anchor="middle">
    <text x="400" y="870" fill="#fca5a5" font-family="system-ui, sans-serif" font-size="16" font-weight="900" letter-spacing="3">MUSIC: ANIRUDH RAVICHANDER</text>
    <text x="400" y="900" fill="#a1a1aa" font-family="system-ui, sans-serif" font-size="13" font-weight="700">FILMCALENDAR VERIFIED THEATRICAL RUN • OCTOBER 2026</text>
    <rect x="240" y="930" width="320" height="42" rx="8" fill="#b91c1c" stroke="#fca5a5" stroke-width="1.5"/>
    <text x="400" y="957" fill="#ffffff" font-family="system-ui, sans-serif" font-size="15" font-weight="900" letter-spacing="3">OCTOBER 2026 WORLDWIDE</text>
  </g>
</svg>
`);

// 7. GOOD BAD UGLY - Official Theatrical Poster (Ajith Kumar)
export const GOOD_BAD_UGLY_POSTER = svgToDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1200" width="100%" height="100%">
  <defs>
    <linearGradient id="gbu-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#032b17"/>
      <stop offset="40%" stop-color="#053e20"/>
      <stop offset="70%" stop-color="#0a1a10"/>
      <stop offset="100%" stop-color="#020804"/>
    </linearGradient>
    <linearGradient id="gbu-neon" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#22c55e"/>
      <stop offset="50%" stop-color="#eab308"/>
      <stop offset="100%" stop-color="#ec4899"/>
    </linearGradient>
  </defs>

  <rect width="800" height="1200" fill="url(#gbu-bg)"/>
  <rect x="25" y="25" width="750" height="1150" fill="none" stroke="#22c55e" stroke-width="1.5" stroke-opacity="0.5"/>

  <!-- Studio Header -->
  <g text-anchor="middle">
    <text x="400" y="80" fill="#86efac" font-family="system-ui, sans-serif" font-size="14" font-weight="900" letter-spacing="5">MYTHRI MOVIE MAKERS PRESENTS</text>
    <text x="400" y="105" fill="#d1fae5" font-family="system-ui, sans-serif" font-size="11" font-weight="700" letter-spacing="3">AN ADHIK RAVICHANDRAN EXPERIENCE</text>
  </g>

  <!-- Lead Star -->
  <g text-anchor="middle">
    <text x="400" y="165" fill="#ffffff" font-family="system-ui, sans-serif" font-size="36" font-weight="900" letter-spacing="6">AJITH KUMAR</text>
    <text x="400" y="195" fill="#f472b6" font-family="system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="2">TRISHA KRISHNAN • PRASANNA • ARJUN DAS • SUNIL</text>
  </g>

  <!-- Motif: Dragon Hawaiian Shirt + Twin Pistols -->
  <g transform="translate(400, 420)">
    <!-- Dragon Crest Circle -->
    <circle cx="0" cy="0" r="140" fill="#052e16" stroke="#22c55e" stroke-width="4"/>
    <!-- Pistols Crossed -->
    <path d="M-60,30 L0,-30 L20,-10 L-40,50 Z" fill="#71717a" stroke="#ffffff" stroke-width="2"/>
    <path d="M60,30 L0,-30 L-20,-10 L40,50 Z" fill="#71717a" stroke="#ffffff" stroke-width="2"/>
    <!-- Central Dragon Silhouette -->
    <circle cx="0" cy="-10" r="45" fill="#22c55e" fill-opacity="0.3"/>
    <text x="0" y="0" text-anchor="middle" fill="#facc15" font-family="Impact, sans-serif" font-size="34" font-weight="900">AK</text>
  </g>

  <!-- Title -->
  <g text-anchor="middle">
    <text x="400" y="650" fill="#86efac" font-family="system-ui, sans-serif" font-size="22" font-weight="800" letter-spacing="6">குட் பேட் அக்லி</text>
    <text x="400" y="740" fill="url(#gbu-neon)" font-family="Impact, Charcoal, sans-serif" font-size="80" font-weight="900" letter-spacing="6">GOOD BAD UGLY</text>
    <rect x="180" y="780" width="440" height="34" rx="6" fill="#052e16" stroke="#22c55e" stroke-width="1.5"/>
    <text x="400" y="802" fill="#ffffff" font-family="system-ui, sans-serif" font-size="11" font-weight="900" letter-spacing="2">TRIPLE THE SHADES • ZERO MERCY</text>
  </g>

  <!-- Credits -->
  <g text-anchor="middle">
    <text x="400" y="870" fill="#facc15" font-family="system-ui, sans-serif" font-size="16" font-weight="900" letter-spacing="3">MUSIC: DEVI SRI PRASAD (DSP)</text>
    <text x="400" y="900" fill="#a1a1aa" font-family="system-ui, sans-serif" font-size="13" font-weight="700">FILMCALENDAR VERIFIED THEATRICAL RUN • APRIL 2026</text>
    <rect x="240" y="930" width="320" height="42" rx="8" fill="#15803d" stroke="#86efac" stroke-width="1.5"/>
    <text x="400" y="957" fill="#ffffff" font-family="system-ui, sans-serif" font-size="15" font-weight="900" letter-spacing="3">IN THEATERS APRIL 10, 2026</text>
  </g>
</svg>
`);

// 8. RAMAYANA: PART 1 - Official Theatrical Poster
export const RAMAYANA_PART_1_POSTER = svgToDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1200" width="100%" height="100%">
  <defs>
    <linearGradient id="ram-bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1e1005"/>
      <stop offset="40%" stop-color="#3b1d06"/>
      <stop offset="70%" stop-color="#140801"/>
      <stop offset="100%" stop-color="#080300"/>
    </linearGradient>
    <linearGradient id="ram-gold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="50%" stop-color="#fef08a"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
  </defs>

  <rect width="800" height="1200" fill="url(#ram-bg)"/>
  <rect x="25" y="25" width="750" height="1150" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-opacity="0.5"/>

  <!-- Studio Header -->
  <g text-anchor="middle">
    <text x="400" y="80" fill="#fde68a" font-family="system-ui, sans-serif" font-size="14" font-weight="900" letter-spacing="5">NAMIT MALHOTRA (DNEG) &amp; YASH PRESENT</text>
    <text x="400" y="105" fill="#fef3c7" font-family="system-ui, sans-serif" font-size="11" font-weight="700" letter-spacing="3">DIRECTED BY NITESH TIWARI</text>
  </g>

  <!-- Lead Star Cast -->
  <g text-anchor="middle">
    <text x="400" y="165" fill="#ffffff" font-family="system-ui, sans-serif" font-size="30" font-weight="900" letter-spacing="4">RANBIR KAPOOR • SAI PALLAVI • YASH</text>
    <text x="400" y="195" fill="#fde047" font-family="system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="2">SUNNY DEOL • ARUN GOVIL • LARA DUTTA</text>
  </g>

  <!-- Motif: The Divine Kodanda Bow & Radiant Sun of Ayodhya -->
  <g transform="translate(400, 420)">
    <!-- Divine Sun Aura -->
    <circle cx="0" cy="0" r="140" fill="#d97706" fill-opacity="0.25"/>
    <circle cx="0" cy="0" r="100" fill="#f59e0b" fill-opacity="0.3"/>
    <!-- Kodanda Bow arc -->
    <path d="M-80,-100 Q-150,0 -80,100" fill="none" stroke="url(#ram-gold)" stroke-width="8"/>
    <!-- Bow string -->
    <line x1="-80" y1="-100" x2="-80" y2="100" stroke="#fef08a" stroke-width="2"/>
    <!-- Celestial Arrow -->
    <line x1="-120" y1="0" x2="80" y2="0" stroke="url(#ram-gold)" stroke-width="5"/>
    <polygon points="80,-12 110,0 80,12" fill="#fef08a"/>
  </g>

  <!-- Title -->
  <g text-anchor="middle">
    <text x="400" y="650" fill="#fef08a" font-family="system-ui, sans-serif" font-size="26" font-weight="800" letter-spacing="6">रामायण : भाग १</text>
    <text x="400" y="740" fill="url(#ram-gold)" font-family="Georgia, serif" font-size="75" font-weight="900" letter-spacing="8">RAMAYANA</text>
    <text x="400" y="785" fill="#ffffff" font-family="system-ui, sans-serif" font-size="18" font-weight="800" letter-spacing="6">PART 1 : THE AWAKENING</text>
  </g>

  <!-- Credits -->
  <g text-anchor="middle">
    <text x="400" y="870" fill="#fde68a" font-family="system-ui, sans-serif" font-size="16" font-weight="900" letter-spacing="3">MUSIC: A.R. RAHMAN &amp; HANS ZIMMER</text>
    <text x="400" y="900" fill="#a1a1aa" font-family="system-ui, sans-serif" font-size="13" font-weight="700">FILMCALENDAR VERIFIED THEATRICAL RUN • DIWALI 2026</text>
    <rect x="220" y="930" width="360" height="42" rx="8" fill="#b45309" stroke="#fef08a" stroke-width="1.5"/>
    <text x="400" y="957" fill="#ffffff" font-family="system-ui, sans-serif" font-size="15" font-weight="900" letter-spacing="3">IMAX 3D • WORLDWIDE RELEASE</text>
  </g>
</svg>
`);

// 9. TOXIC - Official Theatrical Poster (Rocking Star Yash)
export const TOXIC_POSTER = svgToDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1200" width="100%" height="100%">
  <defs>
    <linearGradient id="tox-bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="40%" stop-color="#020617"/>
      <stop offset="100%" stop-color="#000000"/>
    </linearGradient>
    <linearGradient id="tox-glow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#06b6d4"/>
      <stop offset="50%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#e0f2fe"/>
    </linearGradient>
  </defs>

  <rect width="800" height="1200" fill="url(#tox-bg)"/>
  <rect x="25" y="25" width="750" height="1150" fill="none" stroke="#06b6d4" stroke-width="1.5" stroke-opacity="0.4"/>

  <!-- Studio Header -->
  <g text-anchor="middle">
    <text x="400" y="80" fill="#7dd3fc" font-family="system-ui, sans-serif" font-size="14" font-weight="900" letter-spacing="5">KVN PRODUCTIONS &amp; MONSTER MIND CREATIONS</text>
    <text x="400" y="105" fill="#bae6fd" font-family="system-ui, sans-serif" font-size="11" font-weight="700" letter-spacing="3">A GEETU MOHANDAS FILM</text>
  </g>

  <!-- Lead Star -->
  <g text-anchor="middle">
    <text x="400" y="165" fill="#ffffff" font-family="system-ui, sans-serif" font-size="36" font-weight="900" letter-spacing="6">ROCKING STAR YASH</text>
    <text x="400" y="195" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="2">KIARA ADVANI • NAYANTHARA • HUMA QURESHI</text>
  </g>

  <!-- Motif: Fedora, Cigar, Tommy Gun Silhouette -->
  <g transform="translate(400, 420)">
    <circle cx="0" cy="0" r="140" fill="#082f49" stroke="#06b6d4" stroke-width="3"/>
    <!-- Fedora hat silhouette -->
    <path d="M-80,-20 Q-60,-80 0,-85 Q60,-80 80,-20 Q40,-35 0,-35 Q-40,-35 -80,-20 Z" fill="#0284c7" stroke="#e0f2fe" stroke-width="2"/>
    <!-- Cigar glowing ember -->
    <rect x="15" y="25" width="55" height="12" rx="2" fill="#334155" stroke="#94a3b8" stroke-width="1"/>
    <circle cx="70" cy="31" r="5" fill="#f97316" filter="drop-shadow(0 0 8px rgba(249,115,22,1))"/>
  </g>

  <!-- Title -->
  <g text-anchor="middle">
    <text x="400" y="650" fill="#7dd3fc" font-family="system-ui, sans-serif" font-size="22" font-weight="800" letter-spacing="6">ಟಾಕ್ಸಿಕ್</text>
    <text x="400" y="740" fill="url(#tox-glow)" font-family="Impact, Charcoal, sans-serif" font-size="105" font-weight="900" letter-spacing="14">TOXIC</text>
    <rect x="160" y="780" width="480" height="34" rx="6" fill="#082f49" stroke="#06b6d4" stroke-width="1.5"/>
    <text x="400" y="802" fill="#ffffff" font-family="system-ui, sans-serif" font-size="11" font-weight="900" letter-spacing="2">A FAIRY TALE FOR GROWN-UPS</text>
  </g>

  <!-- Credits -->
  <g text-anchor="middle">
    <text x="400" y="870" fill="#7dd3fc" font-family="system-ui, sans-serif" font-size="16" font-weight="900" letter-spacing="3">MUSIC: JEREMY STACK • RAJEEV RAVI ISC</text>
    <text x="400" y="900" fill="#a1a1aa" font-family="system-ui, sans-serif" font-size="13" font-weight="700">FILMCALENDAR VERIFIED THEATRICAL RUN • 2026</text>
    <rect x="240" y="930" width="320" height="42" rx="8" fill="#0284c7" stroke="#bae6fd" stroke-width="1.5"/>
    <text x="400" y="957" fill="#ffffff" font-family="system-ui, sans-serif" font-size="15" font-weight="900" letter-spacing="3">IN THEATERS APRIL 2026</text>
  </g>
</svg>
`);

// 10. SPIRIT - Official Theatrical Poster (Prabhas)
export const SPIRIT_POSTER = svgToDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1200" width="100%" height="100%">
  <defs>
    <linearGradient id="spi-bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#180505"/>
      <stop offset="40%" stop-color="#2a0808"/>
      <stop offset="100%" stop-color="#050101"/>
    </linearGradient>
    <linearGradient id="spi-red" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#dc2626"/>
      <stop offset="50%" stop-color="#f87171"/>
      <stop offset="100%" stop-color="#b91c1c"/>
    </linearGradient>
  </defs>

  <rect width="800" height="1200" fill="url(#spi-bg)"/>
  <rect x="25" y="25" width="750" height="1150" fill="none" stroke="#dc2626" stroke-width="1.5" stroke-opacity="0.4"/>

  <!-- Studio Header -->
  <g text-anchor="middle">
    <text x="400" y="80" fill="#fca5a5" font-family="system-ui, sans-serif" font-size="14" font-weight="900" letter-spacing="5">T-SERIES &amp; BHADRAKALI PICTURES PRESENT</text>
    <text x="400" y="105" fill="#fecaca" font-family="system-ui, sans-serif" font-size="11" font-weight="700" letter-spacing="3">A SANDEEP REDDY VANGA FILM</text>
  </g>

  <!-- Lead Star -->
  <g text-anchor="middle">
    <text x="400" y="165" fill="#ffffff" font-family="system-ui, sans-serif" font-size="36" font-weight="900" letter-spacing="6">REBEL STAR PRABHAS</text>
    <text x="400" y="195" fill="#f87171" font-family="system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="2">KAREENA KAPOOR KHAN • TRIPTII DIMRI</text>
  </g>

  <!-- Motif: Rogue IPS Police Badge with Bullet Holes -->
  <g transform="translate(400, 420)">
    <!-- Star Shield -->
    <path d="M0,-120 L80,-40 L50,80 L-50,80 L-80,-40 Z" fill="#450a0a" stroke="#dc2626" stroke-width="4"/>
    <!-- Police Lion Emblem Silhouette -->
    <circle cx="0" cy="-10" r="35" fill="#dc2626" fill-opacity="0.4"/>
    <text x="0" y="-3" text-anchor="middle" fill="#ffffff" font-family="system-ui, sans-serif" font-size="18" font-weight="900">IPS</text>
    <!-- Bullet Hole marks -->
    <circle cx="-35" cy="25" r="7" fill="#000000" stroke="#f87171" stroke-width="2"/>
    <circle cx="30" cy="-35" r="5" fill="#000000" stroke="#f87171" stroke-width="1.5"/>
  </g>

  <!-- Title -->
  <g text-anchor="middle">
    <text x="400" y="650" fill="#fca5a5" font-family="system-ui, sans-serif" font-size="24" font-weight="800" letter-spacing="6">స్పిరిట్</text>
    <text x="400" y="740" fill="url(#spi-red)" font-family="Impact, Charcoal, sans-serif" font-size="110" font-weight="900" letter-spacing="12">SPIRIT</text>
    <rect x="180" y="780" width="440" height="34" rx="6" fill="#200404" stroke="#dc2626" stroke-width="1.5"/>
    <text x="400" y="802" fill="#ffffff" font-family="system-ui, sans-serif" font-size="12" font-weight="900" letter-spacing="3">A COP WITH NO LIMITS • AN OBSESSION</text>
  </g>

  <!-- Credits -->
  <g text-anchor="middle">
    <text x="400" y="870" fill="#fca5a5" font-family="system-ui, sans-serif" font-size="16" font-weight="900" letter-spacing="3">MUSIC: HARSHAVARDHAN RAMESHWAR</text>
    <text x="400" y="900" fill="#a1a1aa" font-family="system-ui, sans-serif" font-size="13" font-weight="700">FILMCALENDAR VERIFIED THEATRICAL RUN • 2026</text>
    <rect x="240" y="930" width="320" height="42" rx="8" fill="#991b1b" stroke="#fca5a5" stroke-width="1.5"/>
    <text x="400" y="957" fill="#ffffff" font-family="system-ui, sans-serif" font-size="15" font-weight="900" letter-spacing="3">RELEASING IN THEATERS 2026</text>
  </g>
</svg>
`);

// 11. WAR 2 - Official Theatrical Poster (Hrithik Roshan & Jr NTR)
export const WAR_2_POSTER = svgToDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1200" width="100%" height="100%">
  <defs>
    <linearGradient id="war-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0c1929"/>
      <stop offset="50%" stop-color="#1e1b18"/>
      <stop offset="100%" stop-color="#2a0d0d"/>
    </linearGradient>
    <linearGradient id="war-split" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="50%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#ef4444"/>
    </linearGradient>
  </defs>

  <rect width="800" height="1200" fill="url(#war-bg)"/>
  <rect x="25" y="25" width="750" height="1150" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-opacity="0.4"/>

  <!-- Studio Header -->
  <g text-anchor="middle">
    <text x="400" y="80" fill="#fde68a" font-family="system-ui, sans-serif" font-size="14" font-weight="900" letter-spacing="5">YASH RAJ FILMS • YRF SPY UNIVERSE</text>
    <text x="400" y="105" fill="#fed7aa" font-family="system-ui, sans-serif" font-size="11" font-weight="700" letter-spacing="3">DIRECTED BY AYAN MUKERJI</text>
  </g>

  <!-- Lead Stars -->
  <g text-anchor="middle">
    <text x="400" y="165" fill="#ffffff" font-family="system-ui, sans-serif" font-size="34" font-weight="900" letter-spacing="5">HRITHIK ROSHAN • JR NTR</text>
    <text x="400" y="195" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="2">KIARA ADVANI • JOHN ABRAHAM (SPECIAL APPEARANCE)</text>
  </g>

  <!-- Motif: Crossfire Crosshairs Clashing in Ice & Fire -->
  <g transform="translate(400, 420)">
    <circle cx="0" cy="0" r="140" fill="#000000" stroke="url(#war-split)" stroke-width="6"/>
    <!-- Crosshairs -->
    <line x1="-160" y1="0" x2="160" y2="0" stroke="#f59e0b" stroke-width="2" stroke-dasharray="6,4"/>
    <line x1="0" y1="-160" x2="0" y2="160" stroke="#f59e0b" stroke-width="2" stroke-dasharray="6,4"/>
    <!-- Two Fighter Jets Silhouette -->
    <polygon points="-50,-30 -80,-50 -70,-30 -100,-20 -70,-10 -50,-20" fill="#38bdf8"/>
    <polygon points="50,30 80,50 70,30 100,20 70,10 50,20" fill="#ef4444"/>
    <text x="0" y="8" text-anchor="middle" fill="#ffffff" font-family="Impact, sans-serif" font-size="30" font-weight="900">VS</text>
  </g>

  <!-- Title -->
  <g text-anchor="middle">
    <text x="400" y="650" fill="#fed7aa" font-family="system-ui, sans-serif" font-size="24" font-weight="800" letter-spacing="6">वॉर २</text>
    <text x="400" y="740" fill="url(#war-split)" font-family="Impact, Charcoal, sans-serif" font-size="110" font-weight="900" letter-spacing="14">WAR 2</text>
    <rect x="180" y="780" width="440" height="34" rx="6" fill="#000000" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="400" y="802" fill="#ffffff" font-family="system-ui, sans-serif" font-size="12" font-weight="900" letter-spacing="3">THE SPY UNIVERSE COLLIDES</text>
  </g>

  <!-- Credits -->
  <g text-anchor="middle">
    <text x="400" y="870" fill="#fde68a" font-family="system-ui, sans-serif" font-size="16" font-weight="900" letter-spacing="3">MUSIC: PRITAM • PRODUCED BY ADITYA CHOPRA</text>
    <text x="400" y="900" fill="#a1a1aa" font-family="system-ui, sans-serif" font-size="13" font-weight="700">FILMCALENDAR VERIFIED THEATRICAL RUN • AUGUST 2026</text>
    <rect x="240" y="930" width="320" height="42" rx="8" fill="#d97706" stroke="#fef08a" stroke-width="1.5"/>
    <text x="400" y="957" fill="#000000" font-family="system-ui, sans-serif" font-size="15" font-weight="900" letter-spacing="3">IN THEATERS AUGUST 2026</text>
  </g>
</svg>
`);

// 12. AVENGERS: DOOMSDAY - Official Theatrical Poster
export const AVENGERS_DOOMSDAY_POSTER = svgToDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1200" width="100%" height="100%">
  <defs>
    <linearGradient id="doom-bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#022c15"/>
      <stop offset="40%" stop-color="#041f0f"/>
      <stop offset="70%" stop-color="#021008"/>
      <stop offset="100%" stop-color="#000000"/>
    </linearGradient>
    <linearGradient id="doom-emerald" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#22c55e"/>
      <stop offset="50%" stop-color="#86efac"/>
      <stop offset="100%" stop-color="#15803d"/>
    </linearGradient>
    <radialGradient id="doom-magic" cx="50%" cy="38%" r="60%">
      <stop offset="0%" stop-color="#22c55e" stop-opacity="0.35"/>
      <stop offset="70%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="800" height="1200" fill="url(#doom-bg)"/>
  <rect width="800" height="1200" fill="url(#doom-magic)"/>
  <rect x="25" y="25" width="750" height="1150" fill="none" stroke="#22c55e" stroke-width="1.5" stroke-opacity="0.4"/>

  <!-- Studio Header -->
  <g text-anchor="middle">
    <text x="400" y="80" fill="#ffffff" font-family="Impact, sans-serif" font-size="20" font-weight="900" letter-spacing="4">MARVEL STUDIOS</text>
    <text x="400" y="105" fill="#86efac" font-family="system-ui, sans-serif" font-size="11" font-weight="700" letter-spacing="3">DIRECTED BY ANTHONY &amp; JOE RUSSO</text>
  </g>

  <!-- Lead Star Cast -->
  <g text-anchor="middle">
    <text x="400" y="165" fill="#ffffff" font-family="system-ui, sans-serif" font-size="30" font-weight="900" letter-spacing="4">ROBERT DOWNEY JR. AS DOCTOR DOOM</text>
    <text x="400" y="195" fill="#86efac" font-family="system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="2">PEDRO PASCAL • VANESSA KIRBY • ANTHONY MACKIE • FLORENCE PUGH</text>
  </g>

  <!-- Motif: Doctor Doom Titanium Mask inside Shattered Avengers A -->
  <g transform="translate(400, 420)">
    <!-- Emerald Aura -->
    <circle cx="0" cy="0" r="145" fill="#14532d" fill-opacity="0.4" stroke="#22c55e" stroke-width="4"/>
    <!-- Avengers 'A' Outline -->
    <path d="M-60,70 L-20,-90 L20,-90 L60,70 L30,70 L20,30 L-20,30 L-30,70 Z M-10,0 L10,0 L0,-45 Z" fill="none" stroke="#71717a" stroke-width="3"/>
    <!-- Titanium Mask Facet -->
    <path d="M-40,-50 L40,-50 L50,10 L30,60 L0,80 L-30,60 L-50,10 Z" fill="#3f3f46" stroke="#d4d4d8" stroke-width="3"/>
    <!-- Eye slits with glowing emerald magic -->
    <rect x="-30" y="-10" width="22" height="10" rx="3" fill="#22c55e" filter="drop-shadow(0 0 10px #22c55e)"/>
    <rect x="8" y="-10" width="22" height="10" rx="3" fill="#22c55e" filter="drop-shadow(0 0 10px #22c55e)"/>
    <!-- Rivets -->
    <circle cx="-35" cy="-35" r="2.5" fill="#e4e4e7"/>
    <circle cx="35" cy="-35" r="2.5" fill="#e4e4e7"/>
    <circle cx="0" cy="65" r="2.5" fill="#e4e4e7"/>
  </g>

  <!-- Title -->
  <g text-anchor="middle">
    <text x="400" y="650" fill="#a1a1aa" font-family="system-ui, sans-serif" font-size="24" font-weight="800" letter-spacing="8">AVENGERS</text>
    <text x="400" y="740" fill="url(#doom-emerald)" font-family="Impact, Charcoal, sans-serif" font-size="80" font-weight="900" letter-spacing="10">DOOMSDAY</text>
    <rect x="180" y="780" width="440" height="34" rx="6" fill="#02140a" stroke="#22c55e" stroke-width="1.5"/>
    <text x="400" y="802" fill="#ffffff" font-family="system-ui, sans-serif" font-size="12" font-weight="900" letter-spacing="3">A NEW MASK • THE SAME DESTINY</text>
  </g>

  <!-- Credits -->
  <g text-anchor="middle">
    <text x="400" y="870" fill="#86efac" font-family="system-ui, sans-serif" font-size="16" font-weight="900" letter-spacing="3">MUSIC: ALAN SILVESTRI • MARVEL STUDIOS</text>
    <text x="400" y="900" fill="#a1a1aa" font-family="system-ui, sans-serif" font-size="13" font-weight="700">FILMCALENDAR VERIFIED THEATRICAL RUN • MAY 2026</text>
    <rect x="240" y="930" width="320" height="42" rx="8" fill="#15803d" stroke="#86efac" stroke-width="1.5"/>
    <text x="400" y="957" fill="#ffffff" font-family="system-ui, sans-serif" font-size="15" font-weight="900" letter-spacing="3">IMAX 3D • MAY 2026</text>
  </g>
</svg>
`);
