# Chatbot Setup Guide

Your portfolio now includes an intelligent chatbot with intent routing and RAG (Retrieval Augmented Generation) capabilities!

## What's New

### 🚀 Features Added
- **Intent Routing**: Automatically categorizes user questions (about, projects, skills, experience, contact, fun, off-topic)
- **Knowledge Base**: Extracts information from your `data.js` to answer questions accurately
- **RAG System**: Uses embeddings to find relevant information for better responses
- **Fallback System**: Works without OpenAI API key using local responses

### 📁 Files Created
- `src/app/utils/intent.js` - Intent classification and routing
- `src/app/utils/knowledgeBase.js` - Knowledge extraction from your data
- `src/app/api/chat/route.js` - API endpoint with OpenAI integration
- `src/app/components/ChatBot/ChatBot.js` - Updated to use new API
- `.env.example` - Environment variables template

## Setup Instructions

### Option 1: With OpenAI Integration (Recommended)

1. **Install OpenAI Package**
   ```bash
   npm install openai
   ```

2. **Get OpenAI API Key**
   - Visit [OpenAI API Keys](https://platform.openai.com/api-keys)
   - Create a new API key
   - Copy the key

3. **Configure Environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local and add your OpenAI API key
   ```

4. **Restart Development Server**
   ```bash
   npm run dev
   ```

### Option 2: Without OpenAI (Fallback Mode)

The chatbot will automatically use fallback responses based on your data.js content. No additional setup required!

## How It Works

### Intent Classification
User queries are automatically routed to appropriate categories:
- **About**: Personal background and bio
- **Projects**: Portfolio projects and details
- **Skills**: Technical abilities and tools
- **Experience**: Education and work experience
- **Contact**: How to reach you
- **Fun**: Personal interests and hobbies
- **Off-topic**: Redirects non-portfolio questions

### Knowledge Base
The system extracts information from your `data.js`:
- DataArray → Project details, technologies, and skills
- Automatically categorizes skills from project tech stacks
- Converts to searchable text passages for RAG

### Response Generation
1. **Intent routing** determines question category
2. **Embedding search** finds relevant knowledge (with OpenAI)
3. **Chat completion** generates contextual response
4. **Fallback responses** used if OpenAI unavailable

## Customization

### Adding New Intents
Edit `src/app/utils/intent.js`:
```javascript
// Add new intent type
export const INTENT_TYPES = {
  // ... existing intents
  NEW_INTENT: "new_intent"
};

// Add pattern matching
if (/\b(new|pattern|keywords)\b/.test(s)) {
  return INTENT_TYPES.NEW_INTENT;
}
```

### Updating Knowledge Base
Edit `src/app/data.js` to update your projects and information. The knowledge base automatically extracts skills from your project tech stacks and reflects changes.

### Customizing Responses
Edit fallback responses in `src/app/api/chat/route.js` in the `getLocalResponse` function.

## Testing

Test the chatbot with these example queries:
- "Who are you?"
- "Tell me about your projects"
- "What technologies do you use?"
- "How can I contact you?"
- "What's your experience?"

## Troubleshooting

### Common Issues
1. **API not responding**: Check if server is running and API route exists
2. **OpenAI errors**: Verify API key in `.env.local`
3. **Slow responses**: Normal for first request (building embeddings index)

### Debug Mode
Check browser console for detailed error messages and API responses.

## Production Deployment

### Environment Variables
Ensure `OPENAI_API_KEY` is set in your production environment.

### Vercel Deployment
Add environment variables in Vercel dashboard under Project Settings → Environment Variables.

### Performance Considerations
- Embeddings are cached in memory (resets on server restart)
- Consider Redis or database for persistent caching in production
- Rate limiting recommended for public deployments

## Cost Optimization

The system uses:
- `text-embedding-3-small` for embeddings (~$0.00002/1K tokens)
- `gpt-4o-mini` for responses (~$0.00015/1K tokens)

Typical conversation costs < $0.01 per interaction.

---

Your chatbot is now ready! It will intelligently answer questions about your portfolio using your actual project data and skills. 🎉
