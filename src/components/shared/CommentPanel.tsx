import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../../lib/supabase'
import type { Comment } from '../../lib/supabase'

interface Props {
  screenId: string
  screenName: string
}

export function CommentPanel({ screenId, screenName }: Props) {
  const [open, setOpen] = useState(false)
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(false)
  const [author, setAuthor] = useState(() => localStorage.getItem('comment_author') ?? '')
  const [message, setMessage] = useState('')
  const [replyTo, setReplyTo] = useState<Comment | null>(null)
  const [replyMessage, setReplyMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const topLevel = comments.filter(c => !c.parent_id)
  const getReplies = (id: string) => comments.filter(c => c.parent_id === id)

  const fetchComments = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('screen_id', screenId)
      .order('created_at', { ascending: true })
    if (!error && data) setComments(data)
    setLoading(false)
  }, [screenId])

  useEffect(() => {
    if (open) fetchComments()
  }, [open, fetchComments])

  // Real-time subscription
  useEffect(() => {
    if (!open) return
    const channel = supabase
      .channel(`comments:${screenId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'comments',
        filter: `screen_id=eq.${screenId}`,
      }, payload => {
        setComments(prev => [...prev, payload.new as Comment])
      })
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [open, screenId])

  const saveAuthor = (name: string) => {
    setAuthor(name)
    localStorage.setItem('comment_author', name)
  }

  const submit = async (parentId: string | null = null) => {
    const msg = parentId ? replyMessage : message
    if (!author.trim() || !msg.trim()) return
    setSubmitting(true)
    setError(null)
    const { error } = await supabase.from('comments').insert({
      screen_id: screenId,
      screen_name: screenName,
      author: author.trim(),
      message: msg.trim(),
      parent_id: parentId,
    })
    if (error) {
      setError('Failed to post comment. Please try again.')
    } else {
      if (parentId) { setReplyMessage(''); setReplyTo(null) }
      else setMessage('')
    }
    setSubmitting(false)
  }

  const formatTime = (ts: string) => {
    const d = new Date(ts)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) +
      ' at ' + d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  }

  return (
    <>
      {/* Trigger button — bottom right, above screen label */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-3 right-3 z-50 flex items-center gap-2 bg-[#0077D8] text-white text-xs font-semibold rounded-full px-3 py-2 shadow-lg hover:bg-[#005BA8] transition-colors cursor-pointer"
        title="Leave feedback on this screen"
      >
        <span>💬</span>
        <span>Feedback</span>
        {comments.length > 0 && (
          <span className="bg-white text-[#0077D8] rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
            {comments.length}
          </span>
        )}
      </button>

      {/* Panel overlay */}
      {open && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <div className="flex-1 bg-black/30" onClick={() => setOpen(false)} />

          {/* Panel */}
          <div className="w-96 bg-white h-full flex flex-col shadow-2xl">
            {/* Header */}
            <div className="bg-[#0077D8] px-5 py-4 flex items-start justify-between shrink-0">
              <div>
                <p className="text-white font-bold text-sm">Feedback</p>
                <p className="text-blue-100 text-xs mt-0.5">{screenId} · {screenName}</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white text-lg cursor-pointer leading-none">✕</button>
            </div>

            {/* Author name — persistent */}
            <div className="px-4 py-3 border-b border-[#E8E9EB] bg-[#F7F7F8] shrink-0">
              <label className="block text-[10px] font-semibold text-[#55575C] uppercase tracking-wide mb-1">Your name</label>
              <input
                type="text"
                value={author}
                onChange={e => saveAuthor(e.target.value)}
                placeholder="Enter your name..."
                className="w-full text-sm border border-[#D1D3D6] rounded-lg px-3 py-2 bg-white focus:outline-none focus:border-[#0077D8]"
              />
            </div>

            {/* Comments list */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {loading && (
                <p className="text-xs text-[#8D9199] text-center py-8">Loading comments...</p>
              )}
              {!loading && topLevel.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-2xl mb-2">💬</p>
                  <p className="text-sm font-semibold text-[#0E0E0F]">No feedback yet</p>
                  <p className="text-xs text-[#8D9199] mt-1">Be the first to leave a comment on this screen.</p>
                </div>
              )}
              {topLevel.map(comment => (
                <div key={comment.id}>
                  {/* Top-level comment */}
                  <div className="bg-[#F7F7F8] rounded-xl p-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-[#0E0E0F]">{comment.author}</span>
                      <span className="text-[10px] text-[#8D9199]">{formatTime(comment.created_at)}</span>
                    </div>
                    <p className="text-sm text-[#0E0E0F] leading-relaxed">{comment.message}</p>
                    <button
                      onClick={() => setReplyTo(replyTo?.id === comment.id ? null : comment)}
                      className="text-[11px] text-[#0077D8] mt-2 cursor-pointer hover:underline"
                    >
                      {replyTo?.id === comment.id ? 'Cancel' : 'Reply'}
                    </button>
                  </div>

                  {/* Replies */}
                  {getReplies(comment.id).map(reply => (
                    <div key={reply.id} className="ml-4 mt-2 bg-white border border-[#E8E9EB] rounded-xl p-3">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-semibold text-[#0E0E0F]">{reply.author}</span>
                        <span className="text-[10px] text-[#8D9199]">{formatTime(reply.created_at)}</span>
                      </div>
                      <p className="text-sm text-[#0E0E0F] leading-relaxed">{reply.message}</p>
                    </div>
                  ))}

                  {/* Reply input */}
                  {replyTo?.id === comment.id && (
                    <div className="ml-4 mt-2">
                      <textarea
                        value={replyMessage}
                        onChange={e => setReplyMessage(e.target.value)}
                        placeholder={`Reply to ${comment.author}...`}
                        rows={2}
                        className="w-full text-sm border border-[#D1D3D6] rounded-lg px-3 py-2 bg-white focus:outline-none focus:border-[#0077D8] resize-none"
                      />
                      <button
                        onClick={() => submit(comment.id)}
                        disabled={submitting || !replyMessage.trim() || !author.trim()}
                        className="mt-1.5 text-xs font-semibold text-white bg-[#0077D8] rounded-full px-4 py-1.5 cursor-pointer disabled:opacity-40 hover:bg-[#005BA8] transition-colors"
                      >
                        {submitting ? 'Posting...' : 'Post Reply'}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* New comment input */}
            <div className="px-4 py-4 border-t border-[#E8E9EB] shrink-0 bg-white">
              {error && <p className="text-xs text-[#DC2626] mb-2">{error}</p>}
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Leave feedback on this screen..."
                rows={3}
                className="w-full text-sm border border-[#D1D3D6] rounded-xl px-3 py-2.5 bg-[#F7F7F8] focus:outline-none focus:border-[#0077D8] resize-none"
              />
              <button
                onClick={() => submit(null)}
                disabled={submitting || !message.trim() || !author.trim()}
                className="mt-2 w-full text-sm font-semibold text-white rounded-full py-2.5 cursor-pointer disabled:opacity-40 transition-colors"
                style={{ background: 'linear-gradient(160deg, #0077D8 0%, #005BA8 100%)' }}
              >
                {submitting ? 'Posting...' : !author.trim() ? 'Enter your name above first' : 'Post Comment'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
