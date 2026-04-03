import { useState } from 'react'
import FeedbackForm from './components/FeedbackForm'
import FeedbackList from './components/FeedbackList'

export default function App() {
  const [feedbacks, setFeedbacks] = useState([])

  function handleNewFeedback(feedback, type, replaceId) {
    if (type === 'optimistic') {
      setFeedbacks((prev) => [feedback, ...prev])
    } else if (type === 'replace') {
      setFeedbacks((prev) =>
        prev.map((f) => f.id === replaceId ? feedback : f)
      )
    } else if (type === 'remove') {
      setFeedbacks((prev) => prev.filter((f) => f.id !== replaceId))
    }
  }

  const avgRating = feedbacks.length > 0
    ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
    : 0

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F0FAFA',       // light cyan tint ✅
      padding: '30px 20px',
      fontFamily: 'Segoe UI, sans-serif'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>

          {/* Logo bar */}
          <div style={{
            background: '#00BCD4',   // iServeU cyan ✅
            padding: '18px',
            borderRadius: '14px',
            marginBottom: '20px',
            boxShadow: '0 4px 15px rgba(0,188,212,0.3)'
          }}>
            <h1 style={{ color: 'white', fontSize: '28px', margin: 0 }}>
              Smart Feedback
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.85)', margin: '6px 0 0' }}>
              Share your experience with us!
            </p>
          </div>

          {/* Stats */}
          {feedbacks.length > 0 && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '40px',
              background: 'white',
              padding: '18px',
              borderRadius: '12px',
              marginTop: '10px',
              border: '1px solid #E0F7FA',
              boxShadow: '0 2px 8px rgba(0,188,212,0.1)'
            }}>
              <div>
                <p style={{ margin: 0, fontWeight: 'bold', fontSize: '26px', color: '#00BCD4' }}>
                  {feedbacks.length}
                </p>
                <p style={{ margin: 0, color: '#888', fontSize: '13px' }}>
                  Total Reviews
                </p>
              </div>
              <div style={{ borderLeft: '1px solid #eee', paddingLeft: '40px' }}>
                <p style={{ margin: 0, fontWeight: 'bold', fontSize: '26px', color: '#00BCD4' }}>
                  ★ {avgRating}
                </p>
                <p style={{ margin: 0, color: '#888', fontSize: '13px' }}>
                  Avg Rating
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Form */}
        <FeedbackForm onNewFeedback={handleNewFeedback} />

        {/* List */}
        <FeedbackList feedbacks={feedbacks} />

      </div>
    </div>
  )
}