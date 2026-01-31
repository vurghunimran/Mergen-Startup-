import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ClientAuth from './pages/ClientAuth'
import CommunityAuth from './pages/CommunityAuth'
import ClientDashboard from './pages/ClientDashboard'
import CreateSurvey from './pages/CreateSurvey'
import ReportView from './pages/ReportView'
import CommunityDashboard from './pages/CommunityDashboard'
import SurveyTaker from './pages/SurveyTaker'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login/client" element={<ClientAuth />} />
                <Route path="/signup/client" element={<ClientAuth />} />
                <Route path="/login/community" element={<CommunityAuth />} />
                <Route path="/signup/community" element={<CommunityAuth />} />
                <Route path="/client/dashboard" element={<ClientDashboard />} />
                <Route path="/client/create-survey" element={<CreateSurvey />} />
                <Route path="/client/report/:id" element={<ReportView />} />
                <Route path="/community/dashboard" element={<CommunityDashboard />} />
                <Route path="/community/survey/:id" element={<SurveyTaker />} />
            </Routes>
        </Router>
    )
}

export default App
