import { logger } from 'firebase-functions';

interface SentimentResult {
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number; // -1 to 1
  confidence: number; // 0 to 1
}

export class SentimentService {
  private positiveWords = [
    'bon', 'bien', 'excellent', 'super', 'génial', 'merci', 'bravo',
    'heureux', 'content', 'satisfait', 'amélioration', 'progrès',
    'succès', 'réussite', 'victoire', 'paix', 'sécurité', 'développement',
    'good', 'great', 'excellent', 'amazing', 'love', 'happy', 'peace'
  ];

  private negativeWords = [
    'mauvais', 'mal', 'terrible', 'horrible', 'problème', 'crise',
    'danger', 'échec', 'corruption', 'violence', 'guerre', 'conflit',
    'mort', 'blessé', 'attaque', 'peur', 'inquiétude', 'colère',
    'bad', 'terrible', 'horrible', 'hate', 'angry', 'war', 'death'
  ];

  private intensifiers = [
    'très', 'beaucoup', 'extrêmement', 'vraiment', 'trop',
    'very', 'extremely', 'really', 'too', 'so'
  ];

  /**
   * Analyze sentiment of text
   * This is a basic implementation for MVP - can be replaced with ML service later
   */
  async analyzeSentiment(text: string): Promise<SentimentResult> {
    try {
      const normalizedText = text.toLowerCase();
      const words = normalizedText.split(/\s+/);

      let positiveScore = 0;
      let negativeScore = 0;
      let intensifierCount = 0;

      // Count sentiment words
      words.forEach((word, index) => {
        // Check for intensifiers
        if (this.intensifiers.includes(word)) {
          intensifierCount++;
        }

        // Check positive words
        if (this.positiveWords.some(pw => word.includes(pw))) {
          positiveScore += 1 + (intensifierCount * 0.5);
          intensifierCount = 0; // Reset after use
        }

        // Check negative words
        if (this.negativeWords.some(nw => word.includes(nw))) {
          negativeScore += 1 + (intensifierCount * 0.5);
          intensifierCount = 0; // Reset after use
        }
      });

      // Calculate final sentiment
      const totalScore = positiveScore + negativeScore;
      if (totalScore === 0) {
        return {
          sentiment: 'neutral',
          score: 0,
          confidence: 0.5
        };
      }

      const sentimentScore = (positiveScore - negativeScore) / totalScore;
      const confidence = Math.min(totalScore / words.length, 1);

      let sentiment: 'positive' | 'negative' | 'neutral';
      if (sentimentScore > 0.1) {
        sentiment = 'positive';
      } else if (sentimentScore < -0.1) {
        sentiment = 'negative';
      } else {
        sentiment = 'neutral';
      }

      return {
        sentiment,
        score: sentimentScore,
        confidence
      };

    } catch (error) {
      logger.error('Error analyzing sentiment:', error);
      return {
        sentiment: 'neutral',
        score: 0,
        confidence: 0
      };
    }
  }

  /**
   * Batch analyze sentiments
   */
  async analyzeBatch(texts: string[]): Promise<SentimentResult[]> {
    return Promise.all(texts.map(text => this.analyzeSentiment(text)));
  }

  /**
   * Enhanced sentiment analysis with context
   * Can be extended with more sophisticated logic
   */
  async analyzeWithContext(
    text: string, 
    context?: {
      author?: string;
      location?: string;
      previousSentiments?: SentimentResult[];
    }
  ): Promise<SentimentResult> {
    // Basic analysis first
    const baseSentiment = await this.analyzeSentiment(text);

    // Apply context modifiers if available
    if (context?.previousSentiments && context.previousSentiments.length > 0) {
      // If author has consistent sentiment history, give it slight weight
      const avgPreviousSentiment = context.previousSentiments.reduce(
        (sum, s) => sum + s.score, 0
      ) / context.previousSentiments.length;

      // Blend with historical sentiment (20% weight)
      baseSentiment.score = baseSentiment.score * 0.8 + avgPreviousSentiment * 0.2;
    }

    return baseSentiment;
  }

  /**
   * Extract key emotional indicators
   */
  extractEmotions(text: string): string[] {
    const emotions = [];
    const normalizedText = text.toLowerCase();

    const emotionPatterns = {
      anger: ['colère', 'furieux', 'angry', 'mad', 'rage'],
      joy: ['joie', 'heureux', 'happy', 'joy', 'glad'],
      fear: ['peur', 'effrayé', 'scared', 'afraid', 'fear'],
      sadness: ['triste', 'malheureux', 'sad', 'unhappy', 'depressed'],
      surprise: ['surpris', 'étonné', 'surprised', 'shocked', 'amazed']
    };

    for (const [emotion, patterns] of Object.entries(emotionPatterns)) {
      if (patterns.some(pattern => normalizedText.includes(pattern))) {
        emotions.push(emotion);
      }
    }

    return emotions;
  }
}