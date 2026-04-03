import { useOptimistic } from 'react'

export default function FeedbackList({ feedbacks }) {
  const [optimisticFeedbacks] = useOptimistic(feedbacks)

  if (optimisticFeedbacks.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '40px',
        color: '#aaa',
        background: 'white',
        borderRadius: '14px',
        border: '1px solid #E0F7FA',
        boxShadow: '0 2px 8px rgba(0,188,212,0.08)'
      }}>
        <p style={{ fontSize: '40px' }}>📭</p>
        <p>No feedback yet. Be the first to share!</p>
      </div>
    )
  }

  return (
    <div>
      <h2 style={{ color: '#00BCD4', marginBottom: '15px' }}>
        📋 Feedbacks ({optimisticFeedbacks.length})
      </h2>

      {optimisticFeedbacks.map((feedback) => (
        <div
          key={feedback.id}
          style={{
            background: feedback.isPending ? '#F9FEFE' : 'white',
            border: feedback.isPending ? '2px dashed #B2EBF2' : '1px solid #E0F7FA',
            borderRadius: '14px',
            padding: '18px',
            marginBottom: '15px',
            opacity: feedback.isPending ? 0.7 : 1,
            transition: 'all 0.3s',
            boxShadow: '0 2px 10px rgba(0,188,212,0.08)'
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>

              {/* Avatar */}
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: '#00BCD4',    // cyan avatar ✅
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '18px'
              }}>
                {feedback.name.charAt(0).toUpperCase()}
              </div>

              <div>
                <p style={{ fontWeight: 'bold', margin: 0, color: '#333' }}>
                  {feedback.name}
                </p>
                <p style={{ color: '#aaa', fontSize: '12px', margin: 0 }}>
                  {feedback.createdAt}
                </p>
              </div>
            </div>

            {/* Stars */}
            <div style={{ color: '#00BCD4', fontSize: '20px' }}>   {/* cyan stars ✅ */}
              {'★'.repeat(feedback.rating)}
              <span style={{ color: '#ddd' }}>
                {'★'.repeat(5 - feedback.rating)}
              </span>
            </div>
          </div>

          {/* Message */}
          <p style={{ color: '#555', margin: 0, lineHeight: '1.7' }}>
            {feedback.message}
          </p>

          {/* Pending badge */}
          {feedback.isPending && (
            <span style={{
              display: 'inline-block',
              marginTop: '8px',
              background: '#E0F7FA',
              color: '#00838F',
              padding: '3px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '600'
            }}>
              ⏳ Saving...
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
