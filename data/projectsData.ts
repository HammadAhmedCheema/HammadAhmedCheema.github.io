interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Cyber Archive',
    description: `A centralized resource and use-case platform tailored specifically for Cyber Security students, highlighting essential tools and concepts.`,
    imgSrc: '/static/images/cyber-archive.png',
    href: 'https://cyberarchive.vercel.app/',
  },
  {
    title: 'CyberSafe',
    description: `A modern, community-driven cybersecurity awareness and incident reporting platform built with React 19, Tailwind CSS, Supabase (Auth/Database/Storage), and Google Gemini AI.`,
    imgSrc: '/static/images/cyber-awareness.png',
    href: 'https://github.com/HammadAhmedCheema/CyberSafe',
  },
  {
    title: 'CityMind',
    description: `An intelligent urban simulator leveraging Genetic Algorithms, Simulated Annealing, A* pathfinding, and K-Means/KNN machine learning to optimize traffic, layout planning, and emergency routing.`,
    imgSrc: '/static/images/citymind.png',
    href: 'https://github.com/HammadAhmedCheema/CityMind',
  },
  {
    title: 'AuraForensics (memnet)',
    description: `A zero-footprint memory forensics suite utilizing PyQt6, Volatility 3, and a transient SQL architecture, integrated with a Gemini-powered AI Analyst for real-time threat triage.`,
    imgSrc: '/static/images/auraforensics.png',
    href: 'https://github.com/HammadAhmedCheema/memnet',
  },
]

export default projectsData
