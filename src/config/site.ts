export const siteConfig = {
  name: 'Mhd Khair Khdroo',
  role: 'Flutter Developer',
  tagline:
    'Detail-oriented Flutter Developer with professional agency experience, building responsive, scalable mobile applications.',
  email: 'mkk11business@gmail.com',
  phone: '+963 981310044',
  location: 'Mazzeh, Damascus, Syria',
  resumeUrl: '/Mhd_Khair_Khdroo_CV_2026-08.pdf',
  socials: {
    github: 'https://github.com/',
    linkedin: 'https://linkedin.com/',
    twitter: 'https://twitter.com/',
  },
};

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
] as const;

export const heroStats = [
  { value: '4+', label: 'Apps shipped' },
  { value: '4', label: 'Featured projects' },
  { value: '2+', label: 'Years of experience' },
] as const;

export const summary =
  'Detail-oriented Flutter Developer with professional agency experience and a solid track record of building responsive, scalable mobile applications. Proficient in Dart, modern state management (BLoC/Cubit, Riverpod), and backend integrations (Firebase, Supabase, Socket.io, RESTful APIs). Adept at working across the full development lifecycle — from foundational architecture to real-time communication networks and secure payment integrations.';

export const experience = [
  {
    role: 'Flutter Developer',
    company: 'Ultrawares',
    location: 'Damascus, Syria',
    period: '02/2026 – Present',
    highlights: [
      'Develop and maintain 4 mobile apps using Flutter and Dart.',
      'Use Riverpod and BLoC for scalable, predictable architecture.',
      'Implement low-latency communication with Socket.io for real-time updates.',
      'Collaborate with cross-functional teams to optimize performance and enhance user features.',
    ],
  },
];

export const projects = [
  {
    name: 'Mashena',
    subtitle: 'Graduation Project — Driver Application',
    icon: 'car' as const,
    period: '03/2026 – 09/2026',
    description:
      'A dedicated mobile application designed for drivers to streamline routing, trip management, and real-time updates.',
    highlights: [
      'Architected a responsive UI tailored for on-the-road usability.',
      'Integrated Socket.io to establish persistent, real-time connections for instantaneous driver updates and active tracking.',
      'Leveraged Bloc for efficient, lightweight global state management and dependency injection.',
    ],
    tags: ['Flutter', 'Bloc', 'Socket.io'],
  },
  {
    name: 'Mwaeed',
    subtitle: 'Service Booking Platform',
    icon: 'calendar' as const,
    period: '03/2025 – 09/2025',
    description:
      'A full-featured mobile platform allowing clients to discover local service providers, book appointments, and process secure payments seamlessly.',
    highlights: [
      'Architected a responsive, user-friendly client application with native support for Arabic language and RTL layouts.',
      'Built a complete authentication pipeline covering signup/login, phone/email verification, and password reset flows.',
      'Engineered intuitive discovery tools to let users seamlessly browse categories, filter providers, and schedule services.',
      'Integrated Stripe for secure payment processing and Firebase for real-time booking confirmation and update notifications.',
      'Leveraged BLoC (Cubit) state management to ensure a clean, maintainable, and scalable architecture.',
    ],
    tags: ['Flutter', 'BLoC', 'Stripe', 'Firebase'],
  },
  {
    name: 'Course Craft',
    subtitle: 'Learning Management System (LMS)',
    icon: 'school' as const,
    period: '03/2024 – 06/2024',
    description:
      'An educational mobile platform enabling teachers to author courses and quizzes while allowing students to enroll, complete assessments, and collaborate.',
    highlights: [
      'Designed and built an intuitive course creation module for educators to effortlessly upload and manage educational content.',
      'Integrated BLoC state management to handle complex application states, including user authentication and dynamic course enrollment flows.',
      'Implemented a real-time messaging system using Firebase to facilitate direct communication between students and instructors.',
    ],
    tags: ['Flutter', 'BLoC', 'Firebase'],
  },
  {
    name: 'Swift',
    subtitle: 'Merchant & Client App',
    icon: 'shopping' as const,
    period: '05/2025 – 09/2025',
    description:
      'A dual-sided e-commerce marketplace empowering merchants to manage inventory while providing customers with a seamless shopping experience.',
    highlights: [
      'Built full cart management, search functionality, and order processing workflows utilizing Supabase.',
      'Designed the application with a scalable clean architecture supporting full localization (English/Arabic).',
    ],
    tags: ['Flutter', 'Supabase', 'Clean Architecture'],
  },
];

export const education = [
  {
    degree: 'Information Technology Engineering',
    school: 'Damascus University',
  },
];

export const coreStack = ['Flutter', 'Dart', 'BLoC / Cubit', 'Firebase'] as const;

export const skills = {
  technical: [
    'Flutter',
    'Dart',
    'Riverpod',
    'BLoC Architecture (Cubit)',
    'Socket.io',
    'API Integration',
    'Firebase',
    'Supabase',
    'MVVM Pattern',
    'Clean Architecture',
    'Git',
  ],
  soft: [
    'Problem-solving',
    'Teamwork & Collaboration',
    'Effective Communication',
    'Time Management',
    'Adaptability',
  ],
};

export const languages = [
  { name: 'Arabic', level: 'Native' },
  { name: 'English', level: 'Intermediate' },
];
