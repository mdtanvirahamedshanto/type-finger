# TypeFinger

TypeFinger is an interactive typing practice application designed to help users improve their typing speed and accuracy. With customizable themes, multiple language support, and detailed performance tracking, TypeFinger provides a comprehensive platform for typing skill development.

## Features

- **Multiple Language Support**: Practice typing in English and Bangla
- **Customizable Themes**: Choose from various themes to personalize your typing experience
- **Real-time Performance Tracking**: Monitor your WPM, accuracy, and errors as you type
- **Performance Graphs**: Visualize your typing performance over time
- **User Accounts**: Create an account to save your progress and track improvements
- **Leaderboards**: Compete with other users and see how you rank
- **Customizable Test Settings**: Adjust test duration, word count, and more

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- MongoDB (for user accounts and data storage)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/type-finger.git
   cd type-finger
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Copy the `.env.example` file to `.env.local` and fill in your MongoDB URI and other required variables:
   ```bash
   cp .env.example .env.local
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
/
├── public/           # Static assets
├── src/
│   ├── app/          # Next.js app router pages
│   ├── components/   # React components
│   ├── data/         # Static data files
│   ├── lib/          # Utility functions and libraries
│   └── models/       # MongoDB models
└── ...
```

## Technologies Used

- **Frontend**: Next.js, React, TailwindCSS, Chart.js
- **Backend**: Next.js API routes
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **Styling**: TailwindCSS

## Contributing

Contributions are welcome! Please see our [Contributing Guidelines](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by [MonkeyType](https://monkeytype.com/)
- Font icons from [Vercel](https://vercel.com/font)
