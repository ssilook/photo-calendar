import { useState } from 'react';
import { CalendarProvider } from './contexts/CalendarContext';
import { useCalendar } from './contexts/CalendarContext';
import { useAutoSave, loadFromLocalStorage } from './hooks/useLocalStorage';
import { createInitialState } from './reducers/calendarReducer';
import { Toolbar } from './components/UI/Toolbar';
import { MonthEditor } from './components/Editor/MonthEditor';
import { PrintPreview } from './components/PrintPreview/PrintPreview';
import './App.css';

function AppContent() {
  const { state } = useCalendar();
  const [showPrintPreview, setShowPrintPreview] = useState(false);

  useAutoSave(state);

  const handleShowPrintPreview = () => {
    setShowPrintPreview(true);
  };

  const handleBackToEditor = () => {
    setShowPrintPreview(false);
  };

  if (showPrintPreview) {
    return <PrintPreview onBack={handleBackToEditor} />;
  }

  return (
    <div className="app">
      <Toolbar onShowPrintPreview={handleShowPrintPreview} />
      <main className="app-main">
        <MonthEditor />
      </main>
    </div>
  );
}

function App() {
  const savedState = loadFromLocalStorage();
  const initialState = savedState || createInitialState();

  return (
    <CalendarProvider initialState={initialState}>
      <AppContent />
    </CalendarProvider>
  );
}

export default App;
