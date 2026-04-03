import { useState, useTransition,useEffect } from 'react'
import { submitFeedback } from '../actions/feedback'

export default function FeedbackForm({ onNewFeedback }) {
  const [name, setName]               = useState('')
  const [message, setMessage]         = useState('')
  const [rating, setRating]           = useState(0)
  const [hoveredStar, setHoveredStar] = useState(0)
  const [error, setError]             = useState('')
  const [isPending, startTransition]  = useTransition()
  const [success, setSuccess] = useState(false)

  // add this below your existing state declarations
  useEffect(() => {
  if (success) {
    const timer = setTimeout(() => setSuccess(false), 3000)
    return () => clearTimeout(timer)  // cleanup
  }
}, [success])

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!name || !message || rating === 0) {
      setError('Please fill all fields and select a rating!')
      return
    }

    const optimisticFeedback = {
      id: Date.now(),
      name,
      message,
      rating,
      createdAt: 'Just now...',
      isPending: true
    }

    onNewFeedback(optimisticFeedback, 'optimistic')
    setName('')
    setMessage('')
    setRating(0)

    startTransition(async () => {
      const result = await submitFeedback({ name, message, rating })

      if (result.success) {
          setSuccess(true)    // ← instead of alert() ✅
          onNewFeedback(result.feedback, 'replace', optimisticFeedback.id)
      } else {
        setError(result.error)
        onNewFeedback(null, 'remove', optimisticFeedback.id)
      }
    })
  }

  // input style reused
  const inputStyle = {
    width: '100%',
    padding: '11px 14px',
    borderRadius: '8px',
    border: '1.5px solid #B2EBF2',
    fontSize: '15px',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border 0.2s',
  }

  return (
    <div style={{
      background: 'white',
      borderRadius: '14px',
      padding: '26px',
      boxShadow: '0 2px 16px rgba(0,188,212,0.1)',
      marginBottom: '30px',
      border: '1px solid #E0F7FA'
    }}>
      <h2 style={{ marginBottom: '20px', color: '#00BCD4', fontWeight: '700' }}>
        💬 Share Your Feedback
      </h2>

      {/* Error */}
      {error && (
        <p style={{
          color: '#D32F2F',
          background: '#FFEBEE',
          padding: '10px 14px',
          borderRadius: '8px',
          marginBottom: '15px',
          fontSize: '14px'
        }}>
          ⚠️ {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>

        {/* Name */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#555' }}>
            Your Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Message */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#555' }}>
            Your Feedback
          </label>
          <textarea
            placeholder="Write your feedback here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>

        {/* Star Rating */}
        <div style={{ marginBottom: '22px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#555' }}>
            Rating
          </label>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                style={{
                  fontSize: '34px',
                  cursor: 'pointer',
                  color: star <= (hoveredStar || rating) ? '#00BCD4' : '#ddd',  // cyan stars ✅
                  transition: 'color 0.2s'
                }}
              >
                ★
              </span>
            ))}
            {rating > 0 && (
              <span style={{ color: '#00BCD4', fontWeight: '600' }}>
                {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating]}
              </span>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          style={{
            background: isPending ? '#aaa' : '#00BCD4',   // cyan button ✅
            color: 'white',
            border: 'none',
            padding: '13px 24px',
            borderRadius: '9px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: isPending ? 'not-allowed' : 'pointer',
            width: '100%',
            transition: 'background 0.3s',
            boxShadow: isPending ? 'none' : '0 4px 12px rgba(0,188,212,0.35)'
          }}
        >
          {isPending ? '⏳ Submitting...' : '🚀 Submit Feedback'}
        </button>

      </form>

      {/* Toast Popup */}
{success && (
  <div style={{
    position: 'fixed',
    top: '24px',
    right: '24px',
    background: '#00BCD4',
    color: 'white',
    padding: '16px 24px',
    borderRadius: '12px',
    boxShadow: '0 6px 20px rgba(0,188,212,0.4)',
    fontSize: '15px',
    fontWeight: '600',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    animation: 'slideIn 0.3s ease'
  }}>
    ✅ Feedback submitted successfully!
  </div>
)}
      
    </div>
  )
}