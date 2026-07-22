const { OpenAI } = require('openai');

// Initialize OpenAI client
// We allow a fallback or lazy initialization so that the server doesn't crash on startup if the key is not set yet
const getOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey === 'your_openai_api_key_here') {
    console.warn('WARNING: OPENAI_API_KEY is not configured or is the default value. Using mockup mode.');
    return null;
  }
  return new OpenAI({ apiKey });
};

/**
 * Call the Google Gemini API (gemini-1.5-flash) using native fetch
 */
const callGeminiAPI = async (prompt, systemInstruction = '', responseMimeType = 'text/plain') => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    throw new Error('GEMINI_API_KEY is not configured.');
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`;
  
  const payload = {
    contents: [
      {
        parts: [
          { text: prompt }
        ]
      }
    ]
  };

  if (systemInstruction) {
    payload.systemInstruction = {
      parts: [
        { text: systemInstruction }
      ]
    };
  }

  if (responseMimeType === 'application/json') {
    payload.generationConfig = {
      responseMimeType: 'application/json'
    };
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API error: ${response.status} ${response.statusText} - ${errText}`);
  }

  const data = await response.json();
  
  if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
    return data.candidates[0].content.parts[0].text;
  }
  
  throw new Error('Invalid response structure from Gemini API');
};

/**
 * Clean OpenAI Markdown formatting if present
 */
const cleanJSONResponse = (text) => {
  let cleaned = text.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.substring(7);
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.substring(3);
  }
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.substring(0, cleaned.length - 3);
  }
  return cleaned.trim();
};

/**
 * Generate 5 interview questions for a specific role and mode.
 * @param {string} targetRole 
 * @param {string} mode 
 * @returns {Promise<string[]>}
 */
const generateQuestions = async (targetRole, mode) => {
  const openai = getOpenAIClient();
  const geminiKey = process.env.GEMINI_API_KEY;

  if (!openai && (!geminiKey || geminiKey === 'your_gemini_api_key_here')) {
    // Mock backup questions for testing/demo
    console.log(`[MOCK MODE] Generating questions for Role: ${targetRole}, Mode: ${mode}`);
    return [
      `Can you explain your experience working as a ${targetRole} and some of the key technologies you've used?`,
      `How do you handle challenging problems or bugs in a production system?`,
      `Describe a time when you had a disagreement with a team member about technical implementation. How did you resolve it?`,
      `What is your approach to learning new technologies or frameworks quickly?`,
      `Why are you interested in working as a ${targetRole} and what do you hope to achieve here?`
    ];
  }

  if (geminiKey && geminiKey !== 'your_gemini_api_key_here') {
    try {
      console.log(`[GEMINI MODE] Generating questions for Role: ${targetRole}, Mode: ${mode}`);
      const systemInstruction = 'You are an expert technical recruiter. You must generate exactly 5 relevant interview questions for the specified role and interview mode. Return only a raw JSON array of strings containing the questions. Do not include markdown codeblocks, just the plain JSON array. Example output: ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5"]';
      const prompt = `Role: ${targetRole}\nMode: ${mode}`;
      
      const content = await callGeminiAPI(prompt, systemInstruction, 'application/json');
      const cleaned = cleanJSONResponse(content);
      const result = JSON.parse(cleaned);

      if (Array.isArray(result)) {
        return result;
      } else if (result.questions && Array.isArray(result.questions)) {
        return result.questions;
      } else if (typeof result === 'object') {
        const firstArrayKey = Object.keys(result).find(key => Array.isArray(result[key]));
        if (firstArrayKey) return result[firstArrayKey];
      }
      
      throw new Error('Response is not an array of questions');
    } catch (error) {
      console.error('Error generating questions via Gemini:', error);
      // Return high quality fallback questions if API fails
      return [
        `Could you describe a challenging scenario you encountered while working as a ${targetRole} and how you overcame it?`,
        `How do you ensure code quality, testability, and performance in your daily tasks?`,
        `Explain a concept related to ${mode} interviews that you think is commonly misunderstood.`,
        `Describe your ideal collaborative environment and how you contribute to team success.`,
        `What are your career goals for the next 2-3 years, and how does this role align with them?`
      ];
    }
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert technical recruiter. You must generate exactly 5 relevant interview questions for the specified role and interview mode. Return only a raw JSON array of strings containing the questions. Do not include markdown codeblocks, just the plain JSON array. Example output: ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5"]'
        },
        {
          role: 'user',
          content: `Role: ${targetRole}\nMode: ${mode}`
        }
      ],
      response_format: { type: 'json_object' }
    });

    const content = response.choices[0].message.content;
    const cleaned = cleanJSONResponse(content);
    const result = JSON.parse(cleaned);

    // If result is wrapped in an object like { "questions": [...] }, extract it
    if (Array.isArray(result)) {
      return result;
    } else if (result.questions && Array.isArray(result.questions)) {
      return result.questions;
    } else if (typeof result === 'object') {
      const firstArrayKey = Object.keys(result).find(key => Array.isArray(result[key]));
      if (firstArrayKey) return result[firstArrayKey];
    }
    
    throw new Error('Response is not an array of questions');
  } catch (error) {
    console.error('Error generating questions via OpenAI:', error);
    // Return high quality fallback questions if API fails
    return [
      `Could you describe a challenging scenario you encountered while working as a ${targetRole} and how you overcame it?`,
      `How do you ensure code quality, testability, and performance in your daily tasks?`,
      `Explain a concept related to ${mode} interviews that you think is commonly misunderstood.`,
      `Describe your ideal collaborative environment and how you contribute to team success.`,
      `What are your career goals for the next 2-3 years, and how does this role align with them?`
    ];
  }
};

/**
 * Evaluate a user's answer to a specific question.
 * @param {string} questionText 
 * @param {string} userAnswer 
 * @returns {Promise<{relevance: number, clarity: number, overall: number, feedback: string, suggestedAnswer: string}>}
 */
const evaluateAnswer = async (questionText, userAnswer) => {
  const openai = getOpenAIClient();
  const geminiKey = process.env.GEMINI_API_KEY;

  if (!openai && (!geminiKey || geminiKey === 'your_gemini_api_key_here')) {
    // Mock backup evaluation for testing/demo
    console.log('[MOCK MODE] Evaluating answer');
    const relevance = Math.floor(Math.random() * 20) + 75; // 75-95
    const clarity = Math.floor(Math.random() * 20) + 70; // 70-90
    const overall = Math.round((relevance + clarity) / 2);
    return {
      relevance,
      clarity,
      overall,
      feedback: `This is a mock feedback response since OpenAI API key is not configured. Your answer is relevant and hits on key concepts, but could benefit from more specific technical examples or structured delivery (like the STAR method).`,
      suggestedAnswer: `A great answer should outline: 1. The Situation, 2. The specific Task, 3. The Action you took, 4. The positive Result. For example: "In my previous role, we faced [problem]. I designed [solution] which improved performance by [percent]."`,
    };
  }

  if (geminiKey && geminiKey !== 'your_gemini_api_key_here') {
    try {
      console.log('[GEMINI MODE] Evaluating answer');
      const systemInstruction = 'You are an expert interviewer. Evaluate the user\'s response to the given question. Return a JSON object containing relevance (score 0-100), clarity (score 0-100), overall (score 0-100), feedback (detailed critique and guidance), and suggestedAnswer (a model exemplary answer the candidate could have given). Return ONLY raw JSON without any markdown tags.';
      const prompt = `Question: ${questionText}\nUser's Answer: ${userAnswer}`;
      
      const content = await callGeminiAPI(prompt, systemInstruction, 'application/json');
      const cleaned = cleanJSONResponse(content);
      return JSON.parse(cleaned);
    } catch (error) {
      console.error('Error evaluating answer via Gemini:', error);
      return {
        relevance: 50,
        clarity: 50,
        overall: 50,
        feedback: `Unable to generate real-time feedback due to a Gemini API error. Details: ${error.message}`,
        suggestedAnswer: 'Please check your Gemini API key configuration.'
      };
    }
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert interviewer. Evaluate the user\'s response to the given question. Return a JSON object containing relevance (score 0-100), clarity (score 0-100), overall (score 0-100), feedback (detailed critique and guidance), and suggestedAnswer (a model exemplary answer the candidate could have given). Return ONLY raw JSON without any markdown tags.'
        },
        {
          role: 'user',
          content: `Question: ${questionText}\nUser's Answer: ${userAnswer}`
        }
      ],
      response_format: { type: 'json_object' }
    });

    const content = response.choices[0].message.content;
    const cleaned = cleanJSONResponse(content);
    return JSON.parse(cleaned);
  } catch (error) {
    console.error('Error evaluating answer via OpenAI:', error);
    return {
      relevance: 50,
      clarity: 50,
      overall: 50,
      feedback: `Unable to generate real-time feedback due to an OpenAI API error. Details: ${error.message}`,
      suggestedAnswer: 'Please configure a valid OpenAI API key to view suggested answers.'
    };
  }
};

module.exports = {
  generateQuestions,
  evaluateAnswer
};
