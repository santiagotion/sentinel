import type {
  CounterCampaign,
  AutoResponse,
  RapidResponse,
  CommunityEngagement,
  ResponseTeamMember,
  CommunityParticipant
} from '../types/CounterAction';

// Mock Counter Campaigns
export const mockCounterCampaigns: CounterCampaign[] = [
  {
    id: 'camp1',
    title: 'Fact-Check Élections 2024',
    description: 'Campagne de vérification des faits pour contrer la désinformation électorale',
    type: 'fact_check',
    status: 'active',
    targetSubjectId: 'subj1',
    platforms: ['twitter', 'facebook', 'whatsapp'],
    createdAt: '2024-12-20T09:00:00Z',
    startDate: '2024-12-21T06:00:00Z',
    endDate: '2025-01-15T23:59:59Z',
    creator: {
      id: 'user1',
      name: 'Sarah Mukendi',
      role: 'Communications Manager'
    },
    approval: {
      required: true,
      approvedBy: 'manager1',
      approvedAt: '2024-12-20T14:30:00Z',
      comments: 'Approuvé avec budget augmenté'
    },
    metrics: {
      reach: 125000,
      impressions: 450000,
      engagement: {
        likes: 3200,
        shares: 1800,
        comments: 950,
        clicks: 8500
      },
      effectiveness: {
        misinformationReduced: 35,
        factChecksDelivered: 128,
        narrativeShift: 0.45,
        communityEngagement: 0.68
      },
      costs: {
        budget: 15000,
        spent: 8500,
        costPerReach: 0.068
      }
    },
    content: {
      messages: [
        {
          id: 'msg1',
          platform: 'twitter',
          content: '🔍 FACT-CHECK: Les rumeurs sur les machines de vote ont été vérifiées. Voici les faits:\n\n✅ Source officielle: CENI\n✅ Vérification indépendante\n\n#FactCheck #Elections2024 #VeriteDRC',
          language: 'fr',
          tone: 'educational',
          variables: { 'source': 'CENI', 'topic': 'machines de vote' }
        },
        {
          id: 'msg2',
          platform: 'facebook',
          content: 'Nous avons vérifié les informations circulant sur les élections. Consultez notre rapport complet avec sources et preuves.',
          language: 'fr',
          tone: 'formal',
          variables: {}
        }
      ],
      media: [
        {
          id: 'media1',
          type: 'infographic',
          url: '/assets/fact-check-infographic.png',
          title: 'Infographie Fact-Check Élections',
          description: 'Visualisation des faits vérifiés sur les élections',
          verified: true
        }
      ],
      hashtags: ['#FactCheck', '#Elections2024', '#VeriteDRC', '#TransparenceDRC'],
      mentions: ['@CENI_RDC', '@RadioOkapi'],
      factCheckSources: [
        {
          id: 'fc1',
          organization: 'Africa Check',
          url: 'https://africacheck.org/fact-checks/elections-drc-2024',
          title: 'Vérification des allégations sur les machines de vote',
          summary: 'Analyse détaillée des fonctionnalités et sécurité des machines de vote',
          credibilityScore: 0.95,
          publishedAt: '2024-12-19T15:00:00Z'
        }
      ]
    },
    targeting: {
      demographics: {
        ageGroups: ['18-25', '26-35', '36-50'],
        locations: ['Kinshasa', 'Lubumbashi', 'Goma', 'Kisangani'],
        languages: ['fr', 'ln', 'sw']
      },
      behavioral: {
        engagedWithMisinformation: true,
        followsInfluencers: ['@political_analyst_rdc', '@civic_education'],
        interests: ['politics', 'elections', 'democracy', 'civic_education']
      },
      reach: {
        estimated: 200000,
        maxBudget: 15000
      }
    },
    schedule: {
      type: 'triggered',
      frequency: 'on_detection',
      triggers: [
        {
          id: 'trigger1',
          type: 'misinformation_detected',
          conditions: { 'confidence': 0.8, 'reach': 10000 },
          priority: 'high'
        }
      ]
    }
  },
  {
    id: 'camp2',
    title: 'Éducation Numérique Anti-Désinformation',
    description: 'Programme éducatif pour former les citoyens à identifier la désinformation',
    type: 'educational',
    status: 'active',
    platforms: ['all'],
    createdAt: '2024-12-15T10:00:00Z',
    startDate: '2024-12-16T00:00:00Z',
    creator: {
      id: 'user2',
      name: 'Dr. Jean Kabamba',
      role: 'Education Specialist'
    },
    approval: {
      required: false
    },
    metrics: {
      reach: 85000,
      impressions: 320000,
      engagement: {
        likes: 2100,
        shares: 1200,
        comments: 680,
        clicks: 5800
      },
      effectiveness: {
        misinformationReduced: 28,
        factChecksDelivered: 95,
        narrativeShift: 0.38,
        communityEngagement: 0.72
      },
      costs: {
        budget: 8000,
        spent: 4200,
        costPerReach: 0.049
      }
    },
    content: {
      messages: [
        {
          id: 'msg3',
          platform: 'all',
          content: '📚 FORMATION GRATUITE: Comment identifier les fausses informations?\n\n🎯 Techniques simples\n🔍 Outils de vérification\n📱 Guide pratique\n\nInscrivez-vous: bit.ly/formation-factcheck',
          language: 'fr',
          tone: 'friendly',
          variables: {}
        }
      ],
      media: [
        {
          id: 'media2',
          type: 'video',
          url: '/assets/education-video.mp4',
          title: 'Guide de vérification des informations',
          description: 'Tutoriel de 5 minutes sur les techniques de fact-checking',
          verified: true
        }
      ],
      hashtags: ['#EducationNumerique', '#FactCheck', '#FormationDRC'],
      mentions: [],
      factCheckSources: []
    },
    targeting: {
      demographics: {
        ageGroups: ['18-25', '26-35', '36-50', '51-65'],
        locations: ['Kinshasa', 'Lubumbashi', 'Goma', 'Kananga'],
        languages: ['fr', 'ln', 'sw', 'kg']
      },
      behavioral: {
        engagedWithMisinformation: false,
        followsInfluencers: [],
        interests: ['education', 'technology', 'media_literacy']
      },
      reach: {
        estimated: 150000,
        maxBudget: 8000
      }
    },
    schedule: {
      type: 'scheduled',
      startTime: '2024-12-16T06:00:00Z',
      frequency: 'weekly'
    }
  },
  {
    id: 'camp3',
    title: 'Contre-Narrative COVID-19',
    description: 'Campagne pour contrer les théories conspirationnistes sur les vaccins',
    type: 'counter_narrative',
    status: 'paused',
    platforms: ['facebook', 'whatsapp', 'telegram'],
    createdAt: '2024-11-20T08:00:00Z',
    startDate: '2024-11-25T00:00:00Z',
    endDate: '2024-12-31T23:59:59Z',
    creator: {
      id: 'user3',
      name: 'Dr. Marie Tshimanga',
      role: 'Health Communications'
    },
    approval: {
      required: true,
      approvedBy: 'health_minister',
      approvedAt: '2024-11-22T16:00:00Z'
    },
    metrics: {
      reach: 65000,
      impressions: 180000,
      engagement: {
        likes: 1200,
        shares: 800,
        comments: 450,
        clicks: 3200
      },
      effectiveness: {
        misinformationReduced: 22,
        factChecksDelivered: 68,
        narrativeShift: 0.28,
        communityEngagement: 0.45
      },
      costs: {
        budget: 12000,
        spent: 5800,
        costPerReach: 0.089
      }
    },
    content: {
      messages: [
        {
          id: 'msg4',
          platform: 'facebook',
          content: '🏥 INFORMATION MÉDICALE OFFICIELLE\n\nNos experts médicaux répondent à vos questions sur la vaccination.\n\n📞 Ligne directe: 0800-xxx-xxx\n🌐 Site officiel: sante.gouv.cd',
          language: 'fr',
          tone: 'professional',
          variables: {}
        }
      ],
      media: [
        {
          id: 'media3',
          type: 'infographic',
          url: '/assets/covid-facts.png',
          title: 'Faits sur les vaccins COVID-19',
          description: 'Informations vérifiées par les autorités sanitaires',
          verified: true
        }
      ],
      hashtags: ['#COVID19RDC', '#VaccinationDRC', '#SantePublique'],
      mentions: ['@MinSanteRDC', '@OMSCongo'],
      factCheckSources: [
        {
          id: 'fc2',
          organization: 'OMS',
          url: 'https://who.int/fr/emergencies/diseases/novel-coronavirus-2019',
          title: 'Informations officielles COVID-19',
          summary: 'Données scientifiques sur la vaccination et la prévention',
          credibilityScore: 0.98,
          publishedAt: '2024-11-15T12:00:00Z'
        }
      ]
    },
    targeting: {
      demographics: {
        ageGroups: ['26-35', '36-50', '51-65'],
        locations: ['Kinshasa', 'Lubumbashi', 'Goma'],
        languages: ['fr', 'ln']
      },
      behavioral: {
        engagedWithMisinformation: true,
        followsInfluencers: ['@health_skeptic', '@alternative_medicine'],
        interests: ['health', 'family', 'community']
      },
      reach: {
        estimated: 100000,
        maxBudget: 12000
      }
    },
    schedule: {
      type: 'scheduled',
      startTime: '2024-11-25T08:00:00Z',
      frequency: 'daily'
    }
  }
];

// Mock Auto Responses
export const mockAutoResponses: AutoResponse[] = [
  {
    id: 'auto1',
    name: 'Réponse Élections Automatique',
    active: true,
    platforms: ['twitter', 'facebook'],
    triggers: [
      {
        id: 'trigger1',
        type: 'keyword',
        patterns: ['fraude électorale', 'votes truqués', 'machines hackées'],
        conditions: {
          confidence: 0.8,
          reach: 5000
        },
        cooldown: 60
      },
      {
        id: 'trigger2',
        type: 'hashtag',
        patterns: ['#FraudeElections', '#VotesTruques'],
        conditions: {
          confidence: 0.7,
          engagement: 100
        },
        cooldown: 30
      }
    ],
    responses: [
      {
        id: 'resp1',
        platform: 'twitter',
        content: '🔍 Information vérifiée disponible: Les allégations de fraude électorale ont été examinées par des observateurs indépendants. Consultez le rapport officiel: bit.ly/rapport-elections-2024 #FactCheck',
        language: 'fr',
        includeFactCheck: true,
        includeSources: true,
        personalized: false,
        tone: 'professional'
      },
      {
        id: 'resp2',
        platform: 'facebook',
        content: 'Nous avons détecté des informations potentiellement incorrectes. Voici les faits vérifiés par nos partenaires de confiance. [Lien vers fact-check complet]',
        language: 'fr',
        includeFactCheck: true,
        includeSources: true,
        personalized: false,
        tone: 'educational'
      }
    ],
    approval: {
      required: false
    },
    metrics: {
      triggered: 45,
      sent: 42,
      effectiveness: 0.73
    },
    createdAt: '2024-12-10T14:00:00Z',
    lastTriggered: '2024-12-28T16:30:00Z'
  },
  {
    id: 'auto2',
    name: 'Détection Désinformation Santé',
    active: true,
    platforms: ['whatsapp', 'telegram'],
    triggers: [
      {
        id: 'trigger3',
        type: 'misinformation_detected',
        patterns: ['vaccin dangereux', 'remède miracle', 'coronavirus fake'],
        conditions: {
          confidence: 0.85,
          reach: 1000
        },
        cooldown: 120
      }
    ],
    responses: [
      {
        id: 'resp3',
        platform: 'whatsapp',
        content: '⚕️ Information de santé détectée. Pour des informations médicales fiables, consultez: sante.gouv.cd ou contactez la ligne d\'information gratuite: 0800-xxx-xxx',
        language: 'fr',
        includeFactCheck: true,
        includeSources: true,
        personalized: false,
        tone: 'empathetic'
      }
    ],
    approval: {
      required: true,
      approver: 'health_coordinator'
    },
    metrics: {
      triggered: 28,
      sent: 25,
      effectiveness: 0.68
    },
    createdAt: '2024-11-15T09:00:00Z',
    lastTriggered: '2024-12-27T11:15:00Z'
  },
  {
    id: 'auto3',
    name: 'Surveillance Réseaux Sociaux',
    active: false,
    platforms: ['all'],
    triggers: [
      {
        id: 'trigger4',
        type: 'sentiment',
        patterns: ['gouvernement corruption', 'opposition manipulation'],
        conditions: {
          confidence: 0.6,
          engagement: 500
        },
        cooldown: 180
      }
    ],
    responses: [
      {
        id: 'resp4',
        platform: 'all',
        content: 'Pour des informations vérifiées sur les institutions publiques, consultez les sources officielles. Évitez de partager des informations non vérifiées.',
        language: 'fr',
        includeFactCheck: false,
        includeSources: true,
        personalized: false,
        tone: 'corrective'
      }
    ],
    approval: {
      required: true,
      approver: 'senior_analyst'
    },
    metrics: {
      triggered: 12,
      sent: 8,
      effectiveness: 0.42
    },
    createdAt: '2024-10-20T11:00:00Z'
  }
];

// Mock Rapid Responses
export const mockRapidResponses: RapidResponse[] = [
  {
    id: 'rapid1',
    title: 'Réponse Urgente: Rumeurs Violence Post-Électorale',
    urgency: 'critical',
    status: 'active',
    triggerEvent: {
      type: 'viral_misinformation',
      description: 'Propagation rapide de rumeurs sur des violences post-électorales dans plusieurs provinces',
      detectedAt: '2024-12-28T14:30:00Z'
    },
    actions: [
      {
        id: 'action1',
        type: 'press_release',
        content: 'Communiqué de presse démenti les rumeurs de violence. Confirmation de la situation calme par les autorités locales.',
        status: 'completed',
        assignedTo: 'press_team',
        scheduledFor: '2024-12-28T15:00:00Z',
        completedAt: '2024-12-28T15:15:00Z'
      },
      {
        id: 'action2',
        type: 'social_media_post',
        platform: 'twitter',
        content: '🔴 DÉMENTI OFFICIEL: Les rumeurs de violence sont FAUSSES. Situation confirmée calme par la Police Nationale. Sources vérifiées: bit.ly/situation-securite #DementiOfficiel',
        status: 'completed',
        assignedTo: 'social_media_team',
        scheduledFor: '2024-12-28T15:30:00Z',
        completedAt: '2024-12-28T15:35:00Z'
      },
      {
        id: 'action3',
        type: 'influencer_outreach',
        content: 'Coordination avec influenceurs locaux pour diffuser le démenti et calmer les tensions',
        status: 'in_progress',
        assignedTo: 'outreach_coordinator',
        scheduledFor: '2024-12-28T16:00:00Z'
      },
      {
        id: 'action4',
        type: 'community_alert',
        content: 'Alerte communautaire via leaders locaux et réseaux de confiance',
        status: 'pending',
        assignedTo: 'community_liaison',
        scheduledFor: '2024-12-28T17:00:00Z'
      }
    ],
    timeline: [
      {
        id: 'timeline1',
        timestamp: '2024-12-28T14:30:00Z',
        action: 'Détection automatique de désinformation virale',
        actor: 'Système de surveillance',
        result: 'Alerte déclenchée - Urgence critique',
        impact: 0
      },
      {
        id: 'timeline2',
        timestamp: '2024-12-28T14:35:00Z',
        action: 'Équipe de réponse rapide mobilisée',
        actor: 'Coordinateur de crise',
        result: 'Équipe activée en 5 minutes',
        impact: 0
      },
      {
        id: 'timeline3',
        timestamp: '2024-12-28T15:15:00Z',
        action: 'Communiqué de presse publié',
        actor: 'Équipe de presse',
        result: 'Diffusion sur 12 médias locaux',
        impact: 25000
      },
      {
        id: 'timeline4',
        timestamp: '2024-12-28T15:35:00Z',
        action: 'Démenti sur réseaux sociaux',
        actor: 'Équipe réseaux sociaux',
        result: 'Publication sur Twitter, Facebook, WhatsApp',
        impact: 45000
      }
    ],
    team: [
      {
        id: 'team1',
        name: 'Alphonse Mukala',
        role: 'coordinator',
        contact: 'a.mukala@sentinel.cd',
        available: true
      },
      {
        id: 'team2',
        name: 'Jeanne Kasongo',
        role: 'content_creator',
        contact: 'j.kasongo@sentinel.cd',
        available: true
      },
      {
        id: 'team3',
        name: 'Patrick Mbuyi',
        role: 'fact_checker',
        contact: 'p.mbuyi@sentinel.cd',
        available: true
      },
      {
        id: 'team4',
        name: 'Christine Ilunga',
        role: 'community_manager',
        contact: 'c.ilunga@sentinel.cd',
        available: false
      }
    ],
    metrics: {
      responseTime: 5, // minutes
      reach: 70000,
      effectiveness: 0.82
    }
  },
  {
    id: 'rapid2',
    title: 'Attaque Coordonnée Contre Institution',
    urgency: 'high',
    status: 'completed',
    triggerEvent: {
      type: 'coordinated_attack',
      description: 'Campagne de désinformation coordonnée visant à discréditer la Commission Électorale',
      detectedAt: '2024-12-25T09:15:00Z'
    },
    actions: [
      {
        id: 'action5',
        type: 'fact_check',
        content: 'Fact-check détaillé des allégations avec sources et preuves',
        status: 'completed',
        assignedTo: 'fact_check_team',
        scheduledFor: '2024-12-25T10:00:00Z',
        completedAt: '2024-12-25T12:30:00Z'
      },
      {
        id: 'action6',
        type: 'social_media_post',
        platform: 'facebook',
        content: 'Réfutation point par point des accusations avec données vérifiables et sources officielles',
        status: 'completed',
        assignedTo: 'content_team',
        scheduledFor: '2024-12-25T13:00:00Z',
        completedAt: '2024-12-25T13:10:00Z'
      }
    ],
    timeline: [
      {
        id: 'timeline5',
        timestamp: '2024-12-25T09:15:00Z',
        action: 'Détection d\'attaque coordonnée',
        actor: 'Analyseur automatique',
        result: 'Pattern d\'attaque identifié',
        impact: 0
      },
      {
        id: 'timeline6',
        timestamp: '2024-12-25T12:30:00Z',
        action: 'Fact-check publié',
        actor: 'Équipe de vérification',
        result: 'Réfutation complète avec preuves',
        impact: 35000
      }
    ],
    team: [
      {
        id: 'team5',
        name: 'Dr. Joseph Mwamba',
        role: 'analyst',
        contact: 'j.mwamba@sentinel.cd',
        available: true
      }
    ],
    metrics: {
      responseTime: 195, // minutes (3h 15min)
      reach: 35000,
      effectiveness: 0.74
    }
  }
];

// Mock Community Engagements
export const mockCommunityEngagements: CommunityEngagement[] = [
  {
    id: 'comm1',
    title: 'Programme Ambassadeurs Anti-Désinformation',
    type: 'ambassador_program',
    status: 'active',
    participants: [
      {
        id: 'part1',
        name: 'Marie Kalombo',
        role: 'ambassador',
        location: 'Kinshasa',
        platforms: ['facebook', 'whatsapp'],
        reach: 15000,
        credibilityScore: 0.88,
        contributionLevel: 'gold'
      },
      {
        id: 'part2',
        name: 'Jean-Claude Mputu',
        role: 'ambassador',
        location: 'Lubumbashi',
        platforms: ['twitter', 'telegram'],
        reach: 8500,
        credibilityScore: 0.82,
        contributionLevel: 'silver'
      },
      {
        id: 'part3',
        name: 'Grace Ndaya',
        role: 'fact_checker',
        location: 'Goma',
        platforms: ['facebook', 'instagram'],
        reach: 12000,
        credibilityScore: 0.91,
        contributionLevel: 'gold'
      }
    ],
    activities: [
      {
        id: 'act1',
        type: 'training',
        title: 'Formation Fact-Checking Avancé',
        description: 'Session de formation sur les techniques avancées de vérification des faits',
        participants: ['part1', 'part2', 'part3'],
        scheduledFor: '2024-12-30T14:00:00Z',
        impact: {
          reach: 0,
          engagement: 25,
          factChecks: 0
        }
      },
      {
        id: 'act2',
        type: 'fact_check',
        title: 'Vérification Rumeurs Marché Central',
        description: 'Investigation sur les rumeurs concernant le marché central de Kinshasa',
        participants: ['part1'],
        scheduledFor: '2024-12-29T10:00:00Z',
        completedAt: '2024-12-29T16:30:00Z',
        impact: {
          reach: 8500,
          engagement: 1200,
          factChecks: 1
        }
      }
    ],
    impact: {
      peopleReached: 156000,
      misinformationCorrected: 28,
      trustedSourcesShared: 145,
      communityGrowth: 0.23
    },
    createdAt: '2024-11-01T00:00:00Z'
  },
  {
    id: 'comm2',
    title: 'Réseau de Vérificateurs Communautaires',
    type: 'fact_checker_network',
    status: 'recruiting',
    participants: [
      {
        id: 'part4',
        name: 'David Mukendi',
        role: 'fact_checker',
        location: 'Kananga',
        platforms: ['whatsapp', 'telegram'],
        reach: 4200,
        credibilityScore: 0.75,
        contributionLevel: 'bronze'
      },
      {
        id: 'part5',
        name: 'Sylvie Tshiaba',
        role: 'educator',
        location: 'Kisangani',
        platforms: ['facebook'],
        reach: 6800,
        credibilityScore: 0.83,
        contributionLevel: 'silver'
      }
    ],
    activities: [
      {
        id: 'act3',
        type: 'outreach',
        title: 'Recrutement Nouveaux Vérificateurs',
        description: 'Campagne de recrutement pour élargir le réseau',
        participants: ['part4', 'part5'],
        scheduledFor: '2025-01-05T09:00:00Z',
        impact: {
          reach: 15000,
          engagement: 850,
          factChecks: 0
        }
      }
    ],
    impact: {
      peopleReached: 45000,
      misinformationCorrected: 12,
      trustedSourcesShared: 58,
      communityGrowth: 0.15
    },
    createdAt: '2024-12-01T00:00:00Z'
  },
  {
    id: 'comm3',
    title: 'Ateliers Éducation Numérique',
    type: 'educational_workshop',
    status: 'planning',
    participants: [
      {
        id: 'part6',
        name: 'Prof. Emmanuel Lumumba',
        role: 'educator',
        location: 'Kinshasa',
        platforms: ['all'],
        reach: 25000,
        credibilityScore: 0.95,
        contributionLevel: 'platinum'
      }
    ],
    activities: [
      {
        id: 'act4',
        type: 'training',
        title: 'Atelier Littératie Numérique',
        description: 'Formation sur la littératie numérique et la détection de fausses informations',
        participants: ['part6'],
        scheduledFor: '2025-01-15T13:00:00Z',
        impact: {
          reach: 0,
          engagement: 0,
          factChecks: 0
        }
      }
    ],
    impact: {
      peopleReached: 0,
      misinformationCorrected: 0,
      trustedSourcesShared: 0,
      communityGrowth: 0
    },
    createdAt: '2024-12-20T00:00:00Z'
  }
];