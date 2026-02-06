# ClearView Backend

An Express.js backend API for the ClearView AI reader application. Adapts and transforms text content into multiple formats using OpenAI's GPT.

## Features

- **Content Adaptation**: Convert text into multiple formats
  - Summarize: Get concise summaries of content
  - Bullets: Convert to clear bullet points
  - Readable: Enhance readability and clarity
  - ELI5: Explain concepts like you're five
  - Professional: Convert to professional language
  
- **URL Support**: Extract and process content from URLs
- **CORS Enabled**: Ready for frontend integration
- **Environment Configuration**: Secure API key management with dotenv

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key

### Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```env
OPENAI_KEY=your_openai_api_key_here
```

3. Start the server:
```bash
node server.js
```

The server will run on the configured port (default: typically 5000 based on your setup).

## API Endpoints

### POST `/api/adapt`

Adapts provided text into different formats using AI.

**Request Body:**
```json
{
  "text": "Your text content here",
  "url": "https://optional-url.com",
  "mode": "summarize|bullets|readable|eli5|professional"
}
```

**Response:**
```json
{
  "result": "Adapted content based on the selected mode"
}
```

**Modes:**
- `summarize` - Create a concise summary
- `bullets` - Convert to bullet points
- `readable` - Improve clarity and readability
- `eli5` - Explain in simple terms
- `professional` - Formal professional language

**Example:**
```bash
curl -X POST http://localhost:5000/api/adapt \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Quantum computing uses quantum bits...",
    "mode": "summarize"
  }'
```

## Project Structure

```
clearview-backend/
├── server.js           # Main server file
├── package.json        # Dependencies and project metadata
├── .env                # Environment variables (not committed)
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## Dependencies

- **express**: Web framework
- **cors**: Cross-Origin Resource Sharing middleware
- **dotenv**: Environment variable management
- **openai**: OpenAI API client

## Environment Variables

- `OPENAI_KEY` - Your OpenAI API key (required)

## Security Notes

⚠️ **Important**: Never commit your `.env` file to version control. It's already in `.gitignore`.

## Development

To modify the server behavior:
1. Edit `server.js`
2. Restart the server with `node server.js`

## Future Enhancements

- [ ] URL scraping and content extraction
- [ ] Caching for repeated requests
- [ ] Rate limiting
- [ ] User authentication
- [ ] Request logging and analytics
- [ ] Additional AI transformation modes

## License

ISC

## Author

ClearView Team
