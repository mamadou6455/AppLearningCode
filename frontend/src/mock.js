// Mock data pour la plateforme de formation
export const programmingLanguages = [
  {
    id: 'html',
    name: 'HTML',
    description: 'Langage de balisage pour créer des pages web',
    icon: '🌐',
    color: 'bg-gradient-to-br from-orange-500 to-red-500',
    difficulty: 'Débutant',
    totalLessons: 12,
    estimatedTime: '8 heures'
  },
  {
    id: 'css',
    name: 'CSS',
    description: 'Langage de style pour la mise en forme web',
    icon: '🎨',
    color: 'bg-gradient-to-br from-blue-500 to-cyan-500',
    difficulty: 'Débutant',
    totalLessons: 15,
    estimatedTime: '12 heures'
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    description: 'Langage de programmation pour l\'interactivité web',
    icon: '⚡',
    color: 'bg-gradient-to-br from-yellow-500 to-orange-500',
    difficulty: 'Intermédiaire',
    totalLessons: 20,
    estimatedTime: '25 heures'
  },
  {
    id: 'python',
    name: 'Python',
    description: 'Langage polyvalent pour développement et data science',
    icon: '🐍',
    color: 'bg-gradient-to-br from-green-500 to-emerald-500',
    difficulty: 'Débutant',
    totalLessons: 18,
    estimatedTime: '20 heures'
  },
  {
    id: 'php',
    name: 'PHP',
    description: 'Langage serveur pour le développement web',
    icon: '🔧',
    color: 'bg-gradient-to-br from-purple-500 to-indigo-500',
    difficulty: 'Intermédiaire',
    totalLessons: 16,
    estimatedTime: '18 heures'
  },
  {
    id: 'java',
    name: 'Java',
    description: 'Langage orienté objet pour applications enterprise',
    icon: '☕',
    color: 'bg-gradient-to-br from-red-600 to-orange-600',
    difficulty: 'Avancé',
    totalLessons: 24,
    estimatedTime: '35 heures'
  }
];

export const lessons = {
  html: [
    {
      id: 1,
      title: 'Introduction à HTML',
      content: `
        <h2>Qu'est-ce que HTML ?</h2>
        <p>HTML (HyperText Markup Language) est le langage de balisage standard pour créer des pages web.</p>
        
        <h3>Structure de base :</h3>
        <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Ma première page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Bonjour le monde !&lt;/h1&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
        
        <h3>Les balises essentielles :</h3>
        <ul>
          <li><strong>&lt;h1&gt; à &lt;h6&gt;</strong> : Titres de différents niveaux</li>
          <li><strong>&lt;p&gt;</strong> : Paragraphes</li>
          <li><strong>&lt;a&gt;</strong> : Liens hypertexte</li>
          <li><strong>&lt;img&gt;</strong> : Images</li>
        </ul>
      `,
      duration: 30
    },
    {
      id: 2,
      title: 'Les balises de texte',
      content: `
        <h2>Formatage du texte en HTML</h2>
        
        <h3>Exemples de balises de texte :</h3>
        <pre><code>&lt;h1&gt;Titre principal&lt;/h1&gt;
&lt;p&gt;Un paragraphe normal&lt;/p&gt;
&lt;strong&gt;Texte en gras&lt;/strong&gt;
&lt;em&gt;Texte en italique&lt;/em&gt;
&lt;mark&gt;Texte surligné&lt;/mark&gt;</code></pre>
        
        <p>Ces balises permettent de structurer et mettre en forme le contenu textuel de vos pages web.</p>
      `,
      duration: 25
    }
  ],
  javascript: [
    {
      id: 1,
      title: 'Variables et types de données',
      content: `
        <h2>Les variables en JavaScript</h2>
        
        <h3>Déclaration de variables :</h3>
        <pre><code>let nom = "Alice";
const age = 25;
var ville = "Paris";</code></pre>
        
        <h3>Types de données :</h3>
        <ul>
          <li><strong>String</strong> : "Chaîne de caractères"</li>
          <li><strong>Number</strong> : 42, 3.14</li>
          <li><strong>Boolean</strong> : true, false</li>
          <li><strong>Array</strong> : [1, 2, 3]</li>
          <li><strong>Object</strong> : {nom: "Alice", age: 25}</li>
        </ul>
      `,
      duration: 35
    }
  ]
};

export const quizzes = {
  html: [
    {
      id: 1,
      lessonId: 1,
      question: "Quelle balise définit le titre principal d'une page ?",
      options: ["<title>", "<h1>", "<header>", "<main>"],
      correctAnswer: 1,
      explanation: "La balise <h1> définit le titre principal visible sur la page."
    },
    {
      id: 2,
      lessonId: 1,
      question: "Que signifie HTML ?",
      options: [
        "Hyper Transfer Markup Language",
        "HyperText Markup Language", 
        "High Tech Modern Language",
        "Hyper Technical Meta Language"
      ],
      correctAnswer: 1,
      explanation: "HTML signifie HyperText Markup Language."
    }
  ],
  javascript: [
    {
      id: 1,
      lessonId: 1,
      question: "Quelle est la différence entre 'let' et 'const' ?",
      options: [
        "Aucune différence",
        "let est pour les nombres, const pour les chaînes",
        "const ne peut pas être réassigné après déclaration",
        "let est plus rapide que const"
      ],
      correctAnswer: 2,
      explanation: "Une variable déclarée avec 'const' ne peut pas être réassignée après sa déclaration initiale."
    }
  ]
};

export const badges = [
  {
    id: 'html_starter',
    name: 'Débutant HTML',
    description: 'Première leçon HTML terminée',
    icon: '🌱',
    condition: { language: 'html', lessonsCompleted: 1 }
  },
  {
    id: 'html_master',
    name: 'Maître HTML',
    description: 'Toutes les leçons HTML terminées',
    icon: '👑',
    condition: { language: 'html', lessonsCompleted: 12 }
  },
  {
    id: 'quiz_champion',
    name: 'Champion Quiz',
    description: '10 quiz réussis avec 100%',
    icon: '🏆',
    condition: { perfectQuizzes: 10 }
  },
  {
    id: 'polyglot',
    name: 'Polyglotte',
    description: '3 langages commencés',
    icon: '🌍',
    condition: { languagesStarted: 3 }
  }
];

// Données de progression utilisateur (simulées avec localStorage)
export const getUserProgress = () => {
  const saved = localStorage.getItem('codelearning_progress');
  if (saved) {
    return JSON.parse(saved);
  }
  
  const defaultProgress = {
    completedLessons: [],
    quizScores: {},
    earnedBadges: [],
    currentStreak: 0,
    totalPoints: 0,
    languageProgress: {}
  };
  
  localStorage.setItem('codelearning_progress', JSON.stringify(defaultProgress));
  return defaultProgress;
};

export const saveUserProgress = (progress) => {
  localStorage.setItem('codelearning_progress', JSON.stringify(progress));
};

export const updateLessonProgress = (languageId, lessonId) => {
  const progress = getUserProgress();
  const lessonKey = `${languageId}_${lessonId}`;
  
  if (!progress.completedLessons.includes(lessonKey)) {
    progress.completedLessons.push(lessonKey);
    progress.totalPoints += 10;
    
    // Mise à jour du progrès par langage
    if (!progress.languageProgress[languageId]) {
      progress.languageProgress[languageId] = { completed: 0, total: programmingLanguages.find(l => l.id === languageId)?.totalLessons || 0 };
    }
    progress.languageProgress[languageId].completed += 1;
  }
  
  saveUserProgress(progress);
  return progress;
};

export const updateQuizScore = (languageId, lessonId, score, maxScore) => {
  const progress = getUserProgress();
  const quizKey = `${languageId}_${lessonId}`;
  
  progress.quizScores[quizKey] = { score, maxScore, percentage: Math.round((score / maxScore) * 100) };
  
  if (score === maxScore) {
    progress.totalPoints += 5; // Bonus pour score parfait
  }
  
  saveUserProgress(progress);
  return progress;
};