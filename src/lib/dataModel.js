// Field sources mapping - indicates where each field gets its data
export const FIELD_SOURCES = {
  school: {
    name: "scraped",
    country: "scraped",
    type: "scraped",
    coreFacultyFTE: "scraped",
    mission: "scraped",
    vision: "scraped",
    values: "scraped",
    competitors: "scraped",
    impactZone: "scraped",
    website: "scraped",
    dean: "scraped",
    established: "scraped",
    students: "scraped",
    city: "scraped"
  },
  p1: {
    methodology: "manual",
    fundingSources: "manual",
    budgetProcess: "manual",
    totalBudget: "manual",
    budgetZonePct: "manual",
    foundationBudget: "manual",
    jeBudget: "manual",
    assocBudget: "manual",
    alumniBudget: "manual",
    adhocBudget: "manual",
    budgetMethod: "manual",
    studentExp: "manual",
    intervieweeExp: "manual",
    confExp: "manual",
    execEdExp: "manual",
    visitProfExp: "manual",
    familyExp: "manual",
    expMethod: "manual"
  },
  p2: {
    totalStudents: "scraped",
    graduatesAnnual: "scraped",
    alumniActive: "scraped",
    alumniEngagement: "scraped",
    execEdTarget: "scraped",
    execEdContent: "scraped",
    internationalStudents: "scraped",
    exchangePartners: "scraped",
    programmes: "scraped",
    placementRate: "scraped",
    teachingInnovation: "scraped",
    studRegion: "manual",
    studNational: "manual",
    studIntlDegree: "manual",
    studIntlExch: "manual",
    gradsTotal: "manual",
    gradsRegion: "manual",
    gradsNational: "manual",
    gradsIntl: "manual",
    alumniRegion: "scraped",
    alumniIntl: "scraped",
    alumniSenior: "scraped"
  },
  p3: {
    incubators: "scraped",
    entrepreneurship: "scraped",
    industryPartners: "scraped",
    consulting: "scraped",
    internships: "cv",
    missions: "cv",
    profConsulting: "cv",
    startupStudents: "manual",
    startupProfs: "cv"
  },
  p4: {
    journalArticles: "scraped",
    researchMethodology: "scraped",
    expertiseAreas: "scraped",
    phdStudents: "scraped",
    researchGroups: "scraped",
    publications: "scraped",
    externalFunding: "scraped",
    openScience: "scraped",
    phdDefences: "cv",
    profArticles: "cv",
    books: "cv",
    coBooks: "cv",
    chapters: "cv",
    confPapers: "cv",
    cases: "cv",
    confsOrg: "cv"
  },
  p5: {
    networkMemberships: "scraped",
    regionalEngagement: "scraped",
    internationalStrategy: "scraped",
    acadPartners: "cv",
    profPartners: "cv",
    govtPartners: "cv",
    civicRoles: "cv"
  },
  p6: {
    sdgAlignment: "scraped",
    socialImpact: "scraped",
    sustainability: "scraped",
    communityService: "scraped",
    ethics: "scraped",
    femaleFaculty: "derived",
    femaleAdmin: "derived",
    femaleStudents: "derived",
    intlFaculty: "derived",
    intlAdmin: "derived",
    intlStudents: "derived",
    csrCourses: "scraped",
    csrProjects: "scraped"
  },
  p7: {
    brandStrength: "scraped",
    rankings: "scraped",
    mediaPresence: "scraped",
    stakeholderPerception: "scraped",
    awards: "cv",
    regCitations: "scraped",
    regFeatures: "scraped",
    natCitations: "scraped",
    natFeatures: "scraped"
  }
};

// Default data structure with sample University of Vaasa data
export const DEFAULT_DATA = {
  school: {
    name: "University of Vaasa",
    country: "Finland",
    type: "Public",
    coreFacultyFTE: "650",
    mission: "The University of Vaasa is a multidisciplinary, research-oriented institution committed to responsible business education and innovation. Our mission is to advance knowledge through high-quality research that addresses global challenges while fostering sustainable economic development and societal well-being in the Nordic context.",
    vision: "To be a leading Nordic university recognized for impactful research and innovative business education that creates value for society, contributing to a more sustainable and equitable world by 2030.",
    values: "Academic excellence, Innovation, Sustainability, Internationalization, Community engagement, Ethical responsibility",
    competitors: "Hanken School of Economics, Turku School of Economics, Aalto University School of Business, Oulu Business School, LUT University School of Business",
    impactZone: "Energy, Digital Economy, Innovation Management, Finance, Public Management, International Business",
    website: "https://www.uwasa.fi",
    dean: "Prof. Adam Smale",
    established: "1968",
    students: "5200",
    city: "Vaasa"
  },
  p1: {
    methodology: "Budget allocation follows university-wide strategic priorities with emphasis on research investment and international partnerships. The School of Accounting and Finance, School of Management, and School of Marketing and Communication each manage operational budgets with central coordination for major initiatives.",
    fundingSources: "Finnish Ministry of Education and Culture core funding, Business Finland competitive grants, EU Horizon Europe, Nordic Council of Ministers, Vaasa Energy Business Innovation Centre (VEBIC), corporate partnerships",
    budgetProcess: "Annual planning cycle aligned with Finnish university funding model. Three-year rolling strategic plan with annual operational budgets set by School-level deans. Performance-based component tied to credits, degrees, publications, and external funding."
  },
  p2: {
    totalStudents: "6419",
    graduatesAnnual: "1260",
    alumniActive: "Active alumni network of 28,000+ managed through the University of Vaasa Alumni Association. Regional alumni chapters in Helsinki, Tampere, and Stockholm.",
    alumniEngagement: "Annual Homecoming event, mentorship programme (150 mentor pairs), alumni guest lectures (40+/year), career services collaboration, advisory board participation",
    execEdTarget: "Mid-career professionals and senior managers in the Energy, Finance, and Technology sectors across the Nordic-Baltic region",
    execEdContent: "Executive MBA, Open University courses, professional development in energy management, digital transformation leadership, sustainable business strategy, and data analytics for managers",
    internationalStudents: "18%",
    exchangePartners: "200+ partner universities worldwide",
    programmes: "Bachelor's: 5, Master's: 9 (4 in English), Doctoral: 3",
    placementRate: "92% employed within one year of graduation",
    teachingInnovation: "Blended learning, case-based pedagogy, industry co-created courses, Vaasa Energy Week integration"
  },
  p3: {
    incubators: ["InnoLab — Multidisciplinary innovation platform for co-creation between academia, industry, and public sector. Focus on energy transition, digital services, and smart cities.", "VEBIC — Vaasa Energy Business Innovation Centre. Research and development hub connecting university research with energy industry applications. State-of-the-art laboratories for combustion engine, energy storage, and grid technology research."],
    entrepreneurship: "West Coast Startup programme, Vaasa Entrepreneurship Society, annual business plan competitions, partnership with Muova Design Centre",
    industryPartners: "Wärtsilä, ABB, Danfoss, Vacon, Citec, Regional Council of Ostrobothnia",
    consulting: "Applied research projects and consultancy through InnoLab, VEBIC labs, and the Levón Institute for regional development"
  },
  p4: {
    journalArticles: "774",
    researchMethodology: "Strong quantitative and qualitative tradition across schools. Emphasis on empirical research with real-world data. Growing focus on interdisciplinary methods combining energy technology, business analytics, and social science approaches.",
    expertiseAreas: "Energy Economics & Policy, International Business, Finance & Accounting, Strategic Management, Digital Marketing, Public Management, Innovation Systems, Industrial Management",
    phdStudents: "180 active doctoral researchers",
    researchGroups: "15 recognized research groups and platforms",
    publications: "Average 450 peer-reviewed publications per year (Scopus-indexed)",
    externalFunding: "€12M annual external research funding",
    openScience: "Committed to Plan S and open access. University repository Osuva provides open access to research outputs."
  },
  p5: {
    networkMemberships: "AACSB member, EFMD member, PRME signatory, European University Association (EUA), UniPID (Finnish University Partnership for International Development)",
    regionalEngagement: "Key partner in Vaasa Energy Cluster (EnergyVaasa), the largest energy technology hub in the Nordics. Active collaboration with Ostrobothnia Regional Council and City of Vaasa.",
    internationalStrategy: "Strategic partnerships with universities in Germany, Sweden, Japan, South Korea, and China. Double degree programmes with University of Gothenburg, Hochschule Bremen, and Pusan National University."
  },
  p6: {
    sdgAlignment: "SDG 7 (Affordable & Clean Energy), SDG 8 (Decent Work), SDG 9 (Industry & Innovation), SDG 12 (Responsible Consumption), SDG 13 (Climate Action)",
    socialImpact: "Regional economic impact study shows university contributes €340M annually to the Ostrobothnia region. Largest employer of highly educated workforce in the region.",
    sustainability: "Carbon neutral campus by 2030 target. Green Office certification. Sustainability integrated into all degree programmes. Annual sustainability report published.",
    communityService: "Open University serving 3,500+ adult learners, Lifelong Learning Centre, public lecture series, Science Day events, regional language centre (trilingual: Finnish, Swedish, English)",
    ethics: "Research ethics board, responsible conduct of research training mandatory for all researchers, anti-plagiarism policy, GDPR compliance office"
  },
  p7: {
    brandStrength: "Recognized as Finland's #1 university for business studies graduate employment in the Vaasa region. Strong brand association with energy sector expertise.",
    rankings: "QS World University Rankings: Energy sector partner recognition. Times Higher Education: Impact Rankings participant. Finnish Education Evaluation Centre (KARVI): Excellent rating for quality systems.",
    mediaPresence: "Regular coverage in Kauppalehti (Finnish business daily), Vasabladet, YLE News. Faculty experts frequently quoted on energy policy, economic forecasting, and Nordic business topics.",
    stakeholderPerception: "Annual stakeholder survey shows 85% satisfaction rate among industry partners. Student satisfaction (National Student Survey): above national average in teaching quality and career services.",
    awards: "Multiple Academy of Finland Centre of Excellence participations. Best Paper awards at EURAM, AIB, and AOM conferences."
  }
};
