import type {
  Subject,
  SpreadEvent,
  SourceAccount,
  EventRelationship,
  SubjectTimeline,
  TimelineMilestone,
  SpreadPhase,
  SpreadPrediction,
  CauseEffectAnalysis,
  CauseNode,
  EffectNode,
  CausalChain,
  RawDataItem,
  SubjectAnalytics,
  TimeSeriesData,
  ViralMoment
} from '../types/InformationSpread';

// Mock Source Accounts
export const mockSourceAccounts: SourceAccount[] = [
  {
    id: 'acc1',
    platform: 'social_media',
    username: 'info_diffuseur',
    displayName: 'InfoDiffuseur RDC',
    profileUrl: 'https://twitter.com/info_diffuseur',
    profileImageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=info_diffuseur',
    verified: true,
    followerCount: 125000,
    credibilityScore: 0.85,
    botProbability: 0.15,
    accountCreatedAt: '2019-03-15T00:00:00Z',
    previousActivity: {
      subjects: ['elections2023', 'cobalt_mining', 'humanitarian_crisis'],
      narratives: ['transparency', 'economic_development', 'human_rights']
    }
  },
  {
    id: 'acc2',
    platform: 'news',
    username: 'radiookapi',
    displayName: 'Radio Okapi',
    profileUrl: 'https://radiookapi.net',
    profileImageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=radiookapi',
    verified: true,
    followerCount: 450000,
    credibilityScore: 0.95,
    botProbability: 0.02,
    accountCreatedAt: '2010-01-01T00:00:00Z'
  },
  {
    id: 'acc3',
    platform: 'social_media',
    username: 'congo_activist',
    displayName: 'Activiste Congo',
    profileUrl: 'https://facebook.com/congo_activist',
    profileImageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=congo_activist',
    verified: false,
    followerCount: 35000,
    credibilityScore: 0.65,
    botProbability: 0.25,
    accountCreatedAt: '2022-06-10T00:00:00Z'
  },
  {
    id: 'acc4',
    platform: 'messaging_app',
    username: 'whatsapp_group_23',
    displayName: 'Groupe WhatsApp Kinshasa Info',
    profileUrl: 'whatsapp://group/23',
    profileImageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=whatsapp_group_23',
    verified: false,
    followerCount: 256,
    credibilityScore: 0.45,
    botProbability: 0.10
  },
  {
    id: 'acc5',
    platform: 'forum',
    username: 'anonymous_leaker',
    displayName: 'Anonymous RDC',
    profileUrl: 'https://forum.example.com/u/anonymous_leaker',
    profileImageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anonymous_leaker',
    verified: false,
    followerCount: 8900,
    credibilityScore: 0.55,
    botProbability: 0.35
  },
  {
    id: 'acc6',
    platform: 'social_media',
    username: 'journaliste_kin',
    displayName: 'Journaliste Kinshasa',
    profileUrl: 'https://twitter.com/journaliste_kin',
    profileImageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=journaliste_kin',
    verified: true,
    followerCount: 78000,
    credibilityScore: 0.88,
    botProbability: 0.05,
    accountCreatedAt: '2018-07-22T00:00:00Z'
  },
  {
    id: 'acc7',
    platform: 'social_media',
    username: 'bot_suspect_123',
    displayName: 'Citoyen Congolais',
    profileUrl: 'https://twitter.com/bot_suspect_123',
    profileImageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bot_suspect_123',
    verified: false,
    followerCount: 1500,
    credibilityScore: 0.25,
    botProbability: 0.85,
    accountCreatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: 'acc8',
    platform: 'social_media',
    username: 'marie_lubumbashi',
    displayName: 'Marie Mwamba',
    profileUrl: 'https://facebook.com/marie_lubumbashi',
    profileImageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marie_lubumbashi',
    verified: false,
    followerCount: 12400,
    credibilityScore: 0.72,
    botProbability: 0.15,
    accountCreatedAt: '2020-11-03T00:00:00Z'
  },
  {
    id: 'acc9',
    platform: 'news',
    username: 'rfi_afrique',
    displayName: 'RFI Afrique',
    profileUrl: 'https://twitter.com/rfi_afrique',
    profileImageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rfi_afrique',
    verified: true,
    followerCount: 890000,
    credibilityScore: 0.92,
    botProbability: 0.01,
    accountCreatedAt: '2009-03-01T00:00:00Z'
  },
  {
    id: 'acc10',
    platform: 'social_media',
    username: 'influence_net_rdc',
    displayName: 'Réseau Influence RDC',
    profileUrl: 'https://twitter.com/influence_net_rdc',
    profileImageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=influence_net_rdc',
    verified: false,
    followerCount: 45000,
    credibilityScore: 0.40,
    botProbability: 0.70,
    accountCreatedAt: '2023-08-14T00:00:00Z'
  }
];

// Mock Subjects
export const mockSubjects: Subject[] = [
  {
    id: 'subj1',
    title: 'Rumeurs sur la hausse des prix du carburant',
    description: 'Des rumeurs circulent sur une augmentation imminente de 50% des prix du carburant, créant la panique dans plusieurs villes.',
    category: 'Économie',
    tags: ['carburant', 'inflation', 'rumeur', 'panique'],
    status: 'viral',
    sentiment: 'negative',
    createdAt: '2024-01-20T08:00:00Z',
    firstSeenAt: '2024-01-20T06:30:00Z',
    lastActivityAt: '2024-01-21T14:30:00Z',
    totalReach: 450000,
    spreadVelocity: 85.5,
    engagementRate: 0.23,
    thumbnailUrl: 'https://picsum.photos/400/300?random=1'
  },
  {
    id: 'subj2',
    title: 'Fausses allégations de fraude électorale',
    description: 'Propagation de fausses informations concernant des irrégularités dans le processus électoral.',
    category: 'Politique',
    tags: ['élections', 'désinformation', 'politique', 'fraude'],
    status: 'spreading',
    sentiment: 'negative',
    createdAt: '2024-01-19T10:00:00Z',
    firstSeenAt: '2024-01-19T09:00:00Z',
    lastActivityAt: '2024-01-21T12:00:00Z',
    totalReach: 280000,
    spreadVelocity: 62.3,
    engagementRate: 0.34
  },
  {
    id: 'subj3',
    title: 'Campagne positive sur la vaccination',
    description: 'Initiative de sensibilisation sur l\'importance de la vaccination contre la rougeole.',
    category: 'Santé',
    tags: ['vaccination', 'santé publique', 'sensibilisation', 'rougeole'],
    status: 'spreading',
    sentiment: 'positive',
    createdAt: '2024-01-18T14:00:00Z',
    firstSeenAt: '2024-01-18T13:00:00Z',
    lastActivityAt: '2024-01-21T10:00:00Z',
    totalReach: 180000,
    spreadVelocity: 45.2,
    engagementRate: 0.41
  },
  {
    id: 'subj4',
    title: 'Tensions ethniques exagérées',
    description: 'Amplification de tensions mineures entre communautés, créant un climat de méfiance.',
    category: 'Sécurité',
    tags: ['tensions', 'ethnique', 'désinformation', 'sécurité'],
    status: 'emerging',
    sentiment: 'negative',
    createdAt: '2024-01-21T06:00:00Z',
    firstSeenAt: '2024-01-21T05:30:00Z',
    lastActivityAt: '2024-01-21T15:00:00Z',
    totalReach: 45000,
    spreadVelocity: 72.1,
    engagementRate: 0.29
  },
  {
    id: 'subj5',
    title: 'Success story: Jeunes entrepreneurs congolais',
    description: 'Histoires inspirantes de jeunes entrepreneurs réussissant dans le secteur tech.',
    category: 'Économie',
    tags: ['entrepreneuriat', 'jeunesse', 'tech', 'inspiration'],
    status: 'spreading',
    sentiment: 'positive',
    createdAt: '2024-01-17T09:00:00Z',
    firstSeenAt: '2024-01-17T08:00:00Z',
    lastActivityAt: '2024-01-21T08:00:00Z',
    totalReach: 95000,
    spreadVelocity: 38.7,
    engagementRate: 0.52
  },
  {
    id: 'subj6',
    title: 'Controverse autour du projet minier Kamoa-Kakula',
    description: 'Débat intense sur l\'impact environnemental et les bénéfices économiques du projet minier.',
    category: 'Économie',
    tags: ['mines', 'environnement', 'économie', 'cuivre', 'Kamoa'],
    status: 'viral',
    sentiment: 'mixed',
    createdAt: '2024-01-16T12:00:00Z',
    firstSeenAt: '2024-01-16T11:30:00Z',
    lastActivityAt: '2024-01-21T16:30:00Z',
    totalReach: 680000,
    spreadVelocity: 92.3,
    engagementRate: 0.67,
    thumbnailUrl: 'https://picsum.photos/400/300?random=6'
  },
  {
    id: 'subj7',
    title: 'Théorie du complot: 5G et contrôle des populations',
    description: 'Diffusion de théories conspirationnistes sur la technologie 5G et ses prétendus effets.',
    category: 'Technologie',
    tags: ['5G', 'conspirations', 'santé', 'télécommunications'],
    status: 'spreading',
    sentiment: 'negative',
    createdAt: '2024-01-15T18:00:00Z',
    firstSeenAt: '2024-01-15T17:45:00Z',
    lastActivityAt: '2024-01-21T13:20:00Z',
    totalReach: 156000,
    spreadVelocity: 58.9,
    engagementRate: 0.43
  },
  {
    id: 'subj8',
    title: 'Campagne de sensibilisation anti-corruption',
    description: 'Initiative citoyenne pour promouvoir la transparence et lutter contre la corruption.',
    category: 'Politique',
    tags: ['corruption', 'transparence', 'citoyenneté', 'gouvernance'],
    status: 'spreading',
    sentiment: 'positive',
    createdAt: '2024-01-14T10:00:00Z',
    firstSeenAt: '2024-01-14T09:30:00Z',
    lastActivityAt: '2024-01-21T11:45:00Z',
    totalReach: 234000,
    spreadVelocity: 66.1,
    engagementRate: 0.58
  },
  {
    id: 'subj9',
    title: 'Rumeurs sur la fermeture d\'universités publiques',
    description: 'Fausses informations sur la fermeture imminente d\'universités publiques créant la panique.',
    category: 'Éducation',
    tags: ['universités', 'éducation', 'fermeture', 'étudiant'],
    status: 'declining',
    sentiment: 'negative',
    createdAt: '2024-01-12T14:00:00Z',
    firstSeenAt: '2024-01-12T13:45:00Z',
    lastActivityAt: '2024-01-20T09:15:00Z',
    totalReach: 89000,
    spreadVelocity: 25.4,
    engagementRate: 0.31
  },
  {
    id: 'subj10',
    title: 'Découverte archéologique majeure au Kasaï',
    description: 'Annonce d\'une découverte archéologique importante générant enthousiasme et fierté nationale.',
    category: 'Culture',
    tags: ['archéologie', 'Kasaï', 'découverte', 'patrimoine', 'histoire'],
    status: 'emerging',
    sentiment: 'positive',
    createdAt: '2024-01-21T08:00:00Z',
    firstSeenAt: '2024-01-21T07:30:00Z',
    lastActivityAt: '2024-01-21T17:00:00Z',
    totalReach: 67000,
    spreadVelocity: 78.2,
    engagementRate: 0.72
  }
];

// Mock Spread Events
export const mockSpreadEvents: SpreadEvent[] = [
  // Events for Subject 1 (Fuel price rumors)
  {
    id: 'evt1',
    subjectId: 'subj1',
    timestamp: '2024-01-20T06:30:00Z',
    source: mockSourceAccounts[4], // anonymous_leaker
    content: '🚨 URGENT: Le gouvernement prépare une augmentation de 50% du prix du carburant dès lundi prochain! Partagez massivement!',
    type: 'origin',
    reach: 2500,
    engagement: { likes: 450, shares: 890, comments: 234 },
    sentiment: 'negative',
    location: { country: 'RDC', city: 'Kinshasa' }
  },
  {
    id: 'evt2',
    subjectId: 'subj1',
    timestamp: '2024-01-20T08:15:00Z',
    source: mockSourceAccounts[2], // congo_activist
    content: 'Les prix du carburant vont exploser! Il faut se mobiliser contre cette décision injuste! #NonALaugmentation',
    type: 'amplification',
    reach: 35000,
    engagement: { likes: 4500, shares: 2300, comments: 890 },
    sentiment: 'negative',
    location: { country: 'RDC', city: 'Kinshasa' }
  },
  {
    id: 'evt3',
    subjectId: 'subj1',
    timestamp: '2024-01-20T10:00:00Z',
    source: mockSourceAccounts[0], // info_diffuseur
    content: 'Des sources confirment les rumeurs sur l\'augmentation du carburant. Les stations-service déjà prises d\'assaut.',
    type: 'amplification',
    reach: 125000,
    engagement: { likes: 15000, shares: 8900, comments: 3400 },
    sentiment: 'negative',
    location: { country: 'RDC', region: 'Kinshasa' }
  },
  {
    id: 'evt4',
    subjectId: 'subj1',
    timestamp: '2024-01-20T14:30:00Z',
    source: mockSourceAccounts[1], // radiookapi
    content: 'DÉMENTI OFFICIEL: Le ministère de l\'Économie dément formellement toute augmentation prévue des prix du carburant.',
    type: 'debunk',
    reach: 200000,
    engagement: { likes: 8000, shares: 12000, comments: 2100 },
    sentiment: 'neutral',
    location: { country: 'RDC' }
  },
  // Events for Subject 2 (Electoral fraud)
  {
    id: 'evt5',
    subjectId: 'subj2',
    timestamp: '2024-01-19T09:00:00Z',
    source: mockSourceAccounts[3], // whatsapp_group
    content: 'Photo exclusive: Des bulletins pré-remplis découverts dans un bureau de vote! La preuve de la fraude!',
    type: 'origin',
    reach: 256,
    engagement: { likes: 0, shares: 189, comments: 0 },
    sentiment: 'negative',
    location: { country: 'RDC', city: 'Lubumbashi' }
  },
  {
    id: 'evt6',
    subjectId: 'subj2',
    timestamp: '2024-01-19T11:30:00Z',
    source: mockSourceAccounts[2], // congo_activist
    content: 'SCANDALE: Des preuves de fraude électorale massive circulent. Le peuple ne se laissera pas faire!',
    type: 'amplification',
    reach: 35000,
    engagement: { likes: 6700, shares: 4500, comments: 1200 },
    sentiment: 'negative'
  },
  // Events for Subject 3 (Vaccination campaign)
  {
    id: 'evt7',
    subjectId: 'subj3',
    timestamp: '2024-01-18T13:00:00Z',
    source: mockSourceAccounts[1], // radiookapi
    content: 'Lancement de la campagne nationale de vaccination contre la rougeole. Protégeons nos enfants!',
    type: 'origin',
    reach: 180000,
    engagement: { likes: 12000, shares: 5600, comments: 890 },
    sentiment: 'positive',
    location: { country: 'RDC' }
  },
  {
    id: 'evt8',
    subjectId: 'subj3',
    timestamp: '2024-01-18T15:30:00Z',
    source: mockSourceAccounts[5], // journaliste_kin
    content: 'Excellente initiative du ministère de la santé. La vaccination est cruciale pour nos enfants. #VaccinationRDC',
    type: 'amplification',
    reach: 78000,
    engagement: { likes: 8900, shares: 3400, comments: 567 },
    sentiment: 'positive',
    location: { country: 'RDC', city: 'Kinshasa' }
  },
  // Events for Subject 6 (Mining controversy)
  {
    id: 'evt9',
    subjectId: 'subj6',
    timestamp: '2024-01-16T11:30:00Z',
    source: mockSourceAccounts[2], // congo_activist
    content: 'Le projet Kamoa-Kakula détruit notre environnement! Les communautés locales ne voient aucun bénéfice!',
    type: 'origin',
    reach: 35000,
    engagement: { likes: 4500, shares: 6700, comments: 1200 },
    sentiment: 'negative',
    location: { country: 'RDC', region: 'Lualaba' }
  },
  {
    id: 'evt10',
    subjectId: 'subj6',
    timestamp: '2024-01-16T14:00:00Z',
    source: mockSourceAccounts[0], // info_diffuseur
    content: 'Kamoa-Kakula génère des milliers d\'emplois et apporte des devises. Il faut équilibrer développement et environnement.',
    type: 'contradicts',
    reach: 125000,
    engagement: { likes: 15600, shares: 8900, comments: 2340 },
    sentiment: 'mixed',
    location: { country: 'RDC' }
  },
  {
    id: 'evt11',
    subjectId: 'subj6',
    timestamp: '2024-01-16T18:45:00Z',
    source: mockSourceAccounts[8], // rfi_afrique
    content: 'ANALYSE: Le projet minier Kamoa-Kakula entre développement économique et préoccupations environnementales',
    type: 'fact_check',
    reach: 890000,
    engagement: { likes: 45000, shares: 23000, comments: 8900 },
    sentiment: 'neutral',
    location: { country: 'France' }
  },
  {
    id: 'evt12',
    subjectId: 'subj6',
    timestamp: '2024-01-17T09:15:00Z',
    source: mockSourceAccounts[9], // influence_net_rdc
    content: 'Les mines de cuivre sont l\'avenir de la RDC! Ne laissons pas les écolos détruire notre économie! #DéveloppementRDC',
    type: 'amplification',
    reach: 45000,
    engagement: { likes: 3200, shares: 8900, comments: 456 },
    sentiment: 'positive',
    location: { country: 'RDC' }
  },
  // Events for Subject 7 (5G conspiracy)
  {
    id: 'evt13',
    subjectId: 'subj7',
    timestamp: '2024-01-15T17:45:00Z',
    source: mockSourceAccounts[6], // bot_suspect_123
    content: 'ATTENTION! La 5G va contrôler vos pensées! Les antennes émettent des ondes dangereuses! Réveillez-vous!',
    type: 'origin',
    reach: 1500,
    engagement: { likes: 234, shares: 456, comments: 89 },
    sentiment: 'negative',
    location: { country: 'RDC', city: 'Kinshasa' }
  },
  {
    id: 'evt14',
    subjectId: 'subj7',
    timestamp: '2024-01-15T20:30:00Z',
    source: mockSourceAccounts[3], // whatsapp_group
    content: 'Une amie médecin m\'a dit que la 5G cause le cancer. On doit arrêter ça avant qu\'il soit trop tard!',
    type: 'amplification',
    reach: 256,
    engagement: { likes: 0, shares: 189, comments: 0 },
    sentiment: 'negative',
    location: { country: 'RDC', city: 'Kinshasa' }
  },
  {
    id: 'evt15',
    subjectId: 'subj7',
    timestamp: '2024-01-16T08:00:00Z',
    source: mockSourceAccounts[5], // journaliste_kin
    content: 'FACT-CHECK: Aucune preuve scientifique ne lie la 5G au contrôle mental. Les ondes sont régulées et sûres.',
    type: 'debunk',
    reach: 78000,
    engagement: { likes: 12000, shares: 4500, comments: 890 },
    sentiment: 'neutral',
    location: { country: 'RDC', city: 'Kinshasa' }
  },
  // Events for Subject 8 (Anti-corruption campaign)
  {
    id: 'evt16',
    subjectId: 'subj8',
    timestamp: '2024-01-14T09:30:00Z',
    source: mockSourceAccounts[7], // marie_lubumbashi
    content: 'Lançons ensemble la campagne #TransparenceRDC! Chaque citoyen peut faire la différence contre la corruption.',
    type: 'origin',
    reach: 12400,
    engagement: { likes: 2300, shares: 4500, comments: 678 },
    sentiment: 'positive',
    location: { country: 'RDC', city: 'Lubumbashi' }
  },
  {
    id: 'evt17',
    subjectId: 'subj8',
    timestamp: '2024-01-14T12:15:00Z',
    source: mockSourceAccounts[0], // info_diffuseur
    content: 'Bravo à cette initiative citoyenne! La transparence est la base d\'une démocratie forte. #TransparenceRDC',
    type: 'supports',
    reach: 125000,
    engagement: { likes: 18000, shares: 12000, comments: 3400 },
    sentiment: 'positive',
    location: { country: 'RDC' }
  },
  {
    id: 'evt18',
    subjectId: 'subj8',
    timestamp: '2024-01-14T16:45:00Z',
    source: mockSourceAccounts[1], // radiookapi
    content: 'La société civile lance une campagne de sensibilisation contre la corruption - Un élan citoyen prometteur',
    type: 'amplification',
    reach: 450000,
    engagement: { likes: 23000, shares: 15600, comments: 5600 },
    sentiment: 'positive',
    location: { country: 'RDC' }
  },
  // Events for Subject 10 (Archaeological discovery)
  {
    id: 'evt19',
    subjectId: 'subj10',
    timestamp: '2024-01-21T07:30:00Z',
    source: mockSourceAccounts[1], // radiookapi
    content: 'EXCLUSIF: Découverte d\'artefacts vieux de 1000 ans au Kasaï - Une fenêtre sur notre riche passé',
    type: 'origin',
    reach: 450000,
    engagement: { likes: 34000, shares: 18000, comments: 6700 },
    sentiment: 'positive',
    location: { country: 'RDC' }
  },
  {
    id: 'evt20',
    subjectId: 'subj10',
    timestamp: '2024-01-21T10:15:00Z',
    source: mockSourceAccounts[5], // journaliste_kin
    content: 'Quelle fierté! Cette découverte montre la richesse de notre patrimoine culturel. #PatrimoineRDC #Kasaï',
    type: 'amplification',
    reach: 78000,
    engagement: { likes: 12000, shares: 8900, comments: 2100 },
    sentiment: 'positive',
    location: { country: 'RDC', city: 'Kinshasa' }
  },
  {
    id: 'evt21',
    subjectId: 'subj10',
    timestamp: '2024-01-21T14:30:00Z',
    source: mockSourceAccounts[8], // rfi_afrique
    content: 'RDC: Une découverte archéologique majeure révèle l\'ancienneté des civilisations congolaises',
    type: 'amplification',
    reach: 890000,
    engagement: { likes: 56000, shares: 34000, comments: 12000 },
    sentiment: 'positive',
    location: { country: 'France' }
  }
];

// Mock Event Relationships
export const mockEventRelationships: EventRelationship[] = [
  // Fuel price rumors chain
  {
    id: 'rel1',
    fromEventId: 'evt1',
    toEventId: 'evt2',
    type: 'amplifies',
    strength: 0.9,
    confidence: 0.95,
    evidence: ['Same narrative', 'Sequential timing', 'Content similarity']
  },
  {
    id: 'rel2',
    fromEventId: 'evt2',
    toEventId: 'evt3',
    type: 'influences',
    strength: 0.85,
    confidence: 0.88
  },
  {
    id: 'rel3',
    fromEventId: 'evt3',
    toEventId: 'evt4',
    type: 'causes',
    strength: 0.95,
    confidence: 0.92,
    evidence: ['Official response triggered by viral spread']
  },
  // Electoral fraud chain
  {
    id: 'rel4',
    fromEventId: 'evt5',
    toEventId: 'evt6',
    type: 'amplifies',
    strength: 0.88,
    confidence: 0.90
  },
  // Vaccination campaign
  {
    id: 'rel5',
    fromEventId: 'evt7',
    toEventId: 'evt8',
    type: 'supports',
    strength: 0.92,
    confidence: 0.95,
    evidence: ['Positive reinforcement', 'Same topic', 'Supporting narrative']
  },
  // Mining controversy
  {
    id: 'rel6',
    fromEventId: 'evt9',
    toEventId: 'evt10',
    type: 'contradicts',
    strength: 0.85,
    confidence: 0.90,
    evidence: ['Opposing viewpoints', 'Same subject', 'Direct contradiction']
  },
  {
    id: 'rel7',
    fromEventId: 'evt10',
    toEventId: 'evt11',
    type: 'influences',
    strength: 0.75,
    confidence: 0.88,
    evidence: ['Media coverage influenced by debate']
  },
  {
    id: 'rel8',
    fromEventId: 'evt11',
    toEventId: 'evt12',
    type: 'causes',
    strength: 0.70,
    confidence: 0.82,
    evidence: ['Reaction to factual analysis']
  },
  // 5G conspiracy
  {
    id: 'rel9',
    fromEventId: 'evt13',
    toEventId: 'evt14',
    type: 'amplifies',
    strength: 0.95,
    confidence: 0.92,
    evidence: ['Same conspiracy theory', 'WhatsApp amplification']
  },
  {
    id: 'rel10',
    fromEventId: 'evt14',
    toEventId: 'evt15',
    type: 'causes',
    strength: 0.88,
    confidence: 0.90,
    evidence: ['Fact-check response to misinformation']
  },
  // Anti-corruption campaign
  {
    id: 'rel11',
    fromEventId: 'evt16',
    toEventId: 'evt17',
    type: 'supports',
    strength: 0.93,
    confidence: 0.95,
    evidence: ['Support for citizen initiative']
  },
  {
    id: 'rel12',
    fromEventId: 'evt17',
    toEventId: 'evt18',
    type: 'amplifies',
    strength: 0.90,
    confidence: 0.93,
    evidence: ['Media amplification of campaign']
  },
  // Archaeological discovery
  {
    id: 'rel13',
    fromEventId: 'evt19',
    toEventId: 'evt20',
    type: 'amplifies',
    strength: 0.85,
    confidence: 0.88,
    evidence: ['Social media amplification of news']
  },
  {
    id: 'rel14',
    fromEventId: 'evt19',
    toEventId: 'evt21',
    type: 'influences',
    strength: 0.80,
    confidence: 0.85,
    evidence: ['International media coverage']
  },
  // Cross-subject relationships
  {
    id: 'rel15',
    fromEventId: 'evt4',
    toEventId: 'evt15',
    type: 'influences',
    strength: 0.60,
    confidence: 0.70,
    evidence: ['Both are fact-checking efforts']
  }
];

// Mock Timeline Milestones
export const mockTimelineMilestones: TimelineMilestone[] = [
  {
    id: 'ms1',
    timestamp: '2024-01-20T06:30:00Z',
    title: 'Origine de la rumeur',
    description: 'Première apparition de la rumeur sur les prix du carburant',
    significance: 'major',
    eventIds: ['evt1']
  },
  {
    id: 'ms2',
    timestamp: '2024-01-20T10:00:00Z',
    title: 'Viralité atteinte',
    description: 'La rumeur devient virale avec plus de 100k personnes atteintes',
    significance: 'critical',
    eventIds: ['evt3']
  },
  {
    id: 'ms3',
    timestamp: '2024-01-20T14:30:00Z',
    title: 'Démenti officiel',
    description: 'Le gouvernement publie un démenti officiel',
    significance: 'critical',
    eventIds: ['evt4']
  }
];

// Mock Spread Phases
export const mockSpreadPhases: SpreadPhase[] = [
  {
    id: 'phase1',
    name: 'Émergence',
    startTime: '2024-01-20T06:30:00Z',
    endTime: '2024-01-20T08:00:00Z',
    characteristics: {
      velocity: 25.5,
      sentiment: 'negative',
      dominantPlatforms: ['forum', 'messaging_app'],
      keyNarratives: ['Augmentation imminente', 'Source gouvernementale']
    }
  },
  {
    id: 'phase2',
    name: 'Amplification',
    startTime: '2024-01-20T08:00:00Z',
    endTime: '2024-01-20T12:00:00Z',
    characteristics: {
      velocity: 85.5,
      sentiment: 'negative',
      dominantPlatforms: ['social_media'],
      keyNarratives: ['Panique', 'Mobilisation', 'Pénurie']
    }
  },
  {
    id: 'phase3',
    name: 'Contre-narrative',
    startTime: '2024-01-20T12:00:00Z',
    characteristics: {
      velocity: 45.2,
      sentiment: 'mixed',
      dominantPlatforms: ['news', 'social_media'],
      keyNarratives: ['Démenti', 'Fact-checking', 'Apaisement']
    }
  }
];

// Mock Predictions
export const mockPredictions: SpreadPrediction[] = [
  {
    id: 'pred1',
    subjectId: 'subj1',
    createdAt: '2024-01-21T15:00:00Z',
    timeHorizon: '24h',
    predictions: {
      reachEstimate: {
        min: 500000,
        max: 600000,
        expected: 550000
      },
      sentimentShift: {
        direction: 'improving',
        magnitude: 0.3
      },
      viralProbability: 0.25,
      declineTime: '2024-01-22T18:00:00Z'
    },
    confidence: 'high',
    factors: [
      'Démenti officiel publié',
      'Médias traditionnels ont clarifié',
      'Pas de hausse réelle observée'
    ],
    recommendations: [
      'Continuer la communication officielle',
      'Surveiller les nouveaux foyers de désinformation',
      'Engager les influenceurs pour diffuser la vérité'
    ]
  },
  {
    id: 'pred2',
    subjectId: 'subj2',
    createdAt: '2024-01-21T15:00:00Z',
    timeHorizon: '7d',
    predictions: {
      reachEstimate: {
        min: 400000,
        max: 800000,
        expected: 600000
      },
      sentimentShift: {
        direction: 'worsening',
        magnitude: 0.2
      },
      viralProbability: 0.65,
      peakTime: '2024-01-23T12:00:00Z'
    },
    confidence: 'medium',
    factors: [
      'Période électorale sensible',
      'Absence de réponse coordonnée',
      'Multiples sources d\'amplification'
    ]
  }
];

// Mock Cause-Effect Analysis
export const mockCauseEffectAnalysis: CauseEffectAnalysis = {
  subjectId: 'subj1',
  rootCauses: [
    {
      id: 'cause1',
      type: 'external_factor',
      description: 'Instabilité économique et inflation récente',
      confidence: 0.85,
      evidence: [
        'Inflation de 15% au cours des 6 derniers mois',
        'Plusieurs augmentations de prix récentes'
      ]
    },
    {
      id: 'cause2',
      type: 'actor',
      description: 'Acteurs malveillants cherchant à déstabiliser',
      timestamp: '2024-01-20T06:00:00Z',
      confidence: 0.70,
      evidence: [
        'Compte anonyme créé récemment',
        'Pattern de désinformation similaire observé précédemment'
      ]
    }
  ],
  effects: [
    {
      id: 'effect1',
      type: 'behavioral',
      description: 'Ruée vers les stations-service',
      measuredImpact: {
        metric: 'Files d\'attente',
        value: 500,
        change: 400
      },
      affectedGroups: ['Automobilistes', 'Transporteurs']
    },
    {
      id: 'effect2',
      type: 'economic',
      description: 'Perturbation temporaire du marché',
      measuredImpact: {
        metric: 'Ventes de carburant',
        value: 150,
        change: 50
      }
    },
    {
      id: 'effect3',
      type: 'sentiment',
      description: 'Méfiance accrue envers les autorités',
      affectedGroups: ['Population générale']
    }
  ],
  chains: [
    {
      id: 'chain1',
      causes: ['cause1', 'cause2'],
      effects: ['effect1', 'effect2'],
      strength: 0.88,
      timeDelay: 2
    },
    {
      id: 'chain2',
      causes: ['cause2'],
      effects: ['effect3'],
      strength: 0.75,
      timeDelay: 24
    }
  ]
};

// Mock Raw Data Items
export const mockRawDataItems: RawDataItem[] = [
  {
    id: 'raw1',
    subjectId: 'subj1',
    source: mockSourceAccounts[4],
    timestamp: '2024-01-20T06:30:00Z',
    rawContent: '🚨🚨🚨 URGENT URGENT URGENT 🚨🚨🚨\n\nJe viens de recevoir l\'info d\'une source sûre au ministère...\n\nLe carburant va augmenter de 50% dès LUNDI!!!\n\nFaites le plein maintenant avant qu\'il ne soit trop tard!\n\nPartagez massivement pour sauver vos proches!!! 🚗⛽💸',
    processedContent: 'Alerte urgente concernant une augmentation de 50% du prix du carburant prévue pour lundi, selon une source ministérielle non vérifiée.',
    language: 'fr',
    hasMedia: false,
    isOriginal: true,
    metadata: {
      emojis_count: 12,
      caps_percentage: 0.35,
      exclamation_count: 9
    }
  },
  {
    id: 'raw2',
    subjectId: 'subj1',
    source: mockSourceAccounts[2],
    timestamp: '2024-01-20T08:15:00Z',
    rawContent: 'C\'est confirmé! Les prix du carburant vont exploser! \n\nMes amis à la pompe me disent qu\'ils ont déjà reçu les nouveaux tarifs.\n\nIl faut se mobiliser contre cette décision injuste qui va écraser le peuple!\n\n#NonALaugmentation #CongoPauvre #Mobilisation',
    language: 'fr',
    hasMedia: true,
    mediaUrls: ['https://example.com/fake-fuel-price-image.jpg'],
    isOriginal: false,
    parentId: 'raw1',
    metadata: {
      hashtags: ['#NonALaugmentation', '#CongoPauvre', '#Mobilisation']
    }
  },
  {
    id: 'raw3',
    subjectId: 'subj6',
    source: mockSourceAccounts[2],
    timestamp: '2024-01-16T11:30:00Z',
    rawContent: 'SCANDALE à Kamoa-Kakula! 😡\n\nLes entreprises étrangères pillent nos ressources pendant que nos enfants meurent de faim!\n\nOù sont les emplois promis? Où sont les écoles et hôpitaux?\n\nTout ce qu\'on voit c\'est la DESTRUCTION de notre environnement! 🌍💔\n\n#StopKamoa #JusticeEnvironnementale #RDCPillée',
    processedContent: 'Critique du projet minier Kamoa-Kakula accusé de pillage des ressources et de destruction environnementale.',
    language: 'fr',
    hasMedia: true,
    mediaUrls: ['https://example.com/environmental-damage.jpg'],
    isOriginal: true,
    metadata: {
      emojis_count: 4,
      caps_percentage: 0.15,
      hashtags: ['#StopKamoa', '#JusticeEnvironnementale', '#RDCPillée']
    }
  },
  {
    id: 'raw4',
    subjectId: 'subj7',
    source: mockSourceAccounts[6],
    timestamp: '2024-01-15T17:45:00Z',
    rawContent: '🚨 ALERTE MONDIALE 🚨\n\nLa 5G n\'est PAS pour améliorer internet!\n\nC\'est pour CONTRÔLER VOS CERVEAUX! 🧠⚡\n\nIls peuvent:\n- Lire vos pensées\n- Modifier vos émotions\n- Vous rendre malade\n- Manipuler vos décisions\n\nRÉVEILLEZ-VOUS AVANT QU\'IL SOIT TROP TARD!\n\nPartagez cette vérité que "ILS" ne veulent pas que vous sachiez!\n\n#5GDanger #ContrôleMental #Réveil',
    processedContent: 'Théorie conspirationniste accusant la technologie 5G de contrôle mental et manipulation.',
    language: 'fr',
    hasMedia: false,
    isOriginal: true,
    metadata: {
      emojis_count: 6,
      caps_percentage: 0.45,
      exclamation_count: 8,
      hashtags: ['#5GDanger', '#ContrôleMental', '#Réveil']
    }
  },
  {
    id: 'raw5',
    subjectId: 'subj8',
    source: mockSourceAccounts[7],
    timestamp: '2024-01-14T09:30:00Z',
    rawContent: 'Mes chers compatriotes 🇨🇩\n\nIl est temps de dire NON à la corruption qui ronge notre beau pays!\n\nEnsemble, lançons #TransparenceRDC - un mouvement citoyen pour:\n\n✅ Dénoncer les pratiques corrompues\n✅ Exiger la transparence dans la gestion publique\n✅ Sensibiliser nos communautés\n✅ Construire un Congo plus juste\n\nChaque voix compte! Chaque action compte!\n\nRejoignez le mouvement! 💪\n\n#TransparenceRDC #AntiCorruption #CongoDemain',
    processedContent: 'Lancement d\'une campagne citoyenne anti-corruption appelant à la transparence et à l\'action collective.',
    language: 'fr',
    hasMedia: true,
    mediaUrls: ['https://example.com/transparency-campaign.jpg'],
    isOriginal: true,
    metadata: {
      emojis_count: 6,
      hashtags: ['#TransparenceRDC', '#AntiCorruption', '#CongoDemain'],
      checkmarks_count: 4
    }
  },
  {
    id: 'raw6',
    subjectId: 'subj10',
    source: mockSourceAccounts[1],
    timestamp: '2024-01-21T07:30:00Z',
    rawContent: '🏛️ DÉCOUVERTE HISTORIQUE AU KASAÏ! 🏛️\n\nNos équipes ont mis au jour des artefacts datant de plus de 1000 ans, témoignant de la richesse de nos civilisations ancestrales.\n\nCette découverte exceptionnelle comprend:\n- Céramiques finement décorées\n- Outils en métal sophistiqués\n- Sculptures rituelles uniques\n- Restes d\'habitat organisé\n\nUne fenêtre fascinante sur notre héritage culturel qui repositionne l\'histoire de la région.\n\nProchainement: exposition au Musée National.\n\n#PatrimoineRDC #Kasaï #HistoireCongolaise #Archéologie',
    processedContent: 'Annonce officielle d\'une découverte archéologique majeure au Kasaï révélant l\'ancienneté des civilisations locales.',
    language: 'fr',
    hasMedia: true,
    mediaUrls: ['https://example.com/archaeological-discovery.jpg', 'https://example.com/artifacts-kasai.jpg'],
    isOriginal: true,
    metadata: {
      emojis_count: 4,
      hashtags: ['#PatrimoineRDC', '#Kasaï', '#HistoireCongolaise', '#Archéologie'],
      bullet_points: 4
    }
  },
  {
    id: 'raw7',
    subjectId: 'subj3',
    source: mockSourceAccounts[1],
    timestamp: '2024-01-18T13:00:00Z',
    rawContent: '🩺 CAMPAGNE NATIONALE DE VACCINATION 🩺\n\nLancement officiel de la campagne contre la rougeole dans toutes les provinces.\n\nObjectifs:\n- Vacciner 12 millions d\'enfants de 6 mois à 15 ans\n- Renforcer l\'immunité collective\n- Prévenir les épidémies\n\nCentres de vaccination ouverts dans:\n✅ Hôpitaux publics\n✅ Centres de santé communautaires\n✅ Écoles\n✅ Unités mobiles\n\nLa vaccination est GRATUITE et SÛRE.\n\nProtégeons ensemble nos enfants! 👶👧👦\n\n#VaccinationRDC #SantéPublique #ProtégeonNosEnfants',
    processedContent: 'Annonce officielle du lancement de la campagne nationale de vaccination contre la rougeole.',
    language: 'fr',
    hasMedia: true,
    mediaUrls: ['https://example.com/vaccination-campaign.jpg'],
    isOriginal: true,
    metadata: {
      emojis_count: 7,
      hashtags: ['#VaccinationRDC', '#SantéPublique', '#ProtégeonNosEnfants'],
      checkmarks_count: 4
    }
  }
];

// Mock Analytics Time Series
const generateTimeSeriesData = (hours: number, baseValue: number): TimeSeriesData[] => {
  const data: TimeSeriesData[] = [];
  const now = new Date('2024-01-21T15:00:00Z');
  
  for (let i = hours; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 3600000);
    const randomVariation = Math.random() * 0.4 - 0.2;
    const trendFactor = 1 + (hours - i) / hours * 0.5;
    data.push({
      timestamp: time.toISOString(),
      value: Math.round(baseValue * trendFactor * (1 + randomVariation))
    });
  }
  
  return data;
};

export const mockSubjectAnalytics: SubjectAnalytics = {
  subjectId: 'subj1',
  period: 'hourly',
  metrics: {
    reach: generateTimeSeriesData(48, 5000),
    engagement: generateTimeSeriesData(48, 500),
    sentiment: generateTimeSeriesData(48, -0.5).map(d => ({
      ...d,
      value: Math.max(-1, Math.min(1, d.value))
    })),
    velocity: generateTimeSeriesData(48, 30),
    platforms: [
      { platform: 'social_media', percentage: 45, count: 202500 },
      { platform: 'messaging_app', percentage: 30, count: 135000 },
      { platform: 'news', percentage: 15, count: 67500 },
      { platform: 'forum', percentage: 10, count: 45000 }
    ]
  },
  topInfluencers: [mockSourceAccounts[0], mockSourceAccounts[1], mockSourceAccounts[2]],
  viralMoments: [
    {
      id: 'viral1',
      timestamp: '2024-01-20T10:00:00Z',
      triggerEventId: 'evt3',
      peakReach: 125000,
      duration: 4,
      amplificationFactor: 12.5
    }
  ]
};

// Helper function to get mock data
export const getMockSubjectTimeline = (subjectId: string): SubjectTimeline => {
  return {
    subjectId,
    events: mockSpreadEvents.filter(e => e.subjectId === subjectId),
    milestones: mockTimelineMilestones,
    phases: mockSpreadPhases
  };
};

export const getMockRawDataForSubject = (subjectId: string): RawDataItem[] => {
  return mockRawDataItems.filter(item => item.subjectId === subjectId);
};

export const getMockPredictionsForSubject = (subjectId: string): SpreadPrediction[] => {
  return mockPredictions.filter(pred => pred.subjectId === subjectId);
};