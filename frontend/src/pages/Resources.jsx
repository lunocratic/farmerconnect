import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import '../App.css'
import '../styles/Resources.css'
import '../styles/Dashboard.css'

const agriculturePlans = {
  en: [
    {
      id: 1,
      title: 'Small Scale Vegetable Farming',
      category: 'Vegetables',
      duration: '3-4 months',
      investment: '₹15,000 - ₹25,000',
      roi: '60-80% per cycle',
      description: 'Complete guide for growing vegetables on 0.5-1 acre land with drip irrigation and organic methods.',
      details: ['Seasonal crop selection', 'Soil preparation & composting', 'Drip irrigation setup', 'Pest management', 'Marketing strategies'],
      subsidies: ['PM-KISAN (₹6,000/year)', 'Drip irrigation subsidy 50%', 'Soil health card free'],
      bestSeason: 'Kharif & Rabi'
    },
    {
      id: 2,
      title: 'Organic Rice Cultivation',
      category: 'Grains',
      duration: '4-6 months',
      investment: '₹30,000 - ₹50,000 per acre',
      roi: '40-60% per harvest',
      description: 'Traditional paddy farming with modern organic techniques for sustainable rice production.',
      details: ['Land preparation & leveling', 'Seed selection (SRI method)', 'Water management', 'Organic fertilizers', 'Harvesting & storage'],
      subsidies: ['Minimum Support Price', 'Crop insurance subsidy', 'Free soil testing'],
      bestSeason: 'Kharif (June-Nov)'
    },
    {
      id: 3,
      title: 'Fruit Orchard Development',
      category: 'Fruits',
      duration: '2-3 years (to bearing)',
      investment: '₹80,000 - ₹1,50,000 per acre',
      roi: '200-300% after 3 years',
      description: 'Long-term plan for mango, guava, or citrus orchards with high-density planting.',
      details: ['Site selection & soil testing', 'Variety selection', 'Planting & spacing', 'Pruning techniques', 'Drip & fertigation'],
      subsidies: ['MIDH scheme 40% subsidy', 'Horticulture Mission funds', 'Bank loans at 7% interest'],
      bestSeason: 'Monsoon planting'
    },
    {
      id: 4,
      title: 'Dairy Farming Integration',
      category: 'Livestock',
      duration: 'Ongoing',
      investment: '₹1,00,000 - ₹2,50,000',
      roi: '25-35% annually',
      description: 'Mixed farming with dairy cows/buffaloes for milk production and manure for crops.',
      details: ['Animal selection & housing', 'Fodder cultivation', 'Milking & hygiene', 'Veterinary care', 'Marketing milk products'],
      subsidies: ['NABARD dairy scheme', 'Livestock insurance 50% subsidy', 'Free veterinary services'],
      bestSeason: 'Year-round'
    },
    {
      id: 5,
      title: 'Mushroom Cultivation',
      category: 'Specialty Crops',
      duration: '45-60 days per cycle',
      investment: '₹20,000 - ₹40,000',
      roi: '100-150% per cycle',
      description: 'Indoor mushroom farming (oyster/button) with minimal space and high returns.',
      details: ['Mushroom house setup', 'Spawn preparation', 'Temperature control', 'Harvesting cycles', 'Value addition & packaging'],
      subsidies: ['PMFBY scheme', 'Startup India benefits', 'Training from Krishi Vigyan Kendra'],
      bestSeason: 'Oct-Mar (cool season)'
    },
    {
      id: 6,
      title: 'Vermicompost Production',
      category: 'Soil Health',
      duration: '2-3 months per batch',
      investment: '₹10,000 - ₹20,000',
      roi: '80-120% per batch',
      description: 'Organic fertilizer production using earthworms for sale and farm use.',
      details: ['Vermibed construction', 'Worm species selection', 'Feed management', 'Harvesting & packaging', 'Quality standards'],
      subsidies: ['Organic farming subsidy 30%', 'Free training programs', 'Market linkage support'],
      bestSeason: 'Year-round'
    },
    {
      id: 7,
      title: 'Poultry Farming (Layers)',
      category: 'Livestock',
      duration: '18 months per cycle',
      investment: '₹2,00,000 - ₹4,00,000',
      roi: '40-60% annually',
      description: 'Commercial egg production with 500-1000 birds for steady income generation.',
      details: ['Shed construction', 'Chick procurement', 'Feed management', 'Disease control', 'Egg collection & marketing'],
      subsidies: ['NABARD poultry loan', 'State poultry schemes', 'Subsidy on shed construction 25%'],
      bestSeason: 'Year-round'
    },
    {
      id: 8,
      title: 'Hydroponic Farming',
      category: 'Modern Tech',
      duration: '2-3 months per cycle',
      investment: '₹1,50,000 - ₹3,00,000',
      roi: '100-200% annually',
      description: 'Soil-less cultivation using nutrient solutions for leafy vegetables with 90% water saving.',
      details: ['System setup', 'Nutrient solution preparation', 'Growing media selection', 'Climate control', 'Continuous harvesting'],
      subsidies: ['Startup India funding', 'Agriculture innovation grants', 'Technology adoption subsidy 40%'],
      bestSeason: 'Year-round'
    },
    {
      id: 9,
      title: 'Beekeeping (Apiculture)',
      category: 'Specialty Crops',
      duration: 'Year-round',
      investment: '₹15,000 - ₹30,000',
      roi: '80-100% annually',
      description: 'Honey production and pollination services with minimal land requirement.',
      details: ['Beehive boxes setup', 'Queen bee & colony management', 'Seasonal migration', 'Honey extraction', 'Wax & propolis products'],
      subsidies: ['KVIC beekeeping subsidy 40%', 'Free training programs', 'Marketing assistance'],
      bestSeason: 'Oct-Jun (flowering)'
    },
    {
      id: 10,
      title: 'Medicinal Plants Cultivation',
      category: 'Specialty Crops',
      duration: '6-12 months',
      investment: '₹25,000 - ₹50,000 per acre',
      roi: '100-200% per harvest',
      description: 'Growing high-value herbs like aloe vera, ashwagandha, tulsi for pharmaceutical & ayurvedic industries.',
      details: ['Plant selection (certified seeds)', 'Organic cultivation methods', 'Processing & drying', 'Quality certification', 'Contract farming'],
      subsidies: ['NMPB scheme 30% subsidy', 'Ayush ministry support', 'Export promotion schemes'],
      bestSeason: 'Varies by plant'
    },
    {
      id: 11,
      title: 'Fish Farming (Aquaculture)',
      category: 'Aquaculture',
      duration: '8-10 months',
      investment: '₹50,000 - ₹1,00,000 per acre',
      roi: '60-100% per cycle',
      description: 'Freshwater fish farming (rohu, catla, mrigal) in ponds for protein production.',
      details: ['Pond construction/renovation', 'Water quality management', 'Fingerling stocking', 'Feed management', 'Harvesting & marketing'],
      subsidies: ['Blue Revolution scheme', 'Pond construction subsidy 50%', 'Fish seed subsidy'],
      bestSeason: 'Monsoon stocking'
    },
    {
      id: 12,
      title: 'Floriculture Business',
      category: 'Flowers',
      duration: '3-6 months per crop',
      investment: '₹40,000 - ₹80,000 per acre',
      roi: '100-150% per cycle',
      description: 'Commercial flower cultivation (rose, marigold, jasmine) for local and export markets.',
      details: ['Polyhouse/shade net setup', 'Variety selection', 'Irrigation & fertigation', 'Pest & disease control', 'Grading & packaging'],
      subsidies: ['MIDH floriculture subsidy 35%', 'Polyhouse subsidy 50%', 'Export promotion'],
      bestSeason: 'Oct-Mar (peak demand)'
    }
  ],
}

// Add translations for other languages (shortened for brevity)
agriculturePlans.hi = agriculturePlans.en.map(plan => ({
  ...plan,
  title: plan.id === 1 ? 'छोटे पैमाने पर सब्जी की खेती' :
         plan.id === 2 ? 'जैविक धान की खेती' :
         plan.id === 3 ? 'फलों के बाग का विकास' :
         plan.id === 4 ? 'डेयरी फार्मिंग एकीकरण' :
         plan.id === 5 ? 'मशरूम की खेती' : 'वर्मीकम्पोस्ट उत्पादन',
}))

function Resources() {
  const { t, language, setLanguage, translations } = useLanguage()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  
  const categories = ['All', 'Vegetables', 'Grains', 'Fruits', 'Livestock', 'Specialty Crops', 'Modern Tech', 'Aquaculture', 'Flowers']
  
  const plans = agriculturePlans[language] || agriculturePlans.en
  const filteredPlans = selectedCategory === 'All' 
    ? plans 
    : plans.filter(plan => plan.category === selectedCategory)

  const handleViewDetails = (plan) => {
    setSelectedPlan(plan)
  }

  const closeModal = () => {
    setSelectedPlan(null)
  }

  const handleLanguageChange = (lang) => {
    setLanguage(lang)
    setShowLanguageMenu(false)
  }

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <h1 className="logo" onClick={() => navigate('/dashboard')}>🌾 Farmify</h1>
        <div className="nav-links">
          <Link to="/dashboard" className="nav-item">Feed</Link>
          <Link to="/weather" className="nav-item">Weather</Link>
          <Link to="/market" className="nav-item">Market</Link>
          <Link to="/resources" className="nav-item active">Resources</Link>
        </div>
        
        <div className="nav-actions">
          <div className="language-selector">
            <button 
              className="language-btn" 
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
            >
              🌐 {translations[language]?.name || 'English'}
            </button>
            {showLanguageMenu && (
              <div className="language-menu">
                {Object.keys(translations).map(lang => (
                  <button
                    key={lang}
                    className={`language-option ${language === lang ? 'active' : ''}`}
                    onClick={() => handleLanguageChange(lang)}
                  >
                    {translations[lang].name}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button className="account-btn" onClick={() => navigate('/account')}>
            <span className="avatar">👤</span>
            Account
          </button>
        </div>
      </nav>

      <main className="content resources-page">
        <section className="page-hero">
          <h2>{t('agriculturePlans')}</h2>
          <p>Comprehensive guides for different farming ventures with investment details and timelines</p>
        </section>

        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category}
              className={selectedCategory === category ? 'primary' : 'secondary'}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="plans-grid">
          {filteredPlans.map(plan => (
            <article key={plan.id} className="plan-card">
              <div className="plan-badge">{plan.category}</div>
              <h3>{plan.title}</h3>
              <div className="plan-meta">
                <span className="meta-item">
                  <strong>⏱️ Duration:</strong> {plan.duration}
                </span>
                <span className="meta-item">
                  <strong>💰 Investment:</strong> {plan.investment}
                </span>
                <span className="meta-item">
                  <strong>📈 ROI:</strong> {plan.roi}
                </span>
                <span className="meta-item">
                  <strong>🌱 Season:</strong> {plan.bestSeason}
                </span>
              </div>
              <p>{plan.description}</p>
              <div className="plan-subsidies">
                <strong>🎁 Government Benefits:</strong>
                <div className="subsidy-tags">
                  {plan.subsidies.slice(0, 2).map((sub, idx) => (
                    <span key={idx} className="subsidy-tag">{sub}</span>
                  ))}
                </div>
              </div>
              <button className="primary" onClick={() => handleViewDetails(plan)}>
                {t('viewDetails')}
              </button>
            </article>
          ))}
        </div>
      </main>

      {selectedPlan && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✕</button>
            <div className="modal-header">
              <div className="plan-badge">{selectedPlan.category}</div>
              <h2>{selectedPlan.title}</h2>
            </div>
            
            <div className="modal-body">
              <div className="plan-meta-detail">
                <div className="meta-detail-item">
                  <span className="meta-icon">⏱️</span>
                  <div>
                    <div className="meta-label">Duration</div>
                    <div className="meta-value">{selectedPlan.duration}</div>
                  </div>
                </div>
                <div className="meta-detail-item">
                  <span className="meta-icon">💰</span>
                  <div>
                    <div className="meta-label">Investment</div>
                    <div className="meta-value">{selectedPlan.investment}</div>
                  </div>
                </div>
                <div className="meta-detail-item">
                  <span className="meta-icon">📈</span>
                  <div>
                    <div className="meta-label">Expected ROI</div>
                    <div className="meta-value">{selectedPlan.roi}</div>
                  </div>
                </div>
                <div className="meta-detail-item">
                  <span className="meta-icon">🌱</span>
                  <div>
                    <div className="meta-label">Best Season</div>
                    <div className="meta-value">{selectedPlan.bestSeason}</div>
                  </div>
                </div>
              </div>

              <div className="plan-description">
                <h3>About This Plan</h3>
                <p>{selectedPlan.description}</p>
              </div>

              <div className="plan-steps">
                <h3>Detailed Steps</h3>
                <ol>
                  {selectedPlan.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ol>
              </div>

              <div className="plan-subsidies-detail">
                <h3>🎁 Government Subsidies & Support</h3>
                <ul>
                  {selectedPlan.subsidies.map((subsidy, idx) => (
                    <li key={idx}>{subsidy}</li>
                  ))}
                </ul>
              </div>

              <div className="plan-tips">
                <h3>💡 Pro Tips</h3>
                <ul>
                  <li>Start with soil testing to understand nutrient requirements</li>
                  <li>Maintain proper records of expenses and yields</li>
                  <li>Consult local agricultural experts for region-specific advice</li>
                  <li>Consider crop insurance to mitigate risks</li>
                  <li>Join farmer producer organizations (FPOs) for better market access</li>
                </ul>
              </div>

              <div className="plan-actions">
                <button className="primary" onClick={closeModal}>Got It!</button>
                <button className="secondary">Download PDF</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Resources
