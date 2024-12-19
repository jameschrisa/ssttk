import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Welcome from './components/Welcome';
import TermsOfUse from './components/TermsOfUse';
import AssessmentFlow from './components/AssessmentFlow';
import DataCollectionManager from './components/DataCollectionManager';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/welcome" replace />} />
          <Route path="welcome" element={<Welcome />} />
          <Route path="terms" element={<TermsOfUse />} />
          <Route path="assessment/:pageId" element={<AssessmentFlow />} />
          <Route path="data-collection" element={<DataCollectionManager />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
