import { useState } from 'react';

export default function GratitudeLight() {
  const [entries, setEntries] = useState([]);
  const [input, setInput] = useState('');
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!input.trim()) return;
    const newEntry = {
      text: input.trim(),
      date: new Date().toLocaleString(),
    };
    setEntries([newEntry, ...entries]);
    setInput('');
  };

  const generateSummary = () => {
    setLoading(true);
    setTimeout(() => {
      const allText = entries.map(e => e.text).join(' ');
      if (!allText) {
        setSummary("Add some gratitude first and I'll help reflect on it.");
      } else {
        setSummary("Your recent gratitude entries suggest you're finding joy in simple moments, meaningful connections, and small daily victories.");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-yellow-50 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Gratitude Light</h1>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 mb-8">
        <label className="block text-lg font-medium text-gray-700 mb-2">
          What were you grateful for today?
        </label>
        <textarea
          className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
          rows="3"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
        <button
          className="mt-4 bg-amber-400 hover:bg-amber-500 text-white font-semibold py-2 px-4 rounded-xl"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>

      <div className="w-full max-w-md mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Past Entries</h2>
        <ul className="space-y-3">
          {entries.map((entry, index) => (
            <li key={index} className="bg-white p-4 rounded-xl shadow">
              <p className="text-gray-800">{entry.text}</p>
              <p className="text-sm text-gray-500 mt-1">{entry.date}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Reflect</h2>
        <button
          className="mb-4 bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-xl"
          onClick={generateSummary}
        >
          Summarize My Gratitude
        </button>
        {loading && <p className="text-gray-500">Thinking...</p>}
        {summary && <p className="text-gray-700 mt-2 italic">{summary}</p>}
      </div>
    </div>
  );
}
