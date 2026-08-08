import React from 'react'

const mdxComponents = {
  a: (props) => <a {...props} className='font-semibold text-secondary underline decoration-secondary/40 underline-offset-4' />,
  img: (props) => <img {...props} className='my-6 h-auto w-full rounded-2xl object-cover' loading='lazy' decoding='async' />,
  blockquote: (props) => <blockquote {...props} className='my-6 border-l-4 border-secondary/50 bg-secondary/5 px-5 py-4 italic text-slate-700' />,
  h2: (props) => <h2 {...props} className='mt-10 text-2xl font-bold tracking-tight text-slate-900' />,
  h3: (props) => <h3 {...props} className='mt-8 text-xl font-semibold tracking-tight text-slate-900' />,
  p: (props) => <p {...props} className='my-4 leading-8 text-slate-700' />,
  ul: (props) => <ul {...props} className='my-4 list-disc space-y-2 pl-6 text-slate-700' />,
  ol: (props) => <ol {...props} className='my-4 list-decimal space-y-2 pl-6 text-slate-700' />,
}

export default mdxComponents
