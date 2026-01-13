import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import TournamentsPage from './pages/TournamentsPage'
import TournamentDetailPage from './pages/TournamentDetailPage'
import MatchReportPage from './pages/MatchReportPage'
import PaymentPage from './pages/PaymentPage'
import MyRegistrationsPage from './pages/MyRegistrationsPage'
import FrequentPlayersPage from './pages/FrequentPlayersPage'
import RankingsPage from './pages/RankingsPage'
import IntroductionPage from './pages/IntroductionPage'
import ProfilePage from './pages/ProfilePage'
import CareerPage from './pages/CareerPage'
import MyPage from './pages/MyPage'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tournaments" element={<TournamentsPage />} />
          <Route path="/tournaments/:id" element={<TournamentDetailPage />} />
          <Route path="/match-report/:id" element={<MatchReportPage />} />
          <Route path="/payment/:id" element={<PaymentPage />} />
          <Route path="/my/registrations" element={<MyRegistrationsPage />} />
          <Route path="/my/players" element={<FrequentPlayersPage />} />
          <Route path="/my/profile" element={<ProfilePage />} />
          <Route path="/rankings" element={<RankingsPage />} />
          <Route path="/intro" element={<IntroductionPage />} />
          <Route path="/career" element={<CareerPage />} />
          <Route path="/my" element={<MyPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
