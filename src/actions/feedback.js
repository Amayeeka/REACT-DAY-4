// NO "use server" needed — just a regular async function ✅

export async function submitFeedback(data) {
  // simulate server/API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // validation
  if (!data.name || !data.message || !data.rating) {
    return {
      success: false,
      error: 'All fields are required!',
      feedback: null
    }
  }

  // in real app → call your API here (axios, fetch etc.)
  return {
    success: true,
    error: null,
    feedback: {
      id: Date.now(),
      name: data.name,
      message: data.message,
      rating: data.rating,
      createdAt: new Date().toLocaleString()
    }
  }
}