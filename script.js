// Constants and configurations
const API_KEY = 'YOUR_OPENAI_API_KEY'; // Replace with your actual API key
const TRANSLATION_API_KEY = 'YOUR_TRANSLATION_API_KEY'; // Replace with your actual translation API key

// DOM Elements
const generateBtn = document.getElementById('generate-btn');
const enhanceBtn = document.getElementById('enhance-btn');
const analyzeBtn = document.getElementById('analyze-btn');
const saveBtn = document.getElementById('save-btn');
const shareBtn = document.getElementById('share-btn');
const langSwitch = document.getElementById('lang-switch');
const languageSwitch = document.getElementById('language-switch');

// Event Listeners
if (generateBtn) generateBtn.addEventListener('click', generateIdea);
if (enhanceBtn) enhanceBtn.addEventListener('click', enhanceIdea);
if (analyzeBtn) analyzeBtn.addEventListener('click', analyzeMarket);
if (saveBtn) saveBtn.addEventListener('click', saveIdea);
if (shareBtn) shareBtn.addEventListener('click', shareIdea);
if (langSwitch) langSwitch.addEventListener('click', toggleLanguage);
if (languageSwitch) languageSwitch.addEventListener('click', toggleLanguage);

// Language state
let currentLanguage = 'ar';
const translations = {
    ar: {
        title: 'موقع مولد أفكار المشاريع الذكي',
        generate: 'توليد فكرة جديدة',
        enhance: 'تحسين الفكرة',
        analyze: 'تحليل السوق',
        save: 'حفظ الفكرة',
        share: 'مشاركة',
        savedIdeas: 'الأفكار المحفوظة',
        chooseCategory: 'اختر الفئة',
        techProjects: 'مشاريع تقنية',
        mobileApps: 'تطبيقات موبايل',
        newProducts: 'منتجات جديدة',
        aiProjects: 'مشاريع الذكاء الاصطناعي',
        sustainabilityProjects: 'مشاريع مستدامة',
        suggestedIdea: 'الفكرة المقترحة:',
        ideaDetails: 'تفاصيل الفكرة:',
        generateIdeaPrompt: 'اضغط على زر توليد الفكرة للحصول على فكرة جديدة.',
        backToHome: 'العودة للرئيسية',
        ideaGenerator: 'مولد الأفكار',
        // Landing page translations
        landingTitle: 'موقع مولد أفكار المشاريع الذكي',
        landingDescription: 'اكتشف أفكار مشاريع مبتكرة باستخدام الذكاء الاصطناعي',
        aiFeature: 'ذكاء اصطناعي',
        marketAnalysisFeature: 'تحليل السوق',
        multilingualFeature: 'ترجمة متعددة اللغات',
        startNow: 'ابدأ الآن',
        loveMessage: 'أحبك نواف ❤️',
        // New button translations
        startButton: 'ابدأ الآن',
        savedIdeasButton: 'الأفكار المحفوظة',
        marketAnalysisButton: 'تحليل السوق'
    },
    en: {
        title: 'Smart Project Idea Generator',
        generate: 'Generate New Idea',
        enhance: 'Enhance Idea',
        analyze: 'Market Analysis',
        save: 'Save Idea',
        share: 'Share',
        savedIdeas: 'Saved Ideas',
        chooseCategory: 'Choose Category',
        techProjects: 'Tech Projects',
        mobileApps: 'Mobile Apps',
        newProducts: 'New Products',
        aiProjects: 'AI Projects',
        sustainabilityProjects: 'Sustainability Projects',
        suggestedIdea: 'Suggested Idea:',
        ideaDetails: 'Idea Details:',
        generateIdeaPrompt: 'Click the generate button to get a new idea.',
        backToHome: 'Back to Home',
        ideaGenerator: 'Idea Generator',
        // Landing page translations
        landingTitle: 'Smart Project Idea Generator',
        landingDescription: 'Discover innovative project ideas using artificial intelligence',
        aiFeature: 'Artificial Intelligence',
        marketAnalysisFeature: 'Market Analysis',
        multilingualFeature: 'Multilingual Translation',
        startNow: 'Start Now',
        loveMessage: 'I love you Nawaf ❤️',
        // New button translations
        startButton: 'Start Now',
        savedIdeasButton: 'Saved Ideas',
        marketAnalysisButton: 'Market Analysis'
    }
};

// Idea categories with more detailed ideas
const ideas = {
    tech: [
        'تطبيق ذكاء اصطناعي لتحليل المشاعر في وسائل التواصل الاجتماعي',
        'منصة تعليمية تفاعلية تستخدم الواقع المعزز',
        'نظام ذكي لإدارة الطاقة في المنازل'
    ],
    mobile: [
        'تطبيق لتعلم اللغات باستخدام الذكاء الاصطناعي',
        'منصة لمشاركة الخبرات المهنية بين المحترفين',
        'تطبيق لإدارة المهام الذكية'
    ],
    product: [
        'منتج ذكي لتنقية الهواء باستخدام تقنية النانو',
        'جهاز تتبع اللياقة البدنية المتقدم',
        'منتج صديق للبيئة لتحويل النفايات إلى طاقة'
    ],
    ai: [
        'نظام ذكي للتنبؤ بأسعار الأسهم',
        'روبوت ذكي للمساعدة في التعليم',
        'منصة ذكاء اصطناعي لتحليل البيانات الطبية'
    ],
    sustainability: [
        'منصة لمشاركة الموارد المستدامة',
        'نظام ذكي لإدارة النفايات',
        'منتج لتحويل الطاقة الشمسية بكفاءة عالية'
    ]
};

// Generate idea using AI
async function generateIdea() {
    const category = document.getElementById('category-select').value;
    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: "gpt-3.5-turbo",
            prompt: `Generate a creative business idea in the ${category} category. Include a brief description and potential market opportunities.`,
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const idea = response.data.choices[0].text.trim();
        document.getElementById('idea-text').textContent = idea;
        document.getElementById('idea-details').style.display = 'block';
    } catch (error) {
        // Fallback to local ideas if API fails
        const randomIdea = ideas[category][Math.floor(Math.random() * ideas[category].length)];
        document.getElementById('idea-text').textContent = randomIdea;
    }
}

// Enhance idea
async function enhanceIdea() {
    const ideaText = document.getElementById('idea-text').textContent;
    if (ideaText === translations[currentLanguage].generateIdeaPrompt) return;

    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: "gpt-3.5-turbo",
            prompt: `Enhance and improve this business idea: ${ideaText}. Make it more innovative, feasible, and marketable.`,
            max_tokens: 200
        }, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        document.getElementById('idea-text').textContent = response.data.choices[0].text.trim();
    } catch (error) {
        alert(currentLanguage === 'ar' ? 'حدث خطأ في تحسين الفكرة. يرجى المحاولة مرة أخرى.' : 'Error enhancing idea. Please try again.');
    }
}

// Analyze market
async function analyzeMarket() {
    const ideaText = document.getElementById('idea-text').textContent;
    if (ideaText === 'اضغط على زر توليد الفكرة للحصول على فكرة جديدة.') return;

    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: "gpt-3.5-turbo",
            prompt: `Analyze the market potential for this business idea: ${ideaText}. Include market size, competition, and growth opportunities.`,
            max_tokens: 200
        }, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        document.getElementById('market-analysis').innerHTML = `<p>${response.data.choices[0].text.trim()}</p>`;
    } catch (error) {
        alert('حدث خطأ في تحليل السوق. يرجى المحاولة مرة أخرى.');
    }
}

// Save idea
function saveIdea() {
    const ideaText = document.getElementById('idea-text').textContent;
    if (ideaText === 'اضغط على زر توليد الفكرة للحصول على فكرة جديدة.') return;

    let savedIdeas = JSON.parse(localStorage.getItem('savedIdeas') || '[]');
    savedIdeas.push({
        text: ideaText,
        date: new Date().toISOString(),
        category: document.getElementById('category-select').value
    });
    localStorage.setItem('savedIdeas', JSON.stringify(savedIdeas));
    updateSavedIdeasList();
}

// Share idea
function shareIdea() {
    const ideaText = document.getElementById('idea-text').textContent;
    if (ideaText === 'اضغط على زر توليد الفكرة للحصول على فكرة جديدة.') return;

    if (navigator.share) {
        navigator.share({
            title: 'فكرة مشروع جديدة',
            text: ideaText
        }).catch(console.error);
    } else {
        // Fallback for browsers that don't support Web Share API
        const textArea = document.createElement('textarea');
        textArea.value = ideaText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('تم نسخ الفكرة إلى الحافظة');
    }
}

// Toggle language
function toggleLanguage() {
    currentLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    
    // Update language switch button text
    const languageSwitchBtn = document.getElementById('language-switch');
    if (languageSwitchBtn) {
        const spanElement = languageSwitchBtn.querySelector('span');
        if (spanElement) {
            spanElement.textContent = currentLanguage === 'ar' ? 'English' : 'العربية';
        }
    }
    
    // Update UI language
    updateUILanguage();
}

// Update UI language
function updateUILanguage() {
    // Update title
    document.title = translations[currentLanguage].title;
    
    // Update buttons
    if (generateBtn) generateBtn.innerHTML = `<i class="fas fa-magic"></i> ${translations[currentLanguage].generate}`;
    if (enhanceBtn) enhanceBtn.innerHTML = `<i class="fas fa-wand-magic-sparkles"></i> ${translations[currentLanguage].enhance}`;
    if (analyzeBtn) analyzeBtn.innerHTML = `<i class="fas fa-chart-line"></i> ${translations[currentLanguage].analyze}`;
    if (saveBtn) saveBtn.innerHTML = `<i class="fas fa-bookmark"></i> ${translations[currentLanguage].save}`;
    if (shareBtn) shareBtn.innerHTML = `<i class="fas fa-share-alt"></i> ${translations[currentLanguage].share}`;
    
    // Update landing page elements if they exist
    const landingTitle = document.querySelector('.landing-container h1');
    if (landingTitle) landingTitle.textContent = translations[currentLanguage].landingTitle;
    
    const landingDescription = document.querySelector('.landing-description');
    if (landingDescription) landingDescription.textContent = translations[currentLanguage].landingDescription;
    
    const loveMessage = document.querySelector('.love-message');
    if (loveMessage) loveMessage.textContent = translations[currentLanguage].loveMessage;
    
    // Update action buttons on landing page
    const startButton = document.querySelector('.action-button.primary span');
    if (startButton) startButton.textContent = translations[currentLanguage].startButton;
    
    const savedIdeasButton = document.querySelector('.action-button.secondary span');
    if (savedIdeasButton) savedIdeasButton.textContent = translations[currentLanguage].savedIdeasButton;
    
    const marketAnalysisButton = document.querySelector('.action-button.tertiary span');
    if (marketAnalysisButton) marketAnalysisButton.textContent = translations[currentLanguage].marketAnalysisButton;
    
    // Update features
    const features = document.querySelectorAll('.feature span');
    if (features.length >= 3) {
        features[0].textContent = translations[currentLanguage].aiFeature;
        features[1].textContent = translations[currentLanguage].marketAnalysisFeature;
        features[2].textContent = translations[currentLanguage].multilingualFeature;
    }
    
    // Update idea generator page elements
    const ideaGeneratorTitle = document.querySelector('.page-header h1');
    if (ideaGeneratorTitle) ideaGeneratorTitle.textContent = translations[currentLanguage].ideaGenerator;
    
    const backButton = document.querySelector('.back-btn span');
    if (backButton) backButton.textContent = translations[currentLanguage].backToHome;
    
    const ideaText = document.getElementById('idea-text');
    if (ideaText && ideaText.textContent === translations['ar'].generateIdeaPrompt) {
        ideaText.textContent = translations[currentLanguage].generateIdeaPrompt;
    }
    
    // Update saved ideas section
    const savedIdeasTitle = document.querySelector('.saved-ideas .section-title h3');
    if (savedIdeasTitle) savedIdeasTitle.textContent = translations[currentLanguage].savedIdeas;
    
    // Update idea details section
    const ideaDetailsTitle = document.querySelector('.idea-details .section-title h3');
    if (ideaDetailsTitle) ideaDetailsTitle.textContent = translations[currentLanguage].ideaDetails;
}

// Update saved ideas list
function updateSavedIdeasList() {
    const savedIdeasList = document.getElementById('saved-ideas-list');
    if (!savedIdeasList) return;
    
    const savedIdeas = JSON.parse(localStorage.getItem('savedIdeas') || '[]');
    savedIdeasList.innerHTML = '';
    
    if (savedIdeas.length === 0) {
        savedIdeasList.innerHTML = '<p>لا توجد أفكار محفوظة</p>';
        return;
    }
    
    savedIdeas.reverse().forEach(idea => {
        const ideaElement = document.createElement('div');
        ideaElement.className = 'saved-idea';
        
        const date = new Date(idea.date);
        const formattedDate = date.toLocaleDateString(currentLanguage === 'ar' ? 'ar-SA' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        ideaElement.innerHTML = `
            <p>${idea.text}</p>
            <small>${formattedDate} - ${translations[currentLanguage][idea.category] || idea.category}</small>
        `;
        
        savedIdeasList.appendChild(ideaElement);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateUILanguage();
    updateSavedIdeasList();
});
