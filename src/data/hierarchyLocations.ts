import { 
  HierarchyCountry, 
  HierarchyState, 
  HierarchyDistrict, 
  HierarchyCity, 
  SelectedLocationPath, 
  City, 
  Theater, 
  Showtime 
} from '../types';

// Helper to generate dynamic authentic showtimes with available seats & local pricing
function createShowtimes(
  basePriceUSD: number, 
  seatsConfig: { m: number; a: number; e: number; n: number } = { m: 84, a: 46, e: 14, n: 62 }
): Showtime[] {
  return [
    {
      id: `st-m-${Math.random().toString(36).substring(2, 7)}`,
      time: '10:15 AM',
      period: 'morning',
      format: 'Laser 2D',
      priceStandardUSD: Number((basePriceUSD * 0.85).toFixed(2)),
      pricePremiumUSD: Number((basePriceUSD * 1.15).toFixed(2)),
      priceVIPUSD: Number((basePriceUSD * 1.55).toFixed(2)),
      occupancyStatus: seatsConfig.m < 25 ? 'almost_full' : seatsConfig.m < 60 ? 'filling_fast' : 'available',
      availableSeats: seatsConfig.m,
      totalSeats: 120,
      screenName: 'Audi 1 (RGB Laser)',
    },
    {
      id: `st-a-${Math.random().toString(36).substring(2, 7)}`,
      time: '01:45 PM',
      period: 'afternoon',
      format: 'Dolby Cinema',
      priceStandardUSD: Number(basePriceUSD.toFixed(2)),
      pricePremiumUSD: Number((basePriceUSD * 1.3).toFixed(2)),
      priceVIPUSD: Number((basePriceUSD * 1.7).toFixed(2)),
      occupancyStatus: seatsConfig.a < 25 ? 'almost_full' : seatsConfig.a < 60 ? 'filling_fast' : 'available',
      availableSeats: seatsConfig.a,
      totalSeats: 120,
      screenName: 'Screen 2 (Dolby Atmos)',
    },
    {
      id: `st-e-${Math.random().toString(36).substring(2, 7)}`,
      time: '06:30 PM',
      period: 'evening',
      format: 'IMAX 3D',
      priceStandardUSD: Number((basePriceUSD * 1.15).toFixed(2)),
      pricePremiumUSD: Number((basePriceUSD * 1.45).toFixed(2)),
      priceVIPUSD: Number((basePriceUSD * 1.95).toFixed(2)),
      occupancyStatus: seatsConfig.e < 25 ? 'almost_full' : seatsConfig.e < 60 ? 'filling_fast' : 'available',
      availableSeats: seatsConfig.e,
      totalSeats: 120,
      screenName: 'Grand Audi (IMAX Laser)',
    },
    {
      id: `st-n-${Math.random().toString(36).substring(2, 7)}`,
      time: '09:45 PM',
      period: 'night',
      format: '4DX',
      priceStandardUSD: Number((basePriceUSD * 1.1).toFixed(2)),
      pricePremiumUSD: Number((basePriceUSD * 1.4).toFixed(2)),
      priceVIPUSD: Number((basePriceUSD * 1.85).toFixed(2)),
      occupancyStatus: seatsConfig.n < 25 ? 'almost_full' : seatsConfig.n < 60 ? 'filling_fast' : 'available',
      availableSeats: seatsConfig.n,
      totalSeats: 120,
      screenName: 'Screen 4 (4DX Motion)',
    },
  ];
}

export const HIERARCHY_COUNTRIES: HierarchyCountry[] = [
  // 1. INDIA
  {
    id: 'in',
    name: 'India',
    flag: '🇮🇳',
    code: 'IN',
    currency: {
      code: 'INR',
      name: 'Indian Rupee',
      symbol: '₹',
      exchangeRate: 83.5,
      decimals: 2,
      position: 'prefix',
    },
    states: [
      {
        id: 'tamil-nadu',
        name: 'Tamil Nadu',
        districts: [
          {
            id: 'kanchipuram',
            name: 'Kanchipuram',
            cities: [
              {
                id: 'kanchipuram-town',
                name: 'Kanchipuram (City)',
                isSmallCity: false,
                theaters: [
                  {
                    id: 'th-kanchi-babu',
                    name: 'Babu Theatre 4K Dolby Atmos RGB Laser',
                    location: 'Gandhi Road, Near Bus Stand',
                    fullAddress: 'No. 45, Gandhi Road, Near Central Bus Stand, Kanchipuram, Tamil Nadu 631501',
                    distance: '0.8 km from center',
                    contactPhone: '+91 44 2722 4141',
                    amenities: ['RGB Laser 4K Projection', 'Dolby Atmos Spatial Audio', 'Plush Pushback Seats', 'Concession Cafeteria', 'Ample Bike & Car Parking'],
                    showtimes: createShowtimes(2.4, { m: 92, a: 54, e: 18, n: 72 }),
                  },
                  {
                    id: 'th-kanchi-vasanth',
                    name: 'Vasanth Theatre Laser Digital 3D',
                    location: 'Nellukara Street, Collectorate',
                    fullAddress: 'Nellukara Street, Opp. Collectorate Office, Kanchipuram, Tamil Nadu 631502',
                    distance: '1.4 km away',
                    contactPhone: '+91 44 2723 8812',
                    amenities: ['Barco 4K Laser', 'Dolby 7.1 Surround', 'Air Conditioned', 'Online QR Pass Entry'],
                    showtimes: createShowtimes(2.2, { m: 78, a: 38, e: 8, n: 64 }),
                  },
                  {
                    id: 'th-kanchi-tks',
                    name: 'TKS Cinemas A/C DTS Surround',
                    location: 'Kamarajar Salai, Railway Jn',
                    fullAddress: 'Kamarajar Salai, Near Kanchipuram Railway Junction, Kanchipuram, Tamil Nadu 631501',
                    distance: '2.1 km away',
                    contactPhone: '+91 44 2722 1920',
                    amenities: ['Qube 2K Digital', 'DTS Sound System', 'Family Box Seating', 'Snack Bar'],
                    showtimes: createShowtimes(1.9, { m: 110, a: 64, e: 24, n: 85 }),
                  },
                ],
              },
              {
                id: 'sriperumbudur',
                name: 'Sriperumbudur',
                isSmallCity: true,
                theaters: [
                  {
                    id: 'th-sriperumbudur-venkateshwara',
                    name: 'Sri Venkateshwara Theatre 4K Atmos',
                    location: 'Bangalore Highway, Bus Stand',
                    fullAddress: 'Bangalore-Chennai National Highway, Sriperumbudur, Tamil Nadu 602105',
                    distance: '0.5 km from Bus Terminus',
                    contactPhone: '+91 44 2716 3200',
                    amenities: ['Christie 4K Laser', 'Dolby Atmos 64-Channel', 'VIP Balcony', 'Food Court'],
                    showtimes: createShowtimes(2.5, { m: 88, a: 42, e: 16, n: 74 }),
                  },
                  {
                    id: 'th-sriperumbudur-evp',
                    name: 'EVP Cinema Complex & Laser Screens',
                    location: 'SIPCOT Tech Zone',
                    fullAddress: 'Chennai-Bengaluru Expressway, Near SIPCOT Industrial Park, Sriperumbudur, Tamil Nadu 602106',
                    distance: '2.8 km away',
                    contactPhone: '+91 44 2716 9901',
                    amenities: ['Multi-Screen Multiplex', 'Laser 2D & 3D', 'Gaming Lounge', 'Covered Parking'],
                    showtimes: createShowtimes(2.3, { m: 104, a: 58, e: 22, n: 80 }),
                  },
                ],
              },
              {
                id: 'chengalpattu',
                name: 'Chengalpattu',
                isSmallCity: true,
                theaters: [
                  {
                    id: 'th-chengalpattu-lathaa',
                    name: 'Lathaa Cinemas 4K RGB Laser',
                    location: 'GST Road, Old Bus Stand',
                    fullAddress: 'GST Road, Near Old Bus Stand, Chengalpattu, Tamil Nadu 603001',
                    distance: '0.9 km from Chengalpattu Jn',
                    contactPhone: '+91 44 2742 2255',
                    amenities: ['RGB Laser Projection', 'Dolby Atmos', 'Recliner Seats', 'Gourmet Snacks'],
                    showtimes: createShowtimes(2.4, { m: 82, a: 45, e: 12, n: 66 }),
                  },
                  {
                    id: 'th-chengalpattu-venkatesh',
                    name: 'Venkateshwara Theatre Dolby 7.1',
                    location: 'Alagesan Nagar',
                    fullAddress: 'Alagesan Nagar, Chengalpattu, Tamil Nadu 603001',
                    distance: '1.8 km away',
                    contactPhone: '+91 44 2743 1188',
                    amenities: ['2K Digital Projection', 'DTS 7.1 Sound', 'A/C Auditoriums', 'Snacks Counter'],
                    showtimes: createShowtimes(2.0, { m: 95, a: 60, e: 28, n: 84 }),
                  },
                ],
              },
              {
                id: 'walajabad',
                name: 'Walajabad',
                isSmallCity: true,
                theaters: [
                  {
                    id: 'th-walajabad-murugan',
                    name: 'Murugan Theatre A/C Digital 2K',
                    location: 'Bazaar Street, Walajabad',
                    fullAddress: 'Bazaar Street, Walajabad, Kanchipuram District, Tamil Nadu 631605',
                    distance: '0.4 km from Walajabad Market',
                    contactPhone: '+91 44 2725 6122',
                    amenities: ['Digital 2K Projection', 'A/C Auditorium', 'Digital Audio', 'Two-Wheeler Parking'],
                    showtimes: createShowtimes(1.8, { m: 105, a: 72, e: 34, n: 90 }),
                  },
                ],
              },
              {
                id: 'uthiramerur',
                name: 'Uthiramerur',
                isSmallCity: true,
                theaters: [
                  {
                    id: 'th-uthiramerur-krishna',
                    name: 'Sri Krishna Theatre Qube Digital',
                    location: 'Vandavasi Road, Uthiramerur',
                    fullAddress: 'Vandavasi Road, Uthiramerur, Kanchipuram District, Tamil Nadu 603406',
                    distance: '0.6 km from Historic Inscriptions Temple',
                    contactPhone: '+91 44 2727 2011',
                    amenities: ['Qube Digital Projection', 'Dolby Surround 7.1', 'Spacious Seating', 'Canteen'],
                    showtimes: createShowtimes(1.8, { m: 112, a: 68, e: 29, n: 88 }),
                  },
                ],
              },
            ],
          },
          {
            id: 'chennai',
            name: 'Chennai',
            cities: [
              {
                id: 'chennai-central',
                name: 'Chennai (Central / Royapettah)',
                isSmallCity: false,
                theaters: [
                  {
                    id: 'th-spi-sathyam',
                    name: 'SPI Cinemas Sathyam & Escape',
                    location: 'Royapettah, Central Chennai',
                    fullAddress: '8, Thiru-Vi-Ka Road, Royapettah, Chennai, Tamil Nadu 600014',
                    distance: '1.2 km away',
                    contactPhone: '+91 44 4224 4224',
                    amenities: ['Legendary Sathyam Popcorn', 'Dolby Atmos', '4K Laser Projection', 'Valet Parking'],
                    showtimes: createShowtimes(2.8, { m: 76, a: 34, e: 6, n: 58 }),
                  },
                  {
                    id: 'th-pvr-vr-mall',
                    name: 'PVR ICON (VR Chennai Mall)',
                    location: 'Jawaharlal Nehru Road, Anna Nagar',
                    fullAddress: 'VR Chennai, Jawaharlal Nehru Road, Anna Nagar West, Chennai, Tamil Nadu 600040',
                    distance: '4.5 km away',
                    contactPhone: '+91 44 6678 1234',
                    amenities: ['PVR P[XL] Giant Screen', '4DX Motion Seats', 'Luxury Recliners', 'Gourmet Dining'],
                    showtimes: createShowtimes(3.2, { m: 80, a: 42, e: 10, n: 62 }),
                  },
                ],
              },
              {
                id: 'chennai-chromepet-tambaram',
                name: 'Chromepet & Tambaram',
                isSmallCity: false,
                theaters: [
                  {
                    id: 'th-vettri-chromepet',
                    name: 'Vettri Theatres 4K RGB Laser',
                    location: 'GST Road, Chromepet',
                    fullAddress: '512, GST Road, Chromepet, Chennai, Tamil Nadu 600044',
                    distance: '0.5 km from Chromepet Railway Station',
                    contactPhone: '+91 44 2238 2238',
                    amenities: ['RGB Laser 4K', 'Dolby Atmos', 'Rakesh Recliners', 'Food Court'],
                    showtimes: createShowtimes(2.4, { m: 90, a: 48, e: 14, n: 70 }),
                  },
                  {
                    id: 'th-vidya-tambaram',
                    name: 'Vidya Theatre A/C DTS',
                    location: 'West Tambaram',
                    fullAddress: 'Kakkan Street, West Tambaram, Chennai, Tamil Nadu 600045',
                    distance: '1.2 km from Tambaram Bus Stand',
                    contactPhone: '+91 44 2226 5500',
                    amenities: ['2K Digital Projection', 'DTS Sound', 'Air Conditioned', 'Two Wheeler Parking'],
                    showtimes: createShowtimes(2.0, { m: 102, a: 66, e: 26, n: 82 }),
                  },
                ],
              },
              {
                id: 'chennai-koyambedu',
                name: 'Koyambedu (Rohini)',
                isSmallCity: false,
                theaters: [
                  {
                    id: 'th-rohini-silver',
                    name: 'Rohini Silver Screens & Dolby Atmos',
                    location: 'Poonamallee High Road, Koyambedu',
                    fullAddress: '141/2, Poonamallee High Rd, Koyambedu, Chennai, Tamil Nadu 600107',
                    distance: '0.8 km from Koyambedu Metro',
                    contactPhone: '+91 44 2475 7575',
                    amenities: ['Fans Festival Celebrations', 'RGB Laser 4K', 'Dolby Atmos', 'Recliner Lounges'],
                    showtimes: createShowtimes(2.5, { m: 65, a: 30, e: 4, n: 48 }),
                  },
                ],
              },
            ],
          },
          {
            id: 'coimbatore',
            name: 'Coimbatore',
            cities: [
              {
                id: 'coimbatore-city',
                name: 'Coimbatore City',
                isSmallCity: false,
                theaters: [
                  {
                    id: 'th-broadway-cbe',
                    name: 'Broadway Cinemas IMAX & EPIQ Laser',
                    location: 'Avinashi Road, Peelamedu',
                    fullAddress: 'Avinashi Road, Peelamedu, Coimbatore, Tamil Nadu 641004',
                    distance: '2.5 km away',
                    contactPhone: '+91 422 456 7890',
                    amenities: ['IMAX Laser Dual Screen', 'EPIQ Premium Large Format', 'Dolby Atmos', 'Gourmet Bar'],
                    showtimes: createShowtimes(2.8, { m: 85, a: 44, e: 14, n: 68 }),
                  },
                  {
                    id: 'th-kg-cinemas',
                    name: 'KG Cinemas RGB Laser 4K',
                    location: 'Bunglaw Street, Race Course',
                    fullAddress: 'Bunglaw St, Race Course, Coimbatore, Tamil Nadu 641018',
                    distance: '1.1 km away',
                    contactPhone: '+91 422 222 3456',
                    amenities: ['RGB Laser', 'Dolby Atmos', 'Premium Recliners', 'Cafe Lounge'],
                    showtimes: createShowtimes(2.4, { m: 92, a: 52, e: 20, n: 74 }),
                  },
                ],
              },
              {
                id: 'pollachi',
                name: 'Pollachi',
                isSmallCity: true,
                theaters: [
                  {
                    id: 'th-aakash-pollachi',
                    name: 'Aakash Cinemas 2K Dolby 7.1',
                    location: 'Palakkad Road, Pollachi',
                    fullAddress: 'Palakkad Road, Pollachi, Tamil Nadu 642001',
                    distance: '1.0 km from Pollachi Bus Stand',
                    contactPhone: '+91 4259 223 344',
                    amenities: ['2K Christie Laser', 'Dolby 7.1', 'A/C Seating', 'Canteen'],
                    showtimes: createShowtimes(1.9, { m: 108, a: 65, e: 25, n: 86 }),
                  },
                ],
              },
            ],
          },
          {
            id: 'madurai',
            name: 'Madurai',
            cities: [
              {
                id: 'madurai-city',
                name: 'Madurai City',
                isSmallCity: false,
                theaters: [
                  {
                    id: 'th-vetri-madurai',
                    name: 'Vetri Cinemas RGB 4K Laser',
                    location: 'Villapuram, Madurai',
                    fullAddress: 'Villapuram, Madurai, Tamil Nadu 625012',
                    distance: '2.0 km away',
                    contactPhone: '+91 452 267 8901',
                    amenities: ['RGB 4K Laser', 'Dolby Atmos', 'VIP Recliners', 'Cafeteria'],
                    showtimes: createShowtimes(2.3, { m: 90, a: 48, e: 18, n: 72 }),
                  },
                ],
              },
            ],
          },
          {
            id: 'salem',
            name: 'Salem',
            cities: [
              {
                id: 'salem-city',
                name: 'Salem City',
                isSmallCity: false,
                theaters: [
                  {
                    id: 'th-arrs-salem',
                    name: 'ARRS Multiplex RGB Laser',
                    location: 'Meyyanur Bypass Road',
                    fullAddress: 'Meyyanur Bypass Rd, Salem, Tamil Nadu 636004',
                    distance: '1.5 km from Salem Junction',
                    contactPhone: '+91 427 244 5566',
                    amenities: ['RGB 4K Laser', 'Dolby Atmos', '5 Multiplex Screens', 'Multi-Cuisine Snack Bar'],
                    showtimes: createShowtimes(2.2, { m: 94, a: 56, e: 22, n: 76 }),
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'karnataka',
        name: 'Karnataka',
        districts: [
          {
            id: 'bengaluru-urban',
            name: 'Bengaluru Urban',
            cities: [
              {
                id: 'bengaluru-central',
                name: 'Bengaluru Central / MG Road',
                isSmallCity: false,
                theaters: [
                  {
                    id: 'th-pvr-forum-rex',
                    name: "PVR Director's Cut & IMAX (Forum Rex)",
                    location: 'Brigade Road, Ashok Nagar',
                    fullAddress: 'Brigade Road, Ashok Nagar, Bengaluru, Karnataka 560001',
                    distance: '1.0 km from MG Road Metro',
                    contactPhone: '+91 80 4112 3456',
                    amenities: ['IMAX Laser', "Director's Cut Luxury Lounges", 'Chef-Crafted Menus', 'Valet Parking'],
                    showtimes: createShowtimes(3.6, { m: 72, a: 36, e: 8, n: 54 }),
                  },
                ],
              },
              {
                id: 'bengaluru-koramangala',
                name: 'Koramangala & HSR',
                isSmallCity: false,
                theaters: [
                  {
                    id: 'th-pvr-koramangala',
                    name: 'PVR Koramangala 4DX & IMAX',
                    location: 'Nexus Mall, Hosur Road',
                    fullAddress: 'Hosur Rd, Koramangala, Bengaluru, Karnataka 560095',
                    distance: '1.5 km away',
                    contactPhone: '+91 80 2553 5555',
                    amenities: ['4DX Motion Theatre', 'IMAX Screen', 'Recliner Audis', 'Gourmet Popcorn Bar'],
                    showtimes: createShowtimes(3.4, { m: 78, a: 40, e: 12, n: 60 }),
                  },
                ],
              },
              {
                id: 'bengaluru-whitefield',
                name: 'Whitefield',
                isSmallCity: true,
                theaters: [
                  {
                    id: 'th-inox-shantiniketan',
                    name: 'INOX Megaplex Nexus Shantiniketan',
                    location: 'Whitefield Main Road',
                    fullAddress: 'Whitefield Main Rd, Thigalarapalya, Bengaluru, Karnataka 560067',
                    distance: '1.2 km away',
                    contactPhone: '+91 80 6813 4567',
                    amenities: ['IMAX Laser', 'Samsung Onyx LED Screen', 'In-Seat Butler Dining'],
                    showtimes: createShowtimes(3.3, { m: 84, a: 44, e: 15, n: 65 }),
                  },
                ],
              },
            ],
          },
          {
            id: 'mysuru',
            name: 'Mysuru',
            cities: [
              {
                id: 'mysuru-city',
                name: 'Mysuru City',
                isSmallCity: false,
                theaters: [
                  {
                    id: 'th-drc-mysuru',
                    name: 'DRC Cinemas Dolby Atmos (Habitat Mall)',
                    location: 'Jayalakshmipuram',
                    fullAddress: 'Gokulam Main Rd, Jayalakshmipuram, Mysuru, Karnataka 570012',
                    distance: '2.0 km away',
                    contactPhone: '+91 821 424 2222',
                    amenities: ['Dolby Atmos', '4K Christie Laser', 'Recliners', 'Snack Bar'],
                    showtimes: createShowtimes(2.4, { m: 92, a: 50, e: 18, n: 74 }),
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'maharashtra',
        name: 'Maharashtra',
        districts: [
          {
            id: 'mumbai-suburban',
            name: 'Mumbai Suburban',
            cities: [
              {
                id: 'mumbai-andheri-juhu',
                name: 'Andheri & Juhu',
                isSmallCity: false,
                theaters: [
                  {
                    id: 'th-pvr-icon-andheri',
                    name: 'PVR ICON Infiniti Mall',
                    location: 'Link Road, Andheri West',
                    fullAddress: 'Link Rd, Oshiwara, Andheri West, Mumbai, Maharashtra 400053',
                    distance: '1.5 km away',
                    contactPhone: '+91 22 6679 1234',
                    amenities: ['4DX Experience', 'Dolby Atmos', 'VIP Gold Class', 'Valet Parking'],
                    showtimes: createShowtimes(3.5, { m: 70, a: 32, e: 6, n: 52 }),
                  },
                ],
              },
              {
                id: 'mumbai-bkc',
                name: 'Bandra & BKC',
                isSmallCity: false,
                theaters: [
                  {
                    id: 'th-maison-pvr-bkc',
                    name: 'Jio World Drive Maison PVR Luxe',
                    location: 'Bandra Kurla Complex (BKC)',
                    fullAddress: 'Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051',
                    distance: '0.8 km from Diamond Bourse',
                    contactPhone: '+91 22 3505 1111',
                    amenities: ['Maison PVR Ultra Luxury', 'Dolby Cinema', 'Celebrity Chef Menus', 'Private Screening Suites'],
                    showtimes: createShowtimes(4.2, { m: 60, a: 28, e: 4, n: 42 }),
                  },
                ],
              },
            ],
          },
          {
            id: 'pune',
            name: 'Pune',
            cities: [
              {
                id: 'pune-city',
                name: 'Pune City / Hadapsar',
                isSmallCity: false,
                theaters: [
                  {
                    id: 'th-cinepolis-seasons',
                    name: 'Cinepolis Seasons Mall IMAX',
                    location: 'Magarpatta City, Hadapsar',
                    fullAddress: 'Magarpatta City, Hadapsar, Pune, Maharashtra 411028',
                    distance: '1.8 km away',
                    contactPhone: '+91 20 6723 3456',
                    amenities: ['15 Screen Megaplex', 'IMAX Laser', 'VIP Club Lounges', 'Multi-Cuisine Cafe'],
                    showtimes: createShowtimes(2.9, { m: 82, a: 44, e: 14, n: 68 }),
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'telangana',
        name: 'Telangana',
        districts: [
          {
            id: 'hyderabad',
            name: 'Hyderabad',
            cities: [
              {
                id: 'hyderabad-central',
                name: 'Hyderabad Central (Khairatabad)',
                isSmallCity: false,
                theaters: [
                  {
                    id: 'th-prasads-multiplex',
                    name: 'Prasads Multiplex Large Screen (PCX)',
                    location: 'NTR Marg, Khairatabad',
                    fullAddress: 'NTR Marg, Central Secretariat, Khairatabad, Hyderabad, Telangana 500004',
                    distance: '0.5 km from Hussain Sagar Lake',
                    contactPhone: '+91 40 2344 8888',
                    amenities: ['PCX Giant Screen 64ft', 'Dual 4K Laser Projection', 'Dolby Atmos', 'Game City Arena'],
                    showtimes: createShowtimes(2.8, { m: 72, a: 34, e: 6, n: 56 }),
                  },
                ],
              },
              {
                id: 'hyderabad-gachibowli',
                name: 'Gachibowli & Hitec City',
                isSmallCity: false,
                theaters: [
                  {
                    id: 'th-amb-cinemas',
                    name: 'AMB Cinemas Superplex (Mahesh Babu)',
                    location: 'Gachibowli - Miyapur Road',
                    fullAddress: 'Gachibowli - Miyapur Rd, Whitefields, Kondapur, Hyderabad, Telangana 500084',
                    distance: '1.2 km from Cyber Towers',
                    contactPhone: '+91 40 4567 8901',
                    amenities: ['Laser Screen 1 with M-Lounge', 'Dolby Atmos Sound', 'VIP Valet Service', 'Gourmet Concessions'],
                    showtimes: createShowtimes(3.2, { m: 76, a: 38, e: 8, n: 58 }),
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'kerala',
        name: 'Kerala',
        districts: [
          {
            id: 'ernakulam',
            name: 'Ernakulam (Kochi)',
            cities: [
              {
                id: 'kochi-edappally',
                name: 'Kochi / Edappally',
                isSmallCity: false,
                theaters: [
                  {
                    id: 'th-pvr-lulu-kochi',
                    name: 'PVR LuLu Mall IMAX Laser',
                    location: 'LuLu International Mall, Edappally',
                    fullAddress: 'LuLu Mall, NH 544, Edappally, Kochi, Kerala 682024',
                    distance: '0.5 km from Edappally Metro',
                    contactPhone: '+91 484 272 7000',
                    amenities: ['IMAX Laser', '4DX Motion Theater', 'PVR Gold Class', 'Extensive Food Court'],
                    showtimes: createShowtimes(2.6, { m: 80, a: 42, e: 10, n: 64 }),
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'delhi-ncr',
        name: 'Delhi NCR',
        districts: [
          {
            id: 'new-delhi',
            name: 'New Delhi',
            cities: [
              {
                id: 'delhi-connaught-place',
                name: 'Connaught Place',
                isSmallCity: false,
                theaters: [
                  {
                    id: 'th-pvr-plaza-delhi',
                    name: 'PVR Plaza Heritage Cinema',
                    location: 'H Block, Connaught Circus',
                    fullAddress: 'H Block, Connaught Circus, New Delhi, Delhi 110001',
                    distance: '0.2 km from Rajiv Chowk Metro',
                    contactPhone: '+91 11 2332 0200',
                    amenities: ['Heritage Architecture', 'Dolby Atmos', 'Luxury Recliners', 'Historical Memorabilia'],
                    showtimes: createShowtimes(3.2, { m: 74, a: 36, e: 8, n: 54 }),
                  },
                ],
              },
              {
                id: 'delhi-saket',
                name: 'Saket (District Centre)',
                isSmallCity: false,
                theaters: [
                  {
                    id: 'th-pvr-select-citywalk',
                    name: 'PVR Select CITYWALK IMAX',
                    location: 'Select CITYWALK Mall, Saket',
                    fullAddress: 'A-3, District Centre, Saket, New Delhi, Delhi 110017',
                    distance: '1.0 km from Malviya Nagar Metro',
                    contactPhone: '+91 11 4211 4211',
                    amenities: ['IMAX Laser', 'PVR Gold Class', 'Premier Lounge', 'Direct Mall Entry'],
                    showtimes: createShowtimes(3.5, { m: 68, a: 30, e: 6, n: 48 }),
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // 2. UNITED STATES
  {
    id: 'us',
    name: 'United States',
    flag: '🇺🇸',
    code: 'US',
    currency: {
      code: 'USD',
      name: 'US Dollar',
      symbol: '$',
      exchangeRate: 1.0,
      decimals: 2,
      position: 'prefix',
    },
    states: [
      {
        id: 'california',
        name: 'California',
        districts: [
          {
            id: 'los-angeles-county',
            name: 'Los Angeles County',
            cities: [
              {
                id: 'hollywood-la',
                name: 'Los Angeles (Hollywood)',
                isSmallCity: false,
                theaters: [
                  {
                    id: 'th-tcl-chinese-la',
                    name: 'TCL Chinese Theatre IMAX',
                    location: 'Hollywood Boulevard',
                    fullAddress: '6925 Hollywood Blvd, Hollywood, CA 90028',
                    distance: '0.8 miles away',
                    contactPhone: '+1 323 461 3331',
                    amenities: ['World Largest IMAX Laser Screen', 'Historic Handprints Forecourt', 'VIP Balcony Lounge'],
                    showtimes: createShowtimes(16.5, { m: 68, a: 34, e: 8, n: 50 }),
                  },
                  {
                    id: 'th-amc-citywalk-la',
                    name: 'Universal Cinema AMC at CityWalk',
                    location: 'Universal City Plaza',
                    fullAddress: '100 Universal City Plaza, Universal City, CA 91608',
                    distance: '3.2 miles away',
                    contactPhone: '+1 818 508 0588',
                    amenities: ['7-Story IMAX', 'Director Lounge Bar', 'Power Recliners', 'Theme Park Access'],
                    showtimes: createShowtimes(17.0, { m: 72, a: 38, e: 10, n: 54 }),
                  },
                ],
              },
              {
                id: 'santa-monica',
                name: 'Santa Monica',
                isSmallCity: true,
                theaters: [
                  {
                    id: 'th-amc-santa-monica',
                    name: 'AMC Santa Monica 7 & Dolby Cinema',
                    location: '3rd Street Promenade',
                    fullAddress: '1310 3rd Street Promenade, Santa Monica, CA 90401',
                    distance: '0.4 miles from Beach Pier',
                    contactPhone: '+1 310 451 9440',
                    amenities: ['Dolby Cinema at AMC', 'Signature Heated Recliners', 'MacGuffins Bar'],
                    showtimes: createShowtimes(16.0, { m: 80, a: 42, e: 14, n: 60 }),
                  },
                ],
              },
            ],
          },
          {
            id: 'san-francisco-county',
            name: 'San Francisco County',
            cities: [
              {
                id: 'san-francisco-downtown',
                name: 'San Francisco Downtown',
                isSmallCity: false,
                theaters: [
                  {
                    id: 'th-amc-metreon-sf',
                    name: 'AMC Metreon 16 & IMAX 70mm',
                    location: '4th Street, SoMa',
                    fullAddress: '135 4th St #3000, San Francisco, CA 94103',
                    distance: '0.3 miles from Moscone Center',
                    contactPhone: '+1 415 369 6207',
                    amenities: ['15/70mm Film & Laser IMAX', 'Prime at AMC', 'Dolby Cinema', 'Full Cocktail Bar'],
                    showtimes: createShowtimes(18.0, { m: 65, a: 30, e: 6, n: 46 }),
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'new-york-state',
        name: 'New York',
        districts: [
          {
            id: 'new-york-county',
            name: 'New York County (Manhattan)',
            cities: [
              {
                id: 'manhattan-midtown',
                name: 'Manhattan (Upper West / Midtown)',
                isSmallCity: false,
                theaters: [
                  {
                    id: 'th-amc-lincoln-sq',
                    name: 'AMC Lincoln Square & IMAX 70mm',
                    location: 'Upper West Side, Broadway',
                    fullAddress: '1998 Broadway, Upper West Side, New York, NY 10023',
                    distance: '0.6 miles from Central Park',
                    contactPhone: '+1 212 336 5020',
                    amenities: ['Massive 75ft IMAX Screen', '70mm Projection', 'Dolby Cinema', 'Reserved Recliners'],
                    showtimes: createShowtimes(18.5, { m: 60, a: 28, e: 4, n: 44 }),
                  },
                  {
                    id: 'th-regal-times-sq',
                    name: 'Regal E-Walk 4DX Times Square',
                    location: 'Times Square, 42nd St',
                    fullAddress: '247 W 42nd St, Times Square, Manhattan, NY 10036',
                    distance: '0.2 miles from Times Square',
                    contactPhone: '+1 844 462 7342',
                    amenities: ['4DX Motion Theater', 'ScreenX 270° Panoramic', 'King Size Recliners'],
                    showtimes: createShowtimes(17.5, { m: 70, a: 36, e: 8, n: 52 }),
                  },
                ],
              },
            ],
          },
          {
            id: 'kings-county',
            name: 'Kings County (Brooklyn)',
            cities: [
              {
                id: 'downtown-brooklyn',
                name: 'Downtown Brooklyn',
                isSmallCity: false,
                theaters: [
                  {
                    id: 'th-alamo-brooklyn',
                    name: 'Alamo Drafthouse Cinema Downtown Brooklyn',
                    location: 'Albee Square West',
                    fullAddress: '445 Albee Square W, Downtown Brooklyn, NY 11201',
                    distance: '1.2 miles away',
                    contactPhone: '+1 718 513 2547',
                    amenities: ['In-Theater Dining & Cocktails', '35mm Film Vault', 'Strict No-Phone Policy'],
                    showtimes: createShowtimes(17.0, { m: 74, a: 38, e: 10, n: 55 }),
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'texas',
        name: 'Texas',
        districts: [
          {
            id: 'harris-county',
            name: 'Harris County (Houston)',
            cities: [
              {
                id: 'houston-city',
                name: 'Houston (Greenway)',
                isSmallCity: false,
                theaters: [
                  {
                    id: 'th-edwards-houston',
                    name: 'Edwards Greenway Grand Palace IMAX',
                    location: 'Weslayan St, Greenway',
                    fullAddress: '3839 Weslayan St, Houston, TX 77027',
                    distance: '2.0 miles away',
                    contactPhone: '+1 844 462 7342',
                    amenities: ['IMAX Laser', 'RPX Regal Premium Experience', 'Full Bar & Lounge'],
                    showtimes: createShowtimes(14.5, { m: 82, a: 45, e: 15, n: 65 }),
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // 3. UNITED KINGDOM
  {
    id: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    code: 'GB',
    currency: {
      code: 'GBP',
      name: 'British Pound',
      symbol: '£',
      exchangeRate: 0.78,
      decimals: 2,
      position: 'prefix',
    },
    states: [
      {
        id: 'england',
        name: 'England',
        districts: [
          {
            id: 'greater-london',
            name: 'Greater London',
            cities: [
              {
                id: 'central-london',
                name: 'Central London (West End)',
                isSmallCity: false,
                theaters: [
                  {
                    id: 'th-bfi-imax-london',
                    name: 'BFI IMAX Waterloo (Britain’s Biggest Screen)',
                    location: 'South Bank, Waterloo',
                    fullAddress: '1 Charlie Chaplin Walk, South Bank, London SE1 8XR',
                    distance: '0.2 miles from Waterloo Station',
                    contactPhone: '+44 20 7928 3232',
                    amenities: ['Britain’s Largest Screen (65ft)', 'IMAX with Laser & 15/70mm', '12-Channel Spatial Sound'],
                    showtimes: createShowtimes(17.5, { m: 62, a: 28, e: 5, n: 44 }),
                  },
                  {
                    id: 'th-odeon-luxe-leicester',
                    name: 'Odeon Luxe Leicester Square Dolby Cinema',
                    location: 'Leicester Square, West End',
                    fullAddress: '24-26 Leicester Square, London WC2H 7LQ',
                    distance: '0.1 miles from Leicester Sq Tube',
                    contactPhone: '+44 333 014 4501',
                    amenities: ['Dolby Cinema Laser', 'Dolby Atmos Audio', 'Oscar' + 's Bar', 'Royal Box Seating'],
                    showtimes: createShowtimes(18.5, { m: 58, a: 24, e: 4, n: 40 }),
                  },
                ],
              },
              {
                id: 'east-london-stratford',
                name: 'Stratford & East London',
                isSmallCity: false,
                theaters: [
                  {
                    id: 'th-vue-stratford',
                    name: 'Vue Cinema London Stratford City',
                    location: 'Westfield Stratford City',
                    fullAddress: 'Westfield Stratford City, 207 Montfichet Rd, London E20 1EJ',
                    distance: '0.3 miles from Stratford Station',
                    contactPhone: '+44 345 308 4620',
                    amenities: ['17 Screen All-Recliner', 'Vue Xtreme Large Format', 'Sony 4K Digital'],
                    showtimes: createShowtimes(13.0, { m: 85, a: 48, e: 16, n: 68 }),
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // 4. UNITED ARAB EMIRATES
  {
    id: 'uae',
    name: 'United Arab Emirates',
    flag: '🇦🇪',
    code: 'AE',
    currency: {
      code: 'AED',
      name: 'UAE Dirham',
      symbol: 'AED ',
      exchangeRate: 3.67,
      decimals: 2,
      position: 'prefix',
    },
    states: [
      {
        id: 'dubai-emirate',
        name: 'Dubai',
        districts: [
          {
            id: 'dubai-central',
            name: 'Dubai Central',
            cities: [
              {
                id: 'downtown-dubai',
                name: 'Downtown Dubai',
                isSmallCity: false,
                theaters: [
                  {
                    id: 'th-reel-dubai-mall',
                    name: 'Reel Cinemas The Dubai Mall & ScreenX',
                    location: 'The Dubai Mall, Downtown',
                    fullAddress: 'Level 2, The Dubai Mall, Financial Center Rd, Downtown Dubai',
                    distance: '0.4 km from Burj Khalifa',
                    contactPhone: '+971 800 38224 6255',
                    amenities: ['26 Screens Mega Multiplex', 'ScreenX 270°', 'Dine-In Cinema with Guy Fieri', 'Platinum Suites'],
                    showtimes: createShowtimes(15.0, { m: 72, a: 35, e: 8, n: 52 }),
                  },
                ],
              },
              {
                id: 'dubai-marina',
                name: 'Dubai Marina',
                isSmallCity: true,
                theaters: [
                  {
                    id: 'th-roxy-marina-mall',
                    name: 'Roxy Cinemas Dubai Marina Mall',
                    location: 'Dubai Marina Mall',
                    fullAddress: 'Dubai Marina Mall, Sheikh Zayed Rd, Dubai Marina, Dubai',
                    distance: '0.3 km from Marina Promenade',
                    contactPhone: '+971 800 7699',
                    amenities: ['Diamond Recliner Experience', 'Gourmet Platters', 'Direct Marina Views'],
                    showtimes: createShowtimes(16.0, { m: 78, a: 38, e: 10, n: 58 }),
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // 5. JAPAN
  {
    id: 'jp',
    name: 'Japan',
    flag: '🇯🇵',
    code: 'JP',
    currency: {
      code: 'JPY',
      name: 'Japanese Yen',
      symbol: '¥',
      exchangeRate: 155.0,
      decimals: 0,
      position: 'prefix',
    },
    states: [
      {
        id: 'tokyo-prefecture',
        name: 'Tokyo',
        districts: [
          {
            id: 'shinjuku-ward',
            name: 'Shinjuku Ward',
            cities: [
              {
                id: 'shinjuku-city',
                name: 'Shinjuku (Kabukicho)',
                isSmallCity: false,
                theaters: [
                  {
                    id: 'th-toho-shinjuku',
                    name: 'TOHO Cinemas Shinjuku & Godzilla IMAX',
                    location: 'Kabukicho, Shinjuku City',
                    fullAddress: '1 Chome-19-1 Kabukicho, Shinjuku City, Tokyo 160-0021',
                    distance: '0.4 km from Shinjuku Station',
                    contactPhone: '+81 50 6868 5063',
                    amenities: ['Iconic Godzilla Head Balcony', 'IMAX Laser 3D', 'TCX Large Screen', 'Media Space Sound'],
                    showtimes: createShowtimes(14.0, { m: 65, a: 28, e: 5, n: 46 }),
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // 6. AUSTRALIA
  {
    id: 'au',
    name: 'Australia',
    flag: '🇦🇺',
    code: 'AU',
    currency: {
      code: 'AUD',
      name: 'Australian Dollar',
      symbol: 'A$',
      exchangeRate: 1.52,
      decimals: 2,
      position: 'prefix',
    },
    states: [
      {
        id: 'new-south-wales',
        name: 'New South Wales',
        districts: [
          {
            id: 'greater-sydney',
            name: 'Greater Sydney',
            cities: [
              {
                id: 'sydney-cbd',
                name: 'Sydney CBD',
                isSmallCity: false,
                theaters: [
                  {
                    id: 'th-event-george-st',
                    name: 'Event Cinemas George Street IMAX Laser',
                    location: 'George Street, Sydney CBD',
                    fullAddress: '505-525 George St, Sydney NSW 2000',
                    distance: '0.3 km from Town Hall',
                    contactPhone: '+61 2 9273 7300',
                    amenities: ['IMAX Laser Dual Screen', '4DX Sensory Experience', 'Event Gold Class', 'Scoop Alley'],
                    showtimes: createShowtimes(15.5, { m: 70, a: 36, e: 9, n: 54 }),
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // 7. CANADA
  {
    id: 'ca',
    name: 'Canada',
    flag: '🇨🇦',
    code: 'CA',
    currency: {
      code: 'CAD',
      name: 'Canadian Dollar',
      symbol: 'C$',
      exchangeRate: 1.36,
      decimals: 2,
      position: 'prefix',
    },
    states: [
      {
        id: 'ontario',
        name: 'Ontario',
        districts: [
          {
            id: 'greater-toronto',
            name: 'Greater Toronto Area',
            cities: [
              {
                id: 'downtown-toronto',
                name: 'Downtown Toronto',
                isSmallCity: false,
                theaters: [
                  {
                    id: 'th-scotiabank-toronto',
                    name: 'Scotiabank Theatre Toronto IMAX',
                    location: 'Richmond St West',
                    fullAddress: '259 Richmond St W, Toronto, ON M5V 3M6',
                    distance: '0.5 km from Osgoode Station',
                    contactPhone: '+1 416 368 5600',
                    amenities: ['Giant IMAX Laser', 'UltraAVX with D-BOX', 'VIP Lounge', 'Escalator Skyway'],
                    showtimes: createShowtimes(14.5, { m: 75, a: 39, e: 12, n: 58 }),
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // 8. FRANCE
  {
    id: 'fr',
    name: 'France',
    flag: '🇫🇷',
    code: 'FR',
    currency: {
      code: 'EUR',
      name: 'Euro',
      symbol: '€',
      exchangeRate: 0.92,
      decimals: 2,
      position: 'prefix',
    },
    states: [
      {
        id: 'ile-de-france',
        name: 'Île-de-France',
        districts: [
          {
            id: 'paris-district',
            name: 'Paris',
            cities: [
              {
                id: 'paris-central',
                name: 'Paris Central',
                isSmallCity: false,
                theaters: [
                  {
                    id: 'th-pathe-wepler-paris',
                    name: 'Pathé Wepler & 4DX Paris',
                    location: 'Boulevard de Clichy',
                    fullAddress: '140 Bd de Clichy, 75018 Paris, France',
                    distance: '0.4 km from Place de Clichy',
                    contactPhone: '+33 1 40 07 43 00',
                    amenities: ['Salle Dolby Cinema', '4DX Motion Projection', 'Laser 4K Projection', 'Haute Patisserie Bar'],
                    showtimes: createShowtimes(15.0, { m: 72, a: 35, e: 8, n: 50 }),
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // 9. GERMANY
  {
    id: 'de',
    name: 'Germany',
    flag: '🇩🇪',
    code: 'DE',
    currency: {
      code: 'EUR',
      name: 'Euro',
      symbol: '€',
      exchangeRate: 0.92,
      decimals: 2,
      position: 'prefix',
    },
    states: [
      {
        id: 'berlin-state',
        name: 'Berlin',
        districts: [
          {
            id: 'berlin-mitte-district',
            name: 'Berlin Mitte',
            cities: [
              {
                id: 'berlin-mitte-city',
                name: 'Berlin Mitte',
                isSmallCity: false,
                theaters: [
                  {
                    id: 'th-zoo-palast-berlin',
                    name: 'Zoo Palast Berlin Dolby Atmos',
                    location: 'Hardenbergstraße, Charlottenburg',
                    fullAddress: 'Hardenbergstraße 29A, 10623 Berlin, Germany',
                    distance: '0.3 km from Zoologischer Garten',
                    contactPhone: '+44 30 57790 770',
                    amenities: ['Historic Grand Palast', 'Dolby Atmos Master Sound', 'Club Lounge Service', 'Light Curtains'],
                    showtimes: createShowtimes(14.5, { m: 76, a: 40, e: 10, n: 55 }),
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

// Helper: default starting location (Tamil Nadu -> Kanchipuram -> Kanchipuram Town)
export const DEFAULT_LOCATION_PATH: SelectedLocationPath = {
  countryId: 'in',
  stateId: 'tamil-nadu',
  districtId: 'kanchipuram',
  cityId: 'kanchipuram-town',
};

// Map real-life currently running movies to theaters according to region & theater indexing for Year 2026
export function getTheaterRunningMovieIds(
  theaterId: string, 
  countryId: string, 
  stateId?: string, 
  index = 0
): string[] {
  const tId = theaterId.toLowerCase();
  if (countryId === 'in') {
    if (stateId === 'tamil-nadu') {
      if (tId.includes('babu') || tId.includes('sathyam')) {
        return ['viswanath-and-sons', 'mandaadi', 'motharathri', 'coolie'];
      }
      if (tId.includes('vasanth') || tId.includes('vr-mall') || tId.includes('lathaa')) {
        return ['viswanath-and-sons', 'mandaadi', 'thalapathy-69', 'good-bad-ugly'];
      }
      if (tId.includes('tks') || tId.includes('venkatesh') || tId.includes('murugan')) {
        return ['viswanath-and-sons', 'motharathri', 'ramayana-part-1', 'mandaadi'];
      }
      // Alternate distribution for Tamil Nadu
      return index % 2 === 0
        ? ['viswanath-and-sons', 'mandaadi', 'motharathri', 'coolie']
        : ['viswanath-and-sons', 'mandaadi', 'thalapathy-69', 'good-bad-ugly'];
    }
    if (stateId === 'maharashtra' || stateId === 'delhi') {
      return index % 2 === 0
        ? ['ramayana-part-1', 'viswanath-and-sons', 'war-2', 'spirit']
        : ['ramayana-part-1', 'war-2', 'coolie', 'viswanath-and-sons'];
    }
    if (stateId === 'telangana' || stateId === 'andhra-pradesh') {
      return ['viswanath-and-sons', 'spirit', 'war-2', 'ramayana-part-1', 'coolie'];
    }
    if (stateId === 'karnataka' || stateId === 'kerala') {
      return ['viswanath-and-sons', 'mandaadi', 'toxic', 'coolie', 'thalapathy-69'];
    }
    return ['viswanath-and-sons', 'mandaadi', 'coolie', 'ramayana-part-1', 'war-2'];
  }
  // International theaters (US, UK, CA, AE, etc.)
  if (countryId === 'ae') {
    return ['viswanath-and-sons', 'mandaadi', 'coolie', 'thalapathy-69', 'war-2'];
  }
  if (countryId === 'jp') {
    return ['avengers-doomsday', 'coolie', 'viswanath-and-sons', 'ramayana-part-1'];
  }
  // North America & Europe
  return index % 2 === 0
    ? ['viswanath-and-sons', 'mandaadi', 'avengers-doomsday', 'coolie', 'thalapathy-69']
    : ['viswanath-and-sons', 'motharathri', 'ramayana-part-1', 'avengers-doomsday', 'good-bad-ugly'];
}

// Resolver helper
export function resolveLocationDetails(path: SelectedLocationPath) {
  const country = HIERARCHY_COUNTRIES.find((c) => c.id === path.countryId) || HIERARCHY_COUNTRIES[0];
  const state = country.states.find((s) => s.id === path.stateId) || country.states[0];
  const district = state.districts.find((d) => d.id === path.districtId) || state.districts[0];
  const city = district.cities.find((ct) => ct.id === path.cityId) || district.cities[0];

  // Ensure each theater has authentic real-life running movie IDs populated
  const populatedTheaters: Theater[] = city.theaters.map((theater, idx) => {
    const runningMovieIds = (theater.runningMovieIds && theater.runningMovieIds.length > 0)
      ? theater.runningMovieIds
      : getTheaterRunningMovieIds(theater.id, country.id, state.id, idx);

    // Also enrich showtimes with the running movie ID
    const enrichedShowtimes = theater.showtimes.map((st, sIdx) => ({
      ...st,
      movieId: runningMovieIds[sIdx % runningMovieIds.length],
    }));

    return {
      ...theater,
      runningMovieIds,
      showtimes: enrichedShowtimes,
    };
  });

  const resolvedCity: HierarchyCity = {
    ...city,
    theaters: populatedTheaters,
  };

  return {
    country,
    state,
    district,
    city: resolvedCity,
    theaters: populatedTheaters,
  };
}

// Convert resolved HierarchyCity into the application's City model for legacy compatibility
export function convertHierarchyToCity(
  location: {
    country: HierarchyCountry;
    city: HierarchyCity;
    state: HierarchyState;
    district: HierarchyDistrict;
  } | HierarchyCountry,
  cityParam?: HierarchyCity,
  stateParam?: HierarchyState,
  districtParam?: HierarchyDistrict
): City {
  if ('country' in location && 'city' in location) {
    const { country, city, state, district } = location;
    const regionMap: Record<string, 'North America' | 'Europe' | 'Asia & Middle East' | 'Oceania'> = {
      in: 'Asia & Middle East',
      ae: 'Asia & Middle East',
      jp: 'Asia & Middle East',
      uk: 'Europe',
      fr: 'Europe',
      de: 'Europe',
      us: 'North America',
      ca: 'North America',
      au: 'Oceania',
    };

    const populatedTheaters: Theater[] = city.theaters.map((theater, idx) => {
      const runningMovieIds = (theater.runningMovieIds && theater.runningMovieIds.length > 0)
        ? theater.runningMovieIds
        : getTheaterRunningMovieIds(theater.id, country.id, state.id, idx);

      const enrichedShowtimes = theater.showtimes.map((st, sIdx) => ({
        ...st,
        movieId: runningMovieIds[sIdx % runningMovieIds.length],
      }));

      return {
        ...theater,
        runningMovieIds,
        showtimes: enrichedShowtimes,
      };
    });

    return {
      id: city.id,
      name: `${city.name} (${district.name})`,
      country: `${state.name}, ${country.name}`,
      region: regionMap[country.id] || 'Asia & Middle East',
      currency: country.currency,
      theaters: populatedTheaters,
    };
  }
  const country = location as HierarchyCountry;
  const city = cityParam!;
  const state = stateParam!;
  const district = districtParam!;

  const populatedTheaters: Theater[] = city.theaters.map((theater, idx) => {
    const runningMovieIds = (theater.runningMovieIds && theater.runningMovieIds.length > 0)
      ? theater.runningMovieIds
      : getTheaterRunningMovieIds(theater.id, country.id, state.id, idx);

    return {
      ...theater,
      runningMovieIds,
    };
  });

  return {
    id: city.id,
    name: `${city.name} (${district.name})`,
    country: `${state.name}, ${country.name}`,
    region: 'Asia & Middle East',
    currency: country.currency,
    theaters: populatedTheaters,
  };
}
