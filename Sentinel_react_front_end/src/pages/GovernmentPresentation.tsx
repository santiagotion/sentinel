import React, { useState, useEffect } from 'react';
import { 
  Shield, Globe, Brain, TrendingUp, AlertTriangle, CheckCircle, 
  Activity, Eye, Map, MessageSquare, Zap, BarChart3, Users,
  Clock, Target, Lock, ArrowRight, ChevronDown, Menu, X,
  Database, Search, Filter, Bot, FileText, Camera, Image
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Import actual components from the tool
import { EnhancedOverviewScreen } from '../components/screens/EnhancedOverviewScreen';
import { KeywordsScreen } from '../components/screens/KeywordsScreen';
import { AnalyticsScreen } from '../components/screens/AnalyticsScreen';
import { NetworkScreen } from '../components/screens/NetworkScreen';
import { GeographicScreen } from '../components/screens/GeographicScreen';
import { AlertsScreen } from '../components/screens/AlertsScreen';
import { RawDataExplorer } from '../components/visualizations/RawDataExplorer';

// Import pattern components
import { SquarePattern } from '../components/patterns/SquarePattern';
import { VerticalLinePattern } from '../components/patterns/VerticalLinePattern';

export function GovernmentPresentation() {
  const [activeSection, setActiveSection] = useState('hero');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [currentDemo, setCurrentDemo] = useState('overview');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'threat', 'solution', 'features', 'demo', 'cases', 'benefits', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setShowMobileMenu(false);
  };

  const navigationItems = [
    { id: 'hero', label: 'Accueil' },
    { id: 'threat', label: 'Menaces' },
    { id: 'solution', label: 'Solution' },
    { id: 'features', label: 'Capacités' },
    { id: 'demo', label: 'Démonstration' },
    { id: 'cases', label: 'Cas d\'usage' },
    { id: 'benefits', label: 'Avantages' },
    { id: 'contact', label: 'Contact' }
  ];

  const features = [
    {
      icon: Globe,
      title: 'Surveillance Multi-Sources',
      description: 'Twitter, Facebook, WhatsApp, Telegram, Sites d\'actualités, YouTube, TikTok',
      details: ['Collecte en temps réel', 'Analyse cross-platform', 'Détection de patterns']
    },
    {
      icon: Brain,
      title: 'Intelligence Artificielle',
      description: 'Analyse sémantique avancée, détection de bots, prédiction de viralité',
      details: ['Machine Learning', 'NLP multilingue', 'Apprentissage continu']
    },
    {
      icon: Camera,
      title: 'Analyse Visuelle',
      description: 'Lecture de screenshots, analyse d\'images, détection de memes',
      details: ['OCR avancé', 'Classification d\'images', 'Détection de manipulation']
    },
    {
      icon: Bot,
      title: 'Automatisation Complète',
      description: 'Création de posts, réponses automatiques, gestion de campagnes',
      details: ['Génération de contenu', 'Engagement automatique', 'Workflows personnalisés']
    },
    {
      icon: Map,
      title: 'Intelligence Géographique',
      description: 'Cartographie en temps réel de la propagation d\'information par province',
      details: ['Cartes de chaleur', 'Analyse régionale', 'Détection de foyers']
    },
    {
      icon: AlertTriangle,
      title: 'Système d\'Alertes',
      description: 'Notifications prioritaires, détection d\'anomalies, réponse rapide',
      details: ['Alertes temps réel', 'Escalade automatique', 'Protocoles de crise']
    }
  ];

  const cases = [
    {
      title: 'Crise Sanitaire',
      threat: 'Fausse rumeur sur un vaccin',
      without: ['Découverte tardive', 'Panique massive', 'Efforts inefficaces'],
      with: ['Détection en 15 min', 'Source identifiée', 'Crise évitée'],
      impact: '95% de réduction des dommages'
    },
    {
      title: 'Tensions Électorales',
      threat: 'Désinformation ethnique',
      without: ['Escalade non détectée', 'Violence potentielle', 'Dommages sociaux'],
      with: ['Patterns détectés', 'Acteurs identifiés', 'Paix maintenue'],
      impact: 'Prévention totale des conflits'
    },
    {
      title: 'Attaque Économique',
      threat: 'Fausses infos sur le secteur minier',
      without: ['Perte d\'investisseurs', 'Impact économique', 'Réputation ternie'],
      with: ['Correction rapide', 'Communication proactive', 'Économie protégée'],
      impact: 'Protection de millions USD'
    }
  ];

  const demoComponents = {
    overview: { 
      component: EnhancedOverviewScreen, 
      title: 'Tableau de Bord Exécutif',
      description: 'Vue d\'ensemble en temps réel de l\'espace informationnel congolais'
    },
    keywords: { 
      component: KeywordsScreen, 
      title: 'Suivi des Mots-Clés',
      description: 'Surveillance automatisée 24/7 des termes critiques'
    },
    analytics: { 
      component: AnalyticsScreen, 
      title: 'Analyses Approfondies',
      description: 'Intelligence actionnable avec ML et prédictions'
    },
    network: { 
      component: NetworkScreen, 
      title: 'Analyse de Réseaux',
      description: 'Cartographie des influenceurs et communautés'
    },
    geographic: { 
      component: GeographicScreen, 
      title: 'Intelligence Géographique',
      description: 'Visualisation par province et région'
    },
    alerts: { 
      component: AlertsScreen, 
      title: 'Centre d\'Alertes',
      description: 'Notifications prioritaires et gestion de crise'
    },
    data: { 
      component: RawDataExplorer, 
      title: 'Explorateur de Données',
      description: 'Accès complet aux données collectées'
    }
  };

  const CurrentDemoComponent = demoComponents[currentDemo].component;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">SENTINEL RDC</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-gray-600 dark:text-gray-400"
            >
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
            >
              <div className="px-4 py-2 space-y-1">
                {navigationItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-16 min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              SENTINEL
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-8">
              Système d'Intelligence Numérique pour la République Démocratique du Congo
            </p>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">
              Protection 24/7 contre la désinformation. Intelligence artificielle au service de la souveraineté numérique congolaise.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
              >
                <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Surveillance 24/7</h3>
                <p className="text-gray-600 dark:text-gray-400">Robots intelligents travaillant sans interruption</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
              >
                <Target className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Détection Précoce</h3>
                <p className="text-gray-600 dark:text-gray-400">Arrêtez la désinformation avant qu'elle ne devienne virale</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
              >
                <Zap className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Réponse Rapide</h3>
                <p className="text-gray-600 dark:text-gray-400">Contre-narratifs automatiques en temps réel</p>
              </motion.div>
            </div>

            <button
              onClick={() => scrollToSection('demo')}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
            >
              <span>Voir la Démonstration</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <ChevronDown className="w-8 h-8 text-gray-400 animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* Threat Section */}
      <section id="threat" className="py-20 bg-white dark:bg-gray-800 relative overflow-hidden">
        <SquarePattern />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              La Menace : Guerre de l'Information
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              La RDC fait face à des défis sans précédent dans l'espace numérique
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6"
            >
              <AlertTriangle className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Désinformation Orchestrée</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Acteurs étrangers malveillants</li>
                <li>• Manipulation de l'opinion publique</li>
                <li>• Campagnes de déstabilisation</li>
                <li>• Fake news virales</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6"
            >
              <Users className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Division Communautaire</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Exploitation des tensions ethniques</li>
                <li>• Amplification des conflits</li>
                <li>• Érosion de la confiance</li>
                <li>• Polarisation sociale</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6"
            >
              <Eye className="w-12 h-12 text-yellow-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Manque de Visibilité</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Information trop rapide</li>
                <li>• Réaction toujours tardive</li>
                <li>• Outils inadéquats</li>
                <li>• Angle mort numérique</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <VerticalLinePattern />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              La Solution : SENTINEL
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Intelligence artificielle et machine learning au service de la protection informationnelle
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6">Technologies de Pointe</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold">Intelligence Artificielle Avancée</h4>
                    <p className="text-gray-600 dark:text-gray-400">Modèles ML spécialisés pour l'analyse contextuelle congolaise</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold">Traitement Temps Réel</h4>
                    <p className="text-gray-600 dark:text-gray-400">Analyse de millions de messages avec latence moins d'1 minute</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold">Multi-Modal Analysis</h4>
                    <p className="text-gray-600 dark:text-gray-400">Texte, images, vidéos, audio - tout est analysé</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold">Automatisation Complète</h4>
                    <p className="text-gray-600 dark:text-gray-400">Création de contenu, réponses automatiques, workflows</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-xl"
            >
              <h3 className="text-2xl font-bold mb-6">Architecture Robuste</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Collecte Multi-Sources</span>
                    <span className="text-sm text-gray-500">8+ plateformes</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Analyse IA/ML</span>
                    <span className="text-sm text-gray-500">99.9% précision</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '99.9%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Temps de Réponse</span>
                    <span className="text-sm text-gray-500">moins de 60 secondes</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: '95%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Disponibilité</span>
                    <span className="text-sm text-gray-500">99.9% uptime</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '99.9%' }} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-800 relative overflow-hidden">
        <SquarePattern />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Capacités Principales
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Un arsenal complet pour la protection de l'espace informationnel
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{feature.description}</p>
                <ul className="space-y-1">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="text-sm text-gray-500 dark:text-gray-500 flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section id="demo" className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <VerticalLinePattern />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Démonstration en Direct
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Explorez les interfaces réelles du système Sentinel
            </p>
          </motion.div>

          {/* Demo Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {Object.entries(demoComponents).map(([key, demo]) => (
              <button
                key={key}
                onClick={() => setCurrentDemo(key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentDemo === key
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {demo.title}
              </button>
            ))}
          </div>

          {/* Demo Display */}
          <motion.div
            key={currentDemo}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="bg-gray-100 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {demoComponents[currentDemo].title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {demoComponents[currentDemo].description}
              </p>
            </div>
            <div className="p-6 max-h-[600px] overflow-y-auto">
              {currentDemo === 'overview' && <EnhancedOverviewScreen keywords={[]} />}
              {currentDemo === 'keywords' && <KeywordsScreen keywords={[]} setKeywords={() => {}} />}
              {currentDemo === 'analytics' && <AnalyticsScreen />}
              {currentDemo === 'network' && <NetworkScreen />}
              {currentDemo === 'geographic' && <GeographicScreen />}
              {currentDemo === 'alerts' && <AlertsScreen />}
              {currentDemo === 'data' && <RawDataExplorer />}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="cases" className="py-20 bg-white dark:bg-gray-800 relative overflow-hidden">
        <SquarePattern />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Cas d'Usage Critiques
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Impact concret sur la protection nationale
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {cases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6"
              >
                <h3 className="text-xl font-bold mb-2">{useCase.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 font-medium">
                  Menace : {useCase.threat}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
                    <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">Sans Sentinel</h4>
                    <ul className="space-y-1">
                      {useCase.without.map((item, idx) => (
                        <li key={idx} className="text-sm text-red-600 dark:text-red-300 flex items-start">
                          <X className="w-4 h-4 mr-1 flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Avec Sentinel</h4>
                    <ul className="space-y-1">
                      {useCase.with.map((item, idx) => (
                        <li key={idx} className="text-sm text-green-600 dark:text-green-300 flex items-start">
                          <CheckCircle className="w-4 h-4 mr-1 flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="bg-blue-100 dark:bg-blue-900/20 rounded-lg p-3">
                  <p className="text-sm font-semibold text-blue-700 dark:text-blue-400">
                    Impact : {useCase.impact}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <VerticalLinePattern />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Avantages Stratégiques
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Un investissement dans l'avenir numérique de la RDC
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center"
            >
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Souveraineté Numérique</h3>
              <p className="text-gray-600 dark:text-gray-400">Protection contre les ingérences étrangères</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center"
            >
              <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">ROI Exceptionnel</h3>
              <p className="text-gray-600 dark:text-gray-400">Prévention de crises = économies massives</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center"
            >
              <Activity className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Efficacité 24/7</h3>
              <p className="text-gray-600 dark:text-gray-400">Automatisation complète sans repos</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center"
            >
              <Lock className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Sécurité Maximale</h3>
              <p className="text-gray-600 dark:text-gray-400">Infrastructure cloud sécurisée</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-blue-600 rounded-2xl p-8 text-white text-center"
          >
            <h3 className="text-3xl font-bold mb-4">
              Le coût de l'inaction est infiniment supérieur à l'investissement
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Chaque jour sans Sentinel est un jour de vulnérabilité
            </p>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
            >
              <span>Demander une Démonstration</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white dark:bg-gray-800 relative overflow-hidden">
        <SquarePattern />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Prochaines Étapes
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">
              Agissons ensemble pour protéger l'avenir numérique de la République Démocratique du Congo
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="font-semibold mb-2">Démonstration</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Présentation live personnalisée</p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="font-semibold mb-2">Étude</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Analyse des besoins spécifiques</p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-blue-600">3</span>
                </div>
                <h3 className="font-semibold mb-2">Pilote</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Test sur périmètre limité</p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-blue-600">4</span>
                </div>
                <h3 className="font-semibold mb-2">Déploiement</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Protection complète activée</p>
              </div>
            </div>

            <div className="mt-12 p-8 bg-gray-100 dark:bg-gray-900 rounded-xl">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Ce document est confidentiel et destiné exclusivement aux autorités de la République Démocratique du Congo
              </p>
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
                Contactez l'Équipe Dédiée RDC
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}